"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Building2, Stethoscope, Home, Factory, Quote } from "lucide-react";

interface TestimonialItem {
  id: string;
  category: string;
  clientType: string;
  icon: typeof Building2;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  highlight: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "medical",
    category: "01 / MEDIZINISCHE HYGIENE",
    clientType: "Praxis & Gesundheitswesen",
    icon: Stethoscope,
    quote:
      "In sensiblen medizinischen Bereichen gibt es keinen Spielraum für Fehler. Tadiks überzeugt seit über zwei Jahren mit kompromissloser Hygiene, geschultem festem Personal und lückenlosen Dokumentationen nach RKI-Richtlinien.",
    author: "Dr. med. Christian Weber",
    role: "Leitender Facharzt & Praxisinhaber",
    company: "Gemeinschaftspraxis am Schlossteich",
    location: "Chemnitz",
    highlight: "100% Audit-Erfüllung & feste Reinigungskräfte",
  },
  {
    id: "construction",
    category: "02 / SCHLÜSSELFERTIG AUS EINER HAND",
    clientType: "Gewerbliche Projektentwicklung",
    icon: Building2,
    quote:
      "Die nahtlose Verzahnung aus meisterhaftem Trockenbau und anschließender bezugsfertiger Bauendreinigung spart uns bei jedem Projekt wertvolle Wochen. Keine Schnittstellenverluste, feste deutsche Bauleiter und verbindliche Festpreise.",
    author: "Dipl.-Ing. Markus Lindner",
    role: "Geschäftsführer & Gesamtprojektleiter",
    company: "Lindner Projektentwicklung GmbH",
    location: "Chemnitz & Leipzig",
    highlight: "14 schlüsselfertig realisierte Großobjekte",
  },
  {
    id: "residential",
    category: "03 / INNENAUSBAU & FEINREINIGUNG",
    clientType: "Privates Denkmalschutzobjekt",
    icon: Home,
    quote:
      "Unsere Jugendstil-Villa auf dem Kaßberg erforderte äußerste handwerkliche Präzision. Die Spachtel- und Malerarbeiten auf Q4-Niveau sowie die millimetergenaue Baufeinreinigung vor unserem Einzug waren schlichtweg meisterhaft.",
    author: "Elena & Thomas Vogel",
    role: "Eigentümer",
    company: "Denkmalgeschützte Villa Kaßberg",
    location: "Chemnitz",
    highlight: "Garantierte Termintreue & Q4-Spachtelstandard",
  },
  {
    id: "commercial",
    category: "04 / UNTERHALTS- & GLASREINIGUNG",
    clientType: "Technologiepark & Campus",
    icon: Factory,
    quote:
      "Streifenfreie Panoramafenster und ein täglich makelloses Arbeitsumfeld für über 90 Entwickler. Bemerkenswert ist die Konstanz: dieselben vertrauten Mitarbeiter und ein Objektleiter, der bei Sonderwünschen innerhalb von Minuten reagiert.",
    author: "Stefan Becker",
    role: "Head of Operations & Facility Management",
    company: "Technologie Campus Chemnitz",
    location: "Chemnitz",
    highlight: "1.850 m² Büro- & Glasflächen im Dauerbetrieb",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const metricsBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Cinematic orchestrated header reveal
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 82%",
            once: true,
          },
        });

        headerTl
          .fromTo(
            ".testi-eyebrow",
            { opacity: 0, y: -20, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
          )
          .fromTo(
            ".testi-title",
            { opacity: 0, y: 45, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            ".testi-desc",
            { opacity: 0, y: 30, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
            "-=0.7"
          );
      }

      // 2. Cards staggered entrance with subtle elevation & de-blur
      const cards = cardsGridRef.current?.querySelectorAll(".testimonial-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 70,
            scale: 0.94,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      // 3. Bottom Trust Metrics entrance
      if (metricsBarRef.current) {
        const metricItems = metricsBarRef.current.querySelectorAll(".testi-metric-item");
        gsap.fromTo(
          metricItems,
          {
            opacity: 0,
            y: 35,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: metricsBarRef.current,
              start: "top 88%",
              once: true,
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
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative z-10 w-full py-20 sm:py-28 lg:py-36 bg-brand-cream border-t border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header: Editorial & High-Impact */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-slate-200/80"
        >
          <div className="max-w-2xl">
            <span className="testi-eyebrow text-xs sm:text-sm font-mono tracking-widest text-brand-navy/60 uppercase block mb-3 will-change-transform">
              Referenzen &amp; Kundenerfahrungen
            </span>
            <h2
              id="testimonials-heading"
              className="testi-title text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-brand-navy leading-[1.12] will-change-transform"
            >
              Vertrauen entsteht durch <span className="font-medium text-brand-navy">messbare Perfektion.</span>
            </h2>
          </div>

          <div className="max-w-md lg:text-right">
            <p className="testi-desc text-sm sm:text-[15px] text-brand-navy/75 leading-relaxed font-light will-change-transform">
              Ausgewählte Stimmen von Gewerbekunden, Praxen und anspruchsvollen Privateigentümern aus Chemnitz und ganz Sachsen.
            </p>
          </div>
        </div>

        {/* 2x2 Architectural Cards Grid */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-10 sm:pt-14"
        >
          {TESTIMONIALS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="testimonial-card relative flex flex-col justify-between p-7 sm:p-9 lg:p-10 rounded-xl bg-white border border-slate-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300 group"
              >
                {/* Top Meta Bar */}
                <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0 group-hover:bg-brand-lime group-hover:text-brand-navy transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono tracking-wider text-brand-navy/50 uppercase leading-none">
                        {item.category}
                      </span>
                      <span className="block text-xs font-medium text-brand-navy mt-1">
                        {item.clientType}
                      </span>
                    </div>
                  </div>

                  <Quote className="w-6 h-6 text-brand-navy/20 group-hover:text-brand-navy/35 transition-colors shrink-0" />
                </div>

                {/* Core Testimonial Quote */}
                <div className="py-6 sm:py-8">
                  <p className="text-brand-navy/90 text-[15px] sm:text-base lg:text-[17px] leading-relaxed font-light tracking-tight">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Verified Client Footer */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-medium text-brand-navy leading-snug">
                      {item.author}
                    </h3>
                    <p className="text-xs text-brand-navy/60 font-light mt-0.5">
                      {item.role} · <span className="font-normal text-brand-navy/80">{item.company}</span>
                    </p>
                    <span className="inline-block text-[11px] text-brand-navy/40 font-mono mt-1">
                      Standort: {item.location}
                    </span>
                  </div>

                  {/* Fact Highlight */}
                  <div className="sm:text-right shrink-0">
                    <span className="inline-flex items-center px-2.5 py-1 rounded bg-brand-navy/5 border border-brand-navy/10 text-[11.5px] font-medium text-brand-navy">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle Bottom Trust Metric Bar with entrance animation */}
        <div
          ref={metricsBarRef}
          className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/60 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left"
        >
          <div className="testi-metric-item will-change-transform">
            <span className="block text-2xl sm:text-3xl font-normal text-brand-navy tracking-tight">100%</span>
            <span className="block text-xs text-brand-navy/60 font-light mt-1">Termintreue bei Abnahme</span>
          </div>
          <div className="testi-metric-item will-change-transform">
            <span className="block text-2xl sm:text-3xl font-normal text-brand-navy tracking-tight">24h</span>
            <span className="block text-xs text-brand-navy/60 font-light mt-1">Reaktionszeit Objektleiter</span>
          </div>
          <div className="testi-metric-item will-change-transform">
            <span className="block text-2xl sm:text-3xl font-normal text-brand-navy tracking-tight">0</span>
            <span className="block text-xs text-brand-navy/60 font-light mt-1">Schnittstellenverluste</span>
          </div>
          <div className="testi-metric-item will-change-transform">
            <span className="block text-2xl sm:text-3xl font-normal text-brand-navy tracking-tight">Chemnitz</span>
            <span className="block text-xs text-brand-navy/60 font-light mt-1">&amp; Region Mittelsachsen</span>
          </div>
        </div>
      </div>
    </section>
  );
}
