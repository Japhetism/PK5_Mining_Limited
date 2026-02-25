using System.ComponentModel.DataAnnotations;

namespace Pk5Mining.Server.Models.Contact_Us
{
    public interface IContactUsDTO
    {
        public long Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Company { get; set; }
        public string? Subject { get; set; }
        [Required]
        public string MessageBody { get; set; }
    }
}