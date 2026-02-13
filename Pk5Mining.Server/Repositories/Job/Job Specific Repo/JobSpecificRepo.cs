using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Job;

namespace Pk5Mining.Server.Repositories.Job.Job_Specific_Repo
{
    public class JobSpecificRepo : IJobSpecificRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly IMapper _mapper;

        public JobSpecificRepo(Pk5MiningDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<(IEnumerable<JobsDTO> Jobs, int TotalCount)> GetJobsAsync(
             int pageNumber,
             int pageSize,
             bool? isActive,
             string? department,
             string? location,
             string? jobType)
        {
            IQueryable<Jobs> query = _dbContext.Jobs.AsQueryable();
            if (isActive.HasValue)
                query = query.Where(j => j.IsActive == isActive.Value);
            if (!string.IsNullOrWhiteSpace(department))
                query = query.Where(j => j.Department == department);
            if (!string.IsNullOrWhiteSpace(location))
                query = query.Where(j => j.Location == location);
            if (!string.IsNullOrWhiteSpace(jobType))
                query = query.Where(j => j.JobType == jobType);
            int totalCount = await query.CountAsync();
            var jobs = await query
                .OrderByDescending(j => j.DT_Created)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ProjectTo<JobsDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return (jobs, totalCount);
        }
    }
}
