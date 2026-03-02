using AutoMapper;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Services;
using Pk5Mining.Server.Services.Email;
using Pk5Mining.Server.Services.Email.Agro_Mail;

namespace Pk5Mining.Server.Repositories.Contact_Us
{
    public class ContactUsRepo : IContactUsRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;
        private readonly IAgroMailService _agroMailService;

        public ContactUsRepo(Pk5MiningDBContext dbContext, IMapper mapper, Services.Email.IMailService mailService, IAgroMailService agroMailService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mailService = mailService;
            _agroMailService = agroMailService;
        }

        public async Task<(IContactUs?, string?, bool)> CreateAsync(IContactUsDTO item)
        {
            try
            {
                ContactUs contactUs = _mapper.Map<ContactUs>(item);

                if (contactUs == null)
                {
                    throw new ArgumentNullException(nameof(contactUs));
                }
                contactUs.Id = IdGenerator.GenerateUniqueId();
                await _dbContext.ContactUs.AddAsync(contactUs);
                var result = await _dbContext.SaveChangesAsync();
                if (result <= 0)
                {
                    return (null, "Failed to save contact request", true);
                }
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

                return (contactUs, null, false);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return (null, ex.Message, true);
            }
        }

        public async Task<(IContactUs?, string?, bool)> CreateAgroAsync(IContactUsDTO item)
        {
            try
            {
                ContactUs contactUs = _mapper.Map<ContactUs>(item);

                if (contactUs == null)
                    throw new ArgumentNullException(nameof(contactUs));

                contactUs.Id = IdGenerator.GenerateUniqueId();
                await _dbContext.ContactUs.AddAsync(contactUs);
                var result = await _dbContext.SaveChangesAsync();
                if (result <= 0)
                {
                    return (null, "Failed to save contact request", true);
                }
                var adminMail = new MailData
                {
                    EmailToId = "Info@pk5agroallied.com",
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
                _agroMailService.SendHTMLMail(adminMail);

                var guestMail = new MailData
                {
                    EmailToId = item.Email,
                    EmailToName = $"{item.FirstName} {item.LastName}",
                    EmailSubject = "Thank You For Reaching Out",
                    EmailBody = $@"
                <h3>Hi {item.FirstName},</h3>
                <p>Thank you for contacting the Agro Company.</p>
                <p>We have received your message and our team will get back to you shortly.</p>
                <br/>
                <p><strong>Your Message:</strong></p>
                <p>{item.MessageBody}</p>
                <br/>
                <p>Best Regards,<br/>Pk5 Agro Allied Team</p>
            "
                };
                _agroMailService.SendHTMLMail(guestMail);

                return (contactUs, null, false);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return (null, ex.Message, true);
            }
        }
    }
}