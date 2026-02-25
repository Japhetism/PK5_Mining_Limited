using AutoMapper;
using Pk5Mining.Server;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Repositories;
using Pk5Mining.Server.Services;
using Pk5Mining.Server.Services.Email;

namespace Pk5Mining.Server.Repositories.Contact_Us
{
    public class ContactUsRepo(Pk5MiningDBContext dbContext, IMapper mapper, IMailService mailService) : Abs_Pk5Repo<IContactUs, IContactUsDTO>(dbContext)
    {
        private readonly Pk5MiningDBContext _dbContext = dbContext;
        private readonly IMapper _mapper = mapper;
        private readonly IMailService _mailService = mailService;

        public override Task<(IContactUs?, string?)> DeleteRepoItem(long Id)
        {
            
            throw new NotImplementedException();
        }

        public override Task<(IContactUs?, string?)> GetRepoItem(long Id)
        {
            throw new NotImplementedException();
        }

        public override Task<IEnumerable<IContactUs>> GetRepoItems()
        {
            throw new NotImplementedException();
        }

        public async override Task<(IContactUs?, string?, bool)> PostRepoItem(IContactUsDTO item)
        {
            try
            {
                ContactUs contactUs = _mapper.Map<ContactUs>(item);

                if (contactUs == null)
                    throw new ArgumentNullException(nameof(contactUs));

                contactUs.Id = IdGenerator.GenerateUniqueId();
                (IContactUs? savedContactUs, string? error) = await base.PostRepoItemAsync(contactUs);

                if (savedContactUs == null)
                    return (null, error ?? "Failed to save contact request", true);

                var adminMail = new MailData
                {
                    EmailToId = "info@pk5miningltd.com",
                    EmailToName = "Admin",
                    EmailSubject = $"New Contact Us Submission: {item.Subject ?? "No Subject"}",
                    EmailBody = $@"
                <h3>New Contact Request Received</h3>
                <p><strong>Name:</strong> {item.FirstName} {item.LastName}</p>
                <p><strong>Email:</strong> {item.Email}</p>
                <p><strong>Phone:</strong> {item.PhoneNumber ?? "N/A"}</p>
                <p><strong>Company:</strong> {item.Company ?? "N/A"}</p>
                <p><strong>Subject:</strong> {item.Subject ?? "N/A"}</p>
                <p><strong>Message:</strong><br/>{item.MessageBody}</p>
            "
                };

                _mailService.SendHTMLMail(adminMail);

                var guestMail = new MailData
                {
                    EmailToId = item.Email,
                    EmailToName = $"{item.FirstName} {item.LastName}",
                    EmailSubject = "Thank You For Reaching Out",
                    EmailBody = $@"
                <h3>Hi {item.FirstName},</h3>
                <p>Thank you for contacting Mining Company.</p>
                <p>We have received your message and our team will get back to you shortly.</p>
                <br/>
                <p><strong>Your Message:</strong></p>
                <p>{item.MessageBody}</p>
                <br/>
                <p>Best Regards,<br/>Pk5 Team</p>
            "
                };

                _mailService.SendHTMLMail(guestMail);

                return (savedContactUs, null, false);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return (null, ex.Message, true);
            }
        }

        public override Task<(IContactUs?, string?, bool)> UpdateRepoItem(IContactUs obj)
        {
            throw new NotImplementedException();
        }
    }
}