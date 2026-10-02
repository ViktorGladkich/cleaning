import React from "react";
import {
  Layers,
  Home,
  Paintbrush,
  Ruler,
  HardHat,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CtaButton } from "@/components/ui/CtaButton";
import { BauServiceItem } from "@/data/bauServices";

const ICONS: Record<string, React.ElementType> = {
  Layers,
  Home,
  Paintbrush,
  Ruler,
  HardHat,
};

interface BauServiceCardProps {
  service: BauServiceItem;
}

export function BauServiceCard({ service }: BauServiceCardProps) {
  const Icon = ICONS[service.iconName] || Layers;

  return (
    <Card
      id={service.id}
      className="flex flex-col justify-between p-7 sm:p-8 hover:shadow-lg transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--color-brand-navy)] dark:bg-blue-950/60 dark:text-sky-400 flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
          {service.popular && <Badge variant="blue">Gefragt</Badge>}
        </div>

        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
          {service.shortDescription}
        </p>

        <div className="space-y-2 mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Leistungsumfang:
          </span>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-navy)] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5 mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Immer inklusive:
          </span>
          {service.included.map((inc, idx) => (
            <p
              key={idx}
              className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{inc}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <CtaButton
          href="/contacts"
          size="sm"
          className="w-full justify-between"
        >
          Angebot anfordern
        </CtaButton>
      </div>
    </Card>
  );
}
