namespace Dotsandcoms_in.Server.Models
{
    public class Blog
    {
        public int Id { get; set; }

        public bool IsVisible { get; set; } = true;

        /// <summary>Legacy single image URL (kept for backward compat).</summary>
        public string? ImageUrl { get; set; }

        /// <summary>JSON array of image URLs/base64 strings for multiple images.</summary>
        public string? ImageUrls { get; set; }

        public string Title { get; set; } = string.Empty;

        /// <summary>Browser tab title shown in &lt;title&gt; tag.</summary>
        public string PageTitle { get; set; } = string.Empty;

        /// <summary>URL-friendly slug used in the public URL instead of the numeric ID.</summary>
        public string BrowserUrl { get; set; } = string.Empty;

        /// <summary>Raw HTML meta tags injected into &lt;head&gt; on the detail page.</summary>
        public string? MetaTags { get; set; }

        public string ShortDescription { get; set; } = string.Empty;

        /// <summary>HTML content from CKEditor.</summary>
        public string LongDescription { get; set; } = string.Empty;

        public DateTime BlogDate { get; set; }

        public DateTime? ExpiryDate { get; set; }

        // ── Audit columns ──────────────────────────────────────────────
        public DateTime AddedDate { get; set; } = DateTime.UtcNow;
        public string? AddedIp { get; set; }

        public DateTime? ModifiedDate { get; set; }
        public string? ModifiedIp { get; set; }
    }
}
