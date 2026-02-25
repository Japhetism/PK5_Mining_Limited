using AutoMapper;
using Pk5Mining.Server.Configuration.Mapper;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Repositories;
using Pk5Mining.Server.Repositories.Admin;
using Pk5Mining.Server.Repositories.Contact_Us;
using Pk5Mining.Server.Repositories.Job;
using Pk5Mining.Server.Repositories.Job.Job_Specific_Repo;
using Pk5Mining.Server.Repositories.Job_Application;
using Pk5Mining.Server.Repositories.Job_Application.JobApplication_Specific_Repo;
using Pk5Mining.Server.Services;
using Pk5Mining.Server.Services.Cloud_Service;
using Pk5Mining.Server.Services.Email;
using System.IO;

namespace Pk5Mining.Server.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddAutoMapper(typeof(MapperProfiles));
            services.AddDbContext<Pk5MiningDBContext>();

            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddScoped<IFileAccessor, FileAccessor>();

            services.AddScoped<Abs_Pk5Repo<IJobs, IJobsDTO>, JobRepo>();
            services.AddScoped<Abs_Pk5Repo<IJobApplication, IJobApplicationDTO>, JobApplicationRepo>();
            services.AddScoped<Abs_Pk5Repo<IContactUs, IContactUsDTO>, ContactUsRepo>();
            services.AddScoped<IJobSpecificRepo, JobSpecificRepo>();
            services.AddScoped<IJobApplicationSpecificRepo, JobApplicationSpecificRepo>();
            services.AddScoped<IAdminRepo,  AdminRepo>();
            services.AddScoped<ITokenService , TokenService>();
            services.AddTransient<IMailService  , MailService>();


            services.AddCors(options =>
            {
                options.AddPolicy("MyAllowSpecificOrigins",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173", "https://localhost:5173",
                            "http://localhost:5174", "https://localhost:5174",
                            "http://localhost:5175", "https://localhost:5175")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });

            return services;
        }
    }

}
