import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AppJsxPath = path.join(__dirname, 'src', 'App.jsx');
const SitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

try {
  console.log('Reading App.jsx to extract routes...');
  const content = fs.readFileSync(AppJsxPath, 'utf-8');
  
  // Regex to extract path value from <Route path="..." or path='...'
  const routeRegex = /path=["']([^"']+)["']/g;
  let match;
  const paths = new Set();
  const excludedPaths = new Set([
    '/sitemap',
    '/windows-and-linux-vps-server-hosting-gujarat',
    '/dedicated-server-hosting-cloud-hosting-vadodara',
    '/dedicated-server-hosting-company-vadodara',
    '/fee-seo-performance-web-site-audit',
    '/thank-you',
    '/home-2',
    '/web-hosting-details'
  ]);

  while ((match = routeRegex.exec(content)) !== null) {
    const routePath = match[1];
    // Ignore wildcards, params, or excluded routes
    if (!routePath.includes('*') && !routePath.includes(':') && !excludedPaths.has(routePath)) {
      paths.add(routePath);
    }
  }

  const baseUrl = 'https://www.dotsandcoms.in';
  const currentDate = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add the home page first if it exists, to ensure it's at the top
  if (paths.has('/')) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;
    paths.delete('/');
  }

  // Add the rest of the pages
  for (const p of Array.from(paths).sort()) {
    // Normalize path to make sure it starts with /
    const normalizedPath = p.startsWith('/') ? p : `/${p}`;
    
    // Set priorities/changefreq based on page type
    let priority = '0.8';
    let changefreq = 'weekly';

    if (normalizedPath === '/contact-webdesign-mobileapp-socialmedia-marketing-baroda') {
      priority = '0.9';
    } else if (normalizedPath === '/terms-and-conditions' || normalizedPath === '/thank-you') {
      priority = '0.3';
      changefreq = 'monthly';
    }

    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${normalizedPath}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += '</urlset>\n';

  fs.writeFileSync(SitemapPath, xml, 'utf-8');
  console.log(`Dynamic sitemap successfully generated with ${paths.size + 1} links at ${SitemapPath}`);
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
