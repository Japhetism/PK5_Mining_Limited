using Pk5Mining.Server.Models.Response;

namespace Pk5Mining.Server.Middleware
{
    public class ApiKeyMiddleware
    {
        private readonly RequestDelegate _next;
        private const string APIKEYNAME = "pk5mining-api-key";

        public ApiKeyMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IConfiguration config)
        {
            var endpoint = context.GetEndpoint();
            if (endpoint?.Metadata.GetMetadata<RequireApiKeyAttribute>() == null)
            {
                await _next(context);
                return;
            }

            var apiKey = config["ApiKey"];

            var isValid = context.Request.Headers.TryGetValue(APIKEYNAME, out var extractedApiKey)
                          && apiKey == extractedApiKey;

            if (!isValid)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";

                var response = ApiResponse.AuthorizationException(
                    null,
                    "Unauthorized access."
                );

                await context.Response.WriteAsJsonAsync(response);
                return;
            }

            await _next(context);
        }
    }
}
