"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, isTouchLayout, useGSAP } from "@/lib/gsap";
import { RollingText } from "@/components/animations/RollingText";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

export interface ServiceGridItem {
  id: string;
  title: string;
  tagline: string;
  category?: string;
  imageSrc: string;
  imageAlt?: string;
  bullets: string[];
  href: string;
  /** Short claim shown under the tagline. */
  description?: string;
  /** Optional request button, e.g. "Büroreinigung anfragen". */
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ServicesGridSectionProps {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  items?: ServiceGridItem[];
  /** Lets long titles wrap; the rolling hover effect only fits a single line. */
  wrapTitles?: boolean;
  className?: string;
}

export const SERVICES: ServiceGridItem[] = [
  {
    id: "unterhalt",
    title: "Unterhalts- & Büroreinigung",
    tagline: "REINIGUNG",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-bueroreinigung.jpg",
    imageAlt: "Büroreinigung in einem Großraumbüro",
    bullets: [
      "Büro- und Arbeitsbereiche",
      "Sanitär- und Gemeinschaftsräume",
      "Reinigungspläne nach Vereinbarung",
    ],
    href: "/services/unterhaltsreinigung",
  },
  {
    id: "glas",
    title: "Fenster- & Glasreinigung",
    tagline: "REINIGUNG",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-fensterreinigung.jpg",
    imageAlt: "Fensterreinigung an einer Gründerzeitfassade",
    bullets: [
      "Fenster und Glasflächen",
      "Glastrennwände und Eingangselemente",
      "Rahmen- und Falzreinigung nach Vereinbarung",
    ],
    href: "/services/fensterreinigung",
  },
  {
    id: "fassade",
    title: "Fassaden- & Außenreinigung",
    tagline: "REINIGUNG · NEU",
    category: "REINIGUNG",
    imageSrc: "/images/references/fassade-goessnitz-nachher.webp",
    imageAlt: "Gereinigte Metallfassade einer Industriehalle in Gößnitz",
    bullets: [
      "Metall- und Hallenfassaden",
      "Gewerbliche Außenfassaden",
      "Zugangstechnik passend zum Objekt",
    ],
    href: "/services/fassadenreinigung",
  },
  {
    id: "trockenbau",
    title: "Trockenbau & Innenausbau",
    tagline: "BAU",
    category: "BAU",
    imageSrc: "/images/services/hero-trockenbau-innenausbau.jpg",
    imageAlt: "Trockenbau beim Dachausbau eines Altbaus",
    bullets: [
      "Nichttragende Trocken- und Trennwände",
      "Abgehängte Decken & Gipskartonarbeiten",
      "Raumaufteilung und Innenausbau",
    ],
    href: "/bau/trockenbau-innenausbau",
  },
  {
    id: "abbruch",
    title: "Rückbau & Entkernung",
    tagline: "BAU",
    category: "BAU",
    imageSrc: "/images/services/hero-abbruch-entkernung.jpg",
    imageAlt: "Entkernung einer ehemaligen Fabrikhalle",
    bullets: [
      "Rückbau nichttragender Wände",
      "Entkernung von Wohnungen und Gebäuden",
      "Besenreine Übergabe nach Vereinbarung",
    ],
    href: "/bau/abbruch-entkernung",
  },
  {
    id: "sanierung",
    title: "Renovierung & Sanierung",
    tagline: "BAU",
    category: "BAU",
    imageSrc: "/images/services/hero-renovierung-sanierung.jpg",
    imageAlt: "Baubesprechung in einer leeren Altbauwohnung",
    bullets: [
      "Wohnungsrenovierung und Umbau",
      "Individuelle Projektprüfung",
      "Weitere Gewerke mit Partnerunternehmen",
    ],
    href: "/bau/renovierung-sanierung",
  },
];

export function ServicesGridSection({
  id = "services",
  eyebrow = "Unsere Leistungen",
  title,
  subtitle = "Gebäudereinigung und Bauleistungen für Gewerbe und Privatkunden in Chemnitz und Umgebung – mit persönlichem Ansprechpartner und individuell abgestimmtem Angebot.",
  ctaText = "Alle Leistungen ansehen",
  ctaHref = "/services",
  items = SERVICES,
  wrapTitles = false,
  className,
}: ServicesGridSectionProps = {}) {
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
        );

      const ctaEl = sectionRef.current.querySelector(".services-anim-cta");
      if (ctaEl) {
        tl.fromTo(
          ctaEl,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
          "-=0.55"
        );
      }

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(".service-editorial-card");

