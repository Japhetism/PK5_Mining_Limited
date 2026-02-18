using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories.Admin;

namespace Pk5Mining.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepo _adminRepo;

        public AdminController(IAdminRepo adminRepo)
        {
            _adminRepo = adminRepo;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] AdminLoginDTO dto)
        {
            try
            {
                (AdminResponseDTO? admin, string? error) = await _adminRepo.LoginAsync(dto);
                if (error != null)
                {
                    return BadRequest(ApiResponse.AuthenticationException(null, error));
                }
                return Ok(ApiResponse.SuccessMessage(admin, "Login successful."));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
