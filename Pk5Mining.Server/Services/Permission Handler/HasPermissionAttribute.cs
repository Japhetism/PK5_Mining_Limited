using Microsoft.AspNetCore.Authorization;

namespace Pk5Mining.Server.Services.Permission_Handler
{
    public class HasPermissionAttribute : AuthorizeAttribute
    {
        public HasPermissionAttribute(string permission)
        {
            Policy = $"Permission:{permission}";
        }
    }
}