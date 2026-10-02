"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard smooth easing
    });

    // 1. Hook Lenis scroll event to GSAP's ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Add Lenis's requestAnimationFrame to GSAP's ticker
    // This is CRITICAL for preventing sticky element jitter and ScrollTrigger desync
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);

    // 3. Disable GSAP's lag smoothing to avoid conflicts with Lenis's own smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup to prevent memory leaks
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  // Return children inside a Fragment (no DOM wrapper)
  // This ensures we never break CSS `position: sticky` on the page
  return <>{children}</>;
}
