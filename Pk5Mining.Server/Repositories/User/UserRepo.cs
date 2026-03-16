using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Repositories.Admin
{
    public class UserRepo : IUserRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly IMapper _mapper;

        public UserRepo(Pk5MiningDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<(User?, string?)> LoginAsync(LoginDTO dto)
        {
            var admin = await _dbContext.Users.FirstOrDefaultAsync(a => a.Email == dto.Email && a.Password == dto.Password);
            if (admin == null)
            {
                return (null, "Invalid email or password.");
            }
            return (admin, null);
        }
        public async Task<(IUser?, string?, bool)> CreateAsync(IUserDTO dto)
        {
            try
            {
                User admin = _mapper.Map<User>(dto);
                if (admin == null)
                {
                    throw new ArgumentNullException(nameof(admin));
                }
                admin.Id = IdGenerator.GenerateUniqueId();
                admin.Role = "Default User";
                admin.HasChangedPassword = false;
                admin.IsActive = true;
                admin.IsDeleted = false;
                admin.DT_Created = DateTime.UtcNow;
                await _dbContext.Users.AddAsync(admin);
                await _dbContext.SaveChangesAsync();
                return (admin, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(IUser?, string?, bool)> UpdatePasswordAsync(long Id, SetPassword dto)
        {
            try
            {
                var admin = await _dbContext.Users.FindAsync(Id);
                if (admin == null)
                {
                    return (null, "User not found.", true);
                }
                admin.Password = dto.NewPassword;
                admin.HasChangedPassword = true;
                _dbContext.Users.Update(admin);
                await _dbContext.SaveChangesAsync();
                return (admin, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }
        public async Task<(IUser?, string?, bool)> GetByIdAsync(long adminId)
        {
            try
            {
                var admin = await _dbContext.Users.FindAsync(adminId);
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
        public async Task<(IEnumerable<IUser> User, int TotalCount)> GetFilteredUsers(
              int pageNumber,
              int pageSize,
              string? email,
              string? username,
              string? name,
              bool? isActive)
        {
            IQueryable<User> query = _dbContext.Users.Where(u => u.IsDeleted == false).AsQueryable();

            if (!string.IsNullOrWhiteSpace(email))
            {
                query = query.Where(c => c.Email.StartsWith(email));
            }

            if (!string.IsNullOrWhiteSpace(username))
            {
                query = query.Where(c => c.Username.StartsWith(username));
            }

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(c =>c.FirstName.StartsWith(name) || c.LastName.StartsWith(name));
            }

            if (isActive.HasValue)
            {
                query = query.Where(c => c.IsActive == isActive.Value);
            }
            int totalCount = await query.CountAsync();

            var users = await query.OrderByDescending(c => c.DT_Created).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return (users, totalCount);
        }
    }
}