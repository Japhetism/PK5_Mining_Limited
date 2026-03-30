namespace Pk5Mining.Server.Services.Email
{
    public class MailDataWithAttachment : MailData
    {
        public List<IFormFile> EmailAttachments { get; set; } = new();
    }
}
