import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The canonical domain is a build setting; this never changes DNS or deploys.
export default defineConfig({
  site: "https://www.dscientifica.com.br",
  output: "static",
  trailingSlash: "never",
  integrations: [sitemap({ filter: (page) => !page.endsWith("/404") })],
});
