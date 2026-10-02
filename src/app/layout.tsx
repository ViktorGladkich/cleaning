import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
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
});

export const metadata: Metadata = {
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
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${satoshi.variable} ${generalSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-neutral-900 selection:bg-(--color-brand-navy) selection:text-white">
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
