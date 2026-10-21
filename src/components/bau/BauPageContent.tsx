"use client";

import React from "react";
import { BauHero } from "./BauHero";
import { ServicesGridSection } from "@/components/home/ServicesDualSection";
import { BAU_SERVICES_GRID } from "@/data/bauServices";
import { BauMinimalProtocol } from "./BauMinimalProtocol";
import { FaqSection } from "@/components/home/FaqSection";
import { BAU_FAQS } from "@/data/bauFaqs";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";

export function BauPageContent() {
  return (
    <div className="relative w-full bg-brand-cream text-brand-navy selection:bg-brand-navy selection:text-white">
      {/* 1. Full-bleed Monumental Hero with centered typography */}
      <BauHero />

      {/* 2. Editorial 6-card grid reusing master ServicesGridSection */}
      <ServicesGridSection
        id="bau-leistungen"
        eyebrow="Bau- &amp; Ausbauleistungen im Überblick"
        title={
          <>
            Meisterhandwerk nach Maß.{" "}
            <span className="block font-normal text-brand-navy/80">
              Für Wohnbau, Gewerbe und schlüsselfertige Sanierung.
            </span>
          </>
        }
        subtitle="Alle Bau- und Ausbaugewerke unseres Meisterbetriebs — millimetergenau kalkuliert, termintreu getaktet und lückenlos aus einer Hand."
        ctaText="Kostenlose Besichtigung"
        ctaHref="/contacts"
        items={BAU_SERVICES_GRID}
      />

      {/* 3. Deep Navy architectural statement with 4-step stacking protocol */}
      <BauMinimalProtocol />

      {/* 4. Minimalist FAQ reusing master FaqSection */}
      <FaqSection
        id="bau-faq"
        eyebrow="Klarheit &amp; Verbindlichkeit"
        title={
          <>
            Häufige Fragen zu Ablauf &amp;{" "}
            <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-medium ml-0">
              Bauausführung.
            </span>
          </>
        }
        subtitle="Verbindliche Antworten zu Festpreisen, Bauleitung, Staubschutz, Gewerke-Koordination und VOB-Gewährleistung."
        imageSrc="/images/hero_premium_cleaning_bau.jpg"
        imageAlt="Tadiks Meisterbetrieb für Bau, Trockenbau und Sanierung"
        items={BAU_FAQS}
        className="z-20 pt-20 sm:pt-28 lg:pt-36 border-t border-slate-200/80"
      />

      {/* 5. Cinematic Closing CTA reusing master ClosingCtaSection */}
      <ClosingCtaSection
        id="bau-cta"
        eyebrow="Kostenloses Vor-Ort-Aufmaß"
        title={
          <>
            Präziser Ausbau. <br className="hidden sm:inline" />
            <span className="text-white/70">Garantierter Festpreis.</span>
          </>
        }
        subtitle="Wir prüfen Ihre Bausubstanz vor Ort in Chemnitz und Mittelsachsen und erstellen innerhalb von 24 Stunden Ihr verbindliches Festpreisangebot."
        ctaText="Kostenlose Besichtigung"
        ctaHref="/contacts"
        secondaryCtaText="0176 84337228"
        secondaryCtaHref="tel:+4917684337228"
        imageSrc="/images/hero_premium_cleaning_bau.jpg"
        imageAlt="Tadiks meisterhafter Bau und Trockenbau in Sachsen"
      />
    </div>
  );
}
