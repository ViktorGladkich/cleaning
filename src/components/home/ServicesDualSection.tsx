"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Hammer } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { CtaButton } from "@/components/ui/CtaButton";

interface ServicePillar {
  id: "cleaning" | "bau";
  number: string;
  badge: string;
  icon: typeof Sparkles;
  title: string;
  description: string;
  tags: string[];
  ctaText: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  accentColor: string;
}

const PILLARS: ServicePillar[] = [
  {
    id: "cleaning",
    number: "01",
    badge: "Gebäudereinigung & Werterhalt",
    icon: Sparkles,
    title: "Meisterhafte Sauberkeit für Gewerbe & anspruchsvolles Wohnen",
    description:
      "Hygienische Unterhaltsreinigung, streifenfreie Glasreinigung und bezugsfertige Bauendreinigungen mit zertifizierten Qualitätsstandards in Chemnitz und ganz Sachsen.",
    tags: [
      "Unterhaltsreinigung",
      "Bauendreinigung",
      "Glas- & Fensterreinigung",
      "Praxis- & Bürohygiene",
    ],
    ctaText: "Bereich Reinigung entdecken",
    href: "/services",
    imageSrc: "/images/service_cleaning_card.jpg",
    imageAlt: "Exklusive, makellos gereinigte Geschäftsräume mit Panoramafenstern",
    accentColor: "from-sky-400/20 to-teal-400/20",
  },
  {
    id: "bau",
    number: "02",
    badge: "Bau, Sanierung & Innenausbau",
    icon: Hammer,
    title: "Präzises Handwerk von Trockenbau bis Komplettsanierung",
    description:
      "Fachgerechte Trennwände, Brand- & Akustikschutz, meisterhafte Q1–Q4 Spachtelarbeiten und schlüsselfertige Modernisierungen aus einer Hand ohne Schnittstellenverlust.",
    tags: [
      "Trockenbau & Akustik",
      "Maler & Spachteln Q1–Q4",
      "Komplettsanierung",
      "Brandschutzsysteme",
    ],
    ctaText: "Bereich Bau & Sanierung entdecken",
    href: "/bau",
    imageSrc: "/images/service_bau_card.jpg",
    imageAlt: "Präziser Trockenbau und Innenausbau im modernen Wohnraum",
    accentColor: "from-amber-400/20 to-orange-400/20",
  },
];

export function ServicesDualSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Cinematic header reveal
      if (headerRef.current) {
        const headerElements = headerRef.current.children;
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Cinematic Dual-Card Unveil on Scroll
      const cards = cardsContainerRef.current?.querySelectorAll(".service-portal-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.96,
            clipPath: "inset(6% 0% 6% 0% round 32px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            duration: 1.3,
            stagger: 0.22,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 3. Parallax drift of the background images within cards
        const images = cardsContainerRef.current?.querySelectorAll(".service-parallax-img");
        images?.forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -10, scale: 1.12 },
            {
              yPercent: 10,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-headline"
      className="relative z-10 w-full py-20 sm:py-28 lg:py-36 bg-brand-cream overflow-hidden border-t border-slate-200/60"
    >
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-3">
            Kapitel 02 &middot; Unsere Gewerke
          </span>

          <h2
            id="services-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-brand-navy leading-[1.12]"
          >
            Zwei spezialisierte Säulen. <br className="hidden sm:inline" />
            <span className="text-slate-500">Ein nahtloser Qualitätskreislauf.</span>
          </h2>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            Vom ersten Trockenbau-Grundriss über schlüsselfertige Renovierungen bis hin zur bezugsfertigen Bauendreinigung und dauerhaften Unterhaltspflege – wählen Sie Ihr Gewerk.
          </p>
        </div>

        {/* Dual Pillar Cinematic Cards */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="service-portal-card group relative overflow-hidden rounded-[28px] sm:rounded-[36px] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between p-7 sm:p-10 lg:p-12 text-white border border-slate-900/10 shadow-2xl transition-all duration-700 hover:shadow-brand-navy/20"
              >
                {/* Background Image with Parallax container */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="relative w-full h-[120%] -top-[10%] service-parallax-img will-change-transform">
                    <Image
                      src={pillar.imageSrc}
                      alt={pillar.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                      priority={false}
                    />
                  </div>
                </div>

                {/* Cinematic Multi-layered Vignette & Dark Overlays for AAA Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/60 to-black/35 pointer-events-none transition-opacity duration-700 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />

                {/* Subtle Ambient Craft Color Glow on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pillar.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                {/* Top Card Bar: Number Badge & Category Indicator */}
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 shadow-xs">
                    <Icon className="w-4 h-4 text-brand-lime" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      {pillar.badge}
                    </span>
                  </div>

                  <span className="font-mono text-sm tracking-widest text-white/60 font-semibold">
                    {pillar.number} / 02
                  </span>
                </div>

                {/* Bottom Card Content: Title, Description, Tags & Button */}
                <div className="relative z-10 flex flex-col items-start pt-24 sm:pt-28">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-[1.2] mb-4 group-hover:text-brand-lime transition-colors duration-300">
                    {pillar.title}
                  </h3>

                  <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl mb-6 font-normal">
                    {pillar.description}
                  </p>

                  {/* Feature Tag Chips */}
                  <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-xs font-medium text-white/90 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full transition-all duration-300 hover:bg-white/20 hover:border-white/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Integrated Signature CTA Button */}
                  <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <CtaButton
                      href={pillar.href}
                      size="lg"
                      className="shadow-lg"
                    >
                      {pillar.ctaText}
                    </CtaButton>

                    <Link
                      href={pillar.href}
                      className="inline-flex sm:hidden items-center justify-center gap-2 text-xs font-medium text-white/70 hover:text-white pt-1"
                    >
                      <span>Alle Leistungen im Detail ansehen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
