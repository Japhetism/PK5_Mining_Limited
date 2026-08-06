namespace Pk5Mining.Server.Models.User
{
    public class UpdateUserDto
    {
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public long? SubsidiaryId { get; set; }
        public long? DepartmentId { get; set; }
        public long? RoleId { get; set; }
    }
}