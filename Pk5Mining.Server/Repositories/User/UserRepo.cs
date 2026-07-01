using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Generators;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.User;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Repositories.Admin
{
    public class UserRepo : IUserRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public UserRepo(Pk5MiningDBContext dbContext, IMapper mapper, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }
        public async Task<(IUser?, string?, bool)> CreateAsync(IUserDTO dto)
        {
            try
            {
                User user = _mapper.Map<User>(dto);
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }
                user.Id = IdGenerator.GenerateUniqueId();
                user.IsActive = true;
                user.IsDeleted = false;
                user.DT_Created = DateTime.UtcNow;
                await _dbContext.Users.AddAsync(user);
                await _dbContext.SaveChangesAsync();
                return (user, null, false);
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx &&
                    (sqlEx.Number == 2601 || sqlEx.Number == 2627))
                {
                    return (null, "Email already exists. Please login instead.", true);
                }

                return (null, "Database error occurred.", true);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }
        public async Task<(UserResponseDto?, string?, bool)> GetByIdAsync(long userId)
        {
            try
            {
                var subsidiaryId = _currentUserService.SubsidiaryId;

                var user = await _dbContext.Users.FirstOrDefaultAsync(u =>u.Id == userId && u.SubsidiaryId == subsidiaryId && u.IsDeleted == false);
                if (user == null)
                {
                    return (null, "User not found.", true);
                }
                var result = _mapper.Map<UserResponseDto>(user);
                return (result, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(IEnumerable<UserResponseDto> User, int TotalCount)> GetFilteredUsers(
              int pageNumber,
              int pageSize,
              string? email,
              string? username,
              string? name,
              bool? isActive)
        {
            var subsidiaryId = _currentUserService.SubsidiaryId;

            IQueryable<User> query = _dbContext.Users.Include(u => u.Subsidiary).Include(u => u.Department).Include(u => u.UserRole).Where(u => !u.IsDeleted &&u.SubsidiaryId == subsidiaryId);
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
            var result = _mapper.Map<IEnumerable<UserResponseDto>>(users);

            return (result, totalCount);
        }
        public async Task<(IUser?, string?, bool)> UpdateUserAsync(UpdateUserDto dto)
        {
            try
            {
                var user = await _dbContext.Users.FindAsync(dto.Id);

                if (user == null)
                {
                    return (null, "User not found.", true);
                }
                if (dto.RoleId.HasValue)
                {
                    var roleExists = await _dbContext.UserRoles.AnyAsync(r => r.Id == dto.RoleId.Value);
                    if (!roleExists)
                    {
                        return (null, "Role does not exist.", true);
                    }
                }
                if (dto.DepartmentId.HasValue)
                {
                    var departmentExists = await _dbContext.Departments.AnyAsync(d => d.Id == dto.DepartmentId.Value);
                    if (!departmentExists)
                    {
                        return (null, "Department does not exist.", true);
                    }
                }
                if (dto.SubsidiaryId.HasValue)
                {
                    var subsidiaryExists = await _dbContext.Subsidiaries.AnyAsync(s => s.Id == dto.SubsidiaryId.Value);
                    if (!subsidiaryExists)
                    {
                        return (null, "Subsidiary does not exist.", true);
                    }
                }
                _mapper.Map(dto, user);
                await _dbContext.SaveChangesAsync();
                return (user, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(User?, string?)> GetByEmailForSSOAsync(string email)
        {
            var user = await _dbContext.Users.Include(x => x.Subsidiary).Include(x => x.Department).Include(x => x.UserRole).ThenInclude(x => x.Permissions).FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
            if (user == null || user.IsDeleted)
            {
                return (null, "You do not have access to this application.");
            }
            if (!user.IsActive)
            {
                return (null, "Your account is deactivated. Contact admin.");
            }
            return (user, null);
        }
    }
}