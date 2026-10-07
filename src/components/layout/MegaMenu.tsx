"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { RollingText } from "@/components/animations";
import { MEGA_MENU_SECTIONS } from "./navData";

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

/**
 * MegaMenu — floating white card capsule showing all secondary pages
 */
export function MegaMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const el = menuRef.current;
    const card = cardRef.current;
    if (!el) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!isOpen) {
        gsap.set(el, { height: 0, visibility: "hidden" });
        if (card) gsap.set(card, { y: -8 });
        return;
      }
    }

    gsap.killTweensOf(el);
    if (card) gsap.killTweensOf(card);

    if (isOpen) {
      // Keep opacity strictly at 1 so the browser GPU never drops/pops the backdrop-blur filter!
      gsap.set(el, { visibility: "visible" });
      gsap.fromTo(
        el,
        { height: 0 },
        { height: "auto", duration: 0.32, ease: "power2.out" }
      );
      if (card) {
        gsap.fromTo(
          card,
          { y: -8 },
          { y: 0, duration: 0.32, ease: "power2.out" }
        );
      }
    } else {
      if (card) {
        gsap.to(card, {
          y: -8,
          duration: 0.22,
          ease: "power2.in",
        });
      }
      gsap.to(el, {
        height: 0,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(el, { visibility: "hidden" });
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "hidden md:block w-full overflow-hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
      style={{ height: 0, visibility: "hidden" }}
    >
      <div className="pt-2 pb-3">
        <div
          ref={cardRef}
          className={cn(
            "w-full rounded-[10px] backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)] transform-gpu",
            "bg-white/70 border border-white/50",
            "shadow-lg shadow-brand-navy/5",
            "p-8 sm:p-9"
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 text-left items-stretch">
            {/* Columns 1 & 2: Reinigung & Bau */}
            {MEGA_MENU_SECTIONS.map((section) => (
              <div key={section.title} className="flex flex-col">
                <h4 className="font-semibold text-[17px] text-brand-navy mb-4 tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-3 text-[16px]">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="text-brand-navy/70 hover:text-brand-navy font-medium inline-flex items-center gap-1.5 py-0.5 transition-colors group"
                      >
                        <RollingText duplicateClassName="text-brand-navy">
                          {link.label}
                        </RollingText>
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-0.5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-brand-lime drop-shadow-[0_1px_1px_rgba(61,86,143,0.35)] shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Column 3: Featured Visual Image (Clean Picture) */}
            <Link
              href="/contacts"
              onClick={onClose}
              aria-label="Tadiks Bau & Reinigung Chemnitz"
              className="group relative block overflow-hidden rounded-lg border border-white/35 shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-white/60 hover:shadow-[0_8px_30px_rgba(26,119,237,0.25)] min-h-55 h-full"
            >
              <Image
                src="/images/megamenu_promo_optimized.png"
                alt="Tadiks Bau & Reinigung Chemnitz"
                fill
                sizes="(max-width: 1024px) 300px, 340px"
                className="object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
