export type CardData = {
  title: string;
  description: string;
  href?: string;
  number?: string;
};
export const rangeMessage =
  "Consulte-nos sobre a faixa e as características do seu instrumento. A DS Científica avalia cada aplicação e apresenta a solução adequada para o serviço.";
export const quoteInfo = [
  "identificação do equipamento, fabricante e modelo",
  "faixa utilizada, unidade e pontos de interesse",
  "quantidade, cidade/UF e condição de uso",
  "requisitos internos, critério de aceitação ou necessidade documental",
];
export type CalibrationEquipment = {
  slug: string;
  title: string;
  family: string;
  principle: string;
  applications: string[];
  criteria: string[];
  caution?: string;
  description: string;
};
export type CalibrationQuantity = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  importance: string;
  equipment: CalibrationEquipment[];
};
const e = (
  slug: string,
  title: string,
  family: string,
  principle: string,
  applications: string[],
  criteria: string[],
  caution?: string,
): CalibrationEquipment => ({
  slug,
  title,
  family,
  principle,
  applications,
  criteria,
  caution,
  description: `${title} para ${family.toLowerCase()}. A avaliação depende da aplicação, da faixa utilizada e das características do instrumento.`,
});
export const calibrationQuantities: CalibrationQuantity[] = [
  {
    slug: "pressao",
    title: "Pressão",
    description:
      "Calibração de instrumentos usados para indicação, transmissão, controle e proteção em sistemas pressurizados.",
    intro:
      "A calibração de pressão documenta a relação entre indicação ou sinal de saída e valores de referência nos pontos definidos para a aplicação.",
    importance:
      "Pressão influencia segurança operacional, controle de processo, manutenção, utilidades e qualidade. A análise depende da faixa usada, resolução, fluido, instalação e critério de aceitação.",
    equipment: [
      e(
        "manometros",
        "Manômetros digitais e analógicos",
        "indicação direta de pressão",
        "pressão aplicada convertida em leitura analógica ou digital",
        ["linhas de processo", "bancadas", "utilidades"],
        ["faixa usada", "unidade e resolução", "conexão e fluido"],
      ),
      e(
        "vacuometros",
        "Vacuômetros",
        "medição de vácuo",
        "indicação de pressão abaixo da atmosférica",
        ["sistemas de vácuo", "secagem", "bombas"],
        ["unidade", "faixa utilizada", "conexão"],
      ),
      e(
        "manovacuometros",
        "Manovacuômetros",
        "pressão positiva e vácuo",
        "avaliação dos dois regimes usados",
        ["ciclos de pressurização", "sistemas pneumáticos", "bombas"],
        ["pontos de vácuo", "pontos de pressão", "escala"],
      ),
      e(
        "transmissores-de-pressao",
        "Transmissores de pressão",
        "malhas de controle e registro",
        "conversão de pressão em sinal",
        ["CLP", "supervisório", "skids"],
        ["sinal", "faixa configurada", "alimentação"],
      ),
      e(
        "transmissores-de-pressao-diferencial",
        "Transmissores de pressão diferencial",
        "diferença de pressão entre dois pontos",
        "diferencial aplicado relacionado ao sinal",
        ["filtros", "vazão por diferencial", "nível"],
        ["faixa diferencial", "unidade", "linhas de impulso"],
      ),
      e(
        "pressostatos",
        "Pressostatos",
        "comutação por pressão",
        "contatos atuam por ponto de pressão",
        ["alarmes", "intertravamentos", "bombas"],
        ["ponto de atuação", "retorno", "tipo de contato"],
      ),
      e(
        "valvulas-de-seguranca-e-alivio",
        "Válvulas de segurança e alívio",
        "proteção contra sobrepressão",
        "análise técnica do tipo de válvula, fluido e documentação",
        ["sistemas pressurizados", "utilidades", "equipamentos industriais"],
        ["tipo de válvula", "fluido", "pressão de ajuste informada"],
        "Requer revisão técnica da DS antes de declarações sobre requisitos legais ou normativos específicos.",
      ),
    ],
  },
  {
    slug: "temperatura",
    title: "Temperatura",
    description:
      "Calibração de sensores, indicadores, registradores, controladores e equipamentos térmicos.",
    intro:
      "Medições de temperatura orientam conservação, reação, esterilização, secagem, incubação, controle ambiental e processos industriais.",
    importance:
      "A avaliação depende do sensor ou equipamento, faixa utilizada, estabilidade, resolução, carga de uso e condições de operação.",
    equipment: [
      e(
        "termometros-digitais-e-analogicos",
        "Termômetros digitais e analógicos",
        "indicação de temperatura",
        "sensor ou elemento de leitura comparado a referência",
        ["ambientes", "processos térmicos", "inspeção"],
        ["tipo de sensor", "faixa", "resolução"],
      ),
      e(
        "termometros-de-liquido-em-vidro",
        "Termômetros de líquido em vidro",
        "escala graduada",
        "expansão do líquido no capilar",
        ["laboratórios", "banhos", "controle de rotina"],
        ["escala", "divisão", "imersão"],
      ),
      e(
        "pt100-rtd",
        "Pt100/RTD",
        "sensores resistivos",
        "resistência elétrica varia com temperatura",
        ["processos", "equipamentos térmicos", "aquisição"],
        ["ligação", "montagem", "pontos de uso"],
      ),
      e(
        "termopares",
        "Termopares",
        "sensores termoelétricos",
        "sinal termoelétrico conforme tipo",
        ["fornos", "reatores", "linhas"],
        ["tipo", "ponto de medição", "conexão"],
      ),
      e(
        "transmissores-de-temperatura",
        "Transmissores de temperatura",
        "conversão de sinal térmico",
        "entrada de sensor convertida em saída",
        ["controle", "supervisão", "processo"],
        ["entrada", "saída", "configuração"],
      ),
      e(
        "indicadores",
        "Indicadores",
        "visualização de temperatura",
        "sinal de sensor mostrado em unidade configurada",
        ["painéis", "bancadas", "equipamentos"],
        ["entrada", "unidade", "canais"],
      ),
      e(
        "controladores",
        "Controladores",
        "controle térmico",
        "leitura de temperatura com acionamento de saídas",
        ["estufas", "reatores", "banhos"],
        ["entrada", "faixa", "saídas"],
      ),
      e(
        "registradores-data-loggers",
        "Registradores/Data Loggers",
        "registro de temperatura",
        "canais armazenam histórico de leitura",
        ["ambiente", "cadeia térmica", "qualificação"],
        ["canais", "sensor", "intervalo"],
      ),
      e(
        "estufas",
        "Estufas",
        "aquecimento, secagem ou preparo",
        "câmara mantida em condição térmica controlada",
        ["laboratórios", "qualidade", "processo"],
        ["volume", "temperatura", "carga"],
      ),
      e(
        "incubadoras",
        "Incubadoras",
        "incubação laboratorial",
        "ambiente térmico mantido para amostras",
        ["laboratórios", "microbiologia", "incubação"],
        ["volume", "carga", "pontos críticos"],
      ),
      e(
        "autoclaves",
        "Autoclaves",
        "processos térmicos pressurizados",
        "temperatura, tempo e condição operacional definidos por uso",
        ["laboratórios", "tratamento", "processos"],
        ["ciclo", "carga", "documentação"],
      ),
      e(
        "banhos-maria",
        "Banhos-maria",
        "aquecimento por banho líquido",
        "fluido térmico transfere calor",
        ["amostras", "laboratórios", "aquecimento"],
        ["volume", "temperatura", "posição"],
      ),
      e(
        "banhos-termostaticos",
        "Banhos termostáticos",
        "fluido estabilizado",
        "banho controlado para imersão",
        ["ensaios", "laboratórios", "medição"],
        ["meio térmico", "volume", "imersão"],
      ),
      e(
        "reatores",
        "Reatores",
        "processos com temperatura crítica",
        "sensor, indicação e controle avaliados conforme condição",
        ["processos químicos", "desenvolvimento", "bateladas"],
        ["volume", "sensor", "condição operacional"],
      ),
    ],
  },
  {
    slug: "massa",
    title: "Massa",
    description:
      "Calibração de balanças, células de carga e sistemas de pesagem.",
    intro:
      "Medições de massa apoiam preparo, formulação, recebimento, expedição, dosagem e controle de qualidade.",
    importance:
      "A análise depende de resolução, capacidade usada, instalação, ambiente, repetitividade e criticidade.",
    equipment: [
      e(
        "balancas-analiticas",
        "Balanças analíticas",
        "pesagens laboratoriais sensíveis",
        "indicação comparada com massas de referência",
        ["soluções", "ensaios", "qualidade"],
        ["capacidade", "resolução", "ambiente"],
      ),
      e(
        "balancas-semianaliticas",
        "Balanças semianalíticas",
        "pesagem de bancada",
        "erro de indicação em cargas representativas",
        ["laboratório", "produção", "recebimento"],
        ["capacidade", "resolução", "carga usual"],
      ),
      e(
        "balancas-digitais",
        "Balanças digitais",
        "pesagens de rotina",
        "carga convertida em indicação",
        ["estoque", "produção", "laboratório"],
        ["capacidade", "resolução", "ambiente"],
      ),
      e(
        "balancas-plataforma",
        "Balanças plataforma",
        "cargas maiores",
        "plataforma transmite carga ao indicador",
        ["produção", "almoxarifado", "expedição"],
        ["dimensão", "carga", "nivelamento"],
      ),
      e(
        "balancas-rodoviarias",
        "Balanças rodoviárias",
        "veículos e cargas",
        "escopo depende da instalação",
        ["logística", "recebimento", "expedição"],
        ["instalação", "capacidade", "acesso"],
      ),
      e(
        "celulas-de-carga",
        "Células de carga",
        "sistemas de pesagem",
        "esforço mecânico convertido em sinal",
        ["tanques", "silos", "dosagem"],
        ["tipo", "carga", "montagem"],
      ),
      e(
        "sistemas-de-pesagem-reatores",
        "Sistemas de pesagem/reatores",
        "cadeias integradas de pesagem",
        "célula, indicação e estrutura avaliadas em conjunto",
        ["reatores", "tanques", "formulação"],
        ["configuração", "carga", "acesso"],
      ),
    ],
  },
  {
    slug: "vazao",
    title: "Vazão",
    description:
      "Calibração e avaliação de medidores de vazão para utilidades, transferência, dosagem e processo.",
    intro:
      "A medição de vazão apoia balanços, consumo, dosagem, transferência e controle.",
    importance:
      "A tecnologia adequada depende do fluido, regime, instalação, sinal, unidade e ponto de operação.",
    equipment: [
      e(
        "eletromagneticos",
        "Medidores eletromagnéticos",
        "líquidos condutivos",
        "campo magnético e fluido em movimento geram sinal",
        ["água", "efluentes", "utilidades"],
        ["fluido", "diâmetro", "sinal"],
      ),
      e(
        "coriolis",
        "Medidores Coriolis",
        "vazão mássica",
        "vibração de tubos relacionada à vazão",
        ["dosagem", "química", "transferência"],
        ["fluido", "ponto de vazão", "sinal"],
      ),
      e(
        "ultrassonicos",
        "Medidores ultrassônicos",
        "medição acústica",
        "ondas acústicas propagadas no fluido ou tubulação",
        ["utilidades", "água", "medição temporária"],
        ["montagem", "tubulação", "fluido"],
      ),
      e(
        "pressao-diferencial",
        "Medidores por pressão diferencial",
        "queda de pressão",
        "diferencial em elemento primário usado em cálculo",
        ["vapor", "gases", "líquidos"],
        ["elemento primário", "faixa diferencial", "cálculo"],
      ),
      e(
        "rotametros",
        "Rotâmetros",
        "área variável",
        "posição do flutuador indica vazão",
        ["bancadas", "linhas auxiliares", "gases"],
        ["fluido", "escala", "posição"],
      ),
      e(
        "turbina",
        "Medidores tipo turbina",
        "rotor mecânico",
        "escoamento movimenta rotor associado a indicação",
        ["utilidades", "transferência", "bancadas"],
        ["fluido", "vazão", "instalação"],
      ),
      e(
        "vortex",
        "Medidores Vortex",
        "desprendimento de vórtices",
        "frequência de vórtices relacionada à velocidade",
        ["vapor", "gases", "líquidos"],
        ["fluido", "trecho reto", "processo"],
      ),
      e(
        "hidrometros",
        "Hidrômetros",
        "totalização de água",
        "volume escoado totalizado pelo medidor",
        ["consumo", "utilidades", "controle"],
        ["diâmetro", "vazões", "instalação"],
      ),
    ],
  },
  {
    slug: "dimensional",
    title: "Dimensional",
    description:
      "Calibração de instrumentos dimensionais para inspeção, produção, manutenção e controle de qualidade.",
    intro:
      "Instrumentos dimensionais apoiam decisões sobre peças, ajustes mecânicos e conformidade interna.",
    importance:
      "A análise depende de resolução, faixa usada, desgaste, geometria e critério de aceitação.",
    equipment: [
      e(
        "paquimetros",
        "Paquímetros",
        "medições externas, internas e de profundidade",
        "deslocamento de curso comparado a escala",
        ["inspeção", "manutenção", "peças"],
        ["tipo", "faixa", "faces"],
      ),
      e(
        "micrometros",
        "Micrômetros",
        "medição fina",
        "parafuso micrométrico movimenta faces",
        ["usinagem", "inspeção", "laboratório"],
        ["tipo", "faixa", "condição"],
      ),
      e(
        "relogios-comparadores",
        "Relógios comparadores",
        "comparação e deslocamento",
        "deslocamento da haste gera indicação",
        ["alinhamento", "batimento", "comparação"],
        ["curso", "resolução", "fixação"],
      ),
      e(
        "relogios-apalpadores",
        "Relógios apalpadores",
        "alavanca de contato",
        "movimento do apalpador transmitido à indicação",
        ["concentricidade", "alinhamento", "inspeção"],
        ["curso", "resolução", "contato"],
      ),
      e(
        "altimetros",
        "Altímetros",
        "medição de alturas",
        "altura medida contra superfície de referência",
        ["inspeção", "traçagem", "controle"],
        ["faixa", "resolução", "base"],
      ),
      e(
        "reguas-graduadas",
        "Réguas graduadas",
        "medições lineares",
        "escala graduada como referência visual",
        ["inspeção", "laboratório", "produção"],
        ["comprimento", "divisão", "condição"],
      ),
      e(
        "medidores-e-padroes-de-espessura",
        "Medidores e padrões de espessura",
        "controle de espessura",
        "espessura medida ou referenciada por contato ou padrão",
        ["materiais", "inspeção", "processo"],
        ["tipo", "faixa", "superfície"],
      ),
    ],
  },
  {
    slug: "fisico-quimica",
    title: "Físico-química / Eletroquímica",
    description:
      "Calibração e avaliação de instrumentos para pH, condutividade, ORP, oxigênio dissolvido e parâmetros relacionados.",
    intro:
      "Medições físico-químicas apoiam controle de água, soluções, tratamento e laboratório analítico.",
    importance:
      "A confiabilidade depende de sensor, soluções, amostra, temperatura, limpeza e rotina.",
    equipment: [
      e(
        "phmetros",
        "pHmetros",
        "acidez ou alcalinidade",
        "eletrodo e medidor indicam pH",
        ["água", "química", "tratamento"],
        ["amostra", "eletrodo", "pontos de pH"],
      ),
      e(
        "condutivimetros",
        "Condutivímetros",
        "condutividade elétrica",
        "célula mede resposta elétrica da solução",
        ["água purificada", "tratamento", "processo"],
        ["célula", "faixa", "amostra"],
      ),
      e(
        "orp",
        "ORP",
        "potencial de oxirredução",
        "eletrodo mede potencial do meio",
        ["água", "química", "monitoramento"],
        ["amostra", "eletrodo", "manutenção"],
      ),
      e(
        "oxigenio-dissolvido",
        "Oxigênio dissolvido",
        "oxigênio em líquidos",
        "sensor específico avalia concentração",
        ["água", "efluentes", "processos biológicos"],
        ["sensor", "amostra", "temperatura"],
      ),
      e(
        "ion-seletivos",
        "Íon-seletivos",
        "parâmetros iônicos",
        "eletrodos seletivos respondem a espécies iônicas",
        ["laboratório", "soluções", "processos"],
        ["íon", "amostra", "soluções"],
      ),
      e(
        "tds",
        "TDS",
        "sólidos dissolvidos totais",
        "indicação derivada da resposta elétrica",
        ["água", "tratamento", "controle"],
        ["faixa", "unidade", "fator"],
      ),
      e(
        "multiparametros",
        "Multiparâmetros",
        "medições combinadas",
        "canais e sensores compõem uma rotina",
        ["campo", "laboratório", "monitoramento"],
        ["parâmetros", "sensores", "rotina"],
      ),
    ],
  },
  {
    slug: "optica-fotometria",
    title: "Óptica / Fotometria",
    description:
      "Calibração e avaliação de instrumentos ópticos e fotométricos para laboratório e controle analítico.",
    intro:
      "Medições ópticas apoiam análises por absorção, transmissão, espalhamento, turbidez, cor, fluorescência e refração.",
    importance:
      "A resposta depende de princípio, comprimento de onda, célula, cubeta, padrões, amostra e procedimento.",
    equipment: [
      e(
        "espectrofotometros",
        "Espectrofotômetros",
        "medições ópticas",
        "interação entre luz e amostra gera resposta",
        ["laboratório", "qualidade", "soluções"],
        ["comprimentos de onda", "modo", "acessórios"],
      ),
      e(
        "leitoras-elisa-microplacas",
        "Leitoras ELISA/microplacas",
        "leitura óptica de microplacas",
        "poços são lidos conforme filtros e ensaio",
        ["laboratórios", "microplacas", "análises"],
        ["modo", "comprimentos de onda", "formato"],
      ),
      e(
        "turbidimetros",
        "Turbidímetros",
        "turbidez óptica",
        "espalhamento ou atenuação de luz pela amostra",
        ["água", "efluentes", "processo"],
        ["faixa", "padrões", "célula"],
      ),
      e(
        "colorimetros",
        "Colorímetros",
        "cor e resposta colorimétrica",
        "filtros ou sensores relacionam cor e indicação",
        ["laboratório", "água", "qualidade"],
        ["parâmetro", "faixa", "célula"],
      ),
      e(
        "fotometros",
        "Fotômetros",
        "leitura fotométrica",
        "intensidade luminosa transmitida ou absorvida gera indicação",
        ["análises rápidas", "laboratório", "água"],
        ["parâmetro", "comprimento de onda", "célula"],
      ),
      e(
        "colorimetros-de-cloro",
        "Colorímetros de cloro",
        "controle colorimétrico de cloro",
        "reação colorimétrica e leitura óptica indicam o parâmetro",
        ["água", "tratamento", "controle"],
        ["tipo de cloro", "método", "célula"],
      ),
      e(
        "fluorimetros",
        "Fluorímetros",
        "fluorescência",
        "emissão de luz após excitação é medida",
        ["laboratório", "processo", "pesquisa aplicada"],
        ["parâmetro", "amostra", "configuração"],
      ),
      e(
        "refratometros",
        "Refratômetros",
        "índice de refração",
        "refração da luz convertida em indicação",
        ["alimentos", "química", "concentração"],
        ["escala", "amostra", "limpeza"],
      ),
    ],
  },
];
export const calibrationQuantityBySlug = Object.fromEntries(
  calibrationQuantities.map((q) => [q.slug, q]),
) as Record<string, CalibrationQuantity>;
export const calibrationEquipmentByRoute = Object.fromEntries(
  calibrationQuantities.flatMap((q) =>
    q.equipment.map((item) => [
      `${q.slug}/${item.slug}`,
      { quantity: q, equipment: item },
    ]),
  ),
) as Record<
  string,
  { quantity: CalibrationQuantity; equipment: CalibrationEquipment }
