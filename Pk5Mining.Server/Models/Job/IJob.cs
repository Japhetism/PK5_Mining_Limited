
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Models.Subsidiaries;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pk5Mining.Server.Models.Job
{
    public interface IJobs
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public long SubsidiaryId { get; set; }
        public string? Description { get; set; }
        public string? Department { get; set; }
        public string? Location { get; set; }
        public string? JobType { get; set; }
        public string? WorkArrangement { get; set; }
        public string? Experience { get; set; }
        public string? BriefDescription { get; set; }
        public bool IsActive { get; set; }
        public string? Status { get; set; }
        public DateTime? DT_Created { get; set; }
        public DateTime? DT_Modified { get; set; }
        public DateTime? DT_Expiry { get; set; }

        public ICollection<JobApplication>? JobApplications { get; set; }
        [ForeignKey("SubsidiaryId")]
        public Subsidiary? Subsidiary { get; set; }
    }
}