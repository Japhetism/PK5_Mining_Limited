using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Services;
using Pk5Mining.Server.Services.Email;

namespace Pk5Mining.Server.Repositories.Job_Application.JobApplication_Specific_Repo
{
    public class JobApplicationSpecificRepo : IJobApplicationSpecificRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMailService _mailService;
        private readonly IEmailTemplateService _templateService;
        private readonly IBackgroundTaskQueue _taskQueue;

        public JobApplicationSpecificRepo(Pk5MiningDBContext dbContext, IMapper mapper, ICurrentUserService currentUserService, IMailService mailService, IEmailTemplateService templateService, IBackgroundTaskQueue taskQueue)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _currentUserService = currentUserService;
            _mailService = mailService;
            _templateService = templateService;
            _taskQueue = taskQueue;
        }

        public async Task<(IEnumerable<JobApplicationDTO> Data, int TotalCount, string? Error)> GetByJobIdAsync(long jobId, int pageNumber, int pageSize)
        {
            try
            {
                var subsidiaryId = _currentUserService.SubsidiaryId;

                IQueryable<JobApplication> query = _dbContext.JobApplications.Include(j => j.Jobs).Where(j =>j.JobId == jobId &&j.Jobs.SubsidiaryId == subsidiaryId);
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

        public async Task<(IEnumerable<JobApplicationResponseDTO> JobApplication, int TotalCount)> GetJobsAsync(int pageNumber, int pageSize, string? email)
        {
            var subsidiaryId = _currentUserService.SubsidiaryId;
            IQueryable<JobApplication> query = _dbContext.JobApplications
                .Include(j => j.Jobs)
                .Where(j => j.Jobs.SubsidiaryId == subsidiaryId);

            if (!string.IsNullOrWhiteSpace(email))
            {
                query = query.Where(j => j.Email == email);
            }

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
        public async Task<(IJobApplication?, string?, bool)> AgroPostRepoItem(IJobApplicationDTO item)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(item.Email))
                {
                    return (null, "Email is required.", true);
                }
                var existingApplication = await _dbContext.JobApplications.Include(x => x.Jobs).FirstOrDefaultAsync(x => x.JobId == item.JobId && x.Email!.ToLower() == item.Email!.ToLower());
                if (existingApplication != null)
                {
                    string jobTitle = existingApplication.Jobs?.Title ?? "this role";
                    string applicationDate = existingApplication.DT_Created?.ToString("yyyy-MM-dd") ?? "an earlier date";
                    return (null, $"An application for the {jobTitle} role was already submitted using {existingApplication.Email} on {applicationDate}.", false);
                }
                JobApplication jobApplication = _mapper.Map<JobApplication>(item);
                if (jobApplication == null)
                {
                    throw new ArgumentNullException(nameof(jobApplication));
                }
                jobApplication.Id = IdGenerator.GenerateUniqueId();
                jobApplication.DT_Created = DateTime.UtcNow;
                jobApplication.Status = "New";
                await _dbContext.JobApplications.AddAsync(jobApplication);
                await _dbContext.SaveChangesAsync();
                _taskQueue.QueueBackgroundWorkItem(async token =>
                {
                    try
                    {
                        // Admin Email
                        var adminBody = await _templateService.RenderTemplateAsync(
                            "AgroAdminJobApp.txt",
                            new Dictionary<string, string>
                            {
                                { "FirstName", item.FirstName ?? "N/A"},
                                { "LastName", item.LastName ?? "N/A"},
                                { "Email", item.Email },
                                { "PhoneNumber", item.PhoneNumber ?? "N/A" }
                            });

                        var adminMail = new MailDataWithAttachment
                        {
                            EmailToId = "dev-test-emails@pk5miningltd.com",
                            EmailToName = "Admin",
                            EmailSubject = "New Job Application Received — Agro Allied Nigeria Limited",
                            EmailBody = adminBody,
                            EmailAttachments = new FormFileCollection()
                        };

                        if (item.ResumeFile != null)
                        {
                            adminMail.EmailAttachments.Add(item.ResumeFile);
                        }

                        // Client Email
                        var clientBody = await _templateService.RenderTemplateAsync(
                            "AgroJobApp.txt",
                            new Dictionary<string, string>
                            {
                                  { "FirstName", item.FirstName }
                            });

                        var clientMail = new MailData
                        {
                            EmailToId = item.Email,
                            EmailToName = $"{item.FirstName} {item.LastName}",
                            EmailSubject = "Job Application Received",
                            EmailBody = clientBody
                        };

                        bool[] results = await Task.WhenAll(
                            _mailService.SendMailWithAttachmentAsync(adminMail),
                            _mailService.SendHTMLMailAsync(clientMail)
                        );

                        if (!results[0])
                        {
                            Console.WriteLine("Agro admin job email failed.");
                        }

                        if (!results[1])
                        {
                            Console.WriteLine("Agro client job email failed.");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }
                });
                return (jobApplication, null, false);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return (null, ex.Message, true);
            }
        }
    }
}