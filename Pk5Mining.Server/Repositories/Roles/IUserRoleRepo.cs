using Pk5Mining.Server.Models.Roles;
using Pk5Mining.Server.Models.UserRoles;

namespace Pk5Mining.Server.Repositories.Roles
{
    public interface IUserRoleRepo
    {
        Task<(UserRole?, string?, bool)> CreateAsync(UserRoleDto dto);
        Task<(UserRole?, string?, bool)> GetByIdAsync(long id);
        Task<(IEnumerable<UserRole>, int)> GetAllAsync(int pageNumber, int pageSize, long? subsidiaryId, string? name, string? status, bool? isSystem);
        Task<(UserRole?, string?, bool)> UpdateAsync(UserRoleDto dto);
        Task<(UserRole?, string?, bool)> UpdateStatusAsync(long id, UserRoleStatusUpdateDto dto);
        Task<(bool, string?, bool)> DeleteAsync(long id);
        Task<(IEnumerable<RoleLightResponse>?, string?, bool)> GetLightResponsesAsync();
    }
}
