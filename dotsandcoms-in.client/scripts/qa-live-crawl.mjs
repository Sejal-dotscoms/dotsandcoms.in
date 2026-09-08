/**
 * Live raw-HTTP crawl (no JS) — simulates AI / simple crawlers.
 *
 * Usage:
 *   node scripts/qa-live-crawl.mjs
 *   node scripts/qa-live-crawl.mjs https://www.dotsandcoms.in
 */
import { PUBLIC_ROUTES, BASE_URL } from "../src/seo/publicRoutes.js";
import { evaluatePage, HOME_CANONICAL } from "./crawlerPassCriteria.mjs";

const origin = (process.argv[2] || BASE_URL).replace(/\/$/, "");

async function fetchText(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      // Plain anonymous GET — same HTML for bots and humans (no cloaking)
      "User-Agent": "DotsAndComsCrawlerQA/1.0 (+raw-html-check)",
      Accept: "text/html",
    },
  });
  const html = await res.text();
  return { status: res.status, html, finalUrl: res.url };
}

function urlFor(path) {
  if (path === "/") return `${origin}/`;
  return `${origin}${path}`;
}

let failed = false;
const results = [];

console.log(`Live crawler QA against ${origin}`);
console.log("—".repeat(60));

// 1) All PUBLIC_ROUTES (sitemap + transactional)
for (const route of PUBLIC_ROUTES) {
  const url = urlFor(route.path);
  try {
    const { status, html } = await fetchText(url);
    const requireBody = true;
    const result = evaluatePage({
      path: route.path,
      html,
      expectedTitle: route.title,
      expectedCanonical: route.canonical,
      minBodyChars: route.path === "/" ? 80 : 40,
      requireBody,
    });

    if (status >= 400) {
      result.ok = false;
      result.errors.push(`HTTP ${status}`);
    }

    results.push({ path: route.path, ...result, status });
    if (result.ok) {
      console.log(`PASS ${route.path}`);
    } else {
      failed = true;
      console.log(`FAIL ${route.path} [${status}]`);
      for (const e of result.errors) console.log(`  - ${e}`);
    }
  } catch (err) {
    failed = true;
    console.log(`FAIL ${route.path} — ${err.message}`);
  }
}

// 2) Blog index links → each detail must be unique
try {
  const { html: blogsHtml } = await fetchText(urlFor("/blogs"));
  const linkRe = /href=["']((?:https:\/\/www\.dotsandcoms\.in)?\/blogs\/[^"'#?]+)["']/gi;
  const slugs = new Set();
  let m;
  while ((m = linkRe.exec(blogsHtml))) {
    const href = m[1];
    const path = href.startsWith("http") ? new URL(href).pathname : href;
    if (path !== "/blogs") slugs.add(path.replace(/\/$/, ""));
  }

  console.log(`— blog details from /blogs: ${slugs.size}`);
  for (const path of slugs) {
    const { status, html } = await fetchText(`${origin}${path}`);
    const result = evaluatePage({
      path,
      html,
      expectedCanonical: `${HOME_CANONICAL.replace(/\/$/, "")}${path}`,
      minBodyChars: 40,
      requireBody: true,
    });
    if (status >= 400) {
      result.ok = false;
      result.errors.push(`HTTP ${status}`);
    }
    if (result.ok) console.log(`PASS ${path}`);
    else {
      failed = true;
      console.log(`FAIL ${path} [${status}]`);
      for (const e of result.errors) console.log(`  - ${e}`);
    }
  }
} catch (err) {
  failed = true;
  console.log(`FAIL blog crawl — ${err.message}`);
}

// 3) Unknown blog slug must 404 without homepage shell
try {
  const unknown = `/blogs/this-slug-does-not-exist-${Date.now()}`;
  const { status, html } = await fetchText(`${origin}${unknown}`);
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "";
  const canon = (html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || [])[1] || "";
  const isHomeShell =
    canon === HOME_CANONICAL ||
    /Website Design & Mobile App Development Company in Vadodara/i.test(title);

  if (status === 404 && !isHomeShell) {
    console.log(`PASS unknown blog slug → 404 (no homepage shell)`);
  } else {
    failed = true;
    console.log(`FAIL unknown blog slug status=${status} title=${title.slice(0, 60)} canon=${canon}`);
  }
} catch (err) {
  failed = true;
  console.log(`FAIL unknown blog check — ${err.message}`);
}

// 4) Random unknown path → 404
try {
  const { status, html } = await fetchText(`${origin}/not-a-real-page-xyz-qa`);
  const canon = (html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || [])[1] || "";
  if (status === 404) {
    console.log(`PASS unknown path → 404`);
  } else {
    failed = true;
    console.log(`FAIL unknown path status=${status} canon=${canon}`);
  }
} catch (err) {
  // Some hosts may refuse connection on 404 pages differently
  console.log(`WARN unknown path check — ${err.message}`);
}

console.log("—".repeat(60));
console.log(failed ? "LIVE CRAWLER QA FAILED" : "LIVE CRAWLER QA PASSED");
process.exit(failed ? 1 : 0);
