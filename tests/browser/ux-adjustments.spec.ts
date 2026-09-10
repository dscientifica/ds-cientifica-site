import { test, expect } from "@playwright/test";

const segmentLinks = [
  ["Farmacêutico", "/segmentos/farmaceutico"],
  ["Químico", "/segmentos/quimico"],
  ["Alimentos e Bebidas", "/segmentos/alimentos-bebidas"],
  ["Automotivo", "/segmentos/automotivo"],
  ["Hospitalar", "/segmentos/hospitalar"],
] as const;

test("segment links work from Home and internal equipment pages", async ({
  page,
}) => {
  for (const [route, industrialLabel] of [
    ["/", "Industrial"],
    ["/calibracao/pressao/manometros", "Outros segmentos industriais"],
  ] as const) {
    await page.goto(route);
    await expect(page.locator("main .segment-links a")).toHaveCount(6);
    for (const [label, path] of [
      ...segmentLinks,
      [industrialLabel, "/segmentos/industrial"] as const,
    ]) {
      await page.goto(route);
      await page
        .locator("main .segment-links")
        .getByRole("link", { name: label, exact: true })
        .click();
      await expect(page).toHaveURL(path);
      await expect(page.locator("h1")).toBeVisible();
    }
  }
});

for (const width of [390, 1280]) {
  test(`review keeps long equipment names readable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contato#orcamento");
    await page.getByLabel("Empresa *").fill("Empresa teste");
    await page.getByLabel("Nome *").fill("Teste");
    await page.getByLabel("E-mail *").fill("teste@example.test");
    await page.getByLabel("Cidade/UF *").fill("Cidade de teste/SP");
    await page.getByLabel("Serviço *").selectOption("Produto");
    await page
      .getByLabel("Equipamento *")
      .fill("Medidor de vazão com totalizador remoto para bancada de processo");
    await page.getByLabel("Fabricante").fill("Fabricante com nome longo");
    await page
      .getByLabel("Modelo")
      .fill("Modelo industrial com identificação longa");
    await page
      .getByLabel("Faixa utilizada/unidade")
      .fill("Faixa e unidade informadas pela aplicação");
    await page.getByLabel("Quantidade *").fill("12");
    await page
      .getByLabel("Observações")
      .fill(
        "Observação em linha própria para conferência antes de uma submissão futura.",
      );
    await page
      .getByRole("button", { name: "+ Adicionar outro equipamento" })
      .click();
    await page.getByRole("button", { name: "Revisar solicitação" }).click();

    const card = page.locator("#review-equipment > li");
    const title = card.locator("h4");
    await expect(title).toHaveText(
      "Produto - Medidor de vazão com totalizador remoto para bancada de processo",
    );
    await expect(card).toContainText("Observações");
    await expect(card).toContainText("Observação em linha própria");
    await expect(card.locator("dt")).toHaveCount(5);
    const layout = await card.evaluate((node) => {
      const title = node.querySelector("h4")!;
      const details = node.querySelector("dl")!;
      const observations = node.querySelector("dd:nth-of-type(5)")!;
      const titleStyle = getComputedStyle(title);
      const detailsStyle = getComputedStyle(details);
      const observationsStyle = getComputedStyle(observations);
      const cardBox = node.getBoundingClientRect();
      const titleBox = title.getBoundingClientRect();
      return {
        wordBreak: titleStyle.wordBreak,
        overflowWrap: titleStyle.overflowWrap,
        hyphens: titleStyle.hyphens,
        titleUsesAvailableWidth: titleBox.width >= cardBox.width * 0.8,
        detailColumns: detailsStyle.gridTemplateColumns
          .split(" ")
          .filter(Boolean).length,
        observationsOwnLine: observationsStyle.gridColumnStart === "1",
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
      };
    });
    expect(layout.wordBreak).toBe("normal");
    expect(layout.overflowWrap).toBe("normal");
    expect(layout.hyphens).toBe("none");
    expect(layout.titleUsesAvailableWidth).toBe(true);
    expect(layout.detailColumns).toBe(width >= 1280 ? 4 : 1);
    expect(layout.observationsOwnLine).toBe(true);
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth);
  });
}
