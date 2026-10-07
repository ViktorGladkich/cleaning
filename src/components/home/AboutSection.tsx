"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { CtaButton } from "@/components/ui/CtaButton";

const STATEMENT_WORDS = [
  "Tadiks",
  "Cleaning",
  "&",
  "Bau",
  "vereint",
  "meisterhaften",
  "Innenausbau",
  "und",
  "zertifizierte",
  "Gebäudereinigung",
  "in",
  "Chemnitz",
  "–",
  "für",
  "bezugsfertige",
  "Perfektion",
  "und",
  "dauerhaften",
  "Werterhalt",
  "nahtlos",
  "aus",
  "einer",
  "Hand.",
];

const MARQUEE_IMAGES = [
  {
    src: "/images/about_gallery_1.webp",
    alt: "Meisterhafte Raumhygiene und Badgestaltung",
  },
  {
    src: "/images/about_gallery_2.webp",
    alt: "Architektur, warme Materialien und Wohnästhetik",
  },
  {
    src: "/images/about_gallery_4.webp",
    alt: "Präzises Bauhandwerk und millimetergenaue Ausrichtung",
  },
  {
    src: "/images/about_gallery_5.webp",
    alt: "Streifenfreie Glasflächen und lichtdurchflutete Räume",
  },
  {
    src: "/images/about_gallery_3.webp",
    alt: "Schlüsselfertige Sanierung und bezugsfertige Übergabe",
  },
  {
    src: "/images/megamenu_promo_optimized.png",
    alt: "Oberflächenqualität und millimetergenaue Fugen",
  },
  {
    src: "/images/megamenu_promo1.jpg",
    alt: "Hochwertige Maler- und Spachtelarbeiten",
  },
  {
    src: "/images/service_bau_card.jpg",
    alt: "Architektonische Handwerkskunst",
  },
];

const STATS = [
  {
    value: "5",
    suffix: "+",
    title: "Jahre Meistererfahrung",
    description: "Festangestellte Fachkräfte und geprüfte Qualität in Chemnitz und Region.",
  },
  {
    value: "103",
    suffix: "+",
    title: "Realisierte Projekte",
    description: "Erfolgreich sanierte und bezugsfertig gereinigte Gewerbe- und Wohnobjekte.",
  },
  {
    value: "100",
    suffix: "%",
    title: "Festpreisgarantie",
    description: "Transparente Angebote vorab – ohne nachträgliche Mehrkosten oder Überraschungen.",
  },
  {
    value: "94",
    suffix: "%",
    title: "Kundenzufriedenheit",
    description: "Verifizierte Empfehlungen, langjährige Partnerschaften und erstklassige Bewertungen.",
  },
];

