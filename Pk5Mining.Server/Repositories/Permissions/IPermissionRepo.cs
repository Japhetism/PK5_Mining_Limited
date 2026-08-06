using Pk5Mining.Server.Models.Permissions;

namespace Pk5Mining.Server.Repositories.Permissions
{
    public interface IPermissionRepo
    {
        Task<IEnumerable<Permission>> GetAll();
    }
}