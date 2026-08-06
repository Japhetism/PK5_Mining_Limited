using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories.Permissions;
using System.Security;

namespace Pk5Mining.Server.Controllers.Permission
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionRepo _permissionRepo;

        public PermissionController(IPermissionRepo permissionRepo)
        {
            _permissionRepo = permissionRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var permissions = await _permissionRepo.GetAll();
            return Ok(ApiResponse.SuccessMessage(permissions, "Data Retrieved"));
        }
    }
}
