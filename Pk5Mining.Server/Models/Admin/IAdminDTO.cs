namespace Pk5Mining.Server.Models.Admin
{
    public interface IAdminDTO
    {
        string FirstName { get; set; }
        long Id { get; set; }
        string LastName { get; set; }
        string Password { get; set; }
        string Role { get; set; }
        string Username { get; set; }
        bool? HasChangedPassword { get; set; }
    }
}