using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Departments;
using Pk5Mining.Server.Models.Roles;
using Pk5Mining.Server.Models.Subsidiaries;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pk5Mining.Server.Models.Admin
{
    [Index(nameof(Email), IsUnique = true)]
    public class User : IUser
    {
        public long Id { get; set; }
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public long? SubsidiaryId { get; set;}
        public long? DepartmentId { get; set; }
        public long? RoleId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        [Required]
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool HasChangedPassword { get; set; }
        public DateTime DT_Created { get; set; }

        [ForeignKey("SubsidiaryId")]
        public virtual Subsidiary? Subsidiary { get; set; }
        [ForeignKey("DepartmentId")]
        public virtual Department? Department { get; set; }
        [ForeignKey("RoleId")]
        public virtual UserRole? UserRoles { get; set; }
    }
}