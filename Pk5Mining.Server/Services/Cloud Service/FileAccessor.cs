using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace Pk5Mining.Server.Services.Cloud_Service
{
    public class FileAccessor : IFileAccessor
    {
        private readonly Cloudinary _cloudinary;
        private readonly string _baseDirectory = "Pk5 Folder";

        public FileAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }
        public async Task<FileUploadResult> AddFile(IFormFile file)
        {
            var assetFolder = _baseDirectory;
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new RawUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    AssetFolder = assetFolder,
                    UseFilename = true,
                };
                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }
                return new FileUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString()
                };

            }
            return null;
        }

        public async Task<string> DeleteFile(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;

        }

    }
}