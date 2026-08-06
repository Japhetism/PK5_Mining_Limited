using Pk5Mining.Server.Models.Roles;

namespace Pk5Mining.Server.Models.Permissions
{
    public class Permission
    {
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        
        public virtual ICollection<UserRole>? UserRoles { get; set; } = new List<UserRole>();
    }
}
