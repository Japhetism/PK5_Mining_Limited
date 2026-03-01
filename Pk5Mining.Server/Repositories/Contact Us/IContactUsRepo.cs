using Pk5Mining.Server.Models.Contact_Us;

namespace Pk5Mining.Server.Repositories.Contact_Us
{
    public interface IContactUsRepo
    {
        Task<(IContactUs?, string?, bool)> CreateAgroAsync(IContactUsDTO item);
        Task<(IContactUs?, string?, bool)> CreateAsync(IContactUsDTO item);
    }
}