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
        public string? JobType { get; set; }
        public string? WorkArrangement { get; set; }
        public string? Experience { get; set; }
        public string? BriefDescription { get; set; }
        public bool IsActive { get; set; }
        public DateTime? DT_Created { get; set; }
        public DateTime? DT_Modified { get; set; }
        public DateTime? DT_Expiry { get; set; }

        public virtual ICollection<JobApplication>? JobApplications { get; set; }
    }
}
