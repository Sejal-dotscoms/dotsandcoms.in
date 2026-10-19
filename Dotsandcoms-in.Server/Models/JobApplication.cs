namespace Dotsandcoms_in.Server.Models
{
    public class JobApplication
    {
        public int Id { get; set; }
        public string ReferenceCode { get; set; } = string.Empty;
        public string DraftToken { get; set; } = string.Empty;
        public bool IsSubmitted { get; set; }
        public int CompletedStep { get; set; }

        public string JobSlug { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string Location { get; set; } = "Vadodara, India";
        public string RegistrationType { get; set; } = "Job";

        public string FirstName { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string CountryCode { get; set; } = "+91";

        public DateTime? BirthDate { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string? PhotoStoredName { get; set; }
        public string? PhotoOriginalName { get; set; }
        public string SchoolMedium { get; set; } = string.Empty;
        public string Facebook { get; set; } = string.Empty;
        public string LinkedIn { get; set; } = string.Empty;
        public string Twitter { get; set; } = string.Empty;

        public string SchoolName { get; set; } = string.Empty;
        public string SchoolCity { get; set; } = string.Empty;
        public string GraduationDegree { get; set; } = string.Empty;
        public string GraduationInstitute { get; set; } = string.Empty;
        public string GraduationCity { get; set; } = string.Empty;
        public string PostGraduationDegree { get; set; } = string.Empty;
        public string PostGraduationInstitute { get; set; } = string.Empty;
        public string PostGraduationCity { get; set; } = string.Empty;

        public bool IsFresher { get; set; } = true;
        public int ExperienceYears { get; set; }
        public int ExperienceMonths { get; set; }
        public bool CurrentlyWorking { get; set; }
        public string CurrentCompany { get; set; } = string.Empty;
        public string CurrentCity { get; set; } = string.Empty;
        public string CurrentDesignation { get; set; } = string.Empty;
        public string CurrentDurationMonths { get; set; } = string.Empty;
        public string CurrentProfile { get; set; } = string.Empty;
        public string LastCompany { get; set; } = string.Empty;
        public string LastCity { get; set; } = string.Empty;
        public string LastDesignation { get; set; } = string.Empty;
        public string LastDurationMonths { get; set; } = string.Empty;
        public string LastProfile { get; set; } = string.Empty;
        public string SecondCompany { get; set; } = string.Empty;
        public string SecondCity { get; set; } = string.Empty;
        public string SecondDesignation { get; set; } = string.Empty;
        public string SecondDurationMonths { get; set; } = string.Empty;
        public string SecondProfile { get; set; } = string.Empty;
        public int? JoinDays { get; set; }

        public string? ResumeStoredName { get; set; }
        public string? ResumeOriginalName { get; set; }
        public string HeardFrom { get; set; } = string.Empty;
        public string HeardFromNote { get; set; } = string.Empty;

        public int StatusId { get; set; } = CareerStatusIds.ReviewPending;
        public CareerStatus? Status { get; set; }
        public DateTime? StatusUpdatedAt { get; set; }
        public DateTime? ReapplyAfter { get; set; }
        public string OfficeNote { get; set; } = string.Empty;
        public bool IsOldResume { get; set; }
        public bool IsHidden { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public static class CareerStatusIds
    {
        public const int ReviewPending = 1;
        public const int Accepted = 4;
        public const int RejectedEnglish = 10;
        public const int RejectedProfile = 11;
        public const int ReApply = 12;
        public const int Incomplete = 13;
        public const int OnHold = 14;
        public const int Shortlisted = 15;
        public const int Hired = 16;
        public const int OfferNotAccepted = 17;
    }
}
