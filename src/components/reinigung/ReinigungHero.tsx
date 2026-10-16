"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CtaButton } from "@/components/ui/CtaButton";

export function ReinigungHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".reini-hero-line",
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.15, stagger: 0.12, ease: "power4.out", delay: 0.2 }
      )
        .fromTo(
          ".reini-hero-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".reini-hero-cta",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          ".reini-hero-preview-badge",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".reini-hero-metric",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  const scrollToCatalog = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector("#leistungen");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-brand-cream">
      {/* Outer padding to nest cleanly right under top header */}
      <div className="w-full p-2.5 sm:p-3.5">
        <div
          ref={heroCardRef}
          className="relative w-full min-h-[580px] lg:min-h-[660px] rounded-[10px] overflow-hidden bg-brand-navy text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14"
        >
          {/* Subtle architectural mesh texture behind */}
          <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(#9FBAF1 1px, transparent 1px), radial-gradient(#9FBAF1 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                backgroundPosition: "0 0, 16px 16px",
              }}
            />
          </div>

          {/* Top Row: Clear Breadcrumb Identifier indicating we are in REINIGUNG */}
          <div className="relative z-20 flex items-center justify-between text-xs sm:text-sm font-mono tracking-wider uppercase text-white/70 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-white">
              <span className="text-white/40">Home</span>
              <span className="text-white/40">/</span>
              <span className="text-brand-lime font-semibold">Gebäudereinigung &amp; Hygiene</span>
            </div>
            <span className="hidden sm:inline-block text-white/60">
              Chemnitz &middot; Sachsen
            </span>
          </div>

          {/* Main Content: Distinctive Split Hero (Editorial Text on Left, Floating Architectural Photo on Right) */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8 sm:py-12">
            
            {/* Left Column: Headline, Subtitle, CTAs */}
            <div className="lg:col-span-7 max-w-2xl">
              <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-medium text-white tracking-tight leading-[1.06] mb-5">
                <span className="block overflow-hidden">
                  <span className="block reini-hero-line will-change-transform">
                    Klinische Reinheit.
                  </span>
                </span>
                <span className="block overflow-hidden pt-1">
                  <span className="block reini-hero-line text-brand-lime will-change-transform">
                    Spürbare Perfektion.
                  </span>
                </span>
              </h1>

              <p className="reini-hero-desc text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 font-light max-w-xl">
                Professionelle Gebäudereinigung in Chemnitz nach RKI-Standards:
                Unterhalts-, Glas-, Grund- und Bauendreinigung durch festes,
                geschultes Stammpersonal mit 100% Festpreisgarantie.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="reini-hero-cta">
                  <CtaButton
                    href="/contacts"
                    size="md"
                    className="h-11 sm:h-[46px] px-6 text-sm sm:text-base rounded-[8px]"
                  >
                    Besichtigung vereinbaren
                  </CtaButton>
                </div>

                <div className="reini-hero-cta">
                  <button
                    type="button"
                    onClick={scrollToCatalog}
                    className="inline-flex items-center gap-2 h-11 sm:h-[46px] px-5 sm:px-6 rounded-[8px] text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/35 text-sm sm:text-base font-medium transition-all cursor-pointer"
                  >
                    <span>6 Leistungsbereiche</span>
                    <ArrowDown className="w-4 h-4 text-brand-lime" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Distinctive Floating Photo Card (immediately differentiates this page from the homepage) */}
            <div className="lg:col-span-5 relative hidden sm:flex justify-center lg:justify-end">
              <div className="reini-hero-preview-badge relative w-full max-w-[420px] aspect-4/3 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                <Image
                  src="/images/hero_cleaning_bg2.webp"
                  alt="Tadiks professionelle Reinigungstechnik"
                  fill
                  priority
                  className="object-cover object-center transform scale-105"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Micro Label on image */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono text-white/90">
                  <span>Zertifizierte RKI-Hygiene</span>
                  <span className="text-brand-lime">Kärcher Pro</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: 4 Clean Minimalist Stats */}
          <div className="relative z-20 pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="reini-hero-metric">
              <span className="block text-xl sm:text-2xl font-medium text-white">100%</span>
              <span className="block text-xs font-mono text-white/60 tracking-wider uppercase mt-0.5">
                Ökologische Tenside
              </span>
            </div>
            <div className="reini-hero-metric">
              <span className="block text-xl sm:text-2xl font-medium text-white">24h</span>
              <span className="block text-xs font-mono text-white/60 tracking-wider uppercase mt-0.5">
                Reaktionszeit
              </span>
            </div>
            <div className="reini-hero-metric">
              <span className="block text-xl sm:text-2xl font-medium text-white">5 Mio. €</span>
              <span className="block text-xs font-mono text-white/60 tracking-wider uppercase mt-0.5">
                Betriebshaftpflicht
              </span>
            </div>
            <div className="reini-hero-metric">
              <span className="block text-xl sm:text-2xl font-medium text-white">100%</span>
              <span className="block text-xs font-mono text-white/60 tracking-wider uppercase mt-0.5">
                Festpreisgarantie
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
