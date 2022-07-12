namespace OurBooks.Data.Entities
{
    public class Owner
    {
        public int Id { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? phoneNumber { get; set; }
        public string? email { get; set; }
        /*public ICollection<Book>? Books { get; set; }*/
    }
}
