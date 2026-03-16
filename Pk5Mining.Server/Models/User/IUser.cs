using System.ComponentModel.DataAnnotations;

namespace Pk5Mining.Server.Models.Admin
{
    public interface IUser
    {
        public long Id { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public bool HasChangedPassword { get; set; }
        public DateTime DT_Created { get; set; }
    }
}