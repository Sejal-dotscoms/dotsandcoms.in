/**
 * Sets all page-specific SEO meta tags (title, description, keywords,
 * canonical, OG, Twitter) and returns a cleanup function to restore defaults.
 *
 * @param {Object} opts
 * @param {string} opts.title         - Page <title>
 * @param {string} opts.description   - meta description
 * @param {string} opts.keywords      - meta keywords
 * @param {string} opts.canonical     - canonical URL
 * @param {string} [opts.ogImage]     - OG image URL (defaults to site og-image)
 */
export function setPageSEO({ title, description, keywords, canonical, ogImage }) {
  const DEFAULT_TITLE = "Website Design & Mobile App Development Company in Vadodara";
  const DEFAULT_IMAGE = "https://www.dotsandcoms.in/og-image.png";

  const imgUrl = ogImage || DEFAULT_IMAGE;

  // ── helpers ──────────────────────────────────────────────────────────────
  const setMeta = (selector, attr, value) => {
    let el = document.querySelector(selector);
    let created = false;

    if (!el) {
      if (selector.startsWith("meta[")) {
        el = document.createElement("meta");
        const match = selector.match(/meta\[(name|property)=['"]([^'"]+)['"]\]/);
        if (match) {
          el.setAttribute(match[1], match[2]);
        }
        document.head.appendChild(el);
        created = true;
      } else if (selector.startsWith("link[")) {
        el = document.createElement("link");
        const match = selector.match(/link\[(rel)=['"]([^'"]+)['"]\]/);
        if (match) {
          el.setAttribute(match[1], match[2]);
        }
        document.head.appendChild(el);
        created = true;
      }
    }

    const original = el && !created ? el.getAttribute(attr) : "";
    if (el) el.setAttribute(attr, value || "");
    return { el, attr, original, created };
  };

  // ── apply ─────────────────────────────────────────────────────────────────
  const origTitle = document.title;
  if (title) document.title = title;

  const slots = [
    setMeta("meta[name='description']",            "content", description),
    setMeta("meta[name='keywords']",               "content", keywords),
    setMeta("link[rel='canonical']",               "href",    canonical),
    // OG
    setMeta("meta[property='og:type']",            "content", "website"),
    setMeta("meta[property='og:title']",           "content", title),
    setMeta("meta[property='og:description']",     "content", description),
    setMeta("meta[property='og:url']",             "content", canonical),
    setMeta("meta[property='og:image']",           "content", imgUrl),
    // Twitter
    setMeta("meta[name='twitter:card']",           "content", "summary_large_image"),
    setMeta("meta[name='twitter:site']",           "content", "@dotsandcoms"),
    setMeta("meta[name='twitter:creator']",        "content", "@dotsandcoms"),
    setMeta("meta[name='twitter:title']",          "content", title),
    setMeta("meta[name='twitter:description']",    "content", description),
    setMeta("meta[name='twitter:url']",            "content", canonical),
    setMeta("meta[name='twitter:image']",          "content", imgUrl),
  ];

  // ── cleanup ───────────────────────────────────────────────────────────────
  return () => {
    document.title = origTitle || DEFAULT_TITLE;
    slots.forEach(({ el, attr, original, created }) => {
      if (el) {
        if (created) {
          el.remove();
        } else {
          el.setAttribute(attr, original);
        }
      }
    });
  };
}
