import { Metadata } from "next";
import { BauPageContent } from "@/components/bau/BauPageContent";

export const metadata: Metadata = {
  title: "Bau & Sanierung Chemnitz — Meisterbetrieb Tadiks",
  description:
    "Präziser Trockenbau, Q1–Q4 Spachtelung, Akustikbau und schlüsselfertige Komplettsanierung in Chemnitz & Mittelsachsen. 100% Festpreisgarantie & VOB-Gewährleistung.",
};

export default function BauPage() {
  return <BauPageContent />;
}
