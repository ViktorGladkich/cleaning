"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Phone,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  BadgePercent,
  FileCheck2,
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
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current || !contentRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        contentRef.current.querySelector(".service-badge"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          contentRef.current.querySelector(".service-title"),
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          contentRef.current.querySelector(".service-description"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          contentRef.current.querySelectorAll(".trust-pill"),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.4"
        );
    },
    { scope: heroRef }
  );

  const relatedServices = ALL_SERVICE_DETAILS.filter(
    (s) => s.slug !== service.slug && service.relatedSlugs?.includes(s.slug)
  ).slice(0, 3);

  const categoryBackLink = service.category === "reinigung" ? "/reinigung" : "/bau";

  return (
    <main className="min-h-screen bg-brand-cream text-brand-navy selection:bg-brand-lime selection:text-brand-navy">
      {/* ========================================================
          1. HERO SECTION: Monumental Header & Quick Navigation
         ======================================================== */}
      <section
        ref={heroRef}
        aria-label={service.title}
        className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 overflow-hidden bg-brand-navy text-white"
      >
        {/* Subtle architectural background texture with gentle gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-brand-navy via-brand-navy/95 to-brand-navy pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-lime/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-32 w-[32rem] h-[32rem] rounded-full bg-brand-light-blue/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs sm:text-sm text-white/60">
            <Link href="/" className="hover:text-brand-lime transition-colors">
              Startseite
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link href={categoryBackLink} className="hover:text-brand-lime transition-colors">
              {service.categoryLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-brand-lime truncate">{service.title}</span>
          </nav>

          <div ref={contentRef} className="max-w-4xl">
            {/* Category Badge */}
            <div className="service-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm tracking-widest uppercase font-mono text-brand-lime mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
              <span>{service.categoryLabel} Chemnitz &amp; Region</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="service-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
              {service.title} <br />
              <span className="font-serif italic font-normal text-brand-lime">
                nach Meister-Standard.
              </span>
            </h1>

            {/* Description */}
            <p className="service-description mt-6 text-base sm:text-xl text-white/85 font-light leading-relaxed max-w-3xl">
              {service.heroDescription}
            </p>

            {/* Trust Pills Grid */}
            <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
              <div className="trust-pill inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs sm:text-sm text-white/95">
                <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0" />
                <span>100% Festpreisgarantie</span>
              </div>
              <div className="trust-pill inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs sm:text-sm text-white/95">
                <ShieldCheck className="w-4 h-4 text-brand-lime shrink-0" />
                <span>Gewerblich haftpflichtversichert</span>
              </div>
              <div className="trust-pill inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs sm:text-sm text-white/95">
                <Clock className="w-4 h-4 text-brand-lime shrink-0" />
                <span>{service.durationNote}</span>
              </div>
              <div className="trust-pill inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs sm:text-sm text-white/95">
                <Sparkles className="w-4 h-4 text-brand-lime shrink-0" />
                <span>Kostenfreie Vor-Ort-Besichtigung</span>
              </div>
            </div>

            {/* Call to Actions & Direct Phone */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/contacts?service=${encodeURIComponent(service.slug)}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-lime text-brand-navy font-semibold text-base shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <span>Jetzt Festpreis anfragen</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="tel:017643818855"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-base transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-lime" />
                <span>0176 43818855</span>
              </a>

              <div className="sm:ml-2 flex items-center gap-2 text-xs text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Preise: {service.priceNote}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. DETAILED FEATURES & VISUAL SHOWCASE
         ======================================================== */}
      <section className="py-16 sm:py-24 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image with floating badges & Tax Hint */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 border border-brand-navy/10 shadow-2xl bg-brand-navy/5">
              <Image
                src={service.imageSrc}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Price Pill */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-brand-navy">
                <div className="text-xs uppercase tracking-wider font-mono text-brand-navy/60">
                  Preise &amp; Richtwert
                </div>
                <div className="text-base sm:text-lg font-bold text-brand-navy mt-0.5">
                  {service.priceNote}
                </div>
                <div className="text-xs text-brand-navy/70 mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verbindliches Festpreisangebot nach Besichtigung</span>
                </div>
              </div>
            </div>

            {/* German Tax Benefit Box (§ 35a EStG) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-brand-lime/30 border border-brand-lime/60 text-brand-navy">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white text-brand-navy shrink-0 shadow-sm">
                  <BadgePercent className="w-6 h-6 text-brand-navy" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm sm:text-base text-brand-navy">
                    20% Steuervorteil nach § 35a EStG
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-brand-navy/80 leading-relaxed">
                    Privathaushalte können 20% der Arbeitskosten (bis zu 4.000 € jährlich)
                    direkt von der tariflichen Einkommensteuer absetzen. Gewerbliche Kunden
                    erhalten eine ordentliche Rechnung mit ausgewiesener Mehrwertsteuer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Comprehensive Checklist & Inclusions */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-brand-navy/60">
                Leistungsumfang im Detail
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-brand-navy tracking-tight mt-2">
                {service.featuresTitle}
              </h2>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-brand-navy/10 shadow-sm flex items-start gap-3 hover:border-brand-navy/20 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-navy/90 font-medium leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Included Guarantees Box */}
            <div className="p-6 rounded-2xl bg-white border-2 border-brand-navy/10 shadow-md">
              <div className="flex items-center gap-2.5 mb-4">
                <FileCheck2 className="w-5 h-5 text-brand-navy" />
                <h3 className="font-bold text-base sm:text-lg text-brand-navy">
                  {service.includedTitle}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {service.included.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-brand-navy/80">
                    <span className="w-2 h-2 rounded-full bg-brand-lime border border-brand-navy/30 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. EXECUTION WORKFLOW: 4-Step Process
         ======================================================== */}
      <section className="py-16 sm:py-20 bg-white border-y border-brand-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-mono tracking-widest text-brand-navy/60">
              Verbindlich &amp; Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-brand-navy tracking-tight mt-2">
              Ihr Ablauf von der Anfrage bis zur Übergabe.
            </h2>
            <p className="mt-4 text-base text-brand-navy/70">
              Keine versteckten Klauseln, keine unvorhergesehenen Kosten. Wir begleiten Sie
              strukturiert in vier transparenten Schritten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-2xl bg-brand-cream border border-brand-navy/10 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-navy text-white font-mono font-bold flex items-center justify-center text-sm mb-5 shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-lg text-brand-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-brand-navy/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SERVICE-SPECIFIC FAQs
         ======================================================== */}
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
          subtitle="Hier finden Sie transparente Antworten auf die wichtigsten Fragen unserer Kunden in Chemnitz und Umgebung."
          items={service.faqs.map((f) => ({
            category: service.title.toUpperCase(),
            question: f.question,
            answer: f.answer,
          }))}
        />
      )}

      {/* ========================================================
          5. RELATED SERVICES NAVIGATION
         ======================================================== */}
      {relatedServices.length > 0 && (
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-brand-navy/60">
                Ergänzende Gewerke
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-brand-navy tracking-tight mt-1">
                Weitere Leistungen für Ihr Projekt
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
                className="group p-6 rounded-2xl bg-white border border-brand-navy/10 shadow-sm hover:shadow-lg hover:border-brand-navy/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-4 bg-brand-navy/5">
                    <Image
                      src={rel.imageSrc}
                      alt={rel.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs uppercase font-mono text-brand-navy/50">
                    {rel.categoryLabel}
                  </span>
                  <h3 className="font-bold text-lg text-brand-navy mt-1 group-hover:text-brand-light-blue transition-colors">
                    {rel.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-brand-navy/70 line-clamp-2 leading-relaxed">
                    {rel.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-navy/10 flex items-center justify-between text-xs font-semibold text-brand-navy">
                  <span>Details ansehen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-navy" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          6. CLOSING CALL TO ACTION
         ======================================================== */}
      <ClosingCtaSection
        id="service-cta"
        eyebrow="TADIKS MEISTERBETRIEB CHEMNITZ"
        title={
          <>
            Bereit für meisterhafte{" "}
            <span className="font-serif italic font-normal text-brand-lime">
              {service.title}
            </span>{" "}
            in Chemnitz?
          </>
        }
        subtitle="Fordern Sie jetzt Ihr transparentes, kostenloses Festpreisangebot an. Schnelle Rückmeldung innerhalb von 24 Stunden."
        ctaText={`Angebot für ${service.title} anfordern`}
        ctaHref={`/contacts?service=${encodeURIComponent(service.slug)}`}
      />
    </main>
  );
}
