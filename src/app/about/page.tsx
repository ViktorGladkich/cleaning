import { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "Über uns & Meisterphilosophie — Tadiks Cleaning & Bau Chemnitz",
  description:
    "Erfahren Sie mehr über unseren Chemnitzer Meisterbetrieb: Meisterhaftes Bauhandwerk und zertifizierte Gebäudereinigung aus einer Hand mit 100% Festpreisgarantie.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
