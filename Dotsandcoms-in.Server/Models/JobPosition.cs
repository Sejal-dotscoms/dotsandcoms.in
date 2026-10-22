namespace Dotsandcoms_in.Server.Models
{
    public class JobPosition
    {
        public int Id { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string ApplyFor { get; set; } = string.Empty;
        public string SeoTitle { get; set; } = string.Empty;
        public string SeoDescription { get; set; } = string.Empty;
        public string SeoKeywords { get; set; } = string.Empty;
        public string PageHeading { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string Location { get; set; } = "Vadodara, India";
        public bool FreshersCanApply { get; set; }
        public bool IsVacancyOpen { get; set; } = true;
        public string CardTitle { get; set; } = string.Empty;
        public string CardSubtitles { get; set; } = "[]";
        public string IconUrl { get; set; } = string.Empty;
        public string CardBullets { get; set; } = "[]";
        public string SkillIcons { get; set; } = "[]";
        public string BodyHtml { get; set; } = string.Empty;
        public int SortOrder { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
