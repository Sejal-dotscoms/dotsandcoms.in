/**
 * Live dead-link report (no fixes).
 *
 * Discovers URLs from:
 *   - PUBLIC_ROUTES catalog
 *   - live sitemap.xml
 *   - public/*.html|xml|txt (attribute href/src only)
 *   - crawled same-site HTML pages (attribute href/src only)
 *
 * Does NOT regex-scrape React/JS source (avoids template-literal false positives).
 *
 * Usage:
 *   node scripts/dead-link-report.mjs
 *   node scripts/dead-link-report.mjs https://www.dotsandcoms.in
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PUBLIC_ROUTES, BASE_URL } from "../src/seo/publicRoutes.js";

const origin = (process.argv[2] || BASE_URL).replace(/\/$/, "");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.resolve(__dirname, "..");

const SKIP_SCHEMES = [
  /^mailto:/i,
  /^tel:/i,
  /^javascript:/i,
  /^#/,
  /^data:/i,
];

/** Reject JS/template fragments and demo placeholders mistaken for URLs. */
const INVALID_URL_MARKERS = [
  /`/,
  /\$\{/,
  /[{}]/,
  /jsx\(/i,
  /example\.com/i,
  /\/example-slug(?:\/|$)/i,
  /\/my-url(?:\/|$)/i,
];

const CONCURRENCY = 8;
const TIMEOUT_MS = 20000;

/** @type {Map<string, Set<string>>} */
const foundBy = new Map();

function looksLikeRealUrl(raw) {
  if (!raw || typeof raw !== "string") return false;
  const trimmed = raw.trim();
  if (!trimmed || SKIP_SCHEMES.some((re) => re.test(trimmed))) return false;
  if (INVALID_URL_MARKERS.some((re) => re.test(trimmed))) return false;
  // Route params / unresolved placeholders
  if (/:[a-zA-Z][a-zA-Z0-9_]*/.test(trimmed)) return false;
  return true;
}

/** Strip markdown/prose wrappers and decode common HTML entities. */
function cleanExtractedHref(href) {
  let h = href.trim();
  h = h.replace(/^[<(]+/, "").replace(/[)\]>.,;:]+$/g, "");
  h = h.replace(/&amp;/gi, "&");
  return h;
}

function addUrl(raw, source) {
  if (!raw || typeof raw !== "string") return;
  const cleaned = cleanExtractedHref(raw);
  if (!looksLikeRealUrl(cleaned)) return;

  let absolute;
  try {
    absolute = new URL(cleaned, origin).href;
  } catch {
    return;
  }

  const u = new URL(absolute);
  u.hash = "";
  // Re-check decoded path/search for junk that survived encoding
  if (INVALID_URL_MARKERS.some((re) => re.test(u.pathname + u.search))) return;
  if (/:[a-zA-Z][a-zA-Z0-9_]*/.test(u.pathname)) return;

  const key = u.href;
  if (!foundBy.has(key)) foundBy.set(key, new Set());
  foundBy.get(key).add(source);
}

function walkFiles(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      if (["node_modules", "dist", ".git"].includes(name.name)) continue;
      walkFiles(full, exts, out);
    } else if (exts.some((e) => name.name.endsWith(e))) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Extract only real HTML/XML link attributes — not bare https:// greps in JS.
 */
function extractHtmlAttrs(text, source) {
  const patterns = [
    /\b(?:href|src|action)\s*=\s*["']([^"']+)["']/gi,
    /\bcontent\s*=\s*["'](https?:\/\/[^"']+)["']/gi, // og:url, canonical-style meta
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      let href = m[1].trim();
      // srcset: "url 1x, url2 2x" — take first token of each candidate
      if (href.includes(",")) {
        for (const part of href.split(",")) {
          const token = part.trim().split(/\s+/)[0];
          if (token) addUrl(token, source);
        }
        continue;
      }
      addUrl(href, source);
    }
  }

  // sitemap / plain <loc>
  for (const m of text.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)) {
    addUrl(m[1], source);
  }
}

function scanPublicDocs() {
  const files = walkFiles(path.join(clientRoot, "public"), [".txt", ".html", ".xml"]);
  for (const file of files) {
    const rel = path.relative(clientRoot, file).replace(/\\/g, "/");
    const text = fs.readFileSync(file, "utf8");
    extractHtmlAttrs(text, `public:${rel}`);
    // llm.txt style plain URLs (one per line / whitespace-separated)
    if (file.endsWith(".txt")) {
      for (const m of text.matchAll(/https?:\/\/[^\s"'<>]+/gi)) {
        addUrl(m[0], `public:${rel}`);
      }
    }
  }
}

async function fetchRes(url, method = "GET") {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: ctrl.signal,
      headers: {
        "User-Agent": "DotsAndComsDeadLinkReport/1.0",
        Accept: "*/*",
      },
    });
    const text = method === "GET" ? await res.text() : "";
    return { status: res.status, ok: res.ok, finalUrl: res.url, text, error: null };
  } catch (err) {
    return { status: 0, ok: false, finalUrl: url, text: "", error: err.message };
  } finally {
    clearTimeout(t);
  }
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

function isSameSite(url) {
  try {
    const u = new URL(url);
    const o = new URL(origin);
    return u.hostname === o.hostname || u.hostname.endsWith(".dotsandcoms.in");
  } catch {
    return false;
  }
}

function classify(status, error) {
  if (error) return "error";
  if (status === 0) return "error";
  if (status >= 200 && status < 300) return "ok";
  if (status >= 300 && status < 400) return "redirect";
  if (status === 404 || status === 410) return "dead";
  if (status === 401 || status === 403) return "blocked";
  if (status >= 500) return "server";
  return "other";
}

function isHtmlish(text) {
  if (!text) return false;
  const head = text.slice(0, 500);
  return (
    /<!DOCTYPE/i.test(head) ||
    /<html[\s>]/i.test(head) ||
    /text\/html|application\/xhtml/i.test(head)
  );
}

console.log(`Dead-link report against ${origin}`);
console.log("Scanning public docs (HTML/XML/TXT attrs only; no JS source)…");
scanPublicDocs();

for (const route of PUBLIC_ROUTES) {
  addUrl(route.path === "/" ? `${origin}/` : `${origin}${route.path}`, "catalog:publicRoutes");
}

console.log(`Fetching sitemap…`);
const sitemap = await fetchRes(`${origin}/sitemap.xml`);
if (sitemap.ok) {
  const locs = [...sitemap.text.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
  for (const loc of locs) addUrl(loc, "sitemap.xml");
  console.log(`  sitemap urls: ${locs.length}`);
} else {
  console.log(`  sitemap fetch failed: ${sitemap.status || sitemap.error}`);
}

const seedPages = [...foundBy.keys()].filter((u) => {
  try {
    const p = new URL(u);
    return (
      p.origin === new URL(origin).origin &&
      !/\.(xml|txt|json|pdf|png|jpe?g|webp|svg|ico|css|js|map|woff2?|ttf|eot)$/i.test(p.pathname)
    );
  } catch {
    return false;
  }
});

console.log(`Crawling ${seedPages.length} same-site pages for href/src…`);
await mapPool(seedPages, CONCURRENCY, async (url) => {
  const res = await fetchRes(url, "GET");
  if (res.ok && isHtmlish(res.text)) {
    extractHtmlAttrs(res.text, `page:${new URL(url).pathname || "/"}`);
  }
  return { url, ...res };
});

const allUrls = [...foundBy.keys()].sort();
console.log(`Checking ${allUrls.length} unique URLs…`);

const checks = await mapPool(allUrls, CONCURRENCY, async (url) => {
  let res = await fetchRes(url, "HEAD");
  if (res.status === 405 || res.status === 501 || res.status === 403 || res.error) {
    res = await fetchRes(url, "GET");
  } else if (res.status === 0) {
    res = await fetchRes(url, "GET");
  }
  if ([403, 404, 405].includes(res.status)) {
    const getRes = await fetchRes(url, "GET");
    if (getRes.status && getRes.status !== res.status) res = getRes;
  }

  const kind = classify(res.status, res.error);
  const sources = [...(foundBy.get(url) || [])].slice(0, 8);
  return {
    url,
    status: res.status,
    finalUrl: res.finalUrl,
    error: res.error,
    kind,
    sameSite: isSameSite(url),
    sources,
  };
});

const dead = checks.filter((c) => c.kind === "dead");
const errors = checks.filter((c) => c.kind === "error");
const blocked = checks.filter((c) => c.kind === "blocked");
const server = checks.filter((c) => c.kind === "server");
const other = checks.filter((c) => c.kind === "other");
const ok = checks.filter((c) => c.kind === "ok" || c.kind === "redirect");

function printGroup(title, items) {
  console.log("");
  console.log("=".repeat(72));
  console.log(`${title} (${items.length})`);
  console.log("=".repeat(72));
  for (const item of items) {
    const statusBit = item.error ? item.error : `HTTP ${item.status}`;
    console.log(`\n${item.url}`);
    console.log(`  ${statusBit}${item.finalUrl && item.finalUrl !== item.url ? ` → ${item.finalUrl}` : ""}`);
    console.log(`  found in: ${item.sources.join("; ")}`);
  }
}

printGroup("DEAD (404/410)", dead);
printGroup("NETWORK / FETCH ERRORS", errors);
printGroup("BLOCKED (401/403)", blocked);
printGroup("SERVER ERRORS (5xx)", server);
printGroup("OTHER NON-OK", other);

console.log("");
console.log("=".repeat(72));
console.log("SUMMARY");
console.log("=".repeat(72));
console.log(`Checked:  ${checks.length}`);
console.log(`OK:       ${ok.length}`);
console.log(`Dead:     ${dead.length}`);
console.log(`Errors:   ${errors.length}`);
console.log(`Blocked:  ${blocked.length}`);
console.log(`Server:   ${server.length}`);
console.log(`Other:    ${other.length}`);
console.log(`Same-site dead: ${dead.filter((d) => d.sameSite).length}`);
console.log(`External dead:  ${dead.filter((d) => !d.sameSite).length}`);

const softIssues = checks.filter((c) => {
  if (!c.sameSite || c.kind !== "ok") return false;
  try {
    const a = new URL(c.url);
    const b = new URL(c.finalUrl);
    return a.pathname.replace(/\/$/, "") !== b.pathname.replace(/\/$/, "");
  } catch {
    return false;
  }
});
if (softIssues.length) {
  printGroup(
    "SAME-SITE REDIRECTED TO DIFFERENT PATH (informational)",
    softIssues.map((c) => ({ ...c, error: `redirected` }))
  );
}

const reportPath = path.join(clientRoot, "scripts", "dead-link-report-out.json");
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    {
      origin,
      generatedAt: new Date().toISOString(),
      summary: {
        checked: checks.length,
        ok: ok.length,
        dead: dead.length,
        errors: errors.length,
        blocked: blocked.length,
        server: server.length,
        other: other.length,
      },
      dead,
      errors,
      blocked,
      server,
      other,
      redirects: softIssues,
    },
    null,
    2
  )
);
console.log(`\nWrote JSON: ${reportPath}`);
