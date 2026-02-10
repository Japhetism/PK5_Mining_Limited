namespace Pk5Mining.Server.Models.Job
{
    public class JobsDTO : IJobsDTO
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Department { get; set; }
        public string? Location { get; set; }
        public bool IsActive { get; set; }
        public DateTime DT_Created { get; set; }
        public DateTime DT_Modified { get; set; }
    }
}
