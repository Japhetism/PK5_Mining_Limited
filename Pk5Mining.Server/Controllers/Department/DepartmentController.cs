using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Departments;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories.Departments;

namespace Pk5Mining.Server.Controllers.Department
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepo _repo;

        public DepartmentController(IDepartmentRepo repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] DepartmentDto dto)
        {
            var (data, error, isException) = await _repo.CreateAsync(dto);

            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "Error creating department."));
            }

            return Ok(ApiResponse.SuccessMessage(data, "Department created successfully"));
        }

        [HttpGet("all")]
        public async Task<IActionResult> Get(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? name = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var (data, totalCount) = await _repo.GetAllAsync(pageNumber, pageSize, name);

            var response = new
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Data = data
            };

            return Ok(ApiResponse.SuccessMessage(response, "Departments retrieved successfully"));
        }

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
                return NotFound(ApiResponse.Failure(null, "Department not found."));
            }

            return Ok(ApiResponse.SuccessMessage(data, "Department retrieved successfully"));
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] DepartmentDto dto)
        {
            var (data, error, hasError) = await _repo.UpdateAsync(dto);

            if (hasError)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }

            return Ok(ApiResponse.SuccessMessage(data, "Department updated successfully"));
        }

        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateStatus(long id, [FromQuery] bool isActive)
        {
            var (data, error, hasError) = await _repo.UpdateStatusAsync(id, isActive);

            if (hasError)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }

            return Ok(ApiResponse.SuccessMessage(data, "Status updated successfully"));
        }

        [HttpGet("light-responses")]
        public async Task<IActionResult> GetLightResponses()
        {
            var (data, error, hasError) = await _repo.GetLightResponsesAsync();

            if (hasError)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }

            return Ok(ApiResponse.SuccessMessage(data, "Departments retrieved successfully"));
        }

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
                return NotFound(ApiResponse.Failure(null, "Department not found."));
            }

            return Ok(ApiResponse.SuccessMessage(null, "Department deleted successfully"));
        }
    }
}
