import { Metadata } from "next";
import { ReinigungPageContent } from "@/components/reinigung/ReinigungPageContent";

export const metadata: Metadata = {
  title: "Reinigung in Chemnitz & Umgebung — TADIK’S Cleaning",
  description:
    "Büro-, Hotel-, Glas-, Grund-, Bauend-, Treppenhaus-, Praxis-, Haushalts- sowie Fassaden- & Außenreinigung für Gewerbe und Privatkunden in Chemnitz und Umgebung.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ReinigungPageContent />;
}
