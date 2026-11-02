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

export { gsap, ScrollTrigger, useGSAP };
export default gsap;
