import { Metadata } from "next";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Reinigungsleistungen in Chemnitz",
  description:
    "Komplettes Leistungsangebot von GlanzWerk Chemnitz: Unterhaltsreinigung, Grundreinigung, Baufeinreinigung, Fensterreinigung, Polsterreinigung und Büroreinigung.",
};

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          badge="Leistungskatalog"
          title="Unsere Reinigungsdienste in Chemnitz"
          subtitle="Zuverlässige und sorgfältige Reinigung für Privatwohnungen, Häuser und gewerbliche Objekte in ganz Chemnitz"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {SERVICES.map((service) => (
            <Card key={service.id} className="flex flex-col justify-between p-7">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--color-brand-navy)] dark:bg-blue-950/60 dark:text-sky-400 flex items-center justify-center">
                    <ServiceIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                  {service.popular && <Badge variant="blue">Beliebt</Badge>}
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6 bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-lg">
                  <Clock className="w-4 h-4 text-[var(--color-brand-navy)] shrink-0" />
                  <span>Dauer: {service.duration}</span>
                </div>

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
              </div>

              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-500 block">Ab</span>
                  <span className="text-lg font-bold text-neutral-900 dark:text-white">
                    {service.priceFrom} €
                  </span>
                  <span className="text-xs text-neutral-500 block">
                    {service.priceUnit}
                  </span>
                </div>

                <Button
                  href={`/services/${service.slug}`}
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
