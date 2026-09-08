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
builder.Services.AddSingleton<SeoRouteCatalog>();
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

// Marketing pages: rewrite homepage-shell meta to the requested route before static files
app.Use(async (context, next) =>
{
    var catalog = context.RequestServices.GetRequiredService<SeoRouteCatalog>();
    if (await TryWriteSeoHtmlAsync(context, catalog))
        return;
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

static string ResolveSpaShellPath(IWebHostEnvironment env)
{
    var shell = Path.Combine(env.WebRootPath ?? "", "spa-shell.html");
    if (File.Exists(shell)) return shell;
    return Path.Combine(env.WebRootPath ?? "", "index.html");
}

// Blog detail: unique meta + crawler-visible article body from spa-shell.html.
// Unknown slugs return 404 — never the homepage shell (critical for AI/simple crawlers).
app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value ?? "";
    var match = System.Text.RegularExpressions.Regex.Match(
        path, @"^/blogs/([^/?#]+)/?$",
        System.Text.RegularExpressions.RegexOptions.IgnoreCase);

    if ((!HttpMethods.IsGet(context.Request.Method) && !HttpMethods.IsHead(context.Request.Method)) || !match.Success)
    {
        await next();
        return;
    }

    var slug = Uri.UnescapeDataString(match.Groups[1].Value);
    var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();

    try
    {
        var db = context.RequestServices.GetRequiredService<AppDbContext>();
        var today = DateTime.UtcNow.Date;

        var blog = await db.Blogs.AsNoTracking().FirstOrDefaultAsync(b =>
            b.BrowserUrl.ToLower() == slug.ToLower() &&
            b.IsVisible &&
            b.BlogDate.Date <= today &&
            (b.ExpiryDate == null || b.ExpiryDate.Value.Date >= today));

        if (blog != null)
        {
            var shellPath = ResolveSpaShellPath(env);
            if (File.Exists(shellPath))
            {
                var html = await File.ReadAllTextAsync(shellPath);
                html = BlogMetaInjector.Inject(html, blog);
                context.Response.ContentType = "text/html; charset=utf-8";
                context.Response.Headers["Cache-Control"] = "public, max-age=3600";
                await context.Response.WriteAsync(html);
                return;
            }
        }
    }
    catch
    {
        // Fall through to 404 below — do not serve homepage shell for /blogs/{slug}
    }

    await WriteCrawlerNotFoundAsync(context, env, $"Blog not found: {slug}");
});

// Blog listing: crawler-visible post titles/links for GET /blogs
app.Use(async (context, next) =>
{
    try
    {
        var path = context.Request.Path.Value ?? "";
        var isBlogsIndex = path.Equals("/blogs", StringComparison.OrdinalIgnoreCase)
                           || path.Equals("/blogs/", StringComparison.OrdinalIgnoreCase);

        if (context.Request.Method == "GET" && isBlogsIndex)
        {
            var db  = context.RequestServices.GetRequiredService<AppDbContext>();
            var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();
            var today = DateTime.UtcNow.Date;

            var blogs = await db.Blogs.AsNoTracking()
                .Where(b =>
                    b.IsVisible &&
                    b.BlogDate.Date <= today &&
                    (b.ExpiryDate == null || b.ExpiryDate.Value.Date >= today))
                .OrderByDescending(b => b.BlogDate)
                .Select(b => new Blog
                {
                    Title = b.Title,
                    BrowserUrl = b.BrowserUrl,
                    ShortDescription = b.ShortDescription
                })
                .ToListAsync();

            var shellPath = ResolveSpaShellPath(env);
            if (File.Exists(shellPath))
            {
                var html = await File.ReadAllTextAsync(shellPath);
                html = BlogMetaInjector.InjectBlogList(html, blogs);
                context.Response.ContentType = "text/html; charset=utf-8";
                context.Response.Headers["Cache-Control"] = "public, max-age=3600";
                await context.Response.WriteAsync(html);
                return;
            }
        }
    }
    catch
    {
        // Fall through
    }

    await next();
});

