using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Models.Subsidiaries;
using Pk5Mining.Server.Repositories.Subsidiaries;

namespace Pk5Mining.Server.Controllers.Subsidiary
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubsidiaryController : ControllerBase
    {
        private readonly ISubsidiaryRepo _repo;

        public SubsidiaryController(ISubsidiaryRepo repo)
        {
            _repo = repo;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Post([FromBody] SubsidiaryDto dto)
        {
            var (data, error, isException) = await _repo.CreateAsync(dto);
            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "An error occurred while creating the subsidiary."));
            }
            return Ok(ApiResponse.SuccessMessage(data, "Subsidiary created successfully"));
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<IActionResult> Get(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? name = null,
            [FromQuery] string? email = null,
            [FromQuery] string? status = null,
            [FromQuery] string? country = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var (data, totalCount) = await _repo.GetAllAsync(pageNumber, pageSize, name, email, status, country);

            var response = new
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Data = data
            };

            return Ok(ApiResponse.SuccessMessage(response, "Subsidiaries retrieved successfully."));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(long id)
        {
            var (data, error, isException) = await _repo.GetByIdAsync(id);

            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "An error occurred while retrieving the subsidiary."));
            }

            if (data == null)
            {
                return NotFound(ApiResponse.Failure(null, "Subsidiary not found."));
            }

            return Ok(ApiResponse.SuccessMessage(data, "Subsidiary retrieved successfully"));
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] SubsidiaryDto dto)
        {
            var (data, error, hasError) = await _repo.UpdateAsync(dto);

            if (hasError)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }

            return Ok(ApiResponse.SuccessMessage(data, "Subsidiary updated successfully"));
        }

        [Authorize]
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateStatus(long id, [FromBody] SubsidiaryStatusUpdateDto dto)
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
            return Ok(ApiResponse.SuccessMessage(data, "Subsidiaries retrieved successfully"));
        }

        [Authorize]
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
                return NotFound(ApiResponse.Failure(null, "Subsidiary not found."));
            }
            return Ok(ApiResponse.SuccessMessage(null, "Subsidiary deleted successfully"));
        }
    }
}
