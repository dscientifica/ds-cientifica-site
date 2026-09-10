# Homologação do fluxo-piloto — Issue #1

Estado: implementação para revisão. Não representa aprovação editorial, metrológica ou autorização para produção.

## Escopo entregue

- `/`: Home com soluções, grandezas, segmentos, conteúdo introdutório, AXION e contato.
- `/calibracao`: sete categorias; apenas Pressão possui página nesta fase.
- `/calibracao/pressao`: sete grupos de instrumentos; apenas Manômetros possui detalhamento.
- `/calibracao/pressao/manometros`: tipos, aplicações, fluxo, documentação, atendimento, segmentos, CTA e formulário de validação.
- 404, sitemap, robots, metadados únicos e breadcrumbs estruturados.

As seções futuras do menu apontam para conteúdo da Home. Categorias sem página são texto identificado, sem links para rotas inexistentes. Não foi criada página Serviços.

## Decisões editoriais e operacionais

- Logo: placeholder textual explicitamente identificado, autorizado pelo CODEX.md. Favicon é um marcador genérico de desenvolvimento, não uma marca DS.
- Fotografia: ilustração de manômetro digital gerada por IA, com legenda explícita. Não representa patrimônio, marca atendida, método ou capacidade da DS. Substituir ou aprovar antes da publicação.
- Contatos: vazios em `src/config/site.ts`. Nenhum dado foi inferido de configuração Git, de outros sistemas ou de exemplos.
- AXION: endereço vazio; o CTA leva à explicação na Home. Nenhum certificado ou ambiente autenticado foi replicado.
- Formulário: somente validação local. Sem backend, `fetch`, armazenamento, anexos, analytics ou cookies da aplicação. Campos ficam desabilitados sem JavaScript, evitando submissão acidental. A confirmação informa que nada foi enviado ou salvo.
- Privacidade: não foi inventada política jurídica nem solicitado consentimento para tratamento inexistente. Política, base legal, destinatários, retenção, proteção contra spam e integração real são pendências para habilitação futura.
- SEO: canonical aponta para o domínio previsto na SPEC, mas `noindex, nofollow` e `robots: Disallow: /` mantêm a prévia fora da indexação. Isso não é controle de acesso; não publicar informações confidenciais.
- Sem alteração de DNS, domínio, Google Sites ou produção. O workflow faz validação e não contém deploy.

## Revisão técnica do conteúdo

O texto comercial não atribui acreditação, CMC, faixa de atendimento, incerteza, método, preço ou prazo à DS. Mantém a avaliação de cada aplicação, sem limite geral inventado.

Os conceitos introdutórios distinguem calibração de ajuste/aprovação e associam rastreabilidade ao resultado de medição. Referências consultadas em 07/09/2026: [VIM 2.39 — calibração](https://jcgm.bipm.org/vim/en/2.39.html) e [VIM 2.41 — rastreabilidade metrológica](https://jcgm.bipm.org/vim/en/2.41.html). Isso não comprova conformidade do laboratório com ISO/IEC 17025 nem substitui a revisão da DS.

Válvulas de segurança e alívio aparecem apenas na relação prevista na SPEC, com conteúdo sujeito a revisão. Não há alegação de atendimento integral à NR-13.

## Pontos de homologação DS

1. Aprovar composição visual, navegação e textos das quatro páginas antes de replicar o template.
2. Fornecer logo oficial e favicon; aprovar/substituir a imagem ilustrativa e sua utilização.
3. Confirmar contatos e URL operacional do AXION.
4. Validar descrição de atuação, segmentos e conteúdo técnico com os documentos da DS.
5. Definir requisitos do formulário real, privacidade e proteção contra spam em tarefa posterior.
6. Configurar preview hospedado quando desejado; revisar imagens e comportamento nos navegadores/dispositivos da operação.
7. Autorizar separadamente a publicação, indexação e futura migração de domínio, com HTTPS e rollback.

## Limites da verificação

Os testes automatizados usam Chromium. Não substituem avaliação com leitores de tela, dispositivos físicos, Safari/Firefox, homologação editorial ou auditoria normativa. Core Web Vitals em produção dependem da hospedagem e do uso real; não foram declarados como aprovados.

Não houve contratação de hospedagem ou custo recorrente novo nesta implementação. O custo de operação futuro depende do provedor e das integrações a serem definidos.
