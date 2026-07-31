using Dotsandcoms_in.Server.Data;
using Dotsandcoms_in.Server.Helpers;
using Dotsandcoms_in.Server.Models;
using Dotsandcoms_in.Server.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
 
builder.Services.Configure<EmailSettings>(
builder.Configuration.GetSection("EmailSettings"));

builder.Services.AddScoped<IEmailService,EmailService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ILegacyTokenService, LegacyTokenService>();
builder.Services.AddScoped<IAdminAuthService, AdminAuthService>();
builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddHttpClient();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString)
);

var app = builder.Build();
 

app.UseCors("ReactPolicy");

// Add security headers to defend against click-jacking, MIME type sniffing, and enforce HSTS
app.Use(async (context, next) =>
{
    context.Response.Headers["X-Frame-Options"] = "SAMEORIGIN";
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload";
    await next();
});

// Redirect legacy .aspx URLs to their modern clean URL equivalents (SEO friendly 301 redirects)
app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value;
    if (!string.IsNullOrEmpty(path) && path.EndsWith(".aspx", StringComparison.OrdinalIgnoreCase))
    {
        var newPath = path.Substring(0, path.Length - 5);
        context.Response.Redirect(newPath + context.Request.QueryString, permanent: true);
        return;
    }
    await next();
});

app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        var path = ctx.Context.Request.Path.Value;
        if (!string.IsNullOrEmpty(path) && path.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
        {
            // Set canonical header for the PDF to prevent duplicate indexing
            var canonicalUrl = $"https://www.dotsandcoms.in{path}";
            ctx.Context.Response.Headers["Link"] = $"<{canonicalUrl}>; rel=\"canonical\"";
        }
    }
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Serve blog detail pages with blog-specific meta tags injected into index.html
// so they appear in View Page Source and are visible to social/SEO crawlers.
app.Use(async (context, next) =>
{
    var path  = context.Request.Path.Value ?? "";
    var match = System.Text.RegularExpressions.Regex.Match(
        path, @"^/blogs/([^/?#]+)$",
        System.Text.RegularExpressions.RegexOptions.IgnoreCase);

    if (context.Request.Method == "GET" && match.Success)
    {
        var slug  = Uri.UnescapeDataString(match.Groups[1].Value);
        var db    = context.RequestServices.GetRequiredService<AppDbContext>();
        var env   = context.RequestServices.GetRequiredService<IWebHostEnvironment>();
        var today = DateTime.UtcNow.Date;

        var blog = await db.Blogs.AsNoTracking().FirstOrDefaultAsync(b =>
            b.BrowserUrl.ToLower() == slug.ToLower() &&
            b.IsVisible &&
            b.BlogDate.Date <= today &&
            (b.ExpiryDate == null || b.ExpiryDate.Value.Date >= today));

        if (blog != null)
        {
            var indexPath = Path.Combine(env.WebRootPath, "index.html");
            if (File.Exists(indexPath))
            {
                var html = await File.ReadAllTextAsync(indexPath);
                html = BlogMetaInjector.Inject(html, blog);
                context.Response.ContentType = "text/html; charset=utf-8";
                await context.Response.WriteAsync(html);
                return;
            }
        }
    }

    await next();
});

app.MapFallbackToFile("/index.html");

app.Run();
