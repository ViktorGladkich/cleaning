import type { ServiceGridItem } from "@/components/home/ServicesDualSection";
import { getServicePath, getServicesByCategory } from "@/data/serviceDetails";

export type ServiceCardItem = ServiceGridItem;

/** Cards for the cleaning overview, built from the service details. */
export const REINIGUNG_SERVICES_GRID: ServiceCardItem[] = getServicesByCategory(
  "reinigung"
).map((service) => ({
  id: service.slug,
  title: service.title,
  tagline: service.isNew ? `${service.number} · NEU` : service.number,
  category: "REINIGUNG",
  imageSrc: service.imageSrc,
  imageAlt: service.imageAlt,
  bullets: service.features,
  href: getServicePath(service),
  description: service.subtitle,
  ctaLabel: service.ctaLabel,
  ctaHref: `/contacts?service=${service.slug}#anfrage`,
}));
