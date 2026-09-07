# DS Científica — Site institucional

Fundação em Astro + TypeScript e fluxo-piloto da Issue #1. O Google Sites permanece em produção. Esta implementação não faz deploy nem altera domínio/DNS.

## Documentos de referência

Leia nesta ordem: [SPEC-SITE-DS-CIENTIFICA.md](./SPEC-SITE-DS-CIENTIFICA.md), [CODEX.md](./CODEX.md) e este README. Consulte também [homologação e pendências](./docs/HOMOLOGACAO.md) e [origem dos recursos visuais](./docs/ASSETS.md).

## Executar localmente

Requer Node.js 22.12+ (validado com Node 24) e pnpm 11.19.0, definido em `packageManager`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Abra o endereço local informado pelo Astro. No Astro 7, o servidor pode executar em segundo plano; consulte `pnpm exec astro dev status` e encerre com `pnpm exec astro dev stop`.

```sh
pnpm lint
pnpm build
pnpm test
pnpm exec playwright install chromium
pnpm test:browser
pnpm preview
```

- `lint`: Astro/TypeScript + conferência de formatação Prettier.
- `format`: aplica Prettier; preserva a SPEC e o CODEX.md.
- `build`: gera arquivos estáticos e imagens WebP em `dist/`.
- `test`: verifica o build, links, âncoras, assets, sitemap, SEO e integrações pendentes. Execute após o build.
- `test:browser`: sobe o build em `127.0.0.1:4322` e testa navegação, formulário, acessibilidade automática, seis larguras de tela, texto a 200% e ausência de JavaScript. A porta 4322 precisa estar livre.
- `preview`: abre o build local para revisão; não publica na internet.

O `pnpm-workspace.yaml` permite somente o script de instalação necessário do esbuild. O lockfile está versionado. TypeScript 6 foi escolhido por ser compatível com o peer declarado de `@astrojs/check`.

## Rotas do piloto

| Rota                             | Conteúdo                       |
| -------------------------------- | ------------------------------ |
| `/`                              | Home                           |
| `/calibracao`                    | Hub de grandezas               |
| `/calibracao/pressao`            | Instrumentos de pressão        |
| `/calibracao/pressao/manometros` | Detalhe e roteiro de orçamento |

Há ainda `404.html`, `robots.txt` e `sitemap-index.xml`. Não foram criadas páginas das demais grandezas nem página Serviços. Os itens de menu fora do piloto apontam a seções correspondentes da Home. Cards sem detalhamento não têm links fictícios.

## Estrutura

- `src/config/site.ts`: nome, indexação, navegação e contatos pendentes.
- `src/data/catalog.ts`: grandezas, equipamentos, segmentos e dados do piloto.
- `src/layouts/`: documento HTML/SEO e composição da página de equipamento.
- `src/components/`: Header, Footer, Hero, breadcrumbs, cards, seções, CTA, AXION, imagem e formulário.
- `src/styles/global.css`: tokens de cor/espaçamento, componentes e responsividade.
- `src/assets/`: imagem local otimizada pelo Astro/Sharp.
- `tests/`: regressões sobre os arquivos estáticos e o navegador.
- `.github/workflows/ci.yml`: instalação, lint, build e testes; sem deploy.

O template de equipamento está pilotado para Manômetros/Pressão. Após homologação, extraia o conteúdo específico restante para o catálogo ao adicionar outros equipamentos; mantenha os componentes compartilhados.

## Configurações e limites desta fase

Contatos começam vazios. Preencher `contacts.whatsapp` com dígitos internacionais confirmados habilita o link `wa.me`; preencher `contacts.email` habilita o e-mail. `contacts.axionUrl` aceita um destino HTTPS confirmado. Nenhum contato foi inferido ou preenchido com exemplos.

O formulário valida localmente e não recebe solicitações: sem endpoint, persistência ou upload. A configuração marca a integração pendente; mudar um booleano não implementa envio. Antes de integrá-lo, aprovar privacidade, base legal, retenção, destinatários, validação no servidor e proteção contra spam.

O domínio canônico da SPEC está em `astro.config.mjs`. A prévia usa `indexable: false`, meta `noindex, nofollow` e robots bloqueado. O sitemap prepara as sete rotas aprovadas desta fase e não ativa indexação. Somente após homologação rever essas configurações e autorizar publicação. Não há configuração de deploy automático nem alteração do Google Sites.

## Homologação obrigatória

Logo e favicon oficiais, imagem, textos institucionais/técnicos, contatos, endereço do AXION, formulário real e política de privacidade aguardam DS. Não foi atribuída acreditação, capacidade, faixa geral, preço ou prazo. A aprovação do código não significa aprovação metrológica ou autorização de produção.
