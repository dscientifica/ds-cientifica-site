import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { join } from "node:path";
import { load } from "cheerio";
import { resolveAxionUrl } from "../src/config/site.ts";
import {
  calibrationQuantities,
  productCategories,
} from "../src/data/catalog.ts";
import { segments } from "../src/data/segments.ts";

const calibrationRoutes = calibrationQuantities.flatMap((quantity) => [
  `/calibracao/${quantity.slug}`,
  ...quantity.equipment.map(
    (equipment) => `/calibracao/${quantity.slug}/${equipment.slug}`,
  ),
]);
const productRoutes = productCategories.flatMap((category) => [
  `/produtos/${category.slug}`,
  ...category.types.map((type) => `/produtos/${category.slug}/${type.slug}`),
]);
const segmentRoutes = [
  "/segmentos",
  ...segments.map((segment) => segment.href),
];
const routes = [
  "/",
  "/calibracao",
  ...calibrationRoutes,
  "/manutencao",
  "/qualificacao",
  "/produtos",
  ...productRoutes,
  ...segmentRoutes,
  "/conteudo-tecnico",
  "/sobre",
  "/contato",
  "/area-do-cliente",
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

test("site pages have unique SEO, one h1, Portuguese and noindex", () => {
  const titles = new Set();
  for (const [route, $] of documents) {
    assert.equal($("html").attr("lang"), "pt-BR", route);
    assert.equal($("h1").length, 1, route);
    assert.ok(
      $("meta[name='description']").attr("content")?.length > 30,
      route,
    );
    assert.equal(
      $("meta[name='robots']").attr("content"),
      "noindex, nofollow",
      route,
    );
    assert.equal(
      $("link[rel='canonical']").attr("href"),
      `https://www.dscientifica.com.br${route}`,
    );
    assert.equal(
      $("meta[property='og:title']").attr("content"),
      $("title").text(),
    );
    titles.add($("title").text());
    for (const image of $("img").toArray())
      assert.ok($(image).attr("alt"), route);
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
      } else await access(join("dist", url.pathname));
    }
  }
});

