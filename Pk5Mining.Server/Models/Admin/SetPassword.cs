using System.ComponentModel.DataAnnotations;

namespace Pk5Mining.Server.Models.Admin
{
    public class SetPassword
    {
        [Required]
        public string NewPassword { get; set; } = null!;
    }
}
