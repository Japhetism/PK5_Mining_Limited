using Pk5Mining.Server.Services.Email;

namespace Pk5Mining.Server.Services.Email
{
    public interface IMailService
    {
        bool SendMail(MailData mailData);
        bool SendHTMLMail(MailData htmlMailData);
        bool SendMailWithAttachment(MailDataWithAttachment mailData);
    }
}