test("sitemap contains every generated public route while preview robots disallows crawling", async () => {
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

test("legacy quote route redirects permanently to the central contact flow", async () => {
  const redirects = await readFile("dist/_redirects", "utf8");
  assert.match(redirects, /^\/orcamento\s+\/contato#orcamento\s+301$/m);
});

test("pending integrations have no invented destinations or service page", () => {
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
  const contact = documents.get("/contato");
  assert.equal(contact("form").attr("action"), undefined);
  assert.equal(contact("fieldset[disabled]").length, 1);
  assert.equal(contact("button[type='submit']").length, 0);
});

test("quote form is centralized on contact and budget CTAs resolve there", () => {
  const formRoutes = [];
  for (const [route, $] of documents) {
    if ($('form[aria-label="Solicitação de orçamento"]').length)
      formRoutes.push(route);
  }
  assert.deepEqual(formRoutes, ["/contato"]);

  for (const [route, $] of documents) {
    if (route === "/contato") continue;
    assert.equal($('main a[href="#orcamento"]').length, 0, route);
  }

  for (const route of [
    "/calibracao/pressao/manometros",
    "/manutencao",
    "/qualificacao",
    "/produtos/pressao/manometros",
    "/segmentos/industrial",
  ]) {
    const $ = documents.get(route);
    assert.ok($('main a[href="/contato#orcamento"]').length >= 1, route);
  }

  const contexts = [];
  for (const [route, $] of documents) {
    for (const el of $(".cta-section[data-quote-context]").toArray()) {
      const context = $(el).attr("data-quote-context");
      if (context) contexts.push([route, context]);
    }
  }
  assert.ok(
    contexts.some(
      ([route, context]) =>
        route === "/calibracao/pressao/manometros" &&
        context === "Calibração / Pressão / Manômetros digitais e analógicos",
    ),
  );
});

test("Home is a clean commercial hub with segment navigation", () => {
  const $ = documents.get("/");
  assert.equal(
    $(".home-hero .page-media img[src='/visuals/processo.webp']").length,
    1,
  );
  assert.match(
    $("#solutions-title").text(),
    /Precisão e suporte para cada etapa da sua operação/,
  );
  assert.deepEqual(
    $("#solucoes a")
      .map((_, el) => $(el).attr("href"))
      .get(),
    ["/calibracao", "/manutencao", "/qualificacao", "/produtos"],
  );
  assert.deepEqual(
    $("#solucoes .solution-copy p")
      .map((_, el) => $(el).text().trim())
      .get(),
    [
      "Confiança para suas medições e decisões de processo.",
      "Diagnóstico e cuidado técnico para manter sua operação funcionando.",
      "Evidências para avaliar o desempenho dos seus equipamentos.",
      "Instrumentação selecionada de acordo com a sua aplicação.",
    ],
  );
  assert.equal($("#sobre li").length, 3);
  assert.deepEqual(
    $("#segmentos .segment-links a")
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
  assert.doesNotMatch($("main").text(), /CMC|acreditad|CGCRE|Inmetro/i);
  assert.equal($("#axion button[disabled]").length, 1);
});

test("segment pages connect applications, solutions and catalog items", () => {
  const expectations = {
    "/segmentos/farmaceutico": [
      "/calibracao/temperatura",
      "/qualificacao",
      "/calibracao/temperatura/autoclaves",
      "/calibracao/fisico-quimica/phmetros",
    ],
    "/segmentos/quimico": [
      "/calibracao/pressao/transmissores-de-pressao-diferencial",
      "/produtos/nivel/instrumentos-de-nivel",
      "/calibracao/fisico-quimica/orp",
    ],
    "/segmentos/alimentos-bebidas": [
      "/calibracao/vazao/eletromagneticos",
      "/calibracao/massa/balancas-analiticas",
      "/calibracao/optica-fotometria/refratometros",
    ],
    "/segmentos/automotivo": [
      "/calibracao/dimensional/paquimetros",
      "/calibracao/dimensional/micrometros",
      "/calibracao/massa/balancas-digitais",
    ],
    "/segmentos/hospitalar": [
      "/calibracao/temperatura/registradores-data-loggers",
      "/calibracao/temperatura/incubadoras",
      "/produtos/equipamentos-de-laboratorio/equipamentos-termicos-e-de-apoio",
    ],
    "/segmentos/industrial": [
      "/calibracao/pressao/transmissores-de-pressao",
      "/calibracao/vazao/eletromagneticos",
      "/produtos/nivel/instrumentos-de-nivel",
    ],
  };

  for (const [route, expectedLinks] of Object.entries(expectations)) {
    const $ = documents.get(route);
    assert.ok($(".segment-application-list li").length >= 4, route);
    assert.ok($(".segment-solution-grid .card").length >= 5, route);
    assert.ok($(".segment-relation-group").length >= 2, route);
    assert.ok($(".segment-equipment-card").length >= 8, route);
    assert.equal(
      $('main form[aria-label="Solicitação de orçamento"]').length,
      0,
      route,
    );
    assert.ok($('main a[href="/contato#orcamento"]').length >= 2, route);
    assert.equal($('main a[href="#orcamento"]').length, 0, route);
    for (const href of expectedLinks)
      assert.ok($(`main a[href="${href}"]`).length >= 1, `${route}: ${href}`);
  }

  assert.match(
    documents.get("/segmentos/farmaceutico")("main").text(),
    /controle e monitoramento de temperatura/,
  );
  assert.match(
    documents.get("/segmentos/quimico")("main").text(),
    /Pressão diferencial|Transmissores de pressão diferencial/,
  );
  assert.match(
    documents.get("/segmentos/industrial")("main").text(),
    /Instrumentação de processo/,
  );
});

test("service hubs use client-facing maintenance and qualification copy", () => {
  const maintenance = documents.get("/manutencao");
  assert.match(
    maintenance("main").text(),
    /Do diagnóstico à solução: suporte técnico para manter sua operação funcionando\./,
  );
  for (const term of [
    "Diagnóstico técnico",
    "Manutenção preventiva",
    "Manutenção corretiva",
    "Equipamentos de laboratório",
    "Instrumentação de processo",
  ])
    assert.match(maintenance("main").text(), new RegExp(term));

  const qualification = documents.get("/qualificacao");
  for (const term of [
    "Qualificação térmica",
    "Mapeamento térmico",
    "Desempenho dos equipamentos",
    "Documentação",
    "Evidências para decisão técnica",
  ])
    assert.match(qualification("main").text(), new RegExp(term));
  assert.doesNotMatch(
    qualification("main").text(),
    /conteúdo e escopo sujeitos|validação técnica da DS antes de publicação detalhada/i,
  );
});

test("public pages do not expose internal development language", () => {
  const forbidden =
    /Logo oficial pendente|ambiente piloto|piloto DS Científica|URL operacional a confirmar|URL operacional em confirmação|backend|retenção|proteção contra spam|integração futura|integração aprovada|aprovação interna|futura submissão|validação do roteiro|Confirmar revisão sem enviar|não envia|não há envio|Imagem fotográfica original|validar\/substituir|pendência interna|nota para desenvolvedor|conteúdo de teste|sem assumir capacidades|resultados antes da análise/i;
  for (const [route, $] of documents) {
    assert.doesNotMatch($("body").text(), forbidden, route);
    assert.doesNotMatch(
      $("meta[name='description']").attr("content") ?? "",
      forbidden,
      route,
    );
  }
});

test("global navigation points to real site sections", () => {
  for (const [, $] of documents) {
    const nav = $("#main-nav a")
      .map((_, el) => [$(el).text().trim(), $(el).attr("href")])
      .get();
    assert.ok(nav.includes("Segmentos") && nav.includes("/segmentos"));
    assert.ok(
      nav.includes("Conteúdo Técnico") && nav.includes("/conteudo-tecnico"),
    );
    assert.ok(nav.includes("Sobre a DS") && nav.includes("/sobre"));
    assert.ok(nav.includes("Contato") && nav.includes("/contato"));
    assert.ok(
      nav.includes("Área do Cliente") && nav.includes("/area-do-cliente"),
    );
  }
});

test("content avoids unsupported accreditation, ranges and supplier references", () => {
  for (const [route, $] of documents) {
    const text = $("main").text();
    assert.doesNotMatch(
      text,
      /Aplisens|Endress|QT|Phorp|modelo\s+[A-Z]{2,}[-0-9]|CMC|acreditad[ao]|CGCRE|Inmetro|ISO\/IEC 17025/i,
      route,
    );
    assert.doesNotMatch(text, /\d+\s*(bar|°C|kg|L\/min|m3\/h)\b/i, route);
  }
});

test("page visuals use controlled photographic media instead of large generic icons", () => {
  const routeMedia = {
    "/": ["/visuals/calibracao.webp", "/visuals/manutencao.webp"],
    "/calibracao": ["/visuals/calibracao.webp"],
    "/calibracao/pressao": ["/visuals/pressao.webp"],
    "/calibracao/pressao/manometros": ["/visuals/manometro-digital.webp"],
    "/calibracao/temperatura/autoclaves": ["/visuals/qualificacao.webp"],
    "/calibracao/fisico-quimica/phmetros": ["/visuals/fisico-quimica.webp"],
    "/manutencao": ["/visuals/manutencao.webp"],
    "/qualificacao": ["/visuals/qualificacao.webp"],
    "/produtos": ["/visuals/produtos.webp"],
    "/produtos/pressao": ["/visuals/pressao.webp"],
    "/produtos/pressao/manometros": ["/visuals/manometro-digital.webp"],
    "/produtos/vazao/medidores-de-vazao": ["/visuals/vazao.webp"],
    "/produtos/nivel/instrumentos-de-nivel": ["/visuals/nivel.webp"],
    "/segmentos": ["/visuals/segmentos.webp"],
    "/segmentos/farmaceutico": ["/visuals/laboratorio.webp"],
    "/segmentos/industrial": ["/visuals/processo.webp"],
    "/conteudo-tecnico": ["/visuals/conteudo.webp"],
    "/sobre": ["/visuals/laboratorio.webp"],
    "/contato": ["/visuals/processo.webp"],
    "/area-do-cliente": ["/visuals/cliente.webp"],
  };
  for (const [route, expectedSources] of Object.entries(routeMedia)) {
    const $ = documents.get(route);
    assert.ok($(".page-media img").length >= 1, route);
    const actualSources = $(".page-media img")
      .map((_, image) => $(image).attr("src"))
      .get();
    for (const expected of expectedSources)
      assert.ok(actualSources.includes(expected), `${route}: ${expected}`);
    for (const image of $(".page-media img").toArray()) {
      assert.equal($(image).attr("width"), "960", route);
      assert.equal($(image).attr("height"), "640", route);
      assert.ok($(image).attr("alt")?.length > 25, route);
      assert.match($(image).attr("src") ?? "", /^\/visuals\//, route);
    }
    assert.equal(
      $(".hub-symbol, .segment-symbol, .solution-icon").length,
      0,
      route,
    );
  }
});

test("contextual photos are used before falling back to pending media", () => {
  for (const route of [
    "/calibracao",
    "/calibracao/pressao",
    "/calibracao/temperatura",
    "/calibracao/massa",
    "/calibracao/vazao",
    "/calibracao/dimensional",
    "/calibracao/fisico-quimica",
    "/calibracao/optica-fotometria",
    "/manutencao",
    "/qualificacao",
    "/produtos",
    "/produtos/nivel",
    "/segmentos/farmaceutico",
    "/segmentos/automotivo",
  ]) {
    const $ = documents.get(route);
    assert.equal($(".page-media-pending").length, 0, route);
  }
  for (const route of ["/conteudo-tecnico", "/area-do-cliente"]) {
    const $ = documents.get(route);
    assert.ok($(".page-media-pending").length >= 1, route);
  }
});

export { routes, documents };
