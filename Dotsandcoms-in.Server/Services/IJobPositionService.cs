using Dotsandcoms_in.Server.DTOs;

namespace Dotsandcoms_in.Server.Services
{
    public interface IJobPositionService
    {
        Task<IReadOnlyList<PublicJobCardDto>> GetPublicCardsAsync();
        Task<PublicJobDetailDto?> GetPublicBySlugAsync(string slug);
        Task<IReadOnlyList<JobPositionListItemDto>> GetAdminListAsync();
        Task<JobPositionDto?> GetAdminByIdAsync(int id);
        Task<JobPositionDto> CreateAsync(JobPositionWriteDto dto);
        Task<JobPositionDto?> UpdateAsync(int id, JobPositionWriteDto dto);
        Task<bool> UpdateFlagsAsync(int id, JobPositionFlagsDto flags);
        Task<bool> DeleteAsync(int id);
        Task<string> SaveImageAsync(IFormFile file, string? kind = null);
    }
}
