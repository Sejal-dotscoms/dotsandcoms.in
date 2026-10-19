using Dotsandcoms_in.Server.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

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
            string to,
            string cc,
            string from,
            string subject,
            string html,
            string? replyToName = null)
        {
            if (string.IsNullOrWhiteSpace(_settings.Host) ||
                string.IsNullOrWhiteSpace(_settings.From) ||
                string.IsNullOrWhiteSpace(_settings.Username) ||
                string.IsNullOrWhiteSpace(_settings.Password))
            {
                throw new InvalidOperationException("Email is not configured.");
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_settings.DisplayName ?? _settings.From, _settings.From));
            message.To.Add(MailboxAddress.Parse(to.Trim()));

            if (!string.IsNullOrWhiteSpace(from))
            {
                message.ReplyTo.Add(string.IsNullOrWhiteSpace(replyToName)
                    ? MailboxAddress.Parse(from.Trim())
                    : new MailboxAddress(replyToName.Trim(), from.Trim()));
            }

            if (!string.IsNullOrWhiteSpace(cc))
            {
                message.Cc.Add(MailboxAddress.Parse(cc.Trim()));
            }

            message.Subject = subject;
            message.Body = new BodyBuilder { HtmlBody = html }.ToMessageBody();

            var username = _settings.Username.Trim();
            var password = _settings.Password.Replace(" ", "").Trim();

            using var smtp = new SmtpClient();
            var socketOptions = _settings.Port == 465
                ? SecureSocketOptions.SslOnConnect
                : _settings.EnableSSL ? SecureSocketOptions.StartTls : SecureSocketOptions.None;

            try
            {
                await smtp.ConnectAsync(_settings.Host, _settings.Port, socketOptions);
                await smtp.AuthenticateAsync(username, password);
                await smtp.SendAsync(message);
                await smtp.DisconnectAsync(true);
            }
            catch (AuthenticationException)
            {
                throw new InvalidOperationException("The email could not be sent. The mail server rejected the login.");
            }
            catch (SmtpProtocolException ex) when (ex.Message.Contains("Username and Password not accepted", StringComparison.OrdinalIgnoreCase)
                || ex.Message.Contains("BadCredentials", StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("The email could not be sent. The mail server rejected the login.");
            }
        }
    }
}
