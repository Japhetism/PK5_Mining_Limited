using Pk5Mining.Server.Models.Contact_Us;

namespace Pk5Mining.Server.Repositories.Contact_Us
{
    public interface IContactUsRepo
    {
        Task<(IContactUs?, string?, bool)> CreateAgroAsync(IContactUsDTO item);
        Task<(IContactUs?, string?, bool)> CreateAsync(IContactUsDTO item);
        Task<(IContactUs?, string?)> GetById(long Id);
        Task<IEnumerable<IContactUs>> GetAll();
        Task<(IContactUs?, string?, bool)> UpdateRepoItem(long id, ContactUsUpdateDTO dto);
        Task<(IEnumerable<IContactUs> Contacts, int TotalCount)> GetFilteredContacts( int pageNumber, int pageSize, string? email, string? subject, string? name, string? status, string? appId, DateTime? startDate, DateTime? endDate);
    }
}