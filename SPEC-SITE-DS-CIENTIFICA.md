# SPEC-SITE-DS-CIENTIFICA

**Projeto:** Novo site institucional DS Científica
**Versão:** 1.0 — Especificação mestre inicial
**Objetivo:** documento de referência para implementação pelo Codex, versionamento no GitHub e publicação do novo site da DS Científica.

## 1. Objetivo do projeto
Reconstruir o site institucional da DS Científica fora do Google Sites, com arquitetura moderna, escalável e de fácil manutenção; excelente experiência em celular e desktop; código versionado em GitHub; manutenção futura facilitada pelo Codex; hospedagem estática/de baixo custo; preservação do domínio `www.dscientifica.com.br`; SEO técnico; integração clara com AXION; expansão de produtos; e foco comercial em solicitações de orçamento.

O Google Sites atual deve permanecer ativo durante o desenvolvimento. A troca do domínio somente ocorrerá após homologação e aprovação do novo site.

## 2. Separação de responsabilidades
**Site DS Científica:** público, institucional e comercial. Apresentar empresa, calibração, manutenção, qualificação, produtos, conteúdo técnico, gerar leads e direcionar ao AXION.

**AXION:** ambiente autenticado/operacional do cliente: certificados, equipamentos, histórico, próximas calibrações, cronograma/plano, downloads e funcionalidades futuras.

O site público não deve replicar gerenciamento de certificados. O menu deve conter **Área do Cliente / Acessar AXION**. URL desejável futura: `axion.dscientifica.com.br`, configurável centralmente.

## 3. Menu principal
Não criar página genérica **Serviços**.

1. Início
2. Calibração
3. Manutenção
4. Qualificação
5. Produtos
6. Segmentos
7. Conteúdo Técnico
8. Sobre a DS
9. Contato
10. Área do Cliente

## 4. Arquitetura de Calibração
### Pressão
Vacuômetros; Manovacuômetros; Manômetros digitais e analógicos; Transmissores de pressão; Transmissores de pressão diferencial; Pressostatos; Válvulas de segurança e alívio.

Rotas: `/calibracao/pressao`, `/calibracao/pressao/manometros`, `/calibracao/pressao/vacuometros`, `/calibracao/pressao/manovacuometros`, `/calibracao/pressao/transmissores-de-pressao`, `/calibracao/pressao/transmissores-de-pressao-diferencial`, `/calibracao/pressao/pressostatos`, `/calibracao/pressao/valvulas-de-seguranca-e-alivio`.

### Temperatura
Termômetros digitais e analógicos; Termômetros de líquido em vidro; Pt100/RTD; Termopares; Transmissores; Indicadores; Controladores; Registradores/Data Loggers; Estufas; Incubadoras; Autoclaves; Banhos-maria; Banhos termostáticos; Reatores. Rota-base `/calibracao/temperatura`.

### Massa
Balanças analíticas; semianalíticas; digitais; plataforma; rodoviárias; células de carga; sistemas de pesagem/reatores. Rota-base `/calibracao/massa`.

### Vazão
Eletromagnéticos; Coriolis; ultrassônicos; pressão diferencial; rotâmetros; turbina; Vortex; hidrômetros. Rota-base `/calibracao/vazao`.

### Dimensional
Paquímetros; micrômetros; relógios comparadores; relógios apalpadores; altímetros; réguas graduadas; medidores e padrões de espessura. Rota-base `/calibracao/dimensional`.

### Físico-química / Eletroquímica
pHmetros; condutivímetros; ORP; oxigênio dissolvido; íon-seletivos; TDS; multiparâmetros. Rota-base `/calibracao/fisico-quimica`.

### Óptica / Fotometria
Espectrofotômetros; leitoras ELISA/microplacas; turbidímetros; colorímetros; fotômetros; colorímetros de cloro; fluorímetros; refratômetros. Rota-base `/calibracao/optica-fotometria`.

## 5. Manutenção
Rota `/manutencao`: equipamentos de laboratório; instrumentação de processo; diagnóstico; preventiva; corretiva. Não prometer tecnologias não confirmadas.

## 6. Qualificação
Rota `/qualificacao`. Qualificação térmica: autoclaves, estufas, incubadoras, banhos-maria, banhos termostáticos. Capelas de exaustão: conteúdo técnico sujeito a validação DS.

