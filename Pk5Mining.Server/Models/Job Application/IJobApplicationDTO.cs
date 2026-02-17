
namespace Pk5Mining.Server.Models.Job_Application
{
    public interface IJobApplicationDTO
    {
        public long Id { get; set; }
        public long JobId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Country { get; set; }
        public IFormFile? ResumeFile { get; set; }
        public string? Resume { get; set; }
        public string? Status { get; set; }
        public string? LinkedIn { get; set; }
        public DateTime DT_Created { get; set; }
        public DateTime DT_Modified { get; set; }
    }
}