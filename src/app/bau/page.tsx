import { Metadata } from "next";
import { BauPageContent } from "@/components/bau/BauPageContent";

export const metadata: Metadata = {
  title: "TADIK’S BAU — Trockenbau, Rückbau & Bauleistungen in Chemnitz",
  description:
    "TADIK’S BAU in Chemnitz: Trockenbau & Innenausbau, Abbruch, Rückbau & Entkernung, Renovierung & Sanierungsprojekte sowie Entrümpelung & Baustellenberäumung. Bauprojekt jetzt anfragen.",
};

export default function BauPage() {
  return <BauPageContent />;
}
