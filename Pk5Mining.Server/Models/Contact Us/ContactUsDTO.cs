using System.ComponentModel.DataAnnotations;

namespace Pk5Mining.Server.Models.Contact_Us
{
    public class ContactUsDTO : IContactUsDTO
    {
        public long Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Company { get; set; }
        public string? Subject { get; set; }
        public string AppId { get; set; }
        [Required]
        public string MessageBody { get; set; }
        public DateTime? DT_Created { get; set; }
        public DateTime? DT_Modified { get; set; }
        public string? Status { get; set; }
    }
}
