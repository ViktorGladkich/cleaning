"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { STATS_DATA } from "./aboutData";

export function AboutStats() {
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
    { scope: statsRef }
  );

  return (
    <div
      ref={statsRef}
      className="pt-12 sm:pt-16 border-t border-slate-200/80"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {STATS_DATA.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
              <span
                className="stat-number"
                data-target={stat.target}
                data-suffix={stat.suffix}
                data-prefix={stat.prefix || ""}
              >
                0{stat.suffix}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-2">
              {stat.label}
            </span>
            <span className="text-xs text-slate-500 mt-0.5">
              {stat.sublabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
