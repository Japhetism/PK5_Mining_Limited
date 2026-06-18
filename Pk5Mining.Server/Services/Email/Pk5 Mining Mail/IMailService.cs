using Pk5Mining.Server.Services.Email;

namespace Pk5Mining.Server.Services.Email
{
    public interface IMailService
    {
        bool SendMail(MailData mailData);
        Task<bool> SendHTMLMailAsync(MailData htmlMailData);
        Task<bool> SendMailWithAttachmentAsync(MailDataWithAttachment mailData);
    }
}
