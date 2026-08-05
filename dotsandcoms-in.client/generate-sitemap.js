import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AppJsxPath = path.join(__dirname, 'src', 'App.jsx');
const SitemapXmlPath = path.join(__dirname, 'public', 'sitemap.xml');
const SitemapHtmlPath = path.join(__dirname, 'public', 'sitemap.html');

try {
  console.log('Reading App.jsx to extract routes...');
  const content = fs.readFileSync(AppJsxPath, 'utf-8');
  
  // Regex to extract path value from <Route path="..." or path='...'
  const routeRegex = /path=["']([^"']+)["']/g;
  let match;
  const paths = new Set();
  const excludedPaths = new Set([
    '/windows-and-linux-vps-server-hosting-gujarat',
    '/dedicated-server-hosting-cloud-hosting-vadodara',
    '/dedicated-server-hosting-company-vadodara',
    '/fee-seo-performance-web-site-audit',
    '/thank-you',
    '/home-2',
    '/web-hosting-details',
    '/poweradmin',
    '/blogs/new',
    '/blogs/edit',
    '/change-password',
    '/dashboard',
    '/forgot-password'
  ]);

  while ((match = routeRegex.exec(content)) !== null) {
    const routePath = match[1];
    const normalized = routePath.startsWith('/') ? routePath : `/${routePath}`;
    // Ignore wildcards, params, or excluded routes
    if (
      !routePath.includes('*') && 
      !routePath.includes(':') && 
      !excludedPaths.has(normalized) &&
      !normalized.startsWith('/poweradmin') &&
      !normalized.startsWith('/blogs/new') &&
      !normalized.startsWith('/blogs/edit')
    ) {
      paths.add(normalized);
    }
  }

  // Ensure /sitemap, /sitemap.html and /blogs are present
  paths.add('/sitemap');
  paths.add('/blogs');

  const baseUrl = 'https://www.dotsandcoms.in';
  const currentDate = new Date().toISOString().split('T')[0];

  const sortedPaths = Array.from(paths).sort();

  // 1. GENERATE XML SITEMAP
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add the home page first if it exists
  if (paths.has('/')) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const p of sortedPaths) {
    if (p === '/') continue;
    
    let priority = '0.8';
    let changefreq = 'weekly';

    if (p === '/contact-webdesign-mobileapp-socialmedia-marketing-baroda') {
      priority = '0.9';
    } else if (p === '/terms-and-conditions' || p === '/thank-you') {
      priority = '0.3';
      changefreq = 'monthly';
    }

    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${p}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += '</urlset>\n';

  fs.writeFileSync(SitemapXmlPath, xml, 'utf-8');
  console.log(`Dynamic XML sitemap successfully generated with ${sortedPaths.length} links at ${SitemapXmlPath}`);

  // 2. GENERATE HTML SITEMAP
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sitemap - Dots & Coms Baroda</title>
  <meta name="description" content="Explore the sitemap directory of Dots & Coms Vadodara. Quick links to website design, app development, blogs, web hosting, and digital marketing services.">
  <link rel="canonical" href="${baseUrl}/sitemap.html" />
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
    <p>Complete web page directory of Dots & Coms Vadodara — Web Design, App Development, Blogs, Hosting & Digital Marketing Agency.</p>
    <ul>\n`;

  for (const p of sortedPaths) {
    const fullUrl = p === '/' ? `${baseUrl}/` : `${baseUrl}${p}`;
    const displayTitle = p === '/' ? 'Home Page' : p.replace(/^\//, '').replace(/-/g, ' ').toUpperCase();
    html += `      <li><a href="${fullUrl}">${displayTitle}</a></li>\n`;
  }

  html += `    </ul>
  </div>
</body>
</html>\n`;

  fs.writeFileSync(SitemapHtmlPath, html, 'utf-8');
  console.log(`Dynamic HTML sitemap successfully generated with ${sortedPaths.length} links at ${SitemapHtmlPath}`);

} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
