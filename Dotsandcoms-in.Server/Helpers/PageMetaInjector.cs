using System.Net;
using System.Text.RegularExpressions;

namespace Dotsandcoms_in.Server.Helpers;

/// <summary>
/// Rewrites title / description / keywords / canonical / OG / Twitter tags
/// so View Page Source matches the requested route, not the homepage shell.
/// Enforces the hide rule and clip style to eliminate crawler text and image alt flashes.
/// Injects a crawler-visible summary block for AI and simple non-JS crawlers.
/// </summary>
public static class PageMetaInjector
{
    private const string HideStyle =
        @"<style id=""seo-content-hide"">#seo-content{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}img{color:transparent;font-size:0}</style>";

    public static string Inject(string html, SeoRoute route, bool ensureCrawlerBody = true)
    {
        if (string.IsNullOrEmpty(html) || route == null) return html;

        Func<string?, string> enc = WebUtility.HtmlEncode;
        var title = enc(route.Title ?? "");
        var description = enc(route.Description ?? "");
        var keywords = enc(route.Keywords ?? "");
        var pageUrl = enc(route.Canonical ?? "");

        // Ensure hide rule is present in <head>
        if (!html.Contains("id=\"seo-content-hide\"", StringComparison.OrdinalIgnoreCase))
        {
            if (Regex.IsMatch(html, @"<head\b[^>]*>", RegexOptions.IgnoreCase))
            {
                html = Re(html, @"<head\b[^>]*>", $"$0\n    {HideStyle}");
            }
            else
            {
                html = $"{HideStyle}\n{html}";
            }
        }

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
        {
            var heading = !string.IsNullOrWhiteSpace(route.Heading) ? route.Heading : route.Title ?? "";
            var summary = !string.IsNullOrWhiteSpace(route.Summary) ? route.Summary : route.Description ?? "";
            html = EnsureCrawlerBody(html, heading, summary);
        }

        return html;
    }

    /// <summary>
    /// Injects a crawler-visible block clipped off-screen with aria-hidden="true"
    /// so bots receive indexable body copy without any visual text flash for visitors.
    /// </summary>
    public static string EnsureCrawlerBody(string html, string heading, string summary)
    {
        if (string.IsNullOrEmpty(html)) return html;

        Func<string?, string> enc = WebUtility.HtmlEncode;
        var h = enc(!string.IsNullOrWhiteSpace(heading) ? heading : "");
        var s = enc(!string.IsNullOrWhiteSpace(summary) ? summary : "");
        var body =
            $@"<main id=""seo-content"" aria-hidden=""true"" style=""position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0""><h1>{h}</h1><p>{s}</p></main>";

        if (Regex.IsMatch(html, @"<main\s+id=[""']seo-content[""']", RegexOptions.IgnoreCase))
        {
            return Regex.Replace(html, @"<main\s+id=[""']seo-content[""'][^>]*>[\s\S]*?</main>", body, RegexOptions.IgnoreCase);
        }

        if (Regex.IsMatch(html, @"<div\s+id=[""']root[""']\s*>\s*</div>", RegexOptions.IgnoreCase))
        {
            return Re(html, @"<div\s+id=[""']root[""']\s*>\s*</div>",
                $@"<div id=""root"">{body}</div>");
        }

        if (Regex.IsMatch(html, @"<div\s+id=[""']root[""'][^>]*>", RegexOptions.IgnoreCase))
        {
            return Re(html, @"(<div\s+id=[""']root[""'][^>]*>)",
                $"$1{body}");
        }

        return html;
    }

    private static string Re(string html, string pattern, string replacement) =>
        Regex.Replace(html, pattern, replacement, RegexOptions.IgnoreCase | RegexOptions.Singleline);
}
