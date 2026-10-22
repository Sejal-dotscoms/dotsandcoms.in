namespace Dotsandcoms_in.Server.Models
{
    public static class CareerCatalog
    {
        public static readonly IReadOnlyList<(string Slug, string Title, string Location)> Jobs = new (string, string, string)[]
        {
            ("job-business-development-customer-rep", "Business Development Executive / Client Relationship Manager", "Vadodara, India"),
            ("job-vacancy-asp-net-mvc", "ASP.NET / C# / WebForms / MVC / Core Web Developer", "Vadodara, India"),
            ("job-digital-marketing-executive", "Digital Marketing Executive", "Vadodara, India"),
            ("job-webhosting-techsupport-executive", "TechSupport Executive", "Vadodara, India"),
            ("job-vacancy-logo-vector-graphic-designer", "Logo / Graphic Designer", "Vadodara, India"),
            ("jobs-flutter-developer", "Flutter Mobile App Developer", "Vadodara, India"),
            ("job-hr-executive", "HR Executive", "Vadodara, India"),
            ("job-admin-executive", "Admin Executive", "Vadodara, India"),
            ("job-UI-UX-Theme-website-designer", "UI/UX Designer", "Vadodara, India"),
            ("job-UI-UX-website-responsive-developer", "Frontend UI / UX Website Developer", "Vadodara, India"),
            ("job-project-manager", "Scrum Manager / Technical Project Manager", "Vadodara, India"),
        };

        public static readonly string[] HeardFrom =
        {
            "A Friend", "Ex-Dotcommers", "Current Dotcommers", "Radio Adv.", "Google Search",
            "Naukri.com", "Linked In", "Client", "Seminar / Workshop", "Campus Recruitements", "Others"
        };

        public static bool TryGetJob(string? slug, out string title, out string location)
        {
            var match = Jobs.FirstOrDefault(j => string.Equals(j.Slug, slug, StringComparison.OrdinalIgnoreCase));
            if (match.Slug == null)
            {
                title = "";
                location = "";
                return false;
            }
            title = match.Title;
            location = match.Location;
            return true;
        }
    }
}
