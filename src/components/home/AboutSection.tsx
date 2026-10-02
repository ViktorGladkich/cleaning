"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, Sparkles, CheckCircle2 } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { CtaButton } from "@/components/ui/CtaButton";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const subheadingWrapperRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const lastWordRef = useRef<HTMLSpanElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [handRight, setHandRight] = useState<number | null>(null);

  useEffect(() => {
    const updatePos = () => {
      if (lastWordRef.current && subheadingWrapperRef.current) {
        const wordRect = lastWordRef.current.getBoundingClientRect();
        const wrapperRect = subheadingWrapperRef.current.getBoundingClientRect();
        const right = wordRect.right - wrapperRect.left;
        if (right > 0) setHandRight(Math.round(right));
      }
    };

    updatePos();
    window.addEventListener("resize", updatePos);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updatePos);
    }
    return () => window.removeEventListener("resize", updatePos);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const gallery = galleryRef.current;
      if (!section || !gallery) return;

      // 1. "Über uns" Editorial Header:
      gsap.fromTo(
        ".about-badge",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-editorial-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Statement Heading Scroll-Driven Reading Scrub:
      // Words start dim (20% opacity) and progressively illuminate into 100% solid navy as user scrolls!
      if (subheadingRef.current) {
        gsap.fromTo(
          ".subheading-word",
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: subheadingRef.current,
              start: "top 82%",
              end: "bottom 42%",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Kinetic Monumental Typography Line-Reveal in Gallery
      gsap.fromTo(
        ".gallery-hero-line",
        { y: "115%" },
        {
          y: "0%",
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".gallery-lime-pill",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          delay: 0.35,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".gallery-lime-text",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          delay: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Corner texts reveal (Top-Left & Bottom-Right)
      gsap.fromTo(
        [".gallery-corner-text-top", ".gallery-corner-text-bottom"],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ==============================================================
      // PINNED MASTER TIMELINE: Section stands still, cards glide UP over text and exit off top
      // ==============================================================
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: gallery,
          start: "top top",
          end: "+=2600",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      const floatCard = ({
        wrapperSelector,
        maskSelector,
        imageSelector,
        initialClipPath,
        finalClipPath,
        startTime,
        duration = 0.52,
      }: {
        wrapperSelector: string;
        maskSelector: string;
        imageSelector: string;
        initialClipPath: string;
        finalClipPath: string;
        startTime: number;
        duration?: number;
      }) => {
        const wrap = gallery.querySelector(wrapperSelector);
        const mask = gallery.querySelector(maskSelector);
        const img = gallery.querySelector(imageSelector);
        if (!wrap || !mask) return;

        const isCenter = wrapperSelector === ".card-wrapper-3";
        // 1. Float from beneath the bottom of the screen (115vh) all the way up and off the top (-135vh)
        pinTl.fromTo(
          wrap,
          { y: "115vh", ...(isCenter ? { xPercent: -50 } : {}) },
          { y: "-135vh", ...(isCenter ? { xPercent: -50 } : {}), duration, ease: "none" },
          startTime
        );

        // 2. Corner mask unmasking from bottom corner and opacity fade-in
        pinTl.fromTo(
          mask,
          { clipPath: initialClipPath, opacity: 0 },
          {
            clipPath: finalClipPath,
            opacity: 1,
            duration: duration * 0.36,
            ease: "power2.out",
          },
          startTime
        );

        // 3. Image parallax drift (moving inside the masked container)
        if (img) {
          pinTl.fromTo(
            img,
            { scale: 1.25, yPercent: -15 },
            { scale: 1.25, yPercent: 15, duration, ease: "none" },
            startTime
          );
        }
      };

      // Group 1: Card 1 (Left 3:4) & Card 2 (Right 1:1)
      floatCard({
        wrapperSelector: ".card-wrapper-1",
        maskSelector: ".card-mask-1",
        imageSelector: ".card-img-1",
        initialClipPath: "inset(100% 100% 0% 0% round 4px)",
        finalClipPath: "inset(0% 0% 0% 0% round 4px)",
        startTime: 0.05,
        duration: 0.52,
      });

      floatCard({
        wrapperSelector: ".card-wrapper-2",
        maskSelector: ".card-mask-2",
        imageSelector: ".card-img-2",
        initialClipPath: "inset(100% 0% 0% 100% round 4px)",
        finalClipPath: "inset(0% 0% 0% 0% round 4px)",
        startTime: 0.08,
        duration: 0.52,
      });

      // Group 2: Card 3 (Center 16:9) - floats right across the center over the headline
      floatCard({
        wrapperSelector: ".card-wrapper-3",
        maskSelector: ".card-mask-3",
        imageSelector: ".card-img-3",
        initialClipPath: "inset(100% 100% 0% 0% round 4px)",
        finalClipPath: "inset(0% 0% 0% 0% round 4px)",
        startTime: 0.28,
        duration: 0.54,
      });

      // Group 3: Card 4 (Left 1:1) & Card 5 (Right 3:4)
      floatCard({
        wrapperSelector: ".card-wrapper-4",
        maskSelector: ".card-mask-4",
        imageSelector: ".card-img-4",
        initialClipPath: "inset(100% 100% 0% 0% round 4px)",
        finalClipPath: "inset(0% 0% 0% 0% round 4px)",
        startTime: 0.44,
        duration: 0.52,
      });

      floatCard({
        wrapperSelector: ".card-wrapper-5",
        maskSelector: ".card-mask-5",
        imageSelector: ".card-img-5",
        initialClipPath: "inset(100% 0% 0% 100% round 4px)",
        finalClipPath: "inset(0% 0% 0% 0% round 4px)",
        startTime: 0.48,
        duration: 0.52,
      });

      // Reveal Heading for Features
      gsap.fromTo(
        ".about-features-heading",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-features-heading",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered Feature Columns Reveal
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

      // Numeric Stats Counter Animation
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
      desc: "Fachgerechter Trockenbau, Akustik- & Brandschutz, meisterhafte Q1–Q4 Spachtel- und Malerarbeiten sowie schlüsselfertige Komplettsanierungen für Wohnungen und Gewerbeobjekte in Chemnitz.",
    },
    {
      num: "02",
      icon: <Sparkles className="w-5 h-5 text-brand-navy" />,
      title: "Zertifizierte Gebäudereinigung",
      desc: "Hygienische Unterhaltsreinigung für Praxen und Büros, streifenfreie Glas- und Fensterreinigung sowie bezugsfertige Bauendreinigungen mit modernen Kärcher-Systemen und Umweltzertifikat.",
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
      className="relative z-10 w-full py-20 sm:py-24 lg:py-28 bg-brand-cream overflow-hidden"
    >
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Border ABOVE Über uns (Identical to border below Über uns) */}
        <div className="w-full border-t border-slate-200/60 pt-6 sm:pt-8 mb-6 sm:mb-8" />

        {/* ============================================================== */}
        {/* HAVENHUES EDITORIAL HEADER: Über uns (Left) + Subheading (Right) */}
        {/* ============================================================== */}
        <div className="about-editorial-header grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20 sm:mb-28">
          
          {/* Left Column: Clean Eyebrow Badge (HavenHues "About HavenHues" style) */}
          <div className="about-badge lg:col-span-4 pt-1 sm:pt-2 will-change-transform">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2">
              
              <span className="text-base sm:text-xl lg:text-[25px] font-medium text-brand-navy tracking-wide">
                Über uns
              </span>
            </div>
          </div>

          {/* Right Column: Statement with Scroll-driven Mask Reveal + CTA Button */}
          <div ref={subheadingWrapperRef} className="lg:col-span-8 about-subheading-wrapper">
            <h2
              ref={subheadingRef}
              id="about-heading"
              className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] leading-[1.26] tracking-tight font-medium text-brand-navy select-none"
            >
              {[
                "Tadiks",
                "Cleaning",
                "&",
                "Bau",
                "vereint",
                "meisterhaften",
                "Innenausbau",
                "und",
                "zertifizierte",
                "Gebäudereinigung",
                "in",
                "Chemnitz",
                "–",
                "für",
                "bezugsfertige",
                "Perfektion",
                "und",
                "dauerhaften",
                "Werterhalt",
                "nahtlos",
                "aus",
                "einer",
                "Hand.",
              ].map((word, idx, arr) => (
                <span
                  key={idx}
                  ref={idx === arr.length - 1 ? lastWordRef : undefined}
                  className="subheading-word inline-block will-change-transform opacity-20 mr-[0.26em]"
                >
                  {word}
                </span>
              ))}
            </h2>

            {/* CTA Button precisely aligned so its right edge ends at the word 'Hand.' */}
            <div
              className="mt-6 sm:mt-8 flex justify-end transition-[width] duration-150"
              style={{
                width: handRight ? `${handRight}px` : "auto",
                maxWidth: "100%",
              }}
            >
              <CtaButton href="/about" size="md">
                Unsere Geschichte entdecken
              </CtaButton>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* AWWWARDS PINNED GALLERY: Fixed text, cards glide UP over text   */}
        {/* ============================================================== */}
        <div
          ref={galleryRef}
          className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden border-t border-slate-200/60 my-16 sm:my-24"
        >
          {/* Pinned background / text stage: centered & fixed in place */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between py-8 sm:py-14 pointer-events-none select-none">
            
            {/* Corner Text: Top-Left */}
            <div className="px-4 sm:px-8 lg:px-12 flex justify-start">
              <div className="gallery-corner-text-top max-w-xs sm:max-w-sm text-xs sm:text-sm text-slate-500 font-normal leading-relaxed text-left pointer-events-auto">
                Präziser Innenausbau trifft auf vollendete Sauberkeit. Jedes Detail meisterhaft bedacht – von der ersten Trockenbauwand bis zur bezugsfertigen Perfektion.
              </div>
            </div>

            {/* Giant Monumental Headline in Center (3 Lines) */}
            <div className="gallery-typography-wrapper text-center my-auto px-4 relative z-10">
              <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.6rem] xl:text-[4.1rem] font-medium text-brand-navy tracking-tight leading-[1.08] select-none">
                {/* Line 1 */}
                <span className="block overflow-hidden whitespace-nowrap">
                  <span className="block gallery-hero-line translate-y-full will-change-transform">
                    Zwei Gewerke.
                  </span>
                </span>
                {/* Line 2 */}
                <span className="block overflow-hidden whitespace-nowrap pt-1.5 sm:pt-2.5">
                  <span className="block gallery-hero-line translate-y-full will-change-transform">
                    Ein meisterhafter
                  </span>
                </span>
                {/* Line 3 */}
                <span className="block overflow-hidden whitespace-nowrap pt-1.5 sm:pt-2.5">
                  <span className="block gallery-hero-line translate-y-full will-change-transform">
                    <span className="gallery-lime-pill inline-block bg-brand-lime px-3 sm:px-5 py-0.5 sm:py-1 rounded sm:rounded-md text-slate-900 origin-left scale-x-0 transform-gpu">
                      <span className="gallery-lime-text opacity-0">Qualitätsstandard</span>
                    </span>
                  </span>
                </span>
              </h3>
            </div>

            {/* Corner Text: Bottom-Right */}
            <div className="px-4 sm:px-8 lg:px-12 flex justify-end">
              <div className="gallery-corner-text-bottom max-w-xs sm:max-w-sm text-xs sm:text-sm text-slate-500 font-normal leading-relaxed text-left sm:text-right pointer-events-auto">
                Strukturierte Ästhetik & werterhaltende Pflege für anspruchsvolle Wohn- und Gewerbeobjekte in Chemnitz und ganz Sachsen.
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* 5 FLOATING PARALLAX IMAGES (z-30: glide OVER text and off-screen) */}
          {/* Pure clean photography — no text overlays, compact refined sizes */}
          {/* ============================================================== */}
          
          {/* Card 1: Left 3:4 */}
          <div
            className="card-wrapper-1 absolute left-0 sm:left-1 lg:left-2 xl:left-3 top-0 z-30 pointer-events-none will-change-transform"
          >
            <div
              className="card-mask-1 w-[210px] sm:w-[250px] lg:w-[280px] aspect-[3/4] rounded sm:rounded-md overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 opacity-0"
              style={{ clipPath: "inset(100% 100% 0% 0% round 4px)" }}
            >
              <Image
                src="/images/about_gallery_1.webp"
                alt="Meisterhafte Badsanierung und makellose Hygiene Chemnitz"
                fill
                quality={90}
                sizes="(max-width: 768px) 250px, 280px"
                className="card-img-1 object-cover object-center will-change-transform"
              />
            </div>
          </div>

          {/* Card 2: Right 1:1 */}
          <div
            className="card-wrapper-2 absolute right-0 sm:right-1 lg:right-2 xl:right-3 top-0 z-30 pointer-events-none will-change-transform"
          >
            <div
              className="card-mask-2 w-[180px] sm:w-[220px] lg:w-[250px] aspect-square rounded sm:rounded-md overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 opacity-0"
              style={{ clipPath: "inset(100% 0% 0% 100% round 4px)" }}
            >
              <Image
                src="/images/about_gallery_2.webp"
                alt="Architektonische Details und natürliche Ruhe"
                fill
                quality={90}
                sizes="(max-width: 768px) 220px, 250px"
                className="card-img-2 object-cover object-center will-change-transform"
              />
            </div>
          </div>

          {/* Card 3: Center 16:9 Wide Format (Clean photo, no text overlay) */}
          <div
            className="card-wrapper-3 absolute left-1/2 -translate-x-1/2 top-0 z-30 pointer-events-none will-change-transform"
          >
            <div
              className="card-mask-3 w-[340px] sm:w-[480px] lg:w-[600px] xl:w-[660px] aspect-[16/9] rounded sm:rounded-md overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 opacity-0"
              style={{ clipPath: "inset(100% 100% 0% 0% round 4px)" }}
            >
              <Image
                src="/images/about_gallery_3.webp"
                alt="Schlüsselfertige Sanierung und bezugsfertige Bauendreinigung in Chemnitz"
                fill
                quality={90}
                sizes="(max-width: 768px) 480px, 660px"
                className="card-img-3 object-cover object-center will-change-transform"
              />
            </div>
          </div>

          {/* Card 4: Left 1:1 */}
          <div
            className="card-wrapper-4 absolute left-1 sm:left-3 lg:left-5 xl:left-7 top-0 z-30 pointer-events-none will-change-transform"
          >
            <div
              className="card-mask-4 w-[180px] sm:w-[220px] lg:w-[250px] aspect-square rounded sm:rounded-md overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 opacity-0"
              style={{ clipPath: "inset(100% 100% 0% 0% round 4px)" }}
            >
              <Image
                src="/images/about_gallery_4.webp"
                alt="Präzises Bauhandwerk und Wasserwaagen-Justierung"
                fill
                quality={90}
                sizes="(max-width: 768px) 220px, 250px"
                className="card-img-4 object-cover object-center will-change-transform"
              />
            </div>
          </div>

          {/* Card 5: Right 3:4 */}
          <div
            className="card-wrapper-5 absolute right-1 sm:right-3 lg:right-5 xl:right-7 top-0 z-30 pointer-events-none will-change-transform"
          >
            <div
              className="card-mask-5 w-[210px] sm:w-[250px] lg:w-[280px] aspect-[3/4] rounded sm:rounded-md overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 opacity-0"
              style={{ clipPath: "inset(100% 0% 0% 100% round 4px)" }}
            >
              <Image
                src="/images/about_gallery_5.webp"
                alt="Streifenfreie Fenster- und Glasfassadenreinigung Chemnitz"
                fill
                quality={90}
                sizes="(max-width: 768px) 250px, 280px"
                className="card-img-5 object-cover object-center will-change-transform"
              />
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* 3 ARCHITECTURAL PILLARS (SEO RICH)                             */}
        {/* ============================================================== */}
        <div className="pt-16 sm:pt-20 border-t border-slate-300/80">
          
          <div className="mb-12">
            <h3 className="about-features-heading text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight">
              Unsere Kernbereiche für Chemnitz & Sachsen
            </h3>
          </div>

          {/* 3 Architectural Columns */}
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

                  <h4 className="text-xl font-bold text-brand-navy mb-3">
                    {feature.title}
                  </h4>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Minimalist Metric Counters */}
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

      </div>
    </section>
  );
}
