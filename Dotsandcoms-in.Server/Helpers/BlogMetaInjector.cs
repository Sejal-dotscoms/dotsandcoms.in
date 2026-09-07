using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using Dotsandcoms_in.Server.Models;

namespace Dotsandcoms_in.Server.Helpers;

/// <summary>
/// Injects blog-specific SEO meta tags and crawler-visible body content into the SPA shell HTML
/// so they appear in View Page Source for crawlers that don't run JS.
/// </summary>
public static class BlogMetaInjector
{
    public static string Inject(string html, Blog blog)
    {
        Func<string?, string> enc = WebUtility.HtmlEncode;
        var title   = !string.IsNullOrWhiteSpace(blog.PageTitle) ? blog.PageTitle : blog.Title;
        var blogUrl = $"https://www.dotsandcoms.in/blogs/{blog.BrowserUrl}";

        var rawMeta = StripScripts(blog.MetaTags ?? "");

        var description = ExtractContent(rawMeta, "description") ?? TrimTo160(blog.ShortDescription);
        var keywords    = ExtractContent(rawMeta, "keywords")    ?? $"{blog.Title}, Dots and Coms blog, web design Vadodara";

        var image = !string.IsNullOrWhiteSpace(blog.ImageUrl) && !blog.ImageUrl.StartsWith("data:", StringComparison.OrdinalIgnoreCase)
            ? blog.ImageUrl
            : "https://www.dotsandcoms.in/og-image.png";

        html = Re(html, @"<title>[^<]*</title>",
            $"<title>{enc(title)}</title>");

        html = Re(html, @"<link\b[^>]*\brel=[""']canonical[""'][^>]*>",
            $@"<link rel=""canonical"" href=""{blogUrl}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']description[""'][^>]*>",
            $@"<meta name=""description"" content=""{enc(description)}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']keywords[""'][^>]*>",
            $@"<meta name=""keywords"" content=""{enc(keywords)}"" />");

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

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:title[""'][^>]*>",
            $@"<meta name=""twitter:title"" content=""{enc(title)}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:description[""'][^>]*>",
            $@"<meta name=""twitter:description"" content=""{enc(description)}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:url[""'][^>]*>",
            $@"<meta name=""twitter:url"" content=""{blogUrl}"" />");

        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:image[""'][^>]*>",
            $@"<meta name=""twitter:image"" content=""{image}"" />");

        var extra = RemoveMeta(RemoveMeta(rawMeta, "description"), "keywords").Trim();
        if (!string.IsNullOrWhiteSpace(extra))
            html = ReplaceFirst(html, "</head>", $"    {extra}\n</head>");

        // Crawler-visible article body (React will replace #root on hydrate)
        var articleBody = BuildArticleBody(blog, enc);
        html = InjectRootContent(html, articleBody);

        return html;
    }

    /// <summary>
    /// Injects a crawler-visible list of public blog posts for GET /blogs.
    /// </summary>
    public static string InjectBlogList(string html, IReadOnlyList<Blog> blogs)
    {
        const string title = "Blogs – Web Design, Mobile App & Digital Marketing Insights";
        const string description =
            "Read expert articles on website design, mobile app development, SEO, digital marketing, and web hosting from Dots & Coms, Vadodara.";
        const string pageUrl = "https://www.dotsandcoms.in/blogs";

        Func<string?, string> enc = WebUtility.HtmlEncode;

        html = Re(html, @"<title>[^<]*</title>", $"<title>{enc(title)}</title>");
        html = Re(html, @"<link\b[^>]*\brel=[""']canonical[""'][^>]*>",
            $@"<link rel=""canonical"" href=""{pageUrl}"" />");
        html = Re(html, @"<meta\b[^>]*\bname=[""']description[""'][^>]*>",
            $@"<meta name=""description"" content=""{enc(description)}"" />");
        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:title[""'][^>]*>",
            $@"<meta property=""og:title"" content=""{enc(title)}"" />");
        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:description[""'][^>]*>",
            $@"<meta property=""og:description"" content=""{enc(description)}"" />");
        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:url[""'][^>]*>",
            $@"<meta property=""og:url"" content=""{pageUrl}"" />");

        var sb = new StringBuilder();
        sb.Append("""<main id="seo-content"><h1>Blogs</h1><ul>""");
        foreach (var blog in blogs)
        {
            var href = $"https://www.dotsandcoms.in/blogs/{blog.BrowserUrl}";
            sb.Append("<li><a href=\"")
              .Append(enc(href))
              .Append("\">")
              .Append(enc(blog.Title))
              .Append("</a>");
            if (!string.IsNullOrWhiteSpace(blog.ShortDescription))
            {
                sb.Append("<p>")
                  .Append(enc(TrimTo160(blog.ShortDescription)))
                  .Append("</p>");
            }
            sb.Append("</li>");
        }
        sb.Append("</ul></main>");

        return InjectRootContent(html, sb.ToString());
    }

