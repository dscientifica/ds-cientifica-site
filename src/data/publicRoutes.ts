import { calibrationQuantities, productCategories } from "./catalog.ts";
import { segments } from "./segments.ts";

const calibrationRoutes = calibrationQuantities.flatMap((quantity) => [
  `/calibracao/${quantity.slug}`,
  ...quantity.equipment.map(
    (equipment) => `/calibracao/${quantity.slug}/${equipment.slug}`,
  ),
]);

const productRoutes = productCategories.flatMap((category) => [
  `/produtos/${category.slug}`,
  ...category.types.map((type) => `/produtos/${category.slug}/${type.slug}`),
]);

const segmentRoutes = [
  "/segmentos",
  ...segments.map((segment) => segment.href),
];

export const publicRoutes = [
  "/",
  "/calibracao",
  ...calibrationRoutes,
  "/manutencao",
  "/qualificacao",
  "/produtos",
  ...productRoutes,
  ...segmentRoutes,
  "/conteudo-tecnico",
  "/sobre",
  "/contato",
  "/area-do-cliente",
] as const;
