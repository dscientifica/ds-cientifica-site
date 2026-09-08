import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { join } from "node:path";
import { load } from "cheerio";
import { resolveAxionUrl } from "../src/config/site.ts";

test("AXION only accepts a confirmed, valid HTTPS destination", () => {
  for (const value of [
    "",
    "https://",
    "http://portal.example.test",
    "javascript:alert(1)",
    "https://user:password@portal.example.test",
  ])
    assert.equal(resolveAxionUrl(value), undefined);
  assert.equal(
    resolveAxionUrl("https://portal.example.test/clientes"),
    "https://portal.example.test/clientes",
  );
});

const routes = [
  "/",
  "/calibracao",
  "/calibracao/pressao",
  "/calibracao/pressao/manometros",
  "/manutencao",
  "/qualificacao",
  "/produtos",
  "/segmentos/farmaceutico",
  "/segmentos/quimico",
  "/segmentos/alimentos-bebidas",
  "/segmentos/automotivo",
  "/segmentos/hospitalar",
  "/segmentos/industrial",
];
const fileFor = (route) =>
  route === "/404" ? "dist/404.html" : join("dist", route, "index.html");
const documents = new Map(
  await Promise.all(
    [...routes, "/404"].map(async (route) => [
      route,
      load(await readFile(fileFor(route), "utf8")),
    ]),
  ),
);

test("pilot pages have unique SEO, one h1, Portuguese and noindex", () => {
  const titles = new Set();
  for (const [route, $] of documents) {
    assert.equal($("html").attr("lang"), "pt-BR");
    assert.equal($("h1").length, 1, route);
    assert.ok($('meta[name="description"]').attr("content")?.length > 30);
    assert.equal($('meta[name="robots"]').attr("content"), "noindex, nofollow");
    assert.equal(
      $('link[rel="canonical"]').attr("href"),
      `https://www.dscientifica.com.br${route}`,
    );
    assert.equal(
      $('meta[property="og:title"]').attr("content"),
      $("title").text(),
    );
    titles.add($("title").text());
    for (const image of $("img").toArray()) assert.ok($(image).attr("alt"));
  }
  assert.equal(titles.size, documents.size);
});

test("all internal links, fragments and assets resolve in the static build", async () => {
  for (const [route, $] of documents) {
    for (const el of $(
      "a[href], img[src], script[src], link[href]",
    ).toArray()) {
      const value = $(el).attr("href") || $(el).attr("src");
      if (!value || /^(https?:|mailto:|tel:)/.test(value)) continue;
      const url = new URL(value, `https://example.test${route}`);
      if (documents.has(url.pathname)) {
        if (url.hash)
          assert.ok(
            documents.get(url.pathname)(
              `[id="${decodeURIComponent(url.hash.slice(1))}"]`,
            ).length,
            `${route}: ${value}`,
          );
      } else {
        await access(join("dist", url.pathname));
      }
    }
  }
});

test("sitemap contains only the authorized routes; preview robots disallows crawling", async () => {
  const $ = load(await readFile("dist/sitemap-0.xml", "utf8"), { xml: true });
  assert.deepEqual(
    $("loc")
      .map((_, el) => $(el).text().replace(/\/$/, ""))
      .get()
      .sort(),
    routes
      .map((route) =>
        `https://www.dscientifica.com.br${route}`.replace(/\/$/, ""),
      )
      .sort(),
  );
  assert.equal(
    await readFile("dist/robots.txt", "utf8"),
    "User-agent: *\nDisallow: /\n",
  );
  const headers = await readFile("dist/_headers", "utf8");
  assert.match(headers, /X-Robots-Tag: noindex, nofollow/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
});

test("pending integrations and unimplemented categories have no invented destinations", () => {
  for (const [, $] of documents) {
    const hrefs = $("a")
      .map((_, el) => $(el).attr("href"))
      .get();
    assert.ok(
      !hrefs.some(
        (href) =>
          href.includes("wa.me") ||
          href.startsWith("mailto:") ||
          href.includes("axion.dscientifica"),
      ),
    );
    assert.ok(!hrefs.includes("/servicos"));
  }
  const $ = documents.get("/calibracao/pressao/manometros");
  assert.equal($("form").attr("action"), undefined);
  assert.equal($("fieldset[disabled]").length, 1);
  assert.equal($('button[type="submit"]').length, 0);
});

test("Home is a four-path hub and client navigation has a safe fallback", () => {
  const $ = documents.get("/");
  assert.deepEqual(
    $("#solucoes a")
      .map((_, el) => $(el).attr("href"))
      .get(),
    ["/calibracao", "/manutencao", "/qualificacao", "/produtos"],
  );
  assert.equal($("#sobre li").length, 3);
  assert.deepEqual(
    $("#segmentos a")
      .map((_, el) => [$(el).text().trim(), $(el).attr("href")])
      .get(),
    [
      "Farmacêutico",
      "/segmentos/farmaceutico",
      "Químico",
      "/segmentos/quimico",
      "Alimentos e Bebidas",
      "/segmentos/alimentos-bebidas",
      "Automotivo",
      "/segmentos/automotivo",
      "Hospitalar",
      "/segmentos/hospitalar",
      "Industrial",
      "/segmentos/industrial",
    ],
  );
  assert.equal(
    $("main form, main .instrument-image, main .status-label").length,
    0,
  );
  assert.doesNotMatch($("main").text(), /manômetros|CMC|rastreabilidade/i);
  assert.equal($("#axion button[disabled]").length, 1);
  for (const [, doc] of documents) {
    const client = doc("#main-nav a").filter(
      (_, el) => doc(el).text().trim() === "Área do Cliente",
    );
    assert.equal(client.length, 1);
    assert.equal(client.attr("href"), "/#axion");
  }
});

test("segment hubs stay minimal and avoid unsupported claims", () => {
  for (const route of routes.filter((route) =>
    route.startsWith("/segmentos/"),
  )) {
    const $ = documents.get(route);
    assert.equal($("h1").length, 1);
    assert.match($("main").text(), /Hub em validação/);
    assert.doesNotMatch(
      $("main").text(),
      /acreditad|CGCRE|Inmetro|ISO|NR-13|CMC|incerteza|certifica/i,
    );
    assert.equal($("main a[href='/#contato']").length, 1);
  }
});
