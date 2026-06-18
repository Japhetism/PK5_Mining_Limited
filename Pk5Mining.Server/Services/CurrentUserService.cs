using System.Security.Claims;

namespace Pk5Mining.Server.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        private ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;

        public long? UserId => long.TryParse(User?.FindFirst("UserId")?.Value, out var id)? id : null;

        public long? SubsidiaryId => long.TryParse(User?.FindFirst("SubsidiaryId")?.Value, out var id)? id : null;

        public long? DepartmentId => long.TryParse(User?.FindFirst("DepartmentId")?.Value, out var id)? id : null;

        public long? RoleId => long.TryParse(User?.FindFirst("RoleId")?.Value, out var id)? id : null;

        public string? Email => User?.FindFirst(ClaimTypes.Email)?.Value;
    }
}
