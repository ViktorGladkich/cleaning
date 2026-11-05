import { CompanyInfo, NavItem } from "@/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.tadiks-cleaning.de";

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
  legal: {
    vatId: "DE327509629",
    economicId: "", // z. B. "DE123456789-00001"
    commercialRegister: "", // z. B. "Amtsgericht Chemnitz, HRA 12345" (nur bei e.K.)
    chamber:
      "Handwerkskammer Chemnitz, Limbacher Straße 195, 09116 Chemnitz, www.hwk-chemnitz.de",
    craftRegister: "", // z. B. "Handwerksrolle Nr. 12345"
    professionTitle: "Gebäudereiniger (verliehen in der Bundesrepublik Deutschland)",
    insurerName: "",
    insurerAddress: "",
  },
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
