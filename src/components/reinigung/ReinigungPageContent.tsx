"use client";

import React from "react";
import { ReinigungHero } from "./ReinigungHero";
import { ServicesGridSection } from "@/components/home/ServicesDualSection";
import { REINIGUNG_SERVICES_GRID } from "@/data/reinigungServices";
import { ReinigungMinimalProtocol } from "./ReinigungMinimalProtocol";
import { FaqSection } from "@/components/home/FaqSection";
import { REINIGUNG_FAQS } from "@/data/reinigungFaqs";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";
import { EmergencySection } from "./EmergencySection";

export function ReinigungPageContent() {
  return (
    <div className="relative w-full bg-brand-cream text-brand-navy selection:bg-brand-navy selection:text-white">
      {/* 1. Ultra-clean full-frame hero with monumental typography & 4 minimalist metrics */}
      <ReinigungHero />

      {/* 2. All nine cleaning services, each with its own request button */}
      <ServicesGridSection
        id="leistungen"
        eyebrow="Reinigungsleistungen im Überblick"
        wrapTitles
        title={
          <>
            Professionelle Reinigung{" "}
            <span className="block font-normal text-brand-navy/80">
              für Gewerbe und Privatkunden in Chemnitz &amp; Umgebung.
            </span>
          </>
        }
        subtitle="TADIK’S Cleaning unterstützt Unternehmen, Hausverwaltungen und Privatkunden mit individuell abgestimmten Reinigungsleistungen. Ob regelmäßige Objektpflege, einmalige Grundreinigung oder umfangreiche Sonderaufträge – wir besprechen Ihren Bedarf und erstellen ein passendes Angebot."
        ctaText="Reinigung anfragen"
        ctaHref="/contacts#anfrage"
        items={REINIGUNG_SERVICES_GRID}
      />

      {/* 2.5 Urgent cleaning: phone + request form */}
      <EmergencySection />

      {/* 3. Deep Navy architectural statement with 4-step sequence */}
      <ReinigungMinimalProtocol />

      {/* 4. Minimalist FAQ reusing master FaqSection */}
      <FaqSection
        id="reinigung-faq"
        eyebrow="Häufige Fragen"
        title={
          <>
            Fragen zu Anfrage &amp;{" "}
            <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-medium ml-0">
              Reinigungsablauf.
            </span>
          </>
        }
        subtitle="Antworten zu Angebot, Umfang, kurzfristigen Einsätzen und Einsatzgebiet."
        imageSrc="/images/services/step-reinigung-4.webp"
        imageAlt="Reinigungsteam von TADIK’S Cleaning bei der Arbeit"
        items={REINIGUNG_FAQS}
        className="z-20 pt-20 sm:pt-28 lg:pt-36 border-t border-slate-200/80"
      />

      {/* 5. Cinematic Closing CTA reusing master ClosingCtaSection */}
      <ClosingCtaSection
        id="reinigung-cta"
        eyebrow="Reinigung anfragen"
        title={
          <>
            Sauberkeit nach Vereinbarung. <br className="hidden sm:inline" />
            <span className="text-white/70">Persönlich abgestimmt.</span>
          </>
        }
        subtitle="Schildern Sie uns Ihren Reinigungsbedarf in Chemnitz und Umgebung – wir melden uns zur Abstimmung und erstellen Ihnen ein passendes Angebot."
        ctaText="Jetzt anfragen"
        ctaHref="/contacts#anfrage"
        imageSrc="/images/hero_premium_cleaning_bau.jpg"
        imageAlt="TADIK’S Cleaning Gebäudereinigung in Chemnitz"
      />
    </div>
  );
}
