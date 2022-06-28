using OurBooks.Data.Entities;

namespace OurBooks.Data
{
    public interface IOwnerRepository
    {
        public Task<IEnumerable<Owner>> GetAllOwners();
        public Task<Owner> GetOwnerById(int id, bool showBooks);
        public void AddEntity(object model);
    }
}