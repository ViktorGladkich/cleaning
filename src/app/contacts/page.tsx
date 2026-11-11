import { Metadata } from "next";
import { ContactPageContent } from "@/components/contacts/ContactPageContent";

export const metadata: Metadata = {
  title: "Kontakt & Beratung — Tadiks Cleaning & Bau Chemnitz",
  description:
    "Kontakt zu TADIK’S Cleaning & BAU in Chemnitz: Anfrage für Reinigung, Bauprojekte oder dringende Reinigungseinsätze. Telefon 0371 23559475.",
};

export default function ContactsPage() {
  return <ContactPageContent />;
}
