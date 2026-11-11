"use client";

import React from "react";
import { AboutHero } from "./AboutHero";
import { AboutSection } from "@/components/home/AboutSection";
import { AboutValuesSection } from "./AboutValuesSection";
import { WerkschauSection } from "@/components/home/WerkschauSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ContactPersonSection } from "@/components/shared/ContactPersonSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";

export function AboutPageContent() {
  return (
    <div className="relative w-full bg-brand-cream text-brand-navy selection:bg-brand-navy selection:text-white">
      {/* 1. Full-bleed Monumental Hero matching ReinigungHero & BauHero */}
      <AboutHero />

      {/* 2. Editorial Manifesto with word-scrub highlight, dual image marquee & rolling odometer stats */}
      <AboutSection
        id="manifesto"
        eyebrow="Unsere Philosophie"
        ctaText="Kostenlose Erstberatung"
        ctaHref="/contacts"
      />

      {/* 3. The 4 Quality Standards & Core Pillars */}
      <AboutValuesSection />

      {/* 4. Werkschau & Projektdetails (Pinned Gallery with Floating Parallax Cards) */}
      <WerkschauSection />

      {/* 5. Process / Ablauf (4 Structured Steps from inspection to turnkey handover) */}
      <ProcessSection />

      {/* 6. Inhaber & persönlicher Ansprechpartner */}
      <ContactPersonSection />

      {/* 7. Comprehensive Company & Standards FAQ */}
      <FaqSection
        id="about-faq"
        eyebrow="Häufige Fragen"
        title={
          <>
            Häufige Fragen zu{" "}
            <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-medium ml-0">
              TADIK’S.
            </span>
          </>
        }
        subtitle="Antworten zu Anfrage, Leistungen, Ansprechpartner und Karriere."
        imageSrc="/images/services/step-reinigung-1.webp"
        imageAlt="TADIK’S Cleaning & BAU in Chemnitz"
        className="z-20 pt-20 sm:pt-28 lg:pt-36 border-t border-slate-200/80"
      />

      {/* 8. Cinematic Closing CTA */}
      <ClosingCtaSection
        id="about-cta"
        eyebrow="Persönliche Beratung"
        title={
          <>
            Lernen Sie uns kennen. <br className="hidden sm:inline" />
            <span className="text-white/70">Gemeinsam Werte schaffen.</span>
          </>
        }
        subtitle="Wir beraten Sie gern unverbindlich vor Ort in Chemnitz und Mittelsachsen. Lassen Sie uns über Ihr Bau- oder Reinigungsvorhaben sprechen."
        ctaText="Kostenlose Beratung anfordern"
        ctaHref="/contacts"
      />
    </div>
  );
}
