import type { APIRoute } from "astro";
import { publicRoutes } from "../data/publicRoutes";

export const GET: APIRoute = ({ site }) => {
  const urls = publicRoutes
    .map((route) => {
      const loc = new URL(route, site).href;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
