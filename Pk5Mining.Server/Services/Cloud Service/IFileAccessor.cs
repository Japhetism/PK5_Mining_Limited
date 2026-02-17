
namespace Pk5Mining.Server.Services.Cloud_Service
{
    public interface IFileAccessor
    {
        Task<FileUploadResult> AddFile(IFormFile file);
        Task<string> DeleteFile(string publicId);
    }
}