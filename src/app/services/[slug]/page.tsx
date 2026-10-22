import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServiceDetailBySlug,
  getAllServiceSlugs,
} from "@/data/serviceDetails";
import { ServiceDetailPageContent } from "@/components/services/ServiceDetailPageContent";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs();
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);

  if (!service) {
    return {
      title: "Leistung nicht gefunden — Tadiks Chemnitz",
    };
  }

  return {
    title: `${service.title} Chemnitz — Meisterbetrieb Tadiks`,
    description: service.subtitle,
    openGraph: {
      title: `${service.title} Chemnitz — Tadiks`,
      description: service.heroDescription,
      images: [service.imageSrc],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPageContent service={service} />;
}
