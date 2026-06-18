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
        public long SubsidiaryId { get; set; }
        public long DepartmentId { get; set; }
        public long RoleId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime DT_Created { get; set; }
    }
}