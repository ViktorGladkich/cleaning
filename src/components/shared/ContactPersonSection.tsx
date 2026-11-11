import React from "react";
import { Phone, Mail, Globe } from "lucide-react";
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

/** Owner and personal contact, kept identical on the home and contact pages. */
export function ContactPersonSection({
  id = "ansprechpartner",
  ctaHref = "/contacts#anfrage",
  className,
}: ContactPersonSectionProps) {
  const initials = COMPANY_INFO.owner
    .split(" ")
    .map((part) => part[0])
    .join("");

  const channels = [
    {
      Icon: Phone,
      label: "Telefon",
      value: COMPANY_INFO.phone,
      href: `tel:${COMPANY_INFO.phoneRaw}`,
    },
    {
      Icon: Mail,
      label: "E-Mail",
      value: COMPANY_INFO.email,
      href: `mailto:${COMPANY_INFO.email}`,
    },
    { Icon: Globe, label: "Web", value: WEB_LABEL, href: "/" },
  ];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative z-10 w-full bg-brand-cream text-brand-navy py-16 sm:py-24 border-t border-brand-navy/10",
        className
      )}
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6">
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/80 block mb-4">
            Ihr Ansprechpartner
          </span>
          <h2
            id={`${id}-title`}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15]"
          >
            Persönlich{" "}
            <span className="inline-block bg-brand-lime rounded-lg px-1">für Sie da.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm sm:text-base text-brand-navy/75 leading-relaxed">
            Bei TADIK’S Cleaning haben Sie einen direkten Ansprechpartner für Ihre Anfrage. Wir
            besprechen Ihren Bedarf, klären die Rahmenbedingungen und erstellen ein individuell
            abgestimmtes Angebot.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-brand-navy/10 p-6 sm:p-8 shadow-lg shadow-brand-navy/5">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-brand-navy text-lg sm:text-xl font-medium tracking-wide text-brand-lime"
              >
                {initials}
              </span>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-medium tracking-tight">
                  {COMPANY_INFO.owner}
                </p>
                <p className="text-sm text-brand-navy/70">
                  Inhaber &amp; Ansprechpartner – TADIK’S Cleaning &amp; BAU
                </p>
              </div>
            </div>

            <ul className="mt-6 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
              {channels.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-3 py-3.5 text-sm sm:text-base"
                  >
                    <Icon className="w-4.5 h-4.5 shrink-0 text-brand-navy/70" />
                    <span className="w-16 shrink-0 text-xs font-mono uppercase tracking-wider text-brand-navy/50">
                      {label}
                    </span>
                    <span className="min-w-0 truncate font-medium group-hover:underline">
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <CtaButton href={ctaHref} size="md">
                Direkt Kontakt aufnehmen
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
