using Pk5Mining.Server.Models.Permissions;

namespace Pk5Mining.Server.Models.Roles
{
    public class UserRoleDto
    {
        public long Id { get; set; }
        public long SubsidiaryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsSystem { get; set; } = false;
        public string Status { get; set; } = string.Empty;
        public DateTime DT_Created { get; set; }
        public DateTime? DT_Modified { get; set; }
        public List<long>? PermissionIds { get; set; }

    }
}
