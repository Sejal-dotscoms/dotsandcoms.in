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

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});

var app = builder.Build();
 

app.UseCors("ReactPolicy");
app.UseResponseCompression();

// Add security headers to defend against click-jacking, XSS, MIME type sniffing, and enforce HSTS
app.Use(async (context, next) =>
{
    context.Response.Headers["X-Frame-Options"] = "SAMEORIGIN";
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["X-XSS-Protection"] = "1; mode=block";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["Permissions-Policy"] = "geolocation=(), camera=(), microphone=()";
    context.Response.Headers["Content-Security-Policy"] = "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval';";
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
        var path = ctx.Context.Request.Path.Value ?? "";
        
        // Cache static files (JS, CSS, images, fonts, icons) for 1 year
        if (path.StartsWith("/assets/", StringComparison.OrdinalIgnoreCase) ||
            path.EndsWith(".js", StringComparison.OrdinalIgnoreCase) ||
            path.EndsWith(".css", StringComparison.OrdinalIgnoreCase) ||
            path.EndsWith(".webp", StringComparison.OrdinalIgnoreCase) ||
            path.EndsWith(".png", StringComparison.OrdinalIgnoreCase) ||
            path.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) ||
            path.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase) ||
            path.EndsWith(".svg", StringComparison.OrdinalIgnoreCase) ||
            path.EndsWith(".woff2", StringComparison.OrdinalIgnoreCase) ||
            path.EndsWith(".woff", StringComparison.OrdinalIgnoreCase))
        {
            ctx.Context.Response.Headers["Cache-Control"] = "public, max-age=31536000, immutable";
        }
        else if (path.EndsWith(".html", StringComparison.OrdinalIgnoreCase) || path.EndsWith(".xml", StringComparison.OrdinalIgnoreCase) || path.EndsWith(".txt", StringComparison.OrdinalIgnoreCase))
        {
            ctx.Context.Response.Headers["Cache-Control"] = "public, max-age=3600";
        }

        if (path.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
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
    try
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
    }
    catch
    {
        // Gracefully fall through to SPA pipeline if DB or file read fails
    }

    await next();
});

// SPA Fallback with 404 status code check for unrecognized routes
app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value ?? "";
    if (Path.HasExtension(path) || path.StartsWith("/api", StringComparison.OrdinalIgnoreCase) || path.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase))
    {
        await next();
        return;
    }

    var validRoutes = new[]
    {
        "/", "", "/about-web-development-company-baroda",
        "/website-mobile-app-development-company-portfolio-baroda",
        "/services", "/responsive-website-designing-company-vadodara",
        "/android-ios-mobile-app-development-company-baroda",
        "/windows-web-hosting-service-provider-baroda",
        "/windows-and-linux-vps-server-hosting-gujarat",
        "/dedicated-server-hosting-cloud-hosting-vadodara",
        "/dedicated-server-hosting-company-vadodara",
        "/feer-seo-performance-website-audit",
        "/free-seo-performance-website-audit",
        "/fee-seo-performance-website-audit",
        "/fee-seo-performance-web-site-audit",
        "/free-audit",
        "/free-seo-audit",
        "/organic-seo-ppc-digital-marketing-vadodara",
        "/contact-webdesign-mobileapp-socialmedia-marketing-baroda",
        "/webhosting-vps-dedicated-server-support-baroda",
        "/faqs-web-design-hosting-digital-marketing",
        "/web-stories", "/terms-and-conditions", "/sitemap", "/sitemap.html",
        "/accutechlabels-case-study-traditional-to-web-business",
        "/1life-case-study-of-regional-to-national-reach",
        "/hobby-goes-global-case-study", "/order-now", "/web-hosting-details",
        "/thank-you", "/blogs"
    };

    bool isValid = validRoutes.Any(r => path.Equals(r, StringComparison.OrdinalIgnoreCase)) ||
                   path.StartsWith("/blogs/", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/poweradmin", StringComparison.OrdinalIgnoreCase);

    if (!isValid)
    {
        context.Response.StatusCode = 404;
    }

    await next();
});

app.MapFallbackToFile("/index.html");

app.Run();
