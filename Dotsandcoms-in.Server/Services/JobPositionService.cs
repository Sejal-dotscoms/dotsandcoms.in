using System.Text.RegularExpressions;
using Dotsandcoms_in.Server.Data;
using Dotsandcoms_in.Server.Helpers;
using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Dotsandcoms_in.Server.Services
{
    public class JobPositionService : IJobPositionService
    {
        private static readonly HashSet<string> ImageExt = new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg", ".jpeg", ".png", ".gif", ".webp"
        };

        private static readonly HashSet<string> ReservedSlugs = new(StringComparer.OrdinalIgnoreCase)
        {
            "about-web-development-company-baroda",
            "website-mobile-app-development-company-portfolio-baroda",
            "services", "responsive-website-designing-company-vadodara",
            "android-ios-mobile-app-development-company-baroda",
            "windows-web-hosting-service-provider-baroda",
            "organic-seo-ppc-digital-marketing-vadodara",
            "contact-webdesign-mobileapp-socialmedia-marketing-baroda",
            "webhosting-vps-dedicated-server-support-baroda",
            "faqs-web-design-hosting-digital-marketing",
            "web-stories", "terms-and-conditions", "sitemap", "404",
            "accutechlabels-case-study-traditional-to-web-business",
            "1life-case-study-of-regional-to-national-reach",
            "auro-pumps-case-study-traditional-to-digital-lead-engine",
            "himile-india-case-study-global-manufacturing-digital-voice",
            "order-now", "web-hosting-details", "thank-you", "blogs",
            "training-and-job-vacancy-at-dots-coms-vadodara",
            "job-vacancy-at-dots-and-coms-company",
            "check-application-status", "application-received",
            "apply", "poweradmin", "api", "uploads", "assets", "swagger",
            "free-seo-performance-website-audit", "case-studies"
        };

        private readonly AppDbContext _db;
        private readonly IWebHostEnvironment _env;

        public JobPositionService(AppDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        public async Task<IReadOnlyList<PublicJobCardDto>> GetPublicCardsAsync()
        {
            var rows = await _db.JobPositions.AsNoTracking()
                .OrderBy(p => p.SortOrder).ThenBy(p => p.Id)
                .ToListAsync();
            return rows.Select(ToCard).ToList();
        }

        public async Task<PublicJobDetailDto?> GetPublicBySlugAsync(string slug)
        {
            var row = await FindBySlugAsync(slug);
            return row == null ? null : ToDetail(row);
        }

        public async Task<IReadOnlyList<JobPositionListItemDto>> GetAdminListAsync()
        {
            return await _db.JobPositions.AsNoTracking()
                .OrderBy(p => p.SortOrder).ThenBy(p => p.Id)
                .Select(p => new JobPositionListItemDto
                {
                    Id = p.Id,
                    Slug = p.Slug,
                    CardTitle = p.CardTitle,
                    PageHeading = p.PageHeading,
                    Location = p.Location,
                    IsVacancyOpen = p.IsVacancyOpen,
                    FreshersCanApply = p.FreshersCanApply,
                    SortOrder = p.SortOrder,
                    UpdatedAt = p.UpdatedAt
                })
                .ToListAsync();
        }

        public async Task<JobPositionDto?> GetAdminByIdAsync(int id)
        {
            var row = await _db.JobPositions.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
            return row == null ? null : ToDto(row);
        }

        public async Task<JobPositionDto> CreateAsync(JobPositionWriteDto dto)
        {
            var entity = new JobPosition { CreatedAt = DateTime.UtcNow };
            await ApplyAsync(entity, dto, excludeId: null);
            _db.JobPositions.Add(entity);
            await _db.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<JobPositionDto?> UpdateAsync(int id, JobPositionWriteDto dto)
        {
            var entity = await _db.JobPositions.FirstOrDefaultAsync(p => p.Id == id);
            if (entity == null) return null;
            await ApplyAsync(entity, dto, excludeId: id);
            await _db.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<bool> UpdateFlagsAsync(int id, JobPositionFlagsDto flags)
        {
            var entity = await _db.JobPositions.FirstOrDefaultAsync(p => p.Id == id);
            if (entity == null) return false;
            entity.IsVacancyOpen = flags.IsVacancyOpen;
            entity.FreshersCanApply = flags.FreshersCanApply;
            entity.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _db.JobPositions.FirstOrDefaultAsync(p => p.Id == id);
            if (entity == null) return false;
            _db.JobPositions.Remove(entity);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<string> SaveImageAsync(IFormFile file, string? kind = null)
        {
            var ext = Path.GetExtension(file.FileName);
            if (!ImageExt.Contains(ext))
                throw new InvalidOperationException("Upload a JPG, PNG, GIF, or WebP image.");
            if (file.Length <= 0 || file.Length > 2 * 1024 * 1024)
                throw new InvalidOperationException("Image must be under 2 MB.");

            await using var buffer = new MemoryStream();
            await file.CopyToAsync(buffer);
            var bytes = buffer.ToArray();
            RequireIconSize(bytes, kind);

            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
            var dir = Path.Combine(webRoot, "uploads", "careers");
            Directory.CreateDirectory(dir);
            var name = $"{Guid.NewGuid():N}{ext.ToLowerInvariant()}";
            var full = Path.Combine(dir, name);
            await File.WriteAllBytesAsync(full, bytes);
            return $"/uploads/careers/{name}";
        }

        private static void RequireIconSize(byte[] bytes, string? kind)
        {
            var card = string.Equals(kind, "card", StringComparison.OrdinalIgnoreCase);
            var skill = string.Equals(kind, "skill", StringComparison.OrdinalIgnoreCase);
            if (!card && !skill) return;
            if (!ImageSize.TryGet(bytes, out var width, out var height))
                throw new InvalidOperationException("Could not read that image.");
            if (card && (width != 200 || height != 200))
                throw new InvalidOperationException($"Card icon must be 200 × 200 px. This file is {width} × {height} px.");
            if (skill && (width != 100 || height != 100))
                throw new InvalidOperationException($"Skill icon must be 100 × 100 px. This file is {width} × {height} px.");
        }

        private async Task ApplyAsync(JobPosition entity, JobPositionWriteDto dto, int? excludeId)
        {
            var slug = (dto.Slug ?? "").Trim();
            if (!Regex.IsMatch(slug, @"^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$"))
                throw new InvalidOperationException("Slug may contain only letters, numbers, and hyphens.");
            if (ReservedSlugs.Contains(slug))
                throw new InvalidOperationException("That slug is already used by another page.");

            var slugKey = slug.ToLower();
            var taken = excludeId == null
                ? await _db.JobPositions.AnyAsync(p => p.Slug.ToLower() == slugKey)
                : await _db.JobPositions.AnyAsync(p => p.Slug.ToLower() == slugKey && p.Id != excludeId.Value);
            if (taken)
                throw new InvalidOperationException("That slug is already used by another position.");

            var cardTitle = Required(dto.CardTitle, "Card title");
            var pageHeading = Required(dto.PageHeading, "Page heading");
            var seoTitle = Required(dto.SeoTitle, "SEO title");
            var icon = Required(dto.IconUrl, "Card icon");
            if (icon.StartsWith("data:", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Upload the card icon before saving.");

            var bullets = (dto.CardBullets ?? new())
                .Select(b => new JobBulletDto
                {
                    Text = (b.Text ?? "").Trim(),
                    Children = (b.Children ?? new()).Select(c => c.Trim()).Where(c => c.Length > 0).ToList()
                })
                .Where(b => b.Text.Length > 0)
                .ToList();
            if (bullets.Count == 0)
                throw new InvalidOperationException("Add at least one key responsibility for the card.");

            var skills = (dto.SkillIcons ?? new())
                .Select(s => new JobSkillDto { Url = (s.Url ?? "").Trim(), Alt = (s.Alt ?? "").Trim() })
                .Where(s => s.Url.Length > 0)
                .ToList();
            if (skills.Any(s => s.Url.StartsWith("data:", StringComparison.OrdinalIgnoreCase)))
                throw new InvalidOperationException("Upload skill icons before saving.");
            if (skills.Any(s => s.Alt.Length == 0))
                throw new InvalidOperationException("Each skill icon needs a name.");

            var sort = dto.SortOrder;
            if (sort < 1)
            {
                var max = await _db.JobPositions.MaxAsync(p => (int?)p.SortOrder) ?? 0;
                sort = max + 1;
            }

            entity.Slug = slug;
            entity.ApplyFor = (dto.ApplyFor ?? "").Trim();
            entity.SeoTitle = seoTitle;
            entity.SeoDescription = (dto.SeoDescription ?? "").Trim();
            entity.SeoKeywords = (dto.SeoKeywords ?? "").Trim();
            entity.PageHeading = pageHeading;
            entity.Summary = (dto.Summary ?? "").Trim();
            entity.Location = string.IsNullOrWhiteSpace(dto.Location) ? "Vadodara, India" : dto.Location.Trim();
            entity.FreshersCanApply = dto.FreshersCanApply;
            entity.IsVacancyOpen = dto.IsVacancyOpen;
            entity.CardTitle = cardTitle;
            entity.CardSubtitles = JobPositionJson.Strings(
                (dto.CardSubtitles ?? new()).Select(s => s.Trim()).Where(s => s.Length > 0));
            entity.IconUrl = icon;
            entity.CardBullets = JobPositionJson.Bullets(bullets);
            entity.SkillIcons = JobPositionJson.Skills(skills);
            entity.BodyHtml = StripScripts(dto.BodyHtml ?? "");
            entity.SortOrder = sort;
            entity.UpdatedAt = DateTime.UtcNow;
        }

        private async Task<JobPosition?> FindBySlugAsync(string? slug)
        {
            var key = (slug ?? "").Trim();
            if (key.Length == 0) return null;
            return await _db.JobPositions.AsNoTracking()
                .FirstOrDefaultAsync(p => p.Slug.ToLower() == key.ToLower());
        }

        private static string Required(string? value, string label)
        {
            var text = (value ?? "").Trim();
            if (text.Length == 0) throw new InvalidOperationException($"{label} is required.");
            return text;
        }

        private static string StripScripts(string html) =>
            Regex.Replace(html, @"<script[^>]*>.*?</script>", "", RegexOptions.IgnoreCase | RegexOptions.Singleline);

        private static PublicJobCardDto ToCard(JobPosition row) => new()
        {
            Slug = row.Slug,
            CardTitle = row.CardTitle,
            CardSubtitles = JobPositionJson.ReadStrings(row.CardSubtitles),
            IconUrl = row.IconUrl,
            CardBullets = JobPositionJson.ReadBullets(row.CardBullets),
            IsVacancyOpen = row.IsVacancyOpen,
            FreshersCanApply = row.FreshersCanApply,
            SortOrder = row.SortOrder,
            PageHeading = row.PageHeading,
            SeoTitle = row.SeoTitle,
            UpdatedAt = row.UpdatedAt
        };

        private static PublicJobDetailDto ToDetail(JobPosition row)
        {
            var card = ToCard(row);
            return new PublicJobDetailDto
            {
                Slug = card.Slug,
                CardTitle = card.CardTitle,
                CardSubtitles = card.CardSubtitles,
                IconUrl = card.IconUrl,
                CardBullets = card.CardBullets,
                IsVacancyOpen = card.IsVacancyOpen,
                FreshersCanApply = card.FreshersCanApply,
                SortOrder = card.SortOrder,
                PageHeading = card.PageHeading,
                SeoTitle = card.SeoTitle,
                UpdatedAt = card.UpdatedAt,
                Summary = row.Summary,
                Location = row.Location,
                SkillIcons = JobPositionJson.ReadSkills(row.SkillIcons),
                BodyHtml = row.BodyHtml,
                SeoDescription = row.SeoDescription,
                SeoKeywords = row.SeoKeywords
            };
        }

        private static JobPositionDto ToDto(JobPosition row) => new()
        {
            Id = row.Id,
            Slug = row.Slug,
            ApplyFor = row.ApplyFor,
            SeoTitle = row.SeoTitle,
            SeoDescription = row.SeoDescription,
            SeoKeywords = row.SeoKeywords,
            PageHeading = row.PageHeading,
            Summary = row.Summary,
            Location = row.Location,
            FreshersCanApply = row.FreshersCanApply,
            IsVacancyOpen = row.IsVacancyOpen,
            CardTitle = row.CardTitle,
            CardSubtitles = JobPositionJson.ReadStrings(row.CardSubtitles),
            IconUrl = row.IconUrl,
            CardBullets = JobPositionJson.ReadBullets(row.CardBullets),
            SkillIcons = JobPositionJson.ReadSkills(row.SkillIcons),
            BodyHtml = row.BodyHtml,
            SortOrder = row.SortOrder,
            CreatedAt = row.CreatedAt,
            UpdatedAt = row.UpdatedAt
        };
    }
}
