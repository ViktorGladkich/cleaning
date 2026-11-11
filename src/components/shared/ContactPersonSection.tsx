"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CtaButton } from "@/components/ui/CtaButton";
import { COMPANY_INFO, SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ContactPersonSectionProps {
  id?: string;
  /** Where "Direkt Kontakt aufnehmen" leads; the contact page points it at its own form. */
  ctaHref?: string;
  className?: string;
}

const WEB_LABEL = SITE_URL.replace(/^https?:\/\//, "");

/** Owner and personal contact, kept identical on the home, about and contact pages. */
export function ContactPersonSection({
  id = "ansprechpartner",
  ctaHref = "/contacts#anfrage",
  className,
}: ContactPersonSectionProps) {
  const rootRef = useRef<HTMLElement>(null);

  const initials = COMPANY_INFO.owner
    .split(" ")
    .map((part) => part[0])
    .join("");

  const channels = [
    { label: "Telefon", value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phoneRaw}` },
    { label: "E-Mail", value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
    { label: "Web", value: WEB_LABEL, href: "/" },
  ];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.querySelectorAll("[data-fade]"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: root, start: "top 80%", once: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative z-10 w-full bg-brand-cream text-brand-navy py-16 sm:py-24 border-t border-brand-navy/10",
        className
      )}
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Statement */}
        <div className="lg:col-span-5">
          <span
            data-fade
            className="block text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/70"
          >
            Ihr Ansprechpartner
          </span>
          <h2
            id={`${id}-title`}
            data-fade
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15]"
          >
            Persönlich{" "}
            <span className="inline-block bg-brand-lime rounded-lg px-1.5">für Sie da.</span>
          </h2>
          <p
            data-fade
            className="mt-5 max-w-md text-sm sm:text-base text-brand-navy/70 leading-relaxed"
          >
            Ein direkter Ansprechpartner für Ihre Anfrage: Wir besprechen Ihren Bedarf, klären die
            Rahmenbedingungen und erstellen ein individuell abgestimmtes Angebot.
          </p>
        </div>

        {/* Person & channels */}
        <div className="lg:col-span-7">
          <div data-fade className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-medium tracking-wide text-brand-lime"
            >
              {initials}
            </span>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-medium tracking-tight">{COMPANY_INFO.owner}</p>
              <p className="text-sm text-brand-navy/60">
                Inhaber &amp; Ansprechpartner – TADIK’S Cleaning &amp; BAU
              </p>
            </div>
          </div>

          <ul data-fade className="mt-8 border-b border-brand-navy/15">
            {channels.map(({ label, value, href }) => (
              <li key={label} className="border-t border-brand-navy/15">
                <a
                  href={href}
                  className="group flex items-center gap-4 py-4 sm:py-5"
                >
                  <span className="w-16 sm:w-24 shrink-0 text-xs font-mono uppercase tracking-wider text-brand-navy/50">
                    {label}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-base sm:text-xl tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                    {value}
                  </span>
                  <ArrowUpRight className="h-4.5 w-4.5 shrink-0 text-brand-navy/40 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-navy" />
                </a>
              </li>
            ))}
          </ul>

          <div data-fade className="mt-8">
            <CtaButton href={ctaHref} size="md">
              Direkt Kontakt aufnehmen
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
