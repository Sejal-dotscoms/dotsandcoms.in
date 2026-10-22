namespace Dotsandcoms_in.Server.Models
{
    public class CareerOtp
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Purpose { get; set; } = "apply";
        public string Code { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string RegistrationType { get; set; } = "Job";
        public string JobSlug { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public bool RevealAllowed { get; set; }
        public bool Used { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
