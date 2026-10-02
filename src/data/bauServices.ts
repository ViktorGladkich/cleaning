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
