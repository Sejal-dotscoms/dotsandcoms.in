using Dotsandcoms_in.Server.Models;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace Dotsandcoms_in.Server.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _settings;

        public EmailService(IOptions<EmailSettings> options)
        {
            _settings = options.Value;
        }

        public async Task SendEmailAsync(
            string to,string cc,
            string from,
            string subject,
            string html)
        {
            using var smtp = new SmtpClient( _settings.Host, _settings.Port);

            smtp.Credentials = new NetworkCredential(    _settings.Username, _settings.Password);

            smtp.EnableSsl = _settings.EnableSSL;

            MailMessage mail =
                new MailMessage();

            string fromEmail = string.IsNullOrWhiteSpace(from)
       ? _settings.From
       : from;

            //cc = "karanvaghasiya786@gmail.com";
            //string cc = "support@dotscoms.com";
            mail.From =new MailAddress(_settings.From, _settings.DisplayName);

            mail.To.Add(to);
 

    if (!string.IsNullOrWhiteSpace(cc))
    {
        mail.CC.Add(cc.Trim());
    }

            mail.Subject = subject;

            mail.Body = html;

            mail.IsBodyHtml = true;

            await smtp.SendMailAsync(mail);
        }

    }
}
