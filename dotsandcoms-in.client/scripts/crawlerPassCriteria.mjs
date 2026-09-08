/**
 * Shared non-JS crawler pass criteria.
 * A page passes only if the first raw HTML response is enough for
 * AI/simple crawlers (no JavaScript execution).
 */
export const HOME_CANONICAL = "https://www.dotsandcoms.in/";

/** Stale shell title still present in older deploys / spa-shell copies */
export const LEGACY_HOME_TITLES = [
  "Website Design & Mobile App Development Company in Vadodara",
];

export function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? decodeEntities(m[1].trim()) : "";
}

export function extractCanonical(html) {
  const m =
    html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
    html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  return m ? m[1].trim() : "";
}

export function extractDescription(html) {
  const m =
    html.match(/<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["']([^"']*)["']/i) ||
    html.match(/<meta\b[^>]*\bcontent=["']([^"']*)["'][^>]*\bname=["']description["']/i);
  return m ? decodeEntities(m[1].trim()) : "";
}

export function hasEmptyRoot(html) {
  return /<div\s+id=["']root["']\s*>\s*<\/div>/i.test(html);
}

export function rootInnerLength(html) {
  const m = html.match(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>\s*(?:<script|<\/body>)/i);
  if (!m) return 0;
  return visibleText(m[1]).length;
}

export function hasSeoContent(html) {
  return /id=["']seo-content["']/i.test(html);
}

export function visibleText(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * @param {object} opts
 * @param {string} opts.path - route path e.g. "/" or "/about-..."
 * @param {string} opts.html
 * @param {string} [opts.expectedTitle]
 * @param {string} [opts.expectedCanonical]
 * @param {number} [opts.minBodyChars=80]
 * @param {boolean} [opts.requireBody=true]
 */
export function evaluatePage({
  path,
  html,
  expectedTitle,
  expectedCanonical,
  minBodyChars = 80,
  requireBody = true,
}) {
  const title = extractTitle(html);
  const canonical = extractCanonical(html);
  const description = extractDescription(html);
  const emptyRoot = hasEmptyRoot(html);
  const bodyLen = Math.max(rootInnerLength(html), hasSeoContent(html) ? 40 : 0);
  const textLen = visibleText(html).length;
  const effectiveBody = Math.max(bodyLen, hasSeoContent(html) ? visibleText(html.match(/id=["']seo-content["'][\s\S]*?<\/main>/i)?.[0] || "").length : 0);
  const isHome = path === "/" || path === "";

  const errors = [];

  if (!title) errors.push("missing <title>");
  if (!canonical) errors.push("missing canonical");
  if (!description) errors.push("missing meta description");

  if (expectedTitle) {
    const needle = expectedTitle.trim().slice(0, 24).toLowerCase();
    if (!title.toLowerCase().includes(needle)) {
      errors.push(`title mismatch: got "${title.slice(0, 80)}"`);
    }
  }

  if (expectedCanonical && canonical !== expectedCanonical) {
    errors.push(`canonical mismatch: got ${canonical}`);
  }

  if (!isHome) {
    if (canonical === HOME_CANONICAL) {
      errors.push("homepage-shell canonical on non-home URL");
    }
    for (const legacy of LEGACY_HOME_TITLES) {
      if (title === legacy) {
        errors.push("legacy homepage title on non-home URL");
        break;
      }
    }
  }

  if (requireBody) {
    if (emptyRoot && !hasSeoContent(html)) {
      errors.push("empty #root with no #seo-content");
    }
    const bodyScore = Math.max(effectiveBody, emptyRoot ? 0 : rootInnerLength(html));
    // Prefer root/seo-content length; fall back to overall visible text minus head noise
    const measured = Math.max(bodyScore, emptyRoot && !hasSeoContent(html) ? 0 : Math.min(textLen, bodyScore || textLen));
    if (isHome) {
      if (emptyRoot && !hasSeoContent(html)) {
        errors.push("homepage has empty body for crawlers");
      } else if (rootInnerLength(html) < minBodyChars && !hasSeoContent(html)) {
        errors.push(`homepage body too thin (${rootInnerLength(html)} chars)`);
      }
    } else if (measured < minBodyChars && rootInnerLength(html) < minBodyChars && !hasSeoContent(html)) {
      errors.push(`body too thin for non-JS crawlers (${Math.max(rootInnerLength(html), measured)} chars)`);
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    title,
    canonical,
    description,
    emptyRoot,
    rootLen: rootInnerLength(html),
    hasSeoContent: hasSeoContent(html),
  };
}
