import { getServicePath, getServicesByCategory } from "@/data/serviceDetails";

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuSection {
  title: string;
  links: NavLink[];
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Reinigung", href: "/services" },
  { label: "Bau", href: "/bau" },
  { label: "Über uns", href: "/about" },
  { label: "Karriere", href: "/karriere" },
  { label: "Kontakt", href: "/contacts" },
];

const toLinks = (category: "reinigung" | "bau"): NavLink[] =>
  getServicesByCategory(category).map((service) => ({
    label: service.title,
    href: getServicePath(service),
  }));

export const MEGA_MENU_SECTIONS: MegaMenuSection[] = [
  {
    title: "Reinigung",
    links: [{ label: "Übersicht Reinigung", href: "/services" }, ...toLinks("reinigung")],
  },
  {
    title: "Bau",
    links: [{ label: "Übersicht Bau", href: "/bau" }, ...toLinks("bau")],
  },
];

export const MOBILE_NAV_LINKS: NavLink[] = MAIN_NAV_LINKS;
