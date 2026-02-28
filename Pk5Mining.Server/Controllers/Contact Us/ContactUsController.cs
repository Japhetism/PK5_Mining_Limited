using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories;
using Pk5Mining.Server.Repositories.Contact_Us;

namespace Pk5Mining.Server.Controllers.Contact_Us
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly IContactUsRepo _repo;

        public ContactUsController(IContactUsRepo repo)
        {
            _repo = repo;
        }
        [HttpPost("contact-us")]
        public async Task<IActionResult> Post([FromBody] ContactUsDTO dto)
        {

            var (contact, error, isInternalError) = await _repo.CreateAsync(dto);

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
        [HttpPost("agro-contact-us")]
        public async Task<IActionResult> PostAgro([FromBody] ContactUsDTO dto)
        {

            var (contact, error, isInternalError) = await _repo.CreateAgroAsync(dto);

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
