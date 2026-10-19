namespace Dotsandcoms_in.Server.Models
{
    public class CareerMassEmail
    {
        public int Id { get; set; }
        public string Position { get; set; } = "All";
        public string ResumeSet { get; set; } = "All";
        public string StatusIds { get; set; } = string.Empty;
        public string FromAddress { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string HtmlBody { get; set; } = string.Empty;
        public string State { get; set; } = "Pending";
        public int RecipientCount { get; set; }
        public string? Error { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? SentAt { get; set; }
    }
}
