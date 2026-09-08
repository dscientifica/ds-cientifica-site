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
    description: "Conheça suas medições.",
    href: "/calibracao",
  },
  {
    key: "manutencao",
    title: "Manutenção",
    description: "Cuidado com seus equipamentos.",
    href: "/manutencao",
  },
  {
    key: "qualificacao",
    title: "Qualificação",
    description: "Atenção às condições da sua aplicação.",
    href: "/qualificacao",
  },
  {
    key: "produtos",
    title: "Produtos",
    description: "Instrumentação para sua operação.",
    href: "/produtos",
  },
];
export const principles = [
  "Foco na sua aplicação",
  "Análise técnica de cada demanda",
  "Laboratório e processo na mesma conversa",
];
export const homeSegments = [
  { title: "Farmacêutico", href: "/segmentos/farmaceutico" },
  { title: "Químico", href: "/segmentos/quimico" },
  { title: "Alimentos e Bebidas", href: "/segmentos/alimentos-bebidas" },
  { title: "Automotivo", href: "/segmentos/automotivo" },
  { title: "Hospitalar", href: "/segmentos/hospitalar" },
  { title: "Industrial", href: "/segmentos/industrial" },
];
