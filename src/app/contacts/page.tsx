import { Metadata } from "next";
import { ComingSoonPlaceholder } from "@/components/ui/ComingSoonPlaceholder";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt — Tadiks Cleaning & Bau Chemnitz",
  description:
    "Kontaktieren Sie uns für Ihr individuelles Angebot rund um Gebäudereinigung und Bauhandwerk in Chemnitz.",
};

export default function ContactsPage() {
  return (
    <ComingSoonPlaceholder
      title="Wir sind für Sie da in Chemnitz"
      subtitle="Das interaktive Kontaktformular und die Online-Terminbuchung werden zurzeit eingerichtet. Bitte kontaktieren Sie uns direkt telefonisch oder per E-Mail für eine unverbindliche Beratung oder Besichtigung vor Ort."
      showLegalAnchors={true}
    />
  );
}
