using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;

namespace Pk5Mining.Server.Repositories.Job_Application.JobApplication_Specific_Repo
{
    public class JobApplicationSpecificRepo : IJobApplicationSpecificRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly IMapper _mapper;

        public JobApplicationSpecificRepo(Pk5MiningDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<JobApplicationResponseDTO> JobApplication, int TotalCount)> GetJobsAsync(int pageNumber, int pageSize, string? email)
        {
            IQueryable<JobApplication> query = _dbContext.JobApplications.AsQueryable();
            if (!string.IsNullOrWhiteSpace(email))
                query = query.Where(j => j.Email == email);
            int totalCount = await query.CountAsync();
            var jobsApplication = await query
                .OrderByDescending(j => j.DT_Created)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ProjectTo<JobApplicationResponseDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return (jobsApplication, totalCount);
        }

        public async Task<(IJobApplication?, string?, bool)> UpdateRepoItem(long id, JobApplicationUpdateDTO dto)
        {
            try
            {
                if (dto == null)
                {
                    return (null, "Invalid data.", true);
                }

                JobApplication? existingJobApplication = await _dbContext.JobApplications.FirstOrDefaultAsync(j => j.Id == id);
                if (existingJobApplication == null)
                {
                    return (null, "Job Application not found.", true);
                }
                existingJobApplication.Status = dto.Status;
                existingJobApplication.DT_Modified = DateTime.UtcNow;

                await _dbContext.SaveChangesAsync();
                return (existingJobApplication, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(IEnumerable<JobApplicationDTO> Data, int TotalCount, string? Error)>GetByJobIdAsync(long jobId, int pageNumber, int pageSize)
        {
            try
            {
                IQueryable<JobApplication> query = _dbContext.JobApplications.Where(j => j.JobId == jobId);
                int totalCount = await query.CountAsync();
                List<JobApplicationDTO> applications = await query
                    .OrderByDescending(j => j.DT_Created)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ProjectTo<JobApplicationDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                return (applications, totalCount, null);
            }
            catch (Exception ex)
            {
                return (Enumerable.Empty<JobApplicationDTO>(), 0, ex.Message);
            }
        }

    }
}