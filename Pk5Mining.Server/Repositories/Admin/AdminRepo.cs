using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Admin;

namespace Pk5Mining.Server.Repositories.Admin
{
    public class AdminRepo : IAdminRepo
    {
        private readonly Pk5MiningDBContext _dbContext;

        public AdminRepo(Pk5MiningDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<(AdminResponseDTO?, string?)> LoginAsync(AdminLoginDTO dto)
        {
            try
            {
                Admins? admin = await _dbContext.Admins.FirstOrDefaultAsync(a => a.Username == dto.Username && a.Password == dto.Password);
                if (admin == null)
                {
                    return (null, "Invalid username or password.");
                }
                AdminResponseDTO? response = new AdminResponseDTO
                {
                    Id = admin.Id,
                    FirstName = admin.FirstName,
                    LastName = admin.LastName,
                    Username = admin.Username
                };
                return (response, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
