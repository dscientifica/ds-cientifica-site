export type SegmentRelationGroup = {
  title: string;
  description: string;
  routes: string[];
};
export type Segment = {
  slug: string;
  title: string;
  navigationLabel: string;
  extendedLabel?: string;
  href: string;
  description: string;
  applications: string[];
  solutionRoutes: string[];
  relatedGroups: SegmentRelationGroup[];
};
export const segments: Segment[] = [
  {
    slug: "farmaceutico",
    title: "Farmacêutico",
    navigationLabel: "Farmacêutico",
    href: "/segmentos/farmaceutico",
    description:
      "Medições, equipamentos térmicos e documentação técnica apoiam laboratórios, controle de qualidade, utilidades e processos com rotina controlada.",
    applications: [
      "controle e monitoramento de temperatura em equipamentos térmicos",
      "instrumentos de pressão, vazão e utilidades do processo",
      "análises físico-químicas em laboratório e água de processo",
      "organização de evidências para decisões técnicas sobre equipamentos",
    ],
    solutionRoutes: [
      "/calibracao/temperatura",
      "/calibracao/pressao",
      "/calibracao/fisico-quimica",
      "/qualificacao",
      "/manutencao",
      "/produtos/equipamentos-de-laboratorio",
    ],
    relatedGroups: [
      {
        title: "Temperatura e equipamentos térmicos",
        description:
          "Instrumentos e equipamentos usados em rotinas térmicas de laboratório e processo.",
        routes: [
          "/calibracao/temperatura/termometros-digitais-e-analogicos",
          "/calibracao/temperatura/pt100-rtd",
          "/calibracao/temperatura/termopares",
          "/calibracao/temperatura/registradores-data-loggers",
          "/calibracao/temperatura/autoclaves",
          "/calibracao/temperatura/estufas",
        ],
      },
      {
        title: "Pressão, utilidades e laboratório analítico",
        description:
          "Medições que ajudam a acompanhar utilidades, processo e parâmetros físico-químicos.",
        routes: [
          "/calibracao/pressao/manometros",
          "/calibracao/pressao/transmissores-de-pressao",
          "/calibracao/vazao/eletromagneticos",
          "/calibracao/fisico-quimica/phmetros",
          "/calibracao/fisico-quimica/condutivimetros",
        ],
      },
    ],
  },
  {
    slug: "quimico",
    title: "Químico",
    navigationLabel: "Químico",
    href: "/segmentos/quimico",
    description:
      "Processos químicos dependem de instrumentação para pressão, temperatura, vazão, nível e parâmetros analíticos acompanhados de documentação clara.",
    applications: [
      "linhas de processo, reatores, tanques e utilidades",
      "monitoramento de pressão, pressão diferencial, temperatura e vazão",
      "tratamento ou acompanhamento de água e soluções quando pertinente",
      "seleção de instrumentos conforme fluido, instalação e objetivo da medição",
    ],
    solutionRoutes: [
      "/calibracao/pressao",
      "/calibracao/temperatura",
      "/calibracao/vazao",
      "/produtos/nivel",
      "/calibracao/fisico-quimica",
      "/manutencao",
      "/produtos",
    ],
    relatedGroups: [
      {
        title: "Instrumentação de processo",
        description:
          "Instrumentos relacionados a malhas, linhas, tanques e utilidades.",
        routes: [
          "/calibracao/pressao/manometros",
          "/calibracao/pressao/transmissores-de-pressao",
          "/calibracao/pressao/transmissores-de-pressao-diferencial",
          "/calibracao/temperatura/transmissores-de-temperatura",
          "/produtos/nivel/instrumentos-de-nivel",
        ],
      },
      {
        title: "Vazão e análises",
        description:
          "Medições utilizadas em transferência, dosagem, utilidades e acompanhamento analítico.",
        routes: [
          "/calibracao/vazao/eletromagneticos",
          "/calibracao/vazao/coriolis",
          "/calibracao/fisico-quimica/phmetros",
          "/calibracao/fisico-quimica/condutivimetros",
          "/calibracao/fisico-quimica/orp",
          "/calibracao/fisico-quimica/oxigenio-dissolvido",
        ],
      },
    ],
  },
  {
    slug: "alimentos-bebidas",
    title: "Alimentos e Bebidas",
    navigationLabel: "Alimentos e Bebidas",
    href: "/segmentos/alimentos-bebidas",
    description:
      "Temperatura, vazão, pressão, massa e análises apoiam produção, armazenamento, utilidades, água de processo e controle de qualidade.",
    applications: [
      "controle de temperatura em processo, armazenamento e equipamentos térmicos",
      "vazão, pressão e nível em linhas, tanques e utilidades",
      "pesagem, preparo e rotinas de laboratório",
      "análises físico-químicas e ópticas quando relacionadas ao controle da rotina",
    ],
    solutionRoutes: [
      "/calibracao/temperatura",
      "/calibracao/vazao",
      "/calibracao/pressao",
      "/calibracao/massa",
      "/calibracao/fisico-quimica",
      "/calibracao/optica-fotometria",
      "/qualificacao",
      "/produtos/equipamentos-de-laboratorio",
    ],
    relatedGroups: [
      {
        title: "Processo, utilidades e temperatura",
        description:
          "Instrumentos ligados a controle térmico, circulação, tanques e linhas de processo.",
        routes: [
          "/calibracao/temperatura/termometros-digitais-e-analogicos",
          "/calibracao/temperatura/pt100-rtd",
          "/calibracao/temperatura/transmissores-de-temperatura",
          "/calibracao/vazao/eletromagneticos",
          "/calibracao/pressao/manometros",
          "/produtos/nivel/instrumentos-de-nivel",
        ],
      },
      {
        title: "Laboratório e controle de qualidade",
        description:
          "Equipamentos e medições utilizados em preparo, acompanhamento e análise da rotina.",
        routes: [
          "/calibracao/massa/balancas-analiticas",
          "/calibracao/fisico-quimica/phmetros",
          "/calibracao/fisico-quimica/condutivimetros",
          "/calibracao/optica-fotometria/turbidimetros",
          "/calibracao/optica-fotometria/refratometros",
          "/calibracao/temperatura/estufas",
        ],
      },
    ],
  },
  {
    slug: "automotivo",
    title: "Automotivo",
    navigationLabel: "Automotivo",
    href: "/segmentos/automotivo",
    description:
      "Produção, manutenção, utilidades e controle de qualidade utilizam medições de pressão, temperatura, vazão, massa e dimensional.",
    applications: [
      "linhas de produção, utilidades e monitoramento de processo",
      "controle dimensional em inspeção, manutenção e qualidade",
      "instrumentos de pressão, temperatura e vazão usados na operação",
      "pesagem e medições de apoio para rotinas técnicas",
    ],
    solutionRoutes: [
      "/calibracao/pressao",
      "/calibracao/temperatura",
      "/calibracao/vazao",
      "/calibracao/dimensional",
      "/calibracao/massa",
      "/manutencao",
      "/produtos",
    ],
    relatedGroups: [
      {
        title: "Processo e utilidades",
        description:
          "Instrumentos de campo e bancada relacionados a linhas, utilidades e monitoramento.",
        routes: [
          "/calibracao/pressao/manometros",
          "/calibracao/pressao/transmissores-de-pressao",
          "/calibracao/temperatura/pt100-rtd",
          "/calibracao/temperatura/termopares",
          "/calibracao/vazao/eletromagneticos",
        ],
      },
      {
        title: "Dimensional e massa",
        description:
          "Instrumentos utilizados em inspeção, ajuste, controle de peças e rotinas de apoio.",
        routes: [
          "/calibracao/dimensional/paquimetros",
          "/calibracao/dimensional/micrometros",
          "/calibracao/dimensional/relogios-comparadores",
          "/calibracao/dimensional/medidores-e-padroes-de-espessura",
          "/calibracao/massa/balancas-digitais",
        ],
      },
    ],
  },
  {
    slug: "hospitalar",
    title: "Hospitalar",
    navigationLabel: "Hospitalar",
    href: "/segmentos/hospitalar",
    description:
      "Ambientes técnicos e laboratoriais utilizam equipamentos térmicos, instrumentos de medição e documentação organizada para apoiar a rotina operacional.",
    applications: [
      "equipamentos térmicos e monitoramento de temperatura",
      "instrumentos de medição usados em rotinas técnicas e laboratoriais",
      "pesagem, registro e acompanhamento de equipamentos",
      "qualificação térmica quando a aplicação e os critérios forem definidos",
    ],
    solutionRoutes: [
      "/calibracao/temperatura",
      "/calibracao/pressao",
      "/calibracao/massa",
      "/produtos/equipamentos-de-laboratorio",
      "/qualificacao",
      "/manutencao",
    ],
    relatedGroups: [
      {
        title: "Temperatura e qualificação térmica",
        description:
          "Equipamentos e instrumentos associados a controle, registro e avaliação térmica.",
        routes: [
          "/calibracao/temperatura/termometros-digitais-e-analogicos",
          "/calibracao/temperatura/registradores-data-loggers",
          "/calibracao/temperatura/autoclaves",
          "/calibracao/temperatura/estufas",
          "/calibracao/temperatura/incubadoras",
          "/qualificacao",
        ],
      },
      {
        title: "Laboratório e instrumentos de apoio",
        description:
          "Medições e equipamentos relacionados à rotina técnica e ao controle interno.",
        routes: [
          "/calibracao/massa/balancas-analiticas",
          "/calibracao/pressao/manometros",
          "/calibracao/fisico-quimica/phmetros",
          "/produtos/equipamentos-de-laboratorio/equipamentos-termicos-e-de-apoio",
        ],
      },
    ],
  },
  {
    slug: "industrial",
    title: "Industrial",
    navigationLabel: "Industrial",
    extendedLabel: "Outros segmentos industriais",
    href: "/segmentos/industrial",
    description:
      "Operações industriais reúnem instrumentação de processo, utilidades, medição em laboratório e documentação para decisões de manutenção e controle.",
    applications: [
      "processos industriais, utilidades, tanques e linhas de produção",
      "medição de pressão, pressão diferencial, temperatura, vazão e nível",
      "massa, dimensional e análises em laboratórios industriais",
      "integração entre calibração, manutenção, qualificação e seleção de produtos",
    ],
    solutionRoutes: [
      "/calibracao",
      "/calibracao/pressao",
      "/calibracao/temperatura",
      "/calibracao/vazao",
      "/produtos/nivel",
      "/calibracao/massa",
      "/calibracao/dimensional",
      "/calibracao/fisico-quimica",
      "/manutencao",
      "/produtos",
    ],
    relatedGroups: [
      {
        title: "Instrumentação de processo",
        description:
          "Instrumentos relacionados a variáveis medidas em linhas, tanques, utilidades e sistemas de medição.",
        routes: [
          "/calibracao/pressao/manometros",
          "/calibracao/pressao/transmissores-de-pressao",
          "/calibracao/pressao/transmissores-de-pressao-diferencial",
          "/calibracao/temperatura/transmissores-de-temperatura",
          "/calibracao/vazao/eletromagneticos",
          "/produtos/nivel/instrumentos-de-nivel",
        ],
      },
      {
        title: "Laboratório, massa e dimensional",
        description:
          "Medições usadas em controle, inspeção, manutenção e análise de rotina industrial.",
        routes: [
          "/calibracao/massa/balancas-digitais",
          "/calibracao/dimensional/paquimetros",
          "/calibracao/dimensional/micrometros",
          "/calibracao/fisico-quimica/phmetros",
          "/calibracao/optica-fotometria/turbidimetros",
        ],
      },
    ],
  },
];
export const segmentBySlug = Object.fromEntries(
  segments.map((segment) => [segment.slug, segment]),
) as Record<string, Segment>;
