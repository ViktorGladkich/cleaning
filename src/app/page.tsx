import React from "react";
import { Hero } from "@/components/home/Hero";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesDualSection } from "@/components/home/ServicesDualSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";

export default function HomePage() {
  return (
    <div className="w-full bg-brand-cream">
      {/* 1. Hero with Pin & 5-Column Staircase Curtain Scroll Wipe */}
      <Hero />

      {/* 1.5 Infinite Partners Marquee */}
      <PartnersMarquee />

      {/* 2. Über uns / About Section (Awwwards Grade) */}
      <AboutSection />

      {/* 3. Cinematic Dual-Pillar Services Section (Reinigung & Bau) */}
      <ServicesDualSection />

      {/* 4. Process / Ablauf Section (Awwwards Floating Frosted Cards) */}
      <ProcessSection />

      {/* 5. Kundenstimmen / Social Proof (Authentic Editorial Grid) */}
      <TestimonialsSection />

      {/* 6. Häufig gestellte Fragen / FAQ (Split Screen Editorial Accordion) */}
      <FaqSection />

      {/* 7. Cinematic Closing CTA */}
      <ClosingCtaSection />
    </div>
  );
}
