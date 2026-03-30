using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Services;
using Pk5Mining.Server.Services.Email;

namespace Pk5Mining.Server.Repositories.Job_Application
{
    public class JobApplicationRepo(Pk5MiningDBContext dbContext, IMapper mapper, IMailService mailService) : Abs_Pk5Repo<IJobApplication, IJobApplicationDTO>(dbContext)
    {
        private readonly IMapper _mapper = mapper;
        private readonly IMailService _mailService = mailService;

        public override Task<(IJobApplication?, string?)> DeleteRepoItem(long Id)
        {
            throw new NotImplementedException();
        }

        public async override Task<(IJobApplication?, string?)> GetRepoItem(long Id)
        {
            JobApplication? jobApplication = await DbContext.JobApplications.Include(j => j.Jobs).FirstOrDefaultAsync(c => c.Id == Id);
            if (jobApplication == null)
            {
                return (null, "Job Application not found");
            }
            return (jobApplication, null);
        }

        public async override Task<IEnumerable<IJobApplication>> GetRepoItems()
        {
            return await DbContext.JobApplications.Include(j=> j.Jobs).ToListAsync();
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
                jobApplication.DT_Created = DateTime.UtcNow;
                jobApplication.Status = "New";
                (IJobApplication? savedJobApplication, string? error) = await base.PostRepoItemAsync(jobApplication);
                if (error != null)
                {
                    return (null, error, true);
                }
                var mailData = new MailDataWithAttachment
                {
                    EmailToId = "dev-test-emails@pk5miningltd.com",
                    EmailToName = "Admin",
                    EmailSubject = "New Job Application Received",
                    EmailBody = $@"
                <h3>New Job Application</h3>
                <p>A new candidate has applied.</p>

                <p><strong>Name:</strong> {item.FirstName} {item.LastName}</p>
                <p><strong>Email:</strong> {item.Email}</p>

                <p>The applicant's resume is attached to this email.</p>
            ",

                    EmailAttachments = new FormFileCollection()
                };
                if (item.ResumeFile != null)
                {
                    mailData.EmailAttachments.Add(item.ResumeFile);
                }
                _mailService.SendMailWithAttachment(mailData);
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