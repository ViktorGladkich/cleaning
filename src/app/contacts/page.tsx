import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactInfoList } from "@/components/contacts/ContactInfoList";
import { ContactForm } from "@/components/contacts/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt — Tadiks Cleaning & Bau Chemnitz",
  description:
    "Kontaktieren Sie uns für Ihr individuelles Angebot rund um Gebäudereinigung und Bauhandwerk in Chemnitz.",
};

export default function ContactsPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          badge="Kontakt & Anfahrt"
          title="Wir sind für Sie da in Chemnitz"
          subtitle="Fordern Sie unverbindlich Ihr persönliches Angebot an oder rufen Sie uns direkt an"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Persönliche Beratung vor Ort
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Unser Chemnitzer Kundenservice berät Sie gern unverbindlich. Gerne vereinbaren wir eine kostenlose Besichtigung bei Ihnen vor Ort für ein maßgeschneidertes Festpreisangebot.
              </p>
            </div>

            <ContactInfoList />
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
