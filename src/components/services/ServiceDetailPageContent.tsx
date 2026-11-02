"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ServiceDetailData, ALL_SERVICE_DETAILS } from "@/data/serviceDetails";
import { FaqSection } from "@/components/home/FaqSection";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";
import { ServiceDetailHero } from "./ServiceDetailHero";
import { ServiceDetailBentoMatrix } from "./ServiceDetailBentoMatrix";
import { ServiceDetailComparison } from "./ServiceDetailComparison";

interface ServiceDetailPageContentProps {
  service: ServiceDetailData;
}

export function ServiceDetailPageContent({
  service,
}: ServiceDetailPageContentProps) {
  const relatedServices = ALL_SERVICE_DETAILS.filter(
    (s) => s.slug !== service.slug && service.relatedSlugs?.includes(s.slug)
  ).slice(0, 3);

  const categoryBackLink =
    service.category === "reinigung" ? "/services" : "/bau";

  return (
    <main className="min-h-screen bg-brand-cream text-brand-navy selection:bg-brand-navy selection:text-white">
      {/* 1. Monumental Architectural Hero */}
      <ServiceDetailHero service={service} />

      {/* 2. Bento Specification Matrix */}
      <ServiceDetailBentoMatrix service={service} />

      {/* 3. Editorial Quality Comparison Table */}
      <ServiceDetailComparison slug={service.slug} />

      {/* 4. The 4-Step Master Protocol Timeline */}
      <section className="py-20 sm:py-28 bg-white border-y border-brand-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-brand-navy/60 block mb-2">
              VERBINDLICHER PROZESS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-brand-navy tracking-tight">
              Ihr Projekt in 4 transparenten Stufen.
            </h2>
            <p className="mt-4 text-base text-brand-navy/70">
              Vom ersten Anruf bis zur finalen Abnahme: Bei Tadiks wissen Sie zu jedem
              Zeitpunkt genau, wer was tut und wann die Fertigstellung erfolgt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-7 sm:p-8 rounded-3xl bg-brand-cream border border-brand-navy/10 flex flex-col justify-between hover:shadow-lg hover:border-brand-navy/20 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-lime font-mono font-bold flex items-center justify-center text-lg mb-6 shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-xl text-brand-navy mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-brand-navy/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-navy/10 flex items-center text-xs font-mono text-brand-navy/50">
                  <span>Stufe {step.number} von 04</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <FaqSection
          eyebrow="HÄUFIG GESTELLTE FRAGEN"
          title={
            <>
              Fragen &amp; Antworten zur{" "}
              <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-normal ml-0">
                {service.title}.
              </span>
            </>
          }
          subtitle="Hier finden Sie transparente Antworten auf die wichtigsten Fragen unserer Kunden in Chemnitz und Mittelsachsen."
          items={service.faqs.map((f) => ({
            category: service.title.toUpperCase(),
            question: f.question,
            answer: f.answer,
          }))}
        />
      )}

      {/* 7. Related Services Grid */}
      {relatedServices.length > 0 && (
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-brand-navy/60 block mb-2">
                SYNERGIEN &amp; ERGÄNZUNGEN
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-brand-navy tracking-tight">
                Weitere Gewerke unseres Meisterbetriebs
              </h2>
            </div>
            <Link
              href={categoryBackLink}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-light-blue transition-colors group"
            >
              <span>Alle {service.categoryLabel} ansehen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.category === "bau" ? "bau" : "services"}/${rel.slug}`}
                className="group p-6 sm:p-7 rounded-3xl bg-white border border-brand-navy/10 shadow-sm hover:shadow-xl hover:border-brand-navy/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-5 bg-brand-navy/5 shadow-inner">
                    <Image
                      src={rel.imageSrc}
                      alt={rel.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-xs uppercase font-mono text-brand-navy/50">
                    {rel.categoryLabel}
                  </span>
                  <h3 className="font-bold text-xl text-brand-navy mt-1 group-hover:text-brand-light-blue transition-colors">
                    {rel.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-brand-navy/70 line-clamp-2 leading-relaxed">
                    {rel.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-navy/10 flex items-center justify-between text-xs font-semibold text-brand-navy">
                  <span>Leistungsspezifikation ansehen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-navy" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 8. Monumental Closing Call to Action */}
      <ClosingCtaSection
        id="service-cta"
        eyebrow="TADIKS MEISTERBETRIEB CHEMNITZ"
        title={
          <>
            Bereit für meisterhafte{" "}
            <span className="text-brand-lime font-light">{service.title}</span>{" "}
            in Sachsen?
          </>
        }
        subtitle="Sichern Sie sich Ihren Wunschtermin und ein garantiertes Festpreisangebot ohne Überraschungen. Individuelle Angebotskalkulation innerhalb von 24 Stunden."
        ctaText="Unverbindliches Angebot anfordern"
        ctaHref={`/contacts?service=${encodeURIComponent(service.slug)}`}
      />
    </main>
  );
}
