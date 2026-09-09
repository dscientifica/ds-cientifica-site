import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/calibracao",
  "/calibracao/pressao",
  "/calibracao/pressao/manometros",
  "/manutencao",
  "/qualificacao",
  "/produtos",
  "/segmentos",
  "/segmentos/farmaceutico",
  "/segmentos/quimico",
  "/segmentos/alimentos-bebidas",
  "/segmentos/automotivo",
  "/segmentos/hospitalar",
  "/segmentos/industrial",
];

for (const width of [390, 1280]) {
  test(`Home cards and CTAs navigate at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText(
      "Mais que medições, resultados para o seu negócio.",
    );
    await expect(page.locator(".home-subtitle")).toHaveText(
      "Calibração, manutenção, qualificação e instrumentação para laboratórios e processos industriais.",
    );
    await page.screenshot({
      path: testInfo.outputPath(`home-${width}.png`),
      fullPage: true,
    });
    await page
      .locator(".home-hero")
      .getByRole("link", { name: "Conheça nossas soluções" })
      .click();
    await expect(page).toHaveURL("/calibracao");
    await page.goto("/");
    for (const [label, path] of [
      ["Calibração", "/calibracao"],
      ["Manutenção", "/manutencao"],
      ["Qualificação", "/qualificacao"],
      ["Produtos", "/produtos"],
    ]) {
      await page.goto("/");
      await page
        .locator("#solucoes")
        .getByRole("link", { name: label, exact: true })
        .click();
      await expect(page).toHaveURL(path);
      await expect(page.locator("h1")).toBeVisible();
    }
    await page.goto("/");
    await page
      .locator(".home-hero")
      .getByRole("link", { name: "Solicitar orçamento" })
      .click();
    await expect(page).toHaveURL("/contato#orcamento");
    await expect(page.locator("#orcamento")).toBeInViewport();
    await page.goto("/");
    for (const [label, path] of [
      ["Farmacêutico", "/segmentos/farmaceutico"],
      ["Químico", "/segmentos/quimico"],
      ["Alimentos e Bebidas", "/segmentos/alimentos-bebidas"],
      ["Automotivo", "/segmentos/automotivo"],
      ["Hospitalar", "/segmentos/hospitalar"],
      ["Industrial", "/segmentos/industrial"],
    ]) {
      await page.goto("/");
      await page
        .locator("#segmentos")
        .getByRole("link", { name: label, exact: true })
        .click();
      await expect(page).toHaveURL(path);
      await expect(page.locator("h1")).toHaveText(label);
    }
  });
}

test("client menu reaches the client area from every route on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await page.goto(route);
    await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: "Área do Cliente", exact: true })
      .click();
    await expect(page).toHaveURL("/area-do-cliente");
    await expect(page.locator("h1")).toContainText(
      "Tenha o controle dos seus equipamentos",
    );
    await expect(page.getByRole("button", { name: "Em breve" })).toBeDisabled();
  }
});

for (const width of [320, 375, 390, 768, 1280, 1920]) {
  test(`all routes fit ${width}px and images load`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of routes) {
      expect((await page.goto(route))?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      for (const img of await page.locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            img.evaluate(
              (node: HTMLImageElement) =>
                node.complete && node.naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
    }
    expect(errors).toEqual([]);
  });
}

test("mobile navigation, keyboard and complete pilot journey", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  await expect(page.locator("#main-nav")).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Calibração", exact: true })
    .click();
  await expect(page).toHaveURL("/calibracao");
  await page.getByRole("link", { name: "Explorar pressão" }).click();
  await expect(page).toHaveURL("/calibracao/pressao");
  await page
    .getByRole("link", { name: /Manômetros/ })
    .first()
    .click();
  await expect(page).toHaveURL("/calibracao/pressao/manometros");
  await page
    .getByRole("link", { name: /Solicitar orçamento/ })
    .first()
    .click();
  await expect(page).toHaveURL("/contato#orcamento");
  await expect(page.locator("#orcamento")).toBeInViewport();
});

test("quote CTAs point to the central contact budget flow", async ({
  page,
}) => {
  for (const route of [
    "/calibracao/pressao/manometros",
    "/manutencao",
    "/qualificacao",
    "/produtos/pressao/manometros",
    "/segmentos/industrial",
    "/orcamento",
  ]) {
    await page.goto(route);
    const quoteLinks = page.locator(
      'main a[href="/contato#orcamento"], main a[href="#orcamento"]',
    );
    await expect(quoteLinks.first()).toBeVisible();
    await expect(
      page.locator('main form[aria-label="Solicitação de orçamento"]'),
    ).toHaveCount(route === "/contato" ? 1 : 0);
    const localAnchors = await page
      .locator('main a[href="#orcamento"]')
      .count();
    expect(localAnchors, route).toBe(0);
    await quoteLinks.first().click();
    await expect(page).toHaveURL("/contato#orcamento");
    await expect(
      page.locator('form[aria-label="Solicitação de orçamento"]'),
    ).toBeVisible();
  }
});

test("segment pages expose commercial paths and catalog links on desktop and mobile", async ({
  page,
}) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/segmentos/farmaceutico",
      "/segmentos/quimico",
      "/segmentos/alimentos-bebidas",
      "/segmentos/automotivo",
      "/segmentos/hospitalar",
      "/segmentos/industrial",
    ]) {
      await page.goto(route);
      await expect(page.locator(".segment-application-list li")).toHaveCount(4);
      await expect(
        page.locator(".segment-solution-grid .card").first(),
      ).toBeVisible();
      await expect(
        page.locator(".segment-equipment-card").first(),
      ).toBeVisible();
      await expect(
        page.locator('main form[aria-label="Solicitação de orçamento"]'),
      ).toHaveCount(0);
      await expect(page.locator('main a[href="#orcamento"]')).toHaveCount(0);
      await expect(
        page.locator('main a[href="/contato#orcamento"]').first(),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.locator(".segment-equipment-card a").first().click();
      await expect(page.locator("h1")).toBeVisible();
      expect(page.url()).not.toContain("/segmentos/");
      await page.goto(route);
      await page.locator('main a[href="/contato#orcamento"]').first().click();
      await expect(page).toHaveURL("/contato#orcamento");
      await expect(page.locator("#orcamento")).toBeInViewport();
    }
  }
});

test("form rejects invalid fields and never sends or persists data", async ({
  page,
}) => {
  await page.goto("/contato#orcamento");
  await expect(page.locator("#add-equipment")).toBeVisible();
  const requests: string[] = [];
  page.on("request", (req) => {
    if (
      req.method() !== "GET" ||
      ["fetch", "xhr", "document"].includes(req.resourceType())
    )
      requests.push(req.url());
  });
  const add = page.getByRole("button", {
    name: "+ Adicionar outro equipamento",
  });
  await add.click();
  await expect(page.getByRole("status")).toHaveText("");
  expect(
    await page
      .locator("form")
      .evaluate((form: HTMLFormElement) => form.checkValidity()),
  ).toBe(false);
  await page.getByLabel("Serviço *").selectOption("Calibração");
  await page.getByLabel("Equipamento *").fill("Manômetro digital");
  await page.getByLabel("Quantidade *").fill("1");
  await add.click();
  await expect(page.getByRole("status")).toContainText(
    "Equipamento adicionado à solicitação.",
  );
  await expect(page.locator(".equipment-list li")).toHaveCount(1);
  await page.getByRole("button", { name: "Revisar solicitação" }).click();
  await expect(page.getByRole("status")).toHaveText("");
  expect(
    await page
      .getByLabel("Empresa *")
      .evaluate((el: HTMLInputElement) => el.checkValidity()),
  ).toBe(false);
  await page.getByLabel("Empresa *").fill("   ");
  await page.getByLabel("Nome *").fill("Teste");
  await page.getByLabel("E-mail *").fill("teste@example.test");
  await page.getByLabel("Cidade/UF *").fill("Cidade de teste/SP");
  await page.getByRole("button", { name: "Revisar solicitação" }).click();
  expect(
    await page
      .getByLabel("Empresa *")
      .evaluate((el: HTMLInputElement) => el.checkValidity()),
  ).toBe(false);
  await page.getByLabel("Empresa *").fill("Empresa teste");
  await page.getByLabel("E-mail *").fill("invalido");
  await page.getByRole("button", { name: "Revisar solicitação" }).click();
  await expect(page.getByRole("status")).toHaveText("");
  await page.getByLabel("WhatsApp").fill("abcdefghij");
  await page.getByLabel("E-mail *").fill("teste@example.test");
  await page.getByRole("button", { name: "Revisar solicitação" }).click();
  await expect(page.getByRole("status")).toHaveText("");
  await page.getByLabel("WhatsApp").fill("");
  await page.getByRole("button", { name: "Revisar solicitação" }).click();
  await expect(page.locator(".quote-review")).toBeVisible();
  await expect(page.locator("#review-client")).toContainText("Empresa teste");
  await expect(page.locator("#review-equipment")).toContainText(
    "Calibração - Manômetro digital",
  );
  await page
    .getByRole("button", { name: "Marcar revisão como pronta" })
    .click();
  await expect(page.getByRole("status")).toContainText("Revisão pronta.");
  expect(requests).toEqual([]);
  expect(
    await page.evaluate(() => [localStorage.length, sessionStorage.length]),
  ).toEqual([0, 0]);
  await expect(page).toHaveURL("/contato#orcamento");
});

test("quote form handles multiple equipment items with edit and removal", async ({
  page,
}) => {
  await page.goto("/contato#orcamento");
  await page.getByLabel("Empresa *").fill("Empresa teste");
  await page.getByLabel("Nome *").fill("Teste");
  await page.getByLabel("E-mail *").fill("teste@example.test");
  await page.getByLabel("Cidade/UF *").fill("Cidade de teste/SP");

  await page.getByLabel("Serviço *").selectOption("Calibração");
  await page.getByLabel("Equipamento *").fill("Manômetro digital");
  await page.getByLabel("Fabricante").fill("Fabricante A");
  await page.getByLabel("Modelo").fill("M-1");
  await page.getByLabel("Faixa utilizada/unidade").fill("0 a 10 bar");
  await page.getByLabel("Quantidade *").fill("2");
  await page
    .getByRole("button", { name: "+ Adicionar outro equipamento" })
    .click();

  await page.getByLabel("Serviço *").selectOption("Manutenção");
  await page.getByLabel("Equipamento *").fill("Transmissor de pressão");
  await page.getByLabel("Quantidade *").fill("1");
  await page
    .getByRole("button", { name: "+ Adicionar outro equipamento" })
    .click();
  await expect(page.locator(".equipment-list li")).toHaveCount(2);

  await page
    .locator(".equipment-list li")
    .nth(1)
    .getByRole("button", { name: "Editar" })
    .click();
  await page.getByLabel("Quantidade *").fill("3");
  await page.getByRole("button", { name: "Salvar equipamento" }).click();
  await expect(page.locator(".equipment-list li").nth(1)).toContainText(
    "Quantidade: 3",
  );

  await page
    .locator(".equipment-list li")
    .first()
    .getByRole("button", { name: "Remover" })
    .click();
  await expect(page.locator(".equipment-list li")).toHaveCount(1);
  await expect(page.locator(".equipment-list")).not.toContainText(
    "Manômetro digital",
  );

  await page.getByRole("button", { name: "Revisar solicitação" }).click();
  await expect(page.locator(".quote-review")).toContainText("Empresa teste");
  await expect(page.locator(".quote-review")).toContainText(
    "Manutenção - Transmissor de pressão",
  );
  await expect(page.locator(".quote-review")).toContainText("Quantidade");
  await expect(page.locator(".quote-review")).toContainText("3");
  await page.getByRole("button", { name: "Voltar para editar" }).click();
  await expect(page.locator(".quote-review")).toBeHidden();
  await expect(page.locator(".equipment-list li")).toHaveCount(1);
});

test("no JavaScript keeps navigation usable and form inert", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 800 },
  });
  const page = await context.newPage();
  await page.goto("/contato#orcamento");
  await expect(page.locator("#main-nav")).toBeVisible();
  await expect(page.getByLabel("Empresa *")).toBeDisabled();
  await expect(page.locator("#add-equipment")).toBeHidden();
  await context.close();
});

test("WCAG A/AA automated checks across pilot and 404", async ({ page }) => {
  test.setTimeout(90_000);
  for (const route of [...routes, "/pagina-inexistente"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(
      route === "/pagina-inexistente" ? 404 : 200,
    );
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      result.violations,
      `${route}: ${JSON.stringify(result.violations)}`,
    ).toEqual([]);
  }
});

test("200% text enlargement and reduced motion retain layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
