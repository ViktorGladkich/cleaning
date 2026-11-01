import React from "react";
import {
  CheckCircle2,
  Sparkles,
  BadgePercent,
  Layers,
  Wrench,
  Check,
} from "lucide-react";
import { ServiceDetailData } from "@/data/serviceDetails";

const REINIGUNG_BRANDS = [
  {
    name: "Kärcher Professional",
    role: "Industrie-Heißdampf & Scheuersaugmaschinen",
  },
  {
    name: "Unger HydroPower",
    role: "Reinstwasser-Osmose bis 20 m Höhe",
  },
  {
    name: "Kiehl Eco-Line",
    role: "Zertifizierte, biologisch abbaubare Reinigungschemie",
  },
  {
    name: "Nilfisk HEPA-14",
    role: "Sicherheits-Entstaubung & Feinstaubfilterung",
  },
];

const BAU_BRANDS = [
  {
    name: "Knauf & Rigips",
    role: "Zertifizierte Schall- & Brandschutz-Systeme",
  },
  {
    name: "Festool Dust-Free",
    role: "HEPA-gekoppelte Schleif- & Sägetechnik",
  },
  {
    name: "Stabila Laser",
    role: "Rotationslaser für millimetergenaue Fluchten",
  },
  {
    name: "Caparol / Brillux",
    role: "Emissionsarme Q4-Spachtelmassen & Silikatfarben",
  },
];

interface ServiceDetailBentoMatrixProps {
  service: ServiceDetailData;
}

export function ServiceDetailBentoMatrix({
  service,
}: ServiceDetailBentoMatrixProps) {
  const technicalBrands =
    service.category === "reinigung" ? REINIGUNG_BRANDS : BAU_BRANDS;

  return (
    <section className="py-20 sm:py-28 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-14">
        <span className="text-xs uppercase font-mono tracking-widest text-brand-navy/60 block mb-2">
          LEISTUNGSMATRIX &amp; AUSSTATTUNG
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-brand-navy tracking-tight leading-tight">
          Was unsere Ausführung von herkömmlichen Anbietern unterscheidet.
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1 (Large 7-col): Visual Craftsmanship & Scope */}
        <div className="md:col-span-7 p-8 sm:p-10 rounded-3xl bg-brand-navy text-white relative overflow-hidden flex flex-col justify-between shadow-xl min-h-110">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-brand-lime/10 blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(#EAF3B2_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-brand-lime mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MEISTER-QUALITÄT</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white leading-tight">
              {service.featuresTitle}
            </h3>
            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              Wir arbeiten nicht mit Pauschalisierungen, sondern nach einem standardisierten,
              dokumentierten Protokoll. Jeder Handgriff ist exakt auf Ihre Bausubstanz und
              hygienischen Anforderungen abgestimmt.
            </p>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.features.slice(0, 4).map((f, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-xs sm:text-sm text-white/90 flex items-start gap-2.5 backdrop-blur-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2 (5-col): Pricing & Tax Advantage */}
        <div className="md:col-span-5 p-8 sm:p-10 rounded-3xl bg-white border border-brand-navy/15 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-navy/60">
                Preise &amp; Richtwert
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-lime/50 text-[11px] font-bold text-brand-navy">
                Festpreisgarantie
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-bold text-brand-navy mt-1 tracking-tight">
              {service.priceNote}
            </div>
            <p className="mt-3 text-xs sm:text-sm text-brand-navy/70 leading-relaxed">
              Klare Kalkulation nach Objektgröße und Leistungsverzeichnis. Wir kalkulieren
              fair, transparent und garantieren Ihnen den vereinbarten Festpreis ohne nachträgliche Aufschläge.
            </p>

            {/* Tax credit highlight */}
            <div className="mt-6 p-4 rounded-2xl bg-brand-cream border border-brand-navy/10">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
                <BadgePercent className="w-4 h-4 text-emerald-600" />
                <span>20% Steuern sparen nach § 35a EStG</span>
              </div>
              <p className="mt-1 text-[12px] text-brand-navy/70 leading-relaxed">
                Private Auftraggeber können bis zu 4.000 € Arbeitskosten jährlich direkt von der
                Einkommensteuer abziehen. Gewerbliche Kunden erhalten eine ordentliche Vorsteuer-Rechnung.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-navy/10 flex items-center justify-between">
            <span className="text-xs text-brand-navy/60">Angebotserstellung:</span>
            <span className="text-xs font-bold text-emerald-600">
              Innerhalb von 24 Stunden
            </span>
          </div>
        </div>

        {/* Card 3 (6-col): Complete Inclusions Checklist */}
        <div className="md:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-brand-navy/15 shadow-xl">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-xl bg-brand-navy text-white">
              <Layers className="w-5 h-5 text-brand-lime" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-brand-navy/60">
                Transparenz
              </span>
              <h4 className="text-xl font-bold text-brand-navy">
                {service.includedTitle}
              </h4>
            </div>
          </div>

          <div className="space-y-3">
            {service.included.map((inc, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-brand-cream/80 border border-brand-navy/10 flex items-center gap-3 text-sm text-brand-navy font-medium"
              >
                <div className="w-5 h-5 rounded-full bg-brand-navy text-brand-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-3" />
                </div>
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4 (6-col): Professional Equipment & Tech Brands */}
        <div className="md:col-span-6 p-8 sm:p-10 rounded-3xl bg-brand-lime/20 border border-brand-lime/60 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-xl bg-brand-navy text-brand-lime">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-brand-navy/60">
                  Maschinen &amp; Werkstoffe
                </span>
                <h4 className="text-xl font-bold text-brand-navy">
                  Eingesetzte Profi-Technik
                </h4>
              </div>
            </div>

            <div className="space-y-3">
              {technicalBrands.map((brand, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white/90 border border-brand-navy/10 flex items-start justify-between gap-3 shadow-xs"
                >
                  <div>
                    <div className="text-sm font-bold text-brand-navy">
                      {brand.name}
                    </div>
                    <div className="text-xs text-brand-navy/70 mt-0.5">
                      {brand.role}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-md bg-brand-navy text-brand-lime shrink-0">
                    Standard
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-xs text-brand-navy/75 italic">
            Kein Billig-Werkzeug, keine aggressiven Discounter-Chemikalien.
          </div>
        </div>
      </div>
    </section>
  );
}
