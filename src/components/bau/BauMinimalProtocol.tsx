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

const BAU_PROTOCOL_STEPS: ProtocolStep[] = [
  {
    num: "01",
    image: "/images/bau_step_1.jpg",
    title: "Kostenlose Vor-Ort-Analyse: Bausubstanz prüfen, Raummaße erfassen.",
    desc: "Präzises Laser-Aufmaß aller Räume, Feuchtigkeitsmessung und bautechnische Bestandsaufnahme. Verbindliche Fachberatung vor Ort in Chemnitz.",
  },
  {
    num: "02",
    image: "/images/bau_step_2.jpg",
    title: "Verbindliches Festpreis-Leistungsverzeichnis: Volle Kostensicherheit.",
    desc: "Detailliert aufgeschlüsselte Mengen- und Materialberechnung nach DIN-Normen. Ein garantierter Festpreis für alle Gewerke ohne Nachträge.",
  },
  {
    num: "03",
    image: "/images/bau_step_3.jpg",
    title: "Präzise Gewerke-Ausführung: Feste Handwerker-Teams & Staubschutz.",
    desc: "Trockenbau, Akustikdecken und Q4-Spachtelung mit Rotationslasern und mobilen HEPA-Luftreinigern für saubere, termintreue Bauphasen.",
  },
  {
    num: "04",
    image: "/images/bau_step_4.jpg",
    title: "Schlüsselfertige VOB-Abnahme: Bauleiter-Audit & bezugsfertige Übergabe.",
    desc: "Gemeinsame Endabnahme nach VOB-Kriterien inklusive bezugsfertiger Bauendreinigung durch unser eigenes Team. Einzug ohne Nacharbeiten.",
  },
];

export function BauMinimalProtocol() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Clean kinetic statement entrance on left
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

      // Hide preceding cards once the next card stacks on top of them
      // This guarantees that in the end, ONLY the last card (Card 04) is visible
      // and previous cards can never peek out or slide out when scrolling further
      const cardNodes = sectionRef.current.querySelectorAll<HTMLElement>(".protocol-step-card-wrapper");
      if (cardNodes.length > 1) {
        cardNodes.forEach((card, idx) => {
          if (idx === 0) return;
          const prevCard = cardNodes[idx - 1];

          ScrollTrigger.create({
            trigger: card,
            start: () => (window.innerWidth >= 640 ? "top 144px" : "top 112px"),
            onEnter: () => {
              gsap.set(prevCard, { autoAlpha: 0 });
            },
            onLeaveBack: () => {
              gsap.set(prevCard, { autoAlpha: 1 });
            },
          });
        });

        // Exact travel distance needed for Card 04 to reach top-28/top-36 and land flat on Card 03,
        // and immediately continue scrolling down with zero dead pause
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
      id="bau-protocol"
      aria-label="Bau-Qualitätsstandard & Ablauf"
      className="relative z-10 w-full bg-brand-navy text-white py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Split: Wider Sticky Statement on Left | Stacking Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
          
          {/* Left Column: Pure Sticky Statement with generous width */}
          <div
            ref={statementRef}
            className="lg:col-span-6 xl:col-span-7 lg:sticky lg:top-36 xl:top-40 self-start pr-0 lg:pr-6 xl:pr-10"
          >
            <div className="w-full max-w-2xl xl:max-w-3xl">
              <p className="text-2xl sm:text-3xl xl:text-[38px] font-light text-white/95 leading-[1.3] tracking-tight">
                <span className="block protocol-statement-chunk mb-4">
                  Wir bauen nicht nur Wände –{" "}
                  <span className="text-brand-lime font-normal">
                    wir schaffen bleibende Werte.
                  </span>
                </span>
                <span className="block protocol-statement-chunk font-extralight text-white/85 mb-5">
                  Durch{" "}
                  <span className="text-brand-lime font-normal">
                    millimetergenaue Laser-Ausrichtung
                  </span>
                  , zertifizierten{" "}
                  <span className="text-brand-lime font-normal">
                    Schallschutz
                  </span>{" "}
                  und streiflichtfreie{" "}
                  <span className="text-brand-lime font-normal">
                    Q4-Spachtelung
                  </span>
                  .
                </span>
                <span className="block protocol-statement-chunk font-extralight text-white/75 text-lg sm:text-xl xl:text-[22px] leading-relaxed">
                  Ob anspruchsvoller{" "}
                  <span className="text-brand-lime font-normal">Trockenbau</span>, 
                  schallschluckende{" "}
                  <span className="text-brand-lime font-normal">Akustikdecken</span> oder 
                  die schlüsselfertige{" "}
                  <span className="text-brand-lime font-normal">Komplettsanierung</span>: 
                  Wir vereinen alle Gewerke unter einer meisterhaften Bauleitung – termintreu, sauber und ohne Schnittstellenverlust.
                </span>
              </p>
            </div>
          </div>

          {/* Right Column: Stacking Cards (Zero Flickering, 100% Solid Opaque, No Shadows, Full Coverage) */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex flex-col items-center lg:items-end w-full">
            {BAU_PROTOCOL_STEPS.map((step, idx) => (
              <div
                key={step.num}
                className={`protocol-step-card-wrapper sticky top-28 sm:top-36 w-full flex items-center justify-center lg:justify-end ${
                  idx === BAU_PROTOCOL_STEPS.length - 1 ? "mb-0" : "mb-24 sm:mb-32"
                }`}
                style={{
                  zIndex: idx + 1,
                }}
              >
                {/* Outer Card: 100% Solid brand-cream (matches light sections, zero opacity flickering), no shadows */}
                <div className="relative w-full max-w-120 bg-brand-cream text-brand-navy rounded-[28px] sm:rounded-[34px] p-4 sm:p-5 border border-white/20 shadow-none">
                  
                  {/* Top: Large Rounded Photographic Surface */}
                  <div className="relative w-full aspect-16/10 sm:aspect-16/9.5 rounded-[20px] sm:rounded-3xl overflow-hidden bg-slate-900 border border-brand-navy/10">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />
                  </div>

                  {/* Bottom: Card Eyebrow + Uniform Lightweight Title + Description (No bold weights, uniform height) */}
                  <div className="pt-5 pb-2 px-3 sm:px-4 min-h-42.5 sm:min-h-45 flex flex-col justify-start">
                    <span className="text-xs sm:text-[13px] font-mono tracking-widest text-brand-navy/60 font-normal uppercase block mb-2.5">
                      SCHRITT {step.num}
                    </span>

                    <h3 className="text-lg sm:text-xl md:text-[21px] font-normal text-brand-navy leading-snug tracking-tight mb-2.5">
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-[14.5px] text-brand-navy/70 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Exact Dynamic Travel Runway: allows Card 04 to reach top-28/top-36 and land flat on Card 03, then immediately scrolls down */}
            <div ref={runwayRef} className="h-145 sm:h-155 w-full pointer-events-none" aria-hidden="true" />
          </div>

        </div>

      </div>
    </section>
  );
}
