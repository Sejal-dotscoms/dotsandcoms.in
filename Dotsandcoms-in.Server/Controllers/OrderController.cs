using Microsoft.AspNetCore.Mvc;

namespace Dotsandcoms_in.Server.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;

        public OrderController(ILogger<OrderController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderDto order)
        {
            if (order == null)
            {
                return BadRequest("Order data is null.");
            }

            if (order.IsServerPlan)
            {
                // Validate VPS/Dedicated Fields
                if (string.IsNullOrWhiteSpace(order.ServerName) ||
                    string.IsNullOrWhiteSpace(order.CompanyName) ||
                    string.IsNullOrWhiteSpace(order.ContactPersonName) ||
                    string.IsNullOrWhiteSpace(order.EmailId) ||
                    string.IsNullOrWhiteSpace(order.ContactNumber) ||
                    string.IsNullOrWhiteSpace(order.Address) ||
                    string.IsNullOrWhiteSpace(order.State) ||
                    string.IsNullOrWhiteSpace(order.Country) ||
                    string.IsNullOrWhiteSpace(order.OperatingSystem))
                {
                    return BadRequest("Mandatory server order fields are missing.");
                }

                // Log server order details
                _logger.LogInformation("=== NEW SERVER ORDER RECEIVED ===");
                _logger.LogInformation("Plan: {PackageName} ({PackageId})", order.PackageName, order.PackageId);
                _logger.LogInformation("Price: ₹{TotalPrice} for {PaymentTerms}", order.TotalPrice, order.PaymentTerms);
                _logger.LogInformation("Server Name: {ServerName}", order.ServerName);
                _logger.LogInformation("Operating System: {OperatingSystem} | Control Panel: {ControlPanel}", order.OperatingSystem, order.ControlPanel);
                _logger.LogInformation("Customer: {ContactPersonName} ({CompanyName})", order.ContactPersonName, order.CompanyName);
                _logger.LogInformation("Contact: {EmailId} | {ContactNumber}", order.EmailId, order.ContactNumber);
                _logger.LogInformation("Billing Address: {Address}, {State}, {Country}", order.Address, order.State, order.Country);
                if (!string.IsNullOrWhiteSpace(order.SpecialInstructions))
                {
                    _logger.LogInformation("Special Instructions: {SpecialInstructions}", order.SpecialInstructions);
                }
                _logger.LogInformation("==================================");
            }
            else
            {
                // Validate Shared Hosting / SSL Fields
                if (string.IsNullOrWhiteSpace(order.DomainName) ||
                    string.IsNullOrWhiteSpace(order.CompanyName) ||
                    string.IsNullOrWhiteSpace(order.YourName) ||
                    string.IsNullOrWhiteSpace(order.EmailId) ||
                    string.IsNullOrWhiteSpace(order.ContactNumber) ||
                    string.IsNullOrWhiteSpace(order.Address) ||
                    string.IsNullOrWhiteSpace(order.Country))
                {
                    return BadRequest("Mandatory fields are missing.");
                }

                // Log shared hosting order details
                _logger.LogInformation("=== NEW HOSTING ORDER RECEIVED ===");
                _logger.LogInformation("Package: {PackageName} ({PackageId}) - Total Price: ₹{TotalPrice}/{Period}", order.PackageName, order.PackageId, order.TotalPrice, order.Period);
                _logger.LogInformation("Domain: {DomainName}", order.DomainName);
                _logger.LogInformation("Customer: {YourName} ({CompanyName})", order.YourName, order.CompanyName);
                _logger.LogInformation("Contact: {EmailId} | {ContactNumber}", order.EmailId, order.ContactNumber);
                _logger.LogInformation("Billing Address: {Address}, {City}, {State}, {AreaCode}, {Country}", order.Address, order.City, order.State, order.AreaCode, order.Country);
                _logger.LogInformation("Add MS-SQL: {AddMsSql}", order.AddMsSql);
                if (!string.IsNullOrWhiteSpace(order.Comments))
                {
                    _logger.LogInformation("Comments: {Comments}", order.Comments);
                }
                _logger.LogInformation("===================================");
            }

            return Ok(new { success = true, message = "Order successfully created." });
        }
    }

    public class OrderDto
    {
        // General Info
        public string PackageName { get; set; } = string.Empty;
        public string PackageId { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Period { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public bool IsServerPlan { get; set; }

        // Contact info
        public string CompanyName { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public string EmailId { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;

        // Shared / SSL Fields
        public string DomainName { get; set; } = string.Empty;
        public string YourName { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string AreaCode { get; set; } = string.Empty;
        public bool AddMsSql { get; set; }
        public string Comments { get; set; } = string.Empty;

        // Server-specific (VPS / Dedicated) Fields
        public string ServerName { get; set; } = string.Empty;
        public string ContactPersonName { get; set; } = string.Empty;
        public string SpecialInstructions { get; set; } = string.Empty;
        public string OperatingSystem { get; set; } = string.Empty;
        public string PaymentTerms { get; set; } = string.Empty;
        public string ControlPanel { get; set; } = string.Empty;
    }
}
