using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OurBooks.Data;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using OurBooks.Data.Entities;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddIdentity<User, IdentityRole>(cfg => {
    cfg.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<AppDbContext>();


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});

builder.Services.AddAuthentication(opt =>
    {
        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddJwtBearer(cfg => {
        cfg.SaveToken = true;
        cfg.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = configuration["Tokens:Issuer"],
            ValidAudience = configuration["Tokens:Audience"],
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Tokens:Key"]))
        };
    });

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
});


builder.Services.AddScoped<DbSeeder>();
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddScoped<IOwnerRepository, OwnerRepository>();
builder.Services.AddScoped<IBookRepository, BookRepository>();


builder.Services.AddControllers().AddNewtonsoftJson(cfg =>
                cfg.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);


var app = builder.Build();


if (args.Length > 0 && args[0].ToLower() == "/seed")
    SeedData(app);


void SeedData(WebApplication app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    using (var scope = scopedFactory?.CreateScope())
    {
        var service = scope?.ServiceProvider.GetService<DbSeeder>();
        service?.Seed().Wait();
    }
}

// Configure the HTTP request pipeline.

app.UseCors(MyAllowSpecificOrigins);

app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
