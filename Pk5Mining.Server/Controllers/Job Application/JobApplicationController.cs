using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Repositories;

namespace Pk5Mining.Server.Controllers.Job_Application
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationController : ControllerBase
    {
        private readonly Abs_Pk5Repo<IJobApplication, IJobApplicationDTO> _jobApplicationRepo;

        public JobApplicationController(Abs_Pk5Repo<IJobApplication, IJobApplicationDTO> jobApplicationRepo)
        {
            _jobApplicationRepo = jobApplicationRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IJobApplication>>> Get()
        {
            var jobApplication = await _jobApplicationRepo.GetRepoItems();
            return Ok((jobApplication, "Job Application retrieved successfully."));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IJobApplication>> Get(long id)
        {
            (IJobApplication? jobApplication, string? error) = await _jobApplicationRepo.GetRepoItem(id);

            if (jobApplication == null)
            {
                return NotFound("Job Application Not Found");
            }
            return Ok((jobApplication, "Job Application retrieved successfully."));
        }

        [HttpPost]
        public async Task<ActionResult<IJobApplication>> Post([FromBody] JobApplicationDTO value)
        {
            string? error = null;
            bool isInternalError = false;

            try
            {
                (IJobApplication? jobApplication, error, isInternalError) = await _jobApplicationRepo.PostRepoItem(value);

                if (error != null)
                {
                    return BadRequest(error);
                }

                return CreatedAtAction(nameof(Get), new { id = jobApplication?.Id },
                (jobApplication, "Job Application created successfully."));

            }
            catch (Exception)
            {
                if (isInternalError)
                {
                    return StatusCode(500, "Internal server error.");
                }
                else
                {
                    return BadRequest("Failed to create Job application.");
                }
            }
        }

    }
}
