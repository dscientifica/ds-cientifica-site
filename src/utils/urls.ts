/** Match public page links to the directory URLs served by Cloudflare Pages. */
export function pageHref(href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const [, pathname = "", suffix = ""] = href.match(/^([^?#]*)(.*)$/) || [];
  const path = pathname.replace(/\/+$/, "") || "/";
  if (
    path === "/" ||
    path === "/api" ||
    path.startsWith("/api/") ||
    path === "/orcamento" ||
    path === "/404" ||
    /\.[^/]+$/.test(path)
  )
    return href;

  return `${path}/${suffix}`;
}
