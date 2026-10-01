import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { COMPANY_INFO } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
