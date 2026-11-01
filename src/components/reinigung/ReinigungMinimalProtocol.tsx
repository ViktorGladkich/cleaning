"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface ProtocolStep {
  num: string;
  image: string;
  title: string;
  desc: string;
}

const PROTOCOL_STEPS: ProtocolStep[] = [
  {
    num: "01",
    image: "/images/protocol_step_1.jpg",
    title: "Kostenloses Vor-Ort-Audit: Flächen erfassen, Bausubstanz schützen.",
    desc: "Präzise Bestandsaufnahme aller Oberflächen und Materialien (Parkett, Naturstein, Glas). Verbindliche Festpreiskalkulation innerhalb von 24 Stunden.",
  },
  {
    num: "02",
    image: "/images/protocol_step_2.jpg",
    title: "Verbindliches Festpreis-Konzept: Volle Kostensicherheit ohne Überraschungen.",
    desc: "Transparent aufgeschlüsseltes Leistungsverzeichnis mit flexiblen Intervallen. Ein garantierter Festpreis ohne versteckte Nebenkosten.",
  },
  {
    num: "03",
    image: "/images/protocol_step_3.jpg",
    title: "Feste Stammpersonal-Teams: Höchste Diskretion und geschulte Fachkräfte.",
    desc: "Reinigung durch fest zugeteilte Mitarbeiter mit Kärcher Professional-Technik und 4-Farben-Mikrofaserhygiene nach RKI-Vorgaben.",
  },
  {
    num: "04",
    image: "/images/protocol_step_4.jpg",
    title: "Lückenloser Qualitätsnachweis: Objektleiter-Audit und 24h-Abnahmegarantie.",
    desc: "Laufende Audits durch Ihren festen deutschen Objektleiter. Sollte etwas nicht perfekt sein, bessern wir binnen 24 Stunden kostenfrei nach.",
  },
];

