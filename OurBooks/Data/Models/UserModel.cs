using OurBooks.Data.Entities;

namespace OurBooks.Data.Models
{
    public class UserModel
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool RememberMe { get; set; }
        public ICollection<Book>? Books { get; set; }
    }
}
