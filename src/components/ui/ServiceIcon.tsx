import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Hammer,
  Maximize2,
  Armchair,
  Building2,
  LucideIcon,
} from "lucide-react";

interface ServiceIconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  ShieldCheck,
  Hammer,
  Maximize2,
  Armchair,
  Building2,
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent className={className} />;
}
