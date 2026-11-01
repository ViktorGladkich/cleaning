"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sliders, ArrowRight } from "lucide-react";
import { ServiceDetailData } from "@/data/serviceDetails";

interface ServiceDetailPriceEstimatorProps {
  service: ServiceDetailData;
}

export function ServiceDetailPriceEstimator({
  service,
}: ServiceDetailPriceEstimatorProps) {
  const isPerSqm = service.priceNote.includes("m²");
  const [calcArea, setCalcArea] = useState<number>(isPerSqm ? 120 : 80);
  const [calcInterval, setCalcInterval] = useState<
    "einmalig" | "woechentlich" | "monatlich"
  >("woechentlich");

  const estimatedCost = Math.round(
    service.category === "reinigung"
      ? isPerSqm
        ? calcArea *
          (calcInterval === "einmalig"
            ? 3.2
            : calcInterval === "woechentlich"
            ? 2.4
            : 2.8)
        : Math.max(120, calcArea * 1.8)
      : Math.max(450, calcArea * 28)
  );

  const taxSavings = Math.round(estimatedCost * 0.2);

  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-white border border-brand-navy/15 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/5 text-xs font-mono text-brand-navy">
              <Sliders className="w-3.5 h-3.5" />
              <span>INTERAKTIVER RICHTWERT-RECHNER</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-brand-navy tracking-tight">
              Kalkulieren Sie Ihr Projekt vorab unverbindlich.
            </h2>
            <p className="text-sm sm:text-base text-brand-navy/70 leading-relaxed">
              Wählen Sie die ungefähre Fläche Ihres Objekts. Sie erhalten sofort eine
              erste Richtwertspanne inklusive möglichem Steuervorteil.
            </p>

            {/* Area Slider */}
            <div className="p-5 rounded-2xl bg-brand-cream border border-brand-navy/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-brand-navy">
                  Objektgröße:
                </span>
                <span className="text-lg font-mono font-bold text-brand-navy px-3 py-1 rounded-lg bg-white border border-brand-navy/10 shadow-xs">
                  {calcArea} m²
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={calcArea}
                onChange={(e) => setCalcArea(Number(e.target.value))}
                className="w-full h-2.5 bg-brand-navy/20 rounded-lg appearance-none cursor-pointer accent-brand-navy"
              />
              <div className="flex justify-between text-[11px] text-brand-navy/50 font-mono">
                <span>30 m²</span>
                <span>150 m²</span>
                <span>300 m²</span>
                <span>500 m²</span>
              </div>
            </div>

            {/* Interval / Type Selector (Reinigung) */}
            {service.category === "reinigung" && (
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-navy/60">
                  Reinigungsintervall:
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "woechentlich", label: "Wöchentlich" },
                    { id: "monatlich", label: "14-tägig" },
                    { id: "einmalig", label: "Einmalig" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setCalcInterval(item.id as typeof calcInterval)
                      }
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        calcInterval === item.id
                          ? "bg-brand-navy text-white border-brand-navy shadow-sm"
                          : "bg-white text-brand-navy/80 border-brand-navy/15 hover:bg-brand-cream"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Dynamic Output Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-brand-navy text-white flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-lime">
                GESCHÄTZTER RICHTWERT
              </span>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  ca. {estimatedCost} €
                </span>
                <span className="text-xs text-white/60">
                  {calcInterval === "einmalig"
                    ? "netto einmalig"
                    : "netto / Monat"}
                </span>
              </div>

              <div className="mt-6 space-y-2.5 pt-6 border-t border-white/10 text-xs">
                <div className="flex justify-between text-white/80">
                  <span>Ersparnis nach § 35a EStG (20%):</span>
                  <span className="font-bold text-brand-lime">
                    - ca. {taxSavings} €
                  </span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Effektive Kosten nach Steuer:</span>
                  <span className="font-bold text-white">
                    ca. {estimatedCost - taxSavings} €
                  </span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Individuelles Festpreisangebot:</span>
                  <span className="font-bold text-emerald-400">
                    Binnen 24 Std.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                href={`/contacts?service=${encodeURIComponent(service.slug)}&area=${calcArea}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-lime text-brand-navy font-bold text-sm hover:bg-white transition-all shadow-md"
              >
                <span>Angebot mit {calcArea} m² anfragen</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-center mt-2.5 text-[11px] text-white/50">
                Verbindlicher Festpreis nach individueller Abstimmung
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

