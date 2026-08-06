using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Subsidiaries;
using Pk5Mining.Server.Services;

namespace Pk5Mining.Server.Repositories.Subsidiaries
{
    public class SubsidiaryRepo : ISubsidiaryRepo
    {
        private readonly Pk5MiningDBContext _dbContext;
        private readonly IMapper _mapper;

        public SubsidiaryRepo(Pk5MiningDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<(Subsidiary?, string?, bool)> CreateAsync(SubsidiaryDto dto)
        {
            try
            {
                Subsidiary entity = _mapper.Map<Subsidiary>(dto);

                if (entity == null)
                {
                    throw new ArgumentNullException(nameof(entity));
                }

                entity.Id = IdGenerator.GenerateUniqueId();
                entity.Status = "Active";
                entity.DT_Created = DateTime.UtcNow;

                await _dbContext.Subsidiaries.AddAsync(entity);
                await _dbContext.SaveChangesAsync();

                return (entity, null, false);
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx &&
                    (sqlEx.Number == 2601 || sqlEx.Number == 2627))
                {
                    string errorMessage = sqlEx.Message;

                    if (errorMessage.Contains("UQ_Subsidiaries_Name"))
                    {
                        return (null, "Subsidiary name already exists.", true);
                    }

                    if (errorMessage.Contains("UQ_Subsidiaries_Email"))
                    {
                        return (null, "Subsidiary email already exists.", true);
                    }

                    return (null, "Duplicate record exists.", true);
                }

                return (null, "Database error occurred.", true);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(Subsidiary?, string?, bool)> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _dbContext.Subsidiaries.FindAsync(id);

                if (entity == null)
                {
                    return (null, "Subsidiary not found.", true);
                }

                return (entity, null, false);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(IEnumerable<Subsidiary>, int)> GetAllAsync(int pageNumber, int pageSize, string? name, string? email, string? status, string? country)
        {
            IQueryable<Subsidiary> query = _dbContext.Subsidiaries.AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(s => s.Name.StartsWith(name));
            }
            if (!string.IsNullOrWhiteSpace(email))
            {
                query = query.Where(s => s.Email.StartsWith(email));
            }
            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(s => s.Status.StartsWith(status));
            }
            if (!string.IsNullOrWhiteSpace(country))
            {
                query = query.Where(s => s.Country.StartsWith(country));
            }

            int totalCount = await query.CountAsync();

            var data = await query
                .OrderByDescending(x => x.DT_Created)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (data, totalCount);
        }

        public async Task<(Subsidiary?, string?, bool)> UpdateAsync(SubsidiaryDto dto)
        {
            try
            {
                var entity = await _dbContext.Subsidiaries.FindAsync(dto.Id);

                if (entity == null)
                {
                    return (null, "Subsidiary not found.", true);
                }

                if (!string.IsNullOrWhiteSpace(dto.Name))
                {
                    entity.Name = dto.Name;
                }

                if (!string.IsNullOrWhiteSpace(dto.Code))
                {
                    entity.Code = dto.Code;
                }

                if (!string.IsNullOrWhiteSpace(dto.Country))
                {
                    entity.Country = dto.Country;
                }

                if (!string.IsNullOrWhiteSpace(dto.Address))
                {
                    entity.Address = dto.Address;
                }

                if (!string.IsNullOrWhiteSpace(dto.Email))
                {
                    entity.Email = dto.Email;
                }

                entity.DT_Modified = DateTime.UtcNow;

                _dbContext.Subsidiaries.Update(entity);
                await _dbContext.SaveChangesAsync();

                return (entity, null, false);
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx &&
                    (sqlEx.Number == 2601 || sqlEx.Number == 2627))
                {
                    string errorMessage = sqlEx.Message;

                    if (errorMessage.Contains("UQ_Subsidiaries_Name"))
                    {
                        return (null, "Subsidiary name already exists.", true);
                    }

                    if (errorMessage.Contains("UQ_Subsidiaries_Email"))
                    {
                        return (null, "Subsidiary email already exists.", true);
                    }

                    return (null, "Duplicate record exists.", true);
                }

                return (null, "Database error occurred.", true);
            }
            catch (Exception ex)
            {
                return (null, ex.Message, true);
            }
        }

        public async Task<(Subsidiary?, string?, bool)> UpdateStatusAsync(long id, SubsidiaryStatusUpdateDto dto)
        {
            try
            {

                var entity = await _dbContext.Subsidiaries.FindAsync(id);
                if (entity == null)
                {
                    return (null, "Subsidiary not found.", true);
                }
                if (string.IsNullOrWhiteSpace(dto.Status))
                {
                    return (null, "Status is required.", true);
                }

                entity.Status = dto.Status;
                entity.DT_Modified = DateTime.UtcNow;

                _dbContext.Subsidiaries.Update(entity);
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
            Subsidiary? subsidiary = await _dbContext.Subsidiaries.FindAsync(id);
            if(subsidiary == null)
            {
                return (false, "Subsidiary not found.", true);
            }
            _dbContext.Subsidiaries.Remove(subsidiary);
            await _dbContext.SaveChangesAsync();
            return (true, null, false);
        }

        public async Task<(IEnumerable<SubsidiaryLightResponse>?, string?, bool)> GetLightResponsesAsync()
        {
            try
            {
                var data = await _dbContext.Subsidiaries
                    .AsNoTracking()
                    .ProjectTo<SubsidiaryLightResponse>(_mapper.ConfigurationProvider)
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