namespace Dotsandcoms_in.Server.DTOs
{
    public class OrderTokenPayload
    {
        public string OrderRef { get; set; } = "";
        public DateTime CreatedOn { get; set; }
        public string IpAddress { get; set; } = "";

        public string PackageName { get; set; } = "";
        public string PackageId { get; set; } = "";
        public decimal Price { get; set; }
        public string Period { get; set; } = "";

        public string CompanyName { get; set; } = "";
        public string ContactNumber { get; set; } = "";
        public string EmailId { get; set; } = "";
        public string Address { get; set; } = "";
        public string City { get; set; } = "";
        public string State { get; set; } = "";
        public string Country { get; set; } = "";
        public string Comments { get; set; } = "";

        public bool IsServerPlan { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal SetupCharge { get; set; }
        public decimal DbAddonPrice { get; set; }
        public decimal Discount { get; set; }

        public string DomainName { get; set; } = "";
        public string YourName { get; set; } = "";
        public string AreaCode { get; set; } = "";
        public bool AddMsSql { get; set; }

        public string ServerName { get; set; } = "";
        public string ContactPersonName { get; set; } = "";
        public string SpecialInstructions { get; set; } = "";
        public string OperatingSystem { get; set; } = "";
        public string PaymentTerms { get; set; } = "";
        public string ControlPanel { get; set; } = "";

        public string? PaymentMethod { get; set; }
    }
}
