using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Departments;
using Pk5Mining.Server.Models.Permissions.DTOs;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Models.Roles;
using Pk5Mining.Server.Models.Subsidiaries;
using Pk5Mining.Server.Models.User;
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

            var userResponse = new LoginUserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.Username,
                IsActive = user.IsActive,

                Subsidiary = user.Subsidiary == null  ? null : new SubsidiaryDto
                {
                    Id = user.Subsidiary.Id,
                    Name = user.Subsidiary.Name
                },

                Department = user.Department == null ? null : new DepartmentDto
                {
                    Id = user.Department.Id,
                     Name = user.Department.Name
                },

                Role = user.UserRole == null ? null : new RoleWithPermissionDto
                {
                    Id = user.UserRole.Id,
                    Name = user.UserRole.Name,

                    Permissions = user.UserRole.Permissions
                    .Select(p => new PermissionResponseDto
                    {
                        Id = p.Id,
                        Name = p.Name
                    }).ToList()
                }
            };

            return Ok(ApiResponse.SuccessMessage(new
            {
                User = userResponse,
                Token = token
            }, "Login successful"));
        }
    }
}