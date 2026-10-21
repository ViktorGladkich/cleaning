"use client";

import React, { useRef } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Vor-Ort-Begehung & Bedarfsanalyse",
    subtitle: "Kostenfrei & unverbindlich binnen 24–48h",
    description:
      "Wir begutachten Ihre Räumlichkeiten, prüfen Bodenbeschichtungen, Fensterfronten und Sanitärbereiche. So ermitteln wir exakt den Aufwand und identifizieren empfindliche Materialien.",
    highlights: ["Material- & Flächenaufmaß", "Hygieneanforderungen nach RKI / HACCP", "Objektspezifische Begehung"],
  },
  {
    number: "02",
    title: "Maßgeschneidertes Leistungsverzeichnis",
    subtitle: "100% Preistransparenz ohne versteckte Klauseln",
    description:
      "Sie erhalten ein detailliertes Angebot mit modular aufgeschlüsselten Positionen, Turnusoptionen und verbindlichem Festpreis. Keine verdeckten Zusatzkosten für Verbrauchsmaterial.",
    highlights: ["Verbindlicher Festpreis", "Flexible Turnusplanung", "Monatlich anpassbare Module"],
  },
  {
    number: "03",
    title: "Präzise Durchführung durch Stammpersonal",
    subtitle: "Geschulte Fachkräfte & Profi-Equipment",
    description:
      "Ihr festes Reinigungsteam rückt mit zertifizierten Kärcher-Systemen und ergonomischen 4-Farben-Mikrofasertüchern an. Reinigung erfolgt pünktlich außerhalb oder während Ihrer Betriebszeiten.",
    highlights: ["Fest zugeteiltes Stammpersonal", "Biologische Öko-Reiniger", "Diskreter Schlüssel- & Alarmservice"],
  },
  {
    number: "04",
    title: "Digitale Abnahme & Qualitätskontrolle",
    subtitle: "Lückenlose Zufriedenheitsgarantie",
    description:
      "Unsere Objektleiter prüfen regelmäßig die Reinigungsqualität anhand digitaler Checklisten. Bei der kleinsten Unstimmigkeit bessern wir innerhalb von 24 Stunden kostenlos nach.",
    highlights: ["Regelmäßige Objektleiter-Audits", "Digitales Qualitätslogbuch", "24h Nachbesserungs-Garantie"],
  },
];

export function ReinigungProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stepCards = gsap.utils.toArray<HTMLElement>(".reini-step-card");
      if (stepCards.length > 0) {
        gsap.fromTo(
          stepCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
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
      className="relative py-24 sm:py-32 bg-brand-cream text-[#0f182b] overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-navy font-semibold block mb-3">
            Strukturierter Ablauf
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0f182b] leading-[1.1]">
            Der strukturierte Weg zu Ihrem{" "}
            <span className="text-brand-navy">Wunsch-Ergebnis</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Keine chaotischen Übergaben, keine wechselnden Gesichter. Mit unserem standardisierten
            4-Stufen-Prozess garantieren wir höchste Zuverlässigkeit und absolute Planungssicherheit.
          </p>
        </div>

        {/* 4 Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className="reini-step-card flex flex-col bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm hover:shadow-xl transition-all duration-300 relative group hover:-translate-y-1"
            >
              {/* Step Number Top */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-black text-brand-navy/20 group-hover:text-brand-navy transition-colors">
                  {step.number}
                </span>
                <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-brand-lime text-[#0f182b] flex items-center justify-center text-xs font-bold transition-colors">
                  0{index + 1}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg font-bold text-[#0f182b] tracking-tight group-hover:text-brand-navy transition-colors">
                {step.title}
              </h3>
              <p className="text-xs font-medium text-brand-navy mt-1 mb-4">
                {step.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
                {step.description}
              </p>

              {/* Key Bullet points */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {step.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-navy shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Process Guarantee Banner */}
        <div className="mt-16 text-center">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#0f182b] hover:bg-brand-navy text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:shadow-[#0f182b]/20"
          >
            <span>Jetzt Schritt 1 starten – Vor-Ort-Termin vereinbaren</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
