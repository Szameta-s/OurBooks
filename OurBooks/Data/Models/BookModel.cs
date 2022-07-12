namespace OurBooks.Data.Models
{
    public class BookModel
    {
        public string? Title { get; set; }
        public string? Author { get; set; }
        public string? Genre { get; set; }
        public string? shortDescription { get; set; }
        public string? longDescription { get; set; }
        public string? Price { get; set; }
        public string? Cover { get; set; }
        public Guid UserId { get; set; }
    }
}
