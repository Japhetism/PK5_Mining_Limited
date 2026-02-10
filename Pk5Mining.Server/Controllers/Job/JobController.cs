using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Repositories;

namespace Pk5Mining.Server.Controllers.Job
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly Abs_Pk5Repo<IJobs, IJobsDTO> _jobRepo;

        public JobController(Abs_Pk5Repo<IJobs, IJobsDTO> jobRepo)
        {
            _jobRepo = jobRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IJobs>>> Get()
        {
            var jobs = await _jobRepo.GetRepoItems();
            return Ok((jobs, "Job retrieved successfully."));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IJobs>> Get(long id)
        {
            (IJobs? job, string? error) = await _jobRepo.GetRepoItem(id);

            if (job == null)
            {
                return NotFound("Job Not Found");
            }

            return Ok((job, "Job retrieved successfully."));
        }

        [HttpPost]
        public async Task<ActionResult<IJobs>> Post([FromBody] JobsDTO value)
        {
            string? error = null;
            bool isInternalError = false;

            try
            {
                (IJobs? job, error, isInternalError) = await _jobRepo.PostRepoItem(value);

                if (error != null)
                {
                    return BadRequest(error);
                }

                return CreatedAtAction(nameof(Get), new { id = job?.Id },
                (job, "Job created successfully."));

            }
            catch (Exception)
            {
                if (isInternalError)
                {
                    return StatusCode(500, "Internal server error.");
                }
                else
                {
                    return BadRequest("Failed to create Job.");
                }
            }
        }

    }
}
