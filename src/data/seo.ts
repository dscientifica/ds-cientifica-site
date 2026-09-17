export type SeoSection = {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "light" | "white";
  columns?: {
    title: string;
    body: string;
    items?: string[];
  }[];
  links?: {
    label: string;
    href: string;
    description: string;
  }[];
};

export type CalibrationSeoContent = {
  title: string;
  h1: string;
  description: string;
  lead: string;
  sections: SeoSection[];
};

const pressureHub: CalibrationSeoContent = {
  title: "Calibração de Pressão",
  h1: "Calibração de pressão",
  description:
    "Calibração de pressão para manômetros, transmissores, pressostatos, vacuômetros e instrumentos usados em laboratório, utilidades e processo.",
  lead: "A calibração de pressão documenta a relação entre a indicação ou o sinal do instrumento e valores de referência definidos para a aplicação.",
  sections: [
    {
      eyebrow: "Pressão",
      title: "Instrumentos de pressão em laboratório, utilidades e processo.",
      columns: [
        {
          title: "Onde a medição de pressão aparece",
          body: "Medições de pressão apoiam controle de processo, utilidades, manutenção, bancadas, sistemas pressurizados e rotinas de qualidade. A aplicação orienta quais informações são necessárias para avaliar o serviço.",
        },
        {
          title: "O que informar antes da calibração",
          body: "Para avaliar o atendimento, informe tipo de instrumento, faixa utilizada, unidade, resolução, conexão, fluido ou condição de uso e requisitos internos aplicáveis.",
        },
      ],
    },
    {
      eyebrow: "Caminhos relacionados",
      title: "Escolha o instrumento de pressão.",
      tone: "light",
      links: [
        {
          label: "Calibração de manômetros",
          href: "/calibracao/pressao/manometros",
          description:
            "Para manômetros digitais e analógicos usados em indicação direta de pressão.",
        },
        {
          label: "Calibração de transmissores de pressão",
          href: "/calibracao/pressao/transmissores-de-pressao",
          description:
            "Para instrumentos que convertem pressão em sinal para controle, indicação ou registro.",
        },
        {
          label: "Calibração de pressostatos",
          href: "/calibracao/pressao/pressostatos",
          description:
            "Para instrumentos de comutação por ponto de pressão e retorno.",
        },
      ],
    },
  ],
};

const temperatureHub: CalibrationSeoContent = {
  title: "Calibração de Temperatura",
  h1: "Calibração de temperatura",
  description:
    "Calibração de temperatura para termômetros, Pt100, RTD, termopares, transmissores, registradores e equipamentos térmicos conforme aplicação.",
  lead: "A calibração de temperatura apoia a análise de sensores, indicadores, transmissores, registradores e equipamentos térmicos usados em laboratório e processo.",
  sections: [
    {
      eyebrow: "Temperatura",
      title: "Medições térmicas dependem do sensor, do equipamento e do uso.",
      columns: [
        {
          title: "Onde a temperatura influencia a rotina",
          body: "Temperatura pode afetar conservação, incubação, secagem, esterilização, reação, controle ambiental e processos industriais. A calibração ajuda a documentar o comportamento observado nos pontos definidos para a aplicação.",
        },
        {
          title: "Dados importantes para análise",
          body: "Informe tipo de sensor ou equipamento, faixa utilizada, pontos de interesse, resolução, montagem, condição de uso, carga quando aplicável e documentação esperada.",
        },
      ],
    },
    {
      eyebrow: "Sensores e instrumentos",
      title: "Sensor de temperatura não é uma única aplicação.",
      tone: "light",
      columns: [
        {
          title: "Pt100, RTD e termopares",
          body: "A intenção de busca por calibração de sensor de temperatura deve ser direcionada para o tipo de sensor. Pt100/RTD e termopares têm princípios e informações de aplicação diferentes.",
        },
        {
          title: "Transmissores e registradores",
          body: "Além do sensor, o instrumento pode converter, indicar ou registrar o sinal. Nesses casos, entrada, saída, configuração e uso previsto ajudam a definir a avaliação.",
        },
      ],
    },
    {
      eyebrow: "Caminhos relacionados",
      title: "Escolha o instrumento de temperatura.",
      links: [
        {
          label: "Calibração de Pt100 e RTD",
          href: "/calibracao/temperatura/pt100-rtd",
          description:
            "Para sensores resistivos usados em equipamentos térmicos, aquisição e processos.",
        },
        {
          label: "Calibração de termopares",
          href: "/calibracao/temperatura/termopares",
          description:
            "Para sensores termoelétricos definidos por tipo, montagem e ponto de medição.",
        },
        {
          label: "Calibração de transmissores de temperatura",
          href: "/calibracao/temperatura/transmissores-de-temperatura",
          description:
            "Para instrumentos que convertem sinal térmico em saída para controle ou registro.",
        },
      ],
    },
  ],
};

export const calibrationQuantitySeo: Record<
  string,
  CalibrationSeoContent | undefined
> = {
  pressao: pressureHub,
  temperatura: temperatureHub,
};

export const calibrationEquipmentSeo: Record<
  string,
  CalibrationSeoContent | undefined
