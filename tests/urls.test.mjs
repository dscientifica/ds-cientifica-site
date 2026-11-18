import { test } from "node:test";
import assert from "node:assert/strict";
import { pageHref } from "../src/utils/urls.ts";

test("public page links use one trailing slash and preserve query/fragment", () => {
  for (const [input, expected] of [
    ["/calibracao", "/calibracao/"],
    ["/calibracao/pressao/manometros/", "/calibracao/pressao/manometros/"],
    ["/contato#orcamento", "/contato/#orcamento"],
    ["/contato?origem=menu#orcamento", "/contato/?origem=menu#orcamento"],
    ["/contato///#orcamento", "/contato/#orcamento"],
    ["/segmentos/farmaceutico", "/segmentos/farmaceutico/"],
  ])
    assert.equal(pageHref(input), expected);
});

test("normalization leaves endpoints, redirects, files and external URLs untouched", () => {
  for (const href of [
    "/",
    "/#conteudo",
    "#orcamento",
    "?origem=menu",
    "/api",
    "/api/orcamento",
    "/api/orcamento?retry=1",
    "/orcamento",
    "/orcamento/",
    "/404",
    "/404.html",
    "/sitemap.xml",
    "/robots.txt",
    "/favicon.ico",
    "/brand/ds-cientifica-logo.png",
    "https://portal.example.test/clientes",
    "//portal.example.test/clientes",
    "mailto:contato@example.test",
    "tel:+551100000000",
  ])
    assert.equal(pageHref(href), href);
});
