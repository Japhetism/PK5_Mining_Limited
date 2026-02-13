using Pk5Mining.Server.Models.Job;

namespace Pk5Mining.Server.Repositories.Job.Job_Specific_Repo
{
    public interface IJobSpecificRepo
    {
        Task<(IEnumerable<JobsDTO> Jobs, int TotalCount)> GetJobsAsync(int pageNumber, int pageSize, bool? isActive, string? department, string? location, string? jobType);
        Task<(IJobs?, string?, bool)> UpdateRepoItem(long id, JobsDTO dto);
    }
}