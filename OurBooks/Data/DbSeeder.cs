using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using OurBooks.Data.Entities;

namespace OurBooks.Data
{
    public class DbSeeder
    {
        private readonly AppDbContext context;
        private readonly IWebHostEnvironment env;
        private readonly UserManager<User> userManager;

        public DbSeeder(AppDbContext context, IWebHostEnvironment env, UserManager<User> userManager)
        {
            this.context = context;
            this.env = env;
            this.userManager = userManager;
        }
        public async Task Seed() 
        {
            context.Database.EnsureCreated();

            User user = await userManager.FindByEmailAsync("amras@amras.pl");
            if (user == null)
            {
                user = new User
                {
                    FirstName = "Amras",
                    LastName = "Amrasowski",
                    Email = "amras@amras.pl",
                    UserName = "amras@amras.pl"
                };

                var result = await userManager.CreateAsync(user, "P@ssw0rd");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Cannot create new user in seeder");
                }
            }

            if (context.Owners.Any()) 
            {
                return;
            }

            string filePath = System.IO.File.ReadAllText(@"Data" + Path.DirectorySeparatorChar + "owners.json");
            List<Owner> ownerList = JsonConvert.DeserializeObject<List<Owner>>(filePath);
            await context.Owners.AddRangeAsync(ownerList);
            await context.SaveChangesAsync();
        }
    }
}
