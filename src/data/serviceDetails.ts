export interface ServiceDetailData {
  id: string;
  slug: string;
  aliases?: string[];
  category: "reinigung" | "bau";
  categoryLabel: string;
  title: string;
  subtitle: string;
  heroHeadline: string;
  heroDescription: string;
  priceNote: string;
  durationNote: string;
  imageSrc: string;
  imageAlt: string;
  popular?: boolean;
  featuresTitle: string;
  features: string[];
  includedTitle: string;
  included: string[];
  processSteps: {
    number: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
}

export const ALL_SERVICE_DETAILS: ServiceDetailData[] = [
  // ==========================================
  // 1. REINIGUNG: UNTERHALTSREINIGUNG
  // ==========================================
  {
    id: "unterhaltsreinigung",
    slug: "unterhaltsreinigung",
    aliases: ["standard-cleaning"],
    category: "reinigung",
    categoryLabel: "Gebäudereinigung",
    title: "Unterhaltsreinigung",
    subtitle: "Regelmäßige Pflege für gewerbliche und private Räume in Chemnitz",
    heroHeadline: "Unterhaltsreinigung nach Meister-Standard.",
    heroDescription:
      "Kontinuierliche Werterhaltung und makellose Hygiene für Kanzleien, Praxen, Büros und Privathaushalte. Mit festem Stammpersonal, RKI-konformem 4-Farben-System und ökologischen Reinigern.",
    priceNote: "ab 49 € pro Einsatz / ab 2,20 € pro m²",
    durationNote: "Flexibel nach Turnus (täglich, wöchentlich, 14-tägig)",
    imageSrc: "/images/service_grid_unterhalt.webp",
    imageAlt: "Professionelle Unterhaltsreinigung in Chemnitz",
    popular: true,
    featuresTitle: "Was ist in der regelmäßigen Unterhaltsreinigung enthalten?",
    features: [
      "Gründliches Saugen und feuchtes Wischen aller Hart- und Teppichböden",
      "Staubwischen auf allen freien Oberflächen, Schreibtischen und Fensterbänken",
      "Desinfizierende Nassreinigung der Sanitäranlagen (WCs, Urinale, Waschbecken)",
      "Hygiene in Küchen & Teeküchen: Arbeitsflächen, Spülen und Fronten",
      "Fachgerechte Müllentsorgung und Wertstofftrennung inkl. Beutelwechsel",
      "Konsequentes 4-Farben-Mikrofasersystem gegen jede Keimübertragung",
    ],
    includedTitle: "Unser Qualitätsversprechen inklusive",
    included: [
      "Festes, geschultes Stammpersonal & persönliche Objektleitung",
      "Sämtliche umweltschonenden Profi-Reinigungsmittel & Kärcher-Geräte",
      "Lückenlose gewerbliche Haftpflichtversicherung",
      "Qualitätskontrollen nach digitaler Checkliste",
    ],
    processSteps: [
      {
        number: "01",
        title: "Kostenlose Objektbegehung",
        description:
          "Wir besichtigen Ihre Räumlichkeiten vor Ort in Chemnitz und erfassen alle Besonderheiten und gewünschten Reinigungsintervalle.",
      },
      {
        number: "02",
        title: "Transparenter Festpreis",
        description:
          "Sie erhalten innerhalb von 24 Stunden ein detailliertes Leistungsverzeichnis ohne versteckte Kosten oder Mindestvertragslaufzeiten.",
      },
      {
        number: "03",
        title: "Zuverlässige Ausführung",
        description:
          "Ihr festes Reinigungsteam führt alle Arbeiten pünktlich und diskret zu Ihren Wunschzeiten durch (auch frühmorgens oder am Wochenende).",
      },
      {
        number: "04",
        title: "Laufende Qualitätskontrolle",
        description:
          "Ihr persönlicher Ansprechpartner überprüft regelmäßig die Arbeitsqualität und passt den Service flexibel an neue Wünsche an.",
      },
    ],
    faqs: [
      {
        question: "In welchen Intervallen bieten Sie die Unterhaltsreinigung an?",
        answer:
          "Wir passen uns vollständig Ihren Bedürfnissen an: täglich, mehrmals wöchentlich, wöchentlich oder alle zwei Wochen. Die Zeiten können flexibel auf Ihren Betriebsablauf abgestimmt werden.",
      },
      {
        question: "Werden immer dieselben Reinigungskräfte eingesetzt?",
        answer:
          "Ja, Kontinuität und Vertrauen stehen bei uns an erster Stelle. Sie erhalten feste, namentlich bekannte Reinigungskräfte, die mit Ihren Räumlichkeiten bestens vertraut sind.",
      },
      {
        question: "Müssen wir Putzmittel oder Staubsauger zur Verfügung stellen?",
        answer:
          "Nein. Unser Team bringt sämtliche professionellen Reinigungsmittel, Farbmikrofasertücher und Kärcher-Geräte vollständig mit.",
      },
      {
        question: "Können Privathaushalte die Kosten steuerlich absetzen?",
        answer:
          "Ja! Nach § 35a EStG können bis zu 20% der Arbeitskosten (maximal 4.000 € pro Jahr) als haushaltsnahe Dienstleistungen direkt von der Steuerschuld abgezogen werden.",
      },
    ],
    relatedSlugs: ["grundreinigung", "bueroreinigung", "fensterreinigung"],
  },

  // ==========================================
  // 2. REINIGUNG: GRUNDREINIGUNG
  // ==========================================
  {
    id: "grundreinigung",
    slug: "grundreinigung",
    aliases: ["deep-cleaning"],
    category: "reinigung",
    categoryLabel: "Gebäudereinigung",
    title: "Grundreinigung",
    subtitle: "Intensive Tiefenhygiene bis in die kleinste Fuge",
    heroHeadline: "Grundreinigung mit meisterhafter Tiefenwirkung.",
    heroDescription:
      "Die intensive Komplettreinigung für Wohnungen, Häuser und Gewerberäume. Wir entfernen hartnäckige Kalkablagerungen, Fettfilme, Wachsschichten und Verschmutzungen, die bei der normalen Reinigung unberührt bleiben.",
    priceNote: "ab 149 € pro Objekt (individuell nach Quadratmetern)",
    durationNote: "ca. 4–7 Stunden durch unser Profi-Team",
    imageSrc: "/images/leistungen_reinigung_1.jpg",
    imageAlt: "Intensive Grundreinigung in Sachsen",
    popular: true,
    featuresTitle: "Leistungsumfang der intensiven Grundreinigung",
    features: [
      "Maschinelle Entschichtung und Tiefenreinigung strapazierter Hartböden",
      "Kalk- und Urinsteinbeseitigung an Fliesen, Armaturen, Fugen und Duschwänden",
      "Entfettung von Dunstabzugshauben, Küchenfronten, Kacheln und Backöfen",
      "Millimetergenaue Säuberung von Heizkörpern, Sockelleisten und Türzargen",
      "Reinigung von Lichtschaltern, Steckdosen, Türgriffen und Lüftungsrosten",
      "Tiefensaugen von Polstermöbeln und schwer zugänglichen Randbereichen",
    ],
    includedTitle: "Inklusive bei jeder Grundreinigung",
    included: [
      "Team aus 2 bis 3 erfahrenen Reinigungsspezialisten",
      "Kärcher Heißdampfgeräte & Einscheiben-Bodenreinigungsmaschinen",
      "Spezielle materialschonende Intensivreiniger",
      "Gemeinsame Abnahme vor Ort mit Zufriedenheitsgarantie",
    ],
    processSteps: [
      {
        number: "01",
        title: "Bedarfsanalyse & Angebot",
        description:
          "Nach kurzer Absprache oder Besichtigung erhalten Sie ein transparentes Festpreisangebot für Ihr Objekt.",
      },
      {
        number: "02",
        title: "Terminfestlegung",
        description:
          "Wir stimmen einen verbindlichen Termin ab – auch kurzfristig vor Mieterwechsel oder nach Feierlichkeiten.",
      },
      {
        number: "03",
        title: "Intensive Durchführung",
        description:
          "Unser 2- bis 3-köpfiges Team reinigt alle Bereiche systematisch mit Heißdampf und Profi-Maschinen.",
      },
      {
        number: "04",
        title: "Abnahme mit Protokoll",
        description:
          "Sie begutachten gemeinsam mit unserem Vorarbeiter das Ergebnis. Erst wenn Sie rundum zufrieden sind, gilt der Auftrag als erfüllt.",
      },
    ],
    faqs: [
      {
        question: "Wann ist eine Grundreinigung besonders empfehlenswert?",
        answer:
          "Ideal vor Ein- oder Auszug, bei Eigentümer- oder Mieterwechsel, nach Renovierungen sowie ein- bis zweimal jährlich als gründlicher Frühjahrsputz.",
      },
      {
        question: "Müssen Schränke und Regale vorher ausgeräumt werden?",
        answer:
          "Für eine Innenreinigung von Schränken empfiehlt sich das Ausräumen. Wenn Sie Schränke lieber eingeräumt lassen, reinigen wir alle Fronten, Oberkanten und Außenflächen gründlich.",
      },
      {
        question: "Wie viele Personen sind vor Ort im Einsatz?",
        answer:
          "Je nach Quadratmeterzahl und Verschmutzungsgrad setzen wir 2 bis 4 geschulte Reinigungskräfte ein, um die Arbeiten zügig und effektiv abzuschließen.",
      },
    ],
    relatedSlugs: ["unterhaltsreinigung", "bauendreinigung", "fensterreinigung"],
  },

  // ==========================================
  // 3. REINIGUNG: BAUENDREINIGUNG
  // ==========================================
  {
    id: "bauendreinigung",
    slug: "bauendreinigung",
    aliases: ["post-construction"],
    category: "reinigung",
    categoryLabel: "Gebäudereinigung",
    title: "Bauendreinigung & Nach Renovierung",
    subtitle: "Bezugsfertige Schlüsselübergabe nach Neubau, Umbau und Sanierung",
    heroHeadline: "Bauendreinigung für bezugsfertige Perfektion.",
    heroDescription:
      "Spezialisierte Baufeinreinigung in Chemnitz und Mittelsachsen. Wir entfernen aggressiven Baustaub, Zementschleier, Farb- und Lackspritzer sowie Etiketten schonend von allen neuen Oberflächen.",
    priceNote: "ab 189 € pro Objekt (kostenfreie Besichtigung)",
    durationNote: "5–8 Stunden / termintreue Fertigstellung",
    imageSrc: "/images/service_grid_bauende.webp",
    imageAlt: "Bauendreinigung und Baufeinreinigung in Chemnitz",
    popular: false,
    featuresTitle: "Was gehört zur fachgerechten Baufeinreinigung?",
    features: [
      "Vollständige Absaugung von feinstem Baustaub aus Wänden, Nischen und Decken",
      "Schonende Beseitigung von Zementschleier, Mörtel- und Gipsrückständen",
      "Rückstandsloses Ablösen von Schutzfolien, Klebebändern und Etiketten",
      "Reinigung neu eingebauter Fenster inkl. Rahmen, Falzen und Dichtungen",
      "Nassreinigung von Fliesen, Sanitärkeramik und neuen Einbauten",
      "Einsatz von HEPA-14 Feinstaubfiltern zur Vermeidung von Staubverwirbelungen",
    ],
    includedTitle: "Unser Standard für Bauherren & Architekten",
    included: [
      "Kärcher Industrie-Sicherheitssauger (Staubklasse M/H)",
      "Spezialreiniger gegen Mörtel-, Farb- und Silikonreste",
      "Verbindliche Termintreue vor Gutachter- oder Mieterabnahme",
      "Besenreine und bezugsfertige Übergabe",
    ],
    processSteps: [
      {
        number: "01",
        title: "Baufortschritt prüfen",
        description:
          "Wir stimmen den optimalen Startzeitpunkt ab, sobald alle Handwerker ihre Arbeiten abgeschlossen haben.",
      },
      {
        number: "02",
        title: "Baufein-Planung",
        description:
          "Sie erhalten ein verbindliches Festpreisangebot mit garantierten Fertigstellungsfristen für die Schlüsselübergabe.",
      },
      {
        number: "03",
        title: "Systematische Entstaubung",
        description:
          "Unser Team reinigt von oben nach unten, bindet Feinstaub und beseitigt alle Bauspuren von Glas, Fliesen und Böden.",
      },
      {
        number: "04",
        title: "Schlüsselfertige Übergabe",
        description:
          "Das Objekt ist sofort bezugsfertig für Mieter, Eigentümer oder die behördliche Endabnahme.",
      },
    ],
    faqs: [
      {
        question: "Was ist der Unterschied zwischen Baugrob- und Baufeinreinigung?",
        answer:
          "Die Baugrobreinigung entfernt während der Bauphase groben Schutt und Reste. Die Baufeinreinigung (Bauendreinigung) findet unmittelbar vor dem Einzug statt und hinterlässt das Objekt absolut staubfrei und bezugsfertig.",
      },
      {
        question: "Können Sie auch sehr kurzfristig anrücken?",
        answer:
          "Ja! Da Baufristen oft knapp kalkuliert sind, bieten wir für Chemnitz und Mittelsachsen Notfalltermine innerhalb von 24–48 Stunden an.",
      },
      {
        question: "Werden neu eingebaute Fenster und Fliesen nicht zerkratzt?",
        answer:
          "Absolut sicher: Wir nutzen pH-neutrale Speziallöser und weiche Profi-Werkzeuge, um Zementschleier und Schutzfolien völlig kratzfrei zu entfernen.",
      },
    ],
    relatedSlugs: ["grundreinigung", "fensterreinigung", "unterhaltsreinigung"],
  },

  // ==========================================
  // 4. REINIGUNG: FENSTERREINIGUNG
  // ==========================================
  {
    id: "fensterreinigung",
    slug: "fensterreinigung",
    aliases: ["window-cleaning"],
    category: "reinigung",
    categoryLabel: "Gebäudereinigung",
    title: "Fenster- & Glasreinigung",
    subtitle: "Streifenfreier Durchblick mit modernster Reinstwassertechnik",
    heroHeadline: "Glasreinigung bis 20 m Höhe ohne Hebebühne.",
    heroDescription:
      "Kristallklarer Glanz für Privathaushalte, Schaufenster, Bürogebäude und Kanzleien. Wir reinigen Scheiben, Rahmen, Dichtungen, Innenfalzen und Fensterbänke streifenfrei und materialgerecht.",
    priceNote: "ab 39 € (Pakete ab 5 Fenster / m²-Preise für Gewerbe)",
    durationNote: "ca. 1–3 Stunden vor Ort",
    imageSrc: "/images/service_grid_glas.webp",
    imageAlt: "Streifenfreie Fenster- und Glasreinigung in Chemnitz",
    popular: false,
    featuresTitle: "Was umfasst unsere professionelle Glasreinigung?",
    features: [
      "Streifenfreie Reinigung der Glasflächen innen und außen",
      "Gründliche Säuberung aller Fensterrahmen (Kunststoff, Alu, Holz)",
      "Reinigung der Innenfalzen, Wasserabläufe und Beschläge",
      "Abwischen und Pflege der inneren und äußeren Fensterbänke",
      "Osmose-Reinstwassertechnik für hohe Glasfassaden und Glasvordächer",
      "Wintergarten- und Schaufensterreinigung nach individuellem Intervall",
    ],
    includedTitle: "Ausstattung & Technik",
    included: [
      "Osmose-Wasserfiltersystem (streifenfrei ohne Nachtrocknen)",
      "Leichte Carbon-Teleskopstangen für Höhen bis zu 20 Metern",
      "Antistatische Versiegelung gegen schnelle Wiederverschmutzung",
      "Vollständige Absicherung und Schutz empfindlicher Böden innen",
    ],
    processSteps: [
      {
        number: "01",
        title: "Fensteranzahl erfassen",
        description:
          "Nennen Sie uns die ungefähre Fensterzahl oder schicken Sie uns Fotos für ein sofortiges Festpreisangebot.",
      },
      {
        number: "02",
        title: "Wunschtermin buchen",
        description:
          "Wir finden einen passenden Termin bei gutem Reinigungswetter.",
      },
      {
        number: "03",
        title: "Gründliche Glaspflege",
        description:
          "Rahmen, Falzen und Scheiben werden beidseitig fachmännisch gesäubert.",
      },
      {
        number: "04",
        title: "Prüfung & Abnahme",
        description:
          "Prüfung bei Gegenlicht – streifenfreier Glanz ist garantiert.",
      },
    ],
    faqs: [
      {
        question: "Wie funktioniert die Osmose-Glasreinigung?",
        answer:
          "Dem Wasser werden durch Filtration alle Mineralien entzogen. Das Reinstwasser trocknet an der Luft völlig rückstands- und streifenfrei ab, ohne Kalkränder zu hinterlassen.",
      },
      {
        question: "Werden die Fensterrahmen automatisch mitgereinigt?",
        answer:
          "Ja! Bei Tadiks gehört das gründliche Einwaschen und Abwischen der Fensterrahmen, Dichtungen und Fensterbänke immer zum festen Leistungsumfang.",
      },
    ],
    relatedSlugs: ["unterhaltsreinigung", "grundreinigung", "bueroreinigung"],
  },

  // ==========================================
  // 5. REINIGUNG: BÜROREINIGUNG
  // ==========================================
  {
    id: "bueroreinigung",
    slug: "bueroreinigung",
    aliases: ["commercial-cleaning"],
    category: "reinigung",
    categoryLabel: "Gebäudereinigung",
    title: "Büro- & Praxisreinigung",
    subtitle: "Repräsentative Hygiene für Unternehmen, Kanzleien und Praxen",
    heroHeadline: "Hygienisches Arbeitsumfeld nach RKI-Standards.",
    heroDescription:
      "Zuverlässige und diskrete Unterhaltsreinigung für Gewerbeobjekte in Chemnitz und Mittelsachsen. Wir sichern ein repräsentatives Erscheinungsbild und schützen die Gesundheit Ihrer Mitarbeiter und Besucher.",
    priceNote: "ab 2,20 € pro m² / individuelle Monatspauschale",
    durationNote: "Nach Vereinbarung (frühmorgens, abends, Wochenende)",
    imageSrc: "/images/service_cleaning_card.jpg",
    imageAlt: "Büro- und Praxisreinigung in Chemnitz",
    popular: false,
    featuresTitle: "Leistungen für Büro- und Praxisräume",
    features: [
      "Hygienische Reinigung von Arbeitsplätzen, Monitoren und Tastaturen",
      "RKI-konforme Flächendesinfektion in Arzt- und Zahnarztpraxen",
      "Teeküchenservice inkl. Geschirrspüler-Einräumen und Kaffeemaschinenpflege",
      "Sanitärhygiene inkl. Bestückung von Seifenspendern und Handtuchpapier",
      "Zuverlässige Leerung und Mülltrennung an allen Arbeitsplätzen",
      "Pflege aller textilen und harten Bodenbeläge nach Pflegeanleitung",
    ],
    includedTitle: "Vorteile für gewerbliche Kunden",
    included: [
      "Fester Objektleiter & persönlicher Ansprechpartner in Chemnitz",
      "Sichere Schlüsselverwaltung mit Übergabeprotokoll",
      "Monatliche transparente Rechnungsstellung mit ausgewiesener MwSt.",
      "Flexible Anpassung bei Urlaubszeiten oder Betriebsruhe",
    ],
    processSteps: [
      {
        number: "01",
        title: "Diskrete Besichtigung",
        description:
          "Wir analysieren Ihre Räume, Arbeitszeiten und Hygieneanforderungen direkt vor Ort.",
      },
      {
        number: "02",
        title: "Individuelles Leistungsverzeichnis",
        description:
          "Erstellung eines passgenauen Reinigungsplans mit festen Tagen, Uhrzeiten und transparentem Monatspreis.",
      },
      {
        number: "03",
        title: "Einarbeitung Stammpersonal",
        description:
          "Feste Mitarbeiter werden intensiv auf Ihre Räume und Sicherheitsvorgaben eingewiesen.",
      },
      {
        number: "04",
        title: "Dauerhafte Betreuung",
        description:
          "Regelmäßige Qualitätskontrollen garantieren dauerhaft erstklassige Sauberkeit.",
      },
    ],
    faqs: [
      {
        question: "Können Sie außerhalb unserer Geschäftszeiten reinigen?",
        answer:
          "Selbstverständlich! Der Großteil unserer gewerblichen Kunden wird frühmorgens vor 08:00 Uhr oder abends ab 17:00 Uhr sowie an Samstagen betreut.",
      },
      {
        question: "Wie ist der Versicherungsschutz bei teurem Büro-Equipment?",
        answer:
          "Tadiks ist umfassend gewerblich haftpflichtversichert für Schlüsselverlust, Bearbeitungsschäden und Büro-Equipment.",
      },
    ],
    relatedSlugs: ["unterhaltsreinigung", "grundreinigung", "fensterreinigung"],
  },

  // ==========================================
  // 6. REINIGUNG: POLSTERREINIGUNG
  // ==========================================
  {
    id: "polsterreinigung",
    slug: "polsterreinigung",
    aliases: ["dry-cleaning"],
    category: "reinigung",
    categoryLabel: "Gebäudereinigung",
    title: "Polster- & Teppichreinigung",
    subtitle: "Fasertiefe Nassreinigung & Geruchsneutralisation mit Sprühextraktion",
    heroHeadline: "Frische und Hygiene für Sofas, Sessel und Teppiche.",
    heroDescription:
      "Tiefenwirksame Reinigung direkt bei Ihnen vor Ort in Chemnitz. Wir beseitigen eingetrocknete Flecken von Kaffee, Rotwein oder Haustieren, vernichten Milben und neutralisieren störende Gerüche nachhaltig.",
    priceNote: "ab 45 € pro Sitzplatz / ab 8 € pro m² Teppich",
    durationNote: "ca. 1,5–3 Stunden vor Ort (Trocknung ca. 4–8 Std.)",
    imageSrc: "/images/leistungen_reinigung_2.jpg",
    imageAlt: "Polster- und Teppichreinigung in Chemnitz",
    popular: false,
    featuresTitle: "Was leistet unsere Sprühextraktion?",
    features: [
      "Faserschonende Vorbehandlung hartnäckiger Flecken und Ränder",
      "Tiefenwirksame Nass-Sprühextraktion mit hohem Arbeitsdruck",
      "Entfernung von Milben, Allergenen, Bakterien und Feinstaub",
      "Biologische Geruchsneutralisation (Haustier-, Rauch- und Schweißgerüche)",
      "Gewebeschonende Faseraufrichtung und Auffrischung der Farben",
      "Schützende Faserimprägnierung gegen rasche Wiederanschmutzung",
    ],
    includedTitle: "Profi-Technik vor Ort",
    included: [
      "Leistungsstarke Kärcher Sprühextraktionsgeräte mit Turbodüse",
      "Biologisch abbaubare Spezialkonzentrate (allergiker- & haustierfreundlich)",
      "Farbechtheits- und Materialtest an verdeckter Stelle",
      "Kein Transportaufwand: Wir reinigen direkt bei Ihnen zu Hause oder im Büro",
    ],
    processSteps: [
      {
        number: "01",
        title: "Materialprüfung",
        description:
          "Wir prüfen die Faserzusammensetzung (Naturfaser, Synthetik, Mischgewebe) und testen die Farbechtheit.",
      },
      {
        number: "02",
        title: "Fleckenvorbehandlung",
        description:
          "Hartnäckige Flecken werden mit materialschonenden Speziallösern vorbehandelt.",
      },
      {
        number: "03",
        title: "Tiefensprühextraktion",
        description:
          "Das Reinigungskonzentrat wird tief in die Faser gesprüht und im selben Arbeitsgang samt Schmutz kraftvoll abgesaugt.",
      },
      {
        number: "04",
        title: "Faserversiegelung & Trocknung",
        description:
          "Auf Wunsch tragen wir einen Nässeschutz auf. Nach 4–8 Stunden ist das Möbelstück wieder vollständig trocken und nutzbar.",
      },
    ],
    faqs: [
      {
        question: "Muss das Sofa dafür transportiert werden?",
        answer:
          "Nein! Wir bringen unsere mobilen Hochleistungsgeräte direkt zu Ihnen und reinigen Polster und Teppichböden bequem vor Ort.",
      },
      {
        question: "Wie lange dauert es, bis die Polster trocken sind?",
        answer:
          "Dank der starken Saugleistung unserer Kärcher-Geräte wird 90% der Feuchtigkeit sofort wieder abgesaugt. Die Resttrocknung dauert bei normaler Raumtemperatur lediglich ca. 4 bis 8 Stunden.",
      },
    ],
    relatedSlugs: ["unterhaltsreinigung", "grundreinigung", "bueroreinigung"],
  },

  // ==========================================
  // 7. BAU: TROCKENBAU & INNENAUSBAU
  // ==========================================
  {
    id: "trockenbau",
    slug: "trockenbau-innenausbau",
    aliases: ["trockenbau"],
    category: "bau",
    categoryLabel: "Bau & Innenausbau",
    title: "Trockenbau & Innenausbau",
    subtitle: "DIN-gerechte Wand- und Deckensysteme, Schallschutz und Raumtrennung",
    heroHeadline: "Präziser Trockenbau nach Meister-Standard.",
    heroDescription:
      "Flexible Raumaufteilung, Akustikdecken, Trennwände und Dachgeschossausbau für Wohn- und Gewerbeobjekte in Chemnitz und Umgebung. Mit Rotationslaser-Präzision, geprüftem Schallschutz und makelloser Spachtelung bis Q4.",
    priceNote: "Verbindliches Festpreisangebot nach kostenloser Besichtigung",
    durationNote: "Termingerecht nach Bauzeitenplan",
    imageSrc: "/images/service_grid_trockenbau.webp",
    imageAlt: "Trockenbau und Akustikdecken in Chemnitz",
    popular: true,
    featuresTitle: "Leistungen im modernen Trockenbau",
    features: [
      "Errichtung nichttragender Ständerwerkwände aus Metallprofilen und Gipskarton",
      "Abgehängte Decken, Akustikdecken und elegante Lichtvouten",
      "Vollständiger Dachgeschossausbau inkl. Dämmung und Dampfsperre",
      "Feuchtraum-Installationswände für Bäder und Sanitärräume",
      "Brand- und Schallschutzverkleidungen nach DIN 4102 und DIN 4109",
      "Fugenspachtelung von Q1 (Basis) bis zur streiflichtfreien Edelstufe Q4",
    ],
    includedTitle: "Material- & Handwerksqualität",
    included: [
      "Markenbaustoffe von Knauf, Rigips und Saint-Gobain",
      "Millimetergenaue Ausrichtung mit modernen Rotationslasern",
      "Saubere Baustelle mit Staubschutzwänden und täglichem Aufräumen",
      "Bauleitung und Gewährleistung nach VOB / BGB",
    ],
    processSteps: [
      {
        number: "01",
        title: "Aufmaß vor Ort",
        description:
          "Wir prüfen die räumlichen Gegebenheiten, Statik und Deckenanschlüsse direkt auf Ihrer Baustelle.",
      },
      {
        number: "02",
        title: "Detailliertes Festpreisangebot",
        description:
          "Sie erhalten ein transparentes Angebot mit Aufschlüsselung von Unterkonstruktion, Beplankung und Spachtelstufe.",
      },
      {
        number: "03",
        title: "Montage & Beplankung",
        description:
          "Unsere erfahrenen Trockenbauer montieren Profile, Dämmung und Gipskartonplatten millimetergenau.",
      },
      {
        number: "04",
        title: "Präzisions-Finish",
        description:
          "Fugen und Schrauben werden nach gewünschter Qualitätsstufe gespachtelt und geschliffen – bereit für Maler oder Fliesen.",
      },
    ],
    faqs: [
      {
        question: "Welche Vorteile bietet Trockenbau gegenüber herkömmlichem Mauerwerk?",
        answer:
          "Trockenbau ist extrem schnell montiert, bringt keinerlei Baufeuchte ins Haus, ist statisch leicht und bietet durch Hohlraumdämmung exzellente Schall- und Wärmedämmwerte.",
      },
      {
        question: "Was bedeutet die Spachtelstufe Q3 bzw. Q4?",
        answer:
          "Q3 beinhaltet ein breites Ausspachteln der Fugen für matte Anstriche. Q4 ist eine vollflächige Glättung der gesamten Wand für anspruchsvolle Glattvliestapeten oder streiflichtbelastete Designer-Wände.",
      },
    ],
    relatedSlugs: ["maler-spachtelarbeiten", "renovierung-sanierung", "bodenleger-fliesenarbeiten"],
  },

  // ==========================================
  // 8. BAU: KOMPLETTSANIERUNG & RENOVIERUNG
  // ==========================================
  {
    id: "sanierung",
    slug: "renovierung-sanierung",
    aliases: ["sanierung", "komplettsanierung"],
    category: "bau",
    categoryLabel: "Bau & Innenausbau",
    title: "Komplettsanierung & Renovierung",
    subtitle: "Ganzheitliche Modernisierung von Wohnungen, Häusern und Gewerberäumen",
    heroHeadline: "Schlüsselfertige Sanierung aus einer Meisterhand.",
    heroDescription:
      "Vom Altbau bis zur Gewerbeimmobilie: Wir übernehmen die komplette Sanierung aus einer Hand. Wir koordinieren alle Gewerke, halten vereinbarte Fristen strikt ein und verwandeln sanierungsbedürftige Räume in moderne, werthaltige Wohlfühloasen.",
    priceNote: "Verbindliches Festpreisangebot mit Bauzeitenplan",
    durationNote: "Schlüsselfertig zum Fixtermin",
    imageSrc: "/images/service_grid_sanierung.webp",
    imageAlt: "Komplettsanierung und Altbaumodernisierung in Sachsen",
    popular: true,
    featuresTitle: "Gewerkeübergreifende Komplettleistungen",
    features: [
      "Komplettsanierung von Wohnungen, Ein- und Mehrfamilienhäusern",
      "Badezimmersanierung inkl. Sanitärvorbereitung, Abdichtung und Fliesen",
      "Erneuerung von Böden, Decken, Türen, Fenstern und Wandflächen",
      "Altbausanierung mit Erhalt historischer Stilelemente und Stuckarbeiten",
      "Energetische Modernisierung und effiziente Innendämmung",
      "Gewerbeumbau für moderne Büros, Arztpraxen und Kanzleien",
    ],
    includedTitle: "Unser Komplettservice-Vorteil",
    included: [
      "Ein persönlicher Bauleiter als fester Ansprechpartner in Chemnitz",
      "Keine Reibungsverluste oder Terminverzögerungen zwischen den Gewerken",
      "Verbindlicher Termin- und Zahlungsplan nach Baufortschritt",
      "Bauendreinigung vor der schlüsselfertigen Übergabe inklusive",
    ],
    processSteps: [
      {
        number: "01",
        title: "Erstberatung & Begehung",
        description:
          "Umfassende Bestandsaufnahme der Bausubstanz, Wünsche und Budgetvorgaben direkt vor Ort.",
      },
      {
        number: "02",
        title: "Planung & Festpreisvertrag",
        description:
          "Detaillierter Bauzeitenplan und transparenter Festpreisvertrag ohne unliebsame Überraschungen.",
      },
      {
        number: "03",
        title: "Gewerkekoordination",
        description:
          "Rückbau, Trockenbau, Elektrik, Sanitär, Fliesen und Malerarbeiten greifen nahtlos ineinander.",
      },
      {
        number: "04",
        title: "Schlüsselfertige Übergabe",
        description:
          "Gemeinsame Endabnahme mit Protokoll und feingereinigtem Objekt.",
      },
    ],
    faqs: [
      {
        question: "Muss ich mich selbst um verschiedene Handwerker kümmern?",
        answer:
          "Nein, genau das ist unser größter Vorteil: Tadiks übernimmt die komplette Koordination aller Gewerke. Sie haben nur einen einzigen verantwortlichen Bauleiter.",
      },
      {
        question: "Wie sicher ist der vereinbarte Fertigstellungstermin?",
        answer:
          "Wir arbeiten mit verbindlichen Bauzeitenplänen. Dank eigener eingespielter Teams vermeiden wir die üblichen Schnittstellenverzögerungen fremder Firmen.",
      },
    ],
    relatedSlugs: ["trockenbau-innenausbau", "maler-spachtelarbeiten", "bodenleger-fliesenarbeiten"],
  },

  // ==========================================
  // 9. BAU: MALER- & SPACHTELARBEITEN
  // ==========================================
  {
    id: "malerarbeiten",
    slug: "maler-spachtelarbeiten",
    aliases: ["malerarbeiten"],
    category: "bau",
    categoryLabel: "Bau & Innenausbau",
    title: "Maler- & Spachtelarbeiten",
    subtitle: "Perfekte Wand- und Deckenflächen, Q1–Q4 Qualitätsspachtelung und Farbkonzepte",
    heroHeadline: "Maler- & Spachteltechnik für anspruchsvolle Räume.",
    heroDescription:
      "Präzise Maler- und Tapezierarbeiten für Innenräume in Chemnitz. Ob emissionsarme Dispersions- oder Silikatfarben, Glattvlies oder streiflichtfreie Q4-Spachtelung – wir schaffen samtweiche, makellose Wandflächen.",
    priceNote: "Transparente m²-Preise / kostenfreie Vor-Ort-Kalkulation",
    durationNote: "Termingerecht und sauber",
    imageSrc: "/images/service_grid_maler.webp",
    imageAlt: "Maler- und Spachtelarbeiten in Chemnitz",
    popular: false,
    featuresTitle: "Leistungsspektrum Maler- & Spachteltechnik",
    features: [
      "Flächenspachtelung von Q1 (Grundspachtel) bis Q4 (streiflichtfreie Luxusstufe)",
      "Streichen von Wänden und Decken mit emissionsarmen Qualitätsfarben (Caparol, Brillux)",
      "Tapezierarbeiten: Glattvlies, Renoviervlies, Vliestapeten und Raufaser",
      "Lackieren von Innentüren, Zargen, Fenstern und Heizkörpern",
      "Schimmel- und Nikotinsperranstriche sowie diffusionsoffene Silikatfarben",
      "Staubarmes Schleifen mit Hochleistungs-Schleifgiraffen und Absaugung",
    ],
    includedTitle: "Sauberkeits- & Qualitätsgarantie",
    included: [
      "Vollständiges Abkleben und Schützen aller Böden, Fenster und Möbel",
      "Geruchsneutrale, allergikergeeignete Profi-Farben (VOC-frei)",
      "Exakte Farbtonberatung direkt bei Ihnen vor Ort",
      "Gründliche Schlussreinigung der Baustelle",
    ],
    processSteps: [
      {
        number: "01",
        title: "Farb- & Oberflächenberatung",
        description:
          "Wir begutachten Untergründe, Lichtverhältnisse und beraten zu passenden Farbtönen und Spachtelqualitäten.",
      },
      {
        number: "02",
        title: "Sorgfältige Vorbereitung",
        description:
          "Böden und Einbauten werden lückenlos mit Schutzvlies abgeklebt, Risse und Unebenheiten grundiert.",
      },
      {
        number: "03",
        title: "Spachteln & Anstrich",
        description:
          "Maschinelles Schleifen mit Absaugung und gleichmäßiger Anstrich mit hochwertigen Roll- und Spritztechniken.",
      },
      {
        number: "04",
        title: "Lichtprüfung & Übergabe",
        description:
          "Prüfung der Wandflächen bei Tages- und Streiflicht auf absolute Gleichmäßigkeit.",
      },
    ],
    faqs: [
      {
        question: "Welche Farbe eignet sich am besten für Allergiker?",
        answer:
          "Wir empfehlen mineralische Silikatfarben. Sie sind frei von Konservierungsstoffen, Weichmachern und Lösemitteln, hoch atmungsaktiv und wirken auf natürliche Weise antibakteriell und schimmelhemmend.",
      },
      {
        question: "Wie wird verhindert, dass Schleifstaub die Wohnung verschmutzt?",
        answer:
          "Unsere Schleifmaschinen sind direkt mit HEPA-Industriesaugern gekoppelt, sodass der Staub unmittelbar an der Wand abgesaugt wird.",
      },
    ],
    relatedSlugs: ["trockenbau-innenausbau", "bodenleger-fliesenarbeiten", "renovierung-sanierung"],
  },

  // ==========================================
  // 10. BAU: BODENLEGER- & FLIESENARBEITEN
  // ==========================================
  {
    id: "bodenleger",
    slug: "bodenleger-fliesenarbeiten",
    aliases: ["bodenleger"],
    category: "bau",
    categoryLabel: "Bau & Innenausbau",
    title: "Bodenleger- & Fliesenarbeiten",
    subtitle: "Fachgerechte Verlegung von Vinyl, Parkett, Laminat und Fliesen",
    heroHeadline: "Bodenbeläge & Fliesen mit millimetergenauer Fuge.",
    heroDescription:
      "Ein solider Boden ist das Fundament jedes Raumes. Wir bereiten den Estrich fachgerecht vor (Nivellieren, Schleifen, Grundieren) und verlegen Design-Vinyl, Echtholzparkett sowie moderne Wand- und Bodenfliesen mit höchster Präzision.",
    priceNote: "Transparente m²-Staffelung nach Belagsart",
    durationNote: "Zügige und fachgerechte Ausführung",
    imageSrc: "/images/service_bau_card.jpg",
    imageAlt: "Bodenleger und Fliesenarbeiten in Sachsen",
    popular: false,
    featuresTitle: "Leistungen im Boden- & Fliesenbereich",
    features: [
      "Untergrundvorbereitung: Fräsen, Schleifen, Rissverharzung und Nivellierung",
      "Verlegung von Klick-Vinyl und vollflächig verklebtem Designbelag",
      "Verlegung von Echtholzparkett und Laminat inkl. Trittschalldämmung",
      "Fliesenarbeiten in Bad, Küche, Flur und Außenbereichen (auch Großformate)",
      "Montage passender Sockelleisten, Alu-Abschlussprofile und Silikonfugen",
      "Restfeuchte- und CM-Messung des Estrichs vor der Verlegung",
    ],
    includedTitle: "Material- & Fachstandards",
    included: [
      "Emissionsarme Verlegewerkstoffe (EC1-Plus zertifiziert)",
      "Modernste Schneidetechnik für exakte Fliesenkanten und saubere Gehrung",
      "Entfernung und fachgerechte Entsorgung von Altbelägen auf Wunsch",
      "Herstellerkonforme Verlegung mit voller Garantie",
    ],
    processSteps: [
      {
        number: "01",
        title: "Untergrundprüfung",
        description:
          "Wir prüfen Ebenheit, Festigkeit und Restfeuchte des Estrichs direkt vor Ort.",
      },
      {
        number: "02",
        title: "Materialauswahl",
        description:
          "Musterberatung für Vinyl, Parkett oder Fliesen passend zu Beanspruchung und Fußbodenheizung.",
      },
      {
        number: "03",
        title: "Fachgerechte Verlegung",
        description:
          "Egalisierung des Untergrunds und saubere Verlegung mit gleichmäßigem Fugenbild.",
      },
      {
        number: "04",
        title: "Sockel & Silikonfinish",
        description:
          "Montage der Leisten und elastische Versiegelung aller Dehnungs- und Randfugen.",
      },
    ],
    faqs: [
      {
        question: "Welcher Belag ist am besten für eine Fußbodenheizung?",
        answer:
          "Fliesen sowie vollflächig verklebtes Vinyl haben den geringsten Wärmedurchlasswiderstand und leiten die Wärme besonders energieeffizient in den Raum.",
      },
      {
        question: "Übernehmen Sie auch das Entfernen von alten Fliesen oder Teppichen?",
        answer:
          "Ja! Wir entfernen alte Teppichböden, Parkett oder Fliesenbeläge, fräsen Klebereste ab und entsorgen den Bauschutt fachgerecht.",
      },
    ],
    relatedSlugs: ["maler-spachtelarbeiten", "trockenbau-innenausbau", "renovierung-sanierung"],
  },

  // ==========================================
  // 11. BAU: ABBRUCH, ENTKERNUNG & RÜCKBAU
  // ==========================================
  {
    id: "abbruch",
    slug: "abbruch-entkernung",
    aliases: ["abbruch"],
    category: "bau",
    categoryLabel: "Bau & Innenausbau",
    title: "Abbruch, Entkernung & Rückbau",
    subtitle: "Saubere Entkernung, Demontage und umweltgerechte Bauschuttentsorgung",
    heroHeadline: "Staubarme Entkernung bereit für den Neubeginn.",
    heroDescription:
      "Vor dem Ausbau steht der fachgerechte Rückbau. Wir entkernen Räume und Gebäude schonend, entfernen nichttragende Wände, alte Fliesen, Sanitärobjekte und Decken und entsorgen Bauschutt sortenrein nach gesetzlichen Vorschriften.",
    priceNote: "Pauschalangebot nach Vor-Ort-Besichtigung",
    durationNote: "Zügiger Rückbau ohne Stillstand",
    imageSrc: "/images/service_grid_bauende.webp",
    imageAlt: "Staubarme Entkernung und Abbruch in Chemnitz",
    popular: false,
    featuresTitle: "Leistungen im Bereich Abbruch & Entkernung",
    features: [
      "Rückbau nichttragender Zwischenwände und Leichtbausysteme",
      "Abtragen alter Fliesenbeläge, Estriche und geklebter Bodenbeläge",
      "Demontage von Sanitäranlagen, Heizkörpern, Türen und Deckenabhängungen",
      "Staubschutzeinhausungen mit Unterdruck-Luftreinigern und HEPA-Filtern",
      "Sortenreine Wertstofftrennung (Bauschutt, Holz, Metall, Gips)",
      "Containergestellung und ordnungsgemäße Entsorgung mit Entsorgungsnachweis",
    ],
    includedTitle: "Sicherheits- & Umweltschutz",
    included: [
      "Umfassender Objektschutz für Flure, Treppenhäuser und Nachbarräume",
      "Emissionsarme Maschinen für lärm- und erschütterungsreduziertes Arbeiten",
      "Entsorgung ausschließlich über zertifizierte Entsorgungsfachbetriebe",
      "Besenreine Übergabe bereit für Trockenbau und Sanierung",
    ],
    processSteps: [
      {
        number: "01",
        title: "Vor-Ort-Begehung",
        description:
          "Prüfung der Statik, Leitungsführung und Zugangswege für den Abtransport.",
      },
      {
        number: "02",
        title: "Schutzmaßnahmen einrichten",
        description:
          "Aufbau von Staubschutztüren, Abkleben von Laufwegen und Installation von Luftreinigern.",
      },
      {
        number: "03",
        title: "Schonender Rückbau",
        description:
          "Gezielte Demontage ohne Erschütterung tragender Bauteile.",
      },
      {
        number: "04",
        title: "Besenreine Übergabe",
        description:
          "Sortenreine Entsorgung im Container und besenreine Übergabe an Bauherren oder Nachfolgegewerke.",
      },
    ],
    faqs: [
      {
        question: "Wie wird verhindert, dass Baustaub in bewohnte Räume gelangt?",
        answer:
          "Wir setzen mobile Staubschutzwände mit Reißverschlusstüren und moderne Unterdruck-Luftreiniger ein, die den Staub direkt am Entstehungsort aus der Luft filtern.",
      },
      {
        question: "Dürfen Sie auch tragende Wände abreißen?",
        answer:
          "Wir führen den Abbruch nichttragender Wände durch. Bei tragenden Wänden ist ein statisches Gutachten und ein Stahlträger-Einbau erforderlich, den wir gern in Abstimmung mit einem Statiker realisieren.",
      },
    ],
    relatedSlugs: ["trockenbau-innenausbau", "renovierung-sanierung", "bodenleger-fliesenarbeiten"],
  },
];

/**
 * Helper to find service by slug or alias
 */
export function getServiceDetailBySlug(slug: string): ServiceDetailData | undefined {
  const normalized = slug.toLowerCase().trim();
  return ALL_SERVICE_DETAILS.find(
    (s) =>
      s.slug.toLowerCase() === normalized ||
      s.id.toLowerCase() === normalized ||
      s.aliases?.some((a) => a.toLowerCase() === normalized)
  );
}

/**
 * Returns all slugs for static generation
 */
export function getAllServiceSlugs(): { slug: string }[] {
  const slugs = new Set<string>();
  for (const s of ALL_SERVICE_DETAILS) {
    slugs.add(s.slug);
    if (s.id !== s.slug) slugs.add(s.id);
    if (s.aliases) {
      for (const a of s.aliases) slugs.add(a);
    }
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}
