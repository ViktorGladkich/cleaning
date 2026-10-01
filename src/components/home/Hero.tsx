"use client";

import React, { useRef } from "react";
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { useGSAP, gsap } from "@/lib/gsap";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -15,
        duration: 0.6,
      })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-features > *",
          {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".hero-card",
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
          },
          "-=0.5"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-linear-to-b from-blue-50/40 via-white to-white dark:from-neutral-900/60 dark:via-neutral-950 dark:to-neutral-950"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#1a77ed_1px,transparent_1px)] bg-size-[24px_24px] opacity-10 pointer-events-none" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hero-badge">
              <Badge variant="blue" className="px-3.5 py-1.5 text-xs sm:text-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#1a77ed]" />
                Professionelle Reinigung in Chemnitz & Umgebung
              </Badge>
            </div>

            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
              Makellose Sauberkeit <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1a77ed] to-sky-500">
                für Zuhause & Büro
              </span>{" "}
              ohne Aufwand
            </h1>

            <p className="hero-desc text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
              Gewinnen Sie wertvolle Freizeit zurück. Wir kümmern uns um die gründliche Reinigung Ihrer Wohnung, Ihres Hauses oder Gewerbeobjekts in Chemnitz mit geprüften Fachkräften.
            </p>

            <div className="hero-actions flex flex-wrap items-center gap-4 pt-2">
              <Button href="/contacts" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Kostenloses Angebot
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Unsere Leistungen
              </Button>
            </div>

            {/* Bullet features */}
            <div className="hero-features pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neutral-200/80 dark:border-neutral-800">
              <div className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#1a77ed] shrink-0" />
                <span>Öko-Reiniger & Kärcher</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>5 Mio. € versichert</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
                <span>Bewertung 4.9 / 5.0</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Card Showcase */}
          <div className="hero-card lg:col-span-5">
            <div className="relative rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/90">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1a77ed]">
                    Schnellanfrage
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                    10% Kennenlern-Rabatt
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-50 text-[#1a77ed] dark:bg-blue-950 dark:text-blue-300 text-xs font-bold border border-blue-200/60 dark:border-blue-800">
                  Für Neukunden
                </div>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between text-sm py-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">1–2 Zimmer Wohnung</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">ab 49 €</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">3–4 Zimmer Wohnung</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">ab 89 €</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Einfamilienhaus / Altbau</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">ab 139 €</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2">
                  <span className="text-neutral-600 dark:text-neutral-400">Nach Renovierung / Bau</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">ab 189 €</span>
                </div>
              </div>

              <div className="pt-2">
                <Button href="/contacts" variant="primary" size="lg" className="w-full">
                  Termin vereinbaren
                </Button>
                <p className="text-center text-xs text-neutral-500 mt-3">
                  Transparente Abrechnung nach erbrachter Leistung
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