## 7. Produtos
Rota `/produtos`. Categorias: Pressão, Temperatura, Vazão, Nível, Analítica, Equipamentos de laboratório. Suportar fabricantes, linhas e modelos sem reconstruir navegação.

## 8. Segmentos
Rota `/segmentos`: Farmacêutico, Químico, Alimentos e Bebidas, Automotivo, Hospitalar, Outros segmentos industriais. Não criar afirmações regulatórias não validadas.

## 9. Conteúdo Técnico
Rota `/conteudo-tecnico`. Estrutura para artigos: título, slug, resumo, data, categoria, conteúdo, capa, SEO e links internos. Não mostrar página vazia ao usuário.

## 10. Sobre a DS
Rota `/sobre`. Apresentar atuação em laboratório/processos, soluções, confiabilidade metrológica, segmentos e CTA. Não inventar histórico, números, acreditações, certificações ou estrutura empresarial.

## 11. Contato e orçamento
Rota `/contato`. CTAs: orçamento, WhatsApp, e-mail. Campos previstos: Empresa, Nome, WhatsApp, E-mail, Serviço, Equipamento, Fabricante, Modelo, Faixa, Quantidade, Cidade/UF, Observações e foto/anexo quando tecnicamente implementado. Prever validação, anti-spam e configuração central dos destinos. LGPD obrigatória.

## 12. Templates reutilizáveis
**A — Home:** Header, Hero, Nossas Soluções, Calibração, Manutenção, Qualificação, Produtos, Segmentos, Diferenciais, Conteúdo Técnico, AXION, CTA, Footer.

**B — Hub Calibração:** cards Pressão, Temperatura, Massa, Vazão, Dimensional, Físico-química/Eletroquímica, Óptica/Fotometria.

**C — Grandeza:** breadcrumb, hero, introdução, cards de equipamentos, importância, certificado/rastreabilidade, atendimento, CTA, footer. Em Pressão, Manômetros deve usar imagem de manômetro digital.

**D — Equipamento:** breadcrumb, hero, sobre, tipos, aplicações, como funciona, certificado/rastreabilidade, laboratório/campo quando aplicável, segmentos, CTA, formulário, links relacionados. Piloto: `/calibracao/pressao/manometros`.

**E — Produto:** breadcrumb, nome/modelo, imagens, descrição, aplicações, características, especificações reais, acessórios, downloads, relacionados, orçamento.

## 13. Direção visual
Visual corporativo moderno de laboratório + processo industrial; fundo branco; azul-marinho estrutural; azul de apoio; magenta/rosa da identidade DS como acento; bastante espaço em branco; cards limpos; cantos moderadamente arredondados; ícones técnicos discretos; fotografia profissional; poucos efeitos/animações.

Usar **somente o logotipo oficial da DS**. Não redesenhar, reinterpretar ou gerar automaticamente o logo.

## 14. Responsividade e acessibilidade
Mobile-first. Testar 320px, 375/390px, tablet, desktop e telas largas. Sem scroll horizontal; menu mobile funcional; áreas de toque adequadas; contraste; teclado; foco visível; alt text; HTML semântico; headings hierárquicos; `prefers-reduced-motion`.

## 15. SEO
Cada página indexável: title único, meta description, canonical, Open Graph, sitemap, robots.txt, headings corretos, URLs amigáveis, breadcrumbs, links internos e structured data quando aplicável. Evitar keyword stuffing.

## 16. Regras técnicas e comerciais obrigatórias
### Faixas e capacidades
**Não publicar ranges/faixas máximas de atendimento como limitação geral da DS.** Usar formulação equivalente a: “Consulte-nos sobre a faixa e as características do seu instrumento. A DS Científica avalia cada aplicação e apresenta a solução adequada para o serviço.”

### Proibição de invenção técnica
O site e o Codex não podem inventar: ranges, CMC, incertezas, exatidões, capacidades, métodos, normas aplicáveis, certificações, acreditações, escopos, marcas atendidas, prazos, preços ou especificações de produtos. Informação ausente deve permanecer genérica ou marcada para validação.

### Acreditação
Não apresentar a DS Científica como laboratório acreditado pela CGCRE/Inmetro sem autorização e evidência específica. Linguagem de rastreabilidade somente tecnicamente correta.

