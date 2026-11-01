import { CompanyInfo, NavItem } from "@/types";

export const COMPANY_INFO: CompanyInfo = {
  name: "Tadik's Cleaning",
  owner: "Michel Kislovskij",
  tagline: "Professionelle Gebäudereinigung & Bau- und Ausbauarbeiten in Chemnitz und Umgebung",
  phone: "0371 23559475",
  phoneRaw: "+4937123559475",
  mobile: "0157 34362898",
  mobileRaw: "+4915734362898",
  email: "info@tadiks-cleaning.de",
  address: "Lessingstraße 14, 09130 Chemnitz",
  workingHours: "Mo. – Sa.: 07:00 – 19:00 Uhr",
  socials: {
    whatsapp: "https://wa.me/4915734362898",
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Reinigung", href: "/services" },
  { label: "Bau", href: "/bau" },
  { label: "Über uns", href: "/about" },
  { label: "Kontakt", href: "/contacts" },
];

export const SERVICE_CATEGORIES = [
  { id: "all", label: "Alle Leistungen" },
  { id: "residential", label: "Privathaushalte & Wohnungen" },
  { id: "commercial", label: "Büro- & Gewerbereinigung" },
  { id: "special", label: "Sonderreinigung" },
] as const;
