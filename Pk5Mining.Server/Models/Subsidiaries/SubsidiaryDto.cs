namespace Pk5Mining.Server.Models.Subsidiaries
{
    public class SubsidiaryDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string Country { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Status { get; set; } = null!;
        public DateTime? DT_Created { get; set; }
        public DateTime? DT_Modified { get; set; }
    }
}
