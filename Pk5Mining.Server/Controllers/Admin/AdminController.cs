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
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepo _adminRepo;
        private readonly ITokenService _tokenService;

        public AdminController(IAdminRepo adminRepo, ITokenService tokenService)
        {
            _adminRepo = adminRepo;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] AdminLoginDTO dto)
        {
            var (admin, error) = await _adminRepo.LoginAsync(dto);
            if (error != null)
            {
                return Unauthorized(ApiResponse.AuthorizationException(null, error));
            }
            var jwtToken = _tokenService.CreateJWTToken(admin);

            var response = new AdminResponseDTO
            {
                Id = admin.Id,
                FirstName = admin.FirstName,
                LastName = admin.LastName,
                Username = admin.Username,
                JwtToken = jwtToken
            };
            return Ok(ApiResponse.SuccessMessage(response, "Login Successful"));
        }
    }
}