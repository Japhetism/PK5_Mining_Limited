using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Departments;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Repositories.Departments
{
    public class DepartmentRepo : IDepartmentRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly IMapper _mapper;

        public DepartmentRepo(Pk5MiningDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<(Department?, string?, bool)> CreateAsync(DepartmentDto dto)
        {
            try
            {
                Department entity = _mapper.Map<Department>(dto);

                if (entity == null)
                {
                    throw new ArgumentNullException(nameof(entity));
                }

                entity.Id = IdGenerator.GenerateUniqueId();
                entity.DT_Created = DateTime.UtcNow;

                await _dbContext.Departments.AddAsync(entity);
                await _dbContext.SaveChangesAsync();

                return (entity, null, false);
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx &&
                    (sqlEx.Number == 2601 || sqlEx.Number == 2627))
                {
                    return (null, "Department name already exists for this subsidiary.", true);
                }

                return (null, "Database error occurred.", true);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(Department?, string?, bool)> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _dbContext.Departments.Include(d => d.Subsidiary).FirstOrDefaultAsync(d => d.Id == id);

                if (entity == null)
                {
                    return (null, "Department not found.", true);
                }

                return (entity, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(IEnumerable<Department>, int)> GetAllAsync(int pageNumber, int pageSize, string? name, string? status)
        {
            IQueryable<Department> query = _dbContext.Departments.Include(d => d.Subsidiary).AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(d => d.Name.StartsWith(name));
            }

            int totalCount = await query.CountAsync();

            var data = await query
                .OrderByDescending(x => x.DT_Created)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (data, totalCount);
        }

        public async Task<(Department?, string?, bool)> UpdateAsync(DepartmentDto dto)
        {
            try
            {
                var entity = await _dbContext.Departments.FindAsync(dto.Id);

                if (entity == null)
                {
                    return (null, "Department not found.", true);
                }

                if (!string.IsNullOrWhiteSpace(dto.Name))
                {
                    entity.Name = dto.Name;
                }

                if (!string.IsNullOrWhiteSpace(dto.Description))
                {
                    entity.Description = dto.Description;
                }

                entity.DT_Modified = DateTime.UtcNow;

                _dbContext.Departments.Update(entity);
                await _dbContext.SaveChangesAsync();

                return (entity, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(Department?, string?, bool)> UpdateStatusAsync(long id, bool isActive)
        {
            try
            {
                var entity = await _dbContext.Departments.FindAsync(id);

                if (entity == null)
                {
                    return (null, "Department not found.", true);
                }

                entity.IsActive = isActive;
                entity.DT_Modified = DateTime.UtcNow;

                _dbContext.Departments.Update(entity);
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
            var entity = await _dbContext.Departments.FindAsync(id);

            if (entity == null)
            {
                return (false, "Department not found.", true);
            }

            _dbContext.Departments.Remove(entity);
            await _dbContext.SaveChangesAsync();

            return (true, null, false);
        }

        public async Task<(IEnumerable<DepartmentLightResponse>?, string?, bool)> GetLightResponsesAsync()
        {
            try
            {
                var data = await _dbContext.Departments
                    .AsNoTracking()
                    .ProjectTo<DepartmentLightResponse>(_mapper.ConfigurationProvider)
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
