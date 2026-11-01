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
        gsap.set(card, {
          y: -12,
          opacity: 0,
          clipPath: "inset(0% 0% 100% 0% round 10px)",
        });
        gsap.set(labels, { yPercent: 115, rotate: 3 });
        gsap.set(indices, { x: -10, opacity: 0 });
        gsap.set(arrows, { x: -8, y: 8, scale: 0.6, opacity: 0 });
        gsap.set(dividers, { scaleX: 0, transformOrigin: "left center" });
        if (cta) gsap.set(cta, { y: 16, scale: 0.95, opacity: 0 });
        return;
      }
    }

    gsap.killTweensOf([wrapper, card, labels, indices, arrows, dividers, cta]);

    if (isOpen) {
      gsap.set(wrapper, { visibility: "visible" });

      const tl = gsap.timeline();

      // 1. Wrapper height & card curtain clip-path unfold
      tl.to(
        wrapper,
        {
          height: "auto",
          duration: 0.5,
          ease: "expo.out",
        },
        0
      )
        .fromTo(
          card,
          {
            y: -12,
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0% round 10px)",
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            duration: 0.48,
            ease: "expo.out",
            onComplete: () => {
              gsap.set(card, { clearProps: "clipPath" });
            },
          },
          0
        )
        // 2. Architectural horizontal dividers draw from left to right
        .fromTo(
          dividers,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.52,
            stagger: 0.045,
            ease: "expo.out",
          },
          0.08
        )
        // 3. Editorial numbers slide in
        .fromTo(
          indices,
          { x: -10, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.38,
            stagger: 0.045,
            ease: "power3.out",
          },
          0.1
        )
        // 4. Masked kinetic typography line reveal
        .fromTo(
          labels,
          { yPercent: 115, rotate: 3 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 0.52,
            stagger: 0.048,
            ease: "power4.out",
          },
          0.08
        )
        // 5. Diagonal arrow pop-in
        .fromTo(
          arrows,
          { x: -8, y: 8, scale: 0.6, opacity: 0 },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.42,
            stagger: 0.045,
            ease: "back.out(2)",
          },
          0.16
        );

      if (cta) {
        tl.fromTo(
          cta,
          { y: 16, scale: 0.95, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.46,
            ease: "back.out(1.5)",
          },
          0.26
        );
      }
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(wrapper, { visibility: "hidden" });
          setServicesOpen(false);
        },
      });

      if (cta) {
        tl.to(
          cta,
          {
            y: 8,
            scale: 0.96,
            opacity: 0,
            duration: 0.18,
            ease: "power2.in",
          },
          0
        );
      }

      tl.to(
        labels,
        {
          yPercent: -110,
          duration: 0.22,
          stagger: 0.02,
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
            transformOrigin: "right center",
            duration: 0.22,
            stagger: 0.02,
            ease: "power3.in",
          },
          0.02
        )
        .to(
          card,
          {
            y: -8,
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0% round 10px)",
            duration: 0.28,
            ease: "expo.inOut",
          },
          0.06
        )
        .to(
          wrapper,
          {
            height: 0,
            duration: 0.32,
            ease: "expo.inOut",
          },
          0.06
        );
    }
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
