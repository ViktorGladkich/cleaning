"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Clock, ShieldCheck } from "lucide-react";
import { NAV_ITEMS, COMPANY_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        onClick={toggle}
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[73px] z-50 bg-white/95 backdrop-blur-md dark:bg-neutral-950/95 flex flex-col p-6 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2">
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
                    "px-4 py-3 rounded-xl text-base font-medium transition",
                    isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 font-semibold"
                      : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{COMPANY_INFO.workingHours}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Застраховано до 5 000 000 ₽</span>
            </div>

            <Button
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Phone className="w-4 h-4" />}
            >
              {COMPANY_INFO.phone}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
