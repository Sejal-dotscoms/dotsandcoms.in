using Dotsandcoms_in.Server.Data;
using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Dotsandcoms_in.Server.Services
{
    public class BlogService : IBlogService
    {
        private readonly AppDbContext _db;

        public BlogService(AppDbContext db) => _db = db;

        // ── Helpers ────────────────────────────────────────────────────
        private static List<string> ParseImageUrls(Blog b)
        {
            if (!string.IsNullOrWhiteSpace(b.ImageUrls))
            {
                try { return JsonSerializer.Deserialize<List<string>>(b.ImageUrls) ?? new(); }
                catch { /* fall through */ }
            }
            // backward-compat: single ImageUrl column
            return !string.IsNullOrWhiteSpace(b.ImageUrl)
                ? new List<string> { b.ImageUrl }
                : new List<string>();
        }

        private static string? SerializeImageUrls(List<string>? urls)
        {
            if (urls == null || urls.Count == 0) return null;
            return JsonSerializer.Serialize(urls);
        }

        private static BlogDto ToDto(Blog b) => new()
        {
            Id               = b.Id,
            IsVisible        = b.IsVisible,
            ImageUrl         = b.ImageUrl,
            ImageUrls        = ParseImageUrls(b),
            Title            = b.Title,
            PageTitle        = b.PageTitle,
            BrowserUrl       = b.BrowserUrl,
            MetaTags         = b.MetaTags,
            ShortDescription = b.ShortDescription,
            LongDescription  = b.LongDescription,
            BlogDate         = b.BlogDate,
            ExpiryDate       = b.ExpiryDate,
            AddedDate        = b.AddedDate,
            AddedIp          = b.AddedIp,
            ModifiedDate     = b.ModifiedDate,
            ModifiedIp       = b.ModifiedIp
        };

        private static PublicBlogDto ToPublicDto(Blog b) => new()
        {
            Id               = b.Id,
            ImageUrl         = b.ImageUrl,
            ImageUrls        = ParseImageUrls(b),
            Title            = b.Title,
            PageTitle        = b.PageTitle,
            BrowserUrl       = b.BrowserUrl,
            MetaTags         = b.MetaTags,
            ShortDescription = b.ShortDescription,
            LongDescription  = b.LongDescription,
            BlogDate         = b.BlogDate,
            ExpiryDate       = b.ExpiryDate
        };

        // ── GetAll ─────────────────────────────────────────────────────
        public async Task<BlogListDto> GetAllAsync(int page, int pageSize, string? search)
        {
            page     = Math.Max(1, page);
            pageSize = pageSize is > 0 and <= 100 ? pageSize : 10;

            var query = _db.Blogs.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim().ToLower();
                query = query.Where(b =>
                    b.Title.ToLower().Contains(s) ||
                    b.ShortDescription.ToLower().Contains(s));
            }

            var total = await query.CountAsync();
            var items = await query
                .OrderBy(b => b.BlogDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new BlogListDto
            {
                Items      = items.Select(ToDto).ToList(),
                TotalCount = total,
                Page       = page,
                PageSize   = pageSize
            };
        }

        // ── GetById ────────────────────────────────────────────────────
        public async Task<BlogDto?> GetByIdAsync(int id)
        {
            var blog = await _db.Blogs.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);
            return blog is null ? null : ToDto(blog);
        }

        // ── Create ─────────────────────────────────────────────────────
        public async Task<BlogDto> CreateAsync(CreateBlogDto dto, string ipAddress)
        {
            if (await TitleExistsAsync(dto.Title))
                throw new InvalidOperationException("A blog with this title already exists.");

            if (await BrowserUrlExistsAsync(dto.BrowserUrl))
                throw new InvalidOperationException("A blog with this browser URL already exists.");

            var blog = new Blog
            {
                IsVisible        = dto.IsVisible,
                ImageUrl         = dto.ImageUrls?.FirstOrDefault(),
                ImageUrls        = SerializeImageUrls(dto.ImageUrls),
                Title            = dto.Title.Trim(),
                PageTitle        = dto.PageTitle.Trim(),
                BrowserUrl       = dto.BrowserUrl.Trim().ToLower(),
                MetaTags         = dto.MetaTags,
                ShortDescription = dto.ShortDescription.Trim(),
                LongDescription  = dto.LongDescription,
                BlogDate         = dto.BlogDate,
                ExpiryDate       = dto.ExpiryDate,
                AddedDate        = DateTime.UtcNow,
                AddedIp          = ipAddress
            };

            _db.Blogs.Add(blog);
            await _db.SaveChangesAsync();
            return ToDto(blog);
        }

        // ── Update ─────────────────────────────────────────────────────
        public async Task<BlogDto?> UpdateAsync(int id, UpdateBlogDto dto, string ipAddress)
        {
            var blog = await _db.Blogs.FindAsync(id);
            if (blog is null) return null;

            if (await TitleExistsAsync(dto.Title, id))
                throw new InvalidOperationException("A blog with this title already exists.");

            if (await BrowserUrlExistsAsync(dto.BrowserUrl, id))
                throw new InvalidOperationException("A blog with this browser URL already exists.");

            blog.IsVisible        = dto.IsVisible;
            blog.ImageUrl         = dto.ImageUrls?.FirstOrDefault() ?? blog.ImageUrl;
            blog.ImageUrls        = SerializeImageUrls(dto.ImageUrls);
            blog.Title            = dto.Title.Trim();
            blog.PageTitle        = dto.PageTitle.Trim();
            blog.BrowserUrl       = dto.BrowserUrl.Trim().ToLower();
            blog.MetaTags         = dto.MetaTags;
            blog.ShortDescription = dto.ShortDescription.Trim();
            blog.LongDescription  = dto.LongDescription;
            blog.BlogDate         = dto.BlogDate;
            blog.ExpiryDate       = dto.ExpiryDate;
            blog.ModifiedDate     = DateTime.UtcNow;
            blog.ModifiedIp       = ipAddress;

            await _db.SaveChangesAsync();
            return ToDto(blog);
        }

        // ── Delete ─────────────────────────────────────────────────────
        public async Task<bool> DeleteAsync(int id)
        {
            var blog = await _db.Blogs.FindAsync(id);
            if (blog is null) return false;
            _db.Blogs.Remove(blog);
            await _db.SaveChangesAsync();
            return true;
        }

        // ── Public list ────────────────────────────────────────────────
        public async Task<List<PublicBlogDto>> GetPublicListAsync()
        {
            var today = DateTime.UtcNow.Date;
            var items = await _db.Blogs.AsNoTracking()
                .Where(b =>
                    b.IsVisible &&
                    b.BlogDate.Date <= today &&
                    (b.ExpiryDate == null || b.ExpiryDate.Value.Date >= today))
                .OrderByDescending(b => b.BlogDate)
                .ToListAsync();

            return items.Select(ToPublicDto).ToList();
        }

        // ── Public single blog by ID ───────────────────────────────────
        public async Task<PublicBlogDto?> GetPublicByIdAsync(int id)
        {
            var today = DateTime.UtcNow.Date;
            var blog = await _db.Blogs.AsNoTracking()
                .FirstOrDefaultAsync(b =>
                    b.Id == id &&
                    b.IsVisible &&
                    b.BlogDate.Date <= today &&
                    (b.ExpiryDate == null || b.ExpiryDate.Value.Date >= today));

            return blog is null ? null : ToPublicDto(blog);
        }

        // ── Public single blog by slug (BrowserUrl) ────────────────────
        public async Task<PublicBlogDto?> GetPublicBySlugAsync(string slug)
        {
            var today = DateTime.UtcNow.Date;
            var normalised = slug.Trim().ToLower();
            var blog = await _db.Blogs.AsNoTracking()
                .FirstOrDefaultAsync(b =>
                    b.BrowserUrl.ToLower() == normalised &&
                    b.IsVisible &&
                    b.BlogDate.Date <= today &&
                    (b.ExpiryDate == null || b.ExpiryDate.Value.Date >= today));

            return blog is null ? null : ToPublicDto(blog);
        }

        // ── TitleExists ────────────────────────────────────────────────
        public async Task<bool> TitleExistsAsync(string title, int? excludeId = null)
        {
            var normalised = title.Trim().ToLower();
            return await _db.Blogs.AsNoTracking()
                .AnyAsync(b =>
                    b.Title.ToLower() == normalised &&
                    (excludeId == null || b.Id != excludeId));
        }

        // ── BrowserUrlExists ───────────────────────────────────────────
        public async Task<bool> BrowserUrlExistsAsync(string browserUrl, int? excludeId = null)
        {
            var normalised = browserUrl.Trim().ToLower();
            return await _db.Blogs.AsNoTracking()
                .AnyAsync(b =>
                    b.BrowserUrl.ToLower() == normalised &&
                    (excludeId == null || b.Id != excludeId));
        }
    }
}