      if (isMobile) {
        // On mobile (1-column vertical stack), animate each card individually as the user scrolls to it
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      } else {
        // On tablet/desktop (2- or 3-column grid), staggered staircase reveal when the grid enters view
        gsap.fromTo(
          cards,
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
            scrollTrigger: {
              trigger: ".services-editorial-grid",
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 2. Continuous smooth parallax drift on card images while scrolling through the section
      if (!isTouchLayout()) {
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
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={typeof title === "string" ? title : "Leistungen & Services"}
      className={cn(
        "relative z-10 w-full bg-brand-cream py-16 sm:py-24 overflow-x-clip",
        className
      )}
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- Clean German Eyebrow --- */}
        {eyebrow && (
          <div className="services-anim-eyebrow mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/80 block">
              {eyebrow}
            </span>
          </div>
        )}

        {/* --- Header Row: Title on Left, Text & Right-Aligned Button on Right --- */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-10 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <h2 className="services-anim-title text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-brand-navy leading-[1.15]">
              {title || "Zwei Bereiche. Ein Ansprechpartner."}
            </h2>
          </div>

          {/* Right Column: Paragraph and CTA Button */}
          <div className="flex flex-col items-start lg:items-end gap-5 max-w-md shrink-0 w-full lg:w-auto">
            {subtitle && (
              <p className="services-anim-desc text-brand-navy/70 text-sm sm:text-base leading-relaxed text-left lg:text-right pt-1 lg:pt-1.5">
                {subtitle}
              </p>
            )}
            {ctaText && ctaHref && (
              <div className="services-anim-cta self-start lg:self-end">
                <CtaButton href={ctaHref} size="md">
                  {ctaText}
                </CtaButton>
              </div>
            )}
          </div>
        </div>

        {/* --- Card Editorial Grid --- */}
        <div className="services-editorial-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-navy/20 bg-brand-cream">
          {items.map((card) => (
            <article
              key={card.id}
              className="service-editorial-card group relative border-r border-b border-brand-navy/20 p-6 sm:p-7 lg:p-8 flex flex-col justify-between overflow-hidden min-h-115 lg:min-h-122.5 bg-brand-cream text-brand-navy"
            >
              {/* Smooth mask fill layer: smoothly descends from the TOP of the card on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-brand-navy z-0 pointer-events-none origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out will-change-transform"
              />

              {/* --- Card Top: Title with RollingText + Direct Arrow (relative z-10 above mask) --- */}
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-2 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight leading-tight min-w-0">
                    {/* Stretched link: the whole card opens the service page */}
                    <Link
                      href={card.href}
                      className="before:absolute before:inset-0 before:z-20 focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-inset focus-visible:before:ring-brand-navy"
                    >
                    {wrapTitles ? (
                      <span className="text-brand-navy transition-colors duration-500 ease-out group-hover:text-white">
                        {card.title}
                      </span>
                    ) : (
                      <RollingText
                        duplicateClassName="text-white"
                        className="text-brand-navy group-hover:text-white transition-colors duration-500 ease-out"
                      >
                        {card.title}
                      </RollingText>
                    )}
                    </Link>
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
                {card.description && (
                  <p className="mt-2 text-sm leading-snug text-brand-navy/80 group-hover:text-white/85 transition-colors duration-500 ease-out">
                    {card.description}
                  </p>
                )}
              </div>

              {/* --- Card Center: Photographic Asset with Parallax (relative z-10) --- */}
              <div className="relative z-10 my-4 sm:my-6 flex items-center justify-center">
                <div className="service-card-image-wrap relative w-full aspect-4/3 max-w-67.5 sm:max-w-71.25 rounded-lg overflow-hidden shadow-xs border border-brand-navy/15 group-hover:border-white/20 transition-all duration-500 ease-out">
                  <div className="service-card-parallax-img relative w-full h-[120%] top-[-10%] will-change-transform">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt || card.title}
                      fill
                      sizes="(max-width: 640px) 270px, 285px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
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
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                {card.ctaLabel && card.ctaHref && (
                  <Link
                    href={card.ctaHref}
                    className="relative z-30 mt-5 inline-flex items-center gap-1.5 rounded-lg bg-brand-lime px-3.5 py-2 text-xs sm:text-[13px] font-medium text-brand-navy transition-colors hover:bg-white"
                  >
                    {card.ctaLabel}
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-2" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const ServicesDualSection = ServicesGridSection;
