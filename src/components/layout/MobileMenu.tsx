"use client";

import React from "react";
import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { MOBILE_NAV_LINKS } from "./navData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu — slide-down menu for mobile screens
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-3 bg-white rounded-[10px] p-5 space-y-3 border border-slate-100 shadow-lg">
      {MOBILE_NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="block py-2 text-sm font-medium text-brand-navy"
        >
          {link.label}
        </Link>
      ))}

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
