using Pk5Mining.Server.Models.Job;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pk5Mining.Server.Models.Job_Application
{
    [Table("JobApplications", Schema = "pk5")]

    public class JobApplication : IJobApplication
    {
        public long Id { get; set; }
        public long JobId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Country { get; set; }
        public string? Resume { get; set; }
        public string? Status { get; set; }
        public string? LinkedIn { get; set; }
        public DateTime DT_Created { get; set; }
        public DateTime DT_Modified { get; set; }

        [ForeignKey(nameof(JobId))]
        public virtual Jobs Jobs { get; set; }
    }
}
