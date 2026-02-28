using Microsoft.EntityFrameworkCore;

namespace Pk5Mining.Server.Repositories.Dashboard
{
    public class DashboardRepo : IDashboardRepo
    {
        private readonly Pk5MiningDBContext _dbContext;

        public DashboardRepo(Pk5MiningDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<DashboardResponseDTO> GetDashboardStatsAsync()
        {
            var response = new DashboardResponseDTO();

            var applicationsQuery = _dbContext.JobApplications.AsQueryable();

            response.ApplicationStats.Total = await applicationsQuery.CountAsync();

            response.ApplicationStats.ByStage = await applicationsQuery.Where(a => !string.IsNullOrEmpty(a.Status)).GroupBy(a => a.Status!)
                .Select(g => new
                {
                    Status = g.Key,
                    Count = g.Count()
                }).ToDictionaryAsync(x => x.Status, x => x.Count);
            var jobsQuery = _dbContext.Jobs.AsQueryable();
            response.JobStats.Total = await jobsQuery.CountAsync();
            response.JobStats.ByStatus = await jobsQuery.GroupBy(j => j.Status!)
                .Select(g => new
                {
                    Status = g.Key,
                    Count = g.Count()
                }).ToDictionaryAsync(x => x.Status, x => x.Count);
            response.RecentJobs = await jobsQuery.OrderByDescending(j => j.DT_Created).Take(5)
                .Select(j => new RecentJobDTO
                {
                    JobId = j.Id,
                    Title = j.Title,
                    Status = j.Status,
                    CreatedAt = j.DT_Created,
                    ApplicationCount = j.JobApplications.Count()
                }).ToListAsync();
            return response;
        }
    }
}
