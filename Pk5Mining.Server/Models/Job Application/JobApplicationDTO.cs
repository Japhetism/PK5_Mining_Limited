using Pk5Mining.Server.Models.Job_Application;
using System.ComponentModel.DataAnnotations;

namespace Pk5Mining.Server.Models.Job_Application
{
    public class JobApplicationDTO : IJobApplicationDTO
    {
        public long Id { get; set; }
        [Required]
        public long JobId { get; set; }
        [Required(ErrorMessage = "First name is required")]
        public string? FirstName { get; set; }
        [Required(ErrorMessage = "Last name is required")]
        public string? LastName { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Phone number is required")]
        public string? PhoneNumber { get; set; }
        public string? Country { get; set; }
        public IFormFile? ResumeFile { get; set; }
        public string? Resume { get; set; }
        public string? CoverLetter { get; set; }
        public string? Status { get; set; }
        public string? LinkedIn { get; set; }
        public DateTime? DT_Created { get; set; }
        public DateTime? DT_Modified { get; set; }
    }
}