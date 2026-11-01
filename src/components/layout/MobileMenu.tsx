"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { CtaButton } from "@/components/ui/CtaButton";
import { MOBILE_NAV_LINKS, MEGA_MENU_SECTIONS } from "./navData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu — Animated slide-down menu for mobile screens with staggered item choreography
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    const labels = card.querySelectorAll(".mobile-nav-label-inner");
    const indices = card.querySelectorAll(".mobile-nav-index");
    const arrows = card.querySelectorAll(".mobile-nav-arrow");
    const dividers = card.querySelectorAll(".mobile-nav-divider");
    const cta = card.querySelector(".mobile-nav-cta");

    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!isOpen) {
        gsap.set(wrapper, { height: 0, visibility: "hidden" });
        gsap.set(card, { y: -10, opacity: 0 });
        gsap.set(labels, { yPercent: 115, rotate: 3 });
        gsap.set(indices, { x: -10, opacity: 0 });
        gsap.set(arrows, { x: -8, y: 8, scale: 0.6, opacity: 0 });
        gsap.set(dividers, { scaleX: 0, transformOrigin: "left center" });
        if (cta) gsap.set(cta, { y: 14, scale: 0.96, opacity: 0 });
        return;
      }
    }

    if (tlRef.current) {
      tlRef.current.kill();
    }
    gsap.killTweensOf([wrapper, card, labels, indices, arrows, dividers, cta]);

    if (isOpen) {
      gsap.set(wrapper, { visibility: "visible" });
      gsap.set(dividers, { transformOrigin: "left center" });

      const tl = gsap.timeline();
      tlRef.current = tl;

      // 1. Wrapper height & card smooth reveal (wrapper overflow-hidden acts as clean curtain)
      tl.to(
        wrapper,
        {
          height: "auto",
          duration: 0.48,
          ease: "expo.out",
        },
        0
      )
        .to(
          card,
          {
            y: 0,
            opacity: 1,
            duration: 0.42,
            ease: "power3.out",
          },
          0
        )
        // 2. Architectural horizontal dividers draw from left to right
        .to(
          dividers,
          {
            scaleX: 1,
            duration: 0.48,
            stagger: 0.04,
            ease: "expo.out",
          },
          0.06
        )
        // 3. Editorial numbers slide in
        .to(
          indices,
          {
            x: 0,
            opacity: 1,
            duration: 0.36,
            stagger: 0.04,
            ease: "power3.out",
          },
          0.08
        )
        // 4. Masked kinetic typography line reveal
        .to(
          labels,
          {
            yPercent: 0,
            rotate: 0,
            duration: 0.48,
            stagger: 0.045,
            ease: "power4.out",
          },
          0.06
        )
        // 5. Diagonal arrow pop-in
        .to(
          arrows,
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: "back.out(2)",
          },
          0.14
        );

      if (cta) {
        tl.to(
          cta,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.42,
            ease: "back.out(1.5)",
          },
          0.22
        );
      }
    } else {
      gsap.set(dividers, { transformOrigin: "right center" });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(wrapper, { visibility: "hidden" });
          // Reset inner elements while hidden so next open always starts from clean baseline
          gsap.set(labels, { yPercent: 115, rotate: 3 });
          gsap.set(indices, { x: -10, opacity: 0 });
          gsap.set(arrows, { x: -8, y: 8, scale: 0.6, opacity: 0 });
          gsap.set(dividers, { scaleX: 0, transformOrigin: "left center" });
          if (cta) gsap.set(cta, { y: 14, scale: 0.96, opacity: 0 });
          setServicesOpen(false);
        },
      });
      tlRef.current = tl;

      if (cta) {
        tl.to(
          cta,
          {
            y: 8,
            scale: 0.96,
            opacity: 0,
            duration: 0.16,
            ease: "power2.in",
          },
          0
        );
      }

      tl.to(
        labels,
        {
          yPercent: -110,
          rotate: 0,
          duration: 0.2,
          stagger: 0.018,
          ease: "power3.in",
        },
        0
      )
        .to(
          [indices, arrows],
          {
            opacity: 0,
            duration: 0.16,
            stagger: 0.015,
            ease: "power2.in",
          },
          0
        )
        .to(
          dividers,
          {
            scaleX: 0,
            duration: 0.2,
            stagger: 0.018,
            ease: "power3.in",
          },
          0.02
        )
        .to(
          card,
          {
            y: -10,
            opacity: 0,
            duration: 0.24,
            ease: "power2.inOut",
          },
          0.05
        )
        .to(
          wrapper,
          {
            height: 0,
            duration: 0.28,
            ease: "expo.inOut",
          },
          0.05
        );
    }

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "md:hidden w-full overflow-hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
      style={{ height: 0, visibility: "hidden" }}
    >
      <div className="pt-3 pb-1">
        <div
          ref={cardRef}
          data-lenis-prevent
          className="bg-white/95 rounded-[10px] px-5 py-4 border border-slate-100/90 shadow-lg max-h-[calc(100svh-7.5rem)] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
        >
          {MOBILE_NAV_LINKS.map((link, idx) => {
            const isLinkActive =
              link.href === "/services"
                ? pathname === "/services" || pathname === "/reinigung" || pathname.startsWith("/services/")
                : link.href === "/bau"
                ? pathname === "/bau" || pathname.startsWith("/bau/")
                : pathname === link.href;

            return (
              <div key={link.href} className="mobile-nav-item">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center justify-between py-3 px-2 rounded-lg text-[15.5px] font-medium transition-colors duration-200",
                    isLinkActive
                      ? "text-brand-navy bg-brand-navy/5"
                      : "text-brand-navy/85 hover:text-brand-navy hover:bg-brand-navy/4"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="mobile-nav-index text-[11px] font-mono text-brand-navy/40 font-normal">
                      0{idx + 1}
                    </span>
                    <span className="block overflow-hidden py-0.5">
                      <span className="mobile-nav-label-inner block origin-left will-change-transform">
                        {link.label}
                      </span>
                    </span>
                  </span>
                  <span className="mobile-nav-arrow inline-flex items-center justify-center will-change-transform">
                    <ArrowUpRight
                      className={cn(
                        "w-4 h-4 transition-transform duration-250 ease-out shrink-0",
                        isLinkActive
                          ? "text-brand-navy"
                          : "text-brand-navy/55 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-navy"
                      )}
                    />
                  </span>
                </Link>
                <div className="mobile-nav-divider h-px w-full bg-brand-navy/8 will-change-transform" />
              </div>
            );
          })}

          {/* Expandable "Leistungen" Accordion matching Header */}
          <div className="mobile-nav-item">
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              className={cn(
                "w-full flex items-center justify-between py-3 px-2 rounded-lg text-[15.5px] font-medium transition-colors duration-200 cursor-pointer",
                servicesOpen
                  ? "text-brand-navy bg-brand-navy/5"
                  : "text-brand-navy/85 hover:text-brand-navy hover:bg-brand-navy/4"
              )}
            >
              <span className="flex items-center gap-3">
                <span className="mobile-nav-index text-[11px] font-mono text-brand-navy/40 font-normal">
                  0{MOBILE_NAV_LINKS.length + 1}
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span className="mobile-nav-label-inner block origin-left will-change-transform">
                    Leistungen
                  </span>
                </span>
              </span>
              <span className="mobile-nav-arrow inline-flex items-center justify-center will-change-transform">
                <ChevronDown
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform duration-300 text-brand-navy",
                    servicesOpen && "rotate-180"
                  )}
                />
              </span>
            </button>
            <div className="mobile-nav-divider h-px w-full bg-brand-navy/8 will-change-transform" />

            <div
              className="faq-accordion-grid"
              data-open={servicesOpen ? "true" : "false"}
            >
              <div className="faq-accordion-inner">
                <div className="pt-3 pb-1 px-2 space-y-4">
                  {MEGA_MENU_SECTIONS.map((section) => (
                    <div key={section.title} className="space-y-1.5">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-brand-navy/50 font-semibold px-2">
                        {section.title}
                      </p>
                      <div className="space-y-0.5">
                        {section.links.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            onClick={onClose}
                            className="flex items-center justify-between py-1.5 px-2 rounded-md text-[14px] text-brand-navy/75 hover:text-brand-navy hover:bg-brand-navy/4 transition-colors"
                          >
                            <span>{sublink.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-45 shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-nav-cta pt-3.5 will-change-transform">
            <CtaButton
              href="/contacts"
              onClick={onClose}
              size="md"
              className="w-full justify-between"
            >
              Termin vereinbaren
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}
