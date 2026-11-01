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

    const items = card.querySelectorAll(".mobile-nav-item");
    const cta = card.querySelector(".mobile-nav-cta");

    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!isOpen) {
        gsap.set(wrapper, { height: 0, visibility: "hidden" });
        gsap.set(card, { y: -8, opacity: 0 });
        gsap.set(items, { y: 12, opacity: 0 });
        if (cta) gsap.set(cta, { y: 10, opacity: 0 });
        return;
      }
    }

    gsap.killTweensOf([wrapper, card, items, cta]);

    if (isOpen) {
      gsap.set(wrapper, { visibility: "visible" });
      gsap.to(wrapper, {
        height: "auto",
        duration: 0.42,
        ease: "expo.out",
      });
      gsap.fromTo(
        card,
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.32, ease: "power3.out" }
      );
      gsap.fromTo(
        items,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.38,
          stagger: 0.045,
          delay: 0.06,
          ease: "power3.out",
        }
      );
      if (cta) {
        gsap.fromTo(
          cta,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.38,
            delay: 0.06 + items.length * 0.04,
            ease: "power3.out",
          }
        );
      }
    } else {
      gsap.to([items, cta], {
        y: -6,
        opacity: 0,
        duration: 0.18,
        stagger: 0.015,
        ease: "power2.in",
      });
      gsap.to(card, {
        y: -6,
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
      });
      gsap.to(wrapper, {
        height: 0,
        duration: 0.28,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(wrapper, { visibility: "hidden" });
          setServicesOpen(false);
        },
      });
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
          className="bg-white/95 rounded-[10px] p-5 space-y-1.5 border border-slate-100/90 shadow-lg max-h-[calc(100svh-7.5rem)] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
        >
          {MOBILE_NAV_LINKS.map((link) => {
            const isLinkActive =
              link.href === "/services"
                ? pathname === "/services" || pathname === "/reinigung" || pathname.startsWith("/services/")
                : link.href === "/bau"
                ? pathname === "/bau" || pathname.startsWith("/bau/")
                : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "mobile-nav-item group flex items-center justify-between py-2.5 px-2 rounded-lg text-[15px] font-medium transition-colors duration-200",
                  isLinkActive
                    ? "text-brand-navy bg-brand-navy/5"
                    : "text-brand-navy/80 hover:text-brand-navy hover:bg-brand-navy/4"
                )}
              >
                <span>{link.label}</span>
                <ArrowUpRight
                  className={cn(
                    "w-4 h-4 transition-all duration-250 ease-out shrink-0",
                    isLinkActive
                      ? "opacity-100 text-brand-navy"
                      : "opacity-40 -translate-x-1 translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-brand-navy"
                  )}
                />
              </Link>
            );
          })}

          {/* Expandable "Leistungen" Accordion matching Header */}
          <div className="mobile-nav-item">
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              className={cn(
                "w-full flex items-center justify-between py-2.5 px-2 rounded-lg text-[15px] font-medium transition-colors duration-200 cursor-pointer",
                servicesOpen
                  ? "text-brand-navy bg-brand-navy/5"
                  : "text-brand-navy/80 hover:text-brand-navy hover:bg-brand-navy/4"
              )}
            >
              <span>Leistungen</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 shrink-0 transition-transform duration-300 text-brand-navy",
                  servicesOpen && "rotate-180"
                )}
              />
            </button>

            <div
              className="faq-accordion-grid"
              data-open={servicesOpen ? "true" : "false"}
            >
              <div className="faq-accordion-inner">
                <div className="pt-2 pb-1 px-2 space-y-4">
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

          <div className="mobile-nav-cta pt-3">
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
