using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories.Admin;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Controllers.Authentication
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthenticationController(IUserRepo adminRepo, ITokenService tokenService, IMapper mapper)
        {
            _userRepo = adminRepo;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDTO dto)
        {
            var (user, error) = await _userRepo.LoginAsync(dto);

            if (error != null)
            {
                return Unauthorized(ApiResponse.AuthorizationException(null, error));
            }
            if (!user.HasChangedPassword)
            {
                var passResponse = _mapper.Map<LoginResponseDTO>(user);

                return Ok(ApiResponse.SuccessMessage(new
                {
                    user = passResponse,
                    mustChangePassword = true
                }, "Password change required"));
            }

            var response = _mapper.Map<LoginResponseDTO>(user);

            response.JwtToken = _tokenService.CreateJWTToken(user);

            return Ok(ApiResponse.SuccessMessage(response, "Login Successful"));
        }
    }
}