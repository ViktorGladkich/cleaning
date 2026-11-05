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
  /** Horizontal focus of the image, kept in frame on portrait screens. */
  imagePosition?: string;
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
    heroHeadline: "Unterhaltsreinigung nach Fachstandard.",
    heroDescription:
      "Kontinuierliche Werterhaltung und makellose Hygiene für Kanzleien, Praxen, Büros und Privathaushalte. Mit festem Stammpersonal, RKI-konformem 4-Farben-System und ökologischen Reinigern.",
    priceNote: "Individuelles Angebot nach Objektgröße & Turnus",
    durationNote: "Flexibel nach Turnus (täglich, wöchentlich, 14-tägig)",
    imageSrc: "/images/services/hero-unterhaltsreinigung.jpg",
    imageAlt: "Reinigungskräfte in einheitlicher Tadik's-Arbeitskleidung pflegen den Empfangsbereich einer Kanzlei",
    imagePosition: "43% center",
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
          "Ja! Nach § 35a EStG können bis zu 20% der ausgewiesenen Arbeitskosten als haushaltsnahe Dienstleistungen direkt von der Steuerschuld abgezogen werden.",
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
    heroHeadline: "Grundreinigung mit intensiver Tiefenwirkung.",
    heroDescription:
      "Die intensive Komplettreinigung für Wohnungen, Häuser und Gewerberäume. Wir entfernen hartnäckige Kalkablagerungen, Fettfilme, Wachsschichten und Verschmutzungen, die bei der normalen Reinigung unberührt bleiben.",
    priceNote: "Individuelles Angebot nach Fläche & Bedarf",
    durationNote: "ca. 4–7 Stunden durch unser Profi-Team",
    imageSrc: "/images/services/hero-grundreinigung.jpg",
    imageAlt: "Grundreinigung eines Natursteinbodens mit Einscheibenmaschine in einem historischen Saal in Sachsen",
    imagePosition: "45% center",
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
    priceNote: "Individuelles Angebot nach Bauabschnitt & Fläche",
    durationNote: "5–8 Stunden / termintreue Fertigstellung",
    imageSrc: "/images/services/hero-bauendreinigung.jpg",
    imageAlt: "Bauendreinigung in einem sanierten Altbau: Staubsaugen und Entfernen der Schutzfolie vom Fenster",
    imagePosition: "40% center",
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
    priceNote: "Individuelles Angebot für Privat & Gewerbe",
    durationNote: "ca. 1–3 Stunden vor Ort",
    imageSrc: "/images/services/hero-fensterreinigung.jpg",
    imageAlt: "Fensterreinigung an einer Gründerzeitfassade mit Teleskopstange und Reinstwasser",
    imagePosition: "49% center",
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
    priceNote: "Maßgeschneiderte Kalkulation nach Leistungsverzeichnis",
    durationNote: "Nach Vereinbarung (frühmorgens, abends, Wochenende)",
    imageSrc: "/images/services/hero-bueroreinigung.jpg",
    imageAlt: "Büroreinigung nach Feierabend in einem Großraumbüro mit Blick über die Stadt",
    imagePosition: "38% center",
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
    priceNote: "Individuelles Angebot nach Polster- & Teppichfläche",
    durationNote: "ca. 1,5–3 Stunden vor Ort (Trocknung ca. 4–8 Std.)",
    imageSrc: "/images/services/hero-polsterreinigung.jpg",
    imageAlt: "Polsterreinigung eines hellen Sofas im Sprühextraktionsverfahren in einer Altbauwohnung",
    imagePosition: "40% center",
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
    heroHeadline: "Präziser Trockenbau nach Fachstandard.",
    heroDescription:
      "Flexible Raumaufteilung, Akustikdecken, Trennwände und Dachgeschossausbau für Wohn- und Gewerbeobjekte in Chemnitz und Umgebung. Mit Rotationslaser-Präzision und geprüftem Schallschutz.",
    priceNote: "Verbindliches Angebot nach Vor-Ort-Aufmaß",
    durationNote: "Termingerecht nach Bauzeitenplan",
    imageSrc: "/images/services/hero-trockenbau-innenausbau.jpg",
    imageAlt: "Montage einer Gipskartonplatte auf dem Metallständerwerk beim Dachausbau eines Altbaus",
    imagePosition: "53% center",
    popular: true,
    featuresTitle: "Leistungen im modernen Trockenbau",
    features: [
      "Errichtung nichttragender Ständerwerkwände aus Metallprofilen und Gipskarton",
      "Abgehängte Decken, Akustikdecken und elegante Lichtvouten",
      "Vollständiger Dachgeschossausbau inkl. Dämmung und Dampfsperre",
      "Feuchtraum-Installationswände für Bäder und Sanitärräume",
      "Brand- und Schallschutzverkleidungen nach DIN 4102 und DIN 4109",
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
          "Sie erhalten ein transparentes Angebot mit Aufschlüsselung von Unterkonstruktion und Beplankung.",
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
          "Fugen und Schrauben werden sauber geschlossen und geschliffen – bereit für die weiteren Ausbauarbeiten.",
      },
    ],
    faqs: [
      {
        question: "Welche Vorteile bietet Trockenbau gegenüber herkömmlichem Mauerwerk?",
        answer:
          "Trockenbau ist extrem schnell montiert, bringt keinerlei Baufeuchte ins Haus, ist statisch leicht und bietet durch Hohlraumdämmung exzellente Schall- und Wärmedämmwerte.",
      },
    ],
    relatedSlugs: ["renovierung-sanierung", "abbruch-entkernung", "bauendreinigung"],
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
    heroHeadline: "Schlüsselfertige Sanierung aus einer Hand.",
    heroDescription:
      "Vom Altbau bis zur Gewerbeimmobilie: Wir übernehmen die komplette Sanierung aus einer Hand. Wir koordinieren alle Gewerke, halten vereinbarte Fristen strikt ein und verwandeln sanierungsbedürftige Räume in moderne, werthaltige Wohlfühloasen.",
    priceNote: "Individuelle Projektkalkulation mit Bauzeitenplan",
    durationNote: "Schlüsselfertig zum Fixtermin",
    imageSrc: "/images/services/hero-renovierung-sanierung.jpg",
    imageAlt: "Baubesprechung mit Plänen in einer leeren Gründerzeitwohnung vor der Sanierung",
    imagePosition: "47% center",
    popular: true,
    featuresTitle: "Gewerkeübergreifende Komplettleistungen",
    features: [
      "Komplettsanierung von Wohnungen, Ein- und Mehrfamilienhäusern",
      "Renovierung nach Mieterwechsel",
      "Vorbereitung von Immobilien für Verkauf oder Vermietung",
      "Altbausanierung mit Erhalt historischer Stilelemente",
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
          "Rückbau, Trockenbau und Bauendreinigung greifen nahtlos ineinander.",
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
          "Wir arbeiten mit verbindlichen Bauzeitenplänen und stimmen alle Arbeiten frühzeitig aufeinander ab.",
      },
    ],
    relatedSlugs: ["trockenbau-innenausbau", "abbruch-entkernung", "bauendreinigung"],
  },

  // ==========================================
  // 9. BAU: ABBRUCH, ENTKERNUNG & RÜCKBAU
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
    priceNote: "Individuelles Angebot nach Objektbesichtigung",
    durationNote: "Zügiger Rückbau ohne Stillstand",
    imageSrc: "/images/services/hero-abbruch-entkernung.jpg",
    imageAlt: "Entkernung einer ehemaligen Backstein-Fabrikhalle mit Schutzhelm, Atemschutz und Bauschuttcontainer",
    imagePosition: "40% center",
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
      "Entsorgung ausschließlich über geprüfte Entsorgungsfachbetriebe",
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
          "Wir führen den Abbruch nichttragender Wände durch. Für tragende Wände sind ein statisches Gutachten und ein dafür zugelassener Fachbetrieb erforderlich.",
      },
    ],
    relatedSlugs: ["trockenbau-innenausbau", "renovierung-sanierung", "bauendreinigung"],
  },

  // ==========================================
  // Carried over from the previous website: statements are limited to what it
  // already said (see assets/old-site-text), so that ranking pages keep their topic.
  // ==========================================
  {
    id: "hotelreinigung",
    slug: "hotelreinigung",
    category: "reinigung",
    categoryLabel: "Gebäudereinigung",
    title: "Hotelreinigung",
    subtitle: "Saubere Zimmer und gepflegte Empfangsbereiche für Hotels, Pensionen und Ferienunterkünfte",
    heroHeadline: "Hotelreinigung für einen perfekten ersten Eindruck.",
    heroDescription:
      "Ihr zuverlässiger Partner für professionelle Hotelreinigung in Chemnitz und Umgebung: diskret, flexibel und mit festen Ansprechpartnern, egal ob tägliche Zimmerreinigung oder Reinigung nach Gästewechsel.",
    priceNote: "Individuelles Angebot nach Objektgröße & Turnus",
    durationNote: "Flexibel nach Belegung und Gästewechsel",
    imageSrc: "/images/services/hero-hotelreinigung.jpg",
    imageAlt: "Hotelreinigung: frische Bettwäsche und Spiegelpflege in einem Hotelzimmer mit Blick auf Dresden",
    imagePosition: "37% center",
    featuresTitle: "Was gehört zur Hotelreinigung?",
    features: [
      "Tägliche Zimmerreinigung",
      "Reinigung nach Gästewechsel",
      "Hygienische Reinigung der Sanitärbereiche",
      "Pflege der Empfangsbereiche",
      "Unterhaltsreinigung und Grundreinigung",
    ],
    includedTitle: "Darauf können Sie sich verlassen",
    included: [
      "Feste Ansprechpartner",
      "Schnelle Reaktionszeiten",
      "Diskretes und flexibles Arbeiten",
      "Professionelle Arbeitsabläufe",
    ],
    processSteps: [
      {
        number: "01",
        title: "Anfrage",
        description: "Sie schildern uns kurz Ihr Haus und den gewünschten Reinigungsumfang.",
      },
      {
        number: "02",
        title: "Rückmeldung",
        description: "Wir melden uns innerhalb von 24 Stunden und klären die Details für Ihr unverbindliches Angebot.",
      },
      {
        number: "03",
        title: "Abstimmung",
        description: "Reinigungszeiten und Abläufe stimmen wir auf Ihre Belegung und den Gästewechsel ab.",
      },
      {
        number: "04",
        title: "Ausführung",
        description: "Unser Team arbeitet diskret, und Ihr fester Ansprechpartner bleibt für Sie erreichbar.",
      },
    ],
    faqs: [
      {
        question: "Für welche Betriebe bieten Sie Hotelreinigung an?",
        answer:
          "Wir arbeiten für Hotels, Pensionen und Ferienunterkünfte in Chemnitz und Umgebung.",
      },
      {
        question: "Übernehmen Sie auch die Reinigung nach dem Gästewechsel?",
        answer:
          "Ja. Neben der täglichen Zimmerreinigung übernehmen wir auch die Reinigung nach Gästewechsel sowie die Unterhalts- und Grundreinigung.",
      },
    ],
    relatedSlugs: ["unterhaltsreinigung", "grundreinigung", "polsterreinigung"],
  },
  {
    id: "treppenhausreinigung",
    slug: "treppenhausreinigung",
    category: "reinigung",
    categoryLabel: "Gebäudereinigung",
    title: "Treppenhausreinigung",
    subtitle: "Gepflegte Eingangsbereiche, Treppenstufen und Aufzüge für Wohnanlagen und Gewerbe",
    heroHeadline: "Treppenhausreinigung für den ersten Eindruck.",
    heroDescription:
      "Das Treppenhaus ist der erste Eindruck für Bewohner, Mieter und Besucher. Wir sorgen dafür, dass Eingangsbereiche, Treppenstufen, Geländer und Aufzüge stets einladend und gepflegt wirken.",
    priceNote: "Individuelles Angebot nach Objekt & Intervall",
    durationNote: "In regelmäßigen, zuverlässigen Intervallen",
    imageSrc: "/images/services/hero-treppenhausreinigung.jpg",
    imageAlt: "Treppenhausreinigung in einem Gründerzeithaus mit Terrazzoboden und Holzgeländer",
    imagePosition: "47% center",
    featuresTitle: "Was gehört zur Treppenhausreinigung?",
    features: [
      "Regelmäßige Nassreinigung der Böden",
      "Wischen von Handläufen und Geländern",
      "Reinigung von Briefkastenanlagen und Eingangstüren",
      "Reinigung der Aufzugskabinen",
      "Winterdienst im Eingangsbereich",
    ],
    includedTitle: "Darauf können Sie sich verlassen",
    included: [
      "Feste Ansprechpartner",
      "Zuverlässige Reinigungsintervalle",
      "Betreuung von Wohnanlagen, Bürogebäuden und Gewerbeparks",
    ],
    processSteps: [
      {
        number: "01",
        title: "Anfrage",
        description: "Sie schildern uns kurz Ihr Objekt und das gewünschte Reinigungsintervall.",
      },
      {
        number: "02",
        title: "Rückmeldung",
        description: "Wir melden uns innerhalb von 24 Stunden und klären die Details für Ihr unverbindliches Angebot.",
      },
      {
        number: "03",
        title: "Abstimmung",
        description: "Umfang und Intervalle legen wir gemeinsam passend zu Ihrem Objekt fest.",
      },
      {
        number: "04",
        title: "Regelmäßige Reinigung",
        description: "Wir reinigen in den vereinbarten Intervallen, mit einem festen Ansprechpartner für Sie.",
      },
    ],
    faqs: [
      {
        question: "Welche Objekte betreuen Sie?",
        answer: "Wir betreuen Wohnanlagen, Bürogebäude und Gewerbeparks gleichermaßen.",
      },
      {
        question: "Gehört auch der Winterdienst dazu?",
        answer: "Unser Service umfasst auch den Winterdienst im Eingangsbereich.",
      },
    ],
    relatedSlugs: ["unterhaltsreinigung", "grundreinigung", "fensterreinigung"],
  },
  {
    id: "industrie-und-hallenreinigung",
    slug: "industrie-und-hallenreinigung",
    category: "reinigung",
    categoryLabel: "Gebäudereinigung",
    title: "Industrie- & Hallenreinigung",
    subtitle: "Leistungsstarke Reinigungstechnik für Produktion, Lager und Logistik",
    heroHeadline: "Industrie- und Hallenreinigung für große Flächen.",
    heroDescription:
      "Produktionshallen, Lagerflächen und Logistikzentren erfordern leistungsstarke Reinigungstechnik und erfahrene Teams. Wir reinigen Industrieflächen jeder Größe, von der kleinen Werkstatt bis zur Großhalle.",
    priceNote: "Individuelles Angebot nach Fläche & Verschmutzung",
    durationNote: "Nach Absprache mit Ihrem Betriebsablauf",
    imageSrc: "/images/services/hero-industrie-und-hallenreinigung.jpg",
    imageAlt: "Maschinelle Hallenreinigung mit Aufsitz-Scheuersaugmaschine in einer früheren Backsteinfabrik",
    imagePosition: "50% center",
    featuresTitle: "Was gehört zur Industrie- und Hallenreinigung?",
    features: [
      "Reinigung von Produktionshallen, Lagerflächen und Logistikzentren",
      "Entfernung von Öl, Fett, Produktionsrückständen und Staub",
      "Entfettung von Produktionsanlagen",
      "Reinigung nach Umbauten",
    ],
    includedTitle: "Unsere Ausstattung",
    included: [
      "Aufsitz-Scheuersaugmaschinen",
      "Hochdruckreiniger",
      "Industriesauger",
      "Spezialgeräte für die Maschinenreinigung",
    ],
    processSteps: [
      {
        number: "01",
        title: "Anfrage",
        description: "Sie schildern uns kurz Ihre Flächen und die Art der Verschmutzung.",
      },
      {
        number: "02",
        title: "Rückmeldung",
        description: "Wir melden uns innerhalb von 24 Stunden und klären die Details für Ihr unverbindliches Angebot.",
      },
      {
        number: "03",
        title: "Abstimmung",
        description: "Termine und Abläufe stimmen wir mit Ihrem Betrieb ab.",
      },
      {
        number: "04",
        title: "Ausführung",
        description: "Unser Team reinigt mit der passenden Technik und sorgt für saubere, sichere Arbeitsbedingungen.",
      },
    ],
    faqs: [
      {
        question: "Welche Flächengrößen reinigen Sie?",
        answer: "Wir reinigen Industrieflächen jeder Größe, von der kleinen Werkstatt bis zur Großhalle.",
      },
      {
        question: "Übernehmen Sie auch Sonderreinigungen?",
        answer:
          "Ja. Auch die Entfettung von Produktionsanlagen und die Reinigung nach Umbauten gehören zu unserem Leistungsspektrum.",
      },
    ],
    relatedSlugs: ["grundreinigung", "bauendreinigung", "unterhaltsreinigung"],
  },
  {
    id: "entruempelungen",
    slug: "entruempelungen",
    category: "reinigung",
    categoryLabel: "Gebäudereinigung",
    title: "Entrümpelungen",
    subtitle: "Wohnungsauflösung, Kellerentrümpelung und Geschäftsräumung: diskret und besenrein",
    heroHeadline: "Entrümpelung: diskret, schnell und besenrein.",
    heroDescription:
      "Ob Wohnungsauflösung, Kellerentrümpelung oder Geschäftsräumung: Wir übernehmen die komplette Entrümpelung und arbeiten diskret und respektvoll, auch in sensiblen Situationen wie Nachlassräumungen.",
    priceNote: "Individuelles Angebot nach Umfang",
    durationNote: "Termingerechter Abschluss nach Absprache",
    imageSrc: "/images/services/hero-entruempelungen.jpg",
    imageAlt: "Entrümpelung: Möbel und Umzugskartons werden vor einem Gründerzeithaus in den Transporter geladen",
    imagePosition: "42% center",
    featuresTitle: "Was gehört zur Entrümpelung?",
    features: [
      "Sichtung und Sortierung des Inventars",
      "Fachgerechter Abtransport",
      "Umweltgerechte Entsorgung",
      "Auf Wunsch anschließende Endreinigung der Räume",
    ],
    includedTitle: "Darauf können Sie sich verlassen",
    included: [
      "Diskretes und respektvolles Arbeiten",
      "Besenreine Übergabe",
      "Dokumentation aller Arbeiten",
      "Verwertbare Gegenstände werden nach Absprache gespendet oder recycelt",
    ],
    processSteps: [
      {
        number: "01",
        title: "Anfrage",
        description: "Sie schildern uns kurz die Räume und den Umfang der Entrümpelung.",
      },
      {
        number: "02",
        title: "Rückmeldung",
        description: "Wir melden uns innerhalb von 24 Stunden und klären die Details für Ihr unverbindliches Angebot.",
      },
      {
        number: "03",
        title: "Räumung",
        description: "Wir sichten und sortieren das Inventar, transportieren es ab und entsorgen es umweltgerecht.",
      },
      {
        number: "04",
        title: "Übergabe",
        description: "Sie erhalten die Räume besenrein zurück, auf Wunsch mit anschließender Endreinigung.",
      },
    ],
    faqs: [
      {
        question: "Was passiert mit verwertbaren Gegenständen?",
        answer: "Verwertbare Gegenstände werden nach Absprache gespendet oder recycelt.",
      },
      {
        question: "Übernehmen Sie auch Nachlassräumungen?",
        answer: "Ja. Wir arbeiten diskret und respektvoll, auch in sensiblen Situationen wie Nachlassräumungen.",
      },
    ],
    relatedSlugs: ["grundreinigung", "bauendreinigung", "unterhaltsreinigung"],
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
