namespace Pk5Mining.Server.Models.Departments
{
    public class DepartmentDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public long SubsidiaryId { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime DT_Created { get; set; }
        public DateTime? DT_Modified { get; set; }
    }
}
