export interface ServiceGridItem {
  id: string;
  title: string;
  tagline: string;
  category?: string;
  imageSrc: string;
  imageAlt?: string;
  bullets: string[];
  href: string;
}

export const BAU_SERVICES_GRID: ServiceGridItem[] = [
  {
    id: "trockenbau",
    title: "Trockenbau & Akustik",
    tagline: "DIN-GERECHTE WAND- & DECKENSYSTEME, SCHALLSCHUTZ",
    category: "BAU",
    imageSrc: "/images/services/hero-trockenbau-innenausbau.jpg",
    imageAlt: "Präziser Trockenbau und Akustikdecken in Sachsen",
    bullets: [
      "Brand-, Schall- & Feuchteschutz nach DIN-Norm",
      "Akustikdecken, Deckensegel & flexible Trennwände",
      "Millimetergenaue Ausrichtung mit Rotationslasern",
    ],
    href: "/bau/trockenbau-innenausbau",
  },
  {
    id: "sanierung",
    title: "Komplettsanierung & Ausbau",
    tagline: "SCHLÜSSELFERTIGE RENOVIERUNG AUS EINER HAND",
    category: "BAU",
    imageSrc: "/images/services/hero-renovierung-sanierung.jpg",
    imageAlt: "Komplettsanierung und schlüsselfertiger Innenausbau",
    bullets: [
      "Koordination aller Gewerke unter einem festen Bauleiter",
      "Verbindlicher Bauzeitenplan mit garantierter Termintreue",
      "Keine Schnittstellenverluste zwischen den Gewerken",
    ],
    href: "/bau/renovierung-sanierung",
  },
  {
    id: "abbruch",
    title: "Abbruch & Entkernung",
    tagline: "STAUBARME DEMONTAGE & RECYCLINGGERECHTE ENTSORGUNG",
    category: "BAU",
    imageSrc: "/images/services/hero-abbruch-entkernung.jpg",
    imageAlt: "Staubarme Entkernung und Rückbauarbeiten",
    bullets: [
      "Rückbau nichttragender Wände & alter Bodenbeläge",
      "Einsatz von HEPA-Staubschutzwänden & Luftreinigern",
      "Sortenreine Entsorgung inklusive Bauschutt-Nachweis",
    ],
    href: "/bau/abbruch-entkernung",
  },
];
