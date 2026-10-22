"use client";

import React from "react";
import { ContactHero } from "./ContactHero";
import { ContactHubSection } from "./ContactHubSection";
import { ContactCoverageSection } from "./ContactCoverageSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CONTACT_FAQS } from "@/data/contactFaqs";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";

export function ContactPageContent() {
  return (
    <div className="relative w-full bg-brand-cream text-brand-navy selection:bg-brand-navy selection:text-white">
      {/* 1. Full-bleed Monumental Hero matching Reinigung, Bau & About */}
      <ContactHero />

      {/* 2. Interactive Inquiry Form & Direct Meister Contact Details */}
      <ContactHubSection />

      {/* 3. Regional Coverage in Chemnitz & Central Saxony */}
      <ContactCoverageSection />

      {/* 4. Contact, Inspection & Festpreis FAQ */}
      <FaqSection
        id="contact-faq"
        eyebrow="Ablauf & Besichtigung"
        title={
          <>
            Häufige Fragen zu Beratung &amp;{" "}
            <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-medium ml-0">
              Angebotserstellung.
            </span>
          </>
        }
        subtitle="Verbindliche Antworten zur kostenlosen Vor-Ort-Besichtigung, Terminsicherheit und unserem Festpreisversprechen."
        imageSrc="/images/hero_contact_monumental.jpg"
        imageAlt="Tadiks Meisterbetrieb Kundenberatung und Vor-Ort-Termin Chemnitz"
        items={CONTACT_FAQS}
        className="z-20 pt-20 sm:pt-28 lg:pt-36 border-t border-slate-200/80"
      />

      {/* 5. Cinematic Closing Hotline Banner */}
      <ClosingCtaSection
        id="direct-call"
        eyebrow="Direkter Anruf"
        title={
          <>
            Lieber direkt sprechen? <br className="hidden sm:inline" />
            <span className="text-white/70">Wir sind für Sie erreichbar.</span>
          </>
        }
        subtitle="Rufen Sie uns direkt an. Unser Chemnitzer Büro berät Sie gerne sofort persönlich zu Ihrem Projekt."
        ctaText="Jetzt 0176 84337228 anrufen"
        ctaHref="tel:+4917684337228"
        secondaryCtaText="E-Mail senden"
        secondaryCtaHref="mailto:info@tadiks.de"
        imageSrc="/images/hero_contact_monumental.jpg"
        imageAlt="Tadiks direkte Kundenberatung Chemnitz"
      />
    </div>
  );
}
