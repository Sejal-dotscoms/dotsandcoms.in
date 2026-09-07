/**
 * Build-time prerender for public marketing routes.
 * - Copies Vite's empty-root index.html to spa-shell.html (ASP.NET blog inject + SPA fallback)
 * - Visits each prerender route with Playwright and writes HTML under dist/
 *
 * Chromium is installed via: npm run playwright:install
 * Never runs in the production request path.
 */
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, statSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";
import { getPrerenderRoutes } from "./src/seo/publicRoutes.js";
import { injectHtmlMeta } from "./src/seo/injectHtmlMeta.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "dist");
const PORT = Number(process.env.PRERENDER_PORT || 4173);
const ROUTE_TIMEOUT_MS = Number(process.env.PRERENDER_TIMEOUT_MS || 45000);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
};

function contentType(filePath) {
  return MIME[extname(filePath).toLowerCase()] || "application/octet-stream";
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      try {
        const url = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);
        let pathname = decodeURIComponent(url.pathname);
        if (pathname.endsWith("/")) pathname += "index.html";

        let filePath = join(DIST, pathname);
        if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
          // SPA fallback to shell during prerender navigations
          filePath = join(DIST, "spa-shell.html");
          if (!existsSync(filePath)) filePath = join(DIST, "index.html");
        }

        const data = readFileSync(filePath);
        res.writeHead(200, { "Content-Type": contentType(filePath) });
        res.end(data);
      } catch (err) {
        res.writeHead(404);
        res.end("Not found");
      }
    });

    server.on("error", reject);
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

function outPathForRoute(routePath) {
  if (routePath === "/") return join(DIST, "index.html");
  const clean = routePath.replace(/^\//, "").replace(/\/$/, "");
  return join(DIST, clean, "index.html");
}

async function waitForSeoReady(page, expectedTitle) {
  await page.waitForFunction(
    (title) => {
      const root = document.getElementById("root");
      const text = (root?.innerText || "").trim();
      if (!title) return text.length > 80;
      const needle = title.trim().slice(0, 20).toLowerCase();
      const titleOk = (document.title || "").toLowerCase().includes(needle);
      // Require the route title so we never snapshot homepage meta onto inner pages
      return titleOk && (text.length > 40 || document.title.trim().length > 10);
    },
    expectedTitle,
    { timeout: ROUTE_TIMEOUT_MS }
  );
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("dist/index.html missing — run vite build first.");
    process.exit(1);
  }

  const indexPath = join(DIST, "index.html");
  const shellPath = join(DIST, "spa-shell.html");

  const hasEmptyRoot = (html) =>
    /<div\s+id=["']root["']\s*>\s*<\/div>/i.test(html);

  let indexHtml = readFileSync(indexPath, "utf8");
  if (hasEmptyRoot(indexHtml)) {
    // Fresh vite build — preserve empty shell for ASP.NET fallback / blog inject
    copyFileSync(indexPath, shellPath);
    console.log("Wrote spa-shell.html (empty #root shell for ASP.NET fallback/blog inject)");
  } else if (existsSync(shellPath) && hasEmptyRoot(readFileSync(shellPath, "utf8"))) {
    // Re-prerender after a previous run — restore empty index before capturing routes
    copyFileSync(shellPath, indexPath);
    console.log("Restored empty index.html from spa-shell.html before prerender");
  } else {
    console.error(
      "No empty SPA shell found. Run `vite build` first so dist/index.html has an empty #root."
    );
    process.exit(1);
  }

  const routes = getPrerenderRoutes();
  console.log(`Prerendering ${routes.length} routes…`);

  const server = await startStaticServer();
  const browser = await chromium.launch({ headless: true });
  const failures = [];

  try {
    const page = await browser.newPage();
    // Skip home loading screen; reduce flaky waits on third-party beacons
    await page.addInitScript(() => {
      window.hasLoadedOnce = true;
    });
    await page.route("**/*", (route) => {
      const u = route.request().url();
      if (
        /googletagmanager|google-analytics|clarity\.ms|facebook|doubleclick|hotjar|taboola|apollo|recaptcha|gstatic\.com\/recaptcha/i.test(
          u
        )
      ) {
        return route.abort();
      }
      return route.continue();
    });

    for (const route of routes) {
      const url = `http://127.0.0.1:${PORT}${route.path === "/" ? "/" : route.path}`;
      process.stdout.write(`  ${route.path} … `);
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: ROUTE_TIMEOUT_MS });
        await waitForSeoReady(page, route.title);
        const html = injectHtmlMeta(await page.content(), route);
        const out = outPathForRoute(route.path);
        mkdirSync(dirname(out), { recursive: true });
        writeFileSync(out, "<!DOCTYPE html>\n" + html.replace(/^<!DOCTYPE html>/i, ""), "utf-8");
        console.log("ok");
      } catch (err) {
        console.log("FAIL");
        failures.push({ path: route.path, error: err.message });
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failures.length) {
    console.error("\nPrerender failed for:");
    for (const f of failures) console.error(`  - ${f.path}: ${f.error}`);
    process.exit(1);
  }

  console.log("Prerender complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
