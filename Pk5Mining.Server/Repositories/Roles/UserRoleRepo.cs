using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Roles;
using Pk5Mining.Server.Models.Subsidiaries;
using Pk5Mining.Server.Models.UserRoles;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Repositories.Roles
{
    public class UserRoleRepo : IUserRoleRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly IMapper _mapper;

        public UserRoleRepo(Pk5MiningDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<(UserRole?, string?, bool)> CreateAsync(UserRoleDto dto)
        {
            try
            {
                UserRole entity = _mapper.Map<UserRole>(dto);

                if (entity == null)
                {
                    throw new ArgumentNullException(nameof(entity));
                }
                entity.Id = IdGenerator.GenerateUniqueId();
                entity.Status = "Active";
                entity.IsSystem = false;
                entity.DT_Created = DateTime.UtcNow;

                if (dto.PermissionIds != null && dto.PermissionIds.Any())
                {
                    var permissions = await _dbContext.Permissions.Where(p => dto.PermissionIds.Contains(p.Id)).ToListAsync();
                    if (permissions.Count != dto.PermissionIds.Count)
                    {
                        return (null, "One or more permission IDs are invalid.", true);
                    }
                    entity.Permissions = permissions;
                }
                await _dbContext.UserRoles.AddAsync(entity);
                await _dbContext.SaveChangesAsync();

                return (entity, null, false);
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx &&
                    (sqlEx.Number == 2601 || sqlEx.Number == 2627))
                {
                    return (null, "Role name already exists for this subsidiary.", true);
                }

                return (null, "Database error occurred.", true);
            }
        }

        public async Task<(UserRole?, string?, bool)> GetByIdAsync(long id)
        {
            try
            {
                UserRole? entity = await _dbContext.UserRoles.Include(r => r.Permissions).Include(s => s.Subsidiary).FirstOrDefaultAsync(x => x.Id == id);

                if (entity == null)
                {
                    return (null, "Role not found.", true);
                }
                return (entity, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(IEnumerable<UserRole>, int)> GetAllAsync(int pageNumber, int pageSize, long? subsidiaryId, string? name, string? status, bool? isSystem)
        {
            IQueryable<UserRole> query = _dbContext.UserRoles.Include(r => r.Permissions).Include(s => s.Subsidiary).AsQueryable();
            if (subsidiaryId.HasValue)
            {
                query =query.Where(r => r.SubsidiaryId == subsidiaryId.Value);
            }
            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(r => r.Name.Contains(name));
            }
            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(r => r.Status.ToLower() == status.ToLower());
            }
            if (isSystem.HasValue)
            {
                query = query.Where(r => r.IsSystem == isSystem.Value);
            }
            int totalCount = await query.CountAsync();

            var data = await query.OrderByDescending(x => x.DT_Created).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return (data, totalCount);
        }

        public async Task<(UserRole?, string?, bool)> UpdateAsync(UserRoleDto dto)
        {
            try
            {
                UserRole? entity = await _dbContext.UserRoles.Include(r => r.Permissions).FirstOrDefaultAsync(x => x.Id == dto.Id);

                if (entity == null)
                {
                    return (null, "Role not found.", true);
                }

                if (!string.IsNullOrWhiteSpace(dto.Name))
                    entity.Name = dto.Name;

                // Update permissions
                if (dto.PermissionIds != null)
                {
                    var permissions = await _dbContext.Permissions.Where(p => dto.PermissionIds.Contains(p.Id)).ToListAsync();
                    if (permissions.Count != dto.PermissionIds.Count)
                    {
                        return (null, "One or more permission IDs are invalid.", true);
                    }
                    entity.Permissions.Clear();
                    entity.Permissions = permissions;
                }

                entity.DT_Modified = DateTime.UtcNow;

                _dbContext.UserRoles.Update(entity);
                await _dbContext.SaveChangesAsync();

                return (entity, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(UserRole?, string?, bool)> UpdateStatusAsync(long id, UserRoleStatusUpdateDto dto)
        {
            try
            {
                UserRole? entity = await _dbContext.UserRoles.FindAsync(id);

                if (entity == null)
                {
                    return (null, "Role not found.", true);
                }
                if (string.IsNullOrWhiteSpace(dto.Status))
                {
                    return (null, "Status is required.", true);
                }
                entity.Status = dto.Status;
                entity.DT_Modified = DateTime.UtcNow;
                _dbContext.UserRoles.Update(entity);
                await _dbContext.SaveChangesAsync();

                return (entity, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(bool, string?, bool)> DeleteAsync(long id)
        {
            UserRole? userRole = await _dbContext.UserRoles.FindAsync(id);
            if (userRole == null)
            {
                return (false, "Role not found.", true);
            }
            _dbContext.UserRoles.Remove(userRole);
            await _dbContext.SaveChangesAsync();
            return (true, null, false);
        }

        public async Task<(IEnumerable<RoleLightResponse>?, string?, bool)> GetLightResponsesAsync()
        {
            try
            {
                var data = await _dbContext.UserRoles
                    .AsNoTracking()
                    .ProjectTo<RoleLightResponse>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return (data, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }
    }
}

