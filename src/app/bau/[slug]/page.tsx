import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServiceDetailBySlug,
  ALL_SERVICE_DETAILS,
} from "@/data/serviceDetails";
import { ServiceDetailPageContent } from "@/components/services/ServiceDetailPageContent";

interface BauServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const bauServices = ALL_SERVICE_DETAILS.filter((s) => s.category === "bau");
  const slugs = new Set<string>();
  for (const s of bauServices) {
    slugs.add(s.slug);
    if (s.id !== s.slug) slugs.add(s.id);
    if (s.aliases) {
      for (const a of s.aliases) slugs.add(a);
    }
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BauServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);

  if (!service || service.category !== "bau") {
    return {
      title: "Bauleistung nicht gefunden — Tadiks Chemnitz",
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

export default async function BauServiceDetailPage({
  params,
}: BauServicePageProps) {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);

  if (!service || service.category !== "bau") {
    notFound();
  }

  return <ServiceDetailPageContent service={service} />;
}
