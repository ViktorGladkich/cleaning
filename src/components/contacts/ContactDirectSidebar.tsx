import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export function ContactDirectSidebar() {
  return (
    <div className="lg:col-span-5 lg:sticky lg:top-28 xl:top-32 self-start min-w-0">
      <div className="hub-reveal space-y-5">
        <div>
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/80 block mb-2.5">
            Direkter Draht
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-brand-navy leading-tight">
            Sprechen Sie direkt mit{" "}
            <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-normal ml-0">
              unserem Team.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-navy/70 leading-relaxed font-light">
            Keine langen Warteschleifen. Rufen Sie uns an oder schreiben Sie uns — wir melden uns innerhalb von 24 Stunden verlässlich zurück.
          </p>
        </div>

        {/* Direct Cards */}
        <div className="space-y-3 pt-1">
          {/* Phone */}
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-brand-navy/10 shadow-xs hover:shadow-md hover:border-brand-navy/30 transition-[box-shadow,border-color] duration-300"
          >
            <div className="text-brand-navy flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-mono uppercase text-brand-navy/50 block mb-0.5">
                Telefonische Beratung
              </span>
              <span className="text-base sm:text-lg font-semibold text-brand-navy group-hover:text-brand-navy/80 transition-colors block">
                {COMPANY_INFO.phone}
              </span>
              <span className="text-[11px] text-brand-navy/60 mt-0.5 block">
                Mo – Sa: 07:00 – 19:00 Uhr erreichbar
              </span>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-brand-navy/10 shadow-xs hover:shadow-md hover:border-brand-navy/30 transition-[box-shadow,border-color] duration-300"
          >
            <div className="text-brand-navy flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-mono uppercase text-brand-navy/50 block mb-0.5">
                E-Mail-Anfrage
              </span>
              <span className="text-base sm:text-lg font-semibold text-brand-navy group-hover:text-brand-navy/80 transition-colors block truncate">
                {COMPANY_INFO.email}
              </span>
              <span className="text-[11px] text-brand-navy/60 mt-0.5 block">
                Antwortgarantie innerhalb von 24 Stunden
              </span>
            </div>
          </a>

          {/* Address / Headquarters */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-brand-navy/10 shadow-xs">
            <div className="text-brand-navy flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-mono uppercase text-brand-navy/50 block mb-0.5">
                Standort &amp; Büro
              </span>
              <span className="text-base font-semibold text-brand-navy block">
                {COMPANY_INFO.address}
              </span>
              <span className="text-[11px] text-brand-navy/60 mt-0.5 block">
                Hauptsitz Chemnitz, Einsatz in Sachsen &amp; überregional
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

