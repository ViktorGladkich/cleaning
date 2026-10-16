"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { RollingText } from "@/components/animations/RollingText";
import { CtaButton } from "@/components/ui/CtaButton";

interface CleaningServiceCard {
  slug: string;
  title: string;
  tagline: string;
  imageSrc: string;
  bullets: string[];
}

/**
 * Exact 5 cleaning services from the MegaMenu:
 * 1. Unterhaltsreinigung (/services/unterhaltsreinigung)
 * 2. Grundreinigung (/services/grundreinigung)
 * 3. Bauendreinigung (/services/bauendreinigung)
 * 4. Fenster- & Glasreinigung (/services/fensterreinigung)
 * 5. Büro- & Praxisreinigung (/services/bueroreinigung)
 * Plus specialized Polster- & Teppichreinigung to complete a balanced 6-card grid
 */
const MEGA_MENU_CLEANING_SERVICES: CleaningServiceCard[] = [
  {
    slug: "unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    tagline: "KONTINUIERLICHE PFLEGE FÜR GEWERBE & PRIVAT",
    imageSrc: "/images/service_grid_unterhalt.webp",
    bullets: [
      "Festes, geschultes Stammpersonal & Objektleitung",
      "Ergonomische 4-Farben-Mikrofaserhygiene nach RKI",
      "Materialschonende, biologisch abbaubare Reiniger",
    ],
  },
  {
    slug: "grundreinigung",
    title: "Grundreinigung",
    tagline: "INTENSIVE TIEFENHYGIENE BIS IN DIE KLEINSTE FUGE",
    imageSrc: "/images/leistungen_reinigung_1.jpg",
    bullets: [
      "Maschinelle Entschichtung von Hart- & Fliesenböden",
      "Kalk- & Fettbeseitigung in Sanitär- & Küchenbereichen",
      "Ideale Vorbereitung vor Mieterwechsel & Neuvermietung",
    ],
  },
  {
    slug: "bauendreinigung",
    title: "Bauendreinigung",
    tagline: "BEZUGSFERTIGE SCHLÜSSELÜBERGABE NACH BAU & SANIERUNG",
    imageSrc: "/images/service_grid_bauende.webp",
    bullets: [
      "Schonende Beseitigung von Baustaub, Zement & Farbresten",
      "Einsatz leistungsstarker HEPA-14 Feinstaubsauger",
      "Termintreue Abnahmegarantie für Architekten & Bauherren",
    ],
  },
  {
    slug: "fensterreinigung",
    title: "Fenster- & Glasreinigung",
    tagline: "OSMOSE-REINSTWASSERTECHNIK BIS 20M HÖHE",
    imageSrc: "/images/service_grid_glas.webp",
    bullets: [
      "100% streifenfreier Glanz ohne chemische Rückstände",
      "Inklusive gründlicher Rahmen-, Falz- & Simsreinigung",
      "Keine Hebebühnenkosten durch Teleskop-Reinstwassersysteme",
    ],
  },
  {
    slug: "bueroreinigung",
    title: "Büro- & Praxisreinigung",
    tagline: "REPRÄSENTATIVE HYGIENE FÜR UNTERNEHMEN & KANZLEIEN",
    imageSrc: "/images/service_cleaning_card.jpg",
    bullets: [
      "Diskreter Abendservice oder tagsüber im laufenden Betrieb",
      "Desinfektion von Arbeitsplätzen, Teeküchen & Sanitär",
      "Verlässlicher Nachfüllservice für Verbrauchsmaterialien",
    ],
  },
  {
    slug: "polsterreinigung",
    title: "Polster- & Teppichreinigung",
    tagline: "HYGIENISCHE TIEFENREINIGUNG MIT SPRÜHEXTRAKTION",
    imageSrc: "/images/leistungen_reinigung_2.jpg",
    bullets: [
      "Tiefenwirksame Nassreinigung für textile Böden & Möbel",
      "Faserschonende Fleckentfernung & Geruchsneutralisation",
      "Kurze Trocknungszeiten durch Hochleistungsvakuum",
    ],
  },
];

export function ReinigungEditorialGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        ".reini-grid-eyebrow",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          ".reini-grid-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".reini-grid-desc",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
          "-=0.45"
        )
        .fromTo(
          ".service-editorial-card",
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power2.out" },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="leistungen"
      aria-label="Reinigungsleistungen Übersicht"
      className="relative z-10 w-full bg-brand-cream py-16 sm:py-24"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clean Eyebrow */}
        <div className="reini-grid-eyebrow mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-brand-navy/60 block">
            Reinigungsleistungen im Überblick
          </span>
        </div>

        {/* Split Header: Title on Left, Text & CTA on Right */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-10 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <h2 className="reini-grid-title text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-brand-navy leading-[1.12]">
              Hygienestandards nach Maß.{" "}
              <span className="block font-normal text-brand-navy/80">
                Für Gewerbe, Industrie und anspruchsvolle Privatobjekte.
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-5 max-w-md shrink-0 w-full lg:w-auto">
            <p className="reini-grid-desc text-brand-navy/70 text-sm sm:text-base leading-relaxed text-left lg:text-right pt-1">
              Alle Reinigungsleistungen unseres Meisterbetriebs — transparent kalkuliert,
              verlässlich getaktet und auf Wunsch flexibel kombinierbar.
            </p>
            <div className="self-start lg:self-end">
              <CtaButton href="/contacts" size="md">
                Kostenlose Besichtigung
              </CtaButton>
            </div>
          </div>
        </div>

        {/* 6-Card Editorial Grid matching the MegaMenu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-navy/20 bg-brand-cream">
          {MEGA_MENU_CLEANING_SERVICES.map((card, idx) => (
            <Link
              key={card.slug}
              href={`/services/${card.slug}`}
              className="service-editorial-card group relative border-r border-b border-brand-navy/20 p-6 sm:p-7 lg:p-8 flex flex-col justify-between overflow-hidden min-h-115 lg:min-h-122.5 bg-brand-cream text-brand-navy"
            >
              {/* Smooth Navy Reveal Layer from top on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-brand-navy z-0 pointer-events-none origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out will-change-transform"
              />

              {/* Card Top: Title with RollingText + Minimal Arrow */}
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

                  <div className="shrink-0 pt-0.5">
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-brand-navy group-hover:text-brand-lime transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 stroke-[1.8]" />
                  </div>
                </div>

                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-normal text-brand-navy/60 group-hover:text-white/70 transition-colors duration-500 ease-out">
                  {card.tagline}
                </p>
              </div>

              {/* Card Center: Photographic Asset */}
              <div className="relative z-10 my-4 sm:my-6 flex items-center justify-center">
                <div className="relative w-full aspect-4/3 max-w-67.5 sm:max-w-71.25 rounded-lg overflow-hidden border border-brand-navy/15 group-hover:border-white/20 transition-all duration-500 ease-out">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={idx < 3}
                  />
                </div>
              </div>

              {/* Card Bottom: Bullets */}
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
