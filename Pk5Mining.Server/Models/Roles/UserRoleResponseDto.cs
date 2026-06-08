using Pk5Mining.Server.Models.Permissions.DTOs;
using Pk5Mining.Server.Models.Subsidiaries;

namespace Pk5Mining.Server.Models.Roles
{
    public class UserRoleResponseDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsSystem { get; set; } = false;
        public string Status { get; set; } = string.Empty;
        public SubsidiaryResponseDto? Subsidiary { get; set; }
        public List<PermissionResponseDto> Permissions { get; set; } = new();
        public DateTime DT_Created { get; set; }
        public DateTime? DT_Modified { get; set; }
    }
}