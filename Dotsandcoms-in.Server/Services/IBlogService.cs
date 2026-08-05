using Dotsandcoms_in.Server.DTOs;

namespace Dotsandcoms_in.Server.Services
{
    public interface IBlogService
    {
        Task<BlogListDto>         GetAllAsync(int page, int pageSize, string? search);
        Task<BlogDto?>            GetByIdAsync(int id);
        Task<BlogDto>             CreateAsync(CreateBlogDto dto, string ipAddress);
        Task<BlogDto?>            UpdateAsync(int id, UpdateBlogDto dto, string ipAddress);
        Task<bool>                DeleteAsync(int id);
        Task<bool>                TitleExistsAsync(string title, int? excludeId = null);
        Task<bool>                BrowserUrlExistsAsync(string browserUrl, int? excludeId = null);
        Task<List<PublicBlogDto>> GetPublicListAsync();
        Task<PublicBlogDto?>      GetPublicByIdAsync(int id);
        Task<PublicBlogDto?>      GetPublicBySlugAsync(string slug);
    }
}
