import type { SolutionKind } from "./home";

export type Hub = {
  key: SolutionKind;
  title: string;
  description: string;
  heading: string;
  topics: { title: string; description: string }[];
  note: string;
};

export const hubs: Record<string, Hub> = {
  manutencao: {
    key: "manutencao",
    title: "Manutenção",
    description:
      "Suporte técnico para diagnóstico, manutenção preventiva e corretiva de equipamentos de laboratório e instrumentação de processo.",
    heading:
      "Do diagnóstico à solução: suporte técnico para manter sua operação funcionando.",
    topics: [
      {
        title: "Diagnóstico técnico",
        description:
          "Entendimento do equipamento, dos sintomas e das condições de uso.",
      },
      {
        title: "Manutenção preventiva",
        description:
          "Ações programadas para conservar funcionamento e reduzir falhas.",
      },
      {
        title: "Manutenção corretiva",
        description:
          "Avaliação e intervenção conforme a condição observada do equipamento.",
      },
    ],
    note: "Informe o equipamento, a falha observada e a condição de uso para orientar a avaliação técnica.",
  },
  qualificacao: {
    key: "qualificacao",
    title: "Qualificação",
    description:
      "Qualificação térmica, mapeamento térmico e avaliação de desempenho conforme a aplicação.",
    heading: "Evidências para decisões técnicas sobre equipamentos térmicos.",
    topics: [
      {
        title: "Qualificação térmica",
        description:
          "Avaliação de equipamentos térmicos conforme finalidade e condição de uso.",
      },
      {
        title: "Mapeamento térmico",
        description:
          "Levantamento da distribuição de temperatura e pontos de atenção.",
      },
      {
        title: "Documentação",
        description:
          "Registro das condições avaliadas e resultados observados.",
      },
    ],
    note: "A solicitação deve informar equipamento, uso, carga, pontos críticos e documentação esperada.",
  },
  produtos: {
    key: "produtos",
    title: "Produtos",
    description:
      "Instrumentos e equipamentos para laboratórios e processos industriais.",
    heading: "Seleção orientada pela aplicação.",
    topics: [
      {
        title: "Instrumentação de processo",
        description:
          "Pressão, temperatura, vazão e nível conforme necessidade.",
      },
      {
        title: "Analítica",
        description:
          "Instrumentação para aplicações analíticas e físico-químicas.",
      },
      {
        title: "Equipamentos de laboratório",
        description:
          "Soluções avaliadas conforme rotina e documentação necessária.",
      },
    ],
    note: "Fabricantes, modelos e especificações devem ser confirmados pela DS Científica antes da proposta.",
  },
};
