import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { JsonLdSchema } from "@/components/layout/JsonLdSchema";
import { COMPANY_INFO, SITE_URL } from "@/lib/constants";

// Fontshare - Satoshi (Geometric, Modern, Headlines & UI Elements)
const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: false,
});

// Fontshare - General Sans (Rationalist, Pristine Clarity for German Content)
const generalSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Page titles already contain the brand, so no title.template here.
  title: `${COMPANY_INFO.name} | Reinigung, Hotelreinigung & Bau in Chemnitz`,
  description:
    "Tadik's Cleaning ist Ihr Partner für professionelle Gebäudereinigung, Hotelreinigung und Bauleistungen in Chemnitz und Umgebung.",
  keywords: [
    "Gebäudereinigung Chemnitz",
    "Hotelreinigung Chemnitz",
    "Treppenhausreinigung Chemnitz",
    "Entrümpelung Chemnitz",
    "Jobs Reinigung Chemnitz",
    "Reinigungsfirma Chemnitz",
    "Putzfirma Chemnitz",
    "Unterhaltsreinigung Chemnitz",
    "Fensterreinigung Chemnitz",
    "Büroreinigung Chemnitz",
    "Grundreinigung Sachsen",
    "Bauendreinigung Chemnitz",
    "Trockenbau Chemnitz",
    "Rückbau Chemnitz",
    "Entkernung Chemnitz",
    "Fassadenreinigung Chemnitz",
    "Haushaltsreinigung Chemnitz",
    "Praxisreinigung Chemnitz",
    "Tadik's Cleaning",
  ],
  alternates: {
    canonical: "./",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "LLM Context (Standard)" },
        { url: "/llms-full.txt", title: "LLM Full Knowledge Base" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} Chemnitz — ${COMPANY_INFO.tagline}`,
    description:
      "Reinigung für Gewerbe und Privatkunden sowie Trockenbau, Rückbau und Renovierung in Chemnitz und Umgebung – mit persönlichem Ansprechpartner.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${COMPANY_INFO.name} Chemnitz — Gebäudereinigung & Innenausbau`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_INFO.name} Chemnitz — ${COMPANY_INFO.tagline}`,
    description:
      "Reinigung für Gewerbe und Privatkunden sowie Trockenbau, Rückbau und Renovierung in Chemnitz und Umgebung – mit persönlichem Ansprechpartner.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${satoshi.variable} ${generalSans.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans text-neutral-900 selection:bg-(--color-brand-navy) selection:text-white overflow-x-clip">
        <JsonLdSchema />
        <SmoothScroll>
          <PageTransition>
            <Header />
            <main className="flex-1 w-full max-w-full overflow-x-clip">{children}</main>
            <Footer />
          </PageTransition>
        </SmoothScroll>
        <EmergencyBanner />
      </body>
    </html>
  );
}
