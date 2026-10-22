namespace Dotsandcoms_in.Server.DTOs
{
    public class JobBulletDto
    {
        public string Text { get; set; } = string.Empty;
        public List<string> Children { get; set; } = new();
    }

    public class JobSkillDto
    {
        public string Url { get; set; } = string.Empty;
        public string Alt { get; set; } = string.Empty;
    }

    public class JobPositionWriteDto
    {
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
        public List<string> CardSubtitles { get; set; } = new();
        public string IconUrl { get; set; } = string.Empty;
        public List<JobBulletDto> CardBullets { get; set; } = new();
        public List<JobSkillDto> SkillIcons { get; set; } = new();
        public string BodyHtml { get; set; } = string.Empty;
        public int SortOrder { get; set; }
    }

    public class JobPositionDto : JobPositionWriteDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class PublicJobCardDto
    {
        public string Slug { get; set; } = string.Empty;
        public string CardTitle { get; set; } = string.Empty;
        public List<string> CardSubtitles { get; set; } = new();
        public string IconUrl { get; set; } = string.Empty;
        public List<JobBulletDto> CardBullets { get; set; } = new();
        public bool IsVacancyOpen { get; set; }
        public bool FreshersCanApply { get; set; }
        public int SortOrder { get; set; }
        public string PageHeading { get; set; } = string.Empty;
        public string SeoTitle { get; set; } = string.Empty;
        public DateTime UpdatedAt { get; set; }
    }

    public class PublicJobDetailDto : PublicJobCardDto
    {
        public string Summary { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public List<JobSkillDto> SkillIcons { get; set; } = new();
        public string BodyHtml { get; set; } = string.Empty;
        public string SeoDescription { get; set; } = string.Empty;
        public string SeoKeywords { get; set; } = string.Empty;
    }

    public class JobPositionFlagsDto
    {
        public bool IsVacancyOpen { get; set; }
        public bool FreshersCanApply { get; set; }
    }

    public class JobPositionListItemDto
    {
        public int Id { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string CardTitle { get; set; } = string.Empty;
        public string PageHeading { get; set; } = string.Empty;
        public string Location { get; set; } = "Vadodara, India";
        public bool IsVacancyOpen { get; set; }
        public bool FreshersCanApply { get; set; }
        public int SortOrder { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
