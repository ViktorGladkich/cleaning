"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Pages where the urgent-cleaning button is offered. */
function isCleaningPage(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "/reinigung" ||
    pathname === "/services" ||
    pathname.startsWith("/services/")
  );
}

/**
 * Vertical "Dringende Reinigung?" call tab on the right edge of the screen.
 * Fades in shortly after load and steps aside while the Notfall section
 * (which has its own call button) is on screen.
 */
export function EmergencyBanner() {
  const pathname = usePathname();
  const enabled = isCleaningPage(pathname);
  const [ready, setReady] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const timer = window.setTimeout(() => setReady(true), 1800);

    const section = document.getElementById("notfall");
    let observer: IntersectionObserver | undefined;
    if (section) {
      observer = new IntersectionObserver(
        ([entry]) => setSectionInView(entry.isIntersecting),
        { threshold: 0.15 }
      );
      observer.observe(section);
    }
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
      setReady(false);
      setSectionInView(false);
    };
  }, [enabled, pathname]);

  if (!enabled) return null;
  const visible = ready && !sectionInView;

  return (
    <a
      href={`tel:${COMPANY_INFO.phoneRaw}`}
      aria-label={`Dringende Reinigung? Jetzt anrufen: ${COMPANY_INFO.phone}`}
      tabIndex={visible ? undefined : -1}
      className={cn(
        // Vertical tab on the right edge, styled like the site's lime buttons
        "group fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-2.5 rounded-l-lg sm:rounded-l-xl border border-r-0 border-brand-lime/80 bg-brand-lime py-2 pl-1.5 pr-1.5 sm:py-2.5 sm:pl-2 sm:pr-1.5 text-brand-navy shadow-[0_10px_30px_-10px_rgba(26,37,68,0.35)] transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible
          ? "translate-x-0 opacity-100 hover:-translate-x-1"
          : "pointer-events-none translate-x-full opacity-0"
      )}
    >
      <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-[7px] bg-brand-navy text-brand-lime">
        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:rotate-12" />
      </span>
      {/* Reads bottom-to-top like a book spine */}
      <span className="rotate-180 [writing-mode:vertical-rl] whitespace-nowrap text-[13px] sm:text-[14.5px] font-medium tracking-tight">
        <span className="sm:hidden">Dringend? Anrufen</span>
        <span className="hidden sm:inline">Dringende Reinigung? Jetzt anrufen</span>
      </span>
    </a>
  );
}
