"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { RollingText } from "@/components/animations";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // GSAP animation for smooth expand & collapse
  useEffect(() => {
    const el = megaMenuRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    } else {
      gsap.killTweensOf(el);
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
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

  // Hover handler specifically for the "Alle Seiten" trigger button
  const handleTriggerEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleTriggerLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Hover handler for inside the dropdown card (only active when open)
  const handleMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMenuLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleOtherLinkHover = () => {
    if (isOpen) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsOpen(false);
    }
  };

  const closeMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-6 sm:top-10 inset-x-0 mx-auto z-50 w-[calc(100%-2rem)] max-w-[916px]"
    >
      {/* Outer Shell: Fixed dimensions and padding so no elements shift */}
      <nav
        aria-label="Hauptnavigation"
        className={cn(
          "w-full transition-colors duration-300",
          "rounded-[10px] backdrop-blur-[12px]",
          "bg-white/25",
          "border border-white/50",
          "shadow-[0px_0px_1px_1px_rgba(209,215,227,0.5),0_10px_30px_rgba(0,0,0,0.04)]",
          "p-2 sm:p-2"
        )}
      >
        {/* Top bar row: Constant height, left logo, locked center nav, right CTA */}
        <div className="relative flex items-center justify-between w-full h-[48px] px-1 sm:px-2">
          {/* Logo on the left */}
          <Link
            href="/"
            onClick={closeMenu}
            onMouseEnter={handleOtherLinkHover}
            className="flex items-center group focus:outline-none shrink-0 z-10"
            aria-label="Tadiks Cleaning Startseite"
          >
            <Image
              src="/TADIKS_LOGO.svg"
              alt="Tadiks Cleaning Logo"
              width={145}
              height={44}
              priority
              className="h-[34px] sm:h-[38px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop Nav Links in center (absolute-centered, zero layout shift) */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 absolute left-1/2 -translate-x-1/2 z-10">
            <Link
              href="/about"
              onClick={closeMenu}
              onMouseEnter={handleOtherLinkHover}
              className={cn(
                "text-[14px] font-medium transition-colors duration-150 py-1",
                pathname === "/about"
                  ? "text-[#1a77ed] font-semibold"
                  : "text-[#090909]"
              )}
            >
              <RollingText isActive={pathname === "/about"}>Über uns</RollingText>
            </Link>

            <Link
              href="/services"
              onClick={closeMenu}
              onMouseEnter={handleOtherLinkHover}
              className={cn(
                "text-[14px] font-medium transition-colors duration-150 py-1",
                pathname === "/services" || pathname.startsWith("/services/")
                  ? "text-[#1a77ed] font-semibold"
                  : "text-[#090909]"
              )}
            >
              <RollingText isActive={pathname === "/services" || pathname.startsWith("/services/")}>Leistungen</RollingText>
            </Link>

            <Link
              href="/contacts"
              onClick={closeMenu}
              onMouseEnter={handleOtherLinkHover}
              className={cn(
                "text-[14px] font-medium transition-colors duration-150 py-1",
                pathname === "/contacts"
                  ? "text-[#1a77ed] font-semibold"
                  : "text-[#090909]"
              )}
            >
              <RollingText isActive={pathname === "/contacts"}>Kontakt</RollingText>
            </Link>

            {/* All Pages Trigger: ONLY THIS OPENS THE MEGA MENU */}
            <div
              onMouseEnter={handleTriggerEnter}
              onMouseLeave={handleTriggerLeave}
              className="relative inline-flex items-center"
            >
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                className={cn(
                  "flex items-center gap-1.5 text-[14px] font-medium cursor-pointer transition-colors duration-200 focus:outline-none",
                  "px-3 py-1 rounded-[8px]",
                  isOpen
                    ? "bg-white text-[#1a77ed]"
                    : "bg-transparent text-[#090909] hover:text-[#1a77ed]"
                )}
              >
                <span>Alle Seiten</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 shrink-0 transition-transform duration-200",
                    isOpen
                      ? "rotate-180 text-[#1a77ed]"
                      : "text-neutral-600"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Right Action: Book An Appointment + Blue arrow box */}
          <div
            className="flex items-center gap-3 shrink-0 ml-auto z-10"
            onMouseEnter={handleOtherLinkHover}
          >
            <Link
              href="/contacts"
              onClick={closeMenu}
              className="group flex items-center gap-2.5 px-2 py-1 rounded-xl focus:outline-none select-none transition-colors"
            >
              <RollingText
                className="hidden sm:inline-flex text-[13.5px] font-medium text-[#090909]"
                duplicateClassName="text-[#1a77ed]"
              >
                Termin vereinbaren
              </RollingText>
              <div className="w-[34px] h-[34px] rounded-[10px] bg-[#1a77ed] text-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-hover:translate-x-0.5 shadow-xs">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Menü"
              className="md:hidden p-2 rounded-xl text-[#090909] hover:bg-black/5 transition"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-white rounded-[10px] p-5 space-y-3 border border-slate-100 shadow-lg">
            <Link
              href="/about"
              onClick={closeMenu}
              className="block py-2 text-sm font-medium text-[#090909]"
            >
              Über uns
            </Link>
            <Link
              href="/services"
              onClick={closeMenu}
              className="block py-2 text-sm font-medium text-[#090909]"
            >
              Leistungen
            </Link>
            <Link
              href="/pricing"
              onClick={closeMenu}
              className="block py-2 text-sm font-medium text-[#090909]"
            >
              Preise & Rechner
            </Link>
            <Link
              href="/reviews"
              onClick={closeMenu}
              className="block py-2 text-sm font-medium text-[#090909]"
            >
              Bewertungen
            </Link>
            <Link
              href="/contacts"
              onClick={closeMenu}
              className="block py-2 text-sm font-medium text-[#090909]"
            >
              Kontakt
            </Link>
            <div className="pt-2">
              <Link
                href="/contacts"
                onClick={closeMenu}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#1a77ed] text-white text-sm font-semibold"
              >
                <span>Termin vereinbaren</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Capsule 2: Separate Floating Card (Desktop Mega Menu) - Always pure white */}
      <div
        ref={megaMenuRef}
        onMouseEnter={handleMenuEnter}
        onMouseLeave={handleMenuLeave}
        className={cn(
          "hidden md:block w-full overflow-hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none h-0 opacity-0"
        )}
      >
        <div className="pt-2">
          <div className="w-full bg-white rounded-[10px] p-8 sm:p-9 border border-slate-200/80 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-3 gap-10 text-left">
            {/* Column 1: Unternehmen (Company) */}
            <div>
              <h4 className="font-semibold text-[17px] text-[#090909] mb-4">
                Unternehmen
              </h4>
              <ul className="space-y-3 text-[14.5px]">
                <li>
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Startseite</RollingText>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Über uns</RollingText>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Leistungen</RollingText>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reviews"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Bewertungen</RollingText>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Weitere Seiten (More Pages) */}
            <div>
              <h4 className="font-semibold text-[17px] text-[#090909] mb-4">
                Weitere Seiten
              </h4>
              <ul className="space-y-3 text-[14.5px]">
                <li>
                  <Link
                    href="/pricing"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Preise & Rechner</RollingText>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/unterhaltsreinigung"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Leistungsdetails</RollingText>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacts"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Termin vereinbaren</RollingText>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#team"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Unser Team (Chemnitz)</RollingText>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Rechtliches (Utility Pages) */}
            <div>
              <h4 className="font-semibold text-[17px] text-[#090909] mb-4">
                Rechtliches
              </h4>
              <ul className="space-y-3 text-[14.5px]">
                <li>
                  <Link
                    href="/404"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Fehlerseite 404</RollingText>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Datenschutz</RollingText>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    onClick={closeMenu}
                    className="text-[#444] block py-0.5"
                  >
                    <RollingText>Impressum & AGB</RollingText>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  );
}
