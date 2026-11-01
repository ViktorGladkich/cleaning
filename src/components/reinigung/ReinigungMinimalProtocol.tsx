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
      id="reinigung-protocol"
      aria-label="Qualitätsstandard & Ablauf"
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
                Qualitätsstandard &amp; Methodik
              </span>
              <p className="text-2xl sm:text-3xl xl:text-[38px] font-normal text-brand-navy leading-[1.28] tracking-tight">
                <span className="block protocol-statement-chunk mb-4">
                  Wir putzen nicht nur oberflächlich –{" "}
                  <span className="inline-block bg-brand-lime rounded-lg px-2 py-0.5 text-brand-navy font-normal">
                    wir schützen die Bausubstanz.
                  </span>
                </span>
                <span className="block protocol-statement-chunk font-light text-brand-navy/85 mb-5">
                  Durch{" "}
                  <span className="text-brand-navy font-normal underline decoration-brand-navy/25 underline-offset-6">
                    materialgerechte pH-Werte
                  </span>
                  , modernste{" "}
                  <span className="text-brand-navy font-normal underline decoration-brand-navy/25 underline-offset-6">
                    Osmose-Filterung
                  </span>{" "}
                  und zertifizierte{" "}
                  <span className="text-brand-navy font-normal underline decoration-brand-navy/25 underline-offset-6">
                    Hygienestandards
                  </span>
                  .
                </span>
                <span className="block protocol-statement-chunk font-light text-brand-navy/70 text-lg sm:text-xl xl:text-[21px] leading-relaxed">
                  Ob empfindlicher{" "}
                  <span className="text-brand-navy font-normal">Naturstein</span>,{" "}
                  versiegeltes{" "}
                  <span className="text-brand-navy font-normal">Echtholzparkett</span> oder{" "}
                  weitläufige{" "}
                  <span className="text-brand-navy font-normal">Glasfassaden</span>:{" "}
                  Wir stimmen Chemie, Mechanik und Intervalle exakt auf die Werkstoffe Ihrer Immobilie ab – für makellose Reinheit und dauerhaften Werterhalt.
                </span>
              </p>
            </div>
          </div>

          {/* Right Column: Clean Editorial Cards for Light Background (scroll ends immediately when Card 04 covers Card 03) */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex flex-col items-center lg:items-end w-full">
            {PROTOCOL_STEPS.map((step, idx) => (
              <div
                key={step.num}
                className={`protocol-step-card-wrapper sticky top-28 sm:top-36 w-full flex items-center justify-center lg:justify-end ${
                  idx === PROTOCOL_STEPS.length - 1 ? "mb-0" : "mb-20 sm:mb-28"
                }`}
                style={{
                  zIndex: idx + 1,
                }}
              >
                <div className="protocol-light-card relative w-full max-w-120 bg-white text-brand-navy rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 border border-brand-navy/12 shadow-[0_12px_36px_-6px_rgba(61,86,143,0.10),0_2px_6px_-1px_rgba(61,86,143,0.05)] origin-top will-change-transform">
                  {/* Top: Rounded Photographic Surface */}
                  <div className="relative w-full aspect-16/10 sm:aspect-16/9.5 rounded-[16px] sm:rounded-[20px] overflow-hidden bg-slate-100 border border-brand-navy/8">
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
                        {step.num} / 0{PROTOCOL_STEPS.length}
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
