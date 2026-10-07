"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { RollingText } from "@/components/animations/RollingText";
import { CtaButton } from "@/components/ui/CtaButton";

interface ServiceGridItem {
  id: string;
  title: string;
  tagline: string;
  category: "REINIGUNG" | "BAU";
  imageSrc: string;
  imageAlt: string;
  bullets: string[];
  href: string;
}

const SERVICES: ServiceGridItem[] = [
  {
    id: "unterhalt",
    title: "Unterhaltsreinigung",
    tagline: "BÜRO-, KANZLEI- & PRAXISHYGIENE IN SACHSEN",
    category: "REINIGUNG",
    imageSrc: "/images/service_grid_unterhalt.jpg",
    imageAlt: "Professionelle Unterhaltsreinigung in Chemnitz und Sachsen",
    bullets: [
      "Feste Objektleiter & feste Fachkräfte",
      "Tägliche, wöchentliche oder flexible Intervalle",
      "RKI- & DIN-konforme Dokumentation",
    ],
    href: "/services",
  },
  {
    id: "glas",
    title: "Glas- & Fassadenreinigung",
    tagline: "STREIFENFREIE SPEZIALREINIGUNG BIS 20M HÖHE",
    category: "REINIGUNG",
    imageSrc: "/images/service_grid_glas.jpg",
    imageAlt: "Streifenfreie Glas- und Fensterreinigung in Sachsen",
    bullets: [
      "Modernste Osmose-Reinstwassertechnik",
      "Inklusive Rahmen-, Falz- & Simsreinigung",
      "Schaufenster, Wintergärten & Glasfassaden",
    ],
    href: "/services",
  },
  {
    id: "bauende",
    title: "Bauendreinigung",
    tagline: "BEZUGSFERTIGE SCHLÜSSELÜBERGABE NACH BAU & SANIERUNG",
    category: "REINIGUNG",
    imageSrc: "/images/service_grid_bauende.jpg",
    imageAlt: "Bezugsfertige Bauendreinigung in Sachsen",
    bullets: [
      "Zementschleier- & feinstaubfreie Übergabe",
      "Für Bauherren, Architekten & Wohnungsbau",
      "Verlässliche Abnahmegarantie nach VOB",
    ],
    href: "/services",
  },
  {
    id: "trockenbau",
    title: "Trockenbau & Akustik",
    tagline: "DIN-GERECHTE WAND- & DECKENSYSTEME, SCHALLSCHUTZ",
    category: "BAU",
    imageSrc: "/images/service_grid_trockenbau.jpg",
    imageAlt: "Präziser Trockenbau und Akustikbau in Sachsen",
    bullets: [
      "Zertifizierter Brand-, Schall- & Feuchteschutz",
      "Akustikdecken & flexible Trennwände",
      "Millimetergenaue Laser-Ausrichtung",
    ],
    href: "/bau",
  },
  {
    id: "maler",
    title: "Maler- & Spachteltechnik",
    tagline: "HOCHWERTIGE SPACHTELSTUFEN Q1–Q4 & ANSTRICH",
    category: "BAU",
    imageSrc: "/images/service_grid_maler.jpg",
    imageAlt: "Malerarbeiten und Q1-Q4 Spachteltechnik in Sachsen",
    bullets: [
      "Streiflichtfreie Oberflächen für höchste Ansprüche",
      "Glattvlies, moderne Farbkonzepte & Lackierung",
      "Schadstofffreie, diffusionsoffene Markenfarben",
    ],
    href: "/bau",
  },
  {
    id: "sanierung",
    title: "Komplettsanierung",
    tagline: "ALLES AUS EINER HAND OHNE SCHNITTSTELLENVERLUST",
    category: "BAU",
    imageSrc: "/images/service_grid_sanierung.jpg",
    imageAlt: "Komplettsanierung von Altbauten und Gewerbeflächen in Sachsen",
    bullets: [
      "Entkernung, Trockenbau, Parkett & Feinreinigung",
      "Spezialisiert auf sächsische Altbauten & Lofts",
      "Fester deutscher Bauleiter & Termingarantie",
    ],
    href: "/bau",
  },
];

