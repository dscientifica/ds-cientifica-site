export type Segment = {
  slug: string;
  title: string;
  navigationLabel: string;
  extendedLabel?: string;
  href: string;
  description: string;
};

export const segments: Segment[] = [
  {
    slug: "farmaceutico",
    title: "Farmacêutico",
    navigationLabel: "Farmacêutico",
    href: "/segmentos/farmaceutico",
    description:
      "Hub inicial para demandas de laboratórios e processos do segmento farmacêutico.",
  },
  {
    slug: "quimico",
    title: "Químico",
    navigationLabel: "Químico",
    href: "/segmentos/quimico",
    description:
      "Hub inicial para demandas de laboratórios e processos do segmento químico.",
  },
  {
    slug: "alimentos-bebidas",
    title: "Alimentos e Bebidas",
    navigationLabel: "Alimentos e Bebidas",
    href: "/segmentos/alimentos-bebidas",
    description:
      "Hub inicial para demandas de laboratórios e processos de alimentos e bebidas.",
  },
  {
    slug: "automotivo",
    title: "Automotivo",
    navigationLabel: "Automotivo",
    href: "/segmentos/automotivo",
    description:
      "Hub inicial para demandas de laboratórios e processos do segmento automotivo.",
  },
  {
    slug: "hospitalar",
    title: "Hospitalar",
    navigationLabel: "Hospitalar",
    href: "/segmentos/hospitalar",
    description:
      "Hub inicial para demandas de laboratórios e processos do segmento hospitalar.",
  },
  {
    slug: "industrial",
    title: "Industrial",
    navigationLabel: "Industrial",
    extendedLabel: "Outros segmentos industriais",
    href: "/segmentos/industrial",
    description:
      "Hub inicial para demandas de laboratórios e processos industriais.",
  },
];

export const segmentBySlug = Object.fromEntries(
  segments.map((segment) => [segment.slug, segment]),
) as Record<string, Segment>;
