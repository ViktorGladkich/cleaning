"use client";

import { useState, useEffect } from "react";

/**
 * Locks viewport height in exact pixels on mobile/touch devices.
 * 
 * Why this is necessary:
 * Standard browsers (Chrome, Safari) respect CSS `100svh` during scroll, but
 * In-App Browsers (e.g. the Google Search app, Instagram, Telegram, TikTok)
 * animate their search bar / navigation chrome by physically resizing the
 * underlying WebView window.
 * 
 * This causes `window.innerHeight`, `100svh`, and `100vh` to change on every scroll frame,
 * causing `object-cover` background images to continuously re-scale and jerk.
 * 
 * By locking the height in exact pixels on initial mount and ONLY updating when the
 * HORIZONTAL WIDTH changes (e.g. device rotation between portrait & landscape),
 * the container remains 100% rock-solid and motionless during any vertical scroll.
 */
export function useLockedHeroHeight(paddingY = 0): number | null {
  const [lockedHeight, setLockedHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lock = () => {
      // Only lock on mobile / tablet screens (< 640px)
      if (window.innerWidth < 640) {
        setLockedHeight(Math.round(window.innerHeight - paddingY));
      } else {
        setLockedHeight(null);
      }
    };

    lock();

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      // CRITICAL: Only recalculate if the WIDTH changed (device orientation rotate).
      // Ignore vertical height-only resize events triggered by in-app browser toolbars collapsing.
      if (Math.abs(window.innerWidth - lastWidth) > 10) {
        lastWidth = window.innerWidth;
        lock();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", lock, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", lock);
    };
  }, [paddingY]);

  return lockedHeight;
}

