using AutoMapper;
using Pk5Mining.Server.Configuration.Mapper;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Repositories;
using Pk5Mining.Server.Repositories.Admin;
using Pk5Mining.Server.Repositories.Contact_Us;
using Pk5Mining.Server.Repositories.Dashboard;
using Pk5Mining.Server.Repositories.Job;
using Pk5Mining.Server.Repositories.Job.Job_Specific_Repo;
using Pk5Mining.Server.Repositories.Job_Application;
using Pk5Mining.Server.Repositories.Job_Application.JobApplication_Specific_Repo;
using Pk5Mining.Server.Services;
using Pk5Mining.Server.Services.Cloud_Service;
using Pk5Mining.Server.Services.Email;
using Pk5Mining.Server.Services.Email.Agro_Mail;
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
            services.AddScoped<IEmailTemplateService, EmailTemplateService>();

            services.AddScoped<Abs_Pk5Repo<IJobs, IJobsDTO>, JobRepo>();
            services.AddScoped<Abs_Pk5Repo<IJobApplication, IJobApplicationDTO>, JobApplicationRepo>();
            services.AddScoped<IContactUsRepo , ContactUsRepo>();
            services.AddScoped<IJobSpecificRepo, JobSpecificRepo>();
            services.AddScoped<IDashboardRepo , DashboardRepo>();
            services.AddScoped<IJobApplicationSpecificRepo, JobApplicationSpecificRepo>();
            services.AddScoped<IUserRepo,  UserRepo>();
            services.AddScoped<ITokenService , TokenService>();
            services.AddTransient<IMailService  , MailService>();
            services.AddTransient<IAgroMailService, AgroMailService>();


            services.AddCors(options =>
            {
                options.AddPolicy("MyAllowSpecificOrigins",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173", "https://localhost:5173",
                            "http://localhost:5174", "https://localhost:5174",
                            "http://localhost:5175", "https://localhost:5175",
                            "https://pk5miningltd.com", "https://pk5miningltd-test.vercel.app",
                            "https://pk-5-agro.vercel.app")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });

            return services;
        }
    }

}
