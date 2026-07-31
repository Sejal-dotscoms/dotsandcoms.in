using System.ComponentModel.DataAnnotations;

namespace Dotsandcoms_in.Server.DTOs
{
    /// <summary>Payload sent by the sign-in form.</summary>
    public class AdminLoginRequestDto
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Enter a valid email address.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
        public string Password { get; set; } = string.Empty;
    }

    /// <summary>Returned to the client after a successful sign-in.</summary>
    public class AdminLoginResponseDto
    {
        /// <summary>AES-encrypted session token — store in localStorage / sessionStorage.</summary>
        public string Token { get; set; } = string.Empty;

        /// <summary>Lightweight user object for the client UI.</summary>
        public AdminUserDto User { get; set; } = new();
    }

    /// <summary>User info serialised into the sign-in response and stored on the client.</summary>
    public class AdminUserDto
    {
        public int    Id       { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email    { get; set; } = string.Empty;
        public string Role     { get; set; } = string.Empty;
    }

    /// <summary>Internal payload that gets AES-encrypted into the session token.</summary>
    public class AdminTokenPayload
    {
        public int      AdminId   { get; set; }
        public string   Email     { get; set; } = string.Empty;
        public string   Role      { get; set; } = string.Empty;
        public DateTime IssuedAt  { get; set; }
        public DateTime ExpiresAt { get; set; }
    }

    /// <summary>Body for the /api/auth/validate endpoint.</summary>
    public class ValidateTokenRequestDto
    {
        public string Token { get; set; } = string.Empty;
    }

    /// <summary>Body for the /api/auth/change-password endpoint.</summary>
    public class ChangePasswordDto
    {
        [Required(ErrorMessage = "Old password is required.")]
        public string OldPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "New password is required.")]
        [MinLength(6, ErrorMessage = "New password must be at least 6 characters.")]
        public string NewPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "Confirm password is required.")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }

    /// <summary>Body for the /api/auth/forgot-password endpoint.</summary>
    public class ForgotPasswordDto
    {
        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Enter a valid email address.")]
        public string Email { get; set; } = string.Empty;
    }
}
