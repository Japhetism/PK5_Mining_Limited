using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Models.Response;
using Pk5Mining.Server.Repositories;
using Pk5Mining.Server.Repositories.Job_Application.JobApplication_Specific_Repo;
using Pk5Mining.Server.Services.Cloud_Service;

namespace Pk5Mining.Server.Controllers.Job_Application
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationController : ControllerBase
    {
        private readonly Abs_Pk5Repo<IJobApplication, IJobApplicationDTO> _jobApplicationRepo;
        private readonly IMapper _mapper;
        private readonly IJobApplicationSpecificRepo _specificRepo;
        private readonly IFileAccessor _fileAccessor;

        public JobApplicationController(Abs_Pk5Repo<IJobApplication, IJobApplicationDTO> jobApplicationRepo, IMapper mapper, IJobApplicationSpecificRepo specificRepo, IFileAccessor fileAccessor)
        {
            _jobApplicationRepo = jobApplicationRepo;
            _mapper = mapper;
            _specificRepo = specificRepo;
            _fileAccessor = fileAccessor;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IJobApplication>>> Get()
        {
            var jobApplication = await _jobApplicationRepo.GetRepoItems();
            return Ok(ApiResponse.SuccessMessage(jobApplication, "Job Applications retrieved successfully."));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IJobApplication>> Get(long id)
        {
            (IJobApplication? jobApplication, string? error) = await _jobApplicationRepo.GetRepoItem(id);

            if (jobApplication == null)
            {
                return NotFound(ApiResponse.NotFoundException(null, error ?? $"Job Application with ID {id} not found."));
            }
            return Ok(ApiResponse.SuccessMessage(jobApplication, "Job Application retrieved successfully."));
        }

        [HttpGet("ByJobId/{id}")]
        public async Task<ActionResult<IJobApplication>> GetByJobId(long id)
        {
            (IJobApplication? jobApplication, string? error, _) = await _specificRepo.GetByJobId(id);

            if (jobApplication == null)
            {
                return NotFound(ApiResponse.NotFoundException(null, error ?? $"Job Application with Job ID {id} not found."));
            }
            return Ok(ApiResponse.SuccessMessage(jobApplication, "Job Application retrieved successfully."));
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetJobs( [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string? email = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var (jobApplication, totalCount) = await _specificRepo.GetJobsAsync( pageNumber, pageSize, email);
            var response = new
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Data = jobApplication
            };
            return Ok(ApiResponse.SuccessMessage(response, "Jobs retrieved successfully."));
        }

        [HttpPost]
        public async Task<ActionResult<IJobApplication>> Post([FromForm] JobApplicationDTO value)
        {
            string? error = null;
            bool isInternalError = false;

            try
            {
                string? resumeUrl = null;
                if (value.ResumeFile != null)
                {
                    var uploadResult = await _fileAccessor.AddFile(value.ResumeFile);
                    resumeUrl = uploadResult?.Url;
                }
                value.Resume = resumeUrl;

                (IJobApplication? jobApplication, error, isInternalError) = await _jobApplicationRepo.PostRepoItem(value);

                if (error != null)
                {
                    return BadRequest(error);
                }

                return CreatedAtAction(nameof(Get), new { id = jobApplication?.Id },
                ApiResponse.SuccessMessage(jobApplication, "Job application created successfully."));

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

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] JobApplicationUpdateDTO value)
        {
            var (jobApplication, error, isInternalError) = await _specificRepo.UpdateRepoItem(id, value);
            if (jobApplication == null)
            {
                if (isInternalError)
                    return StatusCode(500, ApiResponse.UnknownException(null, error ?? "Internal Server Error"));

                return NotFound(ApiResponse.NotFoundException(null, error ?? $"Job Application with ID {id} not found."));
            }
            return Ok(ApiResponse.SuccessMessage(jobApplication, "Job  Application updated successfully."));
        }
    }
}