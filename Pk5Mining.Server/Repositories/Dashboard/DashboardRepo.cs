using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Repositories.Dashboard
{
    public class DashboardRepo : IDashboardRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public DashboardRepo(Pk5MiningDBContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }
        public async Task<DashboardResponseDTO> GetDashboardStatsAsync()
        {
            var response = new DashboardResponseDTO();

            var subsidiaryId = _currentUserService.SubsidiaryId;

            var applicationsQuery = _dbContext.JobApplications
                .Where(a => a.Jobs.SubsidiaryId == subsidiaryId);

            response.ApplicationStats.Total = await applicationsQuery.CountAsync();

            response.ApplicationStats.ByStage = await applicationsQuery
                .Where(a => !string.IsNullOrEmpty(a.Status))
                .GroupBy(a => a.Status!)
                .Select(g => new
                {
                    Status = g.Key,
                    Count = g.Count()
                })
                .ToDictionaryAsync(x => x.Status, x => x.Count);

            var jobsQuery = _dbContext.Jobs
                .Where(j => j.SubsidiaryId == subsidiaryId);

            response.JobStats.Total = await jobsQuery.CountAsync();

            response.JobStats.ByStatus = await jobsQuery
                .GroupBy(j => j.Status!)
                .Select(g => new
                {
                    Status = g.Key,
                    Count = g.Count()
                })
                .ToDictionaryAsync(x => x.Status, x => x.Count);

            response.RecentJobs = await jobsQuery
                .OrderByDescending(j => j.DT_Created)
                .Take(5)
                .Select(j => new RecentJobDTO
                {
                    JobId = j.Id,
                    Title = j.Title,
                    Status = j.Status,
                    CreatedAt = j.DT_Created,
                    ApplicationCount = j.JobApplications.Count()
                })
                .ToListAsync();

            return response;
        }
    }
}
