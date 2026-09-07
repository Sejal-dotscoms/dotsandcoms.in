using System.Text.Json;

namespace Dotsandcoms_in.Server.Helpers;

public sealed class SeoRoute
{
    public string Path { get; set; } = "";
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Keywords { get; set; } = "";
    public string Canonical { get; set; } = "";
}

/// <summary>
/// Loads public marketing-route SEO from seo-routes.json (generated from publicRoutes.js).
/// </summary>
public sealed class SeoRouteCatalog
{
    private readonly Dictionary<string, SeoRoute> _byPath;

    public SeoRouteCatalog(IWebHostEnvironment env, ILogger<SeoRouteCatalog> logger)
    {
        _byPath = new Dictionary<string, SeoRoute>(StringComparer.OrdinalIgnoreCase);

        var jsonPath = ResolveJsonPath(env);
        if (jsonPath == null)
        {
            logger.LogWarning("seo-routes.json not found — inner pages will keep homepage meta in View Source until the file is deployed.");
            return;
        }

        try
        {
            var json = File.ReadAllText(jsonPath);
            var routes = JsonSerializer.Deserialize<List<SeoRoute>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? [];

            foreach (var route in routes)
            {
                if (string.IsNullOrWhiteSpace(route.Path)) continue;
                _byPath[Normalize(route.Path)] = route;
            }

            logger.LogInformation("Loaded {Count} SEO routes from {Path}", _byPath.Count, jsonPath);
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Failed to parse seo-routes.json at {Path}", jsonPath);
        }
    }

    public bool TryGet(string requestPath, out SeoRoute route)
    {
        route = null!;
        if (string.IsNullOrEmpty(requestPath)) return false;
        return _byPath.TryGetValue(Normalize(requestPath), out route!);
    }

    public static string Normalize(string path)
    {
        if (string.IsNullOrEmpty(path) || path == "/") return "/";
        var trimmed = path.Trim();
        if (trimmed.Length > 1 && trimmed.EndsWith('/'))
            trimmed = trimmed.TrimEnd('/');
        return trimmed;
    }

    private static string? ResolveJsonPath(IWebHostEnvironment env)
    {
        var candidates = new[]
        {
            Path.Combine(env.WebRootPath ?? "", "seo-routes.json"),
            Path.Combine(env.ContentRootPath, "seo-routes.json"),
            Path.Combine(AppContext.BaseDirectory, "seo-routes.json"),
            Path.Combine(env.ContentRootPath, "..", "dotsandcoms-in.client", "public", "seo-routes.json"),
        };

        foreach (var candidate in candidates)
        {
            try
            {
                var full = Path.GetFullPath(candidate);
                if (File.Exists(full)) return full;
            }
            catch
            {
                // ignore invalid paths
            }
        }

        return null;
    }
}
