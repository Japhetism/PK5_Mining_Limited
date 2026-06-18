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
        private readonly ICurrentUserService _currentUserService;

        public JobSpecificRepo(Pk5MiningDBContext dbContext, IMapper mapper, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<(List<JobLightResponseDTO>?, string?)> GetJob()
        {
            try
            {
                var subsidiaryId = _currentUserService.SubsidiaryId;

                List<JobLightResponseDTO> jobs = await _dbContext.Jobs
                    .Where(j => j.SubsidiaryId == subsidiaryId)
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

        public async Task<(IEnumerable<JobsDTO> Jobs, int TotalCount)> GetJobsAsync(
             int pageNumber,
             int pageSize,
             bool? isActive,
             string? department,
             string? location,
             string? jobType)
        {
            var subsidiaryId = _currentUserService.SubsidiaryId;

            IQueryable<Jobs> query = _dbContext.Jobs
                .Where(j => j.SubsidiaryId == subsidiaryId);

            if (isActive.HasValue)
            {
                query = query.Where(j => j.IsActive == isActive.Value);
            }

            if (!string.IsNullOrWhiteSpace(department))
            {
                query = query.Where(j => j.Department == department);
            }

            if (!string.IsNullOrWhiteSpace(location))
            {
                query = query.Where(j => j.Location == location);
            }

            if (!string.IsNullOrWhiteSpace(jobType))
            {
                query = query.Where(j => j.JobType == jobType);
            }

            int totalCount = await query.CountAsync();

            var jobs = await query
                .OrderByDescending(j => j.DT_Created)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ProjectTo<JobsDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return (jobs, totalCount);
        }
        public async Task<IEnumerable<IJobs>> GetRepoItems(string code)
        {
            var subsidiary = await _dbContext.Subsidiaries.FirstOrDefaultAsync(s => s.Code == code);
            if (subsidiary == null)
            {
                return Enumerable.Empty<IJobs>();
            }
            return await _dbContext.Jobs
                .Where(j =>
                    j.SubsidiaryId == subsidiary.Id &&
                    j.IsActive &&
                    (!j.DT_Expiry.HasValue ||
                     j.DT_Expiry >= DateTime.UtcNow))
                .ToListAsync();
        }
        public async Task<(IJobs?, string?)> GetRepoItem(long id, string code)
        {
            var subsidiary = await _dbContext.Subsidiaries.FirstOrDefaultAsync(s => s.Code == code);
            if (subsidiary == null)
            {
                return (null, "Invalid subsidiary");
            }

            Jobs? job = await _dbContext.Jobs.FirstOrDefaultAsync(j => j.Id == id && j.SubsidiaryId == subsidiary.Id && j.IsActive);
            if (job == null)
            {
                return (null, "Job not found");
            }

            return (job, null);
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
                existingJob.Status = dto.Status;
                existingJob.DT_Expiry = dto.DT_Expiry;

                await _dbContext.SaveChangesAsync();
                return (existingJob, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }
        public async Task<(IJobs?, string?, bool)> AgroPostRepoItem(IJobsDTO item)
        {
            try
            {
                Jobs job = _mapper.Map<Jobs>(item);
                if (job == null)
                {
                    throw new ArgumentNullException(nameof(job));
                }
                job.Id = IdGenerator.GenerateUniqueId();
                job.DT_Created = DateTime.UtcNow;
                job.Status = "Open";
                job.SubsidiaryId = _currentUserService.SubsidiaryId.Value;
                job.DT_Expiry = job.DT_Created?.AddMonths(3);
                await _dbContext.Jobs.AddAsync(job);
                await _dbContext.SaveChangesAsync();
                return (job, null, false);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return (null, ex.Message, true);
            }
        }

    }
}