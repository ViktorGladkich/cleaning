"use client";

import React from "react";
import { BauHero } from "./BauHero";
import { ServicesGridSection } from "@/components/home/ServicesDualSection";
import { BAU_SERVICES_GRID } from "@/data/bauServices";
import { BauMinimalProtocol } from "./BauMinimalProtocol";
import { FaqSection } from "@/components/home/FaqSection";
import { BAU_FAQS } from "@/data/bauFaqs";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";
import { BauExtrasSection } from "./BauExtrasSection";

export function BauPageContent() {
  return (
    <div className="relative w-full bg-brand-cream text-brand-navy selection:bg-brand-navy selection:text-white">
      {/* 1. Full-bleed Monumental Hero with centered typography */}
      <BauHero />

      {/* 2. Main services: Trockenbau, Rückbau/Entkernung, Renovierung, Beräumung */}
      <ServicesGridSection
        id="bau-leistungen"
        eyebrow="Unsere Schwerpunkte"
        wrapTitles
        title={
          <>
            Trockenbau, Rückbau &amp; Renovierung.{" "}
            <span className="block font-normal text-brand-navy/80">
              Für private und gewerbliche Auftraggeber.
            </span>
          </>
        }
        subtitle="Weitere Bauanfragen sind ausdrücklich willkommen. Wir prüfen jedes Vorhaben individuell und stimmen den Leistungsumfang mit Ihnen ab."
        ctaText="Bauprojekt anfragen"
        ctaHref="/contacts?service=bauprojekt#anfrage"
        items={BAU_SERVICES_GRID}
        className="pb-6 sm:pb-8"
      />

      {/* 2.5 Smaller services, cooperation, equipment */}
      <BauExtrasSection />

      {/* 3. Deep Navy architectural statement with 4-step stacking protocol */}
      <BauMinimalProtocol />

      {/* 4. Minimalist FAQ reusing master FaqSection */}
      <FaqSection
        id="bau-faq"
        eyebrow="Häufige Fragen"
        title={
          <>
            Fragen zu Anfrage &amp;{" "}
            <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-medium ml-0">
              Bauprojekt.
            </span>
          </>
        }
        subtitle="Antworten zu Projektprüfung, Partnerunternehmen, Rückbau und Unterlagen für Ihre Anfrage."
        imageSrc="/images/services/step-bau-4.webp"
        imageAlt="TADIK’S BAU Trockenbau und Renovierung"
        items={BAU_FAQS}
        className="z-20 pt-20 sm:pt-28 lg:pt-36 border-t border-slate-200/80"
      />

      {/* 5. Cinematic Closing CTA reusing master ClosingCtaSection */}
      <ClosingCtaSection
        id="bau-cta"
        eyebrow="Kontakt & Anfrage"
        title={
          <>
            Sie planen ein Bauprojekt? <br className="hidden sm:inline" />
            <span className="text-white/70">Wir freuen uns auf Ihre Anfrage.</span>
          </>
        }
        subtitle="Beschreiben Sie uns Ihr Vorhaben – auch wenn die gewünschte Leistung nicht ausdrücklich auf der Webseite aufgeführt ist. Wir prüfen die Möglichkeiten und melden uns zur weiteren Abstimmung. Telefon 0371 23559475 · info@tadiks-cleaning.de"
        ctaText="Jetzt Bauprojekt anfragen"
        ctaHref="/contacts?service=bauprojekt#anfrage"
        imageSrc="/images/hero_premium_cleaning_bau.jpg"
        imageAlt="TADIK’S BAU in Chemnitz"
      />
    </div>
  );
}
