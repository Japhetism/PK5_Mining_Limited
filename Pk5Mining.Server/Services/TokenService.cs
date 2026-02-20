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
        public string CreateJWTToken(Admins admins)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.GivenName, admins.FirstName),
                new Claim(ClaimTypes.Email, admins.Username),
                new Claim(ClaimTypes.Surname, admins.LastName),
                new Claim(ClaimTypes.Role, "Admin")
            };

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