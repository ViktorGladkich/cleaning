"use client";

import React, { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";

const REGIONS = [
  "Chemnitz (Zentrum, Kaßberg, Rabenstein, Ebersdorf)",
  "Zwickau & Werdau",
  "Freiberg & Flöha",
  "Mittweida & Burgstädt",
  "Limbach-Oberfrohna & Hohenstein",
  "Erzgebirgskreis (Annaberg, Aue, Stollberg)",
  "Dresden",
  "Leipzig",
  "Berlin",
  "Hannover",
  "Erfurt",
  "Magdeburg",
];

export function ContactCoverageSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        ".coverage-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="einsatzgebiet"
      aria-label="Einsatzgebiet in Chemnitz und Sachsen"
      className="relative z-10 w-full py-16 sm:py-24 bg-brand-cream border-t border-brand-navy/10 overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/80 block mb-3">
              Regionale Verwurzelung
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-brand-navy leading-tight">
              Unser Einsatzgebiet in{" "}
              <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-normal ml-0">
                Chemnitz &amp; Mittelsachsen.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-brand-navy/70 leading-relaxed font-light max-w-2xl mx-auto">
              Für alle Vor-Ort-Besichtigungen, Schadensbegutachtungen und Aufmaße im Umkreis von bis zu 50 km berechnen wir Ihnen keinerlei Anfahrtskosten.
            </p>
          </div>

          {/* Region Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-10">
            {REGIONS.map((name, idx) => (
              <div
                key={idx}
                className="coverage-card p-4 rounded-xl bg-white border border-brand-navy/10 shadow-xs flex items-center gap-3 hover:border-brand-navy/30 transition-colors duration-300"
              >
                <MapPin className="w-4 h-4 text-brand-navy shrink-0" />
                <span className="text-xs sm:text-[13px] font-medium text-brand-navy truncate">
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Guarantees Strip */}
          <div className="p-6 rounded-2xl bg-white/70 border border-brand-navy/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-brand-navy shrink-0" />
              <div>
                <span className="text-sm font-semibold text-brand-navy block">
                  Ihr Standort liegt außerhalb dieses Radius?
                </span>
                <span className="text-xs text-brand-navy/60 font-light block">
                  Für größere Gewerbeobjekte, Bausanierungen und Industrieanlagen betreuen wir Projekte auch überregional.
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <CtaButton href="#anfrage" size="md">
                Gebiet anfragen
              </CtaButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
