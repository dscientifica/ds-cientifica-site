export type MediaKind = "photo" | "pending";
export type MediaFit = "cover" | "contain";
export type PageMedia = {
  src: string;
  alt: string;
  caption: string;
  kind: MediaKind;
  fit?: MediaFit;
};

export const pageMedia = {
  calibracao: {
    src: "/visuals/calibracao.webp",
    alt: "Técnico em laboratório realizando uma montagem genérica de calibração com instrumentos de pressão sem marca aparente.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
  },
  manutencao: {
    src: "/visuals/manutencao.webp",
    alt: "Mãos de técnico realizando manutenção em equipamento laboratorial genérico aberto sobre bancada limpa.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
  },
  qualificacao: {
    src: "/visuals/qualificacao.webp",
    alt: "Equipamento térmico laboratorial instrumentado com sensores e data logger para atividade de qualificação.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
  },
  produtos: {
    src: "/visuals/produtos.webp",
    alt: "Composição de instrumentos industriais e laboratoriais genéricos sem marcas, incluindo sensores e medidores.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
    fit: "contain",
  },
  segmentos: {
    src: "/visuals/segmentos.webp",
    alt: "Ambiente laboratorial com equipamentos de apoio e bancada técnica, sem marcas ou identificação de cliente.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
  },
  laboratorio: {
    src: "/visuals/laboratorio.webp",
    alt: "Laboratório limpo com equipamentos térmicos e de apoio, sem marcas ou identificação de terceiros.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
  },
  processo: {
    src: "/visuals/processo.webp",
    alt: "Bancada de instrumentação de processo com medidores de vazão e tubulação industrial genérica.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
  },
  pressao: {
    src: "/visuals/pressao.webp",
    alt: "Técnico em laboratório trabalhando em montagem genérica de calibração de pressão com manômetro sem marca.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
  },
  temperatura: {
    src: "/visuals/temperatura.webp",
    alt: "Sensores de temperatura, transmissores, termopares e termômetro genéricos sobre bancada de laboratório.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
    fit: "contain",
  },
  massa: {
    src: "/visuals/massa.webp",
    alt: "Balanças laboratoriais, plataforma de pesagem e pesos padrão genéricos em bancada metrológica limpa.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
    fit: "contain",
  },
  vazao: {
    src: "/visuals/vazao.webp",
    alt: "Medidores de vazão genéricos e seções de tubulação sobre bancada de instrumentação industrial.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
    fit: "contain",
  },
  nivel: {
    src: "/visuals/nivel.webp",
    alt: "Instrumentos genéricos de medição de nível instalados em tanque demonstrativo de processo.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
  },
  dimensional: {
    src: "/visuals/dimensional.webp",
    alt: "Paquímetro, micrômetro, relógio comparador e blocos padrão genéricos em bancada de inspeção dimensional.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
    fit: "contain",
  },
  "fisico-quimica": {
    src: "/visuals/fisico-quimica.webp",
    alt: "pHmetros e sensores eletroquímicos genéricos em béqueres sobre bancada de laboratório analítico.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
  },
  "optica-fotometria": {
    src: "/visuals/optica-fotometria.webp",
    alt: "Instrumentos ópticos e fotométricos laboratoriais genéricos com cubetas, microplaca e amostras sem rótulo.",
    caption: "Imagem contextual para apoio à navegação.",
    kind: "photo",
  },
  cliente: {
    src: "/visuals/cliente.webp",
    alt: "Imagem abstrata discreta para Área do Cliente e gestão de equipamentos.",
    caption: "Área do Cliente AXION.",
    kind: "pending",
  },
  conteudo: {
    src: "/visuals/conteudo.webp",
    alt: "Imagem abstrata discreta para conteúdo técnico e documentação.",
    caption: "Conteúdo técnico DS Científica.",
    kind: "pending",
  },
  "manometro-digital": {
    src: "/visuals/manometro-digital.webp",
    alt: "Imagem ilustrativa de manômetro digital sem marca, com visor desligado e conexão metálica inferior.",
    caption: "Imagem contextual de manômetro digital.",
    kind: "photo",
    fit: "contain",
  },
} satisfies Record<string, PageMedia>;

export type MediaKey = keyof typeof pageMedia;

const calibrationEquipmentMedia = {
  "pressao/manometros": "manometro-digital",
  "pressao/vacuometros": "pressao",
  "pressao/manovacuometros": "pressao",
  "pressao/transmissores-de-pressao": "pressao",
  "pressao/transmissores-de-pressao-diferencial": "pressao",
  "pressao/pressostatos": "pressao",
  "pressao/valvulas-de-seguranca-e-alivio": "pressao",
  "temperatura/estufas": "qualificacao",
  "temperatura/incubadoras": "qualificacao",
  "temperatura/autoclaves": "qualificacao",
  "temperatura/banhos-maria": "laboratorio",
  "temperatura/banhos-termostaticos": "laboratorio",
  "temperatura/reatores": "laboratorio",
} satisfies Record<string, MediaKey>;

const productTypeMedia = {
  "pressao/manometros": "manometro-digital",
  "pressao/transmissores-de-pressao": "pressao",
  "temperatura/sensores-de-temperatura": "temperatura",
  "temperatura/transmissores-de-temperatura": "temperatura",
  "vazao/medidores-de-vazao": "vazao",
  "nivel/instrumentos-de-nivel": "nivel",
  "analitica/instrumentos-analiticos": "fisico-quimica",
  "equipamentos-de-laboratorio/equipamentos-termicos-e-de-apoio": "laboratorio",
} satisfies Record<string, MediaKey>;

const segmentMedia = {
  farmaceutico: "laboratorio",
  quimico: "processo",
  "alimentos-bebidas": "laboratorio",
  automotivo: "dimensional",
  hospitalar: "laboratorio",
  industrial: "processo",
} satisfies Record<string, MediaKey>;

export function mediaForKey(key: string | undefined): PageMedia {
  return pageMedia[(key || "processo") as MediaKey] ?? pageMedia.processo;
}

export function mediaForEquipment(
  quantitySlug: string,
  equipmentSlug: string,
): PageMedia {
  const routeKey = `${quantitySlug}/${equipmentSlug}`;
  return mediaForKey(
    calibrationEquipmentMedia[
      routeKey as keyof typeof calibrationEquipmentMedia
    ] ?? quantitySlug,
  );
}

export function mediaForProduct(
  categorySlug: string,
  typeSlug?: string,
): PageMedia {
  const routeKey = typeSlug ? `${categorySlug}/${typeSlug}` : undefined;
  return mediaForKey(
    (routeKey && productTypeMedia[routeKey as keyof typeof productTypeMedia]) ??
      categorySlug,
  );
}

export function mediaForSegment(segmentSlug: string): PageMedia {
  return mediaForKey(segmentMedia[segmentSlug as keyof typeof segmentMedia]);
}
