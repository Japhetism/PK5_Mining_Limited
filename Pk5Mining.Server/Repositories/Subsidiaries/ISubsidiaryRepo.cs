using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Subsidiaries;
using System.ComponentModel.DataAnnotations;

namespace Pk5Mining.Server.Repositories.Subsidiaries
{
    public interface ISubsidiaryRepo
    {
        Task<(Subsidiary?, string?, bool)> CreateAsync(SubsidiaryDto dto);
        Task<(Subsidiary?, string?, bool)> GetByIdAsync(long id);
        Task<(IEnumerable<Subsidiary>, int)> GetAllAsync(int pageNumber, int pageSize, string? name, string? email, string? status, string? country);
        Task<(Subsidiary?, string?, bool)> UpdateAsync(SubsidiaryDto dto);
        Task<(Subsidiary?, string?, bool)> UpdateStatusAsync(long id, SubsidiaryStatusUpdateDto dto);
        Task<(bool, string?, bool)> DeleteAsync(long id);
        Task<(IEnumerable<SubsidiaryLightResponse>?, string?, bool)> GetLightResponsesAsync();
    }
}