using Pk5Mining.Server.Models.Permissions;
using System.ComponentModel.DataAnnotations.Schema;
using Pk5Mining.Server.Models.Subsidiaries;

namespace Pk5Mining.Server.Models.Roles
{
    public class UserRole
    {
        public long Id { get; set; }
        public long SubsidiaryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsSystem { get; set; } = false;
        public string Status { get; set; } = string.Empty;
        public DateTime DT_Created { get; set; }
        public DateTime? DT_Modified { get; set; }

        public virtual ICollection<Permission> Permissions { get; set; } = new List<Permission>();
        [ForeignKey("SubsidiaryId")]
        public virtual Subsidiary? Subsidiary { get; set; }
    }
}
