using Microsoft.EntityFrameworkCore;
using OurBooks.Data.Entities;

namespace OurBooks.Data
{
    public class OwnerRepository : IOwnerRepository
    {
        private readonly AppDbContext context;

        public OwnerRepository(AppDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Owner>> GetAllOwners()
        {
            var query = await context.Owners
                .OrderBy(o => o.lastName)
                .ToListAsync();

            return query;
        }

        public async Task<Owner> GetOwnerById(int id, bool showBooks=false)
        {
            /*if (showBooks)
            {
               var queryWithBooks = await context.Owners
                    .Where(o => o.Id == id)
                    .Include(o => o.Books)
                    .Where(o => o.Books.FirstOrDefault().OwnerId == id)
                    .FirstOrDefaultAsync();

                if (queryWithBooks != null)
                    return queryWithBooks;
            }*/

            var query = await context.Owners
                .Where(o => o.Id == id)
                .FirstOrDefaultAsync();

            return query;
        }

        public async void AddEntity(object model)
        {
            await context.AddAsync(model);
            await context.SaveChangesAsync();
        }
    }
}
