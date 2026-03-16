using Pk5Mining.Server.Models.Admin;

namespace Pk5Mining.Server.Repositories.Admin
{
    public interface IUserRepo
    {
        Task<(IUser?, string?, bool)> CreateAsync(IUserDTO dto);
        Task<(IEnumerable<IUser>?, string?, bool)> GetAllAsync();
        Task<(IUser?, string?, bool)> GetByIdAsync(long adminId);
        Task<(User?, string?)> LoginAsync(LoginDTO dto);
        Task<(IUser?, string?, bool)> UpdatePasswordAsync(long Id, SetPassword dto);
    }
}