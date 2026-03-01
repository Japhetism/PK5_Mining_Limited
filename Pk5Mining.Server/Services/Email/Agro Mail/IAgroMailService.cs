namespace Pk5Mining.Server.Services.Email.Agro_Mail
{
    public interface IAgroMailService
    {
        bool SendHTMLMail(MailData htmlMailData);
        bool SendMail(MailData mailData);
        bool SendMailWithAttachment(MailDataWithAttachment mailData);
    }
}