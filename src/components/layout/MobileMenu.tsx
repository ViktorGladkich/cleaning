"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CtaButton } from "@/components/ui/CtaButton";
import { ActiveUnderlineSvg } from "./Header";
import { MOBILE_NAV_LINKS } from "./navData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu — slide-down menu for mobile screens
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-3 bg-white rounded-[10px] p-5 space-y-3 border border-slate-100 shadow-lg">
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
              "block py-2 text-sm font-medium transition-colors",
              isLinkActive ? "text-brand-navy" : "text-brand-navy/80 hover:text-brand-navy"
            )}
          >
            <span className="relative inline-block">
              {link.label}
              {isLinkActive && <ActiveUnderlineSvg />}
            </span>
          </Link>
        );
      })}

      <div className="pt-2">
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
  );
}
