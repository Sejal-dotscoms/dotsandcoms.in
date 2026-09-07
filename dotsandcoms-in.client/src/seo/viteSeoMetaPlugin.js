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
