using System.ComponentModel.DataAnnotations;

namespace Pk5Mining.Server.Models.Admin
{
    public interface IUserDTO
    {
        public long Id { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public long SubsidiaryId { get; set; }
        public long DepartmentId { get; set; }
        public long RoleId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime DT_Created { get; set; }
    }
}