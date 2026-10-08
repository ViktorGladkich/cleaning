"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ProcessStep {
  step: string;
  text: string;
  alignmentClass: string;
  offsetClass: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    text: "Kostenlose Vor-Ort-Besichtigung und detaillierte Bedarfsanalyse in Chemnitz.",
    alignmentClass: "self-start mr-auto",
    offsetClass: "lg:mt-0",
  },
  {
    step: "02",
    text: "Verbindliches Festpreisangebot innerhalb von 24 Stunden ohne versteckte Kosten.",
    alignmentClass: "self-end ml-auto",
    offsetClass: "lg:mt-[calc(75%+2px)]",
  },
  {
    step: "03",
    text: "Meisterhafte Umsetzung aller Gewerke durch feste Handwerker- und Reinigungsteams.",
    alignmentClass: "self-start mr-auto",
    offsetClass: "lg:mt-0",
  },
  {
    step: "04",
    text: "Bezugsfertige schlüsselfertige Übergabe mit garantierter Qualitätsabnahme.",
    alignmentClass: "self-end ml-auto",
    offsetClass: "lg:mt-[calc(75%+2px)]",
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Header entrance with de-blur
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
            headerRef.current.children[0],
            { opacity: 0, y: 45, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" }
          )
          .fromTo(
            headerRef.current.children[1],
            { opacity: 0, y: 25, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
            "-=0.6"
          );
      }

      // 2. Smooth architectural Parallax drift without heavy zooming
      if (bgImgRef.current) {
        gsap.fromTo(
          bgImgRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // 3. Staggered reveal of the frosted navy glass cards with de-blur & elevation
      const cards = cardsRef.current?.querySelectorAll(".process-frosted-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 75,
            scale: 0.93,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.25,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 78%",
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
      id="process"
      aria-labelledby="process-heading"
      className="relative z-10 w-full py-12 sm:py-18 lg:py-24 overflow-hidden bg-brand-cream border-t border-slate-200/60"
    >
      {/* Architectural Interior Background with gentle parallax and subtle cream veil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div
          ref={bgImgRef}
          className="relative w-full h-[118%] top-[-9%] will-change-transform"
        >
          <Image
            src="/images/process_interior_bg.webp"
            alt="Warmes minimalistisches Architektur-Interieur"
            fill
            sizes="100vw"
            priority={false}
            className="object-cover object-center"
          />
        </div>

        {/* Delicate cream veil: preserves raw photo beauty while guaranteeing text legibility */}
        <div className="absolute inset-0 bg-brand-cream/5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/15 via-brand-cream/5 to-brand-cream/15 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        {/* Top Header Bar: Left Display Title | Right Editorial Subtitle in sharp Brand Navy */}
        <div
          ref={headerRef}
          className="flex flex-row items-start justify-between gap-4 pb-8 sm:pb-12 lg:pb-14 select-none"
        >
          {/* Left: Display Title */}
          <div>
            <h2
              id="process-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-brand-navy leading-none"
            >
              Ablauf
            </h2>
          </div>

          {/* Right: Editorial Two-Line Subtitle */}
          <div className="text-right shrink-0">
            <span className="block text-brand-navy text-xs sm:text-base font-normal tracking-tight leading-snug">
              Strukturierte Exzellenz
            </span>
            <span className="block text-brand-navy/60 text-[10px] sm:text-sm font-light mt-0.5">
              Vom Entwurf bis zum reinsten Glanz
            </span>
          </div>
        </div>

        {/* Frosted Navy Glass Cards: Alternating Left-Right Zigzag on Mobile (< lg) and 4-Column on Desktop (lg+) */}
        <div
          ref={cardsRef}
          className="flex flex-col gap-2.5 sm:gap-4 lg:grid lg:grid-cols-4 lg:gap-0.5 w-full pt-6 sm:pt-10 pb-12 sm:pb-16 lg:pb-65 overflow-x-clip"
        >
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className={`w-[calc(50%-4px)] sm:w-[calc(50%-8px)] lg:w-full max-w-[calc(50%-4px)] sm:max-w-[calc(50%-8px)] lg:max-w-none ${step.alignmentClass} lg:self-auto lg:m-0 ${step.offsetClass}`}
            >
              <div
                className="process-frosted-card relative flex flex-col justify-center items-center text-center gap-2 sm:gap-3 md:gap-4 lg:justify-between lg:items-stretch lg:text-left lg:gap-0 w-full max-w-full p-3 sm:p-5 lg:p-8 rounded-xl bg-[#0f182b]/82 backdrop-blur-md [-webkit-backdrop-filter:blur(16px)] border border-white/12 shadow-[0_16px_40px_rgba(15,24,43,0.32)] aspect-[4/3.1] sm:aspect-[16/10] lg:aspect-4/3 will-change-transform select-none box-border hover:border-white/20 transition-colors duration-300"
              >
                {/* Number: Brand lime neon on navy glass */}
                <div className="flex items-center justify-center lg:items-start lg:justify-start w-full">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-brand-lime tracking-tight leading-none">
                    {step.step}
                  </span>
                </div>

                {/* Descriptive Text: High contrast white on navy glass */}
                <div className="text-center mx-auto lg:text-right lg:ml-auto lg:mr-0 lg:max-w-50 w-full max-w-[200px] sm:max-w-[280px] lg:max-w-50">
                  <p className="text-white/90 text-[10.5px] xs:text-[11.5px] sm:text-xs md:text-sm lg:text-[12.5px] leading-snug sm:leading-relaxed font-light">
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Line in Brand Navy */}
        <div className="pt-5 border-t border-brand-navy/15 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-navy/70 gap-3 sm:gap-4 select-none text-center sm:text-left">
          <div>
            <span>Feste Objektleiter &amp; meisterhafter Standard in Chemnitz und Region</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-brand-navy/60">
            <span>Festpreisgarantie</span>
            <span>&middot;</span>
            <span>Gewerblich haftpflichtversichert</span>
            <span>&middot;</span>
            <span>100% Termintreue</span>
          </div>
        </div>
      </div>
    </section>
  );
}
