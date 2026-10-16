"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CtaButton } from "@/components/ui/CtaButton";
import { COMPANY_INFO } from "@/lib/constants";

export function ReinigungMinimalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        ".reini-cta-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
      aria-label="Kontakt & Beratung"
      className="relative z-10 w-full bg-brand-cream pb-16 sm:pb-24 lg:pb-32 px-2.5 sm:px-3.5"
    >
      <div className="max-w-360 mx-auto w-full">
        <div className="reini-cta-card relative rounded-[10px] overflow-hidden bg-brand-navy text-white p-8 sm:p-14 lg:p-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          
          {/* Background image subtle texture */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image
              src="/images/process_interior_bg.webp"
              alt="Architektur"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Left Text */}
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-brand-lime block mb-4">
              Kostenlose Erstbesichtigung
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08] mb-5">
              Bereit für spürbare Reinheit und dauerhaften Werterhalt?
            </h2>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed font-light max-w-xl">
              Wir analysieren Ihre Flächen vor Ort in Chemnitz und Umgebung und erstellen
              innerhalb von 24 Stunden Ihr verbindliches Festpreis-Leistungsverzeichnis.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full lg:w-auto">
            <CtaButton
              href="/contacts"
              size="lg"
              className="rounded-[8px] h-12 sm:h-13 px-7 text-sm sm:text-base"
            >
              Termin vereinbaren
            </CtaButton>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 h-12 sm:h-13 px-6 rounded-[8px] border border-white/25 hover:border-white/50 text-white hover:bg-white/10 text-sm sm:text-base font-medium transition-all"
            >
              <Phone className="w-4 h-4 text-brand-lime" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
