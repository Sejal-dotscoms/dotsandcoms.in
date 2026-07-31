using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Models;
using Dotsandcoms_in.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Dotsandcoms_in.Server.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly IHttpClientFactory _httpClientFactory;

        public ContactController(
            IConfiguration configuration,
            IEmailService emailService,
            IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _emailService = emailService;
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send(ContactRequestDto model)
        {
            try
            {
                //---------------------------------------
                // Model Validation
                //---------------------------------------

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                
                string ipAddress =
                    HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";

                //---------------------------------------
                // Build HTML
                //---------------------------------------

                string htmlBody = BuildContactEmail(model, ipAddress);

                //---------------------------------------
                // Send Mail
                //---------------------------------------
                StringBuilder body = new();

                body.Append($@"
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8' />
<title>New Contact Us Enquiry</title>
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

New Contact Us Enquiry

</h2>

<p style='font-size:15px;color:#555;'>

A new user has submitted the Contact Us form.

</p>

<table width='100%'
cellpadding='12'
cellspacing='0'
style='border-collapse:collapse;
margin-top:25px;'>

<tr>

<td
style='background:#f8fafc;
font-weight:bold;
width:180px;
border:1px solid #eee;'>

Name

</td>

<td
style='border:1px solid #eee;'>

" + model.Name + @"

</td>

</tr>

<tr>

<td
style='background:#f8fafc;
font-weight:bold;
border:1px solid #eee;'>

Email

</td>

<td
style='border:1px solid #eee;'>

" + model.Email + @"

</td>

</tr>

<tr>

<td
style='background:#f8fafc;
font-weight:bold;
border:1px solid #eee;'>

Phone Number

</td>

<td
style='border:1px solid #eee;'>

" + model.Phone + @"

</td>

</tr>

<tr>

<td
style='background:#f8fafc;
font-weight:bold;
border:1px solid #eee;'>

Country

</td>

<td
style='border:1px solid #eee;'>

" + model.Country + @"

</td>

</tr>

<tr>

<td
style='background:#f8fafc;
font-weight:bold;
border:1px solid #eee;'>

City

</td>

<td
style='border:1px solid #eee;'>

" + model.City + @"

</td>

</tr>

<tr>

<td
style='background:#f8fafc;
font-weight:bold;
border:1px solid #eee;'>

Message

</td>

<td
style='border:1px solid #eee;white-space:pre-line;'>

" + model.Message + @"

</td>

</tr>

<tr>

<td
style='background:#f8fafc;
font-weight:bold;
border:1px solid #eee;'>

Submitted On

</td>

<td
style='border:1px solid #eee;'>

" + DateTime.Now.ToString("dd MMM yyyy hh:mm tt") + @"

</td>

</tr>

<tr>

<td
style='background:#f8fafc;
font-weight:bold;
border:1px solid #eee;'>

IP Address

</td>

<td
style='border:1px solid #eee;'>

" + HttpContext.Connection.RemoteIpAddress + @"

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

This email was generated automatically from your website Contact Us form.

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
");

                await _emailService.SendEmailAsync(
                    "parul@dotscoms.com", "contact@dotsandcoms.in",
                     model.Email,
                    $"New Contact Enquiry - {model.Name}",
                    body.ToString());

                //---------------------------------------
                // Return Success
                //---------------------------------------

                return Ok(new
                {
                    success = true,
                    message = "Thank you! Your message has been sent successfully."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        //----------------------------------------------------
        // Contact Email Template
        //----------------------------------------------------

        private string BuildContactEmail(
            ContactRequestDto model,
            string ipAddress)
        {
            // HTML EMAIL TEMPLATE
            // Part 2 me replace karenge

            return $@"
            <h2>New Contact Request</h2>

            <table border='1'
                   cellpadding='8'
                   cellspacing='0'
                   style='border-collapse:collapse;'>

                <tr>
                    <td><b>Name</b></td>
                    <td>{model.Name}</td>
                </tr>

                <tr>
                    <td><b>Email</b></td>
                    <td>{model.Email}</td>
                </tr>

                <tr>
                    <td><b>Phone</b></td>
                    <td>{model.Phone}</td>
                </tr>

                <tr>
                    <td><b>Country</b></td>
                    <td>{model.Country}</td>
                </tr>

                <tr>
                    <td><b>City</b></td>
                    <td>{model.City}</td>
                </tr>

                <tr>
                    <td><b>Message</b></td>
                    <td>{model.Message}</td>
                </tr>

                <tr>
                    <td><b>IP Address</b></td>
                    <td>{ipAddress}</td>
                </tr>

                <tr>
                    <td><b>Submitted On</b></td>
                    <td>{DateTime.Now:dd MMM yyyy hh:mm tt}</td>
                </tr>

            </table>";
        }
    }
}
