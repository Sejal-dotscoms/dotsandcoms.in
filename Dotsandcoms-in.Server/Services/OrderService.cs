using Dotsandcoms_in.Server.Data;
using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Models;
using System.Text;
using System.Text.Json;

namespace Dotsandcoms_in.Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly IEmailService _emailService;
        private readonly ITokenService _tokenService;
        private readonly ILegacyTokenService _legacyTokenService;

        // Token kitni der tak valid rahega (payment link expire hone ke liye zaroori hai)
        private static readonly TimeSpan TokenLifetime = TimeSpan.FromHours(2);
     
        private const decimal GstRatePercent = 18.0m;

        public OrderService(IEmailService emailService, ITokenService tokenService, ILegacyTokenService legacyTokenService)
        {
            _emailService = emailService;
            _tokenService = tokenService;
            _legacyTokenService = legacyTokenService;
        }

        public async Task<(string OrderRef, string Token)> PlaceOrderAsync(OrderRequestDto dto, string ipAddress)
        {
            var payload = new OrderTokenPayload
            {
                OrderRef = GenerateOrderRef(),
                CreatedOn = DateTime.UtcNow,
                IpAddress = ipAddress,

                PackageName = dto.PackageName,
                PackageId = dto.PackageId,
                Price = dto.Price,
                Period = dto.Period,

                CompanyName = dto.CompanyName,
                ContactNumber = dto.ContactNumber,
                EmailId = dto.EmailId,
                Address = dto.Address,
                City = dto.City,
                State = dto.State,
                Country = dto.Country,
                Comments = string.IsNullOrWhiteSpace(dto.Comments) ? "-" : dto.Comments,

                IsServerPlan = dto.IsServerPlan,
                TotalPrice = dto.TotalPrice,
                SetupCharge = dto.SetupCharge,
                DbAddonPrice = dto.DbAddonPrice,
                Discount = dto.Discount,

                DomainName = dto.DomainName,
                YourName = dto.YourName,
                AreaCode = dto.AreaCode,
                AddMsSql = dto.AddMsSql ?? false,

                ServerName = dto.ServerName,
                ContactPersonName = dto.ContactPersonName,
                SpecialInstructions = dto.SpecialInstructions,
                OperatingSystem = dto.OperatingSystem,
                PaymentTerms = dto.PaymentTerms,
                ControlPanel = dto.ControlPanel
            };

            // Admin email
            await _emailService.SendEmailAsync(
                to: "techsupport@dotscoms.com",
                cc: "contact@dotsandcoms.in",
                from: payload.EmailId,
                subject: $"Hosting Order Form-{DateTime.Now:dd-MMM-yyyy}- IN",
                html: BuildAdminMailBody(payload)
            );

            // Thank you email
            await _emailService.SendEmailAsync(
                to: payload.EmailId,
                cc:"",
                from: "",
                subject: "Thank You!",
                html: BuildThankYouMailBody(payload)
            );

            var token = _tokenService.Encrypt(JsonSerializer.Serialize(payload));
            return (payload.OrderRef, token);
        }

        public OrderTokenPayload DecodeToken(string token)
        {
            var json = _tokenService.Decrypt(token);
            var payload = JsonSerializer.Deserialize<OrderTokenPayload>(json)
                ?? throw new InvalidOperationException("Order data could not be read.");

            if (DateTime.UtcNow - payload.CreatedOn > TokenLifetime)
                throw new InvalidOperationException("This order link has expired.");

            return payload;
        }

        public string AttachPaymentMethodAndReEncrypt(string token, string paymentMethod, out string orderRef)
        {
            var payload = DecodeToken(token);
            payload.PaymentMethod = paymentMethod;
            orderRef = payload.OrderRef;

            return _tokenService.Encrypt(JsonSerializer.Serialize(payload));
        }

        private static string GenerateOrderRef()
        {
            var stamp = DateTime.UtcNow.ToString("yyMMddHHmmss");
            var rand = Random.Shared.Next(100, 999);
            return $"DNC-{stamp}{rand}";
        }

        //private string BuildAdminMailBody(OrderTokenPayload o)
        //{
        //    var sb = new StringBuilder();
        //    sb.Append($"<p><b>Order Ref:</b> {o.OrderRef}</p>");
        //    sb.Append($"<p><b>Package:</b> {o.PackageName}</p>");
        //    sb.Append($"<p><b>Company:</b> {o.CompanyName}</p>");
        //    sb.Append($"<p><b>Contact Person:</b> {(o.IsServerPlan ? o.ContactPersonName : o.YourName)}</p>");
        //    sb.Append($"<p><b>Domain/Server Name:</b> {(o.IsServerPlan ? o.ServerName : o.DomainName)}</p>");
        //    sb.Append($"<p><b>Email:</b> {o.EmailId}</p>");
        //    sb.Append($"<p><b>Phone:</b> {o.ContactNumber}</p>");
        //    sb.Append($"<p><b>Address:</b> {o.Address}</p>");
        //    sb.Append($"<p><b>City/State:</b> {o.City}, {o.State}</p>");
        //    sb.Append($"<p><b>Country:</b> {o.Country}</p>");
        //    if (o.IsServerPlan)
        //    {
        //        sb.Append($"<p><b>OS:</b> {o.OperatingSystem}</p>");
        //        sb.Append($"<p><b>Payment Terms:</b> {o.PaymentTerms}</p>");
        //        sb.Append($"<p><b>Control Panel:</b> {o.ControlPanel}</p>");
        //        sb.Append($"<p><b>Special Instructions:</b> {o.SpecialInstructions}</p>");
        //    }
        //    else
        //    {
        //        sb.Append($"<p><b>Area Code:</b> {o.AreaCode}</p>");
        //        sb.Append($"<p><b>MS-SQL Addon:</b> {(o.AddMsSql ? "Yes" : "No")}</p>");
        //    }
        //    sb.Append($"<p><b>Comments:</b> {o.Comments}</p>");
        //    sb.Append($"<p><b>Amount:</b> ₹{o.TotalPrice}</p>");
        //    sb.Append($"<p><b>IP Address:</b> {o.IpAddress}</p>");
        //    return sb.ToString();
        //}

        private string BuildAdminMailBody(OrderTokenPayload o)
        {
            var sb = new StringBuilder();

            sb.Append($@"
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8' />
<title>New Order Notification</title>
</head>

<body style='margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;'>

<table width='100%' cellpadding='0' cellspacing='0' style='padding:40px;background:#f4f6f9;'>

<tr>
<td align='center'>

<table width='650' cellpadding='0' cellspacing='0'
style='background:#ffffff;
border-radius:10px;
overflow:hidden;
box-shadow:0 5px 15px rgba(0,0,0,.08);'>

<tr>
<td
style='background:#dc2626;
padding:25px;
text-align:center;
color:#fff;
font-size:28px;
font-weight:bold;'>

Dots and Coms

</td>
</tr>

<tr>
<td style='padding:35px;'>

<h2 style='margin-top:0;color:#222;'>
New Order Placed
</h2>

<p style='font-size:15px;color:#555;'>
A new order has been placed from your website.
</p>

<table width='100%'
cellpadding='12'
cellspacing='0'
style='border-collapse:collapse;
margin-top:25px;'>

<tr>
<td style='background:#f8fafc;font-weight:bold;width:220px;border:1px solid #eee;'>
Order Reference
</td>
<td style='border:1px solid #eee;'>
{o.OrderRef}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Package
</td>
<td style='border:1px solid #eee;'>
{o.PackageName}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Company
</td>
<td style='border:1px solid #eee;'>
{o.CompanyName}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Contact Person
</td>
<td style='border:1px solid #eee;'>
{(o.IsServerPlan ? o.ContactPersonName : o.YourName)}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
{(o.IsServerPlan ? "Server Name" : "Domain Name")}
</td>
<td style='border:1px solid #eee;'>
{(o.IsServerPlan ? o.ServerName : o.DomainName)}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Email
</td>
<td style='border:1px solid #eee;'>
{o.EmailId}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Phone Number
</td>
<td style='border:1px solid #eee;'>
{o.ContactNumber}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Address
</td>
<td style='border:1px solid #eee;'>
{o.Address}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
City / State
</td>
<td style='border:1px solid #eee;'>
{o.City}, {o.State}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Country
</td>
<td style='border:1px solid #eee;'>
{o.Country}
</td>
</tr>");
            if (o.IsServerPlan)
            {
                sb.Append($@"

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Operating System
</td>
<td style='border:1px solid #eee;'>
{o.OperatingSystem}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Payment Terms
</td>
<td style='border:1px solid #eee;'>
{o.PaymentTerms}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Control Panel
</td>
<td style='border:1px solid #eee;'>
{o.ControlPanel}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Special Instructions
</td>
<td style='border:1px solid #eee;white-space:pre-line;'>
{o.SpecialInstructions}
</td>
</tr>");
            }
            else
            {
                sb.Append($@"

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Area Code
</td>
<td style='border:1px solid #eee;'>
{o.AreaCode}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
MS-SQL Addon
</td>
<td style='border:1px solid #eee;'>
{(o.AddMsSql ? "Yes" : "No")}
</td>
</tr>");
            }
            sb.Append($@"

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Comments
</td>
<td style='border:1px solid #eee;white-space:pre-line;'>
{o.Comments}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Total Amount (Without GST)
</td>
<td style='border:1px solid #eee;font-weight:bold;color:#16a34a;font-size:16px;'>
₹{o.TotalPrice:N2}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
IP Address
</td>
<td style='border:1px solid #eee;'>
{o.IpAddress}
</td>
</tr>

<tr>
<td style='background:#f8fafc;font-weight:bold;border:1px solid #eee;'>
Submitted On
</td>
<td style='border:1px solid #eee;'>
{DateTime.Now:dd MMM yyyy hh:mm tt}
</td>
</tr>

</table>

</td>
</tr>

<tr>
<td
style='padding:20px;
background:#111827;
color:#cbd5e1;
font-size:13px;
text-align:center;'>

This email was generated automatically from your website order form.

</td>
</tr>

</table>

</td>
</tr>

</table>

</body>
</html>");

            return sb.ToString();
        }

        private string BuildThankYouMailBody(OrderTokenPayload o)
        {
            return $@"<p>Dear {(o.IsServerPlan ? o.ContactPersonName : o.YourName)},</p>
                       <p>Thank you for placing an order with Dots &amp; Coms. Our team will contact you shortly to complete verification and payment.</p>
                       <p>Order Reference ID: <b>{o.OrderRef}</b></p>";
        }
        public string BuildCcavenueRedirectToken(string token, out string orderRef)
        {
            var payload = DecodeToken(token);
            orderRef = payload.OrderRef;

            var gst = Math.Round(payload.TotalPrice * GstRatePercent / 100m, 2);
            var grandTotal = Math.Round(payload.TotalPrice + gst, 2);

            // customer-payment.aspx exactly ye 10 keys expect karta hai, naam/case bhi same
            var legacyPayload = new Dictionary<string, string>
            {
                ["name"] = payload.IsServerPlan ? payload.ContactPersonName : payload.YourName,
                ["address"] = payload.Address,
                ["city"] = payload.City,
                ["state"] = payload.State,
                ["Areacode"] = payload.AreaCode,
                ["country"] = payload.Country,
                ["phone"] = payload.ContactNumber,
                ["email"] = payload.EmailId,
                ["Package"] = payload.PackageName,
                ["amount"] = grandTotal.ToString("0.00")
            };

            var json = System.Text.Json.JsonSerializer.Serialize(legacyPayload);
            return _legacyTokenService.Encrypt(json);
        }
    }
    }
