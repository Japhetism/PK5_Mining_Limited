using System.ComponentModel.DataAnnotations;

namespace Pk5Mining.Server.Models.Admin
{
    public class UserDTO : IUserDTO
    {
        public long Id { get; set; }
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool? HasChangedPassword { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime DT_Created { get; set; }
    }
}