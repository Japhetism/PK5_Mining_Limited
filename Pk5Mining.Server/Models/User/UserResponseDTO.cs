namespace Pk5Mining.Server.Models.User
{
    public class UserResponseDto
    {
        public long Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime DT_Created { get; set; }

        public LookupDto Subsidiary { get; set; } = new();
        public LookupDto Department { get; set; } = new();
        public LookupDto UserRole { get; set; } = new();
    }
    public class LookupDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
