using Dotsandcoms_in.Server.DTOs;

namespace Dotsandcoms_in.Server.Services
{
    public interface IAdminAuthService
    {
        /// <summary>
        /// Validates credentials and returns a signed session token + user info on success.
        /// Throws <see cref="InvalidOperationException"/> with a safe message on failure.
        /// </summary>
        Task<AdminLoginResponseDto> SignInAsync(AdminLoginRequestDto request);

        /// <summary>
        /// Decodes and validates a session token.
        /// Returns the payload or throws <see cref="InvalidOperationException"/> if invalid / expired.
        /// </summary>
        AdminTokenPayload ValidateToken(string token);

        /// <summary>
        /// Changes the password for the given admin after verifying the old password.
        /// Throws <see cref="InvalidOperationException"/> with a safe message on failure.
        /// </summary>
        Task ChangePasswordAsync(int adminId, string oldPassword, string newPassword);

        /// <summary>
        /// Generates a temporary password for the admin with the given email, saves the BCrypt hash,
        /// and emails the credentials to that address.
        /// Throws <see cref="InvalidOperationException"/> if the email is not found or the account is inactive.
        /// </summary>
        Task ForgotPasswordAsync(string email);
    }
}
