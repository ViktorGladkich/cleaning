"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ServiceDetailData } from "@/data/serviceDetails";
import { gsap } from "@/lib/gsap";

interface ServiceScopeProps {
  service: ServiceDetailData;
}

export function ServiceScope({ service }: ServiceScopeProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        rootRef.current
          ?.querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((element) => {
            gsap.fromTo(
              element,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: element, start: "top 92%", once: true },
              }
            );
          });
      });
    },
    { scope: rootRef }
  );

  const terms = [
    { label: "Angebot", value: service.priceNote },
    { label: "Ablauf", value: service.durationNote },
    { label: "Antwort", value: "Innerhalb von 24 Stunden" },
  ];

  return (
    <section ref={rootRef} className="bg-brand-cream py-20 text-brand-ink sm:py-28">
      <div className="grid grid-cols-1 gap-6 px-(--pad) lg:grid-cols-12 lg:gap-8">
        <p data-reveal className="text-base text-brand-ink/75 lg:col-span-3 lg:pt-4">
          Leistungsumfang
        </p>
        <h2
          data-reveal
          className="text-3xl font-normal leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl hyphens-auto lg:col-span-9"
        >
          {service.featuresTitle}
        </h2>
      </div>

      <ol className="mt-12 border-b border-brand-ink/20 lg:mt-16">
        {service.features.map((feature, index) => (
          <li key={feature} className="group relative border-t border-brand-ink/20">
            {/* Same gesture as the hero: a wipe passing across the surface */}
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-brand-lime transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
            <div
              data-reveal
              className="relative grid grid-cols-[3rem_1fr] items-baseline gap-2 px-(--pad) py-5 lg:grid-cols-12 lg:gap-8"
            >
              <span className="text-base tabular-nums text-brand-ink/70 lg:col-span-3">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg leading-snug tracking-tight sm:text-xl lg:text-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 lg:col-span-9">
                {feature}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <dl className="mt-14 grid grid-cols-1 gap-8 px-(--pad) md:grid-cols-3 lg:mt-20">
        {terms.map((term) => (
          <div key={term.label} data-reveal>
            <dt className="text-base text-brand-ink/75">{term.label}</dt>
            <dd className="mt-3 text-lg leading-snug tracking-tight lg:text-xl">
              {term.value}
            </dd>
          </div>
        ))}
      </dl>

      <p
        data-reveal
        className="mt-10 max-w-[70ch] px-(--pad) text-sm leading-relaxed text-brand-ink/80 sm:text-base"
      >
        Private Auftraggeber können 20 % der ausgewiesenen Arbeitskosten nach § 35a EStG von der
        Einkommensteuer abziehen. Gewerbliche Kunden erhalten eine ordentliche Rechnung mit
        ausgewiesener Umsatzsteuer.
      </p>
    </section>
  );
}
