using Microsoft.EntityFrameworkCore;
using OurBooks.Data.Entities;

namespace OurBooks.Data
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext context;

        public BookRepository(AppDbContext context)
        {
            this.context = context;
        }     

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            var query = await context.Books
                .OrderBy(b => b.Title)
                .ToListAsync();

            return query;
        }

        public async Task<IEnumerable<Book>> GetAllBooksFromUser(string id)
        {
            var query = await context.Books
                .Where(b => b.UserId == id)
                .OrderBy(b => b.Title)
                .ToListAsync();

            return query;
        }

        public async Task<Book> GetBookById(int id)
        {
            var query = await context.Books
                .Where(b => b.Id == id)
                .SingleOrDefaultAsync();

            return query;
        }

        public async Task<IEnumerable<Book>> GetBooksByTitle(string searchTerm)
        {
            var query = await context.Books.
                Where(b => b.Title.ToLower().Contains(searchTerm.ToLower()))
                .ToListAsync();

            return query;
        }

        public async Task AddEntity(object model)
        {
            await context.AddAsync(model);
            await context.SaveChangesAsync();
        }

        public async Task DeleteEntity(int id)
        {
            Book book = new Book() { Id = id };
            context.Books.Attach(book);
            context.Books.Remove(book);
            await context.SaveChangesAsync();
        }
    }
}
