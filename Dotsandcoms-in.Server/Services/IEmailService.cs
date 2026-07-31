namespace Dotsandcoms_in.Server.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(   string to,string cc,string from,  string subject,  string html);
    }
}
