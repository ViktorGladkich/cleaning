import React from "react";
import Link from "next/link";
import { ShieldCheck, Clock, Award, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { CtaButton } from "@/components/ui/CtaButton";

export default function HomePage() {
  const valueProps = [
    {
      icon: <Award className="w-6 h-6 text-[var(--color-brand-navy)]" />,
      title: "Geprüfte Qualität",
      desc: "Geschultes, fest angestelltes Stammpersonal mit höchsten Qualitätsstandards.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[var(--color-brand-navy)]" />,
      title: "Voll versichert bis 5 Mio. €",
      desc: "Umfassender Versicherungsschutz für Ihre maximale Sicherheit und Sorgenfreiheit.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[var(--color-brand-navy)]" />,
      title: "Pünktlich & Zuverlässig",
      desc: "Feste Termine ohne Verzögerungen. Auf unser Team in Chemnitz können Sie sich verlassen.",
    },
  ];

  const popularServices = [
    {
      pillar: "Reinigung",
      title: "Unterhaltsreinigung",
      desc: "Regelmäßige Pflege für private Haushalte, Praxen und Büros in Chemnitz.",
      href: "/services/unterhaltsreinigung",
    },
    {
      pillar: "Bau & Sanierung",
      title: "Trockenbau & Innenausbau",
      desc: "Fachgerechte Trennwände, Akustikdecken und moderner Dachgeschossausbau.",
      href: "/bau#trockenbau",
    },
    {
      pillar: "Reinigung",
      title: "Bauendreinigung",
      desc: "Gründliche Beseitigung von Baustaub, Farbspritzern und Zementschleier.",
      href: "/services/bauendreinigung",
    },
    {
      pillar: "Bau & Sanierung",
      title: "Komplettsanierung & Renovierung",
      desc: "Ganzheitliche Modernisierung von Wohnungen und Bädern aus einer Hand.",
      href: "/bau#sanierung",
    },
    {
      pillar: "Reinigung",
      title: "Fenster- & Glasreinigung",
      desc: "Streifenfreier Glanz für Fenster, Rahmen, Wintergärten und Glasfassaden.",
      href: "/services/fensterreinigung",
    },
    {
      pillar: "Bau & Sanierung",
      title: "Maler- & Spachtelarbeiten",
      desc: "Perfekte Q1–Q4 Spachtelung, Glattvlies, Tapezier- und Qualitätsanstriche.",
      href: "/bau#malerarbeiten",
    },
  ];

  return (
    <div className="w-full bg-brand-cream">
      {/* 1. Hero with Pin & 5-Column Staircase Curtain Scroll Wipe */}
      <Hero />

      {/* 2. Value Props Section (Seamlessly revealed after Hero wipe) */}
      <section className="relative z-10 w-full py-16 sm:py-24 bg-brand-cream">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[20px] bg-slate-50/70 border border-slate-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-[12px] bg-white border border-slate-200/80 flex items-center justify-center mb-6 shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-brand-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 3. Combined Reinigung & Bau Services Preview */}
          <div className="mt-20 pt-16 border-t border-slate-200/60">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[var(--color-brand-navy)]">
                  Unsere Leistungsbereiche
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mt-2">
                  Reinigung & Bau – Alles aus einer Hand
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                  Zwei starke Säulen unter einem Dach: Nach unseren Bau- und Renovierungsarbeiten sorgen wir direkt für die bezugsfertige Bauendreinigung.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] text-sm font-semibold bg-white border border-slate-200 text-brand-navy hover:text-[var(--color-brand-navy)] hover:border-[var(--color-brand-navy)]/40 transition-colors shadow-xs"
                >
                  <span>Reinigungsdienste</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/bau"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] text-sm font-semibold bg-[var(--color-brand-navy)] text-white hover:bg-[var(--color-brand-navy)] transition-colors shadow-xs"
                >
                  <span>Bau & Sanierung</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularServices.map((service, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-[20px] bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4">
                      <span className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        service.pillar === "Reinigung"
                          ? "bg-blue-50 text-[var(--color-brand-navy)] border border-blue-100"
                          : "bg-amber-50 text-amber-800 border border-amber-200/80"
                      }`}>
                        {service.pillar}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>
                  <CtaButton href={service.href} size="sm">
                    Details ansehen
                  </CtaButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
