import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Phone,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { COMPANY_INFO } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Leistung nicht gefunden",
    };
  }

  return {
    title: `${service.title} Chemnitz — GlanzWerk`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16">
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-[#1a77ed] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Leistungsübersicht
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1a77ed] dark:bg-blue-950/60 dark:text-sky-400 flex items-center justify-center">
                  <ServiceIcon name={service.iconName} className="w-6 h-6" />
                </div>
                {service.popular && <Badge variant="blue">Beliebte Leistung</Badge>}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {service.title} in Chemnitz
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Checklist of what's included */}
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 bg-white dark:bg-neutral-900">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                Was ist in dieser Leistung enthalten?
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#1a77ed] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inclusions / Guarantees */}
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 bg-neutral-50 dark:bg-neutral-900/40">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                Unsere GlanzWerk-Qualitätsgarantie:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {service.included.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200"
                  >
                    <Sparkles className="w-4 h-4 text-[#1a77ed] mb-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Card className="p-6 sm:p-8 shadow-xl border-blue-500/20">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#1a77ed]">
                Preisübersicht
              </span>
              <div className="my-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
                  ab {service.priceFrom} €
                </span>
                <span className="text-xs text-neutral-500 block mt-1">
                  {service.priceUnit}
                </span>
              </div>

              <div className="py-4 border-y border-neutral-100 dark:border-neutral-800 space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1a77ed] shrink-0" />
                  <span>Richtzeit: {service.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Haftpflicht bis 5.000.000 €</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button href="/contacts" variant="primary" size="lg" className="w-full">
                  Termin vereinbaren
                </Button>
                <Button
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  variant="outline"
                  size="md"
                  className="w-full"
                  icon={<Phone className="w-4 h-4" />}
                >
                  Telefonische Beratung
                </Button>
              </div>

              <p className="mt-4 text-[11px] text-center text-neutral-400">
                Abrechnung erfolgt erst nach Ihrer persönlichen Abnahme
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
