export interface ServiceCardItem {
  id: string;
  title: string;
  tagline: string;
  category?: string;
  imageSrc: string;
  imageAlt?: string;
  bullets: string[];
  href: string;
}

export const REINIGUNG_SERVICES_GRID: ServiceCardItem[] = [
  {
    id: "unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    tagline: "KONTINUIERLICHE PFLEGE FÜR GEWERBE & PRIVAT",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-unterhaltsreinigung.jpg",
    imageAlt: "Professionelle Unterhaltsreinigung in Chemnitz und Sachsen",
    bullets: [
      "Festes, geschultes Stammpersonal & Objektleitung",
      "Ergonomische 4-Farben-Mikrofaserhygiene nach RKI",
      "Materialschonende, biologisch abbaubare Reiniger",
    ],
    href: "/services/unterhaltsreinigung",
  },
  {
    id: "grundreinigung",
    title: "Grundreinigung",
    tagline: "INTENSIVE TIEFENHYGIENE BIS IN DIE KLEINSTE FUGE",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-grundreinigung.jpg",
    imageAlt: "Intensive Grundreinigung in Sachsen",
    bullets: [
      "Maschinelle Entschichtung von Hart- & Fliesenböden",
      "Kalk- & Fettbeseitigung in Sanitär- & Küchenbereichen",
      "Ideale Vorbereitung vor Mieterwechsel & Neuvermietung",
    ],
    href: "/services/grundreinigung",
  },
  {
    id: "bauendreinigung",
    title: "Bauendreinigung",
    tagline: "BEZUGSFERTIGE SCHLÜSSELÜBERGABE NACH BAU & SANIERUNG",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-bauendreinigung.jpg",
    imageAlt: "Bezugsfertige Bauendreinigung nach Sanierung und Neubau",
    bullets: [
      "Schonende Beseitigung von Baustaub, Zement & Farbresten",
      "Einsatz leistungsstarker HEPA-14 Feinstaubsauger",
      "Termintreue Abnahmegarantie für Architekten & Bauherren",
    ],
    href: "/services/bauendreinigung",
  },
  {
    id: "fensterreinigung",
    title: "Fenster- & Glasreinigung",
    tagline: "OSMOSE-REINSTWASSERTECHNIK BIS 20M HÖHE",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-fensterreinigung.jpg",
    imageAlt: "Streifenfreie Glas- und Fensterreinigung in Chemnitz",
    bullets: [
      "100% streifenfreier Glanz ohne chemische Rückstände",
      "Inklusive gründlicher Rahmen-, Falz- & Simsreinigung",
      "Keine Hebebühnenkosten durch Teleskop-Reinstwassersysteme",
    ],
    href: "/services/fensterreinigung",
  },
  {
    id: "bueroreinigung",
    title: "Büro- & Praxisreinigung",
    tagline: "REPRÄSENTATIVE HYGIENE FÜR UNTERNEHMEN & KANZLEIEN",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-bueroreinigung.jpg",
    imageAlt: "Repräsentative Büro- und Praxisreinigung in Chemnitz",
    bullets: [
      "Diskreter Abendservice oder tagsüber im laufenden Betrieb",
      "Desinfektion von Arbeitsplätzen, Teeküchen & Sanitär",
      "Verlässlicher Nachfüllservice für Verbrauchsmaterialien",
    ],
    href: "/services/bueroreinigung",
  },
  {
    id: "polsterreinigung",
    title: "Polster- & Teppichreinigung",
    tagline: "HYGIENISCHE TIEFENREINIGUNG MIT SPRÜHEXTRAKTION",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-polsterreinigung.jpg",
    imageAlt: "Hygienische Polster- und Teppichreinigung in Chemnitz",
    bullets: [
      "Tiefenwirksame Nassreinigung für textile Böden & Möbel",
      "Faserschonende Fleckentfernung & Geruchsneutralisation",
      "Kurze Trocknungszeiten durch Hochleistungsvakuum",
    ],
    href: "/services/polsterreinigung",
  },
  {
    id: "hotelreinigung",
    title: "Hotelreinigung",
    tagline: "FÜR HOTELS, PENSIONEN & FERIENUNTERKÜNFTE",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-hotelreinigung.jpg",
    imageAlt: "Gepflegter Empfangsbereich nach der Hotelreinigung",
    bullets: [
      "Tägliche Zimmerreinigung & Gästewechsel",
      "Hygienische Sanitär- & Empfangsbereiche",
      "Feste Ansprechpartner & diskretes Arbeiten",
    ],
    href: "/services/hotelreinigung",
  },
  {
    id: "treppenhausreinigung",
    title: "Treppenhausreinigung",
    tagline: "FÜR WOHNANLAGEN, BÜROGEBÄUDE & GEWERBEPARKS",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-treppenhausreinigung.jpg",
    imageAlt: "Gepflegter Eingangsbereich mit Treppe und Aufzug",
    bullets: [
      "Böden, Handläufe & Geländer",
      "Briefkastenanlagen, Eingangstüren & Aufzüge",
      "Zuverlässige Reinigungsintervalle",
    ],
    href: "/services/treppenhausreinigung",
  },
  {
    id: "industrie-und-hallenreinigung",
    title: "Industrie- & Hallenreinigung",
    tagline: "FÜR PRODUKTION, LAGER & LOGISTIK",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-industrie-und-hallenreinigung.jpg",
    imageAlt: "Maschinelle Bodenreinigung auf einer großen Fläche",
    bullets: [
      "Aufsitz-Scheuersaugmaschinen & Hochdrucktechnik",
      "Entfernung von Öl, Fett & Produktionsrückständen",
      "Von der Werkstatt bis zur Großhalle",
    ],
    href: "/services/industrie-und-hallenreinigung",
  },
  {
    id: "entruempelungen",
    title: "Entrümpelungen",
    tagline: "DISKRET, SCHNELL & BESENREIN",
    category: "REINIGUNG",
    imageSrc: "/images/services/hero-entruempelungen.jpg",
    imageAlt: "Leerer, besenreiner Raum nach einer Entrümpelung",
    bullets: [
      "Wohnungsauflösung, Keller & Geschäftsräumung",
      "Fachgerechter Abtransport & Entsorgung",
      "Auf Wunsch anschließende Endreinigung",
    ],
    href: "/services/entruempelungen",
  },
];
