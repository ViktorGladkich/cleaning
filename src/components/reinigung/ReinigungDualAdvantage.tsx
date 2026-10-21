"use client";

import React, { useRef } from "react";
import { CheckCircle2, XCircle, ShieldAlert, Award, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export function ReinigungDualAdvantage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".comparison-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
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
      className="relative py-24 sm:py-32 bg-[#0f182b] text-white overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-brand-navy/25 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 right-10 w-100 h-100 bg-brand-lime/5 blur-[120px] pointer-events-none rounded-full" />

      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-lime font-semibold block mb-3">
            Qualitätsphilosophie im Vergleich
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-white">
            Warum herkömmliche Reinigung{" "}
            <span className="text-brand-light-blue">oft scheitert</span> – und wie wir es lösen.
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Als Meisterbetrieb für Reinigung & Bausanierung kennen wir die Materialien,
            Böden und Oberflächen bis ins Detail. Wir putzen nicht nur oberflächlich –
            wir erhalten nachhaltig den Sachwert Ihrer Immobilie.
          </p>
        </div>

        {/* Comparison Split Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Standard Discounter Cleaners */}
          <div className="comparison-card flex flex-col bg-slate-900/60 backdrop-blur-md rounded-2xl border border-rose-500/20 p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-rose-500 to-amber-500" />
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase font-bold tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Klassische Billiganbieter
              </span>
              <span className="text-xs text-slate-400">Versteckte Risiken</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-200 mb-4">
              Schnelle Wischmethoden ohne Materialkenntnis
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Oft werden ungeschulte Aushilfskräfte unter extremem Zeitdruck eingesetzt. Das Resultat: Schmierfilme, aggressive Säuren auf Naturstein und dauerhafte Abnutzung empfindlicher Böden.
            </p>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Ständiger Personalwechsel ohne feste Vertrauensperson",
                "Günstige, scharfe Chemie beschädigt Parkett & Armaturen",
                "Mangelhafte 1-Tuch-Hygiene verschleppt Keime",
                "Versteckte Nebenkosten & starre Knebelverträge",
                "Kein Fachverständnis für Bausubstanz und Versiegelung",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 text-xs text-rose-300/80">
              Folge: Hohe Folgekosten durch vorzeitige Bodensanierung und unzufriedene Mitarbeiter/Mieter.
            </div>
          </div>

          {/* Card 2: Tadiks Integrated Master Approach */}
          <div className="comparison-card flex flex-col bg-linear-to-b from-[#162444] to-[#0f182b] rounded-2xl border-2 border-brand-lime/50 p-8 sm:p-10 relative overflow-hidden shadow-2xl shadow-brand-navy/20">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-lime" />
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase font-bold tracking-wider text-[#0f182b] bg-brand-lime px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Award className="w-3.5 h-3.5" />
                Der Tadiks Meister-Standard
              </span>
              <span className="text-xs font-semibold text-brand-lime">Werterhalt & Hygiene</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Geprüfte Bau- & Reinigungsexpertise in Personalunion
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Wir betrachten Räume mit den Augen von Handwerkern und Hygiene-Experten. Wir kennen den pH-Wert für jeden Untergrund, reinigen mikrobiologisch rein und schützen Ihre Investition dauerhaft.
            </p>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Festes, festangestelltes Stammpersonal mit einwandfreiem Leumund",
                "Materialspezifische, biologisch abbaubare Markenreiniger (Kärcher / Kiehl)",
                "Strenges 4-Farben-Mikrofasersystem gegen Keimverschleppung",
                "Faire Festpreise mit flexiblen, transparenten Kündigungsfristen",
                "Integrierte Bausanierung: Kleinreparaturen direkt aus einer Hand möglich",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-white font-medium">
                  <CheckCircle2 className="w-5 h-5 text-brand-lime shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-brand-lime/10 border border-brand-lime/20 flex items-center justify-between gap-4">
              <div className="text-xs text-brand-lime font-semibold">
                Ergebnis: Repräsentativer Glanz & Werterhalt über Jahrzehnte.
              </div>
              <Link
                href="/kontakt"
                className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-white hover:text-brand-lime transition-colors"
              >
                <span>Audit buchen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
