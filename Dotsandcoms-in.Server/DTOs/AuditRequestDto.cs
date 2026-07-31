using System.ComponentModel.DataAnnotations;

namespace Dotsandcoms_in.Server.DTOs
{
    public class AuditRequestDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string WebsiteUrl { get; set; }

         
    }
}
