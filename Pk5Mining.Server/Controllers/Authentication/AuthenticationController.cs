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
        private readonly IUserRepo _adminRepo;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthenticationController(IUserRepo adminRepo, ITokenService tokenService, IMapper mapper)
        {
            _adminRepo = adminRepo;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDTO dto)
        {
            var (admin, error) = await _adminRepo.LoginAsync(dto);

            if (error != null)
            {
                return Unauthorized(ApiResponse.AuthorizationException(null, error));
            }

            var response = _mapper.Map<UserResponseDTO>(admin);

            response.JwtToken = _tokenService.CreateJWTToken(admin);

            return Ok(ApiResponse.SuccessMessage(response, "Login Successful"));
        }
    }
}