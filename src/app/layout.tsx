import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLdSchema } from "@/components/layout/JsonLdSchema";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { COMPANY_INFO } from "@/lib/constants";

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
  metadataBase: new URL("https://tadiks-cleaning.de"),
  title: {
    template: `%s | ${COMPANY_INFO.name} Chemnitz`,
    default: `${COMPANY_INFO.name} Chemnitz — ${COMPANY_INFO.tagline}`,
  },
  description:
    "Professionelle Reinigungsdienste in Chemnitz und Umgebung: Unterhaltsreinigung, Grundreinigung, Büroreinigung, Fensterreinigung und Bauendreinigung mit Zufriedenheitsgarantie.",
  keywords: [
    "Gebäudereinigung Chemnitz",
    "Reinigungsfirma Chemnitz",
    "Putzfirma Chemnitz",
    "Unterhaltsreinigung Chemnitz",
    "Fensterreinigung Chemnitz",
    "Büroreinigung Chemnitz",
    "Grundreinigung Sachsen",
    "Bauendreinigung Chemnitz",
    "Trockenbau Chemnitz",
    "Komplettsanierung Chemnitz",
    "Malerarbeiten Chemnitz",
    "Tadik's Cleaning",
  ],
  alternates: {
    canonical: "https://tadiks-cleaning.de",
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
    url: "https://tadiks-cleaning.de",
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} Chemnitz — ${COMPANY_INFO.tagline}`,
    description:
      "Meisterhafte Gebäudereinigung, Glas- & Bauendreinigung sowie Komplettsanierung, Trockenbau und Malerarbeiten aus einer Hand in Chemnitz & Sachsen.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1376,
        height: 768,
        alt: `${COMPANY_INFO.name} Chemnitz — Gebäudereinigung & Innenausbau`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_INFO.name} Chemnitz — ${COMPANY_INFO.tagline}`,
    description:
      "Meisterhafte Gebäudereinigung, Glas- & Bauendreinigung sowie Komplettsanierung, Trockenbau und Malerarbeiten aus einer Hand in Chemnitz & Sachsen.",
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
      <body className="min-h-dvh flex flex-col font-sans text-neutral-900 selection:bg-(--color-brand-navy) selection:text-white overflow-x-clip">
        <JsonLdSchema />
        <SmoothScroll>
          <PageTransition>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </PageTransition>
        </SmoothScroll>
        <CookieBanner />
      </body>
    </html>
  );
}
