using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Models;
using Dotsandcoms_in.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Dotsandcoms_in.Server.Controllers
{

    [ApiController]
    [Route("api/audit")]
    public class AuditController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly IHttpClientFactory _httpClientFactory;

        public AuditController(
            IConfiguration configuration,
            IEmailService emailService,
            IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _emailService = emailService;
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send(
            AuditRequestDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
 

            
        

            
             
            StringBuilder body = new();

            body.Append($@"
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8' />
<title>New SEO Audit Request</title>
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

New Website SEO Audit Request

</h2>

<p style='font-size:15px;color:#555;'>

A new user has submitted the Website Audit form.

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

Website

</td>

<td
style='border:1px solid #eee;'>

<a href='" + model.WebsiteUrl + @"' target='_blank'>

" + model.WebsiteUrl + @"

</a>

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

This email was generated automatically from your website Audit Form.

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
");

            //-----------------------------------------
            // SEND MAIL
            //-----------------------------------------
            //parul@dotscoms.com
            await _emailService.SendEmailAsync(
                "parul@dotscoms.com", "contact@dotsandcoms.in",
                model.Email,
                "New SEO Audit Request",
                body.ToString());

            return Ok(new
            {
                success = true,
                message = "Audit Request Submitted Successfully."
            });
        }
    }
}
