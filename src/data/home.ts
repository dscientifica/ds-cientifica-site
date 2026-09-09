export type SolutionKind =
  "calibracao" | "manutencao" | "qualificacao" | "produtos";

export const solutions: {
  key: SolutionKind;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    key: "calibracao",
    title: "Calibração",
    description: "Confiança para suas medições e decisões de processo.",
    href: "/calibracao",
  },
  {
    key: "manutencao",
    title: "Manutenção",
    description: "Diagnóstico e cuidado técnico para manter sua operação funcionando.",
    href: "/manutencao",
  },
  {
    key: "qualificacao",
    title: "Qualificação",
    description: "Evidências para avaliar o desempenho dos seus equipamentos.",
    href: "/qualificacao",
  },
  {
    key: "produtos",
    title: "Produtos",
    description: "Instrumentação selecionada de acordo com a sua aplicação.",
    href: "/produtos",
  },
];

export const principles = [
  "Soluções orientadas à aplicação",
  "Avaliação técnica de cada demanda",
  "Laboratório e processo em uma única parceria",
];
