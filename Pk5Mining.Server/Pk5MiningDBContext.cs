using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Departments;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;
using Pk5Mining.Server.Models.Permissions;
using Pk5Mining.Server.Models.Roles;
using Pk5Mining.Server.Models.Subsidiaries;
using System.Reflection.Emit;

namespace Pk5Mining.Server
{
    public partial class Pk5MiningDBContext : DbContext
    {
        private readonly Action<Pk5MiningDBContext, ModelBuilder>? _modelCustomizer;

        #region Constructor
        public Pk5MiningDBContext(DbContextOptions<Pk5MiningDBContext> options,
            Action<Pk5MiningDBContext, ModelBuilder>? modelCustomizer = null)
            : base(options)
        {
            _modelCustomizer = modelCustomizer;
        }
        #endregion

        #region DBsets - Linking our Model classes to the Database table Objects
        public virtual DbSet<JobApplication> JobApplications { get; set; }
        public virtual DbSet<Jobs> Jobs { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<ContactUs> ContactUs { get; set; }
        public virtual DbSet<Subsidiary> Subsidiaries { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<Department> Departments { get; set; }

        #endregion


        #region OnConfiguring
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=ConnectionStrings:DevPk5MiningDB");
            }
        }
        /* protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
         {
             if (!optionsBuilder.IsConfigured)
             {
                 IConfigurationRoot configuration = new ConfigurationBuilder()
                     .AddJsonFile("appsettings.json", optional: true)
                     .AddUserSecrets<Pk5MiningDBContext>()
                     .AddEnvironmentVariables()
                     .Build();

                 // Determine which connection string to use
                 bool useCloudDatabase = bool.Parse(configuration["UseCloudDatabase"] ?? "false");
                 string connectionStringName = useCloudDatabase
                     ? "ConnectionStrings:CloudPk5MiningDB"
                     : "ConnectionStrings:Pk5MiningDB";
                 string connectionString = configuration[connectionStringName];

                 if (string.IsNullOrEmpty(connectionString))
                 {
                     throw new InvalidOperationException($"Connection string '{connectionStringName}' is not configured.");
                 }
                 optionsBuilder.UseSqlServer(connectionString);
             }
         }*/

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (_modelCustomizer is not null)
            {
                _modelCustomizer(this, modelBuilder);
            }
            modelBuilder.Entity<Jobs>(entity =>
            {
                entity.ToTable("Jobs", schema: "pk5");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedNever();
            });
            modelBuilder.Entity<JobApplication>(entity =>
            {
                entity.ToTable("JobApplications", schema: "pk5");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedNever();
            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users", schema: "pk5");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.HasOne(e => e.UserRoles)
                            .WithMany()
                            .HasForeignKey(e => e.RoleId)
                            .OnDelete(DeleteBehavior.SetNull);
                entity.HasOne(e => e.Subsidiary)
                .WithMany()
                .HasForeignKey(e => e.SubsidiaryId)
                .OnDelete(DeleteBehavior.SetNull);
                entity.HasOne(e => e.Department)
                .WithMany()
                .HasForeignKey(e => e.DepartmentId)
                .OnDelete(DeleteBehavior.SetNull);
            });
            modelBuilder.Entity<ContactUs>(entity =>
            {
                entity.ToTable("ContactUs", schema: "pk5");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });
            modelBuilder.Entity<Subsidiary>(entity =>
            {
                entity.ToTable("Subsidiaries", schema: "pk5");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });
            modelBuilder.Entity<Permission>(entity =>
            {
                entity.ToTable("Permissions", schema: "pk5");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedNever();
            });
            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("Roles", schema: "pk5");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(e => e.Subsidiary)
                        .WithMany()
                        .HasForeignKey(e => e.SubsidiaryId)
                        .OnDelete(DeleteBehavior.Cascade);
                entity.HasMany(e => e.Permissions)
                      .WithMany(p => p.UserRoles)
                      .UsingEntity(j => j.ToTable("RolePermissions", "pk5"));
            });
                modelBuilder.Entity<Department>(entity =>
                {
                    entity.ToTable("Departments", schema: "pk5");
                    entity.HasKey(e => e.Id);
                    entity.Property(e => e.Id).ValueGeneratedNever();
    
                    entity.HasOne(d => d.Subsidiary)
                        .WithMany()
                        .HasForeignKey(d => d.SubsidiaryId)
                        .OnDelete(DeleteBehavior.Cascade);
                });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}