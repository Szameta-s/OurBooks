using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OurBooks.Data.Entities;
using OurBooks.Data.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OurBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly IConfiguration config;

        public AccountController(SignInManager<User> signInManager, UserManager<User> userManager,
            IConfiguration config)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.config = config;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser([FromQuery] string? userId)
        {
            if (userId != null)
            {
                var user = await userManager.FindByIdAsync(userId);
                return Ok(user);
            }
            else 
            {
                string accountUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await userManager.FindByIdAsync(accountUserId);
                return Ok(user);
            }

            return BadRequest();

        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserModel model) 
        {
            User user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.UserName,
                UserName = model.UserName
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (result != IdentityResult.Success)
            {
                throw new InvalidOperationException("Cannot create new user");
            }

            return Created("Created a new user", result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAndCreateToken([FromBody] UserModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByNameAsync(model.UserName);

                if (user != null)
                {
                    var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);

                    if (result.Succeeded)
                    {
                        // Create the token
                        var claims = new List<Claim>
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
                        };

                        
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokens:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var _token = new JwtSecurityToken(
                            config["Tokens:Issuer"],
                            config["Tokens:Audience"],
                            claims,
                            expires: DateTime.Now.AddMinutes(1000),
                            signingCredentials: creds);

                        var results = new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(_token),
                            expiration = _token.ValidTo
                        };
                        
                        string authToken = new JwtSecurityTokenHandler().WriteToken(_token).ToString();
                        authToken = $"Bearer {authToken}";

                        Response.Headers.Authorization = authToken;                    
                        Response.Headers.Add("Access-Control-Expose-Headers", "Authorization");
                        Response.Cookies.Append("Authorization", authToken);
                        return Created("", results);
                    }
                }
            }

            return BadRequest();
        }
    }
}
