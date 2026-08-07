using Dotsandcoms_in.Server.Data;
using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Dotsandcoms_in.Server.Services
{
    public class BlogService : IBlogService
    {
        private readonly AppDbContext _db;
        private readonly IWebHostEnvironment _env;

        public BlogService(AppDbContext db, IWebHostEnvironment env)
        {
            _db  = db;
            _env = env;
        }

        // ── Image helpers ───────────────────────────────────────────────
        // Converts a base64 data URI to a saved file and returns its public URL.
        // If the value is already a URL (not base64), returns it unchanged.
        private string? SaveImage(string? value)
        {
            if (string.IsNullOrWhiteSpace(value) || !value.StartsWith("data:image/"))
                return value;

            var comma = value.IndexOf(',');
            if (comma < 0) return null;

            var header = value[..comma];
            var ext = header.Contains("jpeg") || header.Contains("jpg") ? ".jpg"
                    : header.Contains("png")  ? ".png"
                    : header.Contains("webp") ? ".webp"
                    : header.Contains("gif")  ? ".gif"
                    : ".jpg";

            byte[] bytes;
            try { bytes = Convert.FromBase64String(value[(comma + 1)..]); }
            catch { return null; }

            // WebRootPath is null when wwwroot doesn't exist yet; create it from ContentRootPath
            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
            var dir     = Path.Combine(webRoot, "uploads", "blogs");
            Directory.CreateDirectory(dir);

            var fileName = $"{Guid.NewGuid()}{ext}";
            File.WriteAllBytes(Path.Combine(dir, fileName), bytes);
            return $"/uploads/blogs/{fileName}";
        }

        private List<string>? SaveImages(List<string>? urls) =>
            urls?.Select(SaveImage).Where(u => u != null).Select(u => u!).ToList();

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
        // Slim projection: skips LongDescription, MetaTags, ImageUrls so the
        // admin list table loads instantly regardless of image/content size.
        // Full data is still returned by GetByIdAsync when editing a blog.
        public async Task<BlogListDto> GetAllAsync(int page, int pageSize, string? search)
        {
            page     = Math.Max(1, page);
            pageSize = pageSize is > 0 and <= 100 ? pageSize : 10;

            IQueryable<Blog> query = _db.Blogs.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim().ToLower();
                query = query.Where(b =>
                    b.Title.ToLower().Contains(s) ||
                    b.ShortDescription.ToLower().Contains(s));
            }

            var total = await query.CountAsync();
            var rows  = await query
                .OrderBy(b => b.BlogDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(b => new
                {
                    b.Id,
                    b.IsVisible,
                    b.Title,
                    b.PageTitle,
                    b.BrowserUrl,
                    b.ShortDescription,
                    b.BlogDate,
                    b.ExpiryDate,
                    b.AddedDate,
                    b.AddedIp,
                    b.ModifiedDate,
                    b.ModifiedIp,
                    // LongDescription, MetaTags, ImageUrl, ImageUrls excluded
                })
                .ToListAsync();

            return new BlogListDto
            {
                Items = rows.Select(r => new BlogDto
                {
                    Id               = r.Id,
                    IsVisible        = r.IsVisible,
                    Title            = r.Title,
                    PageTitle        = r.PageTitle,
                    BrowserUrl       = r.BrowserUrl,
                    ShortDescription = r.ShortDescription,
                    BlogDate         = r.BlogDate,
                    ExpiryDate       = r.ExpiryDate,
                    AddedDate        = r.AddedDate,
                    AddedIp          = r.AddedIp,
                    ModifiedDate     = r.ModifiedDate,
                    ModifiedIp       = r.ModifiedIp,
                    LongDescription  = string.Empty,
                    MetaTags         = null,
                    ImageUrl         = null,
                    ImageUrls        = new List<string>(),
                }).ToList(),
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

            var savedUrls = SaveImages(dto.ImageUrls);

            var blog = new Blog
            {
                IsVisible        = dto.IsVisible,
                ImageUrl         = savedUrls?.FirstOrDefault(),
                ImageUrls        = SerializeImageUrls(savedUrls),
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

            var savedUrls = SaveImages(dto.ImageUrls);

            blog.IsVisible        = dto.IsVisible;
            blog.ImageUrl         = savedUrls?.FirstOrDefault() ?? blog.ImageUrl;
            blog.ImageUrls        = SerializeImageUrls(savedUrls);
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

        // Returns first file-based URL from ImageUrl or ImageUrls JSON; skips base64.
        private static string? PickCoverUrl(string? imageUrl, string? imageUrlsJson)
        {
            if (!string.IsNullOrWhiteSpace(imageUrl) && !imageUrl.StartsWith("data:"))
                return imageUrl;

            if (!string.IsNullOrWhiteSpace(imageUrlsJson))
            {
                try
                {
                    var list = JsonSerializer.Deserialize<List<string>>(imageUrlsJson);
                    return list?.FirstOrDefault(u => !string.IsNullOrWhiteSpace(u) && !u.StartsWith("data:"));
                }
                catch { /* fall through */ }
            }

            return null;
        }

        // ── Public list ────────────────────────────────────────────────
        // Slim projection — skips LongDescription, MetaTags, and base64 image data
        // so the list response stays small regardless of image/content size.
        public async Task<List<PublicBlogDto>> GetPublicListAsync()
        {
            var today = DateTime.UtcNow.Date;
            var rows = await _db.Blogs.AsNoTracking()
                .Where(b =>
                    b.IsVisible &&
                    b.BlogDate.Date <= today &&
                    (b.ExpiryDate == null || b.ExpiryDate.Value.Date >= today))
                .OrderByDescending(b => b.BlogDate)
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    b.PageTitle,
                    b.BrowserUrl,
                    b.ShortDescription,
                    b.BlogDate,
                    b.ExpiryDate,
                    b.ImageUrl,
                    b.ImageUrls,
                    // LongDescription and MetaTags intentionally excluded
                })
                .ToListAsync();

            return rows.Select(r => new PublicBlogDto
            {
                Id               = r.Id,
                Title            = r.Title,
                PageTitle        = r.PageTitle,
                BrowserUrl       = r.BrowserUrl,
                ShortDescription = r.ShortDescription,
                BlogDate         = r.BlogDate,
                ExpiryDate       = r.ExpiryDate,
                ImageUrl         = PickCoverUrl(r.ImageUrl, r.ImageUrls),
                ImageUrls        = new List<string>(),
                LongDescription  = string.Empty,
                MetaTags         = null,
            }).ToList();
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
