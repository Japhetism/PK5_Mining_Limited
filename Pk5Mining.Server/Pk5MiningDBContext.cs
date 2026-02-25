using Microsoft.EntityFrameworkCore;
using Pk5Mining.Server.Models.Admin;
using Pk5Mining.Server.Models.Contact_Us;
using Pk5Mining.Server.Models.Job;
using Pk5Mining.Server.Models.Job_Application;

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
        public virtual DbSet<Admins> Admins { get; set; }
        public virtual DbSet<ContactUs> ContactUs { get; set; }


        #endregion


        #region OnConfiguring
        /*        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
                {
                    if (!optionsBuilder.IsConfigured)
                    {
                        optionsBuilder.UseSqlServer("Name=ConnectionStrings:Pk5MiningDB");
                    }
                }*/
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
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
        }

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
            modelBuilder.Entity<Admins>(entity =>
            {
                entity.ToTable("Admins", schema: "pk5");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedNever();
            });
            modelBuilder.Entity<ContactUs>(entity =>
            {
                entity.ToTable("ContactUs", schema: "pk5");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedNever();
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}