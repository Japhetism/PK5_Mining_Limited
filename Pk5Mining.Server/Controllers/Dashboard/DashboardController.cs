using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories.Dashboard;

namespace Pk5Mining.Server.Controllers.Dashboard
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardRepo _repo;

        public DashboardController(IDashboardRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("dashboard")]
       /* [Authorize]*/
        public async Task<ActionResult> GetDashboard()
        {
            DashboardResponseDTO data = await _repo.GetDashboardStatsAsync();
            return Ok(ApiResponse.SuccessMessage(data, "Dashboard data retrieved successfully"));
        }
    }
}
