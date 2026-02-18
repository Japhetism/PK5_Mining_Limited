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
            CreateMap<Jobs, JobsDTO>().ForMember(dest => dest.ApplicationsCount,opt => opt.MapFrom(src => src.JobApplications != null
            ? src.JobApplications.Count : 0));
        }
    }
}