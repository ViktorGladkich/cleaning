"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 1023px), (pointer: coarse)");

    const destroyLenis = () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };

    const update = (time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    };

    const initOrCleanup = () => {
      const isMobileOrTouch =
        mediaQuery.matches ||
        window.innerWidth < 1024 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;

      // Completely disable Lenis on mobile/tablet screens and touch devices
      if (isMobileOrTouch) {
        destroyLenis();
        gsap.ticker.remove(update);
        return;
      }

      if (lenisRef.current) return;

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
    };

    initOrCleanup();
    mediaQuery.addEventListener("change", initOrCleanup);
    window.addEventListener("resize", initOrCleanup);

    return () => {
      mediaQuery.removeEventListener("change", initOrCleanup);
      window.removeEventListener("resize", initOrCleanup);
      destroyLenis();
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

    // Refresh Lenis and ScrollTrigger after next tick so DOM layout of the new page is fully calculated
    const timer1 = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    }, 100);

    const timer2 = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);

  // Return children inside a Fragment (no DOM wrapper)
  // This ensures we never break CSS `position: sticky` on the page
  return <>{children}</>;
}
