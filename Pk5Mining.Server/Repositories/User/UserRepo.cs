using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

        public UserRepo(Pk5MiningDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<(User?, string?)> LoginAsync(LoginDTO dto)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(a => a.Email == dto.Email && a.Password == dto.Password);
            if (user == null)
            {
                return (null, "Invalid email or password.");
            }
            return (user, null);
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
                user.Role = "Default User";
                user.HasChangedPassword = false;
                user.IsActive = true;
                user.IsDeleted = false;
                user.DT_Created = DateTime.UtcNow;
                await _dbContext.Users.AddAsync(user);
                await _dbContext.SaveChangesAsync();
                return (user, null, false);
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
                var user = await _dbContext.Users.FindAsync(Id);
                if (user == null)
                {
                    return (null, "User not found.", true);
                }
                if (user.Password == dto.NewPassword)
                {
                    return (null, "New password cannot be the same as current password.", true);
                }
                user.Password = dto.NewPassword;
                if (dto.ByAdmin)
                {
                    user.HasChangedPassword = false;
                }
                else
                {
                    user.HasChangedPassword = true;
                }
                _dbContext.Users.Update(user);
                await _dbContext.SaveChangesAsync();
                return (user, null, false);
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
                var user = await _dbContext.Users.FindAsync(userId);
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
                if (!string.IsNullOrWhiteSpace(dto.FirstName))
                {
                    user.FirstName = dto.FirstName;
                }
                if (!string.IsNullOrWhiteSpace(dto.LastName))
                {
                    user.LastName = dto.LastName;
                }
                if (!string.IsNullOrWhiteSpace(dto.Username))
                {
                    user.Username = dto.Username;
                }
                if (!string.IsNullOrWhiteSpace(dto.Role))
                {
                    user.Role = dto.Role;
                }
                if (dto.IsActive.HasValue)
                {
                    user.IsActive = dto.IsActive.Value;
                }
                if (dto.IsDeleted.HasValue)
                {
                    user.IsDeleted = dto.IsDeleted.Value;
                }
                _dbContext.Users.Update(user);
                await _dbContext.SaveChangesAsync();
                return (user, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }
    }
}