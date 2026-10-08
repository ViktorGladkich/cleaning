import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import { ComingSoonPlaceholder } from "@/components/ui/ComingSoonPlaceholder";

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
      title: "Leistung nicht gefunden — Tadiks Chemnitz",
    };
  }

  return {
    title: `${service.title} Chemnitz — Tadiks`,
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
    <ComingSoonPlaceholder
      title={service.title}
      subtitle={`Die detaillierte Beschreibung, Leistungsmatrix und Preisbeispiele für «${service.title}» in Chemnitz & Mittelsachsen werden in Kürze freigeschaltet.`}
    />
  );
}
