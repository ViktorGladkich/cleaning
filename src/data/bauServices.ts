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
    imageSrc: "/images/service_grid_trockenbau.webp",
    imageAlt: "Präziser Trockenbau und Akustikdecken in Sachsen",
    bullets: [
      "Zertifizierter Brand-, Schall- & Feuchteschutz nach DIN",
      "Akustikdecken, Deckensegel & flexible Trennwände",
      "Millimetergenaue Ausrichtung mit Rotationslasern",
    ],
    href: "/services/trockenbau-innenausbau",
  },
  {
    id: "malerarbeiten",
    title: "Maler- & Spachteltechnik",
    tagline: "HOCHWERTIGE SPACHTELSTUFEN Q1–Q4 & ANSTRICH",
    category: "BAU",
    imageSrc: "/images/service_grid_maler.webp",
    imageAlt: "Malerarbeiten und Q1-Q4 Spachteltechnik in Chemnitz",
    bullets: [
      "Streiflichtfreie Q4-Glättung für anspruchsvolle Architektur",
      "Glattvlies, moderne Farbkonzepte & Lackierarbeiten",
      "Emissionsarme, zertifizierte Profi-Farben ohne Geruch",
    ],
    href: "/services/maler-spachtelarbeiten",
  },
  {
    id: "sanierung",
    title: "Komplettsanierung & Ausbau",
    tagline: "SCHLÜSSELFERTIGE RENOVIERUNG AUS EINER HAND",
    category: "BAU",
    imageSrc: "/images/leistungen_bau_1.jpg",
    imageAlt: "Komplettsanierung und schlüsselfertiger Innenausbau",
    bullets: [
      "Koordination aller Gewerke unter einem festen Bauleiter",
      "Verbindlicher Bauzeitenplan mit garantierter Termintreue",
      "Keine Schnittstellenverluste zwischen Rohbau & Finish",
    ],
    href: "/services/renovierung-sanierung",
  },
  {
    id: "bodenleger",
    title: "Bodenbeläge & Fliesen",
    tagline: "PRÄZISE VERLEGUNG VON PARKETT, VINYL & FLIESEN",
    category: "BAU",
    imageSrc: "/images/service_bau_card.jpg",
    imageAlt: "Hochwertige Bodenbelags- und Fliesenarbeiten",
    bullets: [
      "Fachgerechte Untergrundvorbereitung & Nivellierung",
      "Echtholzparkett, Design-Vinyl & großformatige Fliesen",
      "Fugenlose Übergänge und passgenaue Sockelleisten",
    ],
    href: "/services/bodenleger-fliesenarbeiten",
  },
  {
    id: "daemmung",
    title: "Innendämmung & Brandschutz",
    tagline: "ENERGIEEFFIZIENTER AUSBAU & BAULICHE SICHERHEIT",
    category: "BAU",
    imageSrc: "/images/leistungen_bau_2.jpg",
    imageAlt: "Innendämmung und baulicher Brandschutz in Sachsen",
    bullets: [
      "Wärmedämmung für Dachschrägen, Decken & Außenwände",
      "Zertifizierte Brandschutzverkleidungen (F30 bis F90)",
      "Feuchtigkeitsschutz und dauerhafte Schimmelprävention",
    ],
    href: "/services/trockenbau-innenausbau",
  },
  {
    id: "abbruch",
    title: "Abbruch & Entkernung",
    tagline: "STAUBARME DEMONTAGE & RECYCLINGGERECHTE ENTSORGUNG",
    category: "BAU",
    imageSrc: "/images/service_grid_bauende.webp",
    imageAlt: "Staubarme Entkernung und Rückbauarbeiten",
    bullets: [
      "Rückbau nichttragender Wände & alter Bodenbeläge",
      "Einsatz von HEPA-Staubschutzwänden & Luftreinigern",
      "Sortenreine Entsorgung inklusive Bauschutt-Nachweis",
    ],
    href: "/services/abbruch-entkernung",
  },
];
