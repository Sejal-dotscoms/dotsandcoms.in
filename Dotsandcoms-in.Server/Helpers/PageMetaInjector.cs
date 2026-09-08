using System.Net;
using System.Text.RegularExpressions;

namespace Dotsandcoms_in.Server.Helpers;

/// <summary>
/// Rewrites title / description / keywords / canonical / OG / Twitter tags
/// so View Page Source matches the requested route, not the homepage shell.
/// Optionally injects a minimal crawler-visible body when #root is empty
/// (required for AI / simple non-JS crawlers).
/// </summary>
public static class PageMetaInjector
{
    public static string Inject(string html, SeoRoute route, bool ensureCrawlerBody = true)
    {
        if (string.IsNullOrEmpty(html) || route == null) return html;

        Func<string?, string> enc = WebUtility.HtmlEncode;
        var title = enc(route.Title ?? "");
        var description = enc(route.Description ?? "");
        var keywords = enc(route.Keywords ?? "");
        var pageUrl = enc(route.Canonical ?? "");

        html = Re(html, @"<title>[^<]*</title>", $"<title>{title}</title>");

        html = Re(html, @"<link\b[^>]*\brel=[""']canonical[""'][^>]*>",
            $@"<link rel=""canonical"" href=""{pageUrl}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']description[""'][^>]*>",
            $@"<meta name=""description"" content=""{description}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']keywords[""'][^>]*>",
            $@"<meta name=""keywords"" content=""{keywords}"" />");

        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:title[""'][^>]*>",
            $@"<meta property=""og:title"" content=""{title}"" />");

        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:description[""'][^>]*>",
            $@"<meta property=""og:description"" content=""{description}"" />");

        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:url[""'][^>]*>",
            $@"<meta property=""og:url"" content=""{pageUrl}"" />");

        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:image:alt[""'][^>]*>",
            $@"<meta property=""og:image:alt"" content=""{title}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:title[""'][^>]*>",
            $@"<meta name=""twitter:title"" content=""{title}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:description[""'][^>]*>",
            $@"<meta name=""twitter:description"" content=""{description}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:url[""'][^>]*>",
            $@"<meta name=""twitter:url"" content=""{pageUrl}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:image:alt[""'][^>]*>",
            $@"<meta name=""twitter:image:alt"" content=""{title}"" />");

        html = Re(html, @"<meta\b[^>]*\bproperty=[""']twitter:title[""'][^>]*>",
            $@"<meta property=""twitter:title"" content=""{title}"" />");

        html = Re(html, @"<meta\b[^>]*\bproperty=[""']twitter:description[""'][^>]*>",
            $@"<meta property=""twitter:description"" content=""{description}"" />");

        if (ensureCrawlerBody)
            html = EnsureCrawlerBody(html, route.Title ?? "", route.Description ?? "");

        return html;
    }

    /// <summary>
    /// When #root is empty (spa-shell fallback), inject a short crawler-visible
    /// block so AI/simple bots never see a blank homepage lookalike.
    /// </summary>
    public static string EnsureCrawlerBody(string html, string title, string description)
    {
        if (string.IsNullOrEmpty(html)) return html;
        if (!Regex.IsMatch(html, @"<div\s+id=[""']root[""']\s*>\s*</div>", RegexOptions.IgnoreCase))
            return html;

        Func<string?, string> enc = WebUtility.HtmlEncode;
        var body =
            $@"<main id=""seo-content""><h1>{enc(title)}</h1><p>{enc(description)}</p></main>";

        return Re(html, @"<div\s+id=[""']root[""']\s*>\s*</div>",
            $@"<div id=""root"">{body}</div>");
    }

    private static string Re(string html, string pattern, string replacement) =>
        Regex.Replace(html, pattern, replacement, RegexOptions.IgnoreCase | RegexOptions.Singleline);
}
