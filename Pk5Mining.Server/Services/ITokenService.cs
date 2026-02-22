using Pk5Mining.Server.Models.Admin;

namespace Pk5Mining.Server.Services
{
    public interface ITokenService
    {
        string CreateJWTToken(Admins admins);
    }
}