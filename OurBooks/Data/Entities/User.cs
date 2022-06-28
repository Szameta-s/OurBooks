using Microsoft.AspNetCore.Identity;

namespace OurBooks.Data.Entities
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public ICollection<Book>? Books { get; set; }
    }
}
