using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories;
using Pk5Mining.Server.Repositories.Job.Job_Specific_Repo;

namespace Pk5Mining.Server.Controllers.Job
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly Abs_Pk5Repo<IJobs, IJobsDTO> _jobRepo;
        private readonly IJobSpecificRepo _jobSpecificRepo;
        private readonly IMapper _mapper;

        public JobController(Abs_Pk5Repo<IJobs, IJobsDTO> jobRepo, IJobSpecificRepo jobSpecificRepo, IMapper mapper)
        {
            _jobRepo = jobRepo;
            _jobSpecificRepo = jobSpecificRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IJobs>>> Get()
        {
            var jobs = await _jobRepo.GetRepoItems();
            return Ok(ApiResponse.SuccessMessage(jobs, "Jobs retrieved successfully."));
        }
        [HttpGet("light")]
        public async Task<ActionResult<IEnumerable<IJobs>>> GetLight()
        {
            var jobs = await _jobSpecificRepo.GetJob();
            return Ok(ApiResponse.SuccessMessage(jobs, "Jobs retrieved successfully."));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IJobs>> Get(long id)
        {
            (IJobs? job, string? error) = await _jobRepo.GetRepoItem(id);

            if (job == null)
            {
                return NotFound(ApiResponse.NotFoundException(null, error ?? $"Job with ID {id} not found."));
            }
            return Ok(ApiResponse.SuccessMessage(job, "Job retrieved successfully."));
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
                ApiResponse.SuccessMessage(job, "Job created successfully."));

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

        [HttpGet("filter")]
        public async Task<IActionResult> GetJobs(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] bool? isActive = null,
            [FromQuery] string? department = null,
            [FromQuery] string? location = null,
            [FromQuery] string? jobType = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var (jobs, totalCount) = await _jobSpecificRepo.GetJobsAsync(
                pageNumber,
                pageSize,
                isActive,
                department,
                location,
                jobType);

            var response = new
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Data = jobs
            };
            return Ok(ApiResponse.SuccessMessage(response, "Jobs retrieved successfully."));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] JobsDTO value)
        {
            var (job, error, isInternalError) = await _jobSpecificRepo.UpdateRepoItem(id, value);
            if (job == null)
            {
                if (isInternalError)
                    return StatusCode(500, ApiResponse.UnknownException(null, error ?? "Internal Server Error"));

                return NotFound(ApiResponse.NotFoundException(null, error ?? $"Job with ID {id} not found."));
            }
            return Ok(ApiResponse.SuccessMessage(job, "Job updated successfully."));
        }

    }
}
