using Pk5Mining.Server.Models.Departments;
using Pk5Mining.Server.Models.Roles;
using Pk5Mining.Server.Models.Subsidiaries;

namespace Pk5Mining.Server.Models.User
{
    public class LoginUserResponseDto
    {
        public long Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public bool IsActive { get; set; }

        public SubsidiaryDto? Subsidiary { get; set; }
        public DepartmentDto? Department { get; set; }
        public RoleWithPermissionDto? Role { get; set; }
    }
}
