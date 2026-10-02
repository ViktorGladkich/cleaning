import { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import { BAU_SERVICES } from "@/data/bauServices";
import { BauServiceCard } from "@/components/bau/BauServiceCard";
import { BauProcessSteps } from "@/components/bau/BauProcessSteps";

export const metadata: Metadata = {
  title: "Bau & Sanierung in Chemnitz — Trockenbau, Renovierung & Innenausbau",
  description:
    "Professionelle Baudienstleistungen in Chemnitz: Trockenbau, Renovierung, Malerarbeiten, Bodenlegerarbeiten und Entkernung. Alles aus einer Hand inklusive Bauendreinigung.",
};

export default function BauPage() {
  return (
    <div className="py-12 sm:py-16 space-y-20">
      <Container>
        {/* Page Heading */}
        <SectionHeading
          badge="Baudienstleistungen Chemnitz"
          title="Präzises Bauhandwerk, Sanierung & Innenausbau"
          subtitle="Von Trockenbauwänden und Akustikdecken über Maler- und Bodenarbeiten bis zur schlüsselfertigen Komplettrenovierung."
        />

        {/* Unique Value Proposition: Alles aus einer Hand */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-linear-to-r from-blue-500/10 via-sky-500/5 to-transparent border border-blue-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-(--color-brand-navy) text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Der Tadiks-Vorteil: Bau & Reinigung aus einer Hand
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-2xl leading-relaxed">
                Kein Ärger mit verschiedenen Handwerkern und Schmutz: Nach Abschluss aller Bau- und Renovierungsarbeiten führt unser eigenes Reinigungsteam eine fachgerechte Baufeinreinigung durch. Sie betreten Ihr frisch renoviertes Objekt schlüsselfertig und staubfrei.
              </p>
            </div>
          </div>
          <CtaButton href="/contacts" size="sm" className="shrink-0">
            Projekt anfragen
          </CtaButton>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {BAU_SERVICES.map((service) => (
            <BauServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Process Steps */}
        <BauProcessSteps />

        {/* Final CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold">
              Planen Sie ein Bau- oder Renovierungsprojekt?
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Lassen Sie sich unverbindlich von unseren Experten beraten. Wir erstellen Ihnen ein maßgeschneidertes Konzept für Bau, Renovierung und anschließende Reinigung.
            </p>
            <div className="pt-2 flex justify-center">
              <CtaButton href="/contacts" size="md">
                Kostenlose Beratung anfragen
              </CtaButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