    private static string BuildArticleBody(Blog blog, Func<string?, string> enc)
    {
        var sb = new StringBuilder();
        sb.Append("""<main id="seo-content"><article>""");
        sb.Append("<h1>").Append(enc(blog.Title)).Append("</h1>");

        if (!string.IsNullOrWhiteSpace(blog.ShortDescription))
            sb.Append("<p>").Append(enc(blog.ShortDescription)).Append("</p>");

        if (!string.IsNullOrWhiteSpace(blog.ImageUrl) &&
            !blog.ImageUrl.StartsWith("data:", StringComparison.OrdinalIgnoreCase))
        {
            sb.Append("<img src=\"")
              .Append(enc(blog.ImageUrl))
              .Append("\" alt=\"")
              .Append(enc(blog.Title))
              .Append("\" />");
        }

        var safeBody = SanitizeContentHtml(blog.LongDescription ?? "");
        if (!string.IsNullOrWhiteSpace(safeBody))
            sb.Append("<div class=\"seo-article-body\">").Append(safeBody).Append("</div>");

        sb.Append("</article></main>");
        return sb.ToString();
    }

    /// <summary>
    /// Allow safe HTML from CKEditor; strip scripts and data-URI images.
    /// </summary>
    private static string SanitizeContentHtml(string html)
    {
        if (string.IsNullOrWhiteSpace(html)) return "";
        html = StripScripts(html);
        // Remove img tags that use base64 data URIs (payload bloat)
        html = Regex.Replace(
            html,
            @"<img\b[^>]*\bsrc\s*=\s*[""']data:[^""']*[""'][^>]*/?>",
            "",
            RegexOptions.IgnoreCase);
        return html;
    }

    private static string InjectRootContent(string html, string content)
    {
        // Empty root (spa-shell)
        if (Regex.IsMatch(html, @"<div\s+id=[""']root[""']\s*>\s*</div>", RegexOptions.IgnoreCase))
        {
            return Re(html, @"<div\s+id=[""']root[""']\s*>\s*</div>",
                $@"<div id=""root"">{content}</div>");
        }

        // Already has content — insert seo block before closing #root
        return Re(html, @"</div>\s*(?=<script[^>]+src=[""'][^""']*assets)",
            $"{content}</div>\n    ");
    }

    private static string Re(string html, string pattern, string replacement) =>
        Regex.Replace(html, pattern, replacement, RegexOptions.IgnoreCase | RegexOptions.Singleline);

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

    private static string RemoveMeta(string metaHtml, string name) =>
        Regex.Replace(metaHtml,
            $@"<meta\b[^>]*\bname=[""']{Regex.Escape(name)}[""'][^>]*>",
            "", RegexOptions.IgnoreCase).Trim();

    private static string StripScripts(string html) =>
        Regex.Replace(html, @"<script[^>]*>.*?</script>", "",
            RegexOptions.IgnoreCase | RegexOptions.Singleline);

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
