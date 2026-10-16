import { Metadata } from "next";
import { ReinigungPageContent } from "@/components/reinigung/ReinigungPageContent";

export const metadata: Metadata = {
  title: "Gebäudereinigung & Hygiene Chemnitz — Meisterbetrieb Tadiks",
  description:
    "Professionelle Unterhalts-, Glas-, Bau- und Spezialreinigung für Gewerbe und Privat in Chemnitz & Mittelsachsen. 100% Festpreisgarantie & höchste RKI-Hygienestandards.",
};

export default function ReinigungPage() {
  return <ReinigungPageContent />;
}
