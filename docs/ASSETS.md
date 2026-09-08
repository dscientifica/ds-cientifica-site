# Origem dos recursos visuais

## `src/assets/manometro-digital.png` e `public/visuals/manometro-digital.webp`

- Gerado em 07/09/2026 com a ferramenta integrada ImageGen, sem imagem de referência.
- Uso: imagem editorial ilustrativa para páginas de manômetros/pressão enquanto não houver foto autorizada da DS.
- Sem logo, marca, números de faixa ou especificações. Visor desligado.
- Não representa equipamento da DS nem equipamento de fabricante específico.
- Aprovação visual da DS ou substituição por fotografia autorizada permanece pendente.

Prompt utilizado:

> Create one refined photorealistic editorial product illustration for a Brazilian industrial calibration website. Landscape 3:2. A single unbranded digital pressure gauge, brushed stainless steel round body with dark navy protective rim, rectangular LCD screen switched off completely blank (no digits, no units, no specification, no letters), understated buttons without text, metal threaded bottom connection. Gauge angled very slightly, fully visible on the right-center of a pale cool gray studio surface, natural subtle shadow, precision industrial photography, generous empty space around it. No logo, no typography, no brand, no watermark, no analog dial, no extra tools, no laboratory facility. This is an explicitly illustrative generic instrument and must not imply real company equipment.

## `public/visuals/*.webp`

- Placeholders fotográficos abstratos gerados localmente para esta fase pré-produção.
- Não usam imagens de fabricantes, fornecedores, catálogos, bancos externos ou clientes.
- Não contêm logotipos, números de faixa, unidades, modelos, marcas, certificados, ambientes reais ou dados operacionais.
- Uso: ocupar a estrutura visual final com proporção, altura, legenda e `alt` controlados até a DS fornecer fotos licenciadas/autorizadas.
- Substituição futura deve preservar nome, proporção 3:2, texto alternativo adequado e documentação de licença/autorização.

Arquivos atuais:

- `calibracao.webp`
- `manutencao.webp`
- `qualificacao.webp`
- `produtos.webp`
- `segmentos.webp`
- `laboratorio.webp`
- `processo.webp`
- `pressao.webp`
- `temperatura.webp`
- `massa.webp`
- `vazao.webp`
- `dimensional.webp`
- `fisico-quimica.webp`
- `optica-fotometria.webp`
- `cliente.webp`
- `conteudo.webp`

## Marca e tipografia

`Brand.astro` contém somente identificação textual com aviso de logo pendente. `public/favicon.svg` é um marcador de desenvolvimento com sinais de código, não uma proposta de logotipo. Tipografia de sistema: Arial/Helvetica/sans-serif, sem requisições a provedores de fontes.
