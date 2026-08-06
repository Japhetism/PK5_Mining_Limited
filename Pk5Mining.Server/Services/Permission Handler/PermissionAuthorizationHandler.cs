using Microsoft.AspNetCore.Authorization;


namespace Pk5Mining.Server.Services.Permission_Handler
{
    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
    {
        protected override Task HandleRequirementAsync( AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            var permissions = context.User.FindAll("permission").Select(c => c.Value);

            if (permissions.Contains(requirement.Permission))
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}