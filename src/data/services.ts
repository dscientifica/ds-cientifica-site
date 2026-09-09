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
    heading: "Do diagnóstico à solução: suporte técnico para manter sua operação funcionando.",
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
      "identificação técnica do problema antes da intervenção",
      "apoio à decisão entre manutenção, calibração ou substituição do equipamento",
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
      "Avaliação documentada do desempenho de equipamentos utilizados em laboratório e processo.",
    heading: "Evidências para conhecer o desempenho do equipamento nas condições de uso.",
    intro:
      "A qualificação considera a finalidade do equipamento, sua condição de operação e os critérios definidos para a aplicação. O objetivo é produzir informações organizadas que apoiem a análise do desempenho e as decisões do processo.",
    topics: [
      {
        title: "Qualificação térmica",
        description:
          "Avaliação de equipamentos térmicos como autoclaves, estufas, incubadoras, banhos-maria e banhos termostáticos, de acordo com o escopo definido para a aplicação.",
      },
      {
        title: "Mapeamento térmico",
        description:
          "Avaliação da distribuição de temperatura e dos pontos de interesse nas condições estabelecidas para o estudo.",
      },
      {
        title: "Capelas de exaustão",
        description:
          "Avaliação definida conforme as características do equipamento, a aplicação e os requisitos informados pelo cliente.",
      },
      {
        title: "Documentação dos resultados",
        description:
          "Organização dos resultados e das condições avaliadas para facilitar análise técnica, rastreabilidade e tomada de decisão.",
      },
    ],
    benefits: [
      "amplia a compreensão sobre o desempenho do equipamento em uso",
      "apoia a identificação e análise de pontos críticos",
      "organiza evidências para decisões técnicas e rotinas de qualidade",
    ],
    quoteInfo: [
      "tipo de equipamento, volume útil e finalidade",
      "condição operacional usada na rotina",
      "carga representativa, pontos críticos e critérios internos",
      "local, acesso, restrições de operação e documentação esperada",
    ],
  },
};
