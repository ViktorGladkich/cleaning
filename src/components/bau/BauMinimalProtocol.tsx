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

      // 2. Subtle scale down of covered card & hide once fully covered by the next card.
      // Because there is no extra runway spacer after Card 04, the exact moment Card 04
      // finishes covering Card 03, the section immediately scrolls on to the next section.
      const cardNodes = sectionRef.current.querySelectorAll<HTMLElement>(".protocol-step-card-wrapper");
      if (cardNodes.length > 1) {
        cardNodes.forEach((card, idx) => {
          if (idx === 0) return;
          const prevCard = cardNodes[idx - 1];
          const prevInner = prevCard.querySelector<HTMLElement>(".protocol-light-card");

          if (prevInner) {
            gsap.fromTo(
              prevInner,
              { scale: 1 },
              {
                scale: 0.96,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: () => (window.innerWidth >= 640 ? "top 520px" : "top 440px"),
                  end: () => (window.innerWidth >= 640 ? "top 144px" : "top 112px"),
                  scrub: true,
                },
              }
            );
          }

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
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="bau-protocol"
      aria-label="Bau-Qualitätsstandard & Ablauf"
      className="relative z-10 w-full bg-brand-cream text-brand-navy py-20 sm:py-28 lg:py-36 border-t border-brand-navy/10"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* 2-Column Split: Sticky Statement on Left | Stacking Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
          {/* Left Column: Sticky Statement */}
          <div
            ref={statementRef}
            className="lg:col-span-6 xl:col-span-7 lg:sticky lg:top-36 xl:top-40 self-start pr-0 lg:pr-6 xl:pr-10"
          >
            <div className="w-full max-w-2xl xl:max-w-3xl">
              <span className="protocol-statement-chunk text-xs sm:text-sm font-mono uppercase tracking-widest text-brand-navy/60 block mb-4">
                Bau-Qualitätsstandard &amp; Methodik
              </span>
              <p className="text-2xl sm:text-3xl xl:text-[38px] font-normal text-brand-navy leading-[1.28] tracking-tight">
                <span className="block protocol-statement-chunk mb-4">
                  Wir bauen nicht nur Wände –{" "}
                  <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-normal ml-0">
                    wir schaffen bleibende Werte.
                  </span>
                </span>
                <span className="block protocol-statement-chunk font-light text-brand-navy/85 mb-5">
                  Durch{" "}
                  <span className="text-brand-navy font-normal">
                    millimetergenaue Laser-Ausrichtung
                  </span>
                  , DIN-gerechten{" "}
                  <span className="text-brand-navy font-normal">
                    Schallschutz
                  </span>{" "}
                  und streiflichtfreie{" "}
                  <span className="text-brand-navy font-normal">
                    Q4-Spachtelung
                  </span>
                  .
                </span>
                <span className="block protocol-statement-chunk font-light text-brand-navy/70 text-lg sm:text-xl xl:text-[21px] leading-relaxed">
                  Ob anspruchsvoller{" "}
                  <span className="text-brand-navy font-normal">Trockenbau</span>,{" "}
                  schallschluckende{" "}
                  <span className="text-brand-navy font-normal">Akustikdecken</span> oder{" "}
                  die schlüsselfertige{" "}
                  <span className="text-brand-navy font-normal">Komplettsanierung</span>:{" "}
                  Wir vereinen alle Gewerke unter einer erfahrenen Bauleitung – termintreu, sauber und ohne Schnittstellenverlust.
                </span>
              </p>
            </div>
          </div>

          {/* Right Column: Clean Editorial Cards for Light Background (scroll ends immediately when Card 04 covers Card 03) */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex flex-col items-center lg:items-end w-full">
            {BAU_PROTOCOL_STEPS.map((step, idx) => (
              <div
                key={step.num}
                className={`protocol-step-card-wrapper sticky top-28 sm:top-36 w-full flex items-center justify-center lg:justify-end ${
                  idx === BAU_PROTOCOL_STEPS.length - 1 ? "mb-0" : "mb-20 sm:mb-28"
                }`}
                style={{
                  zIndex: idx + 1,
                }}
              >
                <div className="protocol-light-card relative w-full max-w-120 bg-white text-brand-navy rounded-3xl sm:rounded-[28px] p-4 sm:p-5 border border-brand-navy/12 shadow-[0_12px_36px_-6px_rgba(61,86,143,0.10),0_2px_6px_-1px_rgba(61,86,143,0.05)] origin-top will-change-transform">
                  {/* Top: Rounded Photographic Surface */}
                  <div className="relative w-full aspect-16/10 sm:aspect-16/9.5 rounded-2xl sm:rounded-[20px] overflow-hidden bg-slate-100 border border-brand-navy/8">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom: Step Header + Title + Description */}
                  <div className="pt-5 pb-2 px-2 sm:px-3 min-h-42.5 sm:min-h-45 flex flex-col justify-start">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-brand-lime text-brand-navy text-xs font-mono tracking-widest uppercase font-medium">
                        SCHRITT {step.num}
                      </span>
                      <span className="text-xs font-mono text-brand-navy/40">
                        {step.num} / 0{BAU_PROTOCOL_STEPS.length}
                      </span>
                    </div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
