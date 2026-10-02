import { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  Home,
  Paintbrush,
  Ruler,
  HardHat,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CtaButton } from "@/components/ui/CtaButton";
import { BAU_SERVICES } from "@/data/bauServices";

export const metadata: Metadata = {
  title: "Bau & Sanierung in Chemnitz — Trockenbau, Renovierung & Innenausbau",
  description:
    "Professionelle Baudienstleistungen in Chemnitz: Trockenbau, Renovierung, Malerarbeiten, Bodenlegerarbeiten und Entkernung. Alles aus einer Hand inklusive Bauendreinigung.",
};

const ICONS: Record<string, React.ElementType> = {
  Layers,
  Home,
  Paintbrush,
  Ruler,
  HardHat,
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
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-navy)] text-white flex items-center justify-center shrink-0 shadow-md">
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
          {BAU_SERVICES.map((service) => {
            const Icon = ICONS[service.iconName] || Layers;
            return (
              <Card
                key={service.id}
                id={service.id}
                className="flex flex-col justify-between p-7 sm:p-8 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--color-brand-navy)] dark:bg-blue-950/60 dark:text-sky-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.popular && <Badge variant="blue">Gefragt</Badge>}
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Leistungsumfang:
                    </span>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-navy)] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Immer inklusive:
                    </span>
                    {service.included.map((inc, idx) => (
                      <p
                        key={idx}
                        className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{inc}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <CtaButton
                    href="/contacts"
                    size="sm"
                    className="w-full justify-between"
                  >
                    Angebot anfordern
                  </CtaButton>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Process Steps */}
        <div className="mt-20">
          <SectionHeading
            badge="Unser Ablauf"
            title="In 4 einfachen Schritten zum perfekten Ergebnis"
            subtitle="Transparent, termintreu und ohne Überraschungen – so arbeiten wir in Chemnitz und Umgebung."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                step: "01",
                title: "Kostenlose Besichtigung",
                desc: "Wir schauen uns Ihr Objekt vor Ort in Chemnitz an, messen alles genau aus und besprechen Ihre Wünsche.",
              },
              {
                step: "02",
                title: "Festpreis-Angebot",
                desc: "Sie erhalten ein verbindliches, detailliertes Angebot ohne versteckte Zusatzkosten.",
              },
              {
                step: "03",
                title: "Fachgerechter Bau",
                desc: "Erfahrene Handwerker führen die Arbeiten zügig, sauber und mit Qualitätsmaterialien aus.",
              },
              {
                step: "04",
                title: "Bauendreinigung & Übergabe",
                desc: "Wir entfernen Bauschutt und Feinstaub und übergeben Ihnen die Räume schlüsselfertig und glänzend sauber.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 space-y-3 relative overflow-hidden"
              >
                <span className="text-4xl font-extrabold text-[var(--color-brand-navy)]/20 dark:text-[var(--color-brand-navy)]/30 block">
                  {item.step}
                </span>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

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
