export type Segment = {
  slug: string;
  title: string;
  description: string;
};

export const segments: Segment[] = [
  {
    slug: "farmaceutico",
    title: "Farmacêutico",
    description:
      "Hub inicial para demandas de laboratórios e processos do segmento farmacêutico.",
  },
  {
    slug: "quimico",
    title: "Químico",
    description:
      "Hub inicial para demandas de laboratórios e processos do segmento químico.",
  },
  {
    slug: "alimentos-bebidas",
    title: "Alimentos e Bebidas",
    description:
      "Hub inicial para demandas de laboratórios e processos de alimentos e bebidas.",
  },
  {
    slug: "automotivo",
    title: "Automotivo",
    description:
      "Hub inicial para demandas de laboratórios e processos do segmento automotivo.",
  },
  {
    slug: "hospitalar",
    title: "Hospitalar",
    description:
      "Hub inicial para demandas de laboratórios e processos do segmento hospitalar.",
  },
  {
    slug: "industrial",
    title: "Industrial",
    description:
      "Hub inicial para demandas de laboratórios e processos industriais.",
  },
];

export const segmentBySlug = Object.fromEntries(
  segments.map((segment) => [segment.slug, segment]),
) as Record<string, Segment>;
