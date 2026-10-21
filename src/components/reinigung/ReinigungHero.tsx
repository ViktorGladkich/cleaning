"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export function ReinigungHero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      aria-label="Gebäudereinigung"
      className="relative z-10 w-full min-h-[75vh] sm:min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-brand-navy"
    >
      {/* 1. Full-bleed Background Image with crisp architectural depth */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero_reinigung_monumental.jpg"
          alt="Tadiks meisterhafte Gebäudereinigung und Werterhalt"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.02]"
        />
        {/* Cinematic dark tint overlay for crystal-clear readability while preserving warm architectural light */}
        <div className="absolute inset-0 bg-linear-to-b from-brand-navy/70 via-black/45 to-brand-navy/85 pointer-events-none" />
      </div>

      {/* 2. Centered Content: Title & Subtitle only */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20 sm:pt-40 sm:pb-28"
      >
        <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.05]">
          Gebäudereinigung <br />
          <span className="text-brand-lime font-light">nach Meister-Standard.</span>
        </h1>

        <p className="hero-subtitle mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
          RKI-konforme Hygienestandards, modernste Osmose-Technik und festes Stammpersonal
          für Gewerbe, Kanzleien, Praxen und anspruchsvolle Privathäuser.
        </p>
      </div>
    </section>
  );
}
