namespace Pk5Mining.Server.Services.Email
{
    public class EmailTemplateService : IEmailTemplateService
    {
        private readonly IWebHostEnvironment _env;

        public EmailTemplateService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task<string> RenderTemplateAsync(string templateName, Dictionary<string, string> replacements)
        {
            var filePath = Path.Combine(
                _env.ContentRootPath,
                "Templates",
                "Emails",
                templateName
            );

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"Email template not found: {filePath}");
            }

            string content = await File.ReadAllTextAsync(filePath);

            foreach (var key in replacements)
            {
                content = content.Replace($"{{{key.Key}}}", key.Value);
            }
            return content;
        }
    }
}