### Válvulas / NR-13
Não afirmar automaticamente atendimento integral ou conformidade com todos os requisitos da NR-13. Página exige revisão técnica antes da publicação.

### Parcerias
Não destacar terceirização como mensagem comercial padrão. Foco na solução disponibilizada pela DS com documentação correta.

## 17. Conteúdo e dados
Separar conteúdo estruturado do código. Usar componentes reutilizáveis e evitar copiar páginas quase idênticas. Nova página de equipamento deve ser adicionável com poucas alterações.

## 18. Performance
Site estático/majoritariamente estático; imagens otimizadas; lazy loading; formatos modernos; JavaScript mínimo; evitar bibliotecas pesadas; Core Web Vitals; rapidez em móvel.

## 19. Segurança
Nenhum segredo no repositório; variáveis sensíveis por ambiente; validação/sanitização; dependências atualizadas; links externos seguros; HTTPS em produção.

## 20. Stack definida
**Preferência de implementação: Astro + TypeScript**, geração estática, CSS com variáveis/design tokens, componentes Astro reutilizáveis e conteúdo desacoplado. Git/GitHub, build reproduzível, lint, formatter e README. Evitar arquitetura complexa sem necessidade.

## 21. Hospedagem e deploy
Objetivo de custo mensal zero ou mínimo. Fluxo: `Codex → GitHub → CI/build → preview → produção`. Preferir Cloudflare para hospedagem estática/edge conforme configuração vigente. Não alterar domínio durante desenvolvimento. Criar ambiente temporário de homologação. DNS somente após aprovação, com validação HTTPS e rollback.

## 22. Critérios de aceite
Mobile/desktop; rotas aprovadas sem links quebrados; menu sem Serviços; logo oficial; identidade visual; Home; hub Calibração; Pressão; Manômetros; sem ranges não aprovados; sem invenção técnica; sem acreditação indevida; AXION; CTAs; formulário validado quando backend definido; SEO; sitemap/robots; 404; favicon; performance; sem lorem ipsum; sem dados fictícios em produção; Google Sites permanece até homologação.

## 23. Sequência para o Codex
### Fase 1 — Fundação
Criar projeto Astro + TypeScript; lint/formatter; estrutura; tokens; Header/Footer; componentes; conteúdo estruturado.

### Fase 2 — Fluxo-piloto
Implementar `Home → Calibração → Pressão → Manômetros`. **Homologar antes de replicar.**

### Fase 3 — Demais grandezas
Temperatura, Massa, Vazão, Dimensional, Físico-química, Óptica/Fotometria.

### Fase 4 — Outras áreas
Manutenção, Qualificação, Produtos, Segmentos, Conteúdo Técnico, Sobre, Contato.

### Fase 5 — Integrações
Formulário, WhatsApp, AXION, analytics se aprovado, SEO final.

### Fase 6 — Homologação e produção
Testes, correções, preview, aprovação, domínio, monitoramento inicial.

## 24. Instrução operacional ao Codex
1. Leia integralmente esta especificação antes de alterar código.
2. Não invente conteúdo técnico.
3. Quando faltar informação factual, use placeholder claramente marcado para revisão interna; nunca publique como fato.
4. Preserve a arquitetura.
5. Prefira componentes reutilizáveis.
6. Não crie página “Serviços”.
7. Não publique ranges fixos sem aprovação.
8. Não faça alegações de acreditação.
9. Não altere DNS/produção sem autorização explícita.
10. Implemente primeiro o fluxo-piloto.
11. Mantenha README atualizado.
12. Execute build/lint/testes antes de considerar tarefa concluída.

## 25. Pendências antes da publicação
Logo oficial em arquivo limpo; textos institucionais finais; telefone/WhatsApp; e-mail; endereço se publicado; redes sociais; URL AXION; política de privacidade; LGPD; mecanismo real do formulário; imagens/licenciamento; conteúdo técnico; NR-13; rastreabilidade publicada; catálogo; analytics/cookies.

## 26. Estado aprovado
Arquitetura por grandezas; menu sem Serviços; Home com soluções; hub Calibração; piloto Calibração → Pressão → Manômetros; azul/branco + magenta; Pressão com cards; manômetro digital no card Manômetros; template técnico; sem range fixo; AXION; desenvolvimento sem interromper Google Sites.
