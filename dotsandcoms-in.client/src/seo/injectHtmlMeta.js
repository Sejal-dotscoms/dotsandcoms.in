/**
 * Rewrites SEO tags in an HTML string so View Source / crawlers see the
 * route's title, description, keywords, canonical, and crawler body — not homepage defaults.
 * Also enforces the hide rule and clip style to eliminate visible crawler text / image alt flashes.
 *
 * @param {string} html
 * @param {{ title?: string, description?: string, keywords?: string, canonical?: string, heading?: string, summary?: string }} route
 */
export function injectHtmlMeta(html, route) {
  if (!html || !route) return html;

  const titleText = esc(route.title || "");
  const title = escAttr(route.title || "");
  const description = escAttr(route.description || "");
  const keywords = escAttr(route.keywords || "");
  const url = escAttr(route.canonical || "");

  // 1. Ensure <style id="seo-content-hide"> is in <head>
  const hideStyle =
    '<style id="seo-content-hide">#seo-content{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}img{color:transparent;font-size:0}</style>';
  if (!html.includes('id="seo-content-hide"')) {
    if (/<head\b[^>]*>/i.test(html)) {
      html = html.replace(/<head\b[^>]*>/i, `$&    ${hideStyle}\n`);
    } else {
      html = `${hideStyle}\n${html}`;
    }
  }

  // 2. Title & canonical
  if (titleText) {
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${titleText}</title>`);
  }

  if (url) {
    html = replaceTag(
      html,
      /<link\b[^>]*\brel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${url}" />`
    );
  }

  // 3. Meta description & keywords
  if (description) {
    html = replaceMeta(html, "name", "description", description);
  }
  if (keywords) {
    html = replaceMeta(html, "name", "keywords", keywords);
  }

  // 4. OpenGraph & Twitter
  if (title) {
    html = replaceMeta(html, "property", "og:title", title);
    html = replaceMeta(html, "name", "twitter:title", title);
    html = replaceMeta(html, "property", "twitter:title", title);
    html = replaceMeta(html, "property", "og:image:alt", title);
    html = replaceMeta(html, "name", "twitter:image:alt", title);
  }

  if (description) {
    html = replaceMeta(html, "property", "og:description", description);
    html = replaceMeta(html, "name", "twitter:description", description);
    html = replaceMeta(html, "property", "twitter:description", description);
  }

  if (url) {
    html = replaceMeta(html, "property", "og:url", url);
    html = replaceMeta(html, "name", "twitter:url", url);
  }

  // 5. Crawler summary element (<main id="seo-content" aria-hidden="true" style="...">)
  const heading = esc(route.heading || route.title || "");
  const summary = esc(route.summary || route.description || "");
  const crawlerBlock = `<main id="seo-content" aria-hidden="true" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0"><h1>${heading}</h1><p>${summary}</p></main>`;

  if (/<main\s+id=["']seo-content["']/i.test(html)) {
    html = html.replace(/<main\s+id=["']seo-content["'][^>]*>[\s\S]*?<\/main>/i, crawlerBlock);
  } else if (/<div\s+id=["']root["']\s*>\s*<\/div>/i.test(html)) {
    html = html.replace(
      /<div\s+id=["']root["']\s*>\s*<\/div>/i,
      `<div id="root">${crawlerBlock}</div>`
    );
  } else if (/<div\s+id=["']root["'][^>]*>/i.test(html)) {
    html = html.replace(/(<div\s+id=["']root["'][^>]*>)/i, `$1${crawlerBlock}`);
  }

  return html;
}

function replaceMeta(html, attr, key, content) {
  const re = new RegExp(
    `<meta\\b[^>]*\\b${attr}=["']${escapeRegExp(key)}["'][^>]*>`,
    "i"
  );
  return replaceTag(html, re, `<meta ${attr}="${key}" content="${content}" />`);
}

function replaceTag(html, re, replacement) {
  return re.test(html) ? html.replace(re, replacement) : html;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escAttr(s) {
  return esc(s).replace(/"/g, "&quot;");
}
