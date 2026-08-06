namespace Pk5Mining.Server.Services.Email.Agro_Mail
{
    public interface IAgroMailService
    {
        Task<bool> SendHTMLMailAsync(MailData htmlMailData);
        Task<bool> SendMailWithAttachmentAsync(MailDataWithAttachment mailData);

    }
}