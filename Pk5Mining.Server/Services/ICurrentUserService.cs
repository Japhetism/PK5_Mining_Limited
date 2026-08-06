namespace Pk5Mining.Server.Services
{
    public interface ICurrentUserService
    {
        long? UserId { get; }
        long? SubsidiaryId { get; }
        long? DepartmentId { get; }
        long? RoleId { get; }
        string? Email { get; }
    }
}
