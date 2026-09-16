import { defineConfig } from "astro/config";
// The canonical domain is a build setting; this never changes DNS or deploys.
export default defineConfig({
  site: "https://www.dscientifica.com.br",
  output: "static",
  trailingSlash: "never",
});
