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

      // 2. Pronounced, cinematic Parallax drift of architectural background image
      if (bgImgRef.current) {
        gsap.fromTo(
          bgImgRef.current,
          { yPercent: -18, scale: 1.08 },
          {
            yPercent: 18,
            scale: 1.02,
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

      // 3. Staggered reveal of the frosted glass cards with de-blur & elevation
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
      {/* Full-bleed Warm Architectural Minimalist Interior Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div
          ref={bgImgRef}
          className="relative w-full h-[145%] top-[-22%] will-change-transform"
        >
          <Image
            src="/images/process_interior_bg.jpg"
            alt="Warmes minimalistisches Architektur-Interieur"
            fill
            sizes="100vw"
            priority={false}
            className="object-cover object-center"
          />
        </div>

        {/* Natural Warm Lighting Overlay matching reference image */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/50" />
      </div>

      <div className="relative z-10 max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        {/* Top Header Bar: Left Display Title | Right Editorial Subtitle (Matching reference side-by-side on mobile) */}
        <div
          ref={headerRef}
          className="flex flex-row items-start justify-between gap-4 pb-8 sm:pb-12 lg:pb-14 select-none"
        >
          {/* Left: Display Title */}
          <div>
            <h2
              id="process-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-none"
            >
              Ablauf
            </h2>
          </div>

          {/* Right: Editorial Two-Line Subtitle */}
          <div className="text-right shrink-0">
            <span className="block text-white text-xs sm:text-base font-normal tracking-tight leading-snug">
              Strukturierte Exzellenz
            </span>
            <span className="block text-white/60 text-[10px] sm:text-sm font-light mt-0.5">
              Vom Entwurf bis zum reinsten Glanz
            </span>
          </div>
        </div>

        {/* Frosted Smoked Glass Cards: Alternating Left-Right Zigzag on Mobile (< lg) and 4-Column on Desktop (lg+) */}
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
                className="process-frosted-card relative flex flex-col justify-center items-center text-center gap-2 sm:gap-3 md:gap-4 lg:justify-between lg:items-stretch lg:text-left lg:gap-0 w-full max-w-full p-3 sm:p-5 lg:p-8 rounded-md bg-[#1e1b18]/78 backdrop-blur-md border border-white/8 shadow-2xl shadow-black/40 aspect-[4/3.1] sm:aspect-[16/10] lg:aspect-4/3 will-change-transform select-none box-border"
              >
                {/* Number: Centered on mobile & tablet, top-left on desktop */}
                <div className="flex items-center justify-center lg:items-start lg:justify-start w-full">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-brand-lime tracking-tight leading-none">
                    {step.step}
                  </span>
                </div>

                {/* Descriptive Text: Centered below number on mobile & tablet, bottom-right on desktop */}
                <div className="text-center mx-auto lg:text-right lg:ml-auto lg:mr-0 lg:max-w-50 w-full max-w-[200px] sm:max-w-[280px] lg:max-w-50">
                  <p className="text-white/80 text-[10.5px] xs:text-[11.5px] sm:text-xs md:text-sm lg:text-[12.5px] leading-snug sm:leading-relaxed font-light">
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Line (No dot, accurate text) */}
        <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-3 sm:gap-4 select-none text-center sm:text-left">
          <div>
            <span>Feste Objektleiter &amp; meisterhafter Standard in Chemnitz und Region</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-white/50">
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
