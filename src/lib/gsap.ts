"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Prevents mobile address bar show/hide from triggering ScrollTrigger.refresh()
  // and jumping/jerking the page on iOS Safari and Google Chrome mobile
  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
  });
}

export { gsap, ScrollTrigger, useGSAP };
export default gsap;
