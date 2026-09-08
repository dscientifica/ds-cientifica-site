import type { SolutionKind } from "./home";
export type ServiceHub = {
  key: SolutionKind;
  title: string;
  description: string;
  heading: string;
  intro: string;
  topics: { title: string; description: string }[];
  benefits: string[];
  quoteInfo: string[];
};
export const serviceHubs: Record<"manutencao" | "qualificacao", ServiceHub> = {
  manutencao: {
    key: "manutencao",
    title: "Manutenção",
    description:
      "Diagnóstico técnico, manutenção preventiva e corretiva para equipamentos de laboratório e instrumentação de processo.",
    heading:
      "Identificar o problema, avaliar tecnicamente e propor a solução adequada.",
    intro:
      "A DS Científica avalia o equipamento, os sintomas observados e as condições de uso para indicar o melhor encaminhamento. O atendimento busca recuperar ou conservar o equipamento quando isso for tecnicamente aplicável, sem assumir capacidades ou resultados antes da análise.",
    topics: [
      {
        title: "Diagnóstico técnico",
        description:
          "Avaliação do equipamento e identificação da causa provável da falha a partir das informações e condições observadas.",
      },
      {
        title: "Manutenção preventiva",
        description:
          "Ações destinadas a conservar o funcionamento e reduzir ocorrências de falhas e paradas.",
      },
      {
        title: "Manutenção corretiva",
        description:
          "Avaliação e intervenção em equipamentos com falha ou funcionamento inadequado, conforme viabilidade técnica.",
      },
      {
        title: "Equipamentos de laboratório",
        description:
          "Atendimento a equipamentos laboratoriais conforme necessidade apresentada e avaliação técnica da aplicação.",
      },
      {
        title: "Instrumentação de processo",
        description:
          "Manutenção e diagnóstico de instrumentos utilizados em processos industriais, respeitando o escopo efetivamente avaliado pela DS Científica.",
      },
    ],
    benefits: [
      "identifica sintomas e evidências antes de definir o encaminhamento",
      "apoia a decisão entre recuperar, conservar, calibrar ou substituir o equipamento",
      "reduz paradas recorrentes quando a manutenção preventiva é tecnicamente aplicável",
    ],
    quoteInfo: [
      "equipamento, fabricante, modelo e identificação",
      "falha observada, frequência e condição de uso",
      "localização, urgência e restrições de parada",
      "histórico de calibração, manutenção ou intervenções anteriores",
    ],
  },
  qualificacao: {
    key: "qualificacao",
    title: "Qualificação",
    description:
      "Qualificação de equipamentos e avaliação de desempenho térmico conforme aplicação e requisitos informados.",
    heading:
      "Evidência organizada para equipamentos críticos de processo e laboratório.",
    intro:
      "A qualificação começa pela finalidade do equipamento, carga de uso, pontos críticos, rotina operacional e critérios internos do cliente. A DS Científica trata o escopo como análise técnica e não assume requisitos não confirmados.",
    topics: [
      {
        title: "Qualificação térmica",
        description:
          "Aplicável a autoclaves, estufas, incubadoras, banhos-maria, banhos termostáticos e equipamentos térmicos, conforme escopo definido.",
      },
      {
        title: "Mapeamento e uso real",
        description:
          "A avaliação considera carga, distribuição, pontos críticos e forma de operação informada pelo cliente.",
      },
      {
        title: "Capelas de exaustão",
        description:
          "Conteúdo e escopo sujeitos à validação técnica da DS antes de publicação detalhada.",
      },
      {
        title: "Documentação",
        description:
          "Resultados devem ser apresentados de forma coerente com objetivo, critérios definidos e condições observadas.",
      },
    ],
    benefits: [
      "melhora a compreensão sobre desempenho do equipamento em uso",
      "apoia análise crítica de pontos críticos e critérios internos",
      "organiza informações para auditorias e decisões de processo",
    ],
    quoteInfo: [
      "tipo de equipamento, volume útil e finalidade",
      "condição operacional usada na rotina",
      "carga representativa, pontos críticos e critérios internos",
      "local, acesso, restrições de operação e documentação esperada",
    ],
  },
};
