/**
 * Build-time QA: every prerender:true route must pass non-JS crawler criteria.
 * Also verifies spa-shell stays empty-root for ASP.NET blog/fallback inject.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPrerenderRoutes, BASE_URL } from "../src/seo/publicRoutes.js";
import { evaluatePage, hasEmptyRoot } from "./crawlerPassCriteria.mjs";

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

for (const route of routes) {
  const file = outFileForRoute(route.path);
  if (!fs.existsSync(file)) {
    console.log(`FAIL ${route.path} — missing ${path.relative(DIST, file)}`);
    failed = true;
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const result = evaluatePage({
    path: route.path,
    html,
    expectedTitle: route.title,
    expectedCanonical: route.canonical || `${BASE_URL}${route.path === "/" ? "/" : route.path}`,
    minBodyChars: route.path === "/" ? 80 : 40,
    requireBody: true,
  });

  if (result.ok) {
    console.log(`PASS ${route.path} (rootLen=${result.rootLen}, seo=${result.hasSeoContent})`);
  } else {
    console.log(`FAIL ${route.path}`);
    for (const e of result.errors) console.log(`  - ${e}`);
    console.log(`  title=${result.title.slice(0, 72)}`);
    console.log(`  canonical=${result.canonical}`);
    failed = true;
  }
}

const shellPath = path.join(DIST, "spa-shell.html");
if (!fs.existsSync(shellPath)) {
  console.log("FAIL spa-shell.html missing");
  failed = true;
} else {
  const shell = fs.readFileSync(shellPath, "utf8");
  const empty = hasEmptyRoot(shell);
  console.log(`${empty ? "PASS" : "FAIL"} spa-shell empty #root: ${empty}`);
  if (!empty) failed = true;
}

// Transactional routes are not prerendered; catalog must still list them for server inject
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

process.exit(failed ? 1 : 0);
