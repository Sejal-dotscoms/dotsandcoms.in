using Dotsandcoms_in.Server.Data;
using Dotsandcoms_in.Server.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Linq;

namespace Dotsandcoms_in.Server.Services
{
    public class AdminAuthService : IAdminAuthService
    {
        private readonly AppDbContext _db;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;

        // Session token lifetime
        private static readonly TimeSpan TokenLifetime = TimeSpan.FromHours(8);

        // Generic error — never leak "user not found" vs "wrong password" to the client
        private const string BadCredentials = "Invalid email or password.";

        public AdminAuthService(AppDbContext db, ITokenService tokenService, IEmailService emailService)
        {
            _db           = db;
            _tokenService = tokenService;
            _emailService = emailService;
        }

        public async Task<AdminLoginResponseDto> SignInAsync(AdminLoginRequestDto request)
        {
            // 1. Look up admin by email (case-insensitive)
            var admin = await _db.AdminUsers
                .FirstOrDefaultAsync(a => a.Email.ToLower() == request.Email.ToLower().Trim());

            if (admin == null)
                throw new InvalidOperationException(BadCredentials);

            // 2. Reject disabled accounts
            if (!admin.IsActive)
                throw new InvalidOperationException("This account has been disabled. Contact support.");

            // 3. Verify password against the BCrypt hash
            if (!BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash))
                throw new InvalidOperationException(BadCredentials);

            // 4. Stamp last-login time
            admin.LastLoginOn = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            // 5. Build AES-encrypted session token
            var payload = new AdminTokenPayload
            {
                AdminId   = admin.Id,
                Email     = admin.Email,
                Role      = admin.Role,
                IssuedAt  = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.Add(TokenLifetime)
            };

            var token = _tokenService.Encrypt(JsonSerializer.Serialize(payload));

            return new AdminLoginResponseDto
            {
                Token = token,
                User  = new AdminUserDto
                {
                    Id       = admin.Id,
                    FullName = admin.FullName,
                    Email    = admin.Email,
                    Role     = admin.Role
                }
            };
        }

        public async Task ChangePasswordAsync(int adminId, string oldPassword, string newPassword)
        {
            var admin = await _db.AdminUsers.FindAsync(adminId)
                ?? throw new InvalidOperationException("Admin account not found.");

            if (!admin.IsActive)
                throw new InvalidOperationException("This account has been disabled.");

            if (!BCrypt.Net.BCrypt.Verify(oldPassword, admin.PasswordHash))
                throw new InvalidOperationException("Old password is incorrect.");

            admin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await _db.SaveChangesAsync();
        }

        public async Task ForgotPasswordAsync(string email)
        {
            var admin = await _db.AdminUsers
                .FirstOrDefaultAsync(a => a.Email.ToLower() == email.ToLower().Trim());

            if (admin == null || !admin.IsActive)
                throw new InvalidOperationException("No active account was found with that email address.");

            var tempPassword = GenerateTempPassword();
            admin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(tempPassword);
            await _db.SaveChangesAsync();

            await _emailService.SendEmailAsync(
                to: admin.Email,
                cc: "",
                from: "",
                subject: "Your Admin Panel Credentials – Dots & Coms",
                html: BuildForgotPasswordEmail(admin.Email, tempPassword)
            );
        }

        private static string GenerateTempPassword()
        {
            const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
            var bytes = new byte[10];
            System.Security.Cryptography.RandomNumberGenerator.Fill(bytes);
            return new string(bytes.Select(b => chars[b % chars.Length]).ToArray());
        }

        private static string BuildForgotPasswordEmail(string email, string tempPassword)
        {
            return $@"<div style=""font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#ffffff"">
  <img src=""https://www.dotsandcoms.in/assets/dots-and-coms-logo.png"" alt=""Dots &amp; Coms"" style=""height:48px;margin-bottom:24px"" />
  <h2 style=""color:#cf1f1f;margin:0 0 16px"">Admin Panel Access</h2>
  <p style=""color:#374151;margin:0 0 20px"">Your temporary credentials for the Dots &amp; Coms admin panel are below. Please sign in and change your password immediately.</p>
  <table style=""background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;width:100%;border-collapse:collapse"">
    <tr>
      <td style=""padding:8px 12px;color:#6b7280;font-size:14px"">Email</td>
      <td style=""padding:8px 12px;font-weight:600;color:#111827"">{System.Net.WebUtility.HtmlEncode(email)}</td>
    </tr>
    <tr>
      <td style=""padding:8px 12px;color:#6b7280;font-size:14px"">Temporary Password</td>
      <td style=""padding:8px 12px;font-weight:600;color:#111827;letter-spacing:1px"">{tempPassword}</td>
    </tr>
  </table>
  <a href=""https://www.dotsandcoms.in/poweradmin"" style=""display:inline-block;margin-top:24px;padding:12px 28px;background:#dc2626;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600"">Sign In to Admin Panel</a>
  <p style=""color:#9ca3af;font-size:12px;margin-top:24px"">If you did not request this, please contact support immediately.</p>
</div>";
        }

        public AdminTokenPayload ValidateToken(string token)
        {
            string json;
            try
            {
                json = _tokenService.Decrypt(token);
            }
            catch
            {
                throw new InvalidOperationException("Invalid session token.");
            }

            var payload = JsonSerializer.Deserialize<AdminTokenPayload>(json)
                ?? throw new InvalidOperationException("Session token could not be read.");

            if (DateTime.UtcNow > payload.ExpiresAt)
                throw new InvalidOperationException("Session has expired. Please sign in again.");

            return payload;
        }
    }
}
