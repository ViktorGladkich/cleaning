"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable native browser scroll restoration to prevent conflicts with Lenis
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard smooth easing
    });
    lenisRef.current = lenis;

    // 1. Hook Lenis scroll event to GSAP's ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Add Lenis's requestAnimationFrame to GSAP's ticker
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);

    // 3. Disable GSAP's lag smoothing to avoid conflicts with Lenis's own smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup to prevent memory leaks
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(update);
    };
  }, []);

  // When pathname changes, manage scroll position and refresh ScrollTrigger safely
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    if (hash) {
      const target = document.querySelector(hash);
      if (target && lenisRef.current) {
        lenisRef.current.scrollTo(target as HTMLElement, { offset: -80 });
      }
    } else {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }

    // Refresh ScrollTrigger after next tick so DOM layout of the new page is fully calculated
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Return children inside a Fragment (no DOM wrapper)
  // This ensures we never break CSS `position: sticky` on the page
  return <>{children}</>;
}
