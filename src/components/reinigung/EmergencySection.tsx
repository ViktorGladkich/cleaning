import React from "react";
import Link from "next/link";
import { Phone, Send, Check } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

const USE_CASES = [
  "Kurzfristige Grund- und Sonderreinigungen",
  "Dringende Bauendreinigung und Reinigung vor Objektübergaben",
  "Zusätzliche Reinigungseinsätze für Gewerbeobjekte",
  "Individuelle Reinigungsanfragen nach Absprache",
];

/** Urgent cleaning: phone first, request form second. No promised response times. */
export function EmergencySection() {
  return (
    <section
      id="notfall"
      aria-labelledby="notfall-title"
      className="relative z-10 w-full scroll-mt-32 bg-brand-navy text-white py-16 sm:py-24"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7">
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-lime block mb-4">
            Notfallservice &amp; kurzfristige Einsätze
          </span>
          <h2
            id="notfall-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15]"
          >
            Dringende Reinigung?{" "}
            <span className="text-white/75 font-normal">Wir prüfen kurzfristige Einsätze.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm sm:text-base text-white/85 leading-relaxed">
            Manchmal muss es schnell gehen: nach einem Zwischenfall, vor einer Übergabe oder bei
            unerwartetem Reinigungsbedarf. TADIK’S Cleaning unterstützt Privat- und
            Geschäftskunden bei kurzfristig angefragten Reinigungsarbeiten – abhängig von Art,
            Umfang und verfügbarer Kapazität.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-lime px-5 py-3.5 text-sm sm:text-base font-medium text-brand-navy transition-colors hover:bg-white"
            >
              <Phone className="h-4 w-4" />
              Jetzt anrufen ({COMPANY_INFO.phone})
            </a>
            <Link
              href="/contacts?bereich=notfall#anfrage"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 px-5 py-3.5 text-sm sm:text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              <Send className="h-4 w-4" />
              Notfallanfrage senden
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8">
            <p className="text-xs font-mono uppercase tracking-wider text-white/60 mb-4">
              Mögliche Einsatzbereiche
            </p>
            <ul className="space-y-3.5">
              {USE_CASES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm sm:text-base leading-snug">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/60 leading-relaxed">
              Kurzfristige Einsätze sind nach Verfügbarkeit möglich. Am schnellsten erreichen Sie
              uns telefonisch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
