using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Job_Application;
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
        [HttpGet("{id:long}")]
        [Authorize]
        public async Task<IActionResult> Get(long id)
        {
            var (contact, error) = await _repo.GetById(id);
            if (error != null)
            {
                return NotFound(ApiResponse.Failure(null, error));
            }
            return Ok(ApiResponse.SuccessMessage(contact, "Data Retrieved"));
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var contacts = await _repo.GetAll();
            return Ok(ApiResponse.SuccessMessage(contacts, "Data Retrieved"));
        }
        [Authorize]
        [HttpGet("filter")]
        public async Task<IActionResult> Get(
             [FromQuery] int pageNumber = 1,
             [FromQuery] int pageSize = 10,
             [FromQuery] string? email = null,
             [FromQuery] string? subject = null,
             [FromQuery] string? name = null,
             [FromQuery] string? status = null,
             [FromQuery] string? appId = null,
             [FromQuery] DateTime? startDate = null,
             [FromQuery] DateTime? endDate = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var (contacts, totalCount) = await _repo.GetFilteredContacts(
                pageNumber,
                pageSize,
                email,
                subject,
                name,
                status,
                appId,
                startDate,
                endDate);

            var response = new
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Data = contacts
            };
            return Ok(ApiResponse.SuccessMessage(response, "Contact requests retrieved successfully."));
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] ContactUsUpdateDTO value)
        {
            var (contactUs, error, isInternalError) = await _repo.UpdateRepoItem(id, value);
            if (contactUs == null)
            {
                if (isInternalError)
                    return StatusCode(500, ApiResponse.UnknownException(null, error ?? "Internal Server Error"));

                return NotFound(ApiResponse.NotFoundException(null, error ?? $"Contact Message with ID {id} not found."));
            }
            return Ok(ApiResponse.SuccessMessage(contactUs, " Contact Message Updated successfully."));
        }
    }
}
