"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  XCircle,
  Phone,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  BadgePercent,
  Sliders,
  Award,
  Layers,
  Wrench,
  Check,
} from "lucide-react";
import { ServiceDetailData, ALL_SERVICE_DETAILS } from "@/data/serviceDetails";
import { FaqSection } from "@/components/home/FaqSection";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ServiceDetailPageContentProps {
  service: ServiceDetailData;
}

export function ServiceDetailPageContent({ service }: ServiceDetailPageContentProps) {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Interactive instant cost estimator state
  const isPerSqm = service.priceNote.includes("m²");
  const [calcArea, setCalcArea] = useState<number>(isPerSqm ? 120 : 80);
  const [calcInterval, setCalcInterval] = useState<"einmalig" | "woechentlich" | "monatlich">("woechentlich");

  useGSAP(
    () => {
      if (!heroRef.current || !heroContentRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        heroContentRef.current.querySelector(".hero-badge-wrap"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          heroContentRef.current.querySelector(".hero-title"),
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          heroContentRef.current.querySelector(".hero-desc"),
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          heroContentRef.current.querySelectorAll(".hero-stat-card"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.5"
        )
        .fromTo(
          heroContentRef.current.querySelector(".hero-action-bar"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
    },
    { scope: heroRef }
  );

  const relatedServices = ALL_SERVICE_DETAILS.filter(
    (s) => s.slug !== service.slug && service.relatedSlugs?.includes(s.slug)
  ).slice(0, 3);

  const categoryBackLink = service.category === "reinigung" ? "/reinigung" : "/bau";

  // Dynamic calculated estimate
  const estimatedCost = Math.round(
    service.category === "reinigung"
      ? isPerSqm
        ? calcArea * (calcInterval === "einmalig" ? 3.2 : calcInterval === "woechentlich" ? 2.4 : 2.8)
        : Math.max(120, calcArea * 1.8)
      : Math.max(450, calcArea * 28)
  );

  const taxSavings = Math.round(estimatedCost * 0.2);

  // Equipment & materials depending on category
  const technicalBrands =
    service.category === "reinigung"
      ? [
          { name: "Kärcher Professional", role: "Industrie-Heißdampf & Scheuersaugmaschinen" },
          { name: "Unger HydroPower", role: "Reinstwasser-Osmose bis 20 m Höhe" },
          { name: "Kiehl Eco-Line", role: "Zertifizierte, biologisch abbaubare Reinigungschemie" },
          { name: "Nilfisk HEPA-14", role: "Sicherheits-Entstaubung & Feinstaubfilterung" },
        ]
      : [
          { name: "Knauf & Rigips", role: "Zertifizierte Schall- & Brandschutz-Systeme" },
          { name: "Festool Dust-Free", role: "HEPA-gekoppelte Schleif- & Sägetechnik" },
          { name: "Stabila Laser", role: "Rotationslaser für millimetergenaue Fluchten" },
          { name: "Caparol / Brillux", role: "Emissionsarme Q4-Spachtelmassen & Silikatfarben" },
        ];

  return (
    <main className="min-h-screen bg-brand-cream text-brand-navy selection:bg-brand-navy selection:text-white">
      {/* =========================================================================
          1. MONUMENTAL ARCHITECTURAL HERO
          Oversized typographic scale, full-bleed imagery with cinematic dark grading
         ========================================================================= */}
      <section
        ref={heroRef}
        aria-label={service.title}
        className="relative w-full min-h-[85svh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-brand-navy text-white pt-28 pb-20 sm:pt-36 sm:pb-28"
      >
        {/* Full-bleed Background Architectural Image with cinematic grading */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={service.imageSrc}
            alt={service.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sm:scale-[1.03]"
          />
          {/* Multi-stage luxury cinematic gradient for unmatched contrast & warmth */}
          <div className="absolute inset-0 bg-linear-to-b from-brand-navy/90 via-black/65 to-brand-navy/95 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-brand-lime/10 via-transparent to-transparent pointer-events-none" />
        </div>

        <div
          ref={heroContentRef}
          className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between"
        >
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center space-x-2 text-xs sm:text-sm text-white/60">
            <Link href="/" className="hover:text-brand-lime transition-colors">
              Startseite
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link href={categoryBackLink} className="hover:text-brand-lime transition-colors">
              {service.categoryLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-brand-lime truncate">{service.title}</span>
          </div>

          <div className="max-w-5xl">
            {/* Top Specification Pill */}
            <div className="hero-badge-wrap inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm tracking-widest uppercase font-mono text-brand-lime mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
              <span>TADIKS MEISTER-SPEZIFIKATION // {service.categoryLabel.toUpperCase()}</span>
            </div>

            {/* Monumental Title */}
            <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.02]">
              {service.title} <br />
              <span className="font-serif italic font-normal text-brand-lime">
                nach Meister-Standard.
              </span>
            </h1>

            {/* Subtitle & Description */}
            <p className="hero-desc mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-white/85 font-light leading-relaxed max-w-3xl">
              {service.heroDescription}
            </p>

            {/* Live Technical Metrics Cards (Frosted Glass) */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
              <div className="hero-stat-card p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-lime" />
                  Kosten
                </div>
                <div className="mt-1 text-sm sm:text-base font-bold text-brand-lime">
                  100% Festpreis
                </div>
                <div className="text-[11px] text-white/70">ohne Nachforderungen</div>
              </div>

              <div className="hero-stat-card p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-brand-lime" />
                  Qualität
                </div>
                <div className="mt-1 text-sm sm:text-base font-bold text-white">
                  Meister-Norm
                </div>
                <div className="text-[11px] text-white/70">
                  {service.category === "reinigung" ? "RKI-konform" : "DIN 18180 / 18202"}
                </div>
              </div>

              <div className="hero-stat-card p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-lime" />
                  Reaktion
                </div>
                <div className="mt-1 text-sm sm:text-base font-bold text-white">
                  Binnen 24 Std.
                </div>
                <div className="text-[11px] text-white/70">Angebot &amp; Begehung</div>
              </div>

              <div className="hero-stat-card p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                  <BadgePercent className="w-3.5 h-3.5 text-brand-lime" />
                  Steuern
                </div>
                <div className="mt-1 text-sm sm:text-base font-bold text-brand-lime">
                  20% Abzug
                </div>
                <div className="text-[11px] text-white/70">nach § 35a EStG</div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="hero-action-bar mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/contacts?service=${encodeURIComponent(service.slug)}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-lime text-brand-navy font-semibold text-base shadow-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <span>Verbindliches Festpreisangebot anfordern</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="tel:017643818855"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-base transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-lime" />
                <span>Direkt anrufen: 0176 43818855</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. BENTO SPECIFICATION MATRIX
          Editorial Bento cards: Technique, Material, Guarantees & Pricing
         ========================================================================= */}
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
          <div className="md:col-span-7 p-8 sm:p-10 rounded-3xl bg-brand-navy text-white relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[440px]">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-brand-lime/10 blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(#EAF3B2_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

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
                Keine versteckten Anfahrtskosten im Raum Chemnitz und Mittelsachsen. Wir kalkulieren
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
              <span className="text-xs text-brand-navy/60">Besichtigung:</span>
              <span className="text-xs font-bold text-emerald-600">100% kostenlos vor Ort</span>
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
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
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
                      <div className="text-sm font-bold text-brand-navy">{brand.name}</div>
                      <div className="text-xs text-brand-navy/70 mt-0.5">{brand.role}</div>
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

      {/* =========================================================================
          3. EDITORIAL QUALITY COMPARISON TABLE
          "Marktüblicher Standard vs. Tadiks Meisterbetrieb"
          Demonstrates absolute German trade superiority & eliminates price doubts
         ========================================================================= */}
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
                    <h3 className="text-xl font-bold text-white/80">Marktübliche Billiganbieter</h3>
                    <p className="text-xs text-white/50 mt-1">Preiskampf ohne Qualitätskontrolle</p>
                  </div>
                  <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                    Risikobehaftet
                  </span>
                </div>

                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>Häufig wechselnde Aushilfen ohne feste Schulung und ohne Deutschkenntnisse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>Nachträgliche Aufpreise für Material, Anfahrt, Schmutzgrad oder Wochenenden</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>Aggressive, stinkende Chemikalien oder staubige Werkzeuge ohne Feinstaubabsaugung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>Schwierige Erreichbarkeit bei Reklamationen und fehlende Übergabeprotokolle</span>
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
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>TADIKS STANDARD</span>
              </div>

              <div>
                <div className="pb-6 border-b border-white/15 mb-6 pr-32">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Tadiks Meisterbetrieb</h3>
                  <p className="text-xs text-brand-lime mt-1 font-mono">Verbindlichkeit aus Sachsen</p>
                </div>

                <ul className="space-y-4 text-sm text-white/95">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong>Festes Stammpersonal &amp; deutscher Objektleiter</strong> für lückenlose Diskretion und Vertrautheit
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong>100% garantierter Festpreis</strong> ohne versteckte Nebenkosten nach kostenloser Vor-Ort-Begehung
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong>Kärcher &amp; Knauf Markenequipment</strong> sowie RKI-konforme Mikrofaserhygiene / HEPA-14 Staubabsaugung
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong>Gemeinsame Endabnahme mit Protokoll</strong> und kostenfreie Nachbesserung binnen 24 Stunden bei Beanstandung
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15">
                <Link
                  href={`/contacts?service=${encodeURIComponent(service.slug)}`}
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

      {/* =========================================================================
          4. INTERACTIVE PRICE ESTIMATOR TEASER
          Gives dynamic feel, allows user to calculate scope & request custom offer
         ========================================================================= */}
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
                  <span className="text-sm font-bold text-brand-navy">Objektgröße:</span>
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
                        onClick={() => setCalcInterval(item.id as typeof calcInterval)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
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
                    {calcInterval === "einmalig" ? "netto einmalig" : "netto / Monat"}
                  </span>
                </div>

                <div className="mt-6 space-y-2.5 pt-6 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-white/80">
                    <span>Ersparnis nach § 35a EStG (20%):</span>
                    <span className="font-bold text-brand-lime">- ca. {taxSavings} €</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Effektive Kosten nach Steuer:</span>
                    <span className="font-bold text-white">ca. {estimatedCost - taxSavings} €</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Erstbegehung vor Ort:</span>
                    <span className="font-bold text-emerald-400">0,00 € (Kostenlos)</span>
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
                  Verbindlicher Festpreis nach kurzer Sichtung
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. THE 4-STEP MASTER PROTOCOL TIMELINE
          Numbered architectural sequence
         ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-y border-brand-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-brand-navy/60 block mb-2">
              VERBINDLICHER PROZESS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-brand-navy tracking-tight">
              Ihr Projekt in 4 transparenten Stufen.
            </h2>
            <p className="mt-4 text-base text-brand-navy/70">
              Vom ersten Anruf bis zur finalen Abnahme: Bei Tadiks wissen Sie zu jedem
              Zeitpunkt genau, wer was tut und wann die Fertigstellung erfolgt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-7 sm:p-8 rounded-3xl bg-brand-cream border border-brand-navy/10 flex flex-col justify-between hover:shadow-lg hover:border-brand-navy/20 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-lime font-mono font-bold flex items-center justify-center text-lg mb-6 shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-xl text-brand-navy mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-brand-navy/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-navy/10 flex items-center text-xs font-mono text-brand-navy/50">
                  <span>Stufe {step.number} von 04</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SERVICE-SPECIFIC FAQS
         ========================================================================= */}
      {service.faqs && service.faqs.length > 0 && (
        <FaqSection
          eyebrow="HÄUFIG GESTELLTE FRAGEN"
          title={
            <>
              Fragen &amp; Antworten zur{" "}
              <span className="font-serif italic font-normal text-brand-navy">
                {service.title}
              </span>
            </>
          }
          subtitle="Hier finden Sie transparente Antworten auf die wichtigsten Fragen unserer Kunden in Chemnitz und Mittelsachsen."
          items={service.faqs.map((f) => ({
            category: service.title.toUpperCase(),
            question: f.question,
            answer: f.answer,
          }))}
        />
      )}

      {/* =========================================================================
          7. RELATED SERVICES CAROUSEL / GRID
         ========================================================================= */}
      {relatedServices.length > 0 && (
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-brand-navy/60 block mb-2">
                SYNERGIEN &amp; ERGÄNZUNGEN
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-brand-navy tracking-tight">
                Weitere Gewerke unseres Meisterbetriebs
              </h2>
            </div>
            <Link
              href={categoryBackLink}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-light-blue transition-colors group"
            >
              <span>Alle {service.categoryLabel} ansehen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="group p-6 sm:p-7 rounded-3xl bg-white border border-brand-navy/10 shadow-sm hover:shadow-xl hover:border-brand-navy/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-5 bg-brand-navy/5 shadow-inner">
                    <Image
                      src={rel.imageSrc}
                      alt={rel.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-xs uppercase font-mono text-brand-navy/50">
                    {rel.categoryLabel}
                  </span>
                  <h3 className="font-bold text-xl text-brand-navy mt-1 group-hover:text-brand-light-blue transition-colors">
                    {rel.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-brand-navy/70 line-clamp-2 leading-relaxed">
                    {rel.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-navy/10 flex items-center justify-between text-xs font-semibold text-brand-navy">
                  <span>Leistungsspezifikation ansehen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-navy" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          8. MONUMENTAL CLOSING CALL TO ACTION
         ========================================================================= */}
      <ClosingCtaSection
        id="service-cta"
        eyebrow="TADIKS MEISTERBETRIEB CHEMNITZ"
        title={
          <>
            Bereit für meisterhafte{" "}
            <span className="font-serif italic font-normal text-brand-lime">
              {service.title}
            </span>{" "}
            in Sachsen?
          </>
        }
        subtitle="Sichern Sie sich Ihren Wunschtermin und ein garantiertes Festpreisangebot ohne Überraschungen. Kostenfreie Besichtigung vor Ort innerhalb von 24 Stunden."
        ctaText={`Festpreisangebot für ${service.title} anfordern`}
        ctaHref={`/contacts?service=${encodeURIComponent(service.slug)}`}
      />
    </main>
  );
}
