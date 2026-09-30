"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Phone } from "lucide-react";
import { NAV_ITEMS, COMPANY_INFO } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/80 transition-colors">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-none">
                {COMPANY_INFO.name}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                Клининговый сервис
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 font-semibold"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col text-right">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              >
                {COMPANY_INFO.phone}
              </a>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {COMPANY_INFO.workingHours}
              </span>
            </div>

            <Button
              href="/contacts"
              variant="primary"
              size="md"
              icon={<Phone className="w-4 h-4" />}
            >
              Заказать уборку
            </Button>
          </div>

          {/* Mobile menu */}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
