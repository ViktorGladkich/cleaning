"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ProcessStep {
  step: string;
  text: string;
  offsetClass: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    text: "Kostenlose Vor-Ort-Besichtigung und detaillierte Bedarfsanalyse in Chemnitz.",
    offsetClass: "lg:mt-0",
  },
  {
    step: "02",
    text: "Verbindliches Festpreisangebot innerhalb von 24 Stunden ohne versteckte Kosten.",
    offsetClass: "lg:mt-[calc(75%+2px)]",
  },
  {
    step: "03",
    text: "Meisterhafte Umsetzung aller Gewerke durch feste Handwerker- und Reinigungsteams.",
    offsetClass: "lg:mt-0",
  },
  {
    step: "04",
    text: "Bezugsfertige schlüsselfertige Übergabe mit garantierter Qualitätsabnahme.",
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
      className="relative z-10 w-full py-14 sm:py-18 lg:py-24 overflow-hidden bg-brand-cream border-t border-slate-200/60"
    >
      {/* Full-bleed Warm Architectural Minimalist Interior Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div
          ref={bgImgRef}
          className="relative w-full h-[145%] -top-[22%] will-change-transform"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        {/* Top Header Bar: Left Display Title | Right Editorial Subtitle (Matching reference) */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-8 sm:pb-12 lg:pb-14"
        >
          {/* Left: Display Title */}
          <div>
            <h2
              id="process-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-none select-none"
            >
              Ablauf
            </h2>
          </div>

          {/* Right: Editorial Two-Line Subtitle */}
          <div className="text-left sm:text-right">
            <span className="block text-white text-sm sm:text-base font-normal tracking-tight leading-snug">
              Strukturierte Exzellenz
            </span>
            <span className="block text-white/60 text-xs sm:text-sm font-light mt-0.5">
              Vom Entwurf bis zum reinsten Glanz
            </span>
          </div>
        </div>

        {/* 4 Frosted Smoked Glass Cards in Exact Reference Layout (Landscape Rectangles, Tight Gaps, High-Low Stagger) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] w-full pt-10 pb-14 sm:pb-20 lg:pb-[260px]"
        >
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className={`w-full ${step.offsetClass}`}>
              <div
                className="process-frosted-card relative flex flex-col justify-between p-6 sm:p-7 lg:p-8 rounded-md bg-[#1e1b18]/78 backdrop-blur-md border border-white/[0.08] shadow-2xl shadow-black/40 aspect-[4/3] will-change-transform select-none"
              >
                {/* Top Left: Clean White Number */}
                <div className="flex items-start justify-start">
                  <span className="text-5xl sm:text-6xl font-normal text-brand-lime tracking-tight leading-none">
                    {step.step}
                  </span>
                </div>

                {/* Bottom Right: Clean Refined Descriptive Text */}
                <div className="text-right ml-auto max-w-[200px]">
                  <p className="text-white/75 text-xs sm:text-[12.5px] leading-relaxed font-light">
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Line (No dot, accurate text) */}
        <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4 select-none">
          <div>
            <span>Feste Objektleiter &amp; meisterhafter Standard in Chemnitz und Region</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-white/50">
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
