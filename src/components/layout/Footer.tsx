"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { RollingText } from "@/components/animations";
import { COMPANY_INFO } from "@/lib/constants";

const COL_INDEX = [
  { label: "Startseite", href: "/" },
  { label: "Über uns", href: "/about" },
  { label: "Reinigung", href: "/services" },
  { label: "Bau & Sanierung", href: "/bau" },
  { label: "Kontakt & Anfahrt", href: "/contacts" },
];

const COL_REINIGUNG = [
  { label: "Übersicht Reinigung", href: "/services" },
  { label: "Unterhaltsreinigung", href: "/services/unterhaltsreinigung" },
  { label: "Grundreinigung", href: "/services/grundreinigung" },
  { label: "Bauendreinigung", href: "/services/bauendreinigung" },
  { label: "Fenster- & Glasreinigung", href: "/services/fensterreinigung" },
  { label: "Büro- & Praxisreinigung", href: "/services/bueroreinigung" },
];

const COL_BAU = [
  { label: "Übersicht Bauleistungen", href: "/bau" },
  { label: "Trockenbau & Innenausbau", href: "/bau#trockenbau" },
  { label: "Komplettsanierung", href: "/bau#sanierung" },
  { label: "Maler- & Spachtelarbeiten", href: "/bau#malerarbeiten" },
  { label: "Bodenleger- & Fliesenarbeiten", href: "/bau#bodenleger" },
  { label: "Abbruch & Entkernung", href: "/bau#abbruch" },
];

const COL_CONNECT = [
  { label: "Anfragen & Beratung", href: "/contacts" },
  { label: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}`, isExternal: true },
  { label: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phoneRaw}`, isExternal: true },
  { label: COMPANY_INFO.address, href: "/contacts" },
];

/**
 * FooterLink — Kinetic text-swap link (RollingText) with 45-degree lime arrow on hover
 */
function FooterLink({
  href,
  children,
  isExternal,
}: {
  href: string;
  children: string;
  isExternal?: boolean;
}) {
  const content = (
    <span className="inline-flex items-center gap-1.5 py-1 text-xs sm:text-[13px] font-medium tracking-wide">
      <RollingText
        className="text-white/60 font-light"
        duplicateClassName="text-white font-medium"
        duration={0.38}
      >
        {children}
      </RollingText>
      <ArrowUpRight className="w-3.5 h-3.5 text-brand-lime transition-all duration-300 transform-gpu opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 shrink-0" />
    </span>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className="group inline-block focus:outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group inline-block focus:outline-none"
    >
      {content}
    </Link>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useGSAP(
    () => {
      if (!footerRef.current) return;

      // 1. Left brand column entrance
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 2. Right columns entrance
      if (rightGridRef.current) {
        gsap.fromTo(
          rightGridRef.current.children,
          { opacity: 0, y: 45, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightGridRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 3. Bottom bar entrance
      if (bottomBarRef.current) {
        gsap.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      role="contentinfo"
      aria-label="Website-Fußbereich"
      className="relative z-20 w-full bg-[#0f182b] text-white pt-8 pb-12 sm:pb-16"
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Main 12-Column Split with generous width for navigation columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 pt-6 pb-16 sm:pb-24 border-b border-white/10">
          {/* Left Column: Brand Logo + Direct Contact Links (4 cols) */}
          <div ref={leftColRef} className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <div className="space-y-6 max-w-sm">
              <Link href="/" className="inline-block group focus:outline-none">
                <Image
                  src="/TADIKS_LOGO.svg"
                  alt="Tadiks"
                  width={150}
                  height={40}
                  className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
                />
              </Link>

              {/* Direct Contact Links replacing the text */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 block font-medium">
                  KONTAKT &amp; STANDORT
                </span>
                <ul className="space-y-1.5 flex flex-col">
                  {COL_CONNECT.map((item, idx) => (
                    <li key={idx}>
                      <FooterLink href={item.href} isExternal={item.isExternal}>
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Columns: 3 Spacious Navigation Columns (8 cols) */}
          <div
            ref={rightGridRef}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-x-8 sm:gap-x-10 lg:gap-x-12 xl:gap-x-16 gap-y-10 pt-2"
          >
            {/* 1. ÜBERSICHT */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-medium">
                ÜBERSICHT
              </h4>
              <ul className="space-y-1.5 flex flex-col">
                {COL_INDEX.map((item, idx) => (
                  <li key={idx}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. REINIGUNG */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-medium">
                REINIGUNG
              </h4>
              <ul className="space-y-1.5 flex flex-col">
                {COL_REINIGUNG.map((item, idx) => (
                  <li key={idx}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. BAU & SANIERUNG */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-medium">
                BAU &amp; SANIERUNG
              </h4>
              <ul className="space-y-1.5 flex flex-col">
                {COL_BAU.map((item, idx) => (
                  <li key={idx}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sub-footer Bar */}
        <div
          ref={bottomBarRef}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-light"
        >
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Alle Rechte vorbehalten.</p>

          <div className="flex items-center gap-6">
            <Link href="/contacts#impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <span>&middot;</span>
            <Link href="/contacts#datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
            <span>&middot;</span>
            <Link href="/contacts#agb" className="hover:text-white transition-colors">
              AGB
            </Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-xs font-mono uppercase tracking-wider"
          >
            <span>Nach oben</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