export function ReinigungMinimalProtocol() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Clean kinetic statement entrance on left
      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current.querySelectorAll(".protocol-statement-chunk"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statementRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 2. Glass Card Stack Effect:
      // As each next card glides up over the previous card, the previous card remains underneath
      // (scaled down slightly so the glass stack & photo glow through from below),
      // while its text smoothly fades out so the active card's glass text is 100% crisp.
      const cardNodes = sectionRef.current.querySelectorAll<HTMLElement>(".protocol-step-card-wrapper");
      if (cardNodes.length > 1) {
        cardNodes.forEach((card, idx) => {
          if (idx === 0) return;
          const prevCard = cardNodes[idx - 1];
          const prevGlass = prevCard.querySelector<HTMLElement>(".protocol-glass-card");
          const prevText = prevCard.querySelector<HTMLElement>(".protocol-card-text");

          if (prevGlass) {
            gsap.to(prevGlass, {
              scale: 0.94,
              y: -14,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: () => (window.innerWidth >= 640 ? "top 520px" : "top 440px"),
                end: () => (window.innerWidth >= 640 ? "top 144px" : "top 112px"),
                scrub: true,
              },
            });
          }

          if (prevText) {
            gsap.to(prevText, {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: () => (window.innerWidth >= 640 ? "top 340px" : "top 280px"),
                end: () => (window.innerWidth >= 640 ? "top 160px" : "top 128px"),
                scrub: true,
              },
            });
          }
        });

        // Exact travel distance needed for Card 04 to reach top-28/top-36 and land flat on Card 03
        const lastCard = cardNodes[cardNodes.length - 1];
        if (lastCard && runwayRef.current) {
          const h = lastCard.offsetHeight || 500;
          const gap = window.innerWidth >= 640 ? 128 : 96;
          runwayRef.current.style.height = `${h + gap + 16}px`;
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="reinigung-protocol"
      aria-label="Qualitätsstandard & Ablauf"
      className="relative z-10 w-full bg-brand-navy text-white py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* 2-Column Split: Wider Sticky Statement on Left | Glass Stacking Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
          {/* Left Column: Pure Sticky Statement with generous width */}
          <div
            ref={statementRef}
            className="lg:col-span-6 xl:col-span-7 lg:sticky lg:top-36 xl:top-40 self-start pr-0 lg:pr-6 xl:pr-10"
          >
            <div className="w-full max-w-2xl xl:max-w-3xl">
              <p className="text-2xl sm:text-3xl xl:text-[38px] font-light text-white/95 leading-[1.3] tracking-tight">
                <span className="block protocol-statement-chunk mb-4">
                  Wir putzen nicht nur oberflächlich –{" "}
                  <span className="text-brand-lime font-normal">
                    wir schützen die Bausubstanz.
                  </span>
                </span>
                <span className="block protocol-statement-chunk font-extralight text-white/85 mb-5">
                  Durch{" "}
                  <span className="text-brand-lime font-normal">
                    materialgerechte pH-Werte
                  </span>
                  , modernste{" "}
                  <span className="text-brand-lime font-normal">
                    Osmose-Filterung
                  </span>{" "}
                  und zertifizierte{" "}
                  <span className="text-brand-lime font-normal">
                    Hygienestandards
                  </span>
                  .
                </span>
                <span className="block protocol-statement-chunk font-extralight text-white/75 text-lg sm:text-xl xl:text-[22px] leading-relaxed">
                  Ob empfindlicher{" "}
                  <span className="text-brand-lime font-normal">Naturstein</span>,{" "}
                  versiegeltes{" "}
                  <span className="text-brand-lime font-normal">Echtholzparkett</span> oder{" "}
                  weitläufige{" "}
                  <span className="text-brand-lime font-normal">Glasfassaden</span>:{" "}
                  Wir stimmen Chemie, Mechanik und Intervalle exakt auf die Werkstoffe Ihrer Immobilie ab – für makellose Reinheit und dauerhaften Werterhalt.
                </span>
              </p>
            </div>
          </div>

          {/* Right Column: Stacking Cards with Ambient Under-Card Glow & Frosted Glass Text Panel */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex flex-col items-center lg:items-end w-full">
            {/* Soft Ambient Glow strictly underneath the cards so glassmorphism refracts warm lime & light-blue */}
            <div
              aria-hidden="true"
              className="sticky top-28 sm:top-36 w-full max-w-120 h-0 pointer-events-none select-none z-0 flex items-center justify-center"
            >
              <div className="relative w-full h-115 translate-y-56">
                <div className="absolute -top-6 left-6 w-64 h-64 rounded-full bg-brand-light-blue/35 blur-[80px]" />
                <div className="absolute bottom-4 right-6 w-64 h-64 rounded-full bg-brand-lime/25 blur-[85px]" />
              </div>
            </div>

            {PROTOCOL_STEPS.map((step, idx) => (
              <div
                key={step.num}
                className={`protocol-step-card-wrapper sticky top-28 sm:top-36 w-full flex items-center justify-center lg:justify-end ${
                  idx === PROTOCOL_STEPS.length - 1 ? "mb-0" : "mb-24 sm:mb-32"
                }`}
                style={{
                  zIndex: idx + 1,
                }}
              >
                {/* Outer Glass Card Shell */}
                <div className="protocol-glass-card relative w-full max-w-120 rounded-[28px] sm:rounded-[34px] p-3.5 sm:p-4 bg-white/12 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] border border-white/25 shadow-[0_20px_50px_rgba(24,36,68,0.28),inset_0_1px_1px_rgba(255,255,255,0.35)] origin-top will-change-transform">
                  {/* Top: Large Rounded Photographic Surface */}
                  <div className="relative w-full aspect-16/10 sm:aspect-16/9.5 rounded-[20px] sm:rounded-[24px] overflow-hidden bg-brand-navy/40 border border-white/20">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brand-navy/35 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom: Frosted Glass Text Panel inside the card */}
                  <div className="mt-3 rounded-[18px] sm:rounded-[22px] bg-white/12 backdrop-blur-md [-webkit-backdrop-filter:blur(16px)] border border-white/20 p-4 sm:p-5 min-h-42.5 sm:min-h-45 flex flex-col justify-start">
                    <div className="protocol-card-text">
                      <span className="text-xs sm:text-[13px] font-mono tracking-widest text-brand-lime font-normal uppercase block mb-2">
                        SCHRITT {step.num}
                      </span>

                      <h3 className="text-lg sm:text-xl md:text-[21px] font-normal text-white leading-snug tracking-tight mb-2">
                        {step.title}
                      </h3>

                      <p className="text-sm sm:text-[14.5px] text-white/80 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Exact Dynamic Travel Runway */}
            <div ref={runwayRef} className="h-145 sm:h-155 w-full pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
