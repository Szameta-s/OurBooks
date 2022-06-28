using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OurBooks.Data;
using OurBooks.Data.Entities;

namespace OurBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly IOwnerRepository repository;
        private readonly ILogger<OwnerController> logger;

        public OwnerController(IOwnerRepository repository, ILogger<OwnerController> logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Owner>>> Get()
        {
            var result = await repository.GetAllOwners();
            return Ok(result);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Owner>> Get(int id)
        {
            try
            {
                var result = await repository.GetOwnerById(id, false);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex) 
            {
                logger.LogError($"Error on getting owners with books: {ex}");
                return BadRequest(ex.Message);
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id:int}/showBooks")]
        public async Task<ActionResult<Owner>> GetWithBooks(int id, bool showBooks=true)
        {
            try
            {
                var result = await repository.GetOwnerById(id, showBooks);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Error on getting owners with books: {ex}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Owner>> Post([FromBody] Owner model)
        {
            try
            {
                if (ModelState.IsValid)
                { 
                    repository.AddEntity(model);
                    return Created($"/api/owner/{model.Id}", model);
                }

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                logger.LogError($"Error on creating owner: {ex}");
                return BadRequest("Error on creating owner");
            }
        }
    }
}
