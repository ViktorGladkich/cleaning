import React from "react";
import { ServiceDetailData } from "@/data/serviceDetails";
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
      subtitle="Ergänzende Leistungen von Tadik's Cleaning in Chemnitz und Sachsen."
      ctaText="Alle Leistungen ansehen"
      ctaHref={categoryHref}
      items={services.map((service) => ({
        id: service.slug,
        title: service.title,
        tagline: service.subtitle,
        imageSrc: service.imageSrc,
        imageAlt: service.imageAlt,
        bullets: service.features.slice(0, 3),
        href: `/${service.category === "bau" ? "bau" : "services"}/${service.slug}`,
      }))}
    />
  );
}
