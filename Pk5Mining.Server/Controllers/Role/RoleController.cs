using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Permissions.DTOs;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Models.Roles;
using Pk5Mining.Server.Models.Subsidiaries;
using Pk5Mining.Server.Models.UserRoles;
using Pk5Mining.Server.Repositories.Roles;
using Pk5Mining.Server.Services.Permission_Handler;

namespace Pk5Mining.Server.Controllers.Role
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IUserRoleRepo _repo;

        public RoleController(IUserRoleRepo repo)
        {
            _repo = repo;
        }

        [Authorize]
        [HasPermission("role.create")]
        [HttpPost("create")]
        public async Task<ActionResult> Post([FromBody] UserRoleDto dto)
        {
            var (data, error, isException) = await _repo.CreateAsync(dto);

            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "Error creating role."));
            }

            return Ok(ApiResponse.SuccessMessage(data, "Role created successfully"));
        }

        [Authorize]
        [HasPermission("role.view")]
        [HttpGet("all")]
        public async Task<IActionResult> Get([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] long? subsidiaryId = null, [FromQuery] string? name = null, [FromQuery] RoleStatus? status = null, [FromQuery] bool? isSystem = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            string? statusString = status?.ToString();

            var (data, totalCount) = await _repo.GetAllAsync(pageNumber, pageSize, subsidiaryId, name, statusString, isSystem);

            var mappedData = data.Select(r => new UserRoleResponseDto
            {
                Id = r.Id,
                Name = r.Name,
                IsSystem = r.IsSystem,
                Status = r.Status,
                DT_Created = r.DT_Created,
                DT_Modified = r.DT_Modified,

                Subsidiary = r.Subsidiary == null ? null : new SubsidiaryResponseDto
                {
                    Id = r.Subsidiary.Id,
                    Name = r.Subsidiary.Name
                },

                Permissions = r.Permissions.Select(p => new PermissionResponseDto
                {
                    Id = p.Id,
                    Name = p.Name
                }).ToList()
            }).ToList();

            var response = new
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Data = mappedData
            };

            return Ok(ApiResponse.SuccessMessage(response, "Roles retrieved successfully."));
        }

        [Authorize]
        [HasPermission("role.view")]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(long id)
        {
            var (data, error, isException) = await _repo.GetByIdAsync(id);

            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }

            if (data == null)
            {
                return NotFound(ApiResponse.Failure(null, "Role not found."));
            }

            return Ok(ApiResponse.SuccessMessage(data, "Role retrieved successfully"));
        }

        [Authorize]
        [HasPermission("role.update")]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UserRoleDto dto)
        {
            var (data, error, hasError) = await _repo.UpdateAsync(dto);

            if (hasError)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }

            return Ok(ApiResponse.SuccessMessage(data, "Role updated successfully"));
        }

        [Authorize]
        [HasPermission("role.update")]
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateStatus(long id, [FromBody] UserRoleStatusUpdateDto dto)
        {
            var (data, error, hasError) = await _repo.UpdateStatusAsync(id, dto);

            if (hasError)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }
            return Ok(ApiResponse.SuccessMessage(data, "Status updated successfully"));
        }

        [Authorize]
        [HttpGet("light-responses")]
        public async Task<IActionResult> GetLightResponses()
        {
            var (data, error, hasError) = await _repo.GetLightResponsesAsync();
            if (hasError)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }
            return Ok(ApiResponse.SuccessMessage(data, "Roles retrieved successfully"));
        }

        [Authorize]
        [HasPermission("role.update")]
        [HttpDelete]
        public async Task<IActionResult> Delete(long id)
        {
            var (isDeleted, error, hasError) = await _repo.DeleteAsync(id);
            if (hasError)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }
            if (!isDeleted)
            {
                return NotFound(ApiResponse.Failure(null, "Roles not found."));
            }
            return Ok(ApiResponse.SuccessMessage(null, "Roles deleted successfully"));
        }
    }
}
