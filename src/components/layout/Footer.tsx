"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
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
  { label: "Hotelreinigung", href: "/services/hotelreinigung" },
  { label: "Treppenhausreinigung", href: "/services/treppenhausreinigung" },
  { label: "Industrie- & Hallenreinigung", href: "/services/industrie-und-hallenreinigung" },
  { label: "Entrümpelungen", href: "/services/entruempelungen" },
];

const COL_BAU = [
  { label: "Übersicht Bauleistungen", href: "/bau" },
  {
    label: "Trockenbau & Innenausbau",
    href: "/bau/trockenbau-innenausbau",
  },
  { label: "Komplettsanierung", href: "/bau/renovierung-sanierung" },
  { label: "Abbruch & Entkernung", href: "/bau/abbruch-entkernung" },
];

const COL_CONNECT = [
  { label: "Anfragen & Beratung", href: "/contacts" },
  {
    label: COMPANY_INFO.email,
    href: `mailto:${COMPANY_INFO.email}`,
    isExternal: true,
  },
  {
    label: `Tel.: ${COMPANY_INFO.phone}`,
    href: `tel:${COMPANY_INFO.phoneRaw}`,
    isExternal: true,
  },
  {
    label: `Mobil: ${COMPANY_INFO.mobile}`,
    href: `tel:${COMPANY_INFO.mobileRaw}`,
    isExternal: true,
  },
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
    <span className="inline-flex items-center gap-1.5 py-1 text-[11px] xs:text-xs sm:text-[13px] font-medium tracking-wide max-w-full min-w-0 wrap-break-word">
      <span className="sm:hidden text-white/60 font-light leading-snug wrap-break-word min-w-0">
        {children}
      </span>
      <RollingText
        className="hidden sm:inline-block text-white/60 font-light max-w-full"
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
        className="group inline-block max-w-full focus:outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group inline-block max-w-full focus:outline-none"
    >
      {content}
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  // Guarantee footer is immediately and fully visible on any route change
  useEffect(() => {
    if (leftColRef.current && rightGridRef.current && bottomBarRef.current) {
      gsap.set(
        [
          leftColRef.current.children,
          rightGridRef.current.children,
          bottomBarRef.current,
        ],
        { opacity: 1, y: 0, filter: "none", clearProps: "all" },
      );
    }
  }, [pathname]);

  useGSAP(
    () => {
      // Only animate on the main homepage
      if (pathname !== "/" || !footerRef.current) {
        if (
          leftColRef.current &&
          rightGridRef.current &&
          bottomBarRef.current
        ) {
          gsap.set(
            [
              leftColRef.current.children,
              rightGridRef.current.children,
              bottomBarRef.current,
            ],
            { opacity: 1, y: 0, filter: "none", clearProps: "all" },
          );
        }
        return;
      }

      // 1. Left brand column entrance on homepage
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      }

      // 2. Right columns entrance on homepage
      if (rightGridRef.current) {
        gsap.fromTo(
          rightGridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightGridRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // 3. Bottom bar entrance on homepage
      if (bottomBarRef.current) {
        gsap.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 98%",
              once: true,
            },
          },
        );
      }
    },
    { scope: footerRef, dependencies: [pathname] },
  );

  return (
    <footer
      ref={footerRef}
      role="contentinfo"
      aria-label="Website-Fußbereich"
      className="relative z-20 w-full bg-[#0f182b] text-white pt-8 pb-12 sm:pb-16 border-t-0 overflow-x-clip"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Main Split: Brand Header + 4 Link Blocks in 2 Rows (grid-cols-2) on Mobile, 4 Columns on Desktop */}
        <div className="pt-6 pb-14 sm:pb-20 border-b border-white/10">
          {/* 4 Link Blocks: 2 rows of 2 columns on mobile, 4 columns on desktop */}
          <div
            ref={rightGridRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 xs:gap-x-6 sm:gap-x-10 lg:gap-x-12 xl:gap-x-16 gap-y-8 sm:gap-y-10"
          >
            {/* 1. ÜBERSICHT */}
            <div className="space-y-3.5 sm:space-y-4 min-w-0">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-medium">
                ÜBERSICHT
              </h4>
              <ul className="space-y-1.5 flex flex-col">
                {COL_INDEX.map((item, idx) => (
                  <li key={idx} className="min-w-0">
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. REINIGUNG */}
            <div className="space-y-3.5 sm:space-y-4 min-w-0">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-medium">
                REINIGUNG
              </h4>
              <ul className="space-y-1.5 flex flex-col">
                {COL_REINIGUNG.map((item, idx) => (
                  <li key={idx} className="min-w-0">
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. BAU & SANIERUNG */}
            <div className="space-y-3.5 sm:space-y-4 min-w-0">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-medium">
                BAU &amp; SANIERUNG
              </h4>
              <ul className="space-y-1.5 flex flex-col">
                {COL_BAU.map((item, idx) => (
                  <li key={idx} className="min-w-0">
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. KONTAKT & STANDORT */}
            <div className="space-y-3.5 sm:space-y-4 min-w-0">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-medium">
                KONTAKT &amp; STANDORT
              </h4>
              <ul className="space-y-1.5 flex flex-col">
                {COL_CONNECT.map((item, idx) => (
                  <li key={idx} className="min-w-0">
                    <FooterLink href={item.href} isExternal={item.isExternal}>
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sub-footer Bar */}
        <div
          ref={bottomBarRef}
          className="pt-8 flex flex-col md:grid md:grid-cols-3 items-center justify-between gap-4 text-xs text-white/70 font-light"
        >
          {/* Left: Copyright */}
          <p className="text-center md:text-left order-3 md:order-1">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Alle Rechte
            vorbehalten.
          </p>

          {/* Center: Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 order-1 md:order-2">
            <Link
              href="/impressum"
              className="hover:text-white transition-colors"
            >
              Impressum
            </Link>

            <Link
              href="/datenschutz"
              className="hover:text-white transition-colors"
            >
              Datenschutz
            </Link>
          </div>

          {/* Right: Created by Inverta */}
          <p className="text-center md:text-right order-2 md:order-3">
            Erstellt von{" "}
            <a
              href="https://invertadigital.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors underline underline-offset-4 decoration-white/25 hover:decoration-white font-medium"
            >
              Inverta Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
