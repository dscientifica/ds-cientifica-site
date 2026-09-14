# Preview temporário na Cloudflare Pages

Esta branch é uma prévia de homologação. A configuração em `wrangler.toml` mantém o build como Astro estático (`pnpm build` → `dist/`), usa a página 404 gerada pelo projeto e não declara bindings, variáveis, domínio, DNS ou credenciais.

## Publicar somente a prévia

A publicação precisa ser feita na conta Cloudflare que administra o projeto. O repositório não contém token nem workflow de deploy automático.

1. Em **Workers & Pages**, crie um projeto **Pages** conectado ao GitHub `dscientifica/ds-cientifica-site`.
2. Defina `codex/issue-1-fluxo-piloto` como branch de preview/branch permitida para builds. Mantenha a branch de produção sem alteração e não conecte domínio customizado.
3. Use estas configurações:
   - Framework preset: `Astro` (ou configuração manual equivalente).
   - Root directory: `/`.
   - Build command: `pnpm build`.
   - Build output directory: `dist`.
   - Variáveis/secrets: nenhuma.
4. Salve e execute o build da branch `codex/issue-1-fluxo-piloto`. O Pages fornecerá uma URL `*.pages.dev` de preview; use a URL da implantação da branch para a homologação.

A integração Git do Pages cria previews para branches e pull requests sem alterar a implantação de produção. O Pages também envia `X-Robots-Tag: noindex` em previews; o projeto reforça a proteção com `public/_headers`, `indexable: false`, `noindex, nofollow` e `robots.txt` com `Disallow: /`.

## Limites desta etapa

Não fazer merge do PR #2, não escolher domínio customizado, não alterar DNS, não remover o Google Sites atual e não promover a implantação para produção. Depois da homologação visual, revisar explicitamente o conteúdo, contatos, endereço do AXION, formulário, favicon/logo, política de privacidade e autorização para indexação.
