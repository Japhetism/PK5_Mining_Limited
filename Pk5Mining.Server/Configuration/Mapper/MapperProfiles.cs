using AutoMapper;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;

namespace Pk5Mining.Server.Configuration.Mapper
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<Jobs, JobsDTO>().ReverseMap();
            CreateMap<JobApplication, JobApplicationDTO>().ReverseMap();
        }
    }
}