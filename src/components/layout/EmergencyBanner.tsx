"use client";

import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Slim notice below the main navigation on the cleaning pages.
 * Slides away while scrolling down so it never covers content for long,
 * and returns as soon as the visitor scrolls up again.
 */
export function EmergencyBanner({ className }: { className?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 8) return;
      setHidden(y > 160 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="note"
      aria-label="Hinweis auf kurzfristige Reinigungseinsätze"
      className={cn(
        "mt-2 flex items-center justify-between gap-3 rounded-[10px] bg-brand-navy/95 pl-3.5 pr-1.5 py-1.5 text-white shadow-lg shadow-brand-navy/10 ring-1 ring-white/25 backdrop-blur-lg transition-[opacity,transform] duration-300",
        hidden && "pointer-events-none -translate-y-3 opacity-0",
        className
      )}
    >
      <p className="min-w-0 text-[12.5px] sm:text-sm leading-snug">
        <span className="font-medium text-brand-lime">Dringende Reinigung?</span>{" "}
        <span className="hidden sm:inline text-white/85">
          Kurzfristige Einsätze nach Verfügbarkeit.
        </span>
      </p>
      <a
        href={`tel:${COMPANY_INFO.phoneRaw}`}
        tabIndex={hidden ? -1 : undefined}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-brand-lime px-3 py-1.5 text-[12.5px] sm:text-[13px] font-medium text-brand-navy transition-colors hover:bg-white"
      >
        <Phone className="h-3.5 w-3.5" />
        Jetzt anrufen
      </a>
    </div>
  );
}
