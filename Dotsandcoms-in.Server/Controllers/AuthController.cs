using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dotsandcoms_in.Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAdminAuthService _adminAuth;

        public AuthController(IAdminAuthService adminAuth)
        {
            _adminAuth = adminAuth;
        }

        // POST /api/auth/signin
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] AdminLoginRequestDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { success = false, errors = ModelState });

            try
            {
                var result = await _adminAuth.SignInAsync(dto);
                return Ok(new { success = true, token = result.Token, user = result.User });
            }
            catch (InvalidOperationException ex)
            {
                // 401 with a safe message — never expose stack traces
                return Unauthorized(new { success = false, message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { success = false, message = "An unexpected error occurred. Please try again." });
            }
        }

        // POST /api/auth/change-password
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { success = false, errors = ModelState });

            if (dto.NewPassword != dto.ConfirmPassword)
                return BadRequest(new { success = false, message = "New password and confirm password do not match." });

            // Extract admin identity from the Bearer token
            var authHeader = Request.Headers["Authorization"].FirstOrDefault();
            if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer "))
                return Unauthorized(new { success = false, message = "Authorization token is required." });

            AdminTokenPayload payload;
            try
            {
                payload = _adminAuth.ValidateToken(authHeader["Bearer ".Length..].Trim());
            }
            catch (InvalidOperationException ex)
            {
                return Unauthorized(new { success = false, message = ex.Message });
            }

            try
            {
                await _adminAuth.ChangePasswordAsync(payload.AdminId, dto.OldPassword, dto.NewPassword);
                return Ok(new { success = true, message = "Password changed successfully." });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // POST /api/auth/forgot-password
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { success = false, errors = ModelState });

            try
            {
                await _adminAuth.ForgotPasswordAsync(dto.Email);
                return Ok(new { success = true, message = "Credentials have been sent to your email address." });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { success = false, message = "An unexpected error occurred. Please try again." });
            }
        }

        // POST /api/auth/validate
        // The client calls this on app load to confirm a stored token is still valid.
        [HttpPost("validate")]
        public IActionResult Validate([FromBody] ValidateTokenRequestDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto?.Token))
                return BadRequest(new { success = false, message = "Token is required." });

            try
            {
                var payload = _adminAuth.ValidateToken(dto.Token);
                return Ok(new
                {
                    success   = true,
                    adminId   = payload.AdminId,
                    email     = payload.Email,
                    role      = payload.Role,
                    expiresAt = payload.ExpiresAt
                });
            }
            catch (InvalidOperationException ex)
            {
                return Unauthorized(new { success = false, message = ex.Message });
            }
        }
    }
}
