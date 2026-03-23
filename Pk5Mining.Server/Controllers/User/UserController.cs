using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Models.User;
using Pk5Mining.Server.Repositories.Admin;

namespace Pk5Mining.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _repo;

        public UserController(IUserRepo adminRepo)
        {
            _repo = adminRepo;
        }

        [HttpPost("create")]
        public async Task<ActionResult> Post([FromBody] UserDTO dto)
        {
            var (admin, error, isException) = await _repo.CreateAsync(dto);
            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "An error occurred while creating the admin."));
            }
            return Ok(ApiResponse.SuccessMessage(admin, "Account created successfully"));
        }

        [HttpPut("update-password/{id}")]
        public async Task<ActionResult> UpdatePassword(long id, [FromBody] SetPassword newPassword)
        {
            var (admin, error, isException) = await _repo.UpdatePasswordAsync(id, newPassword);
            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "An error occurred while updating the password."));
            }
            return Ok(ApiResponse.SuccessMessage(admin, "Password updated successfully"));
        }
        /*[Authorize]*/
        [HttpGet("filter")]
        public async Task<IActionResult> Get( [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string? email = null, [FromQuery] string? userName = null,
             [FromQuery] string? name = null,
             [FromQuery] bool? isActive = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;
            var (users, totalCount) = await _repo.GetFilteredUsers(
                pageNumber,
                pageSize,
                email,
                userName,
                name,
                isActive);
            var response = new
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Data = users
            };
            return Ok(ApiResponse.SuccessMessage(response, "Users retrieved successfully."));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> Ge(long id)
        {
            var (admin, error, isException) = await _repo.GetByIdAsync(id);
            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "An error occurred while retrieving the user."));
            }
            if (admin == null)
            {
                return NotFound(ApiResponse.Failure(null, "User not found."));
            }
            return Ok(ApiResponse.SuccessMessage(admin, "User retrieved successfully"));
        }
        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto dto)
        {
            var (user, error, hasError) = await _repo.UpdateUserAsync(dto);

            if (hasError)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }
            return Ok(ApiResponse.SuccessMessage(user, "User updated successfully"));
        }
    }
}