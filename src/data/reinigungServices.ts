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

/**
 * 6 cleaning services from the MegaMenu:
 * 1. Unterhaltsreinigung (/services/unterhaltsreinigung)
 * 2. Grundreinigung (/services/grundreinigung)
 * 3. Bauendreinigung (/services/bauendreinigung)
 * 4. Fenster- & Glasreinigung (/services/fensterreinigung)
 * 5. Büro- & Praxisreinigung (/services/bueroreinigung)
 * 6. Polster- & Teppichreinigung (/services/polsterreinigung)
 */
export const REINIGUNG_SERVICES_GRID: ServiceCardItem[] = [
  {
    id: "unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    tagline: "KONTINUIERLICHE PFLEGE FÜR GEWERBE & PRIVAT",
    category: "REINIGUNG",
    imageSrc: "/images/service_grid_unterhalt.webp",
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
    imageSrc: "/images/leistungen_reinigung_1.jpg",
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
    imageSrc: "/images/service_grid_bauende.webp",
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
    imageSrc: "/images/service_grid_glas.webp",
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
    imageSrc: "/images/service_cleaning_card.jpg",
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
    imageSrc: "/images/leistungen_reinigung_2.jpg",
    imageAlt: "Hygienische Polster- und Teppichreinigung in Chemnitz",
    bullets: [
      "Tiefenwirksame Nassreinigung für textile Böden & Möbel",
      "Faserschonende Fleckentfernung & Geruchsneutralisation",
      "Kurze Trocknungszeiten durch Hochleistungsvakuum",
    ],
    href: "/services/polsterreinigung",
  },
];
