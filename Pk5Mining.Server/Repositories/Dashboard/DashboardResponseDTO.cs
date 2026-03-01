namespace Pk5Mining.Server.Repositories.Dashboard
{
    public class DashboardResponseDTO
    {
        public ApplicationStatsDTO ApplicationStats { get; set; } = new();
        public JobStatsDTO JobStats { get; set; } = new();
        public List<RecentJobDTO> RecentJobs { get; set; } = new();
    }

    public class ApplicationStatsDTO
    {
        public int Total { get; set; }
        public Dictionary<string, int> ByStage { get; set; } = new();
    }

    public class JobStatsDTO
    {
        public int Total { get; set; }
        public Dictionary<string, int> ByStatus { get; set; } = new();
    }

    public class RecentJobDTO
    {
        public long JobId { get; set; }
        public string? Title { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int ApplicationCount { get; set; }
    }
}
