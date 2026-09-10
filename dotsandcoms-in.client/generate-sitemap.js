import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BASE_URL, PUBLIC_ROUTES, getSitemapRoutes } from "./src/seo/publicRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SitemapXmlPath = path.join(__dirname, "public", "sitemap.xml");
const SitemapHtmlPath = path.join(__dirname, "public", "sitemap.html");

async function fetchBlogPaths() {
  const apiBase = process.env.SITEMAP_API_URL?.replace(/\/$/, "");
  if (!apiBase) {
    console.log(
      "SITEMAP_API_URL not set — skipping live blog URLs in sitemap (static routes only)."
    );
    return [];
  }

  const url = `${apiBase}/api/blogs/public`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Blog sitemap fetch failed (${res.status}) from ${url}`);
      return [];
    }
    const json = await res.json();
    const items = json?.data ?? [];
    return items
      .filter((b) => b?.browserUrl)
      .map((b) => ({
        path: `/blogs/${b.browserUrl}`,
        lastmod: b.blogDate
          ? new Date(b.blogDate).toISOString().split("T")[0]
          : null,
        title: b.title || b.browserUrl,
      }));
  } catch (err) {
    console.warn(`Blog sitemap fetch error from ${url}:`, err.message);
    return [];
  }
}

function urlEntry(loc, { lastmod, changefreq = "weekly", priority = "0.8" }) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
}

try {
  const currentDate = new Date().toISOString().split("T")[0];
  const staticRoutes = getSitemapRoutes();
  const blogRoutes = await fetchBlogPaths();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of staticRoutes) {
    const loc = route.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${route.path}`;
    xml += urlEntry(loc, {
      lastmod: currentDate,
      changefreq: route.changefreq || (route.path === "/" ? "daily" : "weekly"),
      priority: route.priority || (route.path === "/" ? "1.0" : "0.8"),
    });
  }

  for (const blog of blogRoutes) {
    xml += urlEntry(`${BASE_URL}${blog.path}`, {
      lastmod: blog.lastmod || currentDate,
      changefreq: "weekly",
      priority: "0.7",
    });
  }

  xml += "</urlset>\n";
  fs.writeFileSync(SitemapXmlPath, xml, "utf-8");
  console.log(
    `XML sitemap written (${staticRoutes.length} static + ${blogRoutes.length} blogs) → ${SitemapXmlPath}`
  );

  const allForHtml = [
    ...staticRoutes.map((r) => ({
      path: r.path,
      title:
        r.path === "/"
          ? "Home Page"
          : r.title.split("|")[0].split("–")[0].trim(),
    })),
    ...blogRoutes.map((b) => ({ path: b.path, title: b.title })),
  ];

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sitemap - Dots and Coms Baroda</title>
  <meta name="description" content="Explore the sitemap directory of Dots and Coms Vadodara. Quick links to website design, app development, blogs, web hosting, and digital marketing services.">
  <link rel="canonical" href="${BASE_URL}/sitemap.html" />
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 40px 20px; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    h1 { color: #0f172a; font-size: 28px; margin-bottom: 8px; border-bottom: 3px solid #dc2626; padding-bottom: 12px; display: inline-block; }
    p { color: #64748b; font-size: 14px; margin-bottom: 30px; }
    ul { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
    li a { display: block; padding: 12px 16px; background: #f1f5f9; color: #0f172a; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; transition: all 0.2s ease; border-left: 4px solid #dc2626; }
    li a:hover { background: #dc2626; color: #ffffff; transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Sitemap Directory</h1>
    <p>Complete web page directory of Dots and Coms Vadodara — Web Design, App Development, Blogs, Hosting & Digital Marketing Agency.</p>
    <ul>
`;

  for (const item of allForHtml) {
    const fullUrl = item.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${item.path}`;
    html += `      <li><a href="${fullUrl}">${item.title}</a></li>\n`;
  }

  html += `    </ul>
  </div>
</body>
</html>\n`;

  fs.writeFileSync(SitemapHtmlPath, html, "utf-8");
  console.log(
    `HTML sitemap written (${allForHtml.length} links) → ${SitemapHtmlPath}`
  );

  const seoRoutesPath = path.join(__dirname, "public", "seo-routes.json");
  const seoRoutes = PUBLIC_ROUTES.map((r) => ({
    path: r.path,
    title: r.title,
    description: r.description,
    keywords: r.keywords,
    canonical: r.canonical,
  }));
  fs.writeFileSync(seoRoutesPath, JSON.stringify(seoRoutes, null, 2), "utf-8");
  console.log(`SEO routes written (${seoRoutes.length}) → ${seoRoutesPath}`);
} catch (error) {
  console.error("Error generating sitemap:", error);
  process.exit(1);
}
