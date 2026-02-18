using Pk5Mining.Server.Models.Admin;

namespace Pk5Mining.Server.Repositories.Admin
{
    public interface IAdminRepo
    {
        Task<(AdminResponseDTO?, string?)> LoginAsync(AdminLoginDTO dto);
    }
}