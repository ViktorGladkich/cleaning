"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, isTouchLayout } from "@/lib/gsap";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

export interface ClosingCtaSectionProps {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function ClosingCtaSection({
  id = "contact-cta",
  eyebrow,
  title,
  subtitle = "Reinigung, Trockenbau, Rückbau und Renovierung in Chemnitz und Umgebung. Schildern Sie uns Ihr Vorhaben – wir melden uns zur Abstimmung.",
  ctaText = "Jetzt anfragen",
  ctaHref = "/contacts",
  imageSrc = "/images/hero_premium_cleaning_bau.jpg",
  imageAlt = "Tadiks Fachbetrieb für Bau, Sanierung & Reinigung",
  className,
}: ClosingCtaSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Smooth parallax on the architectural background image
      if (bgImgRef.current && !isTouchLayout()) {
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

        const eyebrowEl = contentRef.current.querySelector(".cta-anim-eyebrow");
        if (eyebrowEl) {
          ctaTl.fromTo(
            eyebrowEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
          );
        }

        // Touch devices get opacity and movement only: animating blur and scale
        // on large text re-rasterises it every frame and stutters in mobile Safari.
        const touch = isTouchLayout();
        const soft = (blur: number, scale = 1) =>
          touch ? {} : { filter: `blur(${blur}px)`, ...(scale !== 1 ? { scale } : {}) };
        const sharp = (withScale = false) =>
          touch ? {} : { filter: "blur(0px)", ...(withScale ? { scale: 1 } : {}) };

        ctaTl
          .fromTo(
            ".cta-anim-title",
            { opacity: 0, y: touch ? 28 : 45, ...soft(10, 0.96) },
            { opacity: 1, y: 0, ...sharp(true), duration: touch ? 0.9 : 1.1, ease: "power3.out", clearProps: "filter" },
            eyebrowEl ? "-=0.4" : "0"
          )
          .fromTo(
            ".cta-anim-desc",
            { opacity: 0, y: touch ? 20 : 30, ...soft(6) },
            { opacity: 1, y: 0, ...sharp(), duration: touch ? 0.8 : 0.95, ease: "power3.out", clearProps: "filter" },
            "-=0.6"
          )
          .fromTo(
            ".cta-anim-actions",
            { opacity: 0, y: touch ? 16 : 25, ...(touch ? {} : { scale: 0.92 }) },
            { opacity: 1, y: 0, ...(touch ? {} : { scale: 1 }), duration: touch ? 0.7 : 0.85, ease: touch ? "power3.out" : "back.out(1.5)" },
            "-=0.5"
          );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative z-10 w-full min-h-145 sm:min-h-165 lg:min-h-185 flex items-center justify-center overflow-hidden py-24 sm:py-32 bg-[#0f182b]",
        className
      )}
    >
      {/* 1. Full-bleed Parallax Architectural Photo Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <div
          ref={bgImgRef}
          className="relative w-full h-[126%] top-[-13%] will-change-transform"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
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
        {eyebrow && (
          <span className="cta-anim-eyebrow text-xs sm:text-sm font-mono tracking-widest uppercase text-brand-lime block mb-4">
            {eyebrow}
          </span>
        )}

        {/* Centered Headline - Concise & Punchy */}
        <h2
          id={`${id}-heading`}
          className="cta-anim-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12] text-center"
        >
          {title || (
            <>
              Bau &amp; Reinigung <br className="hidden sm:inline" />
              <span className="text-white/70">in Perfektion.</span>
            </>
          )}
        </h2>

        {/* Centered Subtitle - Concise & Punchy */}
        <p className="cta-anim-desc mt-5 sm:mt-7 text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed font-light max-w-xl mx-auto text-center">
          {subtitle}
        </p>

        {/* Centered Action Button */}
        <div className="cta-anim-actions mt-8 sm:mt-12 flex items-center justify-center w-full">
          <CtaButton href={ctaHref} size="lg">
            {ctaText}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
