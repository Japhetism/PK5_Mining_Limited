
namespace Pk5Mining.Server.Repositories.Dashboard
{
    public interface IDashboardRepo
    {
        Task<DashboardResponseDTO> GetDashboardStatsAsync();
    }
}