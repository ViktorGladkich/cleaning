import React from "react";
import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { COMPANY_INFO, NAV_ITEMS } from "@/lib/constants";
import { SERVICES } from "@/data/services";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-[var(--color-brand-navy)] to-sky-400 text-white shadow-xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-none">
                  Glanz<span className="text-[var(--color-brand-navy)]">Werk</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 mt-0.5">
                  Chemnitz
                </span>
              </div>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {COMPANY_INFO.tagline}. Höchste Sauberkeitsstandards, geschulte Fachkräfte und umweltschonende Reinigungsmittel.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-800 dark:text-blue-300 font-medium bg-blue-50/80 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-200/80 dark:border-blue-900/60">
              <ShieldCheck className="w-4 h-4 text-[var(--color-brand-navy)] shrink-0" />
              <span>Betriebshaftpflicht bis 5.000.000 € versichert</span>
            </div>
          </div>

          {/* Column 2: Popular Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
              Leistungen
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-neutral-600 hover:text-[var(--color-brand-navy)] dark:text-neutral-400 dark:hover:text-sky-400 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-600 hover:text-[var(--color-brand-navy)] dark:text-neutral-400 dark:hover:text-sky-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacts */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
              Kontakt & Büro
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[var(--color-brand-navy)] shrink-0 mt-0.5" />
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="hover:text-[var(--color-brand-navy)] dark:hover:text-sky-400 transition"
                >
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[var(--color-brand-navy)] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-[var(--color-brand-navy)] dark:hover:text-sky-400 transition"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[var(--color-brand-navy)] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.workingHours}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--color-brand-navy)] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name} Chemnitz. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:underline">
              Datenschutz
            </Link>
            <Link href="/terms" className="hover:underline">
              Impressum & AGB
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
