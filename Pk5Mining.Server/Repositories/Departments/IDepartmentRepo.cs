using Pk5Mining.Server.Models.Departments;

namespace Pk5Mining.Server.Repositories.Departments
{
    public interface IDepartmentRepo
    {
        Task<(Department?, string?, bool)> CreateAsync(DepartmentDto dto);
        Task<(bool, string?, bool)> DeleteAsync(long id);
        Task<(IEnumerable<Department>, int)> GetAllAsync(int pageNumber, int pageSize, string? name);
        Task<(Department?, string?, bool)> GetByIdAsync(long id);
        Task<(IEnumerable<DepartmentLightResponse>?, string?, bool)> GetLightResponsesAsync();
        Task<(Department?, string?, bool)> UpdateAsync(DepartmentDto dto);
        Task<(Department?, string?, bool)> UpdateStatusAsync(long id, bool isActive);
    }
}