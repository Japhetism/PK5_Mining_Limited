using Pk5Mining.Server.Models.Permissions.DTOs;

namespace Pk5Mining.Server.Models.Roles
{
    public class RoleWithPermissionDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public List<PermissionResponseDto> Permissions { get; set; } = new();
    }
}
