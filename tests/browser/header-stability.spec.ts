import { test, expect } from "@playwright/test";

type HeaderObservation = {
  mainTops: number[];
  headerLayoutShifts: number[];
  layoutShiftSupported: boolean;
  stop: () => void;
};

declare global {
  interface Window {
    __headerObservation: HeaderObservation;
  }
}

for (const path of ["/contato/", "/calibracao/pressao/manometros/"]) {
  test(`mobile header remains stable during initial rendering: ${path}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 412, height: 823 });
    await page.addInitScript(() => {
      const observation: HeaderObservation = {
        mainTops: [],
        headerLayoutShifts: [],
        layoutShiftSupported:
          PerformanceObserver.supportedEntryTypes.includes("layout-shift"),
        stop: () => {},
      };
      window.__headerObservation = observation;
      const recordShifts = (entries: PerformanceEntry[]) => {
        for (const entry of entries) {
          const shift = entry as PerformanceEntry & {
            hadRecentInput: boolean;
            value: number;
            sources?: { node?: Node }[];
          };
          if (shift.hadRecentInput) continue;
          const main = document.querySelector("main");
          const header = document.querySelector("header");
          if (
            shift.sources?.some(
              ({ node }) => node && (node === main || header?.contains(node)),
            )
          ) {
            observation.headerLayoutShifts.push(shift.value);
          }
        }
      };
      const observer = new PerformanceObserver((list) =>
        recordShifts(list.getEntries()),
      );
      if (observation.layoutShiftSupported)
        observer.observe({ type: "layout-shift", buffered: true });

      let frame: number;
      const sampleMainPosition = () => {
        const main = document.querySelector("main");
        if (main) observation.mainTops.push(main.getBoundingClientRect().top);
        frame = requestAnimationFrame(sampleMainPosition);
      };
      frame = requestAnimationFrame(sampleMainPosition);
      observation.stop = () => {
        cancelAnimationFrame(frame);
        recordShifts(observer.takeRecords());
        observer.disconnect();
      };
    });

    // Hold parsing near the end of the page, giving the browser an early paint
    // while deferred modules wait. This exposes a late menu collapse even on a
    // fast test machine, without changing the production markup or resources.
    await page.route(
      (url) => url.pathname === path,
      async (route) => {
        const response = await route.fetch();
        const html = await response.text();
        expect(html).toContain("</body>");
        await route.fulfill({
          response,
          body: html.replace(
            "</body>",
            '<script src="/__header-paint-hold.js"></script></body>',
          ),
        });
      },
    );
    let releaseParser!: () => void;
    let notifyParserHeld!: () => void;
    const parserReleased = new Promise<void>((resolve) => {
      releaseParser = resolve;
    });
    const parserHeld = new Promise<void>((resolve) => {
      notifyParserHeld = resolve;
    });
    await page.route("**/__header-paint-hold.js", async (route) => {
      notifyParserHeld();
      await parserReleased;
      await route.fulfill({ contentType: "text/javascript", body: "" });
    });

    const navigation = page.goto(path, { waitUntil: "load" });
    try {
      await parserHeld;
      const menu = page.getByRole("button", { name: "Menu" });
      await expect(menu).toBeVisible();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator("#main-nav")).toBeHidden();
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
    } finally {
      releaseParser();
      await navigation;
    }
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    const observation = await page.evaluate(() => {
      window.__headerObservation.stop();
      const { mainTops, headerLayoutShifts, layoutShiftSupported } =
        window.__headerObservation;
      return { mainTops, headerLayoutShifts, layoutShiftSupported };
    });
    await testInfo.attach("header-initial-layout", {
      body: JSON.stringify(observation, null, 2),
      contentType: "application/json",
    });
    expect(observation.layoutShiftSupported).toBe(true);
    expect(observation.mainTops.length).toBeGreaterThanOrEqual(2);
    expect(
      Math.max(...observation.mainTops) - Math.min(...observation.mainTops),
    ).toBeLessThanOrEqual(1);
    expect(
      observation.headerLayoutShifts.reduce((sum, value) => sum + value, 0),
    ).toBeLessThanOrEqual(0.001);
  });
}

test("mobile menu supports keyboard opening, Escape focus and navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 412, height: 823 });
  await page.goto("/calibracao/pressao/manometros/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();

  const menu = page.getByRole("button", { name: "Menu" });
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  await expect(menu).toHaveAttribute("aria-controls", "main-nav");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(nav).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    nav.getByRole("link", { name: "Início", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(nav).toBeHidden();

  await page.keyboard.press("Space");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await nav.getByRole("link", { name: "Calibração", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/calibracao/");
  await expect(page.locator("#main-nav")).toBeHidden();
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("desktop navigation stays visible and mobile toggle stays hidden", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/calibracao/pressao/manometros/");
  await expect(page.locator(".menu-toggle")).toBeHidden();
  await expect(page.locator("#main-nav")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Calibração", exact: true })
    .click();
  await expect(page).toHaveURL("/calibracao/");
});

test("without JavaScript mobile navigation remains visible and usable", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    baseURL: testInfo.project.use.baseURL,
    javaScriptEnabled: false,
    viewport: { width: 320, height: 800 },
  });
  try {
    const page = await context.newPage();
    await page.goto("/calibracao/pressao/manometros/");
    await expect(page.locator(".menu-toggle")).toBeHidden();
    const nav = page.getByRole("navigation", { name: "Navegação principal" });
    await expect(nav).toBeVisible();
    await nav.getByRole("link", { name: "Calibração", exact: true }).click();
    await expect(page).toHaveURL("/calibracao/");
    await expect(page.locator("#main-nav")).toBeVisible();
  } finally {
    await context.close();
  }
});
