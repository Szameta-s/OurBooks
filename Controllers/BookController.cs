using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OurBooks.Data;
using OurBooks.Data.Entities;
using OurBooks.Data.Models;
using System.Security.Claims;

namespace OurBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository repository;
        private readonly ILogger<BookController> logger;

        public BookController(IBookRepository repository, ILogger<BookController> logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> Get([FromQuery] string? searchTerm)
        {
            if (searchTerm != null)
            {
                var resultSearchTerm = await repository.GetBooksByTitle(searchTerm);
                return Ok(resultSearchTerm);
            }
            var result = await repository.GetAllBooks();

            return Ok(result);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("userbooks")]
        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooksFromUser() 
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await repository.GetAllBooksFromUser(userId);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Book>> GetById(int id) 
        {
            var result = await repository.GetBookById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<ActionResult<Book>> Post([FromBody] Book model)
        {
            try
            {
                /*Book book = new Book
                {
                    Title = model.Title,
                    Author = model.Author,
                    Genre = model.Genre,
                    shortDescription = model.shortDescription,
                    longDescription = model.longDescription,
                    Price = model.Price,
                    Cover = model.Cover,
                    UserEmail = model.UserEmail
                };*/

                var identity = HttpContext.User.Identity as ClaimsIdentity;
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                
                if (identity != null)
                {
                    model.UserId = userId;
                }

                if (ModelState.IsValid)
                {
                    await repository.AddEntity(model);
                    return Created($"/api/book/{model.Id}", model);
                }

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                logger.LogError($"Error on creating book: {ex}");
                return BadRequest("Error on creating book");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Book>> Delete(int id) 
        {
            await repository.DeleteEntity(id);
            return Accepted();
        }
    }
}
