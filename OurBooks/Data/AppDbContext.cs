using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OurBooks.Data.Entities;

namespace OurBooks.Data
{
    public class AppDbContext: IdentityDbContext<User>
    {
        private readonly IConfiguration config;

        public AppDbContext(IConfiguration config)
        {
            this.config = config;
        }

        public DbSet<Owner> Owners { get; set; }
        public DbSet<Book> Books { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(config["ConnectionStrings:DefaultConnection"]);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Owner>();

            modelBuilder.Entity<Book>();
        }
    }
}
