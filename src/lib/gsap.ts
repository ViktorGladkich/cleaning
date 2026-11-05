"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Prevents mobile address bar show/hide from triggering ScrollTrigger.refresh()
  // and jumping/jerking the page on iOS Safari, Chrome, and in-app WebViews
  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
    autoRefreshEvents: "DOMContentLoaded,load",
  });
}

/**
 * True where scrolling is native (no Lenis). Scroll-linked translations run on the
 * main thread and lag the compositor-driven scroll there, which reads as jitter.
 */
export function isTouchLayout(): boolean {
  return window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;
}

export { gsap, ScrollTrigger, useGSAP };
export default gsap;
