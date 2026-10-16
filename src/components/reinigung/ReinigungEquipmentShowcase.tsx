"use client";

import React, { useRef } from "react";
import { Droplets, Wind, ShieldCheck, Leaf, Sparkles } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";

const TECH_PILLARS = [
  {
    icon: Droplets,
    title: "Reinstwasser-Osmosetechnik",
    badge: "Glas & Fassade",
    desc: "Durch mehrstufige Entmineralisierung reinigt Reinstwasser Fensterflächen physikalisch streifenfrei ohne Seifenrückstände. Zieht neuen Staub deutlich langsamer an.",
    stat: "100%",
    statLabel: "Streifenfreier Glanz",
  },
  {
    icon: Wind,
    title: "HEPA-14 Feinstaub-Filtration",
    badge: "Allergiker & Baustaub",
    desc: "Unsere Industriesauger eliminieren 99,995 % aller lungengängigen Schwebstoffe, Ruß- und Feinstaubpartikel. Perfekt für Arztpraxen und nach Renovierungen.",
    stat: "99.995%",
    statLabel: "Partikelabscheidung",
  },
  {
    icon: Leaf,
    title: "100% Ökologisch Abbaubare Tenside",
    badge: "EU Ecolabel",
    desc: "Wir setzen zertifizierte Markenreiniger (Kiehl, Dr. Schnell, Kärcher) ein – frei von Mikroplastik, chlorhaltigen Bleichmitteln und schädlichen Dämpfen.",
    stat: "0%",
    statLabel: "Chlor & Giftstoffe",
  },
  {
    icon: ShieldCheck,
    title: "4-Farben-Mikrofasercode",
    badge: "RKI Hygiene",
    desc: "Strikt getrennte Tuchfarben für Sanitär (Rot), Urinale (Gelb), Teeküchen (Grün) und Schreibtische (Blau) schließen Keimverschleppung zu 100 % aus.",
    stat: "4 Zonen",
    statLabel: "Getrennte Farbkodierung",
  },
];

export function ReinigungEquipmentShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".tech-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#0b1220] text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3D568F]/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#EAF3B2]/10 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial context */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#EAF3B2] font-semibold block mb-3">
              Technologie &amp; Materialschutz
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1]">
              Moderne Werkzeuge.{" "}
              <span className="text-[#9FBAF1] block sm:inline">
                Schonende Chemie. Perfektes Ergebnis.
              </span>
            </h2>
            <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
              Professionelle Gebäudereinigung ist angewandte Wissenschaft. Falsche pH-Werte
              können Marmorböden in Sekunden verätzen oder Holz dauerhaft quellen lassen.
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Deshalb investieren wir in kalibrierte Dosiersysteme, Osmose-Filteranlagen
              und geschultes Fachpersonal.
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#EAF3B2]" />
                <span className="text-sm font-bold text-white">Geprüfte Industriequalität</span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5">
                Wir arbeiten ausschließlich mit Premium-Herstellern wie Kärcher Professional, Kiehl, Dr. Schnell und Unger zusammen.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Tech Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TECH_PILLARS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="tech-card bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-[#EAF3B2]/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#3D568F]/30 text-[#9FBAF1] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#EAF3B2] uppercase tracking-wider bg-[#EAF3B2]/10 px-2.5 py-0.5 rounded-full border border-[#EAF3B2]/20">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#EAF3B2]">{item.stat}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{item.statLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
