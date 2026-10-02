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

  useGSAP(
    () => {
      const container = containerRef.current;
      const heroCard = heroCardRef.current;
      if (!container || !heroCard) return;

      // Awwwards-level Cinematic Entry Timeline
      const entryTl = gsap.timeline();
      
      // 1. Reveal image with dramatic clip-path and scale
      entryTl.to(".hero-image-container", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "power4.inOut"
      }, 0)
      .to(".hero-bg-image", {
        scale: 1,
        duration: 2.5,
        ease: "power3.out"
      }, 0)
      // 2. Staggered text lines (Heading)
      .to(".hero-heading-line", {
        y: "0%",
        opacity: 1,
        duration: 1.6,
        stagger: 0.2,
        ease: "power4.out"
      }, 0.6)
      // 2b. Pill background wipe (left → right)
      .fromTo(".hero-pill",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        1.0
      )
      .fromTo(".hero-pill-text",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        1.5
      )
      // 3. Subtitle reveal
      .to(".hero-subtitle", {
        y: "0%",
        opacity: 1,
        duration: 1.4,
        ease: "power4.out"
      }, 0.9)
      // 4. CTAs reveal (overflow-hidden + translateY to preserve backdrop-blur)
      .fromTo(".hero-cta-inner", 
        { y: "100%" }, 
        { y: "0%", duration: 1.0, stagger: 0.12, ease: "power3.out" }, 
        1.0
      )
      // 5. Video Card dramatic slide in (no opacity to preserve backdrop-blur)
      .fromTo(".hero-video-wrapper", 
        { scale: 0.85, y: 400, rotationZ: 4 },
        { scale: 1, y: 0, rotationZ: 0, duration: 1.6, ease: "expo.out" },
        1.2
      )
      // 6. Header slides down once on page entry and stays visible everywhere
      .fromTo(document.querySelector("header"),
        { y: -120 },
        { y: 0, duration: 1.2, ease: "expo.out" },
        1.5
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
          {/* Background Cleaning Image with Clip-Path Reveal */}
          <div className="absolute inset-0 z-0 hero-image-container" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
            <Image
              src="/images/hero_cleaning_bg1.jpg"
              alt="Tadiks Cleaning Chemnitz"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center hero-bg-image scale-[1.3] transform-gpu"
            />
          </div>

          {/* Cinematic Navy Gradient for High-Contrast Typography & Brand Harmony */}
          <div className="absolute inset-0 bg-linear-to-t from-brand-navy/90 via-brand-navy/50 to-brand-navy/20 z-10 pointer-events-none mix-blend-multiply" />

          {/* Hero Content (Heading, Description, CTAs) */}
          {/* Hero Content (Heading, Description, CTAs) */}
          <div className="hero-content-wrapper relative z-20 flex flex-col justify-end h-full pt-32 sm:pt-36 pb-8 sm:pb-12 px-6 sm:px-10 lg:px-14 max-w-2xl transform-gpu opacity-100">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-medium text-white tracking-tight leading-[1.1] mb-3 sm:mb-5 flex flex-col gap-1">
              <span className="overflow-hidden block">
                <span className="block hero-heading-line translate-y-full opacity-0 will-change-transform">Reinigung & Bau</span>
              </span>
              <span className="overflow-hidden block pt-1">
                <span className="block hero-heading-line translate-y-full opacity-0 will-change-transform">Qualität bis ins <span className="hero-pill inline-block bg-brand-lime px-3 rounded-lg ml-1 pb-1 pt-0.5 origin-left scale-x-0 transform-gpu"><span className="hero-pill-text text-black opacity-0">Detail</span></span></span>
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
                    className="inline-flex items-center justify-center h-[42px] px-5 rounded-md text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] transform-gpu border border-white/25 hover:border-white/40 text-[15.5px] font-medium transition-colors duration-200 shadow-xs"
                  >
                    <span>Bau & Sanierung</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <HeroVideoCard />
        </div>
      </div>
    </div>
  );
}
