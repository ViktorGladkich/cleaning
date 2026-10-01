import { CompanyInfo, NavItem } from "@/types";

export const COMPANY_INFO: CompanyInfo = {
  name: "Tadiks Cleaning",
  tagline: "Professionelle Gebäudereinigung & Haushaltshilfe in Chemnitz und Umgebung",
  phone: "+49 (0) 371 995 4820",
  phoneRaw: "+493719954820",
  email: "kontakt@tadiks-cleaning.de",
  address: "Theaterplatz 4, 09111 Chemnitz",
  workingHours: "Mo. – Sa.: 07:00 – 19:30 Uhr",
  socials: {
    whatsapp: "https://wa.me/493719954820",
    telegram: "https://t.me/glanzwerk_chemnitz",
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Startseite", href: "/" },
  { label: "Leistungen", href: "/services" },
  { label: "Preise", href: "/pricing" },
  { label: "Über uns", href: "/about" },
  { label: "Bewertungen", href: "/reviews" },
  { label: "Kontakt", href: "/contacts" },
];

export const SERVICE_CATEGORIES = [
  { id: "all", label: "Alle Leistungen" },
  { id: "residential", label: "Privathaushalte & Wohnungen" },
  { id: "commercial", label: "Büro- & Gewerbereinigung" },
  { id: "special", label: "Sonderreinigung" },
] as const;
