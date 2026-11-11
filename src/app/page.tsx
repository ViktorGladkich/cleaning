import React from "react";
import { Hero } from "@/components/home/Hero";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesDualSection } from "@/components/home/ServicesDualSection";
import { WerkschauSection } from "@/components/home/WerkschauSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";
import { ContactPersonSection } from "@/components/shared/ContactPersonSection";

export default function HomePage() {
  return (
    <div className="w-full bg-brand-cream">
      {/* 1. Hero with Pin & 5-Column Staircase Curtain Scroll Wipe */}
      <Hero />

      {/* 1.5 Infinite Partners Marquee */}
      <PartnersMarquee />

      {/* 2. Über uns / Editorial Header Manifesto */}
      <AboutSection />

      {/* 3. Services Dual Section (Reinigung & Bau - Option 02 Grid with Parallax) */}
      <ServicesDualSection />

      {/* 4. Werkschau & Handwerksdetails (Pinned Gallery with Floating Parallax Cards) */}
      <WerkschauSection />

      {/* 5. Process / Ablauf Section (Awwwards Floating Frosted Cards) */}
      <ProcessSection />

      {/* 6. Inhaber & persönlicher Ansprechpartner */}
      <ContactPersonSection />

      {/* 7. Häufig gestellte Fragen / FAQ (Split Screen Editorial Accordion) */}
      <FaqSection />

      {/* 8. Cinematic Closing CTA */}
      <ClosingCtaSection />
    </div>
  );
}
