import { Metadata } from "next";
import { ShieldCheck, Award, Users, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Über GlanzWerk Chemnitz — Qualität & Philosophie",
  description:
    "Erfahren Sie mehr über unseren Meisterbetrieb in Chemnitz, geschultes Personal, moderne Kärcher-Geräte und unsere 5 Mio. € Betriebshaftpflicht.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 space-y-20">
      <Container>
        <SectionHeading
          badge="Über uns"
          title="Ihr zuverlässiger Reinigungspartner in Chemnitz"
          subtitle="Professionelle Sauberkeit mit Hingabe, modernen Standards und regionaler Verwurzelung"
        />

        {/* Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <div className="space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Unsere Mission: Zeit für das Wesentliche
            </h3>
            <p>
              «{COMPANY_INFO.name}» steht für erstklassige Reinigungsdienstleistungen in Chemnitz und der umliegenden Region Südwestsachsen. Wir glauben, dass professionelle Reinigung auf Vertrauen, Diskretion und gleichbleibend hoher Qualität basiert.
            </p>
            <p>
              Jede unserer Reinigungskräfte durchläuft ein fundiertes Auswahlverfahren: polizeiliches Führungszeugnis, Schulungen im fachgerechten Umgang mit empfindlichen Oberflächen sowie Praxistage unter Aufsicht erfahrener Objektleiter.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-6">
              <div className="border-l-4 border-[#1a77ed] pl-4">
                <span className="text-3xl font-extrabold text-neutral-900 dark:text-white block">
                  7+ Jahre
                </span>
                <span className="text-xs text-neutral-500">
                  Erfahrung im Raum Chemnitz
                </span>
              </div>
              <div className="border-l-4 border-[#1a77ed] pl-4">
                <span className="text-3xl font-extrabold text-neutral-900 dark:text-white block">
                  2.400+
                </span>
                <span className="text-xs text-neutral-500">
                  Erfolgreich gereinigte Objekte
                </span>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-tr from-blue-50 to-sky-50 dark:from-neutral-900 dark:to-neutral-800/80 p-8 sm:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-700/60 space-y-6">
            <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
              Unsere 4 Grundsätze für Chemnitz:
            </h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <ShieldCheck className="w-6 h-6 text-[#1a77ed] shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-white text-sm">
                    5.000.000 € Haftpflichtschutz
                  </h5>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Volle finanzielle Absicherung bei versehentlichen Sachschäden.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Award className="w-6 h-6 text-[#1a77ed] shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-white text-sm">
                    Ökologische Markenmittel & Kärcher
                  </h5>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Schonend für Mensch, Tier und Material – ohne giftige Dämpfe.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-6 h-6 text-[#1a77ed] shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-white text-sm">
                    Festangestellte, geprüfte Fachkräfte
                  </h5>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Keine Subunternehmerketten: Feste Mitarbeiter mit fairen Löhnen.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <HeartHandshake className="w-6 h-6 text-[#1a77ed] shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-white text-sm">
                    Zufriedenheitsgarantie
                  </h5>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Zahlung erst nach erfolgter Prüfung und Ihrer vollen Zufriedenheit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button href="/contacts" size="lg">
            Jetzt kennenlernen & anfragen
          </Button>
        </div>
      </Container>
    </div>
  );
}
