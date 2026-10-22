"use client";

import React, { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";

const REGIONS = [
  { name: "Chemnitz (Zentrum, Kaßberg, Rabenstein, Ebersdorf)", time: "Sofort vor Ort" },
  { name: "Zwickau & Werdau", time: "ca. 30 Min." },
  { name: "Freiberg & Flöha", time: "ca. 25 Min." },
  { name: "Mittweida & Burgstädt", time: "ca. 20 Min." },
  { name: "Limbach-Oberfrohna & Hohenstein", time: "ca. 15 Min." },
  { name: "Erzgebirgskreis (Annaberg, Aue, Stollberg)", time: "ca. 35 Min." },
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
              <span className="font-semibold text-brand-navy">
                Chemnitz &amp; Mittelsachsen
              </span>
              .
            </h2>
            <p className="mt-3 text-sm sm:text-base text-brand-navy/70 leading-relaxed font-light max-w-2xl mx-auto">
              Für alle Vor-Ort-Besichtigungen, Schadensbegutachtungen und Aufmaße im Umkreis von bis zu 50 km berechnen wir Ihnen keinerlei Anfahrtskosten.
            </p>
          </div>

          {/* Region Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-10">
            {REGIONS.map((item, idx) => (
              <div
                key={idx}
                className="coverage-card p-4 rounded-xl bg-white border border-brand-navy/10 shadow-xs flex items-center justify-between gap-3 hover:border-brand-navy/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-brand-navy/5 text-brand-navy flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-brand-navy" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-brand-navy truncate">
                    {item.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-medium text-brand-navy/60 bg-brand-cream px-2 py-0.5 rounded-md shrink-0">
                  {item.time}
                </span>
              </div>
            ))}
          </div>

          {/* Guarantees Strip */}
          <div className="p-6 rounded-2xl bg-white/70 border border-brand-navy/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-lime flex items-center justify-center shrink-0 text-brand-navy">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-brand-navy block">
                  Ihr Standort liegt außerhalb dieses Radius?
                </span>
                <span className="text-xs text-brand-navy/60 font-light block">
                  Für größere Gewerbeobjekte, Bausanierungen und Industrieanlagen betreuen wir Projekte in ganz Sachsen.
                </span>
              </div>
            </div>

            <a
              href="tel:+4917684337228"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-navy text-white text-xs font-semibold hover:bg-brand-navy/90 transition-all shrink-0"
            >
              <span>Gebiet anfragen</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
