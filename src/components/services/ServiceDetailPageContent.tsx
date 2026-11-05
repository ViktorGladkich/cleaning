import React from "react";
import { ServiceDetailData, ALL_SERVICE_DETAILS } from "@/data/serviceDetails";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";
import { ServiceDetailHero } from "./ServiceDetailHero";
import { ServiceScope } from "./ServiceScope";
import { ServiceProcess } from "./ServiceProcess";
import { ServiceStandards } from "./ServiceStandards";
import { ServiceRelated } from "./ServiceRelated";

interface ServiceDetailPageContentProps {
  service: ServiceDetailData;
}

export function ServiceDetailPageContent({ service }: ServiceDetailPageContentProps) {
  const relatedServices = ALL_SERVICE_DETAILS.filter(
    (candidate) =>
      candidate.slug !== service.slug && service.relatedSlugs?.includes(candidate.slug)
  ).slice(0, 3);

  return (
    <div className="service-page min-h-screen w-full max-w-full overflow-x-clip bg-brand-cream text-brand-ink selection:bg-brand-ink selection:text-white">
      <ServiceDetailHero service={service} />
      <ServiceScope service={service} />
      <ServiceProcess service={service} />
      <ServiceStandards service={service} />
      {relatedServices.length > 0 && (
        <ServiceRelated
          services={relatedServices}
          categoryHref={service.category === "reinigung" ? "/services" : "/bau"}
        />
      )}
      <ClosingCtaSection
        id="service-cta"
        subtitle="Fordern Sie jetzt ein unverbindliches Angebot an. Wir melden uns innerhalb von 24 Stunden bei Ihnen."
        ctaText="Termin vereinbaren"
        ctaHref={`/contacts?service=${encodeURIComponent(service.slug)}`}
      />
    </div>
  );
}
