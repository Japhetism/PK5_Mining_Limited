using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories;

namespace Pk5Mining.Server.Controllers.Contact_Us
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly Abs_Pk5Repo<IContactUs, IContactUsDTO> _repo;

        public ContactUsController(Abs_Pk5Repo<IContactUs, IContactUsDTO> repo)
        {
            _repo = repo;
        }
        [HttpPost("contact-us")]
        public async Task<IActionResult> CreateContactUs([FromBody] ContactUsDTO dto)
        {

            var (contact, error, isInternalError) = await _repo.PostRepoItem(dto);

            if (isInternalError)
            {
                return BadRequest(ApiResponse.Failure(null, error ?? "An unexpected error occurred."));
            }
            if (error != null)
            {
                return BadRequest(ApiResponse.Failure(null, error));
            }
            return Ok(ApiResponse.SuccessMessage(contact, "Your message has been sent successfully."));
        }
    }
}
