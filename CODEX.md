# Instruções para o Codex — DS Científica

## Antes de começar
Leia integralmente `SPEC-SITE-DS-CIENTIFICA.md`. Ela é a fonte de verdade funcional e editorial do projeto.

## Tarefa inicial
Implemente a fundação do novo site institucional da DS Científica usando **Astro + TypeScript**, com geração estática e arquitetura simples, rápida e reutilizável.

Em seguida implemente **somente o fluxo-piloto**:

1. `/` — Home
2. `/calibracao` — Hub de Calibração
3. `/calibracao/pressao` — Grandeza Pressão
4. `/calibracao/pressao/manometros` — Calibração de Manômetros

Não replique ainda todas as demais páginas de equipamentos. A DS deverá homologar esse padrão primeiro.

## Fundação obrigatória
- Astro + TypeScript.
- Estrutura de layouts/componentes reutilizáveis.
- Design tokens em CSS variables.
- Mobile-first.
- Header responsivo com menu definido na SPEC.
- Footer reutilizável.
- Breadcrumbs nas páginas internas.
- Componentes reutilizáveis de Hero, cards, CTA, seções, formulário visual e AXION.
- Conteúdo estruturado separado do markup sempre que fizer sentido.
- SEO base por página.
- `robots.txt`, sitemap e página 404.
- Imagens preparadas para otimização/lazy loading.
- Acessibilidade básica e `prefers-reduced-motion`.
- Configuração central para URLs/contatos ainda pendentes.

## Direção visual
Corporativo moderno, laboratório + instrumentação industrial. Branco predominante, azul-marinho estrutural, azul de apoio e magenta/rosa como acento da identidade DS. Cards limpos, bom espaçamento, tipografia sans-serif e poucos efeitos.

Não redesenhe o logotipo. Se o arquivo oficial ainda não estiver no repositório, use um placeholder textual claramente identificado em desenvolvimento e registre a pendência; não gere um logo substituto.

## Conteúdo
Não invente fatos. É proibido inventar ranges, CMC, incertezas, exatidões, capacidades, métodos, normas, certificações, acreditações, escopos, marcas, preços, prazos ou especificações.

Não apresentar a DS como acreditada CGCRE/Inmetro sem evidência/autorização específica.

Não publicar range máximo geral. Quando necessário, usar a mensagem aprovada na SPEC sobre avaliação das características/faixa do instrumento.

Não criar página “Serviços”.

## Formulário
Nesta primeira fase, construir a interface e validação client-side do formulário, mas **não simular envio real** se o backend/destino ainda não estiver definido. Indicar claramente no código/configuração que a integração está pendente.

## AXION
Preparar CTA Área do Cliente / Acessar AXION usando configuração central. Não duplicar certificados ou cronogramas no site público.

## Produção
Não alterar DNS, domínio ou site atual. Não fazer deploy de produção sem autorização explícita. Preview/homologação é permitido quando configurado posteriormente.

## Qualidade antes de concluir
Execute build, lint e verificações disponíveis. Corrija erros. Atualize o README com comandos reais de instalação, desenvolvimento e build após inicializar o projeto.

Ao terminar, informe objetivamente:
- o que foi implementado;
- arquivos/rotas principais;
- comandos executados e resultados;
- pendências factuais/visuais;
- pontos que precisam de homologação da DS antes de expandir o site.
