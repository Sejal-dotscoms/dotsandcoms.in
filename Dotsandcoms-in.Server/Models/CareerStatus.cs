namespace Dotsandcoms_in.Server.Models
{
    public class CareerStatus
    {
        public int Id { get; set; }
        public string ShortLabel { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public int LockDays { get; set; }
        public string Icon { get; set; } = "unprocessed.png";
        public bool ShowInRadio { get; set; }
        public bool IsDefault { get; set; }
        public int SortOrder { get; set; }
    }
}
