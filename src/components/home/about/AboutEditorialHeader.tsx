"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CtaButton } from "@/components/ui/CtaButton";
import { STATEMENT_WORDS } from "./aboutData";

export function AboutEditorialHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const subheadingWrapperRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const lastWordRef = useRef<HTMLSpanElement>(null);

  const [handRight, setHandRight] = useState<number | null>(null);

  useEffect(() => {
    let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;

    const updatePos = () => {
      if (lastWordRef.current && subheadingWrapperRef.current) {
        const wordRect = lastWordRef.current.getBoundingClientRect();
        const wrapperRect = subheadingWrapperRef.current.getBoundingClientRect();
        const right = wordRect.right - wrapperRect.left;
        if (right > 0) setHandRight(Math.round(right));
      }
    };

    const handleResize = () => {
      // Only recalculate when viewport width actually changes (avoids re-rendering during mobile URL bar scroll)
      if (typeof window !== "undefined" && window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        updatePos();
      }
    };

    updatePos();
    window.addEventListener("resize", handleResize);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updatePos);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      // 1. "Über uns" Eyebrow Badge Entrance
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
            once: true,
          },
        }
      );

      // 2. Statement Heading Scroll-Driven Reading Scrub:
      // Words start dim (20% opacity) and progressively illuminate into 100% solid navy as user scrolls
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
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full">
      {/* Top Border above Über uns */}
      <div className="w-full border-t border-slate-200/60 pt-6 sm:pt-8 mb-6 sm:mb-8" />

      {/* Editorial Header: Über uns (Left) + Subheading (Right) */}
      <div className="about-editorial-header grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20 sm:mb-28">
        
        {/* Left Column: Clean Eyebrow Badge */}
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
            {STATEMENT_WORDS.map((word, idx, arr) => (
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
    </div>
  );
}
