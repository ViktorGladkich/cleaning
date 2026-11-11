import React from "react";
import { ServiceDetailData } from "@/data/serviceDetails";

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

    </section>
  );
}
