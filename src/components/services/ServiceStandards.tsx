import React from "react";
import { ServiceDetailData } from "@/data/serviceDetails";

const BRANDS: Record<ServiceDetailData["category"], { name: string; role: string }[]> = {
  reinigung: [
    { name: "Kärcher Professional", role: "Industrie-Heißdampf & Scheuersaugmaschinen" },
    { name: "Unger HydroPower", role: "Reinstwasser-Osmose bis 20 m Höhe" },
    { name: "Kiehl Eco-Line", role: "Geprüfte, biologisch abbaubare Reinigungschemie" },
    { name: "Nilfisk HEPA-14", role: "Sicherheits-Entstaubung & Feinstaubfilterung" },
  ],
  bau: [
    { name: "Knauf & Rigips", role: "Normgerechte Schall- & Brandschutz-Systeme" },
    { name: "Festool Dust-Free", role: "HEPA-gekoppelte Schleif- & Sägetechnik" },
    { name: "Stabila Laser", role: "Rotationslaser für millimetergenaue Fluchten" },
    { name: "Saint-Gobain", role: "Markenbaustoffe für den Innenausbau" },
  ],
};

interface ServiceStandardsProps {
  service: ServiceDetailData;
}

export function ServiceStandards({ service }: ServiceStandardsProps) {
  return (
    <section className="bg-brand-lime py-20 text-brand-ink sm:py-28">
      <div className="grid grid-cols-1 gap-12 px-(--pad) lg:grid-cols-12 lg:gap-8">
        <h2 className="text-3xl font-normal leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl hyphens-auto lg:col-span-6">
          {service.includedTitle}
        </h2>

        <ul className="border-b border-brand-ink/25 lg:col-span-5 lg:col-start-8">
          {service.included.map((item) => (
            <li
              key={item}
              className="border-t border-brand-ink/25 py-4 text-base leading-snug sm:text-lg"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 px-(--pad) lg:mt-24">
        <p className="mb-6 text-base text-brand-ink/80">Maschinen &amp; Werkstoffe</p>
        <ul className="border-b border-brand-ink/25">
          {BRANDS[service.category].map((brand) => (
            <li
              key={brand.name}
              className="grid grid-cols-1 items-baseline gap-2 border-t border-brand-ink/25 py-4 sm:py-5 lg:grid-cols-12 lg:gap-8"
            >
              <span className="text-2xl font-normal leading-[1.15] tracking-tight sm:text-3xl lg:col-span-8 lg:text-4xl">
                {brand.name}
              </span>
              <span className="text-base leading-snug text-brand-ink/85 lg:col-span-4 lg:text-right">
                {brand.role}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
