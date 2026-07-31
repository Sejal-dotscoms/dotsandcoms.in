using System.ComponentModel.DataAnnotations;

namespace Dotsandcoms_in.Server.DTOs
{
    internal static class BlogDateValidator
    {
        internal static IEnumerable<ValidationResult> ValidateDates(
            DateTime blogDate, DateTime? expiryDate)
        {
            if (expiryDate.HasValue && expiryDate.Value.Date <= blogDate.Date)
                yield return new ValidationResult(
                    "Expiry date must be after the blog date.",
                    new[] { nameof(CreateBlogDto.ExpiryDate) });
        }
    }

    // ── Response DTO (returned to client) ─────────────────────────────
    public class BlogDto
    {
        public int       Id               { get; set; }
        public bool      IsVisible        { get; set; }
        public string?   ImageUrl         { get; set; }
        public List<string> ImageUrls     { get; set; } = new();
        public string    Title            { get; set; } = string.Empty;
        public string    PageTitle        { get; set; } = string.Empty;
        public string    BrowserUrl       { get; set; } = string.Empty;
        public string?   MetaTags         { get; set; }
        public string    ShortDescription { get; set; } = string.Empty;
        public string    LongDescription  { get; set; } = string.Empty;
        public DateTime  BlogDate         { get; set; }
        public DateTime? ExpiryDate       { get; set; }
        public DateTime  AddedDate        { get; set; }
        public string?   AddedIp          { get; set; }
        public DateTime? ModifiedDate     { get; set; }
        public string?   ModifiedIp       { get; set; }
    }

    // ── Create DTO ─────────────────────────────────────────────────────
    public class CreateBlogDto : IValidatableObject
    {
        public bool IsVisible { get; set; } = true;

        public List<string>? ImageUrls { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [MaxLength(500)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Page Title is required.")]
        [MaxLength(500)]
        public string PageTitle { get; set; } = string.Empty;

        [Required(ErrorMessage = "Browser URL is required.")]
        [MaxLength(500)]
        public string BrowserUrl { get; set; } = string.Empty;

        public string? MetaTags { get; set; }

        [Required(ErrorMessage = "Short description is required.")]
        [MaxLength(1000)]
        public string ShortDescription { get; set; } = string.Empty;

        [Required(ErrorMessage = "Long description is required.")]
        public string LongDescription { get; set; } = string.Empty;

        [Required(ErrorMessage = "Blog date is required.")]
        public DateTime BlogDate { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext _) =>
            BlogDateValidator.ValidateDates(BlogDate, ExpiryDate);
    }

    // ── Update DTO ─────────────────────────────────────────────────────
    public class UpdateBlogDto : IValidatableObject
    {
        public bool IsVisible { get; set; } = true;

        public List<string>? ImageUrls { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [MaxLength(500)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Page Title is required.")]
        [MaxLength(500)]
        public string PageTitle { get; set; } = string.Empty;

        [Required(ErrorMessage = "Browser URL is required.")]
        [MaxLength(500)]
        public string BrowserUrl { get; set; } = string.Empty;

        public string? MetaTags { get; set; }

        [Required(ErrorMessage = "Short description is required.")]
        [MaxLength(1000)]
        public string ShortDescription { get; set; } = string.Empty;

        [Required(ErrorMessage = "Long description is required.")]
        public string LongDescription { get; set; } = string.Empty;

        [Required(ErrorMessage = "Blog date is required.")]
        public DateTime BlogDate { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext _) =>
            BlogDateValidator.ValidateDates(BlogDate, ExpiryDate);
    }

    // ── Paginated list wrapper ─────────────────────────────────────────
    public class BlogListDto
    {
        public List<BlogDto> Items      { get; set; } = new();
        public int           TotalCount { get; set; }
        public int           Page       { get; set; }
        public int           PageSize   { get; set; }
    }

    // ── Public-facing DTO (no audit/IP fields exposed) ─────────────────
    public class PublicBlogDto
    {
        public int          Id               { get; set; }
        public string?      ImageUrl         { get; set; }
        public List<string> ImageUrls        { get; set; } = new();
        public string       Title            { get; set; } = string.Empty;
        public string       PageTitle        { get; set; } = string.Empty;
        public string       BrowserUrl       { get; set; } = string.Empty;
        public string?      MetaTags         { get; set; }
        public string       ShortDescription { get; set; } = string.Empty;
        public string       LongDescription  { get; set; } = string.Empty;
        public DateTime     BlogDate         { get; set; }
        public DateTime?    ExpiryDate       { get; set; }
    }
}
