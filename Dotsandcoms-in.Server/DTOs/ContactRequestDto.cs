using System.ComponentModel.DataAnnotations;

namespace Dotsandcoms_in.Server.DTOs
{
    public class ContactRequestDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Message { get; set; }

     

    }
}
