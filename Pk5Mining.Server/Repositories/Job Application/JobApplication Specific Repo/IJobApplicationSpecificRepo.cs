using Pk5Mining.Server.Models.Job_Application;

namespace Pk5Mining.Server.Repositories.Job_Application.JobApplication_Specific_Repo
{
    public interface IJobApplicationSpecificRepo
    {
        Task<(IEnumerable<JobApplicationResponseDTO> JobApplication, int TotalCount)> GetJobsAsync(int pageNumber, int pageSize, string? email);
        Task<(IJobApplication?, string?, bool)> UpdateRepoItem(long id, JobApplicationUpdateDTO dto);
        Task<(IEnumerable<JobApplicationDTO> Data, int TotalCount, string? Error)> GetByJobIdAsync(long jobId, int pageNumber, int pageSize);

    }
}