export type Segment = {
  slug: string;
  title: string;
  navigationLabel: string;
  extendedLabel?: string;
  href: string;
  description: string;
  applications: string[];
  needs: string[];
  relatedRoutes: string[];
};
export const segments: Segment[] = [
  {
    slug: "farmaceutico",
    title: "Farmacêutico",
    navigationLabel: "Farmacêutico",
    href: "/segmentos/farmaceutico",
    description:
      "Soluções para laboratórios, controle de qualidade e processos que dependem de medições documentadas e equipamentos confiáveis.",
    applications: [
      "controle de qualidade",
      "equipamentos térmicos",
      "instrumentação de processo",
    ],
    needs: [
      "rastreabilidade metrológica adequada ao uso",
      "documentação clara para análise crítica",
      "planejamento de calibração, manutenção e qualificação",
    ],
    relatedRoutes: ["/calibracao", "/qualificacao", "/manutencao"],
  },
  {
    slug: "quimico",
    title: "Químico",
    navigationLabel: "Químico",
    href: "/segmentos/quimico",
    description:
      "Atendimento a rotinas de processo, laboratório e utilidades em que pressão, temperatura, vazão e parâmetros analíticos influenciam a operação.",
    applications: [
      "reatores e utilidades",
      "controle analítico",
      "transferência e dosagem",
    ],
    needs: [
      "instrumentos compatíveis com fluido e processo",
      "avaliação de sensores e transmissores",
      "documentação para manutenção e controle",
    ],
    relatedRoutes: ["/calibracao/pressao", "/calibracao/vazao", "/produtos"],
  },
  {
    slug: "alimentos-bebidas",
    title: "Alimentos e Bebidas",
    navigationLabel: "Alimentos e Bebidas",
    href: "/segmentos/alimentos-bebidas",
    description:
      "Soluções para medição, controle e apoio técnico em processos térmicos, utilidades, laboratório e controle de qualidade.",
    applications: [
      "temperatura de processo",
      "vazão e utilidades",
      "controle físico-químico",
    ],
    needs: [
      "seleção adequada de sensores",
      "calibração de instrumentos críticos",
      "manutenção de equipamentos de apoio",
    ],
    relatedRoutes: [
      "/calibracao/temperatura",
      "/calibracao/optica-fotometria",
      "/produtos/equipamentos-de-laboratorio",
    ],
  },
  {
    slug: "automotivo",
    title: "Automotivo",
    navigationLabel: "Automotivo",
    href: "/segmentos/automotivo",
    description:
      "Apoio a áreas de produção, manutenção, laboratório e controle dimensional com instrumentos de medição e processo.",
    applications: [
      "controle dimensional",
      "pressão e utilidades",
      "pesagem e processo",
    ],
    needs: [
      "instrumentos coerentes com tolerâncias internas",
      "calibração documentada",
      "suporte para manutenção e reposição",
    ],
    relatedRoutes: [
      "/calibracao/dimensional",
      "/calibracao/pressao",
      "/manutencao",
    ],
  },
  {
    slug: "hospitalar",
    title: "Hospitalar",
    navigationLabel: "Hospitalar",
    href: "/segmentos/hospitalar",
    description:
      "Soluções para equipamentos, instrumentos e rotinas de apoio que exigem controle técnico e documentação organizada.",
    applications: [
      "equipamentos térmicos",
      "instrumentos de medição",
      "rotinas de apoio técnico",
    ],
    needs: [
      "avaliação por aplicação",
      "documentação clara",
      "planejamento de manutenção e calibração",
    ],
    relatedRoutes: ["/calibracao/temperatura", "/qualificacao", "/manutencao"],
  },
  {
    slug: "industrial",
    title: "Industrial",
    navigationLabel: "Industrial",
    extendedLabel: "Outros segmentos industriais",
    href: "/segmentos/industrial",
    description:
      "Atendimento a operações industriais que utilizam instrumentação de processo, equipamentos de laboratório e medições para tomada de decisão.",
    applications: [
      "utilidades",
      "processos produtivos",
      "laboratório e manutenção",
    ],
    needs: [
      "especificação por variável medida",
      "calibração e documentação",
      "integração entre produto, manutenção e processo",
    ],
    relatedRoutes: ["/calibracao", "/produtos", "/manutencao"],
  },
];
export const segmentBySlug = Object.fromEntries(
  segments.map((segment) => [segment.slug, segment]),
) as Record<string, Segment>;
