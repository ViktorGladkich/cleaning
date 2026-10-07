"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { CtaButton } from "@/components/ui/CtaButton";
import { HeroVideoCard } from "./HeroVideoCard";

/**
 * Hero component with Fomic-style scroll interaction:
 * 1. As user scrolls down, header smoothly slides up out of view.
 * 2. Hero is pinned while a 5-column staircase curtain smoothly wipes down
 *    from top-right to bottom-left, creating the diagonal step transition.
 * 3. Reverses seamlessly when scrolling back to top.
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const wipeColsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wipeContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const heroCard = heroCardRef.current;
      const cols = wipeColsRef.current.filter(Boolean);
      const wipeContainer = wipeContainerRef.current;
      if (!container || !heroCard) return;

      // Awwwards / Framer-level Cinematic Entry Timeline
      const entryTl = gsap.timeline();
      
      // 1. 5-Column Staircase Curtain Reveal (staggered wipe to top revealing image like steps)
      if (cols.length > 0) {
        entryTl.to(
          cols,
          {
            scaleY: 0,
            duration: 1.05,
            stagger: 0.12,
            ease: "power3.inOut",
          },
          0
        );
        if (wipeContainer) {
          entryTl.set(wipeContainer, { display: "none" }, 1.6);
        }
      }

      // 2. Heading lines reveal smoothly as left columns open
      entryTl
        .fromTo(
          ".hero-heading-line",
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.35
        )
        // 3. Subtitle reveal
        .fromTo(
          ".hero-subtitle",
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
          },
          0.55
        )
        // 4. CTAs reveal
        .fromTo(
          ".hero-cta-inner",
          { y: "100%" },
          { y: "0%", duration: 0.75, stagger: 0.08, ease: "power3.out" },
          0.7
        )
        // 5. Video Card smooth entrance sliding in from bottom of screen
        // Opacity stays 1 so browser never disables backdrop-filter glass blur
        .fromTo(
          ".hero-video-wrapper",
          { y: 420 },
          {
            y: 0,
            duration: 1.15,
            ease: "power3.out",
            onStart: () => {
              const el = document.querySelector(".hero-video-wrapper");
              if (el) (el as HTMLElement).style.pointerEvents = "auto";
            },
          },
          0.85
        )
        // 6. Header slides down once on page entry and stays visible everywhere
        .fromTo(
          document.querySelector("header"),
          { y: -120 },
          { y: 0, duration: 0.85, ease: "expo.out" },
          0.85
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full bg-brand-cream">
      {/* Container wrapper: 10-14px margin on all edges so hero starts right under top header */}
      <div className="w-full p-2.5 sm:p-3.5">
        {/* Main Hero Card: full viewport height, zero shadow, header sits directly on top */}
        <div
          ref={heroCardRef}
          className="relative w-full h-[calc(100vh-20px)] sm:h-[calc(100vh-28px)] min-h-150 rounded-[10px] overflow-hidden bg-brand-cream"
        >
          {/* Background Cleaning Image with Full Frame Seating */}
          <div className="absolute inset-0 z-0 hero-image-container overflow-hidden rounded-[10px] origin-center">
            <Image
              src="/images/hero_cleaning_bg2.webp"
              alt="Tadiks Cleaning Chemnitz"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center hero-bg-image transform-gpu"
            />

            {/* Neutral Cinematic Dark Gradient (enclosed inside image container so no background bleed) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent z-10 pointer-events-none" />
          </div>

          {/* Hero Content (Heading, Description, CTAs) */}
          <div className="hero-content-wrapper relative z-20 flex flex-col justify-end h-full pt-32 sm:pt-36 pb-8 sm:pb-12 px-6 sm:px-10 lg:px-14 max-w-2xl">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-medium text-white tracking-tight leading-[1.1] mb-3 sm:mb-5 flex flex-col gap-1">
              <span className="overflow-hidden block">
                <span className="block hero-heading-line translate-y-full opacity-0 will-change-transform">
                  Reinigung &amp; Bau
                </span>
              </span>
              <span className="overflow-hidden block pt-1">
                <span className="block hero-heading-line translate-y-full opacity-0 will-change-transform">
                  Qualität bis ins Detail
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/85 text-sm sm:text-base lg:text-lg max-w-xl mb-6 sm:mb-8 leading-relaxed overflow-hidden">
              <span className="block hero-subtitle translate-y-full opacity-0 will-change-transform">
                Professionelle Gebäudereinigung sowie Bau- und Sanierungsarbeiten – zuverlässig, termintreu und präzise umgesetzt.
              </span>
            </p>

            {/* Actions: Primary CTA + Bau Entdecken */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-start">
              <div className="hero-cta overflow-hidden">
                <div className="hero-cta-inner translate-y-full">
                  <CtaButton href="/contacts" size="md">
                    Termin vereinbaren
                  </CtaButton>
                </div>
              </div>
              <div className="hero-cta overflow-hidden">
                <div className="hero-cta-inner translate-y-full">
                  <Link
                    href="/bau"
                    className="inline-flex items-center justify-center h-[42px] px-5 rounded-md text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] border border-white/25 hover:border-white/40 text-[15.5px] font-medium transition-colors duration-200 shadow-xs"
                  >
                    <span>Bau & Sanierung</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <HeroVideoCard />

          {/* 5-Column Staircase Curtain Reveal Overlay (matches Framer stepped reveal) */}
          <div
            ref={wipeContainerRef}
            className="absolute inset-0 z-30 pointer-events-none grid grid-cols-5 h-full w-full overflow-hidden"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                ref={(el) => {
                  wipeColsRef.current[i] = el;
                }}
                className="h-full w-[calc(100%+1px)] bg-brand-cream origin-top transform-gpu"
                style={{ transform: "scaleY(1)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
