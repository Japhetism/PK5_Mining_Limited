using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Repositories.Admin
{
    public class AdminRepo : IAdminRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly IMapper _mapper;

        public AdminRepo(Pk5MiningDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<(Admins?, string?)> LoginAsync(LoginDTO dto)
        {
            var admin = await _dbContext.Admins.FirstOrDefaultAsync(a => a.Username == dto.Username && a.Password == dto.Password);
            if (admin == null)
            {
                return (null, "Invalid username or password.");
            }
            return (admin, null);
        }
        public async Task<(IAdmins?, string?, bool)> CreateAsync(IAdminDTO dto)
        {
            try
            {
                Admins admin = _mapper.Map<Admins>(dto);
                if (admin == null)
                {
                    throw new ArgumentNullException(nameof(admin));
                }
                admin.Id = IdGenerator.GenerateUniqueId();
                admin.Role = "Default User";
                admin.HasChangedPassword = false;
                await _dbContext.Admins.AddAsync(admin);
                await _dbContext.SaveChangesAsync();
                return (admin, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(IAdmins?, string?, bool)> UpdatePasswordAsync(long Id, SetPassword dto)
        {
            try
            {
                var admin = await _dbContext.Admins.FindAsync(Id);
                if (admin == null)
                {
                    return (null, "Admin not found.", true);
                }
                admin.Password = dto.NewPassword;
                admin.HasChangedPassword = true;
                _dbContext.Admins.Update(admin);
                await _dbContext.SaveChangesAsync();
                return (admin, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }
        public async Task<(IAdmins?, string?, bool)> GetByIdAsync(long adminId)
        {
            try
            {
                var admin = await _dbContext.Admins.FindAsync(adminId);
                if (admin == null)
                {
                    return (null, "Admin not found.", true);
                }
                return (admin, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }
        public async Task<(IEnumerable<IAdmins>?, string?, bool)> GetAllAsync()
        {
            try
            {
                var admins = await _dbContext.Admins.ToListAsync();
                return (admins, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }
    }
}