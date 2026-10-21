"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Building2, Home, Hammer } from "lucide-react";
import { Container } from "@/components/ui/Container";

type ObjectType = "office" | "home" | "construction" | "windows";
type Frequency = "daily" | "weekly" | "biweekly" | "monthly" | "once";

interface CalculationConfig {
  label: string;
  icon: typeof Building2;
  baseRatePerSqm: number; // reference multiplier
  minArea: number;
  maxArea: number;
  defaultArea: number;
}

const CONFIGS: Record<ObjectType, CalculationConfig> = {
  office: {
    label: "Büro & Gewerbe",
    icon: Building2,
    baseRatePerSqm: 1.45,
    minArea: 50,
    maxArea: 2500,
    defaultArea: 250,
  },
  home: {
    label: "Privathaus / Wohnung",
    icon: Home,
    baseRatePerSqm: 1.85,
    minArea: 40,
    maxArea: 600,
    defaultArea: 120,
  },
  construction: {
    label: "Bau- / Endreinigung",
    icon: Hammer,
    baseRatePerSqm: 3.2,
    minArea: 50,
    maxArea: 3000,
    defaultArea: 180,
  },
  windows: {
    label: "Glas- & Fensterreinigung",
    icon: Sparkles,
    baseRatePerSqm: 2.1,
    minArea: 30,
    maxArea: 800,
    defaultArea: 90,
  },
};

const FREQUENCIES: { id: Frequency; label: string; discountMultiplier: number }[] = [
  { id: "daily", label: "Täglich (5x/Woche)", discountMultiplier: 0.78 },
  { id: "weekly", label: "Wöchentlich", discountMultiplier: 0.88 },
  { id: "biweekly", label: "14-tägig", discountMultiplier: 0.95 },
  { id: "monthly", label: "Monatlich", discountMultiplier: 1.0 },
  { id: "once", label: "Einmalig / Projekt", discountMultiplier: 1.15 },
];

export function ReinigungCalculator() {
  const [objectType, setObjectType] = useState<ObjectType>("office");
  const [area, setArea] = useState<number>(CONFIGS.office.defaultArea);
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [includeSanitary, setIncludeSanitary] = useState(true);
  const [includeWindows, setIncludeWindows] = useState(false);

  const currentConfig = CONFIGS[objectType];
  const currentFreq = FREQUENCIES.find((f) => f.id === frequency) || FREQUENCIES[1];

  // Rough indicative calculation to give user orientation
  const baseCost = area * currentConfig.baseRatePerSqm * currentFreq.discountMultiplier;
  const extraSanitary = includeSanitary ? 35 : 0;
  const extraWindows = includeWindows ? area * 0.45 : 0;
  const estimatedEstimate = Math.round((baseCost + extraSanitary + extraWindows) / 10) * 10;
  const taxSavings = Math.round(estimatedEstimate * 0.2);

  return (
    <section className="relative py-24 sm:py-32 bg-brand-cream text-[#0f182b] border-y border-slate-200">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-navy font-semibold block mb-3">
            Interaktiver Budget-Kalkulator
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0f182b] leading-[1.1]">
            Schnell & transparent:{" "}
            <span className="text-brand-navy">Ermitteln Sie Ihren Richtwert</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Berechnen Sie in 30 Sekunden unverbindlich, mit welchem Budget Sie je nach
            Objektart, Fläche und Turnus planen können.
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
            {/* Step 1: Object Type Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                1. Objektart wählen
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(Object.keys(CONFIGS) as ObjectType[]).map((key) => {
                  const cfg = CONFIGS[key];
                  const Icon = cfg.icon;
                  const isActive = objectType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setObjectType(key);
                        setArea(CONFIGS[key].defaultArea);
                      }}
                      className={`p-3.5 rounded-lg text-left border transition-all flex items-center gap-3 ${
                        isActive
                          ? "bg-[#0f182b] text-white border-[#0f182b] shadow-md shadow-[#0f182b]/10"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-brand-lime" : "text-slate-400"}`} />
                      <span className="text-xs font-bold truncate">{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  2. Zu reinigende Fläche
                </label>
                <span className="text-lg font-black text-[#0f182b] bg-slate-100 px-3 py-1 rounded-md">
                  {area} m²
                </span>
              </div>
              <input
                type="range"
                min={currentConfig.minArea}
                max={currentConfig.maxArea}
                step={10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-brand-navy cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>{currentConfig.minArea} m²</span>
                <span>{currentConfig.maxArea} m²</span>
              </div>
            </div>

            {/* Step 3: Frequency */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                3. Gewünschter Reinigungs-Turnus
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFrequency(f.id)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${
                      frequency === f.id
                        ? "bg-brand-navy text-white border-brand-navy"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Optional Add-ons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                4. Optionale Zusatzmodule
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={includeSanitary}
                    onChange={(e) => setIncludeSanitary(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-navy accent-brand-navy"
                  />
                  <span className="text-xs text-slate-700 font-medium">
                    Sanitärhygiene inkl. Nachfüllservice für Seifen & Papierspender
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={includeWindows}
                    onChange={(e) => setIncludeWindows(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-navy accent-brand-navy"
                  />
                  <span className="text-xs text-slate-700 font-medium">
                    Inklusive regelmäßiger Glas- & Rahmenreinigung (Kombirabatt)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-[#0f182b] text-white p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-light-blue mb-2">
                Indikativer Richtwert
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-400">ca. ab</span>
                <span className="text-4xl sm:text-5xl font-black text-brand-lime tracking-tight">
                  {estimatedEstimate} €
                </span>
                <span className="text-xs text-slate-400">
                  {frequency === "once" ? "/ Einsatz" : "/ Monat"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                *Richtwert netto zzgl. MwSt. Verbindliches Festpreisangebot nach kurzer Vor-Ort-Begehung.
              </p>

              {/* Summary Breakdown */}
              <div className="mt-8 space-y-3 pt-6 border-t border-white/10 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Objektart:</span>
                  <span className="font-semibold text-white">{currentConfig.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Flächengröße:</span>
                  <span className="font-semibold text-white">{area} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Intervall:</span>
                  <span className="font-semibold text-white">{currentFreq.label}</span>
                </div>

                {objectType === "home" && (
                  <div className="mt-4 p-3 rounded-lg bg-brand-lime/10 border border-brand-lime/20 text-xs text-brand-lime">
                    <strong>Steuer-Vorteil privat:</strong> Bis zu {taxSavings} € Ersparnis über § 35a EStG möglich!
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                href={`/kontakt?flaeche=${area}&typ=${objectType}&turnus=${frequency}`}
                className="w-full py-3.5 px-5 rounded-lg bg-brand-lime hover:bg-white text-[#0f182b] font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/20"
              >
                <span>Diesen Richtwert als Angebot anfordern</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-center text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-2">
                <Check className="w-3 h-3 text-brand-lime" />
                <span>100% kostenfrei & unverbindlich</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
