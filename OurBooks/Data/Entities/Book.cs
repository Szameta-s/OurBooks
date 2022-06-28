using System.ComponentModel.DataAnnotations;

namespace OurBooks.Data.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Author { get; set; }
        [Required]
        public string? Genre { get; set; }
        public string? shortDescription { get; set; }
        public string? longDescription { get; set; }
        public string? imgURL { get; set; }
        public string? Cover { get; set; }
        public string? Price { get; set; }
        public string? BorrowTime { get; set; }
        public bool? IsForBorrrow { get; set; }

    }
}
