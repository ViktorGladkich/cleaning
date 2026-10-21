export interface BauServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  popular?: boolean;
  features: string[];
  included: string[];
}

export const BAU_SERVICES: BauServiceItem[] = [
  {
    id: "trockenbau",
    slug: "trockenbau-innenausbau",
    title: "Trockenbau & Innenausbau",
    shortDescription: "Flexible Raumaufteilung, Akustikdecken, Trennwände und Dachgeschossausbau.",
    fullDescription: "Professioneller Trockenbau für private und gewerbliche Objekte in Chemnitz und Umgebung. Wir errichten nichttragende Trennwände, verkleiden Wände und Decken mit Gipskarton, installieren abgehängte Decken und realisieren Ihren Dachgeschossausbau nach modernsten Dämm- und Schallschutzstandards.",
    iconName: "Layers",
    popular: true,
    features: [
      "Ständerwerkwände und Trennwände nach Maß",
      "Abgehängte Decken und Akustikdecken",
      "Vollständiger Dachgeschossausbau inkl. Dampfsperre",
      "Vorsatzschalen und Installationswände für Sanitärräume",
      "Effektiver Schall- und Brandschutz nach DIN-Normen",
    ],
    included: [
      "Hochwertige Trockenbauprofile und Gipskartonplatten",
      "Fachgerechte Spachtelung der Fugen (Q1 bis Q4)",
      "Saubere Übergabe inklusive Endreinigung",
    ],
  },
  {
    id: "sanierung",
    slug: "renovierung-sanierung",
    title: "Komplettsanierung & Renovierung",
    shortDescription: "Ganzheitliche Modernisierung von Wohnungen, Häusern und Gewerberäumen.",
    fullDescription: "Von der Altbauwohnung bis zum Gewerbeobjekt: Wir übernehmen die komplette Sanierung aus einer Hand. Wir koordinieren alle Gewerke, halten vereinbarte Fristen strikt ein und verwandeln sanierungsbedürftige Räume in moderne, werthaltige Wohlfühloasen.",
    iconName: "Home",
    popular: true,
    features: [
      "Komplettsanierung von Wohnungen und Ein- & Mehrfamilienhäusern",
      "Badezimmersanierung und Neuverfliesung",
      "Modernisierung von Leitungen, Untergründen und Oberflächen",
      "Altbausanierung mit Erhalt historischer Stilelemente",
      "Energieeffiziente Dämmmaßnahmen im Innenbereich",
    ],
    included: [
      "Persönlicher Bauleiter als fester Ansprechpartner in Chemnitz",
      "Transparente Kostenaufstellung ohne versteckte Aufpreise",
      "Garantierte Termintreue und schlüsselfertige Übergabe",
    ],
  },
  {
    id: "malerarbeiten",
    slug: "maler-spachtelarbeiten",
    title: "Maler- & Spachtelarbeiten",
    shortDescription: "Perfekte Wand- und Deckenflächen, Q1–Q4 Qualitätsspachtelung und Farbkonzepte.",
    fullDescription: "Präzise Maler- und Tapezierarbeiten für anspruchsvolle Innenräume. Ob hochwertige Dispersions- oder Silikatfarben, Vliestapeten oder makellose Glattvlies-Spachtelung in Q3/Q4-Qualität – wir garantieren samtweiche, streifenfreie Oberflächen.",
    iconName: "Paintbrush",
    popular: false,
    features: [
      "Flächenspachtelung von Q1 (Basis) bis Q4 (höchste Oberflächengüte)",
      "Streichen von Wänden und Decken mit emissionsarmen Qualitätsfarben",
      "Tapezierarbeiten (Raufaser, Mustertapeten, Glattvlies)",
      "Lackieren von Türen, Fenstern, Zargen und Heizkörpern",
      "Schimmel- und Nikotinsperranstriche",
    ],
    included: [
      "Sorgfältiges Abkleben und Schützen aller Möbel und Böden",
      "Verwendung emissionsarmer, allergikerfreundlicher Profifarben",
      "Schlussreinigung nach Abschluss aller Malerarbeiten",
    ],
  },
  {
    id: "bodenleger",
    slug: "bodenleger-fliesenarbeiten",
    title: "Bodenleger- & Fliesenarbeiten",
    shortDescription: "Fachgerechte Verlegung von Laminat, Vinyl, Parkett, Teppich und Fliesen.",
    fullDescription: "Ein schöner Bodenbelag ist das Fundament jedes Raumes. Wir bereiten den Untergrund professionell vor (Ausgleichsspachtel, Estrichprüfung) und verlegen moderne Klick- und Klebeböden, Echtholzparkett sowie Wand- und Bodenfliesen mit höchster Präzision.",
    iconName: "Ruler",
    popular: false,
    features: [
      "Verlegung von Vinyl- und Designböden (Klick & vollflächig verklebt)",
      "Laminat- und Fertigparkettverlegung inklusive Trittschalldämmung",
      "Fliesenarbeiten in Bad, Küche, Flur und auf Terrassen",
      "Untergrundvorbereitung: Nivellieren, Schleifen und Grundieren",
      "Montage passender Sockelleisten und Übergangsschienen",
    ],
    included: [
      "Feuchtigkeitsmessung und Untergrundprüfung",
      "Modernste Verlegewerkzeuge für fugenlose Übergänge",
      "Entsorgung alter Bodenbeläge auf Wunsch",
    ],
  },
  {
    id: "abbruch",
    slug: "abbruch-entkernung",
    title: "Abbruch, Entkernung & Rückbau",
    shortDescription: "Saubere Entkernung, Demontage und umweltgerechte Bauschuttentsorgung.",
    fullDescription: "Vor dem Neubau steht oft der Rückbau. Wir entkernen Räume und Gebäude fachgerecht, entfernen alte Fliesen, Sanitärobjekte, nichttragende Wände und Deckenverkleidungen und entsorgen den Bauschutt sortenrein und umweltschonend.",
    iconName: "HardHat",
    popular: false,
    features: [
      "Rückbau nichttragender Wände und Leichtbaukonstruktionen",
      "Abtragen alter Fliesen, Estriche und Bodenbeläge",
      "Demontage von Sanitäreinrichtungen und Einbauten",
      "Staubarme Entkernung mit mobilen Luftreinigern und Staubschutztüren",
      "Sortenreine Trennung und zertifizierte Entsorgung von Bauschutt",
    ],
    included: [
      "Einsatz moderner Staubschutz- und Absaugtechnik",
      "Containerbereitstellung und Abtransport aller Altstoffe",
      "Besenreine Übergabe bereit für den Innenausbau",
    ],
  },
];

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
    href: "/contacts",
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
    href: "/contacts",
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
    href: "/contacts",
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
    href: "/contacts",
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
    href: "/contacts",
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
    href: "/contacts",
  },
];