export function ServicesDualSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Silky smooth entrance timeline for header and cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        ".services-anim-eyebrow",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" }
      )
        .fromTo(
          ".services-anim-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power2.out" },
          "-=0.45"
        )
        .fromTo(
          ".services-anim-desc",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.55"
        )
        .fromTo(
          ".services-anim-cta",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
          "-=0.55"
        )
        // Staggered staircase with custom physical ladder heights from bottom
        // Row 1: Card 1 closest to top border (28px), Card 2 starts lower (56px), Card 3 starts even lower (84px)
        // Row 2: Card 4 starts close to Card 1 (36px), Card 5 starts lower (64px), Card 6 starts lower (92px)
        .fromTo(
          ".service-editorial-card",
          {
            y: (index: number) => {
              const ladderOffsets = [28, 56, 84, 36, 64, 92];
              return ladderOffsets[index] ?? 40;
            },
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.6"
        );

      // 2. Continuous smooth parallax drift on card images while scrolling through the section
      gsap.fromTo(
        ".service-card-parallax-img",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Leistungen & Services"
      className="relative z-10 w-full bg-brand-cream py-16 sm:py-24 overflow-x-clip"
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Clean German Eyebrow (consistent with AboutSection) --- */}
        <div className="services-anim-eyebrow mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/80 block">
            Unsere Leistungen
          </span>
        </div>

        {/* --- Header Row: Title on Left, Text & Right-Aligned Button on Right (Horizontally Aligned) --- */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-10 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <h2 className="services-anim-title text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-brand-navy leading-[1.15]">
              Zwei Kernbereiche. Meisterhafte Präzision.
            </h2>
          </div>

          {/* Right Column: Paragraph and CTA Button aligned to the right edge of the screen/grid */}
          <div className="flex flex-col items-start lg:items-end gap-5 max-w-md shrink-0 w-full lg:w-auto">
            <p className="services-anim-desc text-brand-navy/70 text-sm sm:text-base leading-relaxed text-left lg:text-right pt-1 lg:pt-1.5">
              Professionelle Gebäudereinigung und erstklassiges Bauhandwerk vereint unter einem Dach.
              Feste Ansprechpartner und verbindliche Festpreise in Chemnitz und ganz Sachsen.
            </p>
            <div className="services-anim-cta self-start lg:self-end">
              <CtaButton href="/services" size="md">
                Alle Leistungen ansehen
              </CtaButton>
            </div>
          </div>
        </div>

        {/* --- 6-Card Editorial Grid (3 Columns, 2 Rows) --- */}
        <div className="services-editorial-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-navy/20 bg-brand-cream">
          {SERVICES.map((card, idx) => (
            <Link
              key={card.id}
              href={card.href}
              className="service-editorial-card group relative border-r border-b border-brand-navy/20 p-6 sm:p-7 lg:p-8 flex flex-col justify-between overflow-hidden min-h-[460px] lg:min-h-[490px] bg-brand-cream text-brand-navy"
            >
              {/* Smooth mask fill layer: smoothly descends from the TOP of the card on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-brand-navy z-0 pointer-events-none origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out will-change-transform"
              />

              {/* --- Card Top: Title with RollingText + Direct Arrow (relative z-10 above mask) --- */}
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight leading-tight">
                    <RollingText
                      duplicateClassName="text-white"
                      className="text-brand-navy group-hover:text-white transition-colors duration-500 ease-out"
                    >
                      {card.title}
                    </RollingText>
                  </h3>

                  {/* Direct prominent arrow: No circle, unclipped, crisp, slides diagonally on hover */}
                  <div className="shrink-0 pt-0.5">
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-brand-navy group-hover:text-brand-lime transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 stroke-[1.8]" />
                  </div>
                </div>

                {/* Subtitle / Tagline: font-normal */}
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-normal text-brand-navy/60 group-hover:text-white/70 transition-colors duration-500 ease-out">
                  {card.tagline}
                </p>
              </div>

              {/* --- Card Center: Photographic Asset with Parallax (relative z-10) --- */}
              <div className="relative z-10 my-4 sm:my-6 flex items-center justify-center">
                <div className="service-card-image-wrap relative w-full aspect-[4/3] max-w-[270px] sm:max-w-[285px] rounded-[8px] overflow-hidden shadow-xs border border-brand-navy/15 group-hover:border-white/20 transition-all duration-500 ease-out">
                  <div className="service-card-parallax-img relative w-full h-[120%] -top-[10%] will-change-transform">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={idx < 3}
                    />
                  </div>
                </div>
              </div>

              {/* --- Card Bottom: Clean Highlights List (relative z-10) --- */}
              <div className="relative z-10 pt-4 border-t border-brand-navy/15 group-hover:border-white/15 transition-colors duration-500 ease-out">
                <ul className="space-y-1.5">
                  {card.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-center gap-2 text-[11px] sm:text-xs leading-relaxed text-brand-navy/70 group-hover:text-white/85 transition-colors duration-500 ease-out"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand-navy/40 group-hover:bg-brand-lime shrink-0 transition-colors duration-500 ease-out" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
