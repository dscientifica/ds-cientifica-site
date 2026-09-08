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
      "Diagnóstico, manutenção preventiva e corretiva para equipamentos de laboratório e instrumentação de processo.",
    heading:
      "Manutenção orientada por aplicação, criticidade e histórico de uso.",
    intro:
      "A DS Científica organiza a análise de manutenção a partir do equipamento, dos sintomas observados, do impacto operacional e da viabilidade técnica. O objetivo é reduzir incerteza na decisão e indicar o caminho adequado para reparar, calibrar, substituir ou especificar outro instrumento.",
    topics: [
      {
        title: "Equipamentos de laboratório",
        description:
          "Análise de equipamentos usados em preparo, controle, medição e apoio à rotina laboratorial.",
      },
      {
        title: "Instrumentação de processo",
        description:
          "Avaliação de instrumentos instalados em linhas, utilidades, painéis e sistemas auxiliares.",
      },
      {
        title: "Preventiva",
        description:
          "Organização de cuidados periódicos conforme criticidade, uso e histórico informado.",
      },
      {
        title: "Corretiva e diagnóstico",
        description:
          "Levantamento de falhas, sintomas, condições de instalação e alternativas de encaminhamento técnico.",
      },
    ],
    benefits: [
      "reduz decisões baseadas apenas em tentativa e erro",
      "organiza evidências de falha e histórico do equipamento",
      "apoia priorização entre reparar, calibrar, substituir ou especificar outro instrumento",
    ],
    quoteInfo: [
      "equipamento, fabricante, modelo e identificação",
      "sintoma observado, frequência e condição de uso",
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
