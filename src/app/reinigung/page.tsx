import { Metadata } from "next";
import { ComingSoonPlaceholder } from "@/components/ui/ComingSoonPlaceholder";

export const metadata: Metadata = {
  title: "Gebäudereinigung — Tadiks Chemnitz",
  description:
    "Professionelle Reinigungsdienste für Privat- und Gewerbeobjekte in Chemnitz.",
};

export default function ReinigungPage() {
  return (
    <ComingSoonPlaceholder
      title="Gebäudereinigung & Hygiene"
      subtitle="Alle Details zu Unterhalts-, Grund-, Fenster- und Baufeinreinigung in Chemnitz stehen in Kürze hier für Sie bereit."
    />
  );
}
