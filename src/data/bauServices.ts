import type { ServiceGridItem } from "@/components/home/ServicesDualSection";
import { getServicePath, getServicesByCategory } from "@/data/serviceDetails";

export type { ServiceGridItem };

/** Cards for the construction overview, built from the service details. */
export const BAU_SERVICES_GRID: ServiceGridItem[] = getServicesByCategory("bau").map(
  (service) => ({
    id: service.slug,
    title: service.title,
    tagline: service.number,
    category: "BAU",
    imageSrc: service.imageSrc,
    imageAlt: service.imageAlt,
    bullets: service.features,
    href: getServicePath(service),
    description: service.subtitle,
    ctaLabel: service.ctaLabel,
    ctaHref: `/contacts?service=${service.slug}#anfrage`,
  })
);
