# DS Científica — Site Institucional

Novo site institucional da DS Científica.

## Status

Projeto em fase de fundação e homologação. O site atual em Google Sites permanece em produção até aprovação explícita do novo projeto.

## Fonte de verdade

Antes de qualquer implementação, leia integralmente [`SPEC-SITE-DS-CIENTIFICA.md`](./SPEC-SITE-DS-CIENTIFICA.md).

A especificação mestre define arquitetura, conteúdo, regras técnicas/comerciais, UX, SEO, integração com AXION e critérios de aceite.

## Stack

- Astro
- TypeScript
- geração estática
- componentes reutilizáveis
- CSS com design tokens/variáveis
- conteúdo desacoplado do código
- GitHub como fonte de verdade
- Cloudflare como destino preferencial de preview/deploy

## Primeira entrega

Implementar e homologar somente o fluxo-piloto:

`Home → Calibração → Pressão → Manômetros`

Não replicar todas as páginas antes da homologação desse fluxo.

## Regras críticas

- Não inventar informações técnicas.
- Não publicar ranges, CMC, incertezas, exatidões ou capacidades sem dados aprovados pela DS.
- Não alegar acreditação CGCRE/Inmetro sem autorização e evidência específica.
- Não criar página genérica “Serviços”.
- Não alterar DNS nem substituir o Google Sites durante o desenvolvimento.
- Usar somente o logotipo oficial fornecido pela DS.
- Manter Área do Cliente separada do site público e direcionada ao AXION.

## Fluxo de desenvolvimento

1. Fundação
2. Fluxo-piloto
3. Homologação
4. Demais grandezas
5. Outras áreas
6. Integrações
7. Preview final
8. Aprovação
9. Migração de domínio
