"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { CtaButton } from "@/components/ui/CtaButton";

export function ClosingCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Smooth parallax on the architectural background image
      if (bgImgRef.current) {
        gsap.fromTo(
          bgImgRef.current,
          { yPercent: -8, scale: 1.05 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Centered content choreographed cinematic entrance
      if (contentRef.current) {
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 78%",
            once: true,
          },
        });

        ctaTl
          .fromTo(
            contentRef.current.children[0],
            { opacity: 0, y: 55, filter: "blur(10px)", scale: 0.96 },
            { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "power3.out" }
          )
          .fromTo(
            contentRef.current.children[1],
            { opacity: 0, y: 35, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            contentRef.current.children[2],
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.5)" },
            "-=0.5"
          );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact-cta"
      aria-labelledby="closing-cta-heading"
      className="relative z-10 w-full min-h-145 sm:min-h-165 lg:min-h-185 flex items-center justify-center overflow-hidden py-24 sm:py-32 bg-[#0f182b]"
    >
      {/* 1. Full-bleed Parallax Architectural Photo Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <div
          ref={bgImgRef}
          className="relative w-full h-[126%] top-[-13%] will-change-transform"
        >
          <Image
            src="/images/hero_premium_cleaning_bau.jpg"
            alt="Tadiks Meisterbetrieb für Bau, Sanierung & Reinigung"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* Ambient Top Light & Seamless Bottom Gradient into the Footer (#0f182b) */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/25 via-40% to-[#0f182b]" />
      </div>

      {/* 2. Centered Content Canvas */}
      <div
        ref={contentRef}
        className="w-full max-w-4xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center justify-center z-10"
      >
        {/* Centered Headline - Concise & Punchy */}
        <h2
          id="closing-cta-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12] text-center"
        >
          Bau &amp; Reinigung <br className="hidden sm:inline" />
          <span className="text-white/70">in Perfektion.</span>
        </h2>

        {/* Centered Subtitle - Concise & Punchy */}
        <p className="mt-5 sm:mt-7 text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed font-light max-w-xl mx-auto text-center">
          Trockenbau, Sanierung und Gebäudereinigung in Sachsen. Verbindliche Festpreise und meisterhafte Qualität aus einer Hand.
        </p>

        {/* Centered Signature CtaButton */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <CtaButton href="/contacts" size="lg">
            Kostenloses Angebot anfordern
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
