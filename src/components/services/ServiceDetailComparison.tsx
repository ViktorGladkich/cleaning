import React from "react";
import Link from "next/link";
import { XCircle, ArrowRight, Check } from "lucide-react";

interface ServiceDetailComparisonProps {
  slug: string;
}

export function ServiceDetailComparison({
  slug,
}: ServiceDetailComparisonProps) {
  return (
    <section className="py-20 sm:py-28 bg-brand-navy text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-brand-lime block mb-2">
            QUALITÄTSVERGLEICH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
            Warum Tadiks die sicherere Wahl ist.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/75">
            Sparen am falschen Ende führt zu Mehrkosten und Ärger. Vergleichen Sie unsere Standards direkt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left: Standard Competitors (Negative) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 text-white/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white/80">
                    Marktübliche Billiganbieter
                  </h3>
                  <p className="text-xs text-white/50 mt-1">
                    Preiskampf ohne Qualitätskontrolle
                  </p>
                </div>
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                  Risikobehaftet
                </span>
              </div>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    Häufig wechselnde Aushilfen ohne feste Schulung und ohne Deutschkenntnisse
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    Nachträgliche Aufpreise für Material, Schmutzgrad oder Wochenenden
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    Aggressive, stinkende Chemikalien oder staubige Werkzeuge ohne Feinstaubabsaugung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    Schwierige Erreichbarkeit bei Reklamationen und fehlende Übergabeprotokolle
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/40">
              Oft resultieren Nacharbeiten und Zeitverzögerungen in höheren Gesamtkosten.
            </div>
          </div>

          {/* Right: Tadiks Meisterbetrieb (Highlight) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-linear-to-b from-white/15 to-white/10 border-2 border-brand-lime text-white relative shadow-2xl flex flex-col justify-between">
            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lime text-brand-navy font-bold text-xs shadow-md">
              <Check className="w-3.5 h-3.5 stroke-3" />
              <span>TADIKS STANDARD</span>
            </div>

            <div>
              <div className="pb-6 border-b border-white/15 mb-6 pt-8 sm:pt-0 pr-0 sm:pr-32">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Tadiks Meisterbetrieb
                </h3>
                <p className="text-xs text-brand-lime mt-1 font-mono">
                  Verbindlichkeit aus Sachsen
                </p>
              </div>

              <ul className="space-y-4 text-sm text-white/95">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-3" />
                  </div>
                  <span>
                    <strong>Festes Stammpersonal &amp; deutscher Objektleiter</strong> für lückenlose Diskretion und Vertrautheit
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-3" />
                  </div>
                  <span>
                    <strong>100% garantierter Festpreis</strong> ohne versteckte Nebenkosten nach transparenter Projektkalkulation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-3" />
                  </div>
                  <span>
                    <strong>Kärcher &amp; Knauf Markenequipment</strong> sowie RKI-konforme Mikrofaserhygiene / HEPA-14 Staubabsaugung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-3" />
                  </div>
                  <span>
                    <strong>Gemeinsame Endabnahme mit Protokoll</strong> und kostenfreie Nachbesserung binnen 24 Stunden bei Beanstandung
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15">
              <Link
                href={`/contacts?service=${encodeURIComponent(slug)}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-brand-lime text-brand-navy font-bold text-sm hover:bg-white transition-colors"
              >
                <span>Jetzt Festpreisangebot sichern</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

