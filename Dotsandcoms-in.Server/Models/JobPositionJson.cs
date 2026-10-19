using System.Text.Json;
using Dotsandcoms_in.Server.DTOs;

namespace Dotsandcoms_in.Server.Models
{
    public static class JobPositionJson
    {
        private static readonly JsonSerializerOptions Options = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            PropertyNameCaseInsensitive = true
        };

        public static string Strings(IEnumerable<string>? values) =>
            JsonSerializer.Serialize(values ?? Array.Empty<string>(), Options);

        public static List<string> ReadStrings(string? json)
        {
            if (string.IsNullOrWhiteSpace(json)) return new();
            try { return JsonSerializer.Deserialize<List<string>>(json, Options) ?? new(); }
            catch { return new(); }
        }

        public static string Bullets(IEnumerable<JobBulletDto>? values) =>
            JsonSerializer.Serialize(values ?? Array.Empty<JobBulletDto>(), Options);

        public static List<JobBulletDto> ReadBullets(string? json)
        {
            if (string.IsNullOrWhiteSpace(json)) return new();
            try { return JsonSerializer.Deserialize<List<JobBulletDto>>(json, Options) ?? new(); }
            catch { return new(); }
        }

        public static string Skills(IEnumerable<JobSkillDto>? values) =>
            JsonSerializer.Serialize(values ?? Array.Empty<JobSkillDto>(), Options);

        public static List<JobSkillDto> ReadSkills(string? json)
        {
            if (string.IsNullOrWhiteSpace(json)) return new();
            try { return JsonSerializer.Deserialize<List<JobSkillDto>>(json, Options) ?? new(); }
            catch { return new(); }
        }
    }
}
