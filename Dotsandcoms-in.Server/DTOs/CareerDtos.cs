namespace Dotsandcoms_in.Server.DTOs
{
    public class CareerOtpRequest
    {
        public string Purpose { get; set; } = "apply";
        public string Email { get; set; } = "";
        public string? FirstName { get; set; }
        public string? Surname { get; set; }
        public string? Mobile { get; set; }
        public string? RegistrationType { get; set; }
        public string? JobSlug { get; set; }
    }

    public class CareerVerifyRequest
    {
        public string Purpose { get; set; } = "apply";
        public string Email { get; set; } = "";
        public string Code { get; set; } = "";
    }

    public class CareerVerifyResult
    {
        public string Outcome { get; set; } = "";
        public string? DraftToken { get; set; }
        public string? StatusToken { get; set; }
        public string? Message { get; set; }
    }

    public class CareerStepRequest
    {
        public string? CountryCode { get; set; }
        public string? Mobile { get; set; }
        public string? BirthDate { get; set; }
        public string? Gender { get; set; }
        public string? SchoolMedium { get; set; }
        public string? Facebook { get; set; }
        public string? LinkedIn { get; set; }
        public string? Twitter { get; set; }
        public string? SchoolName { get; set; }
        public string? SchoolCity { get; set; }
        public string? GraduationDegree { get; set; }
        public string? GraduationInstitute { get; set; }
        public string? GraduationCity { get; set; }
        public string? PostGraduationDegree { get; set; }
        public string? PostGraduationInstitute { get; set; }
        public string? PostGraduationCity { get; set; }
        public bool IsFresher { get; set; } = true;
        public int ExperienceYears { get; set; }
        public int ExperienceMonths { get; set; }
        public bool CurrentlyWorking { get; set; }
        public string? CurrentCompany { get; set; }
        public string? CurrentCity { get; set; }
        public string? CurrentDesignation { get; set; }
        public string? CurrentDurationMonths { get; set; }
        public string? CurrentProfile { get; set; }
        public string? LastCompany { get; set; }
        public string? LastCity { get; set; }
        public string? LastDesignation { get; set; }
        public string? LastDurationMonths { get; set; }
        public string? LastProfile { get; set; }
        public string? SecondCompany { get; set; }
        public string? SecondCity { get; set; }
        public string? SecondDesignation { get; set; }
        public string? SecondDurationMonths { get; set; }
        public string? SecondProfile { get; set; }
        public int? JoinDays { get; set; }
        public string? HeardFrom { get; set; }
        public string? HeardFromNote { get; set; }
    }

    public class CareerDraftDto
    {
        public int CompletedStep { get; set; }
        public string JobSlug { get; set; } = "";
        public string JobTitle { get; set; } = "";
        public string Location { get; set; } = "";
        public string RegistrationType { get; set; } = "";
        public string FirstName { get; set; } = "";
        public string Surname { get; set; } = "";
        public string Email { get; set; } = "";
        public string Mobile { get; set; } = "";
        public string CountryCode { get; set; } = "+91";
        public string? BirthDate { get; set; }
        public string Gender { get; set; } = "";
        public bool HasPhoto { get; set; }
        public string SchoolMedium { get; set; } = "";
        public string Facebook { get; set; } = "";
        public string LinkedIn { get; set; } = "";
        public string Twitter { get; set; } = "";
        public string SchoolName { get; set; } = "";
        public string SchoolCity { get; set; } = "";
        public string GraduationDegree { get; set; } = "";
        public string GraduationInstitute { get; set; } = "";
        public string GraduationCity { get; set; } = "";
        public string PostGraduationDegree { get; set; } = "";
        public string PostGraduationInstitute { get; set; } = "";
        public string PostGraduationCity { get; set; } = "";
        public bool IsFresher { get; set; }
        public int ExperienceYears { get; set; }
        public int ExperienceMonths { get; set; }
        public bool CurrentlyWorking { get; set; }
        public string CurrentCompany { get; set; } = "";
        public string CurrentCity { get; set; } = "";
        public string CurrentDesignation { get; set; } = "";
        public string CurrentDurationMonths { get; set; } = "";
        public string CurrentProfile { get; set; } = "";
        public string LastCompany { get; set; } = "";
        public string LastCity { get; set; } = "";
        public string LastDesignation { get; set; } = "";
        public string LastDurationMonths { get; set; } = "";
        public string LastProfile { get; set; } = "";
        public string SecondCompany { get; set; } = "";
        public string SecondCity { get; set; } = "";
        public string SecondDesignation { get; set; } = "";
        public string SecondDurationMonths { get; set; } = "";
        public string SecondProfile { get; set; } = "";
        public int? JoinDays { get; set; }
        public bool HasResume { get; set; }
        public string HeardFrom { get; set; } = "";
        public string HeardFromNote { get; set; } = "";
    }

    public class CareerSubmitResult
    {
        public string ReferenceCode { get; set; } = "";
        public string JobTitle { get; set; } = "";
    }

    public class CareerStatusViewDto
    {
        public bool Found { get; set; }
        public string? ReferenceCode { get; set; }
        public string? Position { get; set; }
        public string? RegistrationType { get; set; }
        public string? ApplicationUpdated { get; set; }
        public string? StatusUpdated { get; set; }
        public string? StatusLabel { get; set; }
        public string? StatusDetails { get; set; }
        public string? ReapplyAfter { get; set; }
        public bool CanReplaceResume { get; set; }
    }

    public class CareerListQuery
    {
        public string List { get; set; } = "active";
        public string? Name { get; set; }
        public string? Gender { get; set; }
        public string? Medium { get; set; }
        public string? Position { get; set; }
        public string? Location { get; set; }
        public string? RegistrationType { get; set; }
        public int? StatusId { get; set; }
        public string ExperienceSort { get; set; } = "desc";
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 100;
    }

    public class CareerListResult
    {
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public List<CareerListItemDto> Items { get; set; } = new();
    }

    public class CareerListItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Experience { get; set; } = "";
        public string Gender { get; set; } = "";
        public string SchoolMedium { get; set; } = "";
        public string Position { get; set; } = "";
        public string Location { get; set; } = "";
        public string RegistrationType { get; set; } = "";
        public string StatusLabel { get; set; } = "";
        public string StatusIcon { get; set; } = "";
        public int StatusId { get; set; }
    }

    public class CareerDetailDto
    {
        public int Id { get; set; }
        public string JobTitle { get; set; } = "";
        public string Location { get; set; } = "";
        public string ReferenceCode { get; set; } = "";
        public string FirstName { get; set; } = "";
        public string Surname { get; set; } = "";
        public string? BirthDate { get; set; }
        public string? AgeLabel { get; set; }
        public string Gender { get; set; } = "";
        public string Email { get; set; } = "";
        public string Mobile { get; set; } = "";
        public string CountryCode { get; set; } = "";
        public string LinkedIn { get; set; } = "";
        public string Facebook { get; set; } = "";
        public string Twitter { get; set; } = "";
        public bool HasPhoto { get; set; }
        public bool HasResume { get; set; }
        public string? ResumeOriginalName { get; set; }
        public string OfficeNote { get; set; } = "";
        public bool IsFresher { get; set; }
        public string Experience { get; set; } = "";
        public bool CurrentlyWorking { get; set; }
        public CareerJobBlockDto? CurrentJob { get; set; }
        public CareerJobBlockDto? LastJob { get; set; }
        public CareerJobBlockDto? SecondJob { get; set; }
        public int? JoinDays { get; set; }
        public string SchoolName { get; set; } = "";
        public string SchoolCity { get; set; } = "";
        public string SchoolMedium { get; set; } = "";
        public string GraduationDegree { get; set; } = "";
        public string GraduationInstitute { get; set; } = "";
        public string GraduationCity { get; set; } = "";
        public string PostGraduationDegree { get; set; } = "";
        public string PostGraduationInstitute { get; set; } = "";
        public string PostGraduationCity { get; set; } = "";
        public string HeardFrom { get; set; } = "";
        public string HeardFromNote { get; set; } = "";
        public string RegistrationType { get; set; } = "";
        public int StatusId { get; set; }
        public string StatusLabel { get; set; } = "";
        public string? StatusUpdated { get; set; }
        public bool IsOldResume { get; set; }
        public bool IsHidden { get; set; }
    }

    public class CareerJobBlockDto
    {
        public string Company { get; set; } = "";
        public string City { get; set; } = "";
        public string Designation { get; set; } = "";
        public string DurationMonths { get; set; } = "";
        public string Profile { get; set; } = "";
    }

    public class CareerStatusOptionDto
    {
        public int Id { get; set; }
        public string ShortLabel { get; set; } = "";
        public string Summary { get; set; } = "";
        public string Icon { get; set; } = "";
        public int LockDays { get; set; }
        public bool ShowInRadio { get; set; }
    }

    public class CareerStatusChangeRequest
    {
        public int StatusId { get; set; }
        public string? OfficeNote { get; set; }
        public bool IsOldResume { get; set; }
        public bool SendMail { get; set; } = true;
    }

    public class CareerStatusChangeResult
    {
        public bool Hidden { get; set; }
        public string Message { get; set; } = "";
    }

    public class CareerMassEmailRequest
    {
        public string Position { get; set; } = "All";
        public string ResumeSet { get; set; } = "All";
        public List<int> StatusIds { get; set; } = new();
        public string FromAddress { get; set; } = "";
        public string Subject { get; set; } = "";
        public string HtmlBody { get; set; } = "";
        public bool SendNow { get; set; }
    }

    public class CareerMassEmailDto
    {
        public int Id { get; set; }
        public string Position { get; set; } = "";
        public string ResumeSet { get; set; } = "";
        public string StatusIds { get; set; } = "";
        public string FromAddress { get; set; } = "";
        public string Subject { get; set; } = "";
        public string HtmlBody { get; set; } = "";
        public string State { get; set; } = "";
        public int RecipientCount { get; set; }
        public string? Error { get; set; }
        public string CreatedAt { get; set; } = "";
        public string? SentAt { get; set; }
    }
}
