import { Metadata } from "next";
import { KarrierePageContent } from "@/components/karriere/KarrierePageContent";

export const metadata: Metadata = {
  title: "Karriere & Jobs — TADIK’S Cleaning & BAU Chemnitz",
  description:
    "Jobs in Reinigung und Bau in Chemnitz: Bewirb dich unkompliziert online bei TADIK’S Cleaning & BAU – mit Erfahrung oder als Quereinsteiger. Lebenslauf freiwillig.",
  alternates: { canonical: "/karriere" },
};

export default function KarrierePage() {
  return <KarrierePageContent />;
}
