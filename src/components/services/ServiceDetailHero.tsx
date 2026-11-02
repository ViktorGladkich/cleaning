"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ShieldCheck,
  Clock,
  ArrowRight,
  ChevronRight,
  BadgePercent,
  Award,
} from "lucide-react";
import { ServiceDetailData } from "@/data/serviceDetails";
import { COMPANY_INFO } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ServiceDetailHeroProps {
  service: ServiceDetailData;
}

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const categoryBackLink =
    service.category === "reinigung" ? "/services" : "/bau";

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

  return (
    <section
      ref={heroRef}
      aria-label={service.title}
      className="relative w-full min-h-svh flex items-center justify-center overflow-hidden bg-brand-navy text-white pt-28 pb-20 sm:pt-36 sm:pb-28"
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
        <div className="absolute inset-0 bg-linear-to-b from-brand-navy/90 via-black/65 to-brand-navy/95 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-brand-lime/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div
        ref={heroContentRef}
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between"
      >
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center space-x-2 text-xs sm:text-sm text-white/60 min-w-0 overflow-hidden">
          <Link href="/" className="hover:text-brand-lime transition-colors shrink-0">
            Startseite
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
          <Link
            href={categoryBackLink}
            className="hover:text-brand-lime transition-colors shrink-0"
          >
            {service.categoryLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
          <span className="text-brand-lime truncate min-w-0">{service.title}</span>
        </div>

        <div className="max-w-5xl min-w-0">
          {/* Top Specification Pill */}
          <div className="hero-badge-wrap inline-flex items-center px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-sm tracking-widest uppercase font-mono text-brand-lime mb-6 shadow-sm max-w-full">
            <span className="truncate">
              TADIKS FACHBETRIEB — {service.categoryLabel.toUpperCase()}
            </span>
          </div>

          {/* Monumental Title */}
          <h1 className="hero-title text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.05] wrap-break-word hyphens-auto">
            {service.title} <br />
            <span className="text-brand-lime font-light">
              in höchster Qualität.
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
              <div className="text-[11px] text-white/70">
                ohne Nachforderungen
              </div>
            </div>

            <div className="hero-stat-card p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand-lime" />
                Qualität
              </div>
              <div className="mt-1 text-sm sm:text-base font-bold text-white">
                Fach-Qualität
              </div>
              <div className="text-[11px] text-white/70">
                {service.category === "reinigung"
                  ? "RKI-konform"
                  : "DIN 18180 / 18202"}
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
              <div className="text-[11px] text-white/70">
                Angebot &amp; Begehung
              </div>
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
              className="inline-flex items-center justify-center gap-3 px-5 sm:px-8 py-4 rounded-xl bg-brand-lime text-brand-navy font-semibold text-sm sm:text-base text-center shadow-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
            >
              <span>Verbindliches Festpreisangebot anfordern</span>
              <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm sm:text-base transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0 text-brand-lime" />
              <span>Direkt anrufen: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

