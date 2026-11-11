"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLockedHeroHeight } from "@/hooks/useLockedHeroHeight";
import { CtaButton } from "@/components/ui/CtaButton";

export function BauHero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lockedHeight = useLockedHeroHeight(0);

  useGSAP(
    () => {
      if (!containerRef.current || !contentRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        contentRef.current.querySelector(".hero-title"),
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" }
      ).fromTo(
        contentRef.current.querySelector(".hero-subtitle"),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.6"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Bau & Sanierung"
      style={{ minHeight: lockedHeight ? `${lockedHeight}px` : undefined }}
      className="relative z-10 w-full min-h-svh flex items-center justify-center overflow-hidden bg-brand-navy"
    >
      {/* 1. Full-bleed Background Image with crisp architectural depth */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/services/overview-bau.jpg"
          alt="Team mit Schutzhelmen beim Trockenbau im Dachgeschoss eines Altbaus in Chemnitz"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:scale-[1.02]"
        />
        {/* Cinematic dark tint overlay for crystal-clear readability while preserving warm architectural light */}
        <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/30 to-black/55 pointer-events-none" />
        {/* Soft scrim behind the centred text keeps the edges of the photo bright */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_center,rgba(0,0,0,0.5),transparent)] pointer-events-none" />
      </div>

      {/* 2. Centered Content: Title & Subtitle only */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20 sm:pt-40 sm:pb-28"
      >
        <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.05]">
          TADIK’S BAU <br />
          <span className="block mt-3 text-2xl sm:text-4xl md:text-5xl text-brand-lime font-light leading-tight">
            Trockenbau, Rückbau &amp; Bauleistungen in Chemnitz
          </span>
        </h1>

        <div className="hero-subtitle">
          <p className="mt-6 sm:mt-8 text-lg sm:text-2xl text-white font-normal leading-relaxed max-w-3xl mx-auto">
            Ihr Ansprechpartner für Bauprojekte jeder Größe.
          </p>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
            TADIK’S BAU unterstützt private und gewerbliche Auftraggeber bei Trockenbau,
            Innenausbau, Abbruch, Rückbau, Entkernung und weiteren Bauarbeiten. Ob einzelne
            Maßnahmen, Renovierungen oder größere Bauvorhaben – wir prüfen Ihre Anfrage individuell
            und stimmen den Leistungsumfang auf Ihr Projekt ab. Je nach Anforderungen erfolgt die
            Umsetzung mit unserem eigenen Team oder in Zusammenarbeit mit geeigneten Fach- und
            Partnerunternehmen.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton href="/contacts?service=bauprojekt#anfrage" size="md">
              Jetzt Bauprojekt anfragen
            </CtaButton>
          </div>
        </div>

        <p className="hero-subtitle mt-6 text-xs text-white/80">
          Symbolbilder auf dieser Seite: KI-generiert.
        </p>
      </div>
    </section>
  );
}
