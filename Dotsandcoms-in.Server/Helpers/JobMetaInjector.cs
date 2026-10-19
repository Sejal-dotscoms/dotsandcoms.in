using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using Dotsandcoms_in.Server.Models;

namespace Dotsandcoms_in.Server.Helpers;

public static class JobMetaInjector
{
    private const string HideStyle =
        @"<style id=""seo-content-hide"">#seo-content{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}img{color:transparent;font-size:0}</style>";

    public static string InjectDetail(string html, JobPosition job)
    {
        var title = string.IsNullOrWhiteSpace(job.SeoTitle) ? job.PageHeading : job.SeoTitle;
        var description = string.IsNullOrWhiteSpace(job.SeoDescription) ? job.Summary : job.SeoDescription;
        var keywords = job.SeoKeywords ?? "";
        var url = $"https://www.dotsandcoms.in/{job.Slug}";

        html = EnsureHideStyle(html);
        html = SwapMeta(html, title, description, keywords, url);

        var sb = new StringBuilder();
        sb.Append("""<main id="seo-content" aria-hidden="true" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0"><article>""");
        sb.Append("<h1>").Append(Enc(job.PageHeading)).Append("</h1>");
        if (!string.IsNullOrWhiteSpace(job.Summary))
            sb.Append("<p>").Append(Enc(job.Summary)).Append("</p>");
        if (!job.IsVacancyOpen)
            sb.Append("<p>No vacancies</p>");
        var body = Sanitize(job.BodyHtml);
        if (!string.IsNullOrWhiteSpace(body))
            sb.Append("<div class=\"seo-article-body\">").Append(body).Append("</div>");
        sb.Append("</article></main>");
        return InjectRootContent(html, sb.ToString());
    }

    public static string InjectList(string html, SeoRoute? seo, IReadOnlyList<JobPosition> jobs)
    {
        var title = seo?.Title ?? "Latest Job Openings in IT Company Vadodara | Dots and Coms";
        var description = seo?.Description ?? "Explore latest job openings in IT company at Vadodara.";
        var keywords = seo?.Keywords ?? "job openings Vadodara, Dots Coms careers";
        var heading = string.IsNullOrWhiteSpace(seo?.Heading)
            ? "Explore by positions - Location : Vadodara, Gujarat - India"
            : seo!.Heading!;
        const string url = "https://www.dotsandcoms.in/job-vacancy-at-dots-and-coms-company";
        html = EnsureHideStyle(html);
        html = SwapMeta(html, title, description, keywords, url);

        var sb = new StringBuilder();
        sb.Append("""<main id="seo-content" aria-hidden="true" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">""");
        sb.Append("<h1>").Append(Enc(heading)).Append("</h1>");
        if (!string.IsNullOrWhiteSpace(seo?.Summary))
            sb.Append("<p>").Append(Enc(seo!.Summary)).Append("</p>");
        sb.Append("<ul>");
        foreach (var job in jobs)
        {
            sb.Append("<li>");
            if (job.IsVacancyOpen)
            {
                sb.Append("<a href=\"https://www.dotsandcoms.in/")
                  .Append(Enc(job.Slug))
                  .Append("\">")
                  .Append(Enc(job.CardTitle))
                  .Append("</a>");
            }
            else
            {
                sb.Append(Enc(job.CardTitle)).Append(" — not accepting applications");
            }
            sb.Append("</li>");
        }
        sb.Append("</ul></main>");
        return InjectRootContent(html, sb.ToString());
    }

    private static string SwapMeta(string html, string title, string description, string keywords, string url)
    {
        html = Re(html, @"<title>[^<]*</title>", $"<title>{Enc(title)}</title>");
        html = Re(html, @"<link\b[^>]*\brel=[""']canonical[""'][^>]*>",
            $@"<link rel=""canonical"" href=""{Enc(url)}"" />");
        html = Re(html, @"<meta\b[^>]*\bname=[""']description[""'][^>]*>",
            $@"<meta name=""description"" content=""{Enc(description)}"" />");
        html = Re(html, @"<meta\b[^>]*\bname=[""']keywords[""'][^>]*>",
            $@"<meta name=""keywords"" content=""{Enc(keywords)}"" />");
        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:title[""'][^>]*>",
            $@"<meta property=""og:title"" content=""{Enc(title)}"" />");
        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:description[""'][^>]*>",
            $@"<meta property=""og:description"" content=""{Enc(description)}"" />");
        html = Re(html, @"<meta\b[^>]*\bproperty=[""']og:url[""'][^>]*>",
            $@"<meta property=""og:url"" content=""{Enc(url)}"" />");
        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:title[""'][^>]*>",
            $@"<meta name=""twitter:title"" content=""{Enc(title)}"" />");
        html = Re(html, @"<meta\b[^>]*\bname=[""']twitter:description[""'][^>]*>",
            $@"<meta name=""twitter:description"" content=""{Enc(description)}"" />");
        return html;
    }

    private static string EnsureHideStyle(string html)
    {
        if (html.Contains("id=\"seo-content-hide\"", StringComparison.OrdinalIgnoreCase))
            return html;
        if (Regex.IsMatch(html, @"<head\b[^>]*>", RegexOptions.IgnoreCase))
            return Re(html, @"<head\b[^>]*>", $"$0\n    {HideStyle}");
        return $"{HideStyle}\n{html}";
    }

    private static string Sanitize(string? html)
    {
        if (string.IsNullOrWhiteSpace(html)) return "";
        html = Regex.Replace(html, @"<script[^>]*>.*?</script>", "", RegexOptions.IgnoreCase | RegexOptions.Singleline);
        return Regex.Replace(html, @"<img\b[^>]*\bsrc\s*=\s*[""']data:[^""']*[""'][^>]*/?>", "", RegexOptions.IgnoreCase);
    }

    private static string InjectRootContent(string html, string content)
    {
        if (Regex.IsMatch(html, @"<div\s+id=[""']root[""']\s*>\s*</div>", RegexOptions.IgnoreCase))
            return Re(html, @"<div\s+id=[""']root[""']\s*>\s*</div>", $@"<div id=""root"">{content}</div>");
        return Re(html, @"</div>\s*(?=<script[^>]+src=[""'][^""']*assets)", $"{content}</div>\n    ");
    }

    private static string Enc(string? value) => WebUtility.HtmlEncode(value ?? "");

    private static string Re(string html, string pattern, string replacement) =>
        Regex.Replace(html, pattern, replacement, RegexOptions.IgnoreCase | RegexOptions.Singleline);
}
