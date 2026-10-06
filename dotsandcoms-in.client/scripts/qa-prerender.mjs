/**
 * Build-time QA: every prerender:true route must pass non-JS crawler criteria.
 * Also verifies spa-shell stays empty-root for ASP.NET blog/fallback inject.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPrerenderRoutes, BASE_URL } from "../src/seo/publicRoutes.js";
import {
  evaluatePage,
  hasEmptyRoot,
  hasSeoContent,
  hasHideRule,
  rootInnerLength,
} from "./crawlerPassCriteria.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");

function outFileForRoute(routePath) {
  if (routePath === "/") return path.join(DIST, "index.html");
  const clean = routePath.replace(/^\//, "").replace(/\/$/, "");
  return path.join(DIST, clean, "index.html");
}

if (!fs.existsSync(DIST)) {
  console.error("dist/ missing — run `npm run build` first.");
  process.exit(1);
}

const routes = getPrerenderRoutes();
let failed = false;

console.log(`QA prerender: checking ${routes.length} routes…`);

const seenTitles = new Map();
const seenCanonicals = new Map();
const seenDescriptions = new Map();
let homeBodySample = "";

for (const route of routes) {
  const file = outFileForRoute(route.path);
  if (!fs.existsSync(file)) {
    console.log(`FAIL ${route.path} — missing ${path.relative(DIST, file)}`);
    failed = true;
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const expectedCanon =
    route.canonical || `${BASE_URL}${route.path === "/" ? "/" : route.path}`;

  const result = evaluatePage({
    path: route.path,
    html,
    expectedTitle: route.title,
    expectedCanonical: expectedCanon,
    minBodyChars: route.path === "/" ? 80 : 40,
    requireBody: true,
  });

  // Track home body sample for inner page uniqueness check
  if (route.path === "/" || route.path === "") {
    homeBodySample = result.description.slice(0, 40);
  } else {
    // Inner pages must not reuse homepage title or description
    const homeTitle = routes.find((r) => r.path === "/")?.title || "";
    if (result.title.toLowerCase() === homeTitle.toLowerCase()) {
      result.ok = false;
      result.errors.push("inner page reuses homepage title");
    }
  }

  // Uniqueness checks
  if (seenTitles.has(result.title)) {
    result.ok = false;
    result.errors.push(`duplicate title with ${seenTitles.get(result.title)}`);
  } else {
    seenTitles.set(result.title, route.path);
  }

  if (seenCanonicals.has(result.canonical)) {
    result.ok = false;
    result.errors.push(`duplicate canonical with ${seenCanonicals.get(result.canonical)}`);
  } else {
    seenCanonicals.set(result.canonical, route.path);
  }

  if (seenDescriptions.has(result.description)) {
    result.ok = false;
    result.errors.push(`duplicate description with ${seenDescriptions.get(result.description)}`);
  } else {
    seenDescriptions.set(result.description, route.path);
  }

  if (result.ok) {
    console.log(
      `PASS ${route.path} (titleOk=true, canonOk=true, bodyChars=${result.rootLen}, hideRule=${result.hasHideRule}, seoContent=${result.hasSeoContent})`
    );
  } else {
    console.log(`FAIL ${route.path}`);
    for (const e of result.errors) console.log(`  - ${e}`);
    console.log(`  title=${result.title.slice(0, 72)}`);
    console.log(`  canonical=${result.canonical}`);
    failed = true;
  }
}

// Shell verification
const shellPath = path.join(DIST, "spa-shell.html");
if (!fs.existsSync(shellPath)) {
  console.log("FAIL spa-shell.html missing");
  failed = true;
} else {
  const shell = fs.readFileSync(shellPath, "utf8");
  const empty = hasEmptyRoot(shell);
  const noCrawler = !hasSeoContent(shell);
  const hideRuleOk = hasHideRule(shell);

  console.log(`${empty ? "PASS" : "FAIL"} spa-shell empty #root: ${empty}`);
  console.log(`${noCrawler ? "PASS" : "FAIL"} spa-shell has no crawler block: ${noCrawler}`);
  console.log(`${hideRuleOk ? "PASS" : "FAIL"} spa-shell has hide rule: ${hideRuleOk}`);

  if (!empty || !noCrawler || !hideRuleOk) failed = true;
}

// Transactional routes catalog verification
const seoRoutesPath = path.join(__dirname, "..", "public", "seo-routes.json");
if (fs.existsSync(seoRoutesPath)) {
  const catalog = JSON.parse(fs.readFileSync(seoRoutesPath, "utf8"));
  for (const p of ["/thank-you", "/web-hosting-details", "/blogs"]) {
    const hit = catalog.find((r) => r.path === p);
    console.log(`${hit ? "PASS" : "FAIL"} seo-routes.json contains ${p}`);
    if (!hit) failed = true;
  }
} else {
  console.log("FAIL public/seo-routes.json missing — run generate-sitemap.js");
  failed = true;
}

console.log("—".repeat(60));
console.log(failed ? "QA PRERENDER FAILED" : "QA PRERENDER PASSED");
process.exit(failed ? 1 : 0);
