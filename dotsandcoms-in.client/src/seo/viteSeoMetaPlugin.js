import { getRouteByPath } from "./publicRoutes.js";
import { injectHtmlMeta } from "./injectHtmlMeta.js";

/**
 * Dev-server only: rewrite index.html meta for the requested path so
 * view-source on inner URLs is not the homepage shell.
 */
export function viteSeoMetaPlugin() {
  return {
    name: "seo-meta-inject",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split("?")[0] : "";
        if (url === "/sitemap.html") {
          res.writeHead(302, { Location: "/sitemap" });
          res.end();
          return;
        }
        if (url === "/404.html") {
          res.writeHead(302, { Location: "/404" });
          res.end();
          return;
        }
        next();
      });
    },
    transformIndexHtml(html, ctx) {
      const pathname = requestPath(ctx);
      const route = getRouteByPath(pathname);
      if (!route || route.path === "/") return html;
      return injectHtmlMeta(html, route);
    },
  };
}

function requestPath(ctx) {
  const raw = ctx.originalUrl || ctx.path || "/";
  try {
    return new URL(raw, "http://localhost").pathname;
  } catch {
    return String(raw).split("?")[0] || "/";
  }
}