// Serve prerendered marketing HTML at wwwroot/{path}/index.html (no trailing-slash required)
app.Use(async (context, next) =>
{
    if (context.Request.Method != "GET" && context.Request.Method != "HEAD")
    {
        await next();
        return;
    }

    var path = context.Request.Path.Value ?? "";
    if (string.IsNullOrEmpty(path) || path == "/" ||
        Path.HasExtension(path) ||
        path.StartsWith("/api", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/uploads", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/poweradmin", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/blogs", StringComparison.OrdinalIgnoreCase))
    {
        await next();
        return;
    }

    var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();
    var webRoot = env.WebRootPath;
    if (string.IsNullOrEmpty(webRoot))
    {
        await next();
        return;
    }

    var relative = path.Trim('/');
    var candidate = Path.GetFullPath(Path.Combine(webRoot, relative.Replace('/', Path.DirectorySeparatorChar), "index.html"));
    var rootFull = Path.GetFullPath(webRoot);
    if (!candidate.StartsWith(rootFull, StringComparison.OrdinalIgnoreCase) || !File.Exists(candidate))
    {
        await next();
        return;
    }

    var html = await File.ReadAllTextAsync(candidate);
    var catalog = context.RequestServices.GetRequiredService<SeoRouteCatalog>();
    var norm = SeoRouteCatalog.Normalize(path);
    if (catalog.TryGet(norm, out var seo))
        html = PageMetaInjector.Inject(html, seo, ensureCrawlerBody: true);

    context.Response.ContentType = "text/html; charset=utf-8";
    context.Response.Headers["Cache-Control"] = "public, max-age=3600";
    await context.Response.WriteAsync(html);
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
                   path.StartsWith("/poweradmin", StringComparison.OrdinalIgnoreCase);
    // /blogs/{slug} is handled earlier (inject or 404) — never treat unknown blog URLs as valid SPA fallback

    if (!isValid)
    {
        context.Response.StatusCode = 404;
    }

    await next();
});

// Prefer spa-shell.html (empty #root) so fallback/admin never get prerendered homepage HTML
app.MapFallback(async context =>
{
    var path = SeoRouteCatalog.Normalize(context.Request.Path.Value ?? "");
    var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();

    // Belts-and-braces: blog detail URLs must never reach homepage-shell fallback
    if (path.StartsWith("/blogs/", StringComparison.OrdinalIgnoreCase))
    {
        await WriteCrawlerNotFoundAsync(context, env, "Blog not found");
        return;
    }

    // Homepage: always prefer prerendered index.html (with body), never empty spa-shell alone
    if (path == "/" || path == "")
    {
        if (await TryWriteHomeHtmlAsync(context))
            return;
    }

    var shellPath = ResolveSpaShellPath(env);
    if (!File.Exists(shellPath))
    {
        context.Response.StatusCode = 404;
        return;
    }

    var html = await File.ReadAllTextAsync(shellPath);
    if (path != "/")
    {
        var catalog = context.RequestServices.GetRequiredService<SeoRouteCatalog>();
        if (catalog.TryGet(path, out var seo))
            html = PageMetaInjector.Inject(html, seo, ensureCrawlerBody: true);
    }

    // Preserve 404 status set by the validity middleware for unknown routes
    context.Response.ContentType = "text/html; charset=utf-8";
    context.Response.Headers["Cache-Control"] = "public, max-age=3600";
    await context.Response.WriteAsync(html);
});

static async Task WriteCrawlerNotFoundAsync(HttpContext context, IWebHostEnvironment env, string message)
{
    context.Response.StatusCode = 404;
    context.Response.ContentType = "text/html; charset=utf-8";
    context.Response.Headers["Cache-Control"] = "no-store";

    var shellPath = ResolveSpaShellPath(env);
    if (File.Exists(shellPath))
    {
        var html = await File.ReadAllTextAsync(shellPath);
        var notFound = new SeoRoute
        {
            Path = context.Request.Path.Value ?? "/404",
            Title = "Page Not Found | Dots & Coms",
            Description = string.IsNullOrWhiteSpace(message)
                ? "The page you requested could not be found on Dots & Coms."
                : message,
            Keywords = "404, page not found, Dots and Coms",
            Canonical = "https://www.dotsandcoms.in" + (context.Request.Path.Value ?? "/404")
        };
        html = PageMetaInjector.Inject(html, notFound, ensureCrawlerBody: true);
        await context.Response.WriteAsync(html);
        return;
    }

    await context.Response.WriteAsync(
        "<!DOCTYPE html><html><head><title>Page Not Found | Dots &amp; Coms</title></head>" +
        "<body><h1>Page Not Found</h1><p>The page you requested could not be found.</p></body></html>");
}

static async Task<bool> TryWriteHomeHtmlAsync(HttpContext context)
{
    if (!HttpMethods.IsGet(context.Request.Method) && !HttpMethods.IsHead(context.Request.Method))
        return false;

    var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();
    var webRoot = env.WebRootPath;
    if (string.IsNullOrEmpty(webRoot)) return false;

    var indexPath = Path.Combine(webRoot, "index.html");
    if (!File.Exists(indexPath)) return false;

    var html = await File.ReadAllTextAsync(indexPath);
    var catalog = context.RequestServices.GetRequiredService<SeoRouteCatalog>();
    if (catalog.TryGet("/", out var seo))
        html = PageMetaInjector.Inject(html, seo, ensureCrawlerBody: true);

    context.Response.ContentType = "text/html; charset=utf-8";
    context.Response.Headers["Cache-Control"] = "public, max-age=3600";
    await context.Response.WriteAsync(html);
    return true;
}

static async Task<bool> TryWriteSeoHtmlAsync(HttpContext context, SeoRouteCatalog catalog)
{
    if (!HttpMethods.IsGet(context.Request.Method) && !HttpMethods.IsHead(context.Request.Method))
        return false;

    var path = SeoRouteCatalog.Normalize(context.Request.Path.Value ?? "");

    // Homepage: serve prerendered index.html with catalog meta (+ body fallback if empty)
    if (path == "/")
        return await TryWriteHomeHtmlAsync(context);

    if (Path.HasExtension(path) ||
        path.StartsWith("/api", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/uploads", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/poweradmin", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/blogs", StringComparison.OrdinalIgnoreCase))
        return false;

    if (!catalog.TryGet(path, out var seo))
        return false;

    var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();
    var html = await ReadMarketingHtmlAsync(env, path);
    if (html == null)
        return false;

    html = PageMetaInjector.Inject(html, seo, ensureCrawlerBody: true);
    context.Response.ContentType = "text/html; charset=utf-8";
    context.Response.Headers["Cache-Control"] = "public, max-age=3600";
    await context.Response.WriteAsync(html);
    return true;
}

static async Task<string?> ReadMarketingHtmlAsync(IWebHostEnvironment env, string path)
{
    var webRoot = env.WebRootPath;
    if (string.IsNullOrEmpty(webRoot)) return null;

    var relative = path.Trim('/');
    var candidate = Path.GetFullPath(Path.Combine(webRoot, relative.Replace('/', Path.DirectorySeparatorChar), "index.html"));
    var rootFull = Path.GetFullPath(webRoot);
    if (candidate.StartsWith(rootFull, StringComparison.OrdinalIgnoreCase) && File.Exists(candidate))
        return await File.ReadAllTextAsync(candidate);

    var shellPath = Path.Combine(webRoot, "spa-shell.html");
    if (File.Exists(shellPath))
        return await File.ReadAllTextAsync(shellPath);

    // No dedicated shell — do not use prerendered homepage index.html (wrong body).
    // Fall through so SpaProxy/Vite can serve in development.
    return null;
}

app.Run();
