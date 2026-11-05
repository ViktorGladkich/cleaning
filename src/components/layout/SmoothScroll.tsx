"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// The hash comes from the URL: querySelector would throw on values like "#123".
function findHashTarget(hash: string): HTMLElement | null {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

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
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Completely disable Lenis on mobile/tablet screens, touch devices and for reduced motion
      if (isMobileOrTouch || prefersReducedMotion) {
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
    };

    initOrCleanup();
    mediaQuery.addEventListener("change", initOrCleanup);

    let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    const handleResize = () => {
      // Ignore vertical height changes from mobile search bar collapse
      if (Math.abs(window.innerWidth - lastWidth) > 10) {
        lastWidth = window.innerWidth;
        initOrCleanup();
        // Rotation: wait for the locked heights to re-render before re-measuring.
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Accordions above a section change the page height; without a refresh its
    // animation would start at the old position, too early or too late.
    let heightTimer: ReturnType<typeof setTimeout> | undefined;
    let lastHeight = document.body.offsetHeight;
    const heightObserver = new ResizeObserver(() => {
      const height = document.body.offsetHeight;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      clearTimeout(heightTimer);
      heightTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    heightObserver.observe(document.body);

    return () => {
      heightObserver.disconnect();
      clearTimeout(heightTimer);
      mediaQuery.removeEventListener("change", initOrCleanup);
      window.removeEventListener("resize", handleResize);
      clearTimeout(refreshTimer);
      destroyLenis();
      gsap.ticker.remove(update);
    };
  }, []);

  // When pathname changes, manage scroll position and refresh ScrollTrigger safely
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    if (hash) {
      const target = findHashTarget(hash);
      if (target && lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -80 });
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
