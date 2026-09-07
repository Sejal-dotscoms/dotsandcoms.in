/**
 * Rewrites SEO tags in an HTML string so View Source / crawlers see the
 * route's title, description, keywords, and canonical — not homepage defaults.
 * @param {string} html
 * @param {{ title?: string, description?: string, keywords?: string, canonical?: string }} route
 */
export function injectHtmlMeta(html, route) {
  if (!html || !route) return html;

  const titleText = esc(route.title || "");
  const title = escAttr(route.title || "");
  const description = escAttr(route.description || "");
  const keywords = escAttr(route.keywords || "");
  const url = escAttr(route.canonical || "");

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

  if (description) {
    html = replaceMeta(html, "name", "description", description);
  }
  if (keywords) {
    html = replaceMeta(html, "name", "keywords", keywords);
  }

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
