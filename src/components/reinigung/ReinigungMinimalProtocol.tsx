"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PROTOCOL_STEPS = [
  {
    num: "01",
    title: "Vor-Ort-Audit",
    desc: "Kostenfreie Begehung Ihrer Liegenschaft. Wir erfassen Flächenmaße, Materialempfindlichkeiten (Parkett, Naturstein, Glas) und individuelle RKI-Vorgaben.",
  },
  {
    num: "02",
    title: "Festpreis-Konzept",
    desc: "Transparente Leistungsverzeichnisse mit modular wählbaren Intervallen. Ein verbindlicher Festpreis ohne versteckte Nebenkosten oder Überraschungen.",
  },
  {
    num: "03",
    title: "Stammpersonal",
    desc: "Reinigung durch fest zugeteilte, geschulte Mitarbeiter mit Kärcher Professional-Technik und 4-Farben-Mikrofaserhygiene – diskret und verlässlich.",
  },
  {
    num: "04",
    title: "Qualitätsnachweis",
    desc: "Laufende Objektleiter-Audits und digitale Übergabeprotokolle. Sollte etwas nicht perfekt sein, bessern wir binnen 24 Stunden kostenfrei nach.",
  },
];

export function ReinigungMinimalProtocol() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Kinetic statement reveal
      gsap.fromTo(
        ".protocol-statement-chunk",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // 2. Cinematic Curtain Transition: The dark navy section subtly glides and lifts upwards,
      // letting the subsequent cream FAQ section smoothly roll up over it like a curtain
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(sectionRef.current, {
          yPercent: -15,
          opacity: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom 85%",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // 2. Protocol steps reveal
      gsap.fromTo(
        ".protocol-step-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".protocol-steps-grid",
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="reinigung-protocol"
      aria-label="Qualitätsstandard & Ablauf"
      className="relative z-10 w-full bg-brand-navy text-white pt-24 sm:pt-32 pb-20 sm:pb-28 lg:pb-36 will-change-transform"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Large Statement with Key Accents in brand-lime (#EAF3B2) without "Der Standard" label */}
        <div ref={textRef} className="max-w-4xl mb-16 sm:mb-24">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-light text-white/90 leading-[1.25] tracking-tight">
            <span className="block protocol-statement-chunk mb-2">
              Wir putzen nicht nur oberflächlich –{" "}
              <span className="text-brand-lime font-normal">
                wir schützen die Bausubstanz.
              </span>
            </span>
            <span className="block protocol-statement-chunk font-extralight text-white/80">
              Durch{" "}
              <span className="text-brand-lime font-normal underline decoration-brand-lime/30 underline-offset-8">
                materialgerechte pH-Werte
              </span>
              , modernste{" "}
              <span className="text-brand-lime font-normal underline decoration-brand-lime/30 underline-offset-8">
                Osmose-Filterung
              </span>{" "}
              und zertifizierte{" "}
              <span className="text-brand-lime font-normal">
                Hygienestandards
              </span>
              .
            </span>
          </p>
        </div>

        {/* 4 Clean Steps: 4-Column Layout on Desktop, Border Separators */}
        <div className="protocol-steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/15">
          {PROTOCOL_STEPS.map((step) => (
            <div
              key={step.num}
              className="protocol-step-item pt-8 pb-10 sm:py-10 lg:pr-8 border-b lg:border-b-0 border-white/15 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono tracking-widest text-brand-lime block mb-4">
                  SCHRITT {step.num}
                </span>
                <h3 className="text-xl sm:text-2xl font-normal text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