const DIGIT_REEL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function StatOdometer({ value }: { value: string }) {
  const digits = value.split("");

  return (
    <span className="inline-flex items-center overflow-hidden font-medium">
      {digits.map((char, i) => {
        const isNum = !isNaN(parseInt(char, 10));
        if (!isNum) {
          return <span key={i} className="font-medium">{char}</span>;
        }

        return (
          <span
            key={i}
            className="inline-block h-[1.15em] overflow-hidden leading-[1.15em] font-medium"
          >
            <span
              className="odometer-reel flex flex-col will-change-transform font-medium"
              data-digit={char}
            >
              {DIGIT_REEL.map((num, idx) => (
                <span
                  key={idx}
                  className="h-[1.15em] flex items-center justify-center select-none font-medium"
                >
                  {num}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const marqueeWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Word-by-word reading scrub animation on scroll
      if (subheadingRef.current) {
        gsap.fromTo(
          ".about-statement-word",
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: subheadingRef.current,
              start: "top 82%",
              end: "bottom 48%",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Entrance Mask Reveal for Marquee Image Cards
      if (marqueeWrapperRef.current) {
        gsap.fromTo(
          ".about-marquee-card",
          {
            clipPath: "inset(100% 0% 0% 0% round 8px)",
            opacity: 0,
            y: 20,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 8px)",
            opacity: 1,
            y: 0,
            duration: 1.15,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: marqueeWrapperRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 3. Vertical Parallax drift on images during page scroll
      gsap.fromTo(
        ".about-marquee-parallax-img",
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // 4. Rolling Odometer numeric counter animation on scroll into view
      const reels = sectionRef.current.querySelectorAll<HTMLElement>(".odometer-reel");
      reels.forEach((reel, index) => {
        const targetDigit = parseInt(reel.dataset.digit || "0", 10);
        const targetYPercent = -((10 + targetDigit) / 20) * 100;

        gsap.fromTo(
          reel,
          { yPercent: 0 },
          {
            yPercent: targetYPercent,
            duration: 1.8 + index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".about-stats-grid",
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // 5. Staggered reveal for stats items
      gsap.fromTo(
        ".about-stat-item",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-stats-grid",
            start: "top 88%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 w-full pt-16 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 bg-brand-cream overflow-x-clip border-t border-brand-navy/10"
    >
      {/* Top Header & Statement Container */}
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="max-w-4xl">
            {/* Clean German Eyebrow with Medium Font Weight */}
            <div className="mb-4 sm:mb-5">
              <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/80">
                Wer wir sind
              </span>
            </div>

            {/* Statement Heading with word-by-word reading scrub */}
            <h2
              ref={subheadingRef}
              id="about-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] leading-[1.22] font-medium tracking-tight text-brand-navy select-none"
            >
              {STATEMENT_WORDS.map((word, idx) => (
                <span
                  key={idx}
                  className="about-statement-word inline-block will-change-transform opacity-20 mr-[0.24em]"
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>

          {/* Integrated CtaButton Component */}
          <div className="shrink-0 self-start lg:self-end mb-1">
            <CtaButton href="/about" size="md">
              Über das Unternehmen
            </CtaButton>
          </div>
        </div>
      </div>

      {/* --- Middle Row: Infinite Image Marquee with Mask Reveal & Parallax --- */}
      <div
        ref={marqueeWrapperRef}
        className="relative flex overflow-hidden w-full bg-brand-cream mask-fade-edges py-2 mb-14 sm:mb-20 lg:mb-24 select-none"
      >
        {/* Track 1 */}
        <div
          className="flex animate-marquee items-center min-w-max gap-3 sm:gap-3.5 pr-3 sm:pr-3.5 hover:[animation-play-state:paused]"
          style={{ animationDuration: "50s" }}
        >
          {MARQUEE_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="about-marquee-card relative shrink-0 w-60 sm:w-70 md:w-77.5 aspect-3/4 rounded-lg overflow-hidden group shadow-xs bg-brand-navy/5 border border-brand-navy/10 will-change-transform"
            >
              {/* Parallax Image Inner Wrapper */}
              <div className="about-marquee-parallax-img absolute inset-x-0 top-[-13%] h-[126%] w-full will-change-transform">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 310px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Track 2: Duplicate for seamless infinite looping */}
        <div
          className="flex animate-marquee items-center min-w-max gap-3 sm:gap-3.5 pr-3 sm:pr-3.5 hover:[animation-play-state:paused]"
          style={{ animationDuration: "50s" }}
          aria-hidden="true"
        >
          {MARQUEE_IMAGES.map((img, idx) => (
            <div
              key={`dup-${idx}`}
              className="about-marquee-card relative shrink-0 w-60 sm:w-70 md:w-77.5 aspect-3/4 rounded-lg overflow-hidden group shadow-xs bg-brand-navy/5 border border-brand-navy/10 will-change-transform"
            >
              {/* Parallax Image Inner Wrapper */}
              <div className="about-marquee-parallax-img absolute inset-x-0 top-[-13%] h-[126%] w-full will-change-transform">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 310px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Bottom Row: Stats without 'In Zahlen' eyebrow (Medium Font Weight, Rolling Odometer) --- */}
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="about-stats-section">
          {/* 4 Stats Columns */}
          <div className="about-stats-grid grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-10">
            {STATS.map((stat, idx) => (
              <div key={idx} className="about-stat-item flex flex-col">
                {/* Smooth Rolling Odometer Counter with Medium Font Weight */}
                <div className="flex items-baseline text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-tight text-brand-navy font-display leading-none">
                  <StatOdometer value={stat.value} />
                  <span className="text-brand-navy ml-0.5 font-medium">{stat.suffix}</span>
                </div>
                {/* Wider, refined architectural dashed divider line */}
                <svg
                  aria-hidden="true"
                  className="w-full h-1 my-3.5 sm:my-4 text-brand-navy/30 overflow-visible"
                >
                  <line
                    x1="0"
                    y1="0.5"
                    x2="100%"
                    y2="0.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="10 8"
                  />
                </svg>
                <h4 className="text-sm sm:text-base font-semibold text-brand-navy tracking-tight">
                  {stat.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-brand-navy/70 leading-relaxed mt-1">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
