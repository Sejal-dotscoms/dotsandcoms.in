using System.Net;
using System.Text.RegularExpressions;
using Dotsandcoms_in.Server.Models;

namespace Dotsandcoms_in.Server.Helpers;

/// <summary>
/// Injects blog-specific SEO meta tags into the static index.html so they appear
/// in View Page Source and are visible to social-media crawlers that don't run JS.
/// </summary>
public static class BlogMetaInjector
{
    public static string Inject(string html, Blog blog)
    {
        Func<string?, string> enc = WebUtility.HtmlEncode;
        var title   = !string.IsNullOrWhiteSpace(blog.PageTitle) ? blog.PageTitle : blog.Title;
        var blogUrl = $"https://www.dotsandcoms.in/blogs/{blog.BrowserUrl}";

        // Strip <script> tags from admin-supplied MetaTags for safety
        var rawMeta = StripScripts(blog.MetaTags ?? "");

        // Use description/keywords from MetaTags if the admin set them, otherwise fall back
        var description = ExtractContent(rawMeta, "description") ?? TrimTo160(blog.ShortDescription);
        var keywords    = ExtractContent(rawMeta, "keywords")    ?? $"{blog.Title}, Dots and Coms blog, web design Vadodara";

        // First usable image (skip base64 data URIs)
        var image = !string.IsNullOrWhiteSpace(blog.ImageUrl) && !blog.ImageUrl.StartsWith("data:")
            ? blog.ImageUrl
            : "https://www.dotsandcoms.in/og-image.png";

        // ── 1. <title> ──────────────────────────────────────────────────────
        html = Re(html, @"<title>[^<]*</title>",
            $"<title>{enc(title)}</title>");

        // ── 2. canonical ────────────────────────────────────────────────────
        html = Re(html, @"<link\b[^>]*\brel=[""']canonical[""'][^>]*>",
            $@"<link rel=""canonical"" href=""{blogUrl}"" />");

        // ── 3. description / keywords ───────────────────────────────────────
        html = Re(html, @"<meta\b[^>]*\bname=[""']description[""'][^>]*>",
            $@"<meta name=""description"" content=""{enc(description)}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']keywords[""'][^>]*>",
            $@"<meta name=""keywords"" content=""{enc(keywords)}"" />");

        // ── 4. Open Graph ───────────────────────────────────────────────────
        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:type[""'][^>]*>",
            @"<meta property=""og:type"" content=""article"" />");

        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:title[""'][^>]*>",
            $@"<meta property=""og:title"" content=""{enc(title)}"" />");

        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:description[""'][^>]*>",
            $@"<meta property=""og:description"" content=""{enc(description)}"" />");

        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:url[""'][^>]*>",
            $@"<meta property=""og:url"" content=""{blogUrl}"" />");

        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:image[""'][^>]*>",
            $@"<meta property=""og:image"" content=""{image}"" />");

        // ── 5. Twitter cards ────────────────────────────────────────────────
        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:title[""'][^>]*>",
            $@"<meta name=""twitter:title"" content=""{enc(title)}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:description[""'][^>]*>",
            $@"<meta name=""twitter:description"" content=""{enc(description)}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:url[""'][^>]*>",
            $@"<meta name=""twitter:url"" content=""{blogUrl}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:image[""'][^>]*>",
            $@"<meta name=""twitter:image"" content=""{image}"" />");

        // ── 6. Inject any extra tags from MetaTags (not description/keywords, already handled) ──
        var extra = RemoveMeta(RemoveMeta(rawMeta, "description"), "keywords").Trim();
        if (!string.IsNullOrWhiteSpace(extra))
            html = ReplaceFirst(html, "</head>", $"    {extra}\n</head>");

        return html;
    }

    // ── Private helpers ─────────────────────────────────────────────────────

    private static string Re(string html, string pattern, string replacement) =>
        Regex.Replace(html, pattern, replacement, RegexOptions.IgnoreCase | RegexOptions.Singleline);

    // Find a <meta name="X" ...> tag and extract its content attribute value
    private static string? ExtractContent(string metaHtml, string name)
    {
        var tagMatch = Regex.Match(metaHtml,
            $@"<meta\b[^>]*\bname=[""']{Regex.Escape(name)}[""'][^>]*>",
            RegexOptions.IgnoreCase);

        if (!tagMatch.Success) return null;

        var contentMatch = Regex.Match(tagMatch.Value,
            @"\bcontent=[""']([^""']*)[""']", RegexOptions.IgnoreCase);

        var value = contentMatch.Success ? contentMatch.Groups[1].Value : null;
        return string.IsNullOrWhiteSpace(value) ? null : value;
    }

    // Remove a <meta name="X" ...> tag from a raw HTML string
    private static string RemoveMeta(string metaHtml, string name) =>
        Regex.Replace(metaHtml,
            $@"<meta\b[^>]*\bname=[""']{Regex.Escape(name)}[""'][^>]*>",
            "", RegexOptions.IgnoreCase).Trim();

    // Strip <script> tags (security: prevent script injection from admin MetaTags field)
    private static string StripScripts(string html) =>
        Regex.Replace(html, @"<script[^>]*>.*?</script>", "",
            RegexOptions.IgnoreCase | RegexOptions.Singleline);

    // Replace only the first occurrence (for </head>)
    private static string ReplaceFirst(string html, string search, string replace)
    {
        int idx = html.IndexOf(search, StringComparison.OrdinalIgnoreCase);
        return idx < 0 ? html : html[..idx] + replace + html[(idx + search.Length)..];
    }

    private static string TrimTo160(string? text)
    {
        if (string.IsNullOrWhiteSpace(text)) return "";
        return text.Length <= 160 ? text : text[..157].TrimEnd() + "…";
    }
}
