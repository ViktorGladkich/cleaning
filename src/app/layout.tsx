import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { COMPANY_INFO } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${COMPANY_INFO.name}`,
    default: `${COMPANY_INFO.name} — ${COMPANY_INFO.tagline}`,
  },
  description:
    "Профессиональный клининг квартир, коттеджей и офисных помещений. Эко-химия, опытные клинеры, гарантия качества и сохранности имущества.",
  keywords: [
    "клининг",
    "уборка квартир",
    "генеральная уборка",
    "уборка после ремонта",
    "химчистка мебели",
    "мойка окон",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-emerald-500 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
