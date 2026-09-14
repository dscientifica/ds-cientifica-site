import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { load } from "cheerio";

const documents = new Map(
  await Promise.all(
    ["/", "/calibracao/pressao/manometros"].map(async (route) => [
      route,
      load(
        await readFile(
          route === "/" ? "dist/index.html" : `dist${route}/index.html`,
          "utf8",
        ),
      ),
    ]),
  ),
);

test("segment links use one reusable structure on Home and internal pages", () => {
  const expectedHome = [
    ["Farmacêutico", "/segmentos/farmaceutico"],
    ["Químico", "/segmentos/quimico"],
    ["Alimentos e Bebidas", "/segmentos/alimentos-bebidas"],
    ["Automotivo", "/segmentos/automotivo"],
    ["Hospitalar", "/segmentos/hospitalar"],
    ["Industrial", "/segmentos/industrial"],
  ];
  const expectedEquipment = [
    ...expectedHome.slice(0, 5),
    ["Outros segmentos industriais", "/segmentos/industrial"],
  ];
  for (const [route, expected] of [
    ["/", expectedHome],
    ["/calibracao/pressao/manometros", expectedEquipment],
  ]) {
    const $ = documents.get(route);
    assert.deepEqual(
      $("main .segment-links a")
        .map((_, el) => [$(el).text().trim(), $(el).attr("href")])
        .get(),
      expected.flat(),
      route,
    );
    assert.equal($("main .segment-links span").length, 0, route);
  }
});
