namespace Pk5Mining.Server.Services.Email
{
    public class MailDataWithAttachment : MailData
    {
        public required IFormFileCollection EmailAttachments { get; set; }
    }
}
