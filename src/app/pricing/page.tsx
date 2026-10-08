import { Metadata } from "next";
import { ComingSoonPlaceholder } from "@/components/ui/ComingSoonPlaceholder";

export const metadata: Metadata = {
  title: "Preise & Tarife — Tadiks Chemnitz",
  description:
    "Transparente Festpreise für Gebäudereinigung und Bauleistungen in Chemnitz.",
};

export default function PricingPage() {
  return (
    <ComingSoonPlaceholder
      title="Transparente Festpreise & Tarife"
      subtitle="Unser digitaler Preisrechner und die standardisierten Festpreispakete für Chemnitz befinden sich aktuell im Feinschliff. Für ein schnelles individuelles Angebot rufen Sie uns einfach an."
    />
  );
}
