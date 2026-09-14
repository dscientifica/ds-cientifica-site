import type { APIRoute } from "astro";
import { site } from "../config/site";
export const GET: APIRoute = ({ site: origin }) =>
  new Response(
    site.indexable
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL("/sitemap-index.xml", origin)}\n`
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
