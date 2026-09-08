export type MediaKind = "photo" | "placeholder";
export type PageMedia = {
  src: string;
  alt: string;
  caption: string;
  kind: MediaKind;
};
export const pageMedia = {
  calibracao: {
    src: "/visuals/calibracao.webp",
    alt: "Placeholder fotográfico abstrato para calibração, sem equipamento específico.",
    caption:
      "Imagem provisória para calibração · substituir por foto autorizada",
    kind: "placeholder",
  },
  manutencao: {
    src: "/visuals/manutencao.webp",
    alt: "Placeholder fotográfico abstrato para manutenção técnica, sem marca ou equipamento específico.",
    caption:
      "Imagem provisória para manutenção · substituir por foto autorizada",
    kind: "placeholder",
  },
  qualificacao: {
    src: "/visuals/qualificacao.webp",
    alt: "Placeholder fotográfico abstrato para qualificação de equipamentos, sem equipamento específico.",
    caption:
      "Imagem provisória para qualificação · substituir por foto autorizada",
    kind: "placeholder",
  },
  produtos: {
    src: "/visuals/produtos.webp",
    alt: "Placeholder fotográfico abstrato para produtos de instrumentação, sem marca ou modelo específico.",
    caption: "Imagem provisória para produtos · substituir por foto autorizada",
    kind: "placeholder",
  },
  segmentos: {
    src: "/visuals/segmentos.webp",
    alt: "Placeholder fotográfico abstrato para segmentos industriais e laboratoriais.",
    caption:
      "Imagem provisória para segmentos · substituir por foto autorizada",
    kind: "placeholder",
  },
  laboratorio: {
    src: "/visuals/laboratorio.webp",
    alt: "Placeholder fotográfico abstrato para ambiente laboratorial.",
    caption:
      "Imagem provisória de apoio laboratorial · substituir por foto autorizada",
    kind: "placeholder",
  },
  processo: {
    src: "/visuals/processo.webp",
    alt: "Placeholder fotográfico abstrato para processo industrial.",
    caption: "Imagem provisória de processo · substituir por foto autorizada",
    kind: "placeholder",
  },
  pressao: {
    src: "/visuals/pressao.webp",
    alt: "Placeholder fotográfico abstrato para calibração de pressão.",
    caption: "Imagem provisória para pressão · substituir por foto autorizada",
    kind: "placeholder",
  },
  temperatura: {
    src: "/visuals/temperatura.webp",
    alt: "Placeholder fotográfico abstrato para temperatura e equipamentos térmicos.",
    caption:
      "Imagem provisória para temperatura · substituir por foto autorizada",
    kind: "placeholder",
  },
  massa: {
    src: "/visuals/massa.webp",
    alt: "Placeholder fotográfico abstrato para massa e pesagem.",
    caption: "Imagem provisória para massa · substituir por foto autorizada",
    kind: "placeholder",
  },
  vazao: {
    src: "/visuals/vazao.webp",
    alt: "Placeholder fotográfico abstrato para vazão e utilidades de processo.",
    caption: "Imagem provisória para vazão · substituir por foto autorizada",
    kind: "placeholder",
  },
  dimensional: {
    src: "/visuals/dimensional.webp",
    alt: "Placeholder fotográfico abstrato para medição dimensional.",
    caption:
      "Imagem provisória para dimensional · substituir por foto autorizada",
    kind: "placeholder",
  },
  "fisico-quimica": {
    src: "/visuals/fisico-quimica.webp",
    alt: "Placeholder fotográfico abstrato para medições físico-químicas e eletroquímicas.",
    caption:
      "Imagem provisória para físico-química · substituir por foto autorizada",
    kind: "placeholder",
  },
  "optica-fotometria": {
    src: "/visuals/optica-fotometria.webp",
    alt: "Placeholder fotográfico abstrato para óptica e fotometria.",
    caption:
      "Imagem provisória para óptica/fotometria · substituir por foto autorizada",
    kind: "placeholder",
  },
  cliente: {
    src: "/visuals/cliente.webp",
    alt: "Placeholder fotográfico abstrato para Área do Cliente e histórico operacional.",
    caption:
      "Imagem provisória para Área do Cliente · substituir por foto autorizada",
    kind: "placeholder",
  },
  conteudo: {
    src: "/visuals/conteudo.webp",
    alt: "Placeholder fotográfico abstrato para conteúdo técnico e documentação.",
    caption:
      "Imagem provisória para conteúdo técnico · substituir por foto autorizada",
    kind: "placeholder",
  },
  "manometro-digital": {
    src: "/visuals/manometro-digital.webp",
    alt: "Imagem ilustrativa de manômetro digital sem marca, com visor desligado e conexão metálica inferior.",
    caption:
      "Imagem ilustrativa gerada por IA · não representa equipamento da DS",
    kind: "photo",
  },
} satisfies Record<string, PageMedia>;
export type MediaKey = keyof typeof pageMedia;
export function mediaForKey(key: string | undefined): PageMedia {
  return pageMedia[(key || "processo") as MediaKey] ?? pageMedia.processo;
}
export function mediaForEquipment(
  quantitySlug: string,
  equipmentSlug: string,
): PageMedia {
  if (quantitySlug === "pressao" && equipmentSlug === "manometros")
    return pageMedia["manometro-digital"];
  return mediaForKey(quantitySlug);
}
