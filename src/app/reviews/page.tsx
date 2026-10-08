import { Metadata } from "next";
import { ComingSoonPlaceholder } from "@/components/ui/ComingSoonPlaceholder";

export const metadata: Metadata = {
  title: "Kundenbewertungen & Referenzen — Tadiks Chemnitz",
  description:
    "Erfahrungsberichte und Referenzen unserer Chemnitzer Privat- und Geschäftskunden.",
};

export default function ReviewsPage() {
  return (
    <ComingSoonPlaceholder
      title="Kundenbewertungen & Referenzen"
      subtitle="Ausführliche Kundenstimmen, Projektberichte und verifizierte Google-Bewertungen aus Chemnitz und Mittelsachsen werden in Kürze hier veröffentlicht."
    />
  );
}
