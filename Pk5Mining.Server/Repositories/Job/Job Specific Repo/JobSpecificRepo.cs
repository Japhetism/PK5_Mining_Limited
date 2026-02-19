using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Services;

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

        public async Task<(IJobs?, string?, bool)> UpdateRepoItem(long id, JobsDTO dto)
        {
            try
            {
                if (dto == null)
                {
                    return (null, "Invalid  data.", true);
                }

                Jobs? existingJob = await _dbContext.Jobs.FirstOrDefaultAsync(j => j.Id == id);
                if (existingJob == null)
                {
                    return (null, "Job not found.", true);
                }
                existingJob.Title = dto.Title;
                existingJob.Description = dto.Description;
                existingJob.Location = dto.Location;
                existingJob.Experience = dto.Experience;
                existingJob.DT_Modified = DateTime.UtcNow;
                existingJob.Department = dto.Department;
                existingJob.WorkArrangement = dto.WorkArrangement;
                existingJob.JobType = dto.JobType;
                existingJob.BriefDescription = dto.BriefDescription;
                existingJob.IsActive = dto.IsActive;

                await _dbContext.SaveChangesAsync();
                return (existingJob, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }
        public async Task<(List<JobLightResponseDTO>?, string?)> GetJob()
        {
            try
            {
                List<JobLightResponseDTO> jobs = await _dbContext.Jobs
                    .Select(j => new JobLightResponseDTO
                    {
                        Id = j.Id,
                        Title = j.Title,
                    })
                    .ToListAsync();

                return (jobs, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}