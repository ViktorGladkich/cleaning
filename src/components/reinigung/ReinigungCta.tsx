"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Phone, ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";

export function ReinigungCta() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".reini-cta-box",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
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
      className="relative py-24 sm:py-32 bg-[#0f182b] text-white overflow-hidden"
    >
      {/* Background ambient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-1/4 w-150 h-150 bg-brand-navy/30 blur-[150px] rounded-full" />
        <div className="absolute -bottom-32 left-10 w-125 h-125 bg-brand-lime/10 blur-[130px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="reini-cta-box relative rounded-3xl bg-linear-to-br from-[#162444] via-[#0f182b] to-[#0a101d] border-2 border-white/10 p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden">
          {/* Subtle line motif */}
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-brand-lime fill-none" strokeWidth="0.5">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="20" />
            </svg>
          </div>

          <div className="max-w-3xl">
            {/* Header label */}
            <span className="text-xs font-mono uppercase tracking-widest text-brand-lime font-semibold block mb-4">
              Kostenlose Erstberatung &amp; Vor-Ort-Audit
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Bereit für makellose Reinheit{" "}
              <span className="text-brand-light-blue">ohne Kompromisse?</span>
            </h2>

            {/* Subtext */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Lassen Sie uns gemeinsam den Werterhalt Ihrer Immobilie sichern. Wir analysieren
              Ihre Flächen kostenfrei vor Ort und erstellen innerhalb von 24 Stunden Ihr verbindliches Festpreis-Leistungsverzeichnis.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/kontakt"
                className="px-8 py-4 rounded-lg bg-brand-lime hover:bg-white text-[#0f182b] font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg shadow-black/20 flex items-center gap-2 group"
              >
                <span>Vor-Ort-Besichtigung vereinbaren</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="px-7 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base tracking-wide transition-colors border border-white/15 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-lime" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Trust Proof Bottom Row */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-lime shrink-0" />
                <span className="text-xs text-slate-300 font-medium">
                  Gewerblich haftpflichtversichert
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-lime shrink-0" />
                <span className="text-xs text-slate-300 font-medium">
                  Reaktionszeit unter 24 Stunden
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-brand-lime shrink-0" />
                <span className="text-xs text-slate-300 font-medium">
                  100% Festpreisgarantie
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
