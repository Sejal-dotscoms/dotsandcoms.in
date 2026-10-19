namespace Dotsandcoms_in.Server.Models
{
    public static class CareerStatusSeed
    {
        public static readonly CareerStatus[] All =
        {
            new()
            {
                Id = CareerStatusIds.ReviewPending,
                ShortLabel = "Review Pending",
                Summary = "Your application has been received and is waiting for review.",
                LockDays = 0,
                Icon = "unprocessed.png",
                ShowInRadio = false,
                IsDefault = true,
                SortOrder = 0
            },
            new()
            {
                Id = CareerStatusIds.Accepted,
                ShortLabel = "Accepted",
                Summary = "Your application has been accepted.",
                LockDays = 0,
                Icon = "accept.png",
                ShowInRadio = false,
                IsDefault = false,
                SortOrder = 4
            },
            new()
            {
                Id = CareerStatusIds.RejectedEnglish,
                ShortLabel = "Rejected English",
                Summary = "Thank you for your application. The English communication requirement for this role was not met. You can apply again after 365 days.",
                LockDays = 365,
                Icon = "reject.png",
                ShowInRadio = true,
                IsDefault = false,
                SortOrder = 10
            },
            new()
            {
                Id = CareerStatusIds.RejectedProfile,
                ShortLabel = "Rejected Profile",
                Summary = "Thank you for your application. Your profile does not match the requirements of this role. You can apply again after 365 days.",
                LockDays = 365,
                Icon = "reject.png",
                ShowInRadio = true,
                IsDefault = false,
                SortOrder = 11
            },
            new()
            {
                Id = CareerStatusIds.ReApply,
                ShortLabel = "Re-Apply",
                Summary = "Please update your details and apply again for a current opening.",
                LockDays = 0,
                Icon = "future.png",
                ShowInRadio = true,
                IsDefault = false,
                SortOrder = 12
            },
            new()
            {
                Id = CareerStatusIds.Incomplete,
                ShortLabel = "Incomplete",
                Summary = "Your application is incomplete. Please complete the missing details so it can be reviewed.",
                LockDays = 0,
                Icon = "incomplete.png",
                ShowInRadio = true,
                IsDefault = false,
                SortOrder = 13
            },
            new()
            {
                Id = CareerStatusIds.OnHold,
                ShortLabel = "On-Hold No Vacancy",
                Summary = "There is no open vacancy for this role at the moment. Your application is on hold.",
                LockDays = 0,
                Icon = "onhold.png",
                ShowInRadio = true,
                IsDefault = false,
                SortOrder = 14
            },
            new()
            {
                Id = CareerStatusIds.Shortlisted,
                ShortLabel = "Shortlisted",
                Summary = "Your application has been shortlisted. Our team will contact you about the next step.",
                LockDays = 0,
                Icon = "process.png",
                ShowInRadio = true,
                IsDefault = false,
                SortOrder = 15
            },
            new()
            {
                Id = CareerStatusIds.Hired,
                ShortLabel = "Hired",
                Summary = "You have been selected for this role. Our team will contact you about joining.",
                LockDays = 0,
                Icon = "accept.png",
                ShowInRadio = true,
                IsDefault = false,
                SortOrder = 16
            },
            new()
            {
                Id = CareerStatusIds.OfferNotAccepted,
                ShortLabel = "Offer not accepted by Candidate",
                Summary = "The offer for this role was not accepted.",
                LockDays = 0,
                Icon = "reject.png",
                ShowInRadio = true,
                IsDefault = false,
                SortOrder = 17
            }
        };
    }
}
