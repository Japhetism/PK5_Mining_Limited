using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories.Admin;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Controllers.Single_Sign_On
{
    [Route("api/[controller]")]
    [ApiController]
    public class SingleSignOnController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        private readonly ITokenService _tokenService;

        public SingleSignOnController(IUserRepo userRepo, ITokenService tokenService)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
        }
        [Authorize(AuthenticationSchemes = "SSOScheme")]
        [HttpPost("microsoft/login")]
        public async Task<IActionResult> ClientLogin()
        {
            if (!(User.Identity?.IsAuthenticated ?? false))
            {
                return Unauthorized(new { message = "User is not authenticated!" });
            }
            var claims = User.Claims.GroupBy(c => c.Type).ToDictionary(g => g.Key, g => string.Join(", ", g.Select(c => c.Value)));
            var email = claims.GetValueOrDefault("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn");
            string? fullName = User.FindFirst("name")?.Value;

            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized(ApiResponse.AuthenticationException(null, "Email not found in token."));
            }
            var (user, error) = await _userRepo.GetByEmailForSSOAsync(email);
            if (user == null)
            {
                return Unauthorized(ApiResponse.AuthenticationException(null, error));
            }
            string token = _tokenService.CreateJWTToken(user);

            return Ok(ApiResponse.SuccessMessage(new
            {
                User = user,
                Token = token
            }, "Login successful"));
        }
    }
}