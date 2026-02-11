using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Repositories.Job_Application
{
    public class JobApplicationRepo(Pk5MiningDBContext dbContext, IMapper mapper) : Abs_Pk5Repo<IJobApplication, IJobApplicationDTO>(dbContext)
    {
        private readonly IMapper _mapper = mapper;

        public override Task<(IJobApplication?, string?)> DeleteRepoItem(long Id)
        {
            throw new NotImplementedException();
        }

        public async override Task<(IJobApplication?, string?)> GetRepoItem(long Id)
        {
            JobApplication? jobApplication = await DbContext.JobApplications.FirstOrDefaultAsync(c => c.Id == Id);
            if (jobApplication == null)
            {
                return (null, "Job Application not found");
            }
            return (jobApplication, null);
        }

        public async override Task<IEnumerable<IJobApplication>> GetRepoItems()
        {
            return await DbContext.JobApplications.ToListAsync();
        }

        public async override Task<(IJobApplication?, string?, bool)> PostRepoItem(IJobApplicationDTO item)
        {
            try
            {
                JobApplication jobApplication = _mapper.Map<JobApplication>(item);
                if (jobApplication == null)
                {
                    throw new ArgumentNullException(nameof(jobApplication));
                }
                jobApplication.Id = IdGenerator.GenerateUniqueId();
                (IJobApplication? savedJobApplication, string? error) = await base.PostRepoItemAsync(jobApplication);
                return (savedJobApplication, error, false);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return (null, ex.Message, true);
            }
        }

        public async override Task<(IJobApplication?, string?, bool)> UpdateRepoItem(IJobApplication obj)
        {
            try
            {
                if (obj == null)
                {
                    return (null, "Invalid job application data", true);
                }
                JobApplication? existingJobApplication = await DbContext.JobApplications.FirstOrDefaultAsync(j => j.Id == obj.Id);
                if (existingJobApplication == null)
                {
                    return (null, "Job Application not found", true);
                }
                _mapper.Map(obj, existingJobApplication);
                existingJobApplication.Id = obj.Id;
                existingJobApplication.DT_Modified = existingJobApplication.DT_Modified;
                (IJobApplication? updatedJobApplication, string? error) = await base.UpdateRepoItemAsync(existingJobApplication);
                return (updatedJobApplication, error, error != null);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return (null, ex.Message, true);
            }
        }
    }
}