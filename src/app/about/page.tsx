import { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "Über uns — TADIK’S Cleaning & BAU Chemnitz",
  description:
    "TADIK’S Cleaning & BAU aus Chemnitz: Reinigung für Gewerbe und Privatkunden sowie Trockenbau, Rückbau und Renovierung – mit persönlichem Ansprechpartner.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
