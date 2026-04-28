using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Models.Permissions;

namespace Pk5Mining.Server.Repositories.Permissions
{
    public class PermissionRepo : IPermissionRepo
    {
        private readonly Pk5MiningDBContext _dbContext;

        public PermissionRepo(Pk5MiningDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Permission>> GetAll()
        {
            return await _dbContext.Permissions.ToListAsync();
        }
    }
}
