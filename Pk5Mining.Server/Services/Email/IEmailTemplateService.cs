
namespace Pk5Mining.Server.Services.Email
{
    public interface IEmailTemplateService
    {
        Task<string> RenderTemplateAsync(string templateName, Dictionary<string, string> replacements);
    }
}