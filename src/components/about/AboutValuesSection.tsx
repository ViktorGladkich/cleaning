"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ShieldCheck, Users, Layers, Award, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

const VALUES = [
  {
    num: "01",
    title: "Reinigung und Bau unter einem Dach",
    subtitle: "TADIK’S Cleaning & TADIK’S BAU",
    description:
      "Wir unterstützen bei Reinigungsaufgaben ebenso wie bei Trockenbau, Rückbau, Entkernung und Renovierung. Nach Bauarbeiten können Sie die Bauendreinigung direkt mit anfragen.",
    icon: Layers,
    badge: "Zwei Bereiche",
  },
  {
    num: "02",
    title: "Ein direkter Ansprechpartner",
    subtitle: "Persönlich für Sie da",
    description:
      "Inhaber Michel Kislovskij bespricht mit Ihnen Ihren Bedarf, klärt die Rahmenbedingungen und bleibt Ihr Kontakt von der Anfrage bis zur Ausführung.",
    icon: Users,
    badge: "Persönlicher Kontakt",
  },
  {
    num: "03",
    title: "Individuell abgestimmte Angebote",
    subtitle: "Klare Absprachen",
    description:
      "Wir besprechen Umfang, Intervalle und Zeiten mit Ihnen – bei Bedarf bei einem Termin vor Ort – und erstellen ein Angebot mit dem vereinbarten Leistungsumfang.",
    icon: ShieldCheck,
    badge: "Nach Vereinbarung",
  },
  {
    num: "04",
    title: "Ehrliche Prüfung jeder Anfrage",
    subtitle: "Was wir können – und was nicht",
    description:
      "Wir sagen offen, welche Leistungen wir selbst übernehmen. Für weitere Bau-Gewerke prüfen wir die Zusammenarbeit mit geeigneten Fach- und Partnerunternehmen.",
    icon: Award,
    badge: "Transparente Abstimmung",
  },
];

export function AboutValuesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          ".value-card-item",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="werte"
      aria-labelledby="values-heading"
      className="relative z-10 w-full py-20 sm:py-28 lg:py-32 bg-brand-cream border-t border-brand-navy/10 overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/80 block mb-3">
            Das Qualitätsprinzip
          </span>
          <h2
            id="values-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-normal tracking-tight text-brand-navy leading-[1.12]"
          >
            Vier Grundsätze für{" "}
            <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-normal ml-0">
              unsere Zusammenarbeit.
            </span>
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-brand-navy/70 leading-relaxed font-light max-w-2xl mx-auto">
            TADIK’S Cleaning &amp; BAU steht für Reinigung und Bauleistungen in Chemnitz und Umgebung – mit klaren Absprachen und einem festen Ansprechpartner.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {VALUES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="value-card-item group relative flex flex-col justify-between p-7 sm:p-9 rounded-2xl bg-white border border-brand-navy/10 shadow-xs hover:shadow-lg hover:border-brand-navy/30 transition-[box-shadow,border-color] duration-300"
              >
                <div>
                  {/* Top Bar: Icon, Badge & Number */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-brand-navy/5 text-brand-navy flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5 text-brand-navy group-hover:text-brand-lime transition-colors" />
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-lime/20 text-brand-navy border border-brand-lime/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-navy" />
                        {item.badge}
                      </span>
                      <span className="text-xl sm:text-2xl font-mono font-medium text-brand-navy/30">
                        {item.num}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-brand-navy mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase font-mono tracking-wider text-brand-navy/60 mb-4">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-[15px] text-brand-navy/75 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom decorative line */}
                <div className="mt-8 pt-4 border-t border-brand-navy/10 flex items-center justify-between text-xs text-brand-navy/50 font-mono">
                  <span>TADIKS STANDARDS</span>
                  <span className="text-brand-navy font-medium">CHEMNITZ &amp; SACHSEN</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
