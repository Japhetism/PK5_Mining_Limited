using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace Pk5Mining.Server.Services.Permission_Handler
{
    public class PermissionPolicyProvider : DefaultAuthorizationPolicyProvider
    {
        public PermissionPolicyProvider( IOptions<AuthorizationOptions> options) : base(options)
        {
        }

        public override async Task<AuthorizationPolicy?>
            GetPolicyAsync(string policyName)
        {
            if (policyName.StartsWith("Permission:"))
            {
                string permission = policyName.Substring("Permission:".Length);

                return new AuthorizationPolicyBuilder().AddRequirements(new PermissionRequirement(permission)).Build();
            }
            return await base.GetPolicyAsync(policyName);
        }
    }
}

