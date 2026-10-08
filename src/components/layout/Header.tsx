"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
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

  // Self-managed entrance animation: on homepage slide down smoothly; on all other pages ensure it's immediately visible
  useEffect(() => {
    if (!headerRef.current) return;
    if (pathname === "/") {
      gsap.fromTo(
        headerRef.current,
        { y: -120 },
        { y: 0, duration: 0.85, ease: "expo.out", delay: 0.85 }
      );
    } else {
      gsap.set(headerRef.current, { y: 0, clearProps: "transform" });
    }
  }, [pathname]);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      className="fixed top-6 sm:top-10 inset-x-0 mx-auto z-50 w-[calc(100%-2rem)] max-w-260 transform-gpu will-change-transform"
    >
      {/* Top Capsule: Frosted Glass Pill */}
      <nav
        aria-label="Hauptnavigation"
        className={cn(
          "w-full transition-colors duration-300",
          "rounded-[10px] backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)] transform-gpu",
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
              priority
              className="h-8.5 sm:h-10.5 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.05]"
            />
          </Link>

          {/* Desktop Nav Links (absolute-centered with generous breathing room) */}
          <div className="hidden md:flex items-center gap-3.5 lg:gap-5 absolute left-1/2 -translate-x-1/2 z-10">
            {MAIN_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "group inline-flex items-center text-[16.5px] transition-colors duration-150 py-1",
                    isActive ? "text-brand-navy font-bold" : "text-brand-navy font-medium hover:text-brand-navy"
                  )}
                >
                  <RollingText isActive={isActive} duplicateClassName="text-brand-navy">{link.label}</RollingText>
                </Link>
              );
            })}

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
                className="group inline-flex items-center gap-1.5 text-[15.5px] font-medium cursor-pointer transition-colors duration-150 py-1 text-brand-navy hover:text-brand-navy focus:outline-none"
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

          {/* Right Action: CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto z-10">
            <div className="hidden sm:block">
              <CtaButton href="/contacts" onClick={closeMenu} size="sm">
                Termin vereinbaren
              </CtaButton>
            </div>

            <div className="sm:hidden">
              <CtaButton
                href="/contacts"
                onClick={closeMenu}
                size="sm"
                iconOnly
                aria-label="Termin vereinbaren"
              />
            </div>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Menü"
              className="md:hidden p-2 rounded-xl text-brand-navy hover:bg-black/5 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
