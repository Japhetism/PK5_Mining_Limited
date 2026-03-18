using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories.Admin;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAdminRepo _adminRepo;

        public UserController(IAdminRepo adminRepo)
        {
            _adminRepo = adminRepo;
        }

        [HttpPost("create")]
        public async Task<ActionResult> Post([FromBody] AdminDTO dto)
        {
            var (admin, error, isException) = await _adminRepo.CreateAsync(dto);
            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "An error occurred while creating the admin."));
            }
            return Ok(ApiResponse.SuccessMessage(admin, "Account created successfully"));
        }

        [HttpPut("update-password/{id}")]
        public async Task<ActionResult> UpdatePassword(long id, [FromBody] SetPassword newPassword)
        {
            var (admin, error, isException) = await _adminRepo.UpdatePasswordAsync(id, newPassword);
            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "An error occurred while updating the password."));
            }
            return Ok(ApiResponse.SuccessMessage(admin, "Password updated successfully"));
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var (admins, error, isException) = await _adminRepo.GetAllAsync();
            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "An error occurred while retrieving admins."));
            }
            return Ok(ApiResponse.SuccessMessage(admins, "Admins retrieved successfully"));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> Ge(long id)
        {
            var (admin, error, isException) = await _adminRepo.GetByIdAsync(id);
            if (isException)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "An error occurred while retrieving the admin."));
            }
            if (admin == null)
            {
                return NotFound(ApiResponse.Failure(null, "Admin not found."));
            }
            return Ok(ApiResponse.SuccessMessage(admin, "Admin retrieved successfully"));
        }
    }
}