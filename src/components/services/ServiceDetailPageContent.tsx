import React from "react";
import { ServiceDetailData, ALL_SERVICE_DETAILS } from "@/data/serviceDetails";
import { EmergencySection } from "@/components/reinigung/EmergencySection";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";
import { ServiceDetailHero } from "./ServiceDetailHero";
import { ServiceScope } from "./ServiceScope";
import { ServiceProcess } from "./ServiceProcess";
import { ServiceStandards } from "./ServiceStandards";
import { ServiceRelated } from "./ServiceRelated";
import { ServiceReference } from "./ServiceReference";

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
      {service.reference && <ServiceReference reference={service.reference} />}
      <ServiceProcess service={service} />
      <ServiceStandards service={service} />
      {service.category === "reinigung" && <EmergencySection />}
      {relatedServices.length > 0 && (
        <ServiceRelated
          services={relatedServices}
          categoryHref={service.category === "reinigung" ? "/services" : "/bau"}
        />
      )}
      <ClosingCtaSection
        id="service-cta"
        subtitle={
          service.category === "bau"
            ? "Beschreiben Sie uns Ihr Vorhaben – wir prüfen die Möglichkeiten und melden uns zur weiteren Abstimmung."
            : "Schildern Sie uns Ihren Bedarf – wir melden uns zur Abstimmung und erstellen Ihnen ein passendes Angebot."
        }
        ctaText={service.ctaLabel}
        ctaHref={`/contacts?service=${encodeURIComponent(service.slug)}#anfrage`}
      />
    </div>
  );
}