>;
export const quantities: CardData[] = calibrationQuantities.map((q) => ({
  title: q.title,
  description: q.description,
  href: `/calibracao/${q.slug}`,
}));
export const pressureInstruments: CardData[] =
  calibrationQuantityBySlug.pressao.equipment.map((item) => ({
    title: item.title,
    description: item.description,
    href: `/calibracao/pressao/${item.slug}`,
  }));
export const gauge =
  calibrationEquipmentByRoute["pressao/manometros"].equipment;
export type ProductType = {
  slug: string;
  title: string;
  description: string;
  applications: string[];
  criteria: string[];
  relatedServices: string[];
};
export type ProductCategory = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  types: ProductType[];
};
const p = (
  slug: string,
  title: string,
  description: string,
  applications: string[],
  criteria: string[],
  relatedServices: string[] = [],
): ProductType => ({
  slug,
  title,
  description,
  applications,
  criteria,
  relatedServices,
});
export const productCategories: ProductCategory[] = [
  {
    slug: "pressao",
    title: "Pressão",
    description:
      "Instrumentos para indicação, transmissão e controle de pressão.",
    intro:
      "A seleção começa por fluido, ponto de operação, instalação, sinal requerido e documentação necessária.",
    types: [
      p(
        "manometros",
        "Manômetros",
        "Indicação local de pressão para laboratório, utilidades e processo.",
        ["linhas de processo", "bancadas", "utilidades"],
        ["faixa de uso", "unidade", "conexão"],
        ["/calibracao/pressao/manometros"],
      ),
      p(
        "transmissores-de-pressao",
        "Transmissores de pressão",
        "Sinal de pressão para controle, indicação ou registro.",
        ["malhas de controle", "monitoramento", "automação"],
        ["sinal", "configuração", "instalação"],
        ["/calibracao/pressao/transmissores-de-pressao"],
      ),
      p(
        "pressostatos",
        "Pressostatos",
        "Comutação por ponto de pressão definido.",
        ["alarmes", "intertravamentos", "controle"],
        ["atuação", "contato", "conexão"],
        ["/calibracao/pressao/pressostatos"],
      ),
    ],
  },
  {
    slug: "temperatura",
    title: "Temperatura",
    description:
      "Sensores, transmissores, indicadores e soluções para controle térmico.",
    intro:
      "Produtos de temperatura devem ser definidos por faixa de uso, tempo de resposta, instalação, sinal e condição do processo.",
    types: [
      p(
        "sensores-de-temperatura",
        "Sensores de temperatura",
        "RTD, termopares e sensores para equipamentos e processos.",
        ["reatores", "equipamentos térmicos", "linhas"],
        ["tipo", "montagem", "compatibilidade"],
        [
          "/calibracao/temperatura/pt100-rtd",
          "/calibracao/temperatura/termopares",
        ],
      ),
      p(
        "transmissores-de-temperatura",
        "Transmissores de temperatura",
        "Conversão de sinal térmico para controle ou registro.",
        ["automação", "supervisão", "malhas"],
        ["entrada", "saída", "configuração"],
        ["/calibracao/temperatura/transmissores-de-temperatura"],
      ),
    ],
  },
  {
    slug: "vazao",
    title: "Vazão",
    description:
      "Medidores de vazão para líquidos, gases, utilidades e processos.",
    intro:
      "A tecnologia adequada depende de fluido, tubulação, regime, instalação, sinal e objetivo da medição.",
    types: [
      p(
        "medidores-de-vazao",
        "Medidores de vazão",
        "Famílias de medidores para vazão instantânea, totalização e controle.",
        ["dosagem", "utilidades", "transferência"],
        ["fluido", "instalação", "sinal"],
        ["/calibracao/vazao"],
      ),
    ],
  },
  {
    slug: "nivel",
    title: "Nível",
    description:
      "Instrumentação para indicação, transmissão ou controle de nível.",
    intro:
      "A medição de nível considera geometria, produto, pressão, temperatura, espuma, interface e montagem.",
    types: [
      p(
        "instrumentos-de-nivel",
        "Instrumentos de nível",
        "Soluções para reservatórios, tanques, silos e equipamentos de processo.",
        ["tanques", "silos", "reatores"],
        ["produto", "geometria", "montagem"],
      ),
    ],
  },
  {
    slug: "analitica",
    title: "Analítica",
    description:
      "Instrumentação analítica para parâmetros físico-químicos e ópticos.",
    intro:
      "A seleção parte da amostra, parâmetro, sensor, manutenção e documentação requerida.",
    types: [
      p(
        "instrumentos-analiticos",
        "Instrumentos analíticos",
        "Equipamentos para pH, condutividade, ORP, oxigênio dissolvido, turbidez e cor.",
        ["água", "processo", "laboratório"],
        ["parâmetro", "amostra", "sensor"],
        ["/calibracao/fisico-quimica", "/calibracao/optica-fotometria"],
      ),
    ],
  },
  {
    slug: "equipamentos-de-laboratorio",
    title: "Equipamentos de laboratório",
    description:
      "Equipamentos e soluções para rotinas laboratoriais, controle e apoio ao processo.",
    intro:
      "A escolha considera aplicação, capacidade necessária, ambiente, rotina de uso e documentação esperada.",
    types: [
      p(
        "equipamentos-termicos-e-de-apoio",
        "Equipamentos térmicos e de apoio",
        "Equipamentos para aquecimento, conservação, preparo e apoio à rotina.",
        ["laboratórios", "controle de qualidade", "apoio"],
        ["volume", "temperatura", "rotina"],
        ["/calibracao/temperatura/estufas", "/qualificacao"],
      ),
    ],
  },
];
export const productCategoryBySlug = Object.fromEntries(
  productCategories.map((c) => [c.slug, c]),
) as Record<string, ProductCategory>;
export const productTypeByRoute = Object.fromEntries(
  productCategories.flatMap((c) =>
    c.types.map((t) => [`${c.slug}/${t.slug}`, { category: c, type: t }]),
  ),
) as Record<string, { category: ProductCategory; type: ProductType }>;
