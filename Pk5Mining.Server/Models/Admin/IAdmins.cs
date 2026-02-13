namespace Pk5Mining.Server.Models.Admin
{
    public interface IAdmins
    {
        string FirstName { get; set; }
        long Id { get; set; }
        string LastName { get; set; }
        string Password { get; set; }
        string Username { get; set; }
    }
}