"use client";

import React from "react";
import { ReinigungHero } from "./ReinigungHero";
import { ServicesGridSection } from "@/components/home/ServicesDualSection";
import { REINIGUNG_SERVICES_GRID } from "@/data/reinigungServices";
import { ReinigungMinimalProtocol } from "./ReinigungMinimalProtocol";
import { FaqSection } from "@/components/home/FaqSection";
import { REINIGUNG_FAQS } from "@/data/reinigungFaqs";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";

export function ReinigungPageContent() {
  return (
    <div className="relative w-full bg-brand-cream text-brand-navy selection:bg-brand-navy selection:text-white">
      {/* 1. Ultra-clean full-frame hero with monumental typography & 4 minimalist metrics */}
      <ReinigungHero />

      {/* 2. Editorial 6-card grid reusing master ServicesGridSection */}
      <ServicesGridSection
        id="leistungen"
        eyebrow="Reinigungsleistungen im Überblick"
        title={
          <>
            Hygienestandards nach Maß.{" "}
            <span className="block font-normal text-brand-navy/80">
              Für Gewerbe, Industrie und anspruchsvolle Privatobjekte.
            </span>
          </>
        }
        subtitle="Alle Reinigungsleistungen unseres Meisterbetriebs — transparent kalkuliert, verlässlich getaktet und auf Wunsch flexibel kombinierbar."
        ctaText="Kostenlose Besichtigung"
        ctaHref="/contacts"
        items={REINIGUNG_SERVICES_GRID}
      />

      {/* 3. Deep Navy architectural statement with 4-step sequence */}
      <ReinigungMinimalProtocol />

      {/* 4. Minimalist FAQ reusing master FaqSection */}
      <FaqSection
        id="reinigung-faq"
        eyebrow="Klarheit & Transparenz"
        title={
          <>
            Häufige Fragen zu Ablauf &amp;{" "}
            <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-medium ml-0">
              Hygienestandards.
            </span>
          </>
        }
        subtitle="Verbindliche Antworten zu Festpreisen, Personal, Schlüsselsicherheit und Materialverträglichkeit auf einen Blick."
        imageSrc="/images/hero_premium_cleaning_bau.jpg"
        imageAlt="Tadiks Meisterbetrieb für Hygiene und Werterhalt"
        items={REINIGUNG_FAQS}
        className="z-20 pt-20 sm:pt-28 lg:pt-36 border-t border-slate-200/80"
      />

      {/* 5. Cinematic Closing CTA reusing master ClosingCtaSection */}
      <ClosingCtaSection
        id="reinigung-cta"
        eyebrow="Kostenlose Erstbesichtigung"
        title={
          <>
            Spürbare Reinheit. <br className="hidden sm:inline" />
            <span className="text-white/70">Dauerhafter Werterhalt.</span>
          </>
        }
        subtitle="Wir analysieren Ihre Flächen vor Ort in Chemnitz und Region und erstellen innerhalb von 24 Stunden Ihr verbindliches Festpreis-Leistungsverzeichnis."
        ctaText="Kostenlose Besichtigung"
        ctaHref="/contacts"
        secondaryCtaText="0176 84337228"
        secondaryCtaHref="tel:+4917684337228"
        imageSrc="/images/hero_premium_cleaning_bau.jpg"
        imageAlt="Tadiks meisterhafte Gebäudereinigung in Sachsen"
      />
    </div>
  );
}
