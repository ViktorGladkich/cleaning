"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { NAV_ITEMS, COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <div className="lg:hidden flex items-center">
      <button
        onClick={toggle}
        aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        className="p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-4 top-24 z-50 rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800 dark:bg-neutral-950/95 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition",
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 font-semibold"
                      : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 pt-5 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <Link
              href="/contacts"
              onClick={close}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-sm transition"
            >
              <span>Termin vereinbaren</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 pt-1">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{COMPANY_INFO.workingHours}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Haftpflichtversichert bis 5.000.000 €</span>
            </div>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 transition"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
