using System.ComponentModel.DataAnnotations;

namespace Pk5Mining.Server.Models.Contact_Us
{
    public class ContactUs : IContactUs
    {
        public long Id { get; set; }
        [Required]
        public required string FirstName { get; set; }
        public string LastName { get; set; } = string.Empty;
        [Required]
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Company { get; set; }
        public string? Subject { get; set; }
        [Required]
        public required string MessageBody { get; set; }
    }
}
