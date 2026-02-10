using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Repositories.Job
{
    public class JobRepo(Pk5MiningDBContext dbContext, IMapper mapper) : Abs_Pk5Repo<IJobs, IJobsDTO>(dbContext)
    {
        private readonly IMapper _mapper = mapper;

        public override Task<(IJobs?, string?)> DeleteRepoItem(long Id)
        {
            throw new NotImplementedException();
        }

        public async override Task<(IJobs?, string?)> GetRepoItem(long Id)
        {
            Jobs? job = await DbContext.Jobs.Where(j => j.IsActive == true).FirstOrDefaultAsync(c => c.Id == Id);
            if (job == null)
            {
                return (null, "Job not found");
            }
            return (job, null);
        }

        public async override Task<IEnumerable<IJobs>> GetRepoItems()
        {
            return await DbContext.Jobs.Where(j => j.IsActive == true).ToListAsync();
        }

        public async override Task<(IJobs?, string?, bool)> PostRepoItem(IJobsDTO item)
        {
            try
            {
                Jobs job = _mapper.Map<Jobs>(item);
                if (job == null)
                {
                    throw new ArgumentNullException(nameof(job));
                }
                job.Id = IdGenerator.GenerateUniqueId();
                (IJobs? savedJob, string? error) = await base.PostRepoItemAsync(job);
                return (savedJob, error, false);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return (null, ex.Message, true);
            }
        }

        public async override Task<(IJobs?, string?, bool)> UpdateRepoItem(IJobs obj)
        {
            try
            {
                if (obj == null)
                {
                    return (null, "Invalid job data", true);
                }
                Jobs? existingJob = await DbContext.Jobs.FirstOrDefaultAsync(j => j.Id == obj.Id);
                if (existingJob == null)
                {
                    return (null, "Job not found", true);
                }
                _mapper.Map(obj, existingJob);
                existingJob.Id = obj.Id;
                existingJob.DT_Modified = existingJob.DT_Modified;
                (IJobs? updatedJob, string? error) =await base.UpdateRepoItemAsync(existingJob);
                return (updatedJob, error, error != null);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return (null, ex.Message, true);
            }
        }
    }
}