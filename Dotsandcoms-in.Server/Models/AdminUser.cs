namespace Dotsandcoms_in.Server.Models
{
    /// <summary>
    /// Represents a Poweradmin administrator account stored in the database.
    /// Passwords are stored as BCrypt hashes — never plain text.
    /// </summary>
    public class AdminUser
    {
        public int Id { get; set; }

        /// <summary>Full name shown in the admin panel header.</summary>
        public string FullName { get; set; } = string.Empty;

        /// <summary>Login email (unique per account).</summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>BCrypt-hashed password.</summary>
        public string PasswordHash { get; set; } = string.Empty;

       

        /// <summary>Role label, e.g. "SuperAdmin", "Editor".</summary>
        public string Role { get; set; } = "Admin";

        /// <summary>Whether this account is allowed to sign in.</summary>
        public bool IsActive { get; set; } = true;

        /// <summary>UTC timestamp when the account was created.</summary>
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        /// <summary>UTC timestamp of the last successful sign-in. Null if never signed in.</summary>
        public DateTime? LastLoginOn { get; set; }
    }
}
