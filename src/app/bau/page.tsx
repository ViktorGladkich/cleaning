import { Metadata } from "next";
import { ComingSoonPlaceholder } from "@/components/ui/ComingSoonPlaceholder";

export const metadata: Metadata = {
  title: "Bau & Sanierung — Tadiks Chemnitz",
  description:
    "Präzises Bauhandwerk, Trockenbau, Renovierung und schlüsselfertiger Innenausbau in Chemnitz.",
};

export default function BauPage() {
  return (
    <ComingSoonPlaceholder
      title="Bau, Trockenbau & Sanierung"
      subtitle="Unser detaillierter Leistungskatalog für Bauhandwerk, Akustikdecken, Trockenbau und Komplettsanierungen in Chemnitz und Mittelsachsen wird in Kürze freigeschaltet."
    />
  );
}
