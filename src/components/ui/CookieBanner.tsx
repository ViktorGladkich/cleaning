"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";

export interface CookiePreferences {
  essential: boolean;
  marketing: boolean;
  analytics: boolean;
  externalMedia: boolean;
}

const STORAGE_KEY = "tadiks_cookie_consent_v1";

export function CookieBanner() {
  const [isRendered, setIsRendered] = useState(false);
  const [isSlidIn, setIsSlidIn] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    marketing: false,
    analytics: false,
    externalMedia: false,
  });

  useEffect(() => {
    // Check if consent is already recorded
    let isAlreadySaved = false;
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        isAlreadySaved = true;
      }
    } catch {
      // localStorage unavailable (SSR / privacy mode)
    }

    // PageSpeed Optimization: Delay initial auto-banner display by 2.8s
    // ONLY if consent has not been recorded yet
    let timer: NodeJS.Timeout | undefined;
    if (!isAlreadySaved) {
      timer = setTimeout(() => {
        setIsRendered(true);
        // Wait for mount then trigger smooth slide-in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsSlidIn(true);
          });
        });
      }, 2800);
    }

    // Allow re-opening cookie settings anytime from footer
    const handleReopen = () => {
      // Refresh current saved preferences from localStorage if available
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setPreferences({
            essential: true,
            marketing: !!parsed.marketing,
            analytics: !!parsed.analytics,
            externalMedia: !!parsed.externalMedia,
          });
        }
      } catch {
        // fallback
      }

      setIsRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsSlidIn(true);
        });
      });
    };

    window.addEventListener("openCookieSettings", handleReopen);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("openCookieSettings", handleReopen);
    };
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...prefs,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {
      // localStorage write error fallback
    }
    // Smooth exit transition
    setIsSlidIn(false);
    setTimeout(() => {
      setIsRendered(false);
    }, 900);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      marketing: true,
      analytics: true,
      externalMedia: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const handleSaveSelection = () => {
    saveConsent(preferences);
  };

  const handleClose = () => {
    setIsSlidIn(false);
    setTimeout(() => {
      setIsRendered(false);
    }, 900);
  };

  const toggleCategory = (key: keyof Omit<CookiePreferences, "essential">) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isRendered) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie-Einstellungen"
      className={`fixed bottom-0 left-0 right-0 z-[9990] w-full bg-[#e6f47f] text-neutral-950 border-t border-black/10 shadow-[0_-10px_35px_rgba(0,0,0,0.18)] transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
        isSlidIn ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {/* Close button in top-right */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Schließen"
        className="absolute top-3 right-3 sm:top-5 sm:right-6 w-8 h-8 rounded-full flex items-center justify-center text-neutral-800 hover:text-black hover:bg-black/10 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-7 pr-12 sm:pr-14">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
          {/* Left Column: Heading, Legal explanation & Granular Categories */}
          <div className="flex-1 min-w-0 space-y-3.5">
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-950">
              Diese Website verwendet Cookies
            </h2>

            <p className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed max-w-3xl font-light">
              Wir verwenden Cookies, um die bestmögliche Erfahrung auf unserer Website zu gewährleisten. 
              Dies beinhaltet notwendige Cookies für die Seitenfunktionalität sowie Cookies für Webanalyse und Marketing, 
              um unser Angebot und Google-Dienste stetig zu optimieren. Sie können selbst entscheiden, welche Cookie-Kategorien 
              Sie zulassen möchten. Weitere Details finden Sie in unserer{" "}
              <Link
                href="/contacts#datenschutz"
                className="underline underline-offset-2 hover:text-black font-normal transition-colors"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>

            {/* Granular Cookie Selection matching reference screenshot with circular checkmarks */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 select-none">
              {/* 1. Essentiell (Immer aktiv) */}
              <label className="flex items-center gap-2.5 text-xs sm:text-[13px] text-neutral-900 cursor-not-allowed opacity-90 font-medium">
                <span className="w-4.5 h-4.5 rounded-full bg-neutral-950 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                </span>
                <span>Essenziell</span>
              </label>

              {/* 2. Marketing */}
              <label
                onClick={() => toggleCategory("marketing")}
                className="flex items-center gap-2.5 text-xs sm:text-[13px] text-neutral-900 cursor-pointer hover:opacity-80 transition-opacity font-medium"
              >
                <span
                  className={`w-4.5 h-4.5 rounded-full border-2 border-neutral-950 flex items-center justify-center shrink-0 transition-colors ${
                    preferences.marketing ? "bg-neutral-950" : "bg-transparent"
                  }`}
                >
                  {preferences.marketing && (
                    <span className="w-2 h-2 rounded-full bg-[#e6f47f]" />
                  )}
                </span>
                <span>Marketing</span>
              </label>

              {/* 3. Analytics */}
              <label
                onClick={() => toggleCategory("analytics")}
                className="flex items-center gap-2.5 text-xs sm:text-[13px] text-neutral-900 cursor-pointer hover:opacity-80 transition-opacity font-medium"
              >
                <span
                  className={`w-4.5 h-4.5 rounded-full border-2 border-neutral-950 flex items-center justify-center shrink-0 transition-colors ${
                    preferences.analytics ? "bg-neutral-950" : "bg-transparent"
                  }`}
                >
                  {preferences.analytics && (
                    <span className="w-2 h-2 rounded-full bg-[#e6f47f]" />
                  )}
                </span>
                <span>Analytics</span>
              </label>

              {/* 4. Externe Medien */}
              <label
                onClick={() => toggleCategory("externalMedia")}
                className="flex items-center gap-2.5 text-xs sm:text-[13px] text-neutral-900 cursor-pointer hover:opacity-80 transition-opacity font-medium"
              >
                <span
                  className={`w-4.5 h-4.5 rounded-full border-2 border-neutral-950 flex items-center justify-center shrink-0 transition-colors ${
                    preferences.externalMedia ? "bg-neutral-950" : "bg-transparent"
                  }`}
                >
                  {preferences.externalMedia && (
                    <span className="w-2 h-2 rounded-full bg-[#e6f47f]" />
                  )}
                </span>
                <span>Externe Medien</span>
              </label>
            </div>

            {/* Bottom-left Legal Links */}
            <div className="pt-1 flex items-center gap-4 text-[11px] text-neutral-700 font-light">
              <Link href="/contacts#datenschutz" className="hover:underline hover:text-black">
                Datenschutzerklärung
              </Link>
              <span>&middot;</span>
              <Link href="/contacts#impressum" className="hover:underline hover:text-black">
                Impressum
              </Link>
            </div>
          </div>

          {/* Right Column: Accept All & Save Selection (8px rounded buttons) */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 shrink-0 lg:min-w-48 justify-end">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="w-full text-center px-6 py-2.5 sm:py-3 bg-neutral-950 text-white rounded-[8px] text-xs sm:text-[13px] font-medium hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
            >
              Alle akzeptieren
            </button>

            <button
              type="button"
              onClick={handleSaveSelection}
              className="w-full text-center px-6 py-2.5 sm:py-3 bg-white text-neutral-950 border border-neutral-300 rounded-[8px] text-xs sm:text-[13px] font-medium hover:bg-neutral-100 transition-colors shadow-xs cursor-pointer"
            >
              Auswahl speichern
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
