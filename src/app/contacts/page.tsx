import { Metadata } from "next";
import { ContactPageContent } from "@/components/contacts/ContactPageContent";

export const metadata: Metadata = {
  title: "Kontakt & Beratung — Tadiks Cleaning & Bau Chemnitz",
  description:
    "Kontaktieren Sie unseren Chemnitzer Fachbetrieb für ein kostenloses Vor-Ort-Aufmaß und verbindliches Festpreisangebot für Reinigung & Bauhandwerk.",
};

export default function ContactsPage() {
  return <ContactPageContent />;
}
