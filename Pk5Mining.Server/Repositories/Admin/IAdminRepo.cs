using Pk5Mining.Server.Models.Admin;

namespace Pk5Mining.Server.Repositories.Admin
{
    public interface IAdminRepo
    {
        Task<(IAdmins?, string?, bool)> CreateAsync(IAdminDTO dto);
        Task<(IEnumerable<IAdmins>?, string?, bool)> GetAllAsync();
        Task<(IAdmins?, string?, bool)> GetByIdAsync(long adminId);
        Task<(Admins?, string?)> LoginAsync(AdminLoginDTO dto);
        Task<(IAdmins?, string?, bool)> UpdatePasswordAsync(long Id, SetPassword dto);
    }
}