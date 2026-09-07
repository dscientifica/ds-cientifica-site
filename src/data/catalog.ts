export type CardData = {
  title: string;
  description: string;
  href?: string;
  number?: string;
};
export const rangeMessage =
  "Consulte-nos sobre a faixa e as características do seu instrumento. A DS Científica avalia cada aplicação e apresenta a solução adequada para o serviço.";
export const quantities: CardData[] = [
  {
    title: "Pressão",
    description:
      "Manômetros, vacuômetros, transmissores e outros instrumentos de pressão.",
    href: "/calibracao/pressao",
  },
  {
    title: "Temperatura",
    description: "Termômetros, sensores, indicadores e equipamentos térmicos.",
  },
  {
    title: "Massa",
    description: "Balanças, células de carga e sistemas de pesagem.",
  },
  {
    title: "Vazão",
    description: "Medidores de vazão e instrumentos para processos.",
  },
  {
    title: "Dimensional",
    description:
      "Paquímetros, micrômetros e instrumentos de medição dimensional.",
  },
  {
    title: "Físico-química / Eletroquímica",
    description: "pH, condutividade, ORP e instrumentos multiparâmetros.",
  },
  {
    title: "Óptica / Fotometria",
    description:
      "Espectrofotômetros, turbidímetros, colorímetros e fotômetros.",
  },
];
export const pressureInstruments: CardData[] = [
  {
    title: "Manômetros",
    description:
      "Digitais e analógicos. Conheça as informações necessárias para avaliar seu instrumento.",
    href: "/calibracao/pressao/manometros",
  },
  { title: "Vacuômetros", description: "Instrumentos para medição de vácuo." },
  {
    title: "Manovacuômetros",
    description: "Instrumentos para medição de pressão e vácuo.",
  },
  {
    title: "Transmissores de pressão",
    description: "Medição de pressão e transmissão de sinal em processos.",
  },
  {
    title: "Transmissores de pressão diferencial",
    description: "Medição da diferença de pressão entre dois pontos.",
  },
  {
    title: "Pressostatos",
    description: "Instrumentos de comutação associados à pressão.",
  },
  {
    title: "Válvulas de segurança e alívio",
    description:
      "Avaliação técnica específica da aplicação. Conteúdo sujeito à revisão da DS.",
  },
];
export const segments = [
  "Farmacêutico",
  "Químico",
  "Alimentos e Bebidas",
  "Automotivo",
  "Hospitalar",
  "Outros segmentos industriais",
];
export const gauge = {
  slug: "manometros",
  title: "Calibração de manômetros",
  description:
    "Calibração de manômetros digitais e analógicos: informações do instrumento, análise da aplicação e documentação dos resultados.",
  introduction:
    "Conheça o comportamento do seu instrumento e tenha informações para avaliar suas medições de pressão.",
  types: [
    {
      title: "Manômetros digitais",
      description:
        "A indicação é apresentada em um visor. Informe a unidade, a resolução e a faixa utilizada na aplicação.",
    },
    {
      title: "Manômetros analógicos",
      description:
        "A indicação é lida em uma escala. Informe a faixa, a divisão da escala e as condições de uso.",
    },
  ],
  steps: [
    {
      title: "Entendimento da aplicação",
      description:
        "Identificação do instrumento, faixa utilizada, pontos de interesse e requisitos da medição.",
    },
    {
      title: "Análise técnica",
      description:
        "Definição das condições e da viabilidade do atendimento antes da proposta.",
    },
    {
      title: "Calibração",
      description:
        "Obtenção de indicações do instrumento em relação a valores de referência, nas condições estabelecidas.",
    },
    {
      title: "Resultados documentados",
      description:
        "Resultados e informações pertinentes à avaliação metrológica do instrumento.",
    },
  ],
};
