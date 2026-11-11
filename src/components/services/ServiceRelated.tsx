import React from "react";
import { ServiceDetailData, getServicePath } from "@/data/serviceDetails";
import { ServicesGridSection } from "@/components/home/ServicesDualSection";

interface ServiceRelatedProps {
  services: ServiceDetailData[];
  categoryHref: string;
}

export function ServiceRelated({ services, categoryHref }: ServiceRelatedProps) {
  return (
    <ServicesGridSection
      id="weitere-leistungen"
      eyebrow=""
      wrapTitles
      title="Weitere Leistungen"
      subtitle="Ergänzende Leistungen von TADIK’S Cleaning & BAU in Chemnitz und Umgebung."
      ctaText="Alle Leistungen ansehen"
      ctaHref={categoryHref}
      items={services.map((service) => ({
        id: service.slug,
        title: service.title,
        tagline: service.categoryLabel.toUpperCase(),
        description: service.subtitle,
        imageSrc: service.imageSrc,
        imageAlt: service.imageAlt,
        bullets: service.features.slice(0, 3),
        href: getServicePath(service),
      }))}
    />
  );
}
