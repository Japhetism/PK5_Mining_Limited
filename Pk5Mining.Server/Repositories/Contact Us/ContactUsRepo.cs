using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
                contactUs.DT_Created = DateTime.UtcNow;
                await _dbContext.ContactUs.AddAsync(contactUs);
                var result = await _dbContext.SaveChangesAsync();
                if (result <= 0)
                {
                    return (null, "Failed to save contact request", true);
                }
                var pk5admintemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "Emails", "AdminPk5Contact.txt");
                string adminPk5message = await File.ReadAllTextAsync(pk5admintemplatePath);
                adminPk5message = adminPk5message.Replace("{FirstName}", item.FirstName);
                adminPk5message = adminPk5message.Replace("{LastName}", item.LastName);
                adminPk5message = adminPk5message.Replace("{Email}", item.Email);
                adminPk5message = adminPk5message.Replace("{PhoneNumber}", item.PhoneNumber ?? "N/A");
                adminPk5message = adminPk5message.Replace("{Company}", item.Company ?? "N/A");
                adminPk5message = adminPk5message.Replace("{Subject}", item.Subject ?? "N/A");
                adminPk5message = adminPk5message.Replace("{MessageBody}", item.MessageBody);

                var adminMail = new MailData
                {
                    EmailToId = "dev-test-emails@pk5miningltd.com",
                    EmailToName = "Admin",
                    EmailSubject = $"New Contact Us Submission: {item.Subject ?? "No Subject"}",
                    EmailBody = adminPk5message,
                };
                _mailService.SendHTMLMail(adminMail);

                var pk5clienttemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "Emails", "Pk5Contact.txt");
                string pk5Clientmessage = await File.ReadAllTextAsync(pk5clienttemplatePath);
                pk5Clientmessage = pk5Clientmessage.Replace("{FirstName}", item.FirstName);

                var guestMail = new MailData
                {
                    EmailToId = item.Email,
                    EmailToName = $"{item.FirstName} {item.LastName}",
                    EmailSubject = "Thank You For Reaching Out",
                    EmailBody = pk5Clientmessage,
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
                contactUs.DT_Created = DateTime.UtcNow;
                await _dbContext.ContactUs.AddAsync(contactUs);
                var result = await _dbContext.SaveChangesAsync();
                if (result <= 0)
                {
                    return (null, "Failed to save contact request", true);
                }
                var agroAdmintemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "Emails", "AdminAgroContact.txt");
                string agroAdminmessage = await File.ReadAllTextAsync(agroAdmintemplatePath);
                agroAdminmessage = agroAdminmessage.Replace("{FirstName}", item.FirstName);
                agroAdminmessage = agroAdminmessage.Replace("{LastName}", item.LastName);
                agroAdminmessage = agroAdminmessage.Replace("{Email}", item.Email);
                agroAdminmessage = agroAdminmessage.Replace("{PhoneNumber}", item.PhoneNumber ?? "N/A");
                agroAdminmessage = agroAdminmessage.Replace("{Company}", item.Company ?? "N/A");
                agroAdminmessage = agroAdminmessage.Replace("{Subject}", item.Subject ?? "N/A");
                agroAdminmessage = agroAdminmessage.Replace("{MessageBody}", item.MessageBody);

                var adminMail = new MailData
                {
                    EmailToId = "dev-test-emails@pk5miningltd.com",
                    EmailToName = "Admin",
                    EmailSubject = $"New Contact Us Submission: {item.Subject ?? "No Subject"}",
                    EmailBody = agroAdminmessage,
                };
                _agroMailService.SendHTMLMail(adminMail);

                var clientTemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "Emails", "AgroContact.txt");
                string clientMessage = await File.ReadAllTextAsync(clientTemplatePath);
                clientMessage = clientMessage.Replace("{FirstName}", item.FirstName);

                var guestMail = new MailData
                {
                    EmailToId = item.Email,
                    EmailToName = $"{item.FirstName} {item.LastName}",
                    EmailSubject = "Thank You For Reaching Out",
                    EmailBody = clientMessage,
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
        public async Task<(IContactUs?, string?)> GetById(long Id)
        {
            var contactUs = await _dbContext.ContactUs.FindAsync(Id);
            if (contactUs == null)
            {
                return (null, "Contact request not found");
            }
            return (contactUs, null);
        }
        public async Task<IEnumerable<IContactUs>> GetAll()
        {
            return await _dbContext.ContactUs.ToListAsync();
        }
        public async Task<(IEnumerable<IContactUs> Contacts, int TotalCount)> GetFilteredContacts(
             int pageNumber,
             int pageSize,
             string? email,
             string? subject,
             string? name,
             string? appId,
             DateTime? startDate,
             DateTime? endDate)
        {
            IQueryable<ContactUs> query = _dbContext.ContactUs.AsQueryable();

            if (!string.IsNullOrWhiteSpace(email))
            {
                query = query.Where(c => c.Email.Contains(email));
            }
            if (!string.IsNullOrWhiteSpace(subject))
            {
                query = query.Where(c => c.Subject!.Contains(subject));
            }

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(c => c.FirstName.Contains(name) || c.LastName.Contains(name));
            }

            if (!string.IsNullOrWhiteSpace(appId))
            {
                query = query.Where(c => c.AppId == appId);
            }

            if (startDate.HasValue)
            {
                query = query.Where(c => c.DT_Created >= startDate.Value);
            }
            if (endDate.HasValue)
            {
                query = query.Where(c => c.DT_Created <= endDate.Value);
            }
            int totalCount = await query.CountAsync();

            var contacts = await query.OrderByDescending(c => c.DT_Created).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return (contacts, totalCount);
        }
        public async Task<(IContactUs?, string?, bool)> UpdateRepoItem(long id, ContactUsUpdateDTO dto)
        {
            try
            {
                if (dto == null)
                {
                    return (null, "Invalid data.", true);
                }

                ContactUs? existingContactUs = await _dbContext.ContactUs.FirstOrDefaultAsync(c => c.Id == id);
                if (existingContactUs == null)
                {
                    return (null, "Data Not found.", true);
                }
                existingContactUs.Status = dto.Status;
                existingContactUs.DT_Modified = DateTime.UtcNow;

                await _dbContext.SaveChangesAsync();
                return (existingContactUs, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }
    }
}