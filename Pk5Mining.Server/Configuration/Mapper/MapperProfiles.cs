using AutoMapper;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Departments;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Models.Roles;
using Pk5Mining.Server.Models.Subsidiaries;
using Pk5Mining.Server.Models.User;
using Pk5Mining.Server.Models.UserRoles;

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
            CreateMap<Jobs, JobLightResponseDTO>();
            CreateMap<JobApplication, JobApplicationResponseDTO>().ForMember(dest => dest.Job, opt => opt.MapFrom(src => src.Jobs));
            CreateMap<ContactUs, ContactUsDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, LoginResponseDTO>().ReverseMap();
            CreateMap<UpdateUserDto, User>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<User, UserResponseDto>().ReverseMap();
            CreateMap<Subsidiary, LookupDto>().ReverseMap();
            CreateMap<Department, LookupDto>().ReverseMap();
            CreateMap<UserRole, LookupDto>().ReverseMap();
            CreateMap<Subsidiary, SubsidiaryDto>().ReverseMap();
            CreateMap<Subsidiary, SubsidiaryStatusUpdateDto>().ReverseMap();
            CreateMap<UserRole, UserRoleDto>().ReverseMap();
            CreateMap<UserRole, UserRoleStatusUpdateDto>().ReverseMap();
            CreateMap<Subsidiary, SubsidiaryLightResponse>().ReverseMap();
            CreateMap<UserRole, RoleLightResponse>().ReverseMap();
            CreateMap<Department, DepartmentDto>().ReverseMap();
            CreateMap<Department, DepartmentLightResponse>().ReverseMap();

        }
    }
}