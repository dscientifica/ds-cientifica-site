export const site = {
  name: "DS Científica",
  // Pilot builds must remain excluded from indexing until DS homologation.
  indexable: false,
  contacts: {
    whatsapp: "", // Confirmed international digits only, e.g. country + area + number.
    email: "",
    axionUrl: "", // Do not assume the proposed subdomain is operational.
  },
  form: { enabled: false }, // No endpoint, persistence, analytics or submission in this phase.
} as const;

export const whatsappUrl = /^\d{10,15}$/.test(site.contacts.whatsapp)
  ? `https://wa.me/${site.contacts.whatsapp}`
  : undefined;
export const axionUrl = site.contacts.axionUrl.startsWith("https://")
  ? site.contacts.axionUrl
  : undefined;

export const navigation = [
  { label: "Início", href: "/" },
  { label: "Calibração", href: "/calibracao" },
  { label: "Manutenção", href: "/#manutencao" },
  { label: "Qualificação", href: "/#qualificacao" },
  { label: "Produtos", href: "/#produtos" },
  { label: "Segmentos", href: "/#segmentos" },
  { label: "Conteúdo Técnico", href: "/#conteudo-tecnico" },
  { label: "Sobre a DS", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];
