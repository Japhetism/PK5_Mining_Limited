using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Pk5Mining.Server.Models.Admin;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Pk5Mining.Server.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string CreateJWTToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim("UserId", user.Id.ToString()),
                new Claim("SubsidiaryId", user.SubsidiaryId.ToString() ?? ""),
                new Claim("RoleId", user.RoleId.ToString() ?? ""),
                new Claim("DepartmentId", user.DepartmentId.ToString() ?? "")
            };
            if (user.UserRoles?.Permissions != null)
            {
                foreach (var permission in user.UserRoles.Permissions)
                {
                    claims.Add( new Claim("permission", permission.Name));
                }
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));// Encoding the Key
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256); //Keepeing the credential in a variable

            //Creating a JWT token
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}