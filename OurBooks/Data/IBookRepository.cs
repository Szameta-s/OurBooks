using OurBooks.Data.Entities;

namespace OurBooks.Data
{
    public interface IBookRepository
    {
        public Task<IEnumerable<Book>> GetAllBooks();
        public Task<Book> GetBookById(int id);
        public Task<IEnumerable<Book>> GetBooksByTitle(string searchTerm);
        public Task AddEntity(object model);
        public Task DeleteEntity(int id);
        public Task<IEnumerable<Book>> GetAllBooksFromUser(string id);
    }
}