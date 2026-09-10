export const site = {
  name: "DS Científica",
  indexable: false,
  contacts: { whatsapp: "", email: "", axionUrl: "" },
  form: { enabled: false },
} as const;
export const whatsappUrl = /^\d{10,15}$/.test(site.contacts.whatsapp)
  ? `https://wa.me/${site.contacts.whatsapp}`
  : undefined;
export function resolveAxionUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}
export const axionUrl = resolveAxionUrl(site.contacts.axionUrl);
export const clientAreaHref = axionUrl || "/area-do-cliente";
export const navigation = [
  { label: "Início", href: "/" },
  { label: "Calibração", href: "/calibracao" },
  { label: "Manutenção", href: "/manutencao" },
  { label: "Qualificação", href: "/qualificacao" },
  { label: "Produtos", href: "/produtos" },
  { label: "Segmentos", href: "/segmentos" },
  { label: "Conteúdo Técnico", href: "/conteudo-tecnico" },
  { label: "Sobre a DS", href: "/sobre" },
  { label: "Contato", href: "/contato" },
  { label: "Área do Cliente", href: clientAreaHref },
];
