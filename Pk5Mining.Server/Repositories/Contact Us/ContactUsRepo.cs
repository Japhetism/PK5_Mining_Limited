using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Repositories.Contact_Us;
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
        private readonly IEmailTemplateService _templateService;
        private readonly IBackgroundTaskQueue _taskQueue;

        public ContactUsRepo(Pk5MiningDBContext dbContext, IMapper mapper, Services.Email.IMailService mailService, IAgroMailService agroMailService, IEmailTemplateService templateService, IBackgroundTaskQueue taskQueue)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mailService = mailService;
            _agroMailService = agroMailService;
            _templateService = templateService;
            _taskQueue = taskQueue;
        }
        public async Task<(IContactUs?, string?, bool)> CreateAsync(IContactUsDTO item)
        {
            try
            {
                var contactUs = _mapper.Map<ContactUs>(item);
                if (contactUs == null)
                    throw new ArgumentNullException(nameof(contactUs));

                contactUs.Id = IdGenerator.GenerateUniqueId();
                contactUs.DT_Created = DateTime.UtcNow;

                await _dbContext.ContactUs.AddAsync(contactUs);
                var result = await _dbContext.SaveChangesAsync();

                if (result <= 0)
                    return (null, "Failed to save contact request", true);

                _taskQueue.QueueBackgroundWorkItem(async token =>
                {
                    try
                    {
                        var replacements = new Dictionary<string, string>
                        {
                            { "FirstName", item.FirstName },
                            { "LastName", item.LastName },
                            { "Email", item.Email },
                            { "PhoneNumber", item.PhoneNumber ?? "N/A" },
                            { "Company", item.Company ?? "N/A" },
                            { "Subject", item.Subject ?? "N/A" },
                            { "MessageBody", item.MessageBody }
                        };

                        // Admin Email
                        var adminBody = await _templateService.RenderTemplateAsync(
                            "AdminPk5Contact.txt",
                            replacements);

                        var adminMail = new MailData
                        {
                            EmailToId = "dev-test-emails@pk5miningltd.com",
                            EmailToName = "Admin",
                            EmailSubject = $"New Contact Us Submission: {item.Subject ?? "No Subject"}",
                            EmailBody = adminBody
                        };

                        // Client Email
                        var clientBody = await _templateService.RenderTemplateAsync(
                            "Pk5Contact.txt",
                            new Dictionary<string, string>
                            {
                                { "FirstName", item.FirstName }
                            });

                        var clientMail = new MailData
                        {
                            EmailToId = item.Email,
                            EmailToName = $"{item.FirstName} {item.LastName}",
                            EmailSubject = "Thank You For Reaching Out",
                            EmailBody = clientBody
                        };

                        bool[] results = await Task.WhenAll(
                            _mailService.SendHTMLMailAsync(adminMail),
                            _mailService.SendHTMLMailAsync(clientMail)
                        );

                        if (!results[0])
                        {
                            Console.WriteLine("Admin contact email failed.");
                        }

                        if (!results[1])
                        {
                            Console.WriteLine("Client contact email failed.");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }
                });

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
                var contactUs = _mapper.Map<ContactUs>(item);
                if (contactUs == null)
                    throw new ArgumentNullException(nameof(contactUs));

                contactUs.Id = IdGenerator.GenerateUniqueId();
                contactUs.DT_Created = DateTime.UtcNow;

                await _dbContext.ContactUs.AddAsync(contactUs);
                var result = await _dbContext.SaveChangesAsync();

                if (result <= 0)
                    return (null, "Failed to save contact request", true);

                _taskQueue.QueueBackgroundWorkItem(async token =>
                {
                    try
                    {
                        var replacements = new Dictionary<string, string>
                        {
                            { "FirstName", item.FirstName },
                            { "LastName", item.LastName },
                            { "Email", item.Email },
                            { "PhoneNumber", item.PhoneNumber ?? "N/A" },
                            { "Company", item.Company ?? "N/A" },
                            { "Subject", item.Subject ?? "N/A" },
                            { "MessageBody", item.MessageBody }
                        };

                        // Admin Email
                        var adminBody = await _templateService.RenderTemplateAsync(
                            "AdminAgroContact.txt",
                            replacements);

                        var adminMail = new MailData
                        {
                            EmailToId = "dev-test-emails@pk5miningltd.com",
                            EmailToName = "Admin",
                            EmailSubject = $"New Contact Us Submission: {item.Subject ?? "No Subject"}",
                            EmailBody = adminBody
                        };

                        // Client Email
                        var clientBody = await _templateService.RenderTemplateAsync(
                            "AgroContact.txt",
                            new Dictionary<string, string>
                            {
                                  { "FirstName", item.FirstName }
                            });

                        var clientMail = new MailData
                        {
                            EmailToId = item.Email,
                            EmailToName = $"{item.FirstName} {item.LastName}",
                            EmailSubject = "Thank You For Reaching Out",
                            EmailBody = clientBody
                        };

                        bool[] results = await Task.WhenAll(
                            _agroMailService.SendHTMLMailAsync(adminMail),
                            _agroMailService.SendHTMLMailAsync(clientMail)
                        );

                        if (!results[0])
                        {
                            Console.WriteLine("Agro admin contact email failed.");
                        }

                        if (!results[1])
                        {
                            Console.WriteLine("Agro client contact email failed.");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }
                });

                return (contactUs, null, false);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return (null, ex.Message, true);
            }
        }
        public async Task<(IContactUs?, string?)> GetById(long Id, string appId)
        {
            var contactUs = await _dbContext.ContactUs.FirstOrDefaultAsync(c => c.Id == Id && c.AppId == appId);
            if (contactUs == null)
            {
                return (null, "Contact request not found");
            }
            return (contactUs, null);
        }
        public async Task<IEnumerable<IContactUs>> GetAll(string appId)
        {
            return await _dbContext.ContactUs.Where(c => c.AppId == appId).ToListAsync();
        }
        public async Task<(IEnumerable<IContactUs> Contacts, int TotalCount)> GetFilteredContacts(
             int pageNumber,
             int pageSize,
             string? email,
             string? subject,
             string? name,
             string? phoneNumber,
             string? status,
             string? appId,
             DateTime? startDate,
             DateTime? endDate)
        {
            IQueryable<ContactUs> query = _dbContext.ContactUs.AsQueryable();
            
            if (!string.IsNullOrWhiteSpace(email))
            {
                query = query.Where(c => c.Email.StartsWith(email));
            }
            if (!string.IsNullOrWhiteSpace(subject))
            {
                query = query.Where(c => c.Subject!.StartsWith(subject));
            }

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(c => c.FirstName.StartsWith(name) || c.LastName.StartsWith(name));
            }
            if (!string.IsNullOrWhiteSpace(phoneNumber))
            {
                query = query.Where(c => c.PhoneNumber!.StartsWith(phoneNumber));
            }
            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(c => c.Status!.StartsWith(status));
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