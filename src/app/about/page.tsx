import { Metadata } from "next";
import { ComingSoonPlaceholder } from "@/components/ui/ComingSoonPlaceholder";

export const metadata: Metadata = {
  title: "Über uns — Tadiks Cleaning & Bau Chemnitz",
  description:
    "Erfahren Sie mehr über unseren Meisterbetrieb in Chemnitz, unsere Philosophie und unser Team.",
};

export default function AboutPage() {
  return (
    <ComingSoonPlaceholder
      title="Über uns & Meisterphilosophie"
      subtitle="Wir bereiten ausführliche Einblicke in unsere Handwerksphilosophie, unser Chemnitzer Team und unsere Qualitätsstandards für Sie vor. Bis dahin stehen wir Ihnen telefonisch und per E-Mail gerne zur Verfügung."
    />
  );
}
