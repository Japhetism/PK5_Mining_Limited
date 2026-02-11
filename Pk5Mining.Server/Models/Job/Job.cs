using Pk5Mining.Server.Models.Job_Application;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pk5Mining.Server.Models.Job
{
    [Table("Jobss", Schema = "pk5")]
    public class Jobs : IJobs
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Department { get; set; }
        public string? Location { get; set; }
        public bool IsActive { get; set; }
        public DateTime DT_Created { get; set; }
        public DateTime DT_Modified { get; set; }

        public virtual ICollection<JobApplication>? JobApplications { get; set; }
    }
}
