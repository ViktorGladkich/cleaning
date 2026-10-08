import { Metadata } from "next";
import { ComingSoonPlaceholder } from "@/components/ui/ComingSoonPlaceholder";

export const metadata: Metadata = {
  title: "Leistungen im Überblick — Tadiks Chemnitz",
  description:
    "Alle Reinigungs- und Baudienstleistungen von Tadiks Cleaning & Bau Chemnitz.",
};

export default function ServicesPage() {
  return (
    <ComingSoonPlaceholder
      title="Alle Leistungen im Überblick"
      subtitle="Unsere Leistungsübersichten für Gebäudereinigung und Bauhandwerk werden zurzeit mit maßgeschneiderten Paketen und Checklisten aktualisiert."
    />
  );
}
