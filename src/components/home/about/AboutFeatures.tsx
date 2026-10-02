"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { FEATURES_DATA } from "./aboutData";

export function AboutFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="pt-16 sm:pt-20 border-t border-slate-300/80">
      <div className="mb-12">
        <h3 className="about-features-heading text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight">
          Unsere Kernbereiche für Chemnitz & Sachsen
        </h3>
      </div>

      {/* 3 Architectural Columns */}
      <div className="about-features-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20 sm:mb-28">
        {FEATURES_DATA.map((feature, idx) => (
          <div
            key={idx}
            className="about-feature-col group pt-6 border-t border-slate-300/80 hover:border-brand-navy transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-brand-navy group-hover:text-white flex items-center justify-center transition-colors duration-300">
                  {React.isValidElement(feature.icon)
                    ? React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, {
                        className: "w-5 h-5 transition-colors duration-300 group-hover:text-brand-lime",
                      })
                    : feature.icon}
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
    </div>
  );
}
