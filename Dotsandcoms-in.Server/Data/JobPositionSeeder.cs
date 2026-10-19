using System.Text.Json;
using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Dotsandcoms_in.Server.Data
{
    public static class JobPositionSeeder
    {
        public static async Task EnsureAsync(AppDbContext db, IWebHostEnvironment env)
        {
            if (await db.JobPositions.AnyAsync()) return;

            var path = ResolvePath(env);
            if (path == null) return;

            var json = await File.ReadAllTextAsync(path);
            var rows = JsonSerializer.Deserialize<List<JobPositionWriteDto>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? new();

            if (rows.Count == 0) return;

            var now = DateTime.UtcNow;
            foreach (var row in rows)
            {
                db.JobPositions.Add(new JobPosition
                {
                    Slug = row.Slug.Trim(),
                    ApplyFor = row.ApplyFor ?? "",
                    SeoTitle = row.SeoTitle ?? "",
                    SeoDescription = row.SeoDescription ?? "",
                    SeoKeywords = row.SeoKeywords ?? "",
                    PageHeading = row.PageHeading ?? "",
                    Summary = row.Summary ?? "",
                    Location = string.IsNullOrWhiteSpace(row.Location) ? "Vadodara, India" : row.Location.Trim(),
                    FreshersCanApply = row.FreshersCanApply,
                    IsVacancyOpen = row.IsVacancyOpen,
                    CardTitle = row.CardTitle ?? "",
                    CardSubtitles = JobPositionJson.Strings(row.CardSubtitles),
                    IconUrl = row.IconUrl ?? "",
                    CardBullets = JobPositionJson.Bullets(row.CardBullets),
                    SkillIcons = JobPositionJson.Skills(row.SkillIcons),
                    BodyHtml = row.BodyHtml ?? "",
                    SortOrder = row.SortOrder,
                    CreatedAt = now,
                    UpdatedAt = now
                });
            }

            await db.SaveChangesAsync();
        }

        private static string? ResolvePath(IWebHostEnvironment env)
        {
            var candidates = new[]
            {
                Path.Combine(env.ContentRootPath, "Data", "job-positions.seed.json"),
                Path.Combine(AppContext.BaseDirectory, "Data", "job-positions.seed.json")
            };
            return candidates.FirstOrDefault(File.Exists);
        }
    }
}
