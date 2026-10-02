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
  { label: "Kontakt", href: "/contacts" },
];

export const MEGA_MENU_SECTIONS: MegaMenuSection[] = [
  {
    title: "Reinigung",
    links: [
      { label: "Übersicht Reinigung", href: "/services" },
      { label: "Unterhaltsreinigung", href: "/services/unterhaltsreinigung" },
      { label: "Grundreinigung", href: "/services/grundreinigung" },
      { label: "Bauendreinigung", href: "/services/bauendreinigung" },
      { label: "Fenster- & Glasreinigung", href: "/services/fensterreinigung" },
      { label: "Büro- & Praxisreinigung", href: "/services/bueroreinigung" },
    ],
  },
  {
    title: "Bau & Sanierung",
    links: [
      { label: "Übersicht Bauleistungen", href: "/bau" },
      { label: "Trockenbau & Innenausbau", href: "/bau#trockenbau" },
      { label: "Komplettsanierung", href: "/bau#sanierung" },
      { label: "Maler- & Spachtelarbeiten", href: "/bau#malerarbeiten" },
      { label: "Bodenleger- & Fliesenarbeiten", href: "/bau#bodenleger" },
      { label: "Abbruch & Entkernung", href: "/bau#abbruch" },
    ],
  },
];

export const MOBILE_NAV_LINKS: NavLink[] = [
  { label: "Reinigung", href: "/services" },
  { label: "Bau & Sanierung", href: "/bau" },
  { label: "Über uns", href: "/about" },
  { label: "Preise & Rechner", href: "/pricing" },
  { label: "Bewertungen", href: "/reviews" },
  { label: "Kontakt", href: "/contacts" },
];