> = {
  "pressao/manometros": {
    title: "Calibração de Manômetros",
    h1: "Calibração de manômetros",
    description:
      "Calibração de manômetros digitais e analógicos para aplicações de laboratório, utilidades e processo. Informe faixa, unidade e condição de uso.",
    lead: "Manômetros digitais e analógicos indicam pressão diretamente no ponto de uso. A calibração de manômetros ajuda a comparar a indicação do instrumento com valores de referência definidos para a aplicação.",
    sections: [
      {
        eyebrow: "Manômetros",
        title: "Indicação direta de pressão para rotina técnica.",
        columns: [
          {
            title: "Manômetro digital e manômetro analógico",
            body: "A página contempla manômetros digitais e analógicos, sem separar rotas por tipo. A diferença de construção, resolução, unidade e escala deve ser considerada na avaliação do serviço.",
          },
          {
            title: "Onde são utilizados",
            body: "Manômetros aparecem em linhas de processo, bancadas, utilidades, sistemas pneumáticos, equipamentos pressurizados e rotinas de manutenção ou inspeção.",
          },
        ],
      },
      {
        eyebrow: "Avaliação do serviço",
        title: "Informações que ajudam a avaliar a calibração de manômetro.",
        tone: "light",
        columns: [
          {
            title: "Dados do instrumento",
            body: "Informe fabricante, modelo, identificação, faixa usada, unidade, resolução, tipo de conexão e condição de uso.",
          },
          {
            title: "Resultado esperado",
            body: "A calibração organiza dados para análise crítica da medição, incluindo indicação, erro observado, incerteza informada no certificado e critérios definidos pelo cliente quando aplicáveis.",
          },
        ],
      },
      {
        eyebrow: "Pressão",
        title: "Equipamentos relacionados.",
        links: [
          {
            label: "Calibração de transmissores de pressão",
            href: "/calibracao/pressao/transmissores-de-pressao",
            description:
              "Quando a pressão é convertida em sinal para controle, indicação ou registro.",
          },
          {
            label: "Calibração de pressostatos",
            href: "/calibracao/pressao/pressostatos",
            description:
              "Quando o instrumento atua por ponto de comutação e retorno.",
          },
        ],
      },
    ],
  },
  "pressao/transmissores-de-pressao": {
    title: "Calibração de Transmissores de Pressão",
    h1: "Calibração de transmissores de pressão",
    description:
      "Calibração de transmissores de pressão conforme aplicação, faixa configurada, sinal de saída, alimentação e condição de uso informada.",
    lead: "Transmissores de pressão convertem a pressão aplicada em um sinal usado por sistemas de controle, supervisão, indicação ou registro.",
    sections: [
      {
        eyebrow: "Transmissores de pressão",
        title: "Pressão convertida em sinal para a operação.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "São usados em malhas de controle, supervisórios, skids, utilidades, linhas de processo e equipamentos que dependem de monitoramento de pressão.",
          },
          {
            title: "O que observar",
            body: "A avaliação deve considerar faixa configurada, unidade, sinal de saída, alimentação, conexão, condição de instalação e requisitos internos do processo.",
          },
        ],
      },
      {
        eyebrow: "Calibração",
        title: "Como o serviço é avaliado em linhas gerais.",
        tone: "light",
        columns: [
          {
            title: "Entrada e saída",
            body: "A calibração relaciona a pressão aplicada ao sinal indicado ou transmitido, conforme os pontos definidos para a aplicação.",
          },
          {
            title: "Documentação",
            body: "Os resultados devem ser analisados com incerteza de medição, condição do serviço e critério de aceitação definido pelo cliente quando aplicável.",
          },
        ],
      },
      {
        eyebrow: "Pressão",
        title: "Instrumentos relacionados.",
        links: [
          {
            label: "Calibração de transmissores de pressão diferencial",
            href: "/calibracao/pressao/transmissores-de-pressao-diferencial",
            description:
              "Para transmissores que medem diferença de pressão entre dois pontos.",
          },
          {
            label: "Calibração de manômetros",
            href: "/calibracao/pressao/manometros",
            description:
              "Para indicação direta local em manômetros digitais e analógicos.",
          },
        ],
      },
    ],
  },
  "pressao/transmissores-de-pressao-diferencial": {
    title: "Calibração de Transmissores de Pressão Diferencial",
    h1: "Calibração de transmissores de pressão diferencial",
    description:
      "Calibração de transmissores de pressão diferencial para instrumentos que medem diferença de pressão entre dois pontos conforme aplicação.",
    lead: "Transmissores de pressão diferencial medem a diferença de pressão entre dois pontos e convertem essa condição em sinal para monitoramento, controle ou registro.",
    sections: [
      {
        eyebrow: "Pressão diferencial",
        title: "Instrumento de pressão diferencial, não página de vazão.",
        columns: [
          {
            title: "Diferença de intenção",
            body: "Esta página trata da calibração do transmissor de pressão diferencial. A página de vazão por pressão diferencial trata da aplicação do diferencial de pressão na medição de vazão.",
          },
          {
            title: "Onde pode aparecer",
            body: "Transmissores diferenciais podem aparecer em filtros, nível por diferencial, monitoramento de perda de carga e aplicações em que dois pontos de pressão precisam ser comparados.",
          },
        ],
      },
      {
        eyebrow: "Avaliação do serviço",
        title: "Informações para especificar a calibração.",
        tone: "light",
        columns: [
          {
            title: "Dados principais",
            body: "Informe faixa diferencial, unidade, sinal de saída, alimentação, conexão, configuração e condição de uso.",
          },
          {
            title: "Análise dos resultados",
            body: "A documentação deve permitir comparar a resposta do instrumento com valores de referência e interpretar o resultado conforme incerteza, condição e critério aplicável.",
          },
        ],
      },
      {
        eyebrow: "Caminho complementar",
        title: "Quando a busca for sobre medição de vazão.",
        links: [
          {
            label: "Medidores por pressão diferencial em vazão",
            href: "/calibracao/vazao/pressao-diferencial",
            description:
              "Para aplicações em que o diferencial de pressão é usado como parte da medição de vazão.",
          },
        ],
      },
    ],
  },
  "pressao/pressostatos": {
    title: "Calibração de Pressostatos",
    h1: "Calibração de pressostatos",
    description:
      "Calibração de pressostatos considerando ponto de atuação, retorno, tipo de contato, faixa utilizada e aplicação informada pelo cliente.",
    lead: "Pressostatos são instrumentos de comutação por pressão. A calibração de pressostatos avalia pontos de atuação e retorno conforme a aplicação e os critérios definidos.",
    sections: [
      {
        eyebrow: "Pressostatos",
        title: "Comutação por pressão para alarme, controle ou proteção.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Pressostatos podem atuar em alarmes, intertravamentos, bombas, utilidades e sistemas em que uma condição de pressão precisa acionar ou interromper uma função.",
          },
          {
            title: "O que diferencia o instrumento",
            body: "Além da faixa, é importante informar tipo de contato, ponto de atuação, retorno, histerese esperada quando aplicável e condição de uso.",
          },
        ],
      },
      {
        eyebrow: "Avaliação",
        title: "O que a calibração ajuda a conferir.",
        tone: "light",
        columns: [
          {
            title: "Atuação e retorno",
            body: "O serviço deve organizar informações sobre o comportamento do pressostato nos pontos definidos, sem assumir aprovação automática antes da análise do critério aplicável.",
          },
          {
            title: "Documentação",
            body: "A interpretação deve considerar condição do serviço, incerteza informada e requisitos internos do cliente quando houver declaração de conformidade.",
          },
        ],
      },
      {
        eyebrow: "Pressão",
        title: "Outros instrumentos relacionados.",
        links: [
          {
            label: "Calibração de manômetros",
            href: "/calibracao/pressao/manometros",
            description: "Para instrumentos de indicação direta de pressão.",
          },
          {
            label: "Calibração de transmissores de pressão",
            href: "/calibracao/pressao/transmissores-de-pressao",
            description: "Para instrumentos que convertem pressão em sinal.",
          },
        ],
      },
    ],
  },
  "pressao/vacuometros": {
    title: "Calibração de Vacuômetros",
    h1: "Calibração de vacuômetros",
    description:
      "Calibração de vacuômetros para instrumentos usados em medição de vácuo. Informe unidade, faixa utilizada, conexão e condição de uso.",
    lead: "Vacuômetros indicam pressão abaixo da pressão atmosférica. A calibração de vacuômetros ajuda a avaliar a indicação do instrumento nos pontos de vácuo definidos para a aplicação.",
    sections: [
      {
        eyebrow: "Vácuo",
        title: "Medição de vácuo em sistemas técnicos e laboratoriais.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Vacuômetros podem aparecer em sistemas de vácuo, secagem, bombas, bancadas, equipamentos de laboratório e rotinas de manutenção que dependem de pressão abaixo da atmosférica.",
          },
          {
            title: "O que informar",
            body: "Informe unidade de indicação, faixa utilizada, conexão, identificação do instrumento, condição de uso e pontos de interesse para avaliação.",
          },
        ],
      },
      {
        eyebrow: "Calibração",
        title: "Resultado para análise da medição de vácuo.",
        tone: "light",
        columns: [
          {
            title: "Interpretação",
            body: "A documentação deve permitir comparar a indicação do vacuômetro com valores de referência e analisar o resultado conforme incerteza e critério informado quando aplicável.",
          },
          {
            title: "Instrumentos próximos",
            body: "Quando o instrumento trabalha com pressão positiva e vácuo, a página de manovacuômetros pode representar melhor a intenção de busca.",
          },
        ],
      },
      {
        eyebrow: "Pressão",
        title: "Caminhos relacionados.",
        links: [
          {
            label: "Calibração de manovacuômetros",
            href: "/calibracao/pressao/manovacuometros",
            description:
              "Para instrumentos que combinam leitura de pressão positiva e vácuo.",
          },
          {
            label: "Calibração de manômetros",
            href: "/calibracao/pressao/manometros",
            description:
              "Para instrumentos de indicação direta de pressão positiva.",
          },
        ],
      },
    ],
  },
  "pressao/manovacuometros": {
    title: "Calibração de Manovacuômetros",
    h1: "Calibração de manovacuômetros",
    description:
      "Calibração de manovacuômetros para instrumentos que indicam pressão positiva e vácuo conforme escala, unidade e aplicação.",
    lead: "Manovacuômetros combinam indicação de pressão positiva e vácuo. A avaliação deve considerar os dois regimes usados na aplicação.",
    sections: [
      {
        eyebrow: "Pressão e vácuo",
        title: "Um instrumento para dois regimes de medição.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Manovacuômetros podem ser usados em ciclos de pressurização, sistemas pneumáticos, bombas, bancadas e aplicações que alternam entre pressão positiva e vácuo.",
          },
          {
            title: "O que informar",
            body: "Informe escala, unidade, pontos de pressão, pontos de vácuo, conexão, identificação e condição de uso do instrumento.",
          },
        ],
      },
      {
        eyebrow: "Calibração",
        title: "Avaliação separada dos pontos usados.",
        tone: "light",
        columns: [
          {
            title: "Pressão positiva",
            body: "Os pontos de pressão devem representar a aplicação real e os requisitos de análise definidos pelo cliente.",
          },
          {
            title: "Vácuo",
            body: "Os pontos de vácuo também precisam ser definidos conforme a rotina de uso, unidade indicada e faixa efetivamente utilizada.",
          },
        ],
      },
      {
        eyebrow: "Pressão",
        title: "Instrumentos relacionados.",
        links: [
          {
            label: "Calibração de vacuômetros",
            href: "/calibracao/pressao/vacuometros",
            description: "Para instrumentos dedicados à medição de vácuo.",
          },
          {
            label: "Calibração de manômetros",
            href: "/calibracao/pressao/manometros",
            description: "Para instrumentos dedicados à indicação de pressão.",
          },
        ],
      },
    ],
  },
  "pressao/valvulas-de-seguranca-e-alivio": {
    title: "Avaliação de Válvulas de Segurança e Alívio",
    h1: "Avaliação de válvulas de segurança e alívio",
    description:
      "Avaliação técnica de válvulas de segurança e alívio conforme tipo, fluido, pressão de ajuste informada e documentação requerida.",
    lead: "Válvulas de segurança e alívio são dispositivos associados à proteção contra sobrepressão. Qualquer avaliação deve ser tratada de forma conservadora, conforme tipo de válvula, aplicação e documentação requerida.",
    sections: [
      {
        eyebrow: "Segurança e alívio",
        title: "Dispositivos de proteção exigem análise cuidadosa.",
        columns: [
          {
            title: "Informações necessárias",
            body: "Informe tipo de válvula, identificação, fluido, pressão de ajuste informada, aplicação, condição de uso e documentação esperada.",
          },
          {
            title: "Limite da comunicação pública",
            body: "Esta página não afirma certificação, acreditação, enquadramento normativo ou capacidade específica. A DS Científica avalia a solicitação antes de definir o encaminhamento adequado.",
          },
        ],
      },
      {
        eyebrow: "Avaliação",
        title: "Critérios precisam estar definidos antes da conclusão.",
        tone: "light",
        columns: [
          {
            title: "Documentação e decisão",
            body: "Quando aplicável, critérios de aceitação, regra de decisão e requisitos documentais devem ser definidos para análise de conformidade.",
          },
          {
            title: "Aplicação",
            body: "A condição do sistema, fluido, histórico e finalidade da válvula influenciam a análise técnica e a viabilidade do atendimento.",
          },
        ],
      },
      {
        eyebrow: "Pressão",
        title: "Instrumentos de pressão relacionados.",
        links: [
          {
            label: "Calibração de manômetros",
            href: "/calibracao/pressao/manometros",
            description:
              "Para indicação direta de pressão em sistemas e bancadas.",
          },
          {
            label: "Calibração de pressostatos",
            href: "/calibracao/pressao/pressostatos",
            description: "Para instrumentos de atuação por ponto de pressão.",
          },
        ],
      },
    ],
  },
  "temperatura/termometros-digitais-e-analogicos": {
    title: "Calibração de Termômetros",
    h1: "Calibração de termômetros",
    description:
      "Calibração de termômetros digitais e analógicos usados em laboratório, processo, inspeção e equipamentos térmicos conforme aplicação.",
    lead: "Termômetros digitais e analógicos indicam temperatura para controle, inspeção, rotina laboratorial e acompanhamento de processos térmicos.",
    sections: [
      {
        eyebrow: "Termômetros",
        title: "Indicação de temperatura para decisão técnica.",
        columns: [
          {
            title: "Tipos contemplados",
            body: "A página contempla termômetros digitais e analógicos. Tipo de sensor, resolução, forma de leitura, faixa usada e condição de imersão ou contato influenciam a avaliação.",
          },
          {
            title: "Onde são utilizados",
            body: "Podem ser usados em ambientes, banhos, estufas, processos térmicos, inspeções, laboratórios e rotinas de controle.",
          },
        ],
      },
      {
        eyebrow: "Calibração",
        title: "Informações importantes para o orçamento.",
        tone: "light",
        columns: [
          {
            title: "Dados do instrumento",
            body: "Informe fabricante, modelo, identificação, faixa usada, resolução, tipo de sensor e pontos de interesse.",
          },
          {
            title: "Aplicação",
            body: "Explique onde o termômetro é utilizado e se há critério interno de aceitação, requisito documental ou condição específica de uso.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Sensores e instrumentos relacionados.",
        links: [
          {
            label: "Calibração de Pt100 e RTD",
            href: "/calibracao/temperatura/pt100-rtd",
            description:
              "Para sensores resistivos usados em equipamentos e processos.",
          },
          {
            label: "Calibração de termopares",
            href: "/calibracao/temperatura/termopares",
            description:
              "Para sensores termoelétricos definidos por tipo e aplicação.",
          },
        ],
      },
    ],
  },
  "temperatura/termometros-de-liquido-em-vidro": {
    title: "Calibração de Termômetros de Líquido em Vidro",
    h1: "Calibração de termômetros de líquido em vidro",
    description:
      "Calibração de termômetros de líquido em vidro conforme escala, divisão, imersão, faixa utilizada e aplicação informada.",
    lead: "Termômetros de líquido em vidro utilizam escala graduada para indicação de temperatura. A calibração deve considerar escala, divisão, imersão e condição de uso.",
    sections: [
      {
        eyebrow: "Termômetros de vidro",
        title: "Leitura por escala graduada em rotinas térmicas.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Podem aparecer em laboratórios, banhos, controle de rotina, preparo de soluções e acompanhamentos térmicos que dependem de leitura visual.",
          },
          {
            title: "O que informar",
            body: "Informe escala, divisão, faixa utilizada, condição de imersão, identificação do instrumento e pontos de interesse.",
          },
        ],
      },
      {
        eyebrow: "Calibração",
        title: "A forma de leitura influencia a análise.",
        tone: "light",
        columns: [
          {
            title: "Escala e divisão",
            body: "A resolução de leitura, a escala e a condição física do instrumento ajudam a definir a avaliação.",
          },
          {
            title: "Documentação",
            body: "Os resultados devem ser interpretados com a incerteza informada e os critérios do cliente quando houver avaliação de conformidade.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Instrumentos relacionados.",
        links: [
          {
            label: "Calibração de termômetros",
            href: "/calibracao/temperatura/termometros-digitais-e-analogicos",
            description:
              "Para termômetros digitais e analógicos usados em laboratório e processo.",
          },
          {
            label: "Calibração de temperatura",
            href: "/calibracao/temperatura",
            description:
              "Para navegar por sensores, indicadores, registradores e equipamentos térmicos.",
          },
        ],
      },
    ],
  },
  "temperatura/pt100-rtd": {
    title: "Calibração de Pt100 e RTD",
    h1: "Calibração de Pt100 e sensores RTD",
    description:
      "Calibração de Pt100, RTD e sensores de temperatura resistivos conforme tipo de ligação, montagem, pontos de uso e aplicação térmica.",
    lead: "Pt100 e RTD são sensores resistivos de temperatura. A calibração de Pt100 relaciona a resposta do sensor aos pontos de temperatura definidos para a aplicação.",
    sections: [
      {
        eyebrow: "Pt100 e RTD",
        title: "Sensor de temperatura resistivo para equipamentos e processos.",
        columns: [
          {
            title: "Intenção de busca",
            body: "Quando o cliente procura calibração de sensor de temperatura, muitas vezes a aplicação envolve Pt100, RTD ou termopar. Esta página concentra a intenção relacionada a sensores resistivos.",
          },
          {
            title: "Onde são utilizados",
            body: "Sensores Pt100 e RTD aparecem em equipamentos térmicos, aquisição de dados, processos, reatores, utilidades e sistemas de controle.",
          },
        ],
      },
      {
        eyebrow: "Avaliação",
        title: "Informações que mudam a análise.",
        tone: "light",
        columns: [
          {
            title: "Configuração do sensor",
            body: "Informe tipo de ligação, montagem, comprimento, proteção, pontos de uso, faixa utilizada e condição de instalação.",
          },
          {
            title: "Resultado metrológico",
            body: "A documentação deve apoiar a análise do comportamento do sensor nos pontos definidos, considerando incerteza e critério do cliente quando aplicável.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Outros caminhos relacionados.",
        links: [
          {
            label: "Calibração de termopares",
            href: "/calibracao/temperatura/termopares",
            description:
              "Para sensores termoelétricos usados em fornos, reatores e linhas.",
          },
          {
            label: "Calibração de transmissores de temperatura",
            href: "/calibracao/temperatura/transmissores-de-temperatura",
            description:
              "Para instrumentos que recebem sinal de sensor e fornecem saída para controle ou registro.",
          },
        ],
      },
    ],
  },
  "temperatura/termopares": {
    title: "Calibração de Termopares",
    h1: "Calibração de termopares",
    description:
      "Calibração de termopares conforme tipo, montagem, conexão, ponto de medição, faixa utilizada e condição de aplicação informada.",
    lead: "Termopares são sensores termoelétricos usados em medições térmicas de equipamentos, linhas e processos. A avaliação depende do tipo e da condição de uso.",
    sections: [
      {
        eyebrow: "Termopares",
        title: "Sensor termoelétrico para aplicações térmicas.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Termopares aparecem em fornos, reatores, linhas, equipamentos térmicos, bancadas e sistemas de aquisição ou controle.",
          },
          {
            title: "Tipos e aplicação",
            body: "O tipo de termopar, montagem, junta de medição, conexão e ponto de uso ajudam a definir a avaliação. A DS Científica analisa cada aplicação antes de propor o serviço.",
          },
        ],
      },
      {
        eyebrow: "Calibração",
        title: "O que informar para avaliar o serviço.",
        tone: "light",
        columns: [
          {
            title: "Dados técnicos necessários",
            body: "Informe tipo do termopar, faixa usada, pontos de interesse, comprimento, montagem, conexão e condição de uso.",
          },
          {
            title: "Documentação",
            body: "O resultado deve permitir avaliar a resposta do sensor em relação aos pontos definidos, com incerteza e critérios aplicáveis quando informados.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Instrumentos relacionados.",
        links: [
          {
            label: "Calibração de Pt100 e RTD",
            href: "/calibracao/temperatura/pt100-rtd",
            description: "Para sensores resistivos de temperatura.",
          },
          {
            label: "Calibração de transmissores de temperatura",
            href: "/calibracao/temperatura/transmissores-de-temperatura",
            description:
              "Para conversão de sinal térmico em saída de controle ou registro.",
          },
        ],
      },
    ],
  },
  "temperatura/transmissores-de-temperatura": {
    title: "Calibração de Transmissores de Temperatura",
    h1: "Calibração de transmissores de temperatura",
    description:
      "Calibração de transmissores de temperatura conforme entrada, saída, configuração, sensor associado e aplicação térmica informada.",
    lead: "Transmissores de temperatura recebem sinal de sensores térmicos e convertem essa informação em saída para controle, supervisão, indicação ou registro.",
    sections: [
      {
        eyebrow: "Transmissores de temperatura",
        title: "Conversão de sinal térmico para controle e registro.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "São usados em malhas de controle, supervisão, automação, equipamentos térmicos e processos que dependem de sinal padronizado ou indicação remota.",
          },
          {
            title: "O que observar",
            body: "Entrada, tipo de sensor, saída, configuração, alimentação, unidade e pontos de operação ajudam a definir a avaliação.",
          },
        ],
      },
      {
        eyebrow: "Calibração",
        title: "Entrada, saída e configuração precisam ser compreendidas.",
        tone: "light",
        columns: [
          {
            title: "Relação entre sensor e sinal",
            body: "A calibração deve considerar como o transmissor interpreta a entrada térmica e apresenta a saída configurada para a aplicação.",
          },
          {
            title: "Documentação",
            body: "O resultado deve apoiar a análise crítica do comportamento do instrumento, com incerteza de medição e critérios do cliente quando aplicáveis.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Sensores relacionados.",
        links: [
          {
            label: "Calibração de Pt100 e RTD",
            href: "/calibracao/temperatura/pt100-rtd",
            description:
              "Para sensores resistivos usados como entrada em medições de temperatura.",
          },
          {
            label: "Calibração de termopares",
            href: "/calibracao/temperatura/termopares",
            description:
              "Para sensores termoelétricos associados a aplicações térmicas.",
          },
        ],
      },
    ],
  },
  "temperatura/indicadores": {
    title: "Calibração de Indicadores de Temperatura",
    h1: "Calibração de indicadores de temperatura",
    description:
      "Calibração de indicadores de temperatura conforme entrada, unidade, canais, resolução e aplicação informada.",
    lead: "Indicadores de temperatura apresentam o sinal de um sensor em unidade configurada. A calibração ajuda a avaliar a indicação conforme entrada, canais e pontos de uso.",
    sections: [
      {
        eyebrow: "Indicadores",
        title:
          "Visualização de temperatura em painéis, bancadas e equipamentos.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Indicadores podem aparecer em painéis, bancadas, equipamentos térmicos e sistemas que exibem temperatura para operação ou acompanhamento.",
          },
          {
            title: "O que informar",
            body: "Informe tipo de entrada, unidade, número de canais, resolução, faixa usada, sensor associado e condição de uso.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Instrumentos relacionados.",
        tone: "light",
        links: [
          {
            label: "Calibração de transmissores de temperatura",
            href: "/calibracao/temperatura/transmissores-de-temperatura",
            description:
              "Para instrumentos que convertem sinal térmico em saída configurada.",
          },
          {
            label: "Calibração de Pt100 e RTD",
            href: "/calibracao/temperatura/pt100-rtd",
            description:
              "Para sensores resistivos usados como entrada de medição.",
          },
        ],
      },
    ],
  },
  "temperatura/controladores": {
    title: "Calibração de Controladores de Temperatura",
    h1: "Calibração de controladores de temperatura",
    description:
      "Calibração de controladores de temperatura conforme entrada, faixa, saídas, configuração e aplicação térmica informada.",
    lead: "Controladores de temperatura leem um sinal térmico e acionam saídas conforme configuração. A calibração avalia a indicação ou resposta medida, sem substituir a análise completa do processo.",
    sections: [
      {
        eyebrow: "Controladores",
        title: "Controle térmico depende de entrada, configuração e aplicação.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Controladores podem estar em estufas, reatores, banhos, painéis e equipamentos térmicos que precisam manter ou acompanhar uma condição de temperatura.",
          },
          {
            title: "O que informar",
            body: "Informe tipo de entrada, faixa usada, unidade, saídas, configuração, sensor associado e condição de operação.",
          },
        ],
      },
      {
        eyebrow: "Limite da avaliação",
        title: "Calibração do controlador não é qualificação térmica completa.",
        tone: "light",
        columns: [
          {
            title: "Calibração",
            body: "A calibração pode avaliar a indicação ou resposta do instrumento conforme pontos definidos.",
          },
          {
            title: "Qualificação",
            body: "Mapeamento térmico, distribuição de temperatura e desempenho do equipamento em carga pertencem à análise de qualificação quando esse escopo for definido.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Caminhos relacionados.",
        links: [
          {
            label: "Qualificação térmica",
            href: "/qualificacao",
            description:
              "Para avaliação de desempenho térmico, mapeamento e evidências de operação.",
          },
          {
            label: "Calibração de transmissores de temperatura",
            href: "/calibracao/temperatura/transmissores-de-temperatura",
            description:
              "Para instrumentos que convertem sinal térmico em saída para controle.",
          },
        ],
      },
    ],
  },
  "temperatura/registradores-data-loggers": {
    title: "Calibração de Data Logger de Temperatura",
    h1: "Calibração de data logger de temperatura",
    description:
      "Calibração de data logger e registrador de temperatura conforme canais, sensores, intervalo de registro e aplicação informada.",
    lead: "Registradores e data loggers de temperatura armazenam leituras ao longo do tempo. A calibração avalia canais e sensores conforme a aplicação e os pontos definidos.",
    sections: [
      {
        eyebrow: "Registradores e data loggers",
        title: "Registro de temperatura para histórico e acompanhamento.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Podem ser usados em monitoramento ambiental, cadeia térmica, equipamentos térmicos, estudos de distribuição e rotinas que exigem histórico de leitura.",
          },
          {
            title: "O que informar",
            body: "Informe quantidade de canais, tipo de sensor, faixa usada, pontos de interesse, intervalo de registro e aplicação do equipamento.",
          },
        ],
      },
      {
        eyebrow: "Calibração",
        title: "Canais, sensores e configuração precisam ser claros.",
        tone: "light",
        columns: [
          {
            title: "Canais",
            body: "A avaliação pode depender de quais canais são usados e de como cada sensor está associado ao registrador.",
          },
          {
            title: "Uso dos dados",
            body: "O relatório de calibração apoia a confiança nas leituras, mas estudos de distribuição térmica ou mapeamento pertencem a escopos de qualificação quando definidos.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Caminhos relacionados.",
        links: [
          {
            label: "Calibração de Pt100 e RTD",
            href: "/calibracao/temperatura/pt100-rtd",
            description:
              "Para sensores resistivos conectados a sistemas de aquisição.",
          },
          {
            label: "Qualificação térmica",
            href: "/qualificacao",
            description:
              "Para mapeamento térmico e avaliação de desempenho de equipamentos.",
          },
        ],
      },
    ],
  },
  "temperatura/estufas": {
    title: "Calibração de Estufas",
    h1: "Calibração de estufas",
    description:
      "Calibração de estufas conforme temperatura de uso, volume, carga, pontos de interesse e documentação necessária.",
    lead: "Estufas são equipamentos térmicos usados para aquecimento, secagem ou preparo. A calibração deve ser diferenciada de qualificação térmica ou mapeamento completo.",
    sections: [
      {
        eyebrow: "Estufas",
        title: "Equipamento térmico usado em laboratório e processo.",
        columns: [
          {
            title: "Onde são utilizadas",
            body: "Estufas podem apoiar rotinas laboratoriais, controle de qualidade, preparo, secagem e processos que dependem de condição térmica controlada.",
          },
          {
            title: "O que informar",
            body: "Informe tipo de estufa, temperatura de uso, volume, carga quando aplicável, pontos de interesse, rotina e documentação esperada.",
          },
        ],
      },
      {
        eyebrow: "Calibração ou qualificação",
        title: "Escopos diferentes para perguntas diferentes.",
        tone: "light",
        columns: [
          {
            title: "Calibração",
            body: "A calibração trata da medição nos pontos definidos para a aplicação e da documentação dos resultados.",
          },
          {
            title: "Qualificação térmica",
            body: "Distribuição de temperatura, uniformidade, carga e desempenho em operação devem ser tratados como qualificação ou mapeamento quando esse escopo for requerido.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Equipamentos relacionados.",
        links: [
          {
            label: "Qualificação térmica",
            href: "/qualificacao",
            description:
              "Para avaliação de desempenho, mapeamento térmico e evidências de operação.",
          },
          {
            label: "Calibração de data logger de temperatura",
            href: "/calibracao/temperatura/registradores-data-loggers",
            description: "Para registradores usados em monitoramento térmico.",
          },
        ],
      },
    ],
  },
  "temperatura/incubadoras": {
    title: "Calibração de Incubadoras",
    h1: "Calibração de incubadoras",
    description:
      "Calibração de incubadoras conforme condição de uso, volume, carga, pontos críticos e documentação esperada.",
    lead: "Incubadoras mantêm ambiente térmico para amostras e rotinas laboratoriais. A calibração deve ser tratada separadamente de qualificação térmica completa.",
    sections: [
      {
        eyebrow: "Incubadoras",
        title: "Ambiente térmico controlado para rotina laboratorial.",
        columns: [
          {
            title: "Onde são utilizadas",
            body: "Incubadoras aparecem em rotinas laboratoriais, incubação de amostras e processos que dependem de condição térmica controlada.",
          },
          {
            title: "O que informar",
            body: "Informe volume útil, condição operacional, carga representativa quando aplicável, pontos críticos e documentação esperada.",
          },
        ],
      },
      {
        eyebrow: "Calibração ou qualificação",
        title: "Não confundir medição pontual com avaliação de desempenho.",
        tone: "light",
        columns: [
          {
            title: "Calibração",
            body: "A calibração organiza resultados de medição conforme pontos definidos para análise.",
          },
          {
            title: "Qualificação",
            body: "Mapeamento, distribuição térmica e desempenho do equipamento em carga exigem definição específica de escopo.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Caminhos relacionados.",
        links: [
          {
            label: "Qualificação térmica",
            href: "/qualificacao",
            description:
              "Para mapeamento térmico e avaliação de desempenho conforme aplicação.",
          },
          {
            label: "Calibração de termômetros",
            href: "/calibracao/temperatura/termometros-digitais-e-analogicos",
            description:
              "Para instrumentos de indicação usados em rotinas térmicas.",
          },
        ],
      },
    ],
  },
  "temperatura/autoclaves": {
    title: "Calibração de Autoclaves",
    h1: "Calibração de autoclaves",
    description:
      "Calibração de autoclaves conforme ciclo, condição operacional, carga, pontos críticos e documentação requerida.",
    lead: "Autoclaves envolvem processos térmicos pressurizados. A calibração deve ser comunicada de forma conservadora e diferenciada de qualificação térmica ou validação de ciclo.",
    sections: [
      {
        eyebrow: "Autoclaves",
        title: "Equipamento térmico pressurizado com aplicação crítica.",
        columns: [
          {
            title: "Onde são utilizadas",
            body: "Autoclaves podem aparecer em laboratórios, tratamento de materiais e processos que dependem de temperatura, tempo e condição operacional definidos.",
          },
          {
            title: "O que informar",
            body: "Informe tipo de autoclave, ciclo usado, condição operacional, carga, pontos críticos, sensores envolvidos e documentação esperada.",
          },
        ],
      },
      {
        eyebrow: "Escopo",
        title: "Calibração não deve ser apresentada como validação completa.",
        tone: "light",
        columns: [
          {
            title: "Calibração",
            body: "A calibração trata dos pontos e instrumentos definidos para medição, com resultados interpretados conforme incerteza e critérios aplicáveis.",
          },
          {
            title: "Qualificação ou validação",
            body: "Mapeamento, desempenho de ciclo, carga e critérios específicos devem ser tratados em escopo próprio, definido antes da execução.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Caminhos relacionados.",
        links: [
          {
            label: "Qualificação térmica",
            href: "/qualificacao",
            description:
              "Para análise de desempenho térmico, mapeamento e evidências de operação.",
          },
          {
            label: "Calibração de data logger de temperatura",
            href: "/calibracao/temperatura/registradores-data-loggers",
            description:
              "Para registradores usados no acompanhamento de temperatura.",
          },
        ],
      },
    ],
  },
  "temperatura/banhos-maria": {
    title: "Calibração de Banhos-maria",
    h1: "Calibração de banhos-maria",
    description:
      "Calibração de banhos-maria conforme temperatura de uso, volume, posição de medição, meio térmico e aplicação.",
    lead: "Banhos-maria utilizam fluido térmico para aquecimento de amostras e rotinas laboratoriais. A avaliação depende da temperatura de uso e das condições de operação.",
    sections: [
      {
        eyebrow: "Banhos-maria",
        title: "Aquecimento por banho líquido em rotina laboratorial.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Podem ser usados em preparo, aquecimento de amostras, rotinas laboratoriais e apoio a processos que dependem de temperatura controlada.",
          },
          {
            title: "O que informar",
            body: "Informe temperatura de uso, volume, posição de medição, meio térmico, carga quando aplicável e documentação esperada.",
          },
        ],
      },
      {
        eyebrow: "Calibração",
        title: "Pontos e posições precisam representar o uso.",
        tone: "light",
        columns: [
          {
            title: "Aplicação",
            body: "A escolha de pontos e posições deve considerar como o banho é usado na rotina.",
          },
          {
            title: "Qualificação",
            body: "Quando o objetivo for avaliar distribuição térmica ou desempenho em carga, o escopo pode se aproximar de qualificação térmica.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Equipamentos relacionados.",
        links: [
          {
            label: "Calibração de banhos termostáticos",
            href: "/calibracao/temperatura/banhos-termostaticos",
            description:
              "Para banhos com controle térmico e fluido estabilizado.",
          },
          {
            label: "Calibração de termômetros",
            href: "/calibracao/temperatura/termometros-digitais-e-analogicos",
            description:
              "Para instrumentos de indicação usados no acompanhamento térmico.",
          },
        ],
      },
    ],
  },
  "temperatura/banhos-termostaticos": {
    title: "Calibração de Banhos Termostáticos",
    h1: "Calibração de banhos termostáticos",
    description:
      "Calibração de banhos termostáticos conforme meio térmico, volume, imersão, temperatura de uso e aplicação.",
    lead: "Banhos termostáticos mantêm fluido estabilizado para imersão, ensaios, preparo ou apoio a medições. A calibração depende da condição real de uso.",
    sections: [
      {
        eyebrow: "Banhos termostáticos",
        title: "Fluido controlado para imersão e estabilidade térmica.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Podem apoiar ensaios, laboratórios, medição, preparo e rotinas que dependem de fluido térmico controlado.",
          },
          {
            title: "O que informar",
            body: "Informe meio térmico, volume, profundidade ou condição de imersão, temperatura de uso, pontos de interesse e documentação esperada.",
          },
        ],
      },
      {
        eyebrow: "Calibração",
        title: "A condição do banho influencia a avaliação.",
        tone: "light",
        columns: [
          {
            title: "Estabilidade e posição",
            body: "A forma de uso, posição de medição e meio térmico devem ser conhecidos para avaliar a calibração.",
          },
          {
            title: "Escopo térmico",
            body: "Distribuição, uniformidade e desempenho podem exigir escopo de qualificação quando forem objetivos do cliente.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Caminhos relacionados.",
        links: [
          {
            label: "Calibração de banhos-maria",
            href: "/calibracao/temperatura/banhos-maria",
            description:
              "Para banhos líquidos usados em aquecimento de amostras.",
          },
          {
            label: "Qualificação térmica",
            href: "/qualificacao",
            description:
              "Para análise de distribuição térmica e desempenho do equipamento.",
          },
        ],
      },
    ],
  },
  "temperatura/reatores": {
    title: "Calibração de Reatores",
    h1: "Calibração de reatores",
    description:
      "Calibração de reatores conforme sensores, indicação, controle, volume, condição operacional e aplicação informada.",
    lead: "Reatores podem depender de medição e controle de temperatura em processos com condição operacional definida. A calibração deve focar sensores, indicação ou controle conforme o escopo solicitado.",
    sections: [
      {
        eyebrow: "Reatores",
        title: "Processos térmicos com sensores, indicação e controle.",
        columns: [
          {
            title: "Onde são utilizados",
            body: "Reatores aparecem em processos químicos, estudos de processo, bateladas e aplicações que dependem de controle térmico associado à operação.",
          },
          {
            title: "O que informar",
            body: "Informe volume, sensor associado, indicação, controle, condição operacional, pontos de uso, carga quando aplicável e documentação esperada.",
          },
        ],
      },
      {
        eyebrow: "Escopo",
        title: "Calibração do sistema de medição não é validação do processo.",
        tone: "light",
        columns: [
          {
            title: "Calibração",
            body: "A calibração pode avaliar sensor, indicação ou controle conforme pontos definidos.",
          },
          {
            title: "Processo",
            body: "Desempenho do reator, comportamento da carga e critérios de processo exigem análise específica e não devem ser presumidos pela página.",
          },
        ],
      },
      {
        eyebrow: "Temperatura",
        title: "Instrumentos relacionados.",
        links: [
          {
            label: "Calibração de Pt100 e RTD",
            href: "/calibracao/temperatura/pt100-rtd",
            description: "Para sensores resistivos associados ao reator.",
          },
          {
            label: "Calibração de termopares",
            href: "/calibracao/temperatura/termopares",
            description: "Para sensores termoelétricos usados no processo.",
          },
        ],
      },
    ],
  },
};
