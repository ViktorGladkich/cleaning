"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, Sparkles, CheckCircle2 } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // 1. Split Header Reveal (Headline on left, Subheading on right)
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      headerTimeline
        .fromTo(
          ".about-headline-line",
          { y: "110%" },
          { y: "0%", duration: 1.1, stagger: 0.14, ease: "power4.out" }
        )
        .fromTo(
          ".about-lime-pill",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
          "-=0.4"
        )
        .fromTo(
          ".about-lime-text",
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".about-subheading-content",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.5"
        );

      // 2. Parallax Image Motion on Scroll (Pure, clean cinematic depth)
      if (imageRef.current && imageWrapperRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Staggered Minimalist Feature Columns Reveal
      gsap.fromTo(
        ".about-feature-col",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-features-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Numeric Stats Counter Animation
      const statItems = gsap.utils.toArray<HTMLElement>(".stat-number");
      statItems.forEach((stat) => {
        const targetValue = parseFloat(stat.getAttribute("data-target") || "0");
        const suffix = stat.getAttribute("data-suffix") || "";
        const prefix = stat.getAttribute("data-prefix") || "";

        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetValue,
          duration: 2.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            const formatted = Math.round(obj.val).toLocaleString("de-DE");
            stat.innerText = `${prefix}${formatted}${suffix}`;
          },
        });
      });
    },
    { scope: sectionRef }
  );

  const features = [
    {
      num: "01",
      icon: <Hammer className="w-5 h-5 text-brand-navy" />,
      title: "Bau, Sanierung & Innenausbau",
      desc: "Fachgerechter Trockenbau, Akustik- & Brandschutz, meisterhafte Q1–Q4 Spachtel- und Malerarbeiten sowie hochwertige Komplettsanierungen für Wohnungen und Gewerbe in Chemnitz.",
    },
    {
      num: "02",
      icon: <Sparkles className="w-5 h-5 text-brand-navy" />,
      title: "Zertifizierte Gebäudereinigung",
      desc: "Hygienische Unterhaltsreinigung für Praxen und Büros, streifenfreie Glas- und Fensterreinigung sowie bezugsfertige Bauendreinigungen mit modernen Kärcher-Systemen.",
    },
    {
      num: "03",
      icon: <CheckCircle2 className="w-5 h-5 text-brand-navy" />,
      title: "Schlüsselfertig aus einer Hand",
      desc: "Keine Schnittstellenverluste zwischen Handwerkern und Reinigungsteams. Feste deutsche Objektleiter, verbindliche Festpreise und garantierte Termintreue in ganz Sachsen.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 w-full py-20 sm:py-28 lg:py-36 bg-brand-cream overflow-hidden border-t border-slate-200/50"
    >
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Split Editorial Header (Headline Left, Subheading Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-16 sm:mb-20">
          
          {/* Left Column: Bold Kinetic Headline */}
          <div className="lg:col-span-7">
            <h2
              id="about-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-medium text-brand-navy tracking-tight leading-[1.12]"
            >
              <span className="block overflow-hidden">
                <span className="block about-headline-line translate-y-full will-change-transform">
                  Zwei starke Gewerke.
                </span>
              </span>
              <span className="block overflow-hidden pt-1.5">
                <span className="block about-headline-line translate-y-full will-change-transform">
                  Ein kompromissloser{" "}
                  <span className="about-lime-pill inline-block bg-brand-lime px-3 sm:px-4 py-0.5 rounded-xl text-slate-900 origin-left scale-x-0 transform-gpu">
                    <span className="about-lime-text opacity-0">Qualitätsstandard.</span>
                  </span>
                </span>
              </span>
            </h2>
          </div>

          {/* Right Column: SEO Subheading Copy & Internal Linking Anchor */}
          <div className="lg:col-span-5 about-subheading-content opacity-0 translate-y-6">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Als inhabergeführter Fachbetrieb in Chemnitz vereinen wir erstklassige{" "}
              <strong className="font-semibold text-slate-800">Gebäudereinigung</strong> und fachgerechten{" "}
              <strong className="font-semibold text-slate-800">Innenausbau & Sanierung</strong> unter einem Dach. 
              Ob Trockenbau, Renovierung oder die bezugsfertige Bauendreinigung für Gewerbe- und Privatobjekte 
              in Sachsen – wir garantieren Ihnen meisterhafte Präzision, feste Ansprechpartner und schlüsselfertige Übergaben 
              ohne Schnittstellenverluste.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-navy/70 group transition-colors"
                title="Erfahren Sie mehr über unseren Fachbetrieb für Reinigung und Bau in Chemnitz"
              >
                <span>Über unseren Meisterbetrieb in Chemnitz erfahren</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>

        {/* 2. Full-Width Cinematic Editorial Photo Frame (Pure image, no distracting sticker cards) */}
        <div
          ref={imageWrapperRef}
          className="relative w-full h-96 sm:h-130 lg:h-160 rounded-3xl overflow-hidden bg-slate-200/80 shadow-2xl border border-slate-200/80 mb-16 sm:mb-20"
        >
          <Image
            ref={imageRef}
            src="/images/about_team_craft.jpg"
            alt="Tadiks Meisterbetrieb Chemnitz – Professionelle Gebäudereinigung, Sanierung und Innenausbau in Sachsen"
            fill
            sizes="100vw"
            className="object-cover object-center will-change-transform scale-[1.08]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-navy/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 3. Architectural 3-Column Feature Rows (Clean hairline dividers, zero card clutter) */}
        <div className="about-features-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20 sm:mb-28">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="about-feature-col group pt-6 border-t border-slate-300/80 hover:border-brand-navy transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-brand-navy group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    {React.cloneElement(feature.icon, {
                      className: "w-5 h-5 transition-colors duration-300 group-hover:text-brand-lime",
                    })}
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400 group-hover:text-brand-navy transition-colors">
                    {feature.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-navy mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Minimalist Metric Counter Strip */}
        <div
          ref={statsRef}
          className="pt-12 sm:pt-16 border-t border-slate-200/80"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Stat 1: 5+ */}
            <div className="flex flex-col">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
                <span className="stat-number" data-target="5" data-suffix="+">
                  0+
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-2">
                Jahre Meistererfahrung
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                Fachbetrieb in Chemnitz & Region
              </span>
            </div>

            {/* Stat 2: 103+ */}
            <div className="flex flex-col">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
                <span className="stat-number" data-target="103" data-suffix="+">
                  0+
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-2">
                Realisierte Projekte
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                Wohn-, Gewerbe- & Praxisobjekte
              </span>
            </div>

            {/* Stat 3: 100% Termintreue */}
            <div className="flex flex-col">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
                <span className="stat-number" data-target="100" data-suffix="%">
                  0%
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-2">
                Garantierte Termintreue
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                Feste Zeitpläne für Bau & Reinigung
              </span>
            </div>

            {/* Stat 4: 94% Kundenzufriedenheit */}
            <div className="flex flex-col">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
                <span className="stat-number" data-target="94" data-suffix="%">
                  0%
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-2">
                Kundenzufriedenheit
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                Verifizierte Kundenbewertungen
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
