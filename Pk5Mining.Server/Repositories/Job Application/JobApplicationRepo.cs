using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Services;
using Pk5Mining.Server.Services.Email;

namespace Pk5Mining.Server.Repositories.Job_Application
{
    public class JobApplicationRepo(Pk5MiningDBContext dbContext, IMapper mapper, IMailService mailService, IBackgroundTaskQueue taskQueue, IEmailTemplateService templateService, ICurrentUserService currentUserService) : Abs_Pk5Repo<IJobApplication, IJobApplicationDTO>(dbContext)
    {
        private readonly IMapper _mapper = mapper;
        private readonly IMailService _mailService = mailService;
        private readonly IBackgroundTaskQueue _taskQueue = taskQueue;
        private readonly IEmailTemplateService _templateService = templateService;
        private readonly ICurrentUserService _currentUserService = currentUserService;
        public override Task<(IJobApplication?, string?)> DeleteRepoItem(long Id)
        {
            throw new NotImplementedException();
        }

        public async override Task<(IJobApplication?, string?)> GetRepoItem(long Id)
        {
            var subsidiaryId = _currentUserService.SubsidiaryId;

            JobApplication? jobApplication = await DbContext.JobApplications.Include(j => j.Jobs).FirstOrDefaultAsync(c =>c.Id == Id &&c.Jobs.SubsidiaryId == subsidiaryId);
            if (jobApplication == null)
            {
                return (null, "Job Application not found");
            }

            return (jobApplication, null);
        }

        public async override Task<IEnumerable<IJobApplication>> GetRepoItems()
        {
            var subsidiaryId = _currentUserService.SubsidiaryId;
            return await DbContext.JobApplications.Include(j => j.Jobs).Where(j => j.Jobs.SubsidiaryId == subsidiaryId).ToListAsync();
        }

        public async override Task<(IJobApplication?, string?, bool)> PostRepoItem(IJobApplicationDTO item)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(item.Email))
                {
                    return (null, "Email is required.", true);
                }
                var existingApplication = await DbContext.JobApplications.Include(x => x.Jobs).FirstOrDefaultAsync(x =>x.JobId == item.JobId && x.Email!.ToLower() == item.Email!.ToLower());
                if (existingApplication != null)
                {
                    string jobTitle = existingApplication.Jobs?.Title ?? "this role";
                    string applicationDate = existingApplication.DT_Created?.ToString("yyyy-MM-dd") ?? "an earlier date";
                    return ( null, $"An application for the {jobTitle} role was already submitted using {existingApplication.Email} on {applicationDate}.", false );
                }
                JobApplication jobApplication = _mapper.Map<JobApplication>(item);
                if (jobApplication == null)
                {
                    throw new ArgumentNullException(nameof(jobApplication));
                }
                jobApplication.Id = IdGenerator.GenerateUniqueId();
                jobApplication.DT_Created = DateTime.UtcNow;
                jobApplication.Status = "New";
                (IJobApplication? savedJobApplication, string? error) = await base.PostRepoItemAsync(jobApplication);
                if (error != null)
                {
                    return (null, error, true);
                }

                _taskQueue.QueueBackgroundWorkItem(async token =>
                {
                    try
                    {
                        // Admin Email
                        var adminBody = await _templateService.RenderTemplateAsync(
                            "AdminJobApp.txt",
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
                            EmailSubject = "New Job Application Received — PK5 Mining Limited",
                            EmailBody = adminBody,
                            EmailAttachments = new FormFileCollection()
                        };

                        if (item.ResumeFile != null)
                        {
                            adminMail.EmailAttachments.Add(item.ResumeFile);
                        }

                        // Client Email
                        var clientBody = await _templateService.RenderTemplateAsync(
                            "ClientJobApp.txt",
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
                            Console.WriteLine("Admin job application email failed.");
                        }

                        if (!results[1])
                        {
                            Console.WriteLine("Client job application email failed.");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }
                });
                return (savedJobApplication, null, false);
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



