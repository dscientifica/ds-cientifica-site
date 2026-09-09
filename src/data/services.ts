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
      "Do diagnóstico à solução: suporte técnico para manter sua operação funcionando.",
    intro:
      "Falhas, instabilidade e desgaste podem comprometer medições e interromper a rotina. A DS Científica avalia o equipamento e as condições de uso para identificar o problema e definir o encaminhamento técnico mais adequado.",
    topics: [
      {
        title: "Diagnóstico técnico",
        description:
          "Avaliação dos sintomas, condições de funcionamento e possíveis causas da falha para orientar a intervenção.",
      },
      {
        title: "Manutenção preventiva",
        description:
          "Ações planejadas para conservar o equipamento, reduzir ocorrências de falhas e aumentar a previsibilidade da operação.",
      },
      {
        title: "Manutenção corretiva",
        description:
          "Avaliação e intervenção em equipamentos com falha ou funcionamento inadequado, de acordo com a condição encontrada e a viabilidade técnica.",
      },
      {
        title: "Equipamentos de laboratório",
        description:
          "Suporte técnico para equipamentos utilizados na rotina laboratorial, com avaliação individual da necessidade e da aplicação.",
      },
      {
        title: "Instrumentação de processo",
        description:
          "Diagnóstico e manutenção de instrumentos utilizados em processos industriais, com avaliação técnica de cada aplicação.",
      },
    ],
    benefits: [
      "organiza o caminho entre problema, diagnóstico, avaliação técnica e solução",
      "apoia a decisão entre manutenção, calibração ou substituição do equipamento",
      "maior previsibilidade da rotina com ações preventivas quando aplicáveis",
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
      "Qualificação térmica, mapeamento térmico e avaliação de desempenho de equipamentos conforme aplicação e critérios definidos.",
    heading:
      "Evidências sobre desempenho térmico para decisões técnicas mais seguras.",
    intro:
      "A qualificação organiza informações sobre finalidade do equipamento, condição de uso, carga, distribuição térmica, pontos críticos e documentação necessária. O resultado é apoiar a análise do desempenho em operação e a tomada de decisão do cliente.",
    topics: [
      {
        title: "Qualificação térmica",
        description:
          "Avaliação de equipamentos térmicos conforme finalidade, condição de uso e critérios definidos para a aplicação.",
      },
      {
        title: "Mapeamento térmico",
        description:
          "Levantamento da distribuição de temperatura para entender comportamento, uniformidade e pontos de atenção durante a operação.",
      },
      {
        title: "Desempenho dos equipamentos",
        description:
          "Análise do comportamento observado em relação à rotina de uso e aos critérios informados pelo cliente.",
      },
      {
        title: "Documentação",
        description:
          "Registro organizado das condições avaliadas, resultados observados e informações necessárias para análise do processo.",
      },
      {
        title: "Evidências para decisão técnica",
        description:
          "Informações estruturadas para apoiar ajustes, liberação de uso, investigação de desvio ou planejamento de manutenção.",
      },
    ],
    benefits: [
      "melhora a compreensão sobre o desempenho do equipamento em uso",
      "apoia a análise de pontos críticos, distribuição térmica e critérios internos",
      "organiza evidências para decisões técnicas e documentação do processo",
    ],
    quoteInfo: [
      "tipo de equipamento, volume útil e finalidade",
      "condição operacional usada na rotina",
      "carga representativa, pontos críticos e critérios internos",
      "local, acesso, restrições de operação e documentação esperada",
    ],
  },
};
