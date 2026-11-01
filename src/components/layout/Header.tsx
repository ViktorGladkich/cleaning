"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { RollingText } from "@/components/animations";
import { CtaButton } from "@/components/ui/CtaButton";
import { MAIN_NAV_LINKS } from "./navData";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

/**
 * Header — Primary navigation bar with frosted-glass pill styling,
 * center navigation, desktop mega menu card, and CTA button.
 */
export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const burgerTlRef = useRef<gsap.core.Timeline | null>(null);
  const burgerStageRef = useRef<HTMLSpanElement>(null);
  const topBarRef = useRef<HTMLSpanElement>(null);
  const midBarRef = useRef<HTMLSpanElement>(null);
  const botBarRef = useRef<HTMLSpanElement>(null);
  const isBurgerInitRef = useRef(true);

  // Multi-stage choreographed GSAP animation for Burger <-> Cross (X)
  // Avoids inline JSX transform styles so React re-renders never conflict with GSAP transform cache
  useEffect(() => {
    const stage = burgerStageRef.current;
    const top = topBarRef.current;
    const mid = midBarRef.current;
    const bot = botBarRef.current;
    if (!stage || !top || !mid || !bot) return;

    if (isBurgerInitRef.current) {
      isBurgerInitRef.current = false;
      gsap.set(stage, { rotate: 0, scale: 1 });
      gsap.set(top, { y: -6, rotate: 0, scaleX: 1 });
      gsap.set(mid, { y: 0, x: 0, scaleX: 1, opacity: 1 });
      gsap.set(bot, { y: 6, rotate: 0, scaleX: 1 });
      return;
    }

    if (burgerTlRef.current) {
      burgerTlRef.current.kill();
    }
    gsap.killTweensOf([stage, top, mid, bot]);

    const tl = gsap.timeline();
    burgerTlRef.current = tl;

    if (mobileMenuOpen) {
      // Stage 1: Middle bar shoots right & vanishes while top and bottom bars collapse to center
      tl.to(
        mid,
        {
          scaleX: 0,
          x: 8,
          opacity: 0,
          duration: 0.18,
          ease: "power3.in",
        },
        0
      )
        .to(
          [top, bot],
          {
            y: 0,
            rotate: 0,
            duration: 0.2,
            ease: "power3.inOut",
          },
          0
        )
        // Stage 2: Elastic 180deg spin while splitting into crisp 45deg / -45deg X
        .to(
          stage,
          {
            rotate: 180,
            duration: 0.46,
            ease: "back.out(1.7)",
          },
          0.16
        )
        .to(
          top,
          {
            rotate: 45,
            duration: 0.38,
            ease: "back.out(2)",
          },
          0.18
        )
        .to(
          bot,
          {
            rotate: -45,
            duration: 0.38,
            ease: "back.out(2)",
          },
          0.18
        );
    } else {
      // Stage 1: Unfold X back to flat horizontal line (0deg) while counter-rotating stage
      tl.to(
        [top, bot],
        {
          rotate: 0,
          duration: 0.2,
          ease: "power3.inOut",
        },
        0
      )
        .to(
          stage,
          {
            rotate: 0,
            duration: 0.42,
            ease: "expo.out",
          },
          0.02
        )
        // Stage 2: Split top & bottom bars outward with spring overshoot and slide asymmetric middle bar in
        .to(
          top,
          {
            y: -6,
            duration: 0.34,
            ease: "back.out(2.1)",
          },
          0.18
        )
        .to(
          bot,
          {
            y: 6,
            duration: 0.34,
            ease: "back.out(2.1)",
          },
          0.18
        )
        .to(
          mid,
          {
            scaleX: 1,
            x: 0,
            opacity: 1,
            duration: 0.32,
            ease: "back.out(1.8)",
          },
          0.2
        );
    }

    return () => {
      tl.kill();
    };
  }, [mobileMenuOpen]);

  // Self-managed entrance animation: on homepage slide down smoothly; on all other pages ensure it's immediately visible
  useEffect(() => {
    if (!headerRef.current) return;
    if (pathname === "/") {
      gsap.fromTo(
        headerRef.current,
        { y: -120 },
        {
          y: 0,
          duration: 0.85,
          ease: "expo.out",
          delay: 0.85,
          onComplete: () => {
            if (headerRef.current) {
              gsap.set(headerRef.current, { clearProps: "transform" });
            }
          },
        }
      );
    } else {
      gsap.set(headerRef.current, { clearProps: "transform" });
    }
  }, [pathname]);

  // Lock page scroll when mobile menu is open (standard UX best practice)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menus on outside click or browser back/forward navigation
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setMobileMenuOpen(false);
      }
    }
    function handlePopState() {
      setIsOpen(false);
      setMobileMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("popstate", handlePopState);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Hover handlers for the "Alle Seiten" trigger
  const handleTriggerEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleTriggerLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  // Hover handlers for inside the mega-menu dropdown
  const handleMenuEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMenuLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const closeMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-6 sm:top-10 inset-x-0 mx-auto z-50 w-[calc(100%-2rem)] max-w-260"
    >
      {/* Top Capsule: Frosted Glass Pill */}
      <nav
        aria-label="Hauptnavigation"
        className={cn(
          "w-full transition-colors duration-300",
          "rounded-[10px] backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)]",
          "bg-white/70 border border-white/50",
          "shadow-lg shadow-brand-navy/5",
          "p-2 sm:p-2"
        )}
      >
        <div className="relative flex items-center justify-between w-full h-12 px-2 sm:px-3">
          {/* Logo on the left */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center group focus:outline-none shrink-0 z-10"
            aria-label="Tadiks Cleaning Startseite"
          >
            <Image
              src="/TADIKS_LOGO_COLOR.svg"
              alt="Tadiks Cleaning Logo"
              width={145}
              height={44}
              loading="eager"
              className="h-8.5 lg:h-10.5 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.05]"
            />
          </Link>

          {/* Desktop Nav Links (flex-centered between logo & CTA on tablet md, absolute-centered on lg+) */}
          <div className="hidden md:flex items-center md:gap-3 lg:gap-5 mx-auto lg:mx-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-10 whitespace-nowrap">
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="group relative inline-flex items-center text-[14.5px] lg:text-[16px] font-medium text-brand-navy hover:text-brand-navy transition-colors duration-150 py-1"
              >
                <RollingText duplicateClassName="text-brand-navy">{link.label}</RollingText>
              </Link>
            ))}

            {/* "Leistungen" Dropdown Trigger */}
            <div
              onMouseEnter={handleTriggerEnter}
              onMouseLeave={handleTriggerLeave}
              className="relative inline-flex items-center"
            >
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                className="group inline-flex items-center gap-1 lg:gap-1.5 text-[14.5px] lg:text-[15.5px] font-medium cursor-pointer transition-colors duration-150 py-1 text-brand-navy hover:text-brand-navy focus:outline-none"
              >
                <RollingText duplicateClassName="text-brand-navy">Leistungen</RollingText>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 shrink-0 transition-all duration-300 text-brand-navy group-hover:text-brand-navy translate-y-px",
                    isOpen && "rotate-180 text-brand-navy"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Right Action: CTA Button on Desktop + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto lg:ml-0 z-10">
            <div className="hidden md:block">
              <CtaButton href="/contacts" onClick={closeMenu} size="sm">
                Termin vereinbaren
              </CtaButton>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-brand-navy bg-transparent cursor-pointer focus:outline-none select-none"
            >
              <span
                ref={burgerStageRef}
                className="relative w-6 h-6 flex items-center justify-center will-change-transform"
              >
                {/* Top bar */}
                <span
                  ref={topBarRef}
                  className="absolute left-px h-[1.8px] w-5.5 bg-current rounded-full origin-center will-change-transform"
                />
                {/* Middle asymmetric bar aligned to right edge via CSS right-px */}
                <span
                  ref={midBarRef}
                  className="absolute right-px h-[1.8px] w-3.75 bg-current rounded-full origin-right will-change-transform"
                />
                {/* Bottom bar */}
                <span
                  ref={botBarRef}
                  className="absolute left-px h-[1.8px] w-5.5 bg-current rounded-full origin-center will-change-transform"
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <MobileMenu isOpen={mobileMenuOpen} onClose={closeMenu} />
      </nav>

      {/* Floating Mega Menu Capsule */}
      <MegaMenu
        isOpen={isOpen}
        onMouseEnter={handleMenuEnter}
        onMouseLeave={handleMenuLeave}
        onClose={closeMenu}
      />
    </header>
  );
}
