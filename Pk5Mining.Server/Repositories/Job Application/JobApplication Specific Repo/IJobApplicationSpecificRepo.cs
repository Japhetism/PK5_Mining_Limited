using Pk5Mining.Server.Models.Job_Application;

namespace Pk5Mining.Server.Repositories.Job_Application.JobApplication_Specific_Repo
{
    public interface IJobApplicationSpecificRepo
    {
        Task<(IEnumerable<JobApplicationDTO> JobApplication, int TotalCount)> GetJobsAsync(int pageNumber, int pageSize, string? email);
        Task<(IJobApplication?, string?, bool)> UpdateRepoItem(long id, JobApplicationUpdateDTO dto);
        Task<(IJobApplication?, string?, bool?)> GetByJobId(long id);
    }
}