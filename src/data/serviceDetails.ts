export interface ServiceDetailData {
  id: string;
  slug: string;
  aliases?: string[];
  category: "reinigung" | "bau";
  categoryLabel: string;
  /** Position in the overview, shown as "01", "02", … */
  number: string;
  title: string;
  /** One-line claim below the title. */
  subtitle: string;
  heroDescription: string;
  /** Label of the request button, e.g. "Büroreinigung anfragen". */
  ctaLabel: string;
  /** Value preselected in the contact form (see SERVICES_BY_CAT). */
  formService: string;
  priceNote: string;
  durationNote: string;
  imageSrc: string;
  imageAlt: string;
  /** Horizontal focus of the image, kept in frame on portrait screens. */
  imagePosition?: string;
  isNew?: boolean;
  /** Hero shows a real project photo instead of an AI-generated symbol image. */
  heroIsProjectPhoto?: boolean;
  /** Completed project shown with before/after photos. */
  reference?: {
    title: string;
    description: string;
    beforeSrc: string;
    beforeAlt: string;
    afterSrc: string;
    afterAlt: string;
  };
  featuresTitle: string;
  features: string[];
  /** Short remark below the scope list (conditions, limits). */
  scopeNote?: string;
  includedTitle: string;
  included: string[];
  processSteps: {
    number: string;
    title: string;
    description: string;
  }[];
  relatedSlugs: string[];
}

const CLEANING_INCLUDED = [
  "Persönlicher Ansprechpartner für Ihre Anfrage",
  "Umfang, Intervalle und Zeiten nach Vereinbarung",
  "Individuelles Angebot nach Abstimmung oder Besichtigung",
  "Einsatz in Chemnitz und Umgebung",
];

const BAU_INCLUDED = [
  "Persönlicher Ansprechpartner von der Anfrage bis zur Umsetzung",
  "Individuelle Prüfung Ihres Vorhabens",
  "Leistungsumfang und Ablauf nach Vereinbarung",
  "Umsetzung mit eigenem Team oder geeigneten Partnerunternehmen",
];

function cleaningSteps(visit: string, execution: string) {
  return [
    {
      number: "01",
      title: "Anfrage",
      description:
        "Sie schildern uns telefonisch oder über das Anfrageformular, welche Flächen gereinigt werden sollen.",
    },
    { number: "02", title: "Abstimmung", description: visit },
    {
      number: "03",
      title: "Angebot",
      description:
        "Sie erhalten ein individuell abgestimmtes Angebot mit dem vereinbarten Leistungsumfang.",
    },
    { number: "04", title: "Ausführung", description: execution },
  ];
}

function bauSteps(check: string, execution: string) {
  return [
    {
      number: "01",
      title: "Projektanfrage",
      description:
        "Sie beschreiben uns Ihr Vorhaben – gern mit Fotos, Plänen oder Leistungsverzeichnis.",
    },
    { number: "02", title: "Prüfung", description: check },
    {
      number: "03",
      title: "Angebot",
      description:
        "Wir stimmen Leistungsumfang, Zeitraum und nächste Schritte gemeinsam mit Ihnen ab.",
    },
    { number: "04", title: "Umsetzung", description: execution },
  ];
}

export const ALL_SERVICE_DETAILS: ServiceDetailData[] = [
  // ==========================================
  // REINIGUNG
  // ==========================================
  {
    id: "unterhaltsreinigung",
    slug: "unterhaltsreinigung",
    aliases: ["standard-cleaning", "commercial-cleaning"],
    category: "reinigung",
    categoryLabel: "Reinigung",
    number: "01",
    title: "Unterhalts- & Büroreinigung",
    subtitle: "Saubere Arbeitsplätze und gepflegte Geschäftsräume.",
    heroDescription:
      "Wir übernehmen die regelmäßige Reinigung von Büros, Verwaltungsflächen und gewerblich genutzten Räumen – abgestimmt auf Nutzung, Reinigungsintervalle und Objektanforderungen.",
    ctaLabel: "Büroreinigung anfragen",
    formService: "Unterhalts- & Büroreinigung",
    priceNote: "Individuelles Angebot nach Fläche und Intervall",
    durationNote: "Regelmäßig nach abgestimmtem Reinigungsplan",
    imageSrc: "/images/services/hero-bueroreinigung.jpg",
    imageAlt: "Büroreinigung nach Feierabend in einem Großraumbüro mit Blick über die Stadt",
    imagePosition: "38% center",
    featuresTitle: "Leistungsumfang der Unterhalts- & Büroreinigung",
    features: [
      "Reinigung von Büro- und Arbeitsbereichen",
      "Pflege von Böden und Oberflächen",
      "Reinigung von Sanitär- und Gemeinschaftsräumen",
      "Individuelle Reinigungspläne nach Vereinbarung",
    ],
    includedTitle: "Was Sie von uns erwarten können",
    included: CLEANING_INCLUDED,
    processSteps: cleaningSteps(
      "Wir besprechen Nutzung, Flächen, Intervalle und Zeiten – bei Bedarf bei einem Termin vor Ort.",
      "Die Reinigung erfolgt regelmäßig nach dem vereinbarten Reinigungsplan."
    ),
    relatedSlugs: ["grundreinigung", "fensterreinigung", "praxisreinigung"],
  },
  {
    id: "hotelreinigung",
    slug: "hotelreinigung",
    category: "reinigung",
    categoryLabel: "Reinigung",
    number: "02",
    title: "Hotelreinigung",
    subtitle: "Sauberkeit für einen überzeugenden Gästeeindruck.",
    heroDescription:
      "Wir unterstützen Hotels und Beherbergungsbetriebe bei der Reinigung und Pflege ihrer Räumlichkeiten. Umfang und Einsatzzeiten werden auf die Abläufe des Hauses abgestimmt.",
    ctaLabel: "Hotelreinigung anfragen",
    formService: "Hotelreinigung",
    priceNote: "Individuelles Angebot nach Haus und Umfang",
    durationNote: "Regelmäßig oder ergänzend nach Vereinbarung",
    imageSrc: "/images/services/hero-hotelreinigung.jpg",
    imageAlt: "Hotelreinigung: frische Bettwäsche und Spiegelpflege in einem Hotelzimmer",
    imagePosition: "37% center",
    featuresTitle: "Leistungsumfang der Hotelreinigung",
    features: [
      "Zimmer- und Apartmentreinigung nach Vereinbarung",
      "Reinigung von Fluren und Gemeinschaftsflächen",
      "Pflege von Sanitärbereichen",
      "Regelmäßige oder ergänzende Reinigungseinsätze",
    ],
    includedTitle: "Was Sie von uns erwarten können",
    included: CLEANING_INCLUDED,
    processSteps: cleaningSteps(
      "Wir besprechen Zimmerzahl, Abläufe und Einsatzzeiten Ihres Hauses.",
      "Die Reinigung erfolgt zu den vereinbarten Zeiten – regelmäßig oder als ergänzender Einsatz."
    ),
    relatedSlugs: ["unterhaltsreinigung", "grundreinigung", "fensterreinigung"],
  },
  {
    id: "fensterreinigung",
    slug: "fensterreinigung",
    aliases: ["window-cleaning", "glasreinigung"],
    category: "reinigung",
    categoryLabel: "Reinigung",
    number: "03",
    title: "Fenster- & Glasreinigung",
    subtitle: "Klare Sicht und gepflegte Glasflächen.",
    heroDescription:
      "Wir reinigen Glasflächen in privaten und gewerblichen Immobilien. Zugänglichkeit, Verschmutzung und Umfang prüfen wir vor der Angebotserstellung.",
    ctaLabel: "Glasreinigung anfragen",
    formService: "Fenster- & Glasreinigung",
    priceNote: "Angebot nach Prüfung von Fläche und Zugänglichkeit",
    durationNote: "Einmalig oder regelmäßig nach Vereinbarung",
    imageSrc: "/images/services/hero-fensterreinigung.jpg",
    imageAlt: "Fensterreinigung an einer Gründerzeitfassade mit Teleskopstange",
    imagePosition: "49% center",
    featuresTitle: "Leistungsumfang der Fenster- & Glasreinigung",
    features: [
      "Fenster und Glasflächen",
      "Glasflächen in Büro- und Gewerbeobjekten",
      "Glastrennwände und Eingangselemente",
      "Rahmen- und Falzreinigung nach Vereinbarung",
    ],
    includedTitle: "Was Sie von uns erwarten können",
    included: CLEANING_INCLUDED,
    processSteps: cleaningSteps(
      "Wir prüfen Zugänglichkeit, Verschmutzung und Umfang der Glasflächen.",
      "Die Glasflächen werden im vereinbarten Umfang gereinigt – einmalig oder regelmäßig."
    ),
    relatedSlugs: ["unterhaltsreinigung", "fassadenreinigung", "haushaltsreinigung"],
  },
  {
    id: "grundreinigung",
    slug: "grundreinigung",
    aliases: ["deep-cleaning", "sonderreinigung"],
    category: "reinigung",
    categoryLabel: "Reinigung",
    number: "04",
    title: "Grund- & Sonderreinigung",
    subtitle: "Intensive Reinigung bei besonderem Bedarf.",
    heroDescription:
      "Für stärker beanspruchte Räume und besondere Reinigungssituationen bieten wir individuell geplante Grund- und Sonderreinigungen an. Das Verfahren richten wir nach Material und Verschmutzung aus.",
    ctaLabel: "Grundreinigung anfragen",
    formService: "Grund- & Sonderreinigung",
    priceNote: "Angebot nach Besichtigung",
    durationNote: "Einmaliger Einsatz nach Terminabsprache",
    imageSrc: "/images/services/hero-grundreinigung.jpg",
    imageAlt: "Grundreinigung eines Natursteinbodens mit Einscheibenmaschine in einem historischen Saal",
    imagePosition: "45% center",
    featuresTitle: "Leistungsumfang der Grund- & Sonderreinigung",
    features: [
      "Intensivreinigung von Bodenflächen",
      "Reinigung schwer zugänglicher Bereiche",
      "Reinigung nach längerer Nutzung oder Leerstand",
      "Einmalige Sonderreinigungen nach Besichtigung",
    ],
    includedTitle: "Was Sie von uns erwarten können",
    included: CLEANING_INCLUDED,
    processSteps: cleaningSteps(
      "Wir sehen uns Material und Verschmutzung an und legen das passende Vorgehen fest.",
      "Die Grund- oder Sonderreinigung erfolgt zum vereinbarten Termin."
    ),
    relatedSlugs: ["bauendreinigung", "unterhaltsreinigung", "haushaltsreinigung"],
  },
  {
    id: "bauendreinigung",
    slug: "bauendreinigung",
    aliases: ["post-construction"],
    category: "reinigung",
    categoryLabel: "Reinigung",
    number: "05",
    title: "Bauendreinigung",
    subtitle: "Saubere Übergabe nach Bau- und Renovierungsarbeiten.",
    heroDescription:
      "Nach Umbau, Renovierung oder Neubau unterstützen wir bei der Entfernung baubedingter Verschmutzungen und bereiten die vereinbarten Bereiche für die Nutzung oder Übergabe vor.",
    ctaLabel: "Bauendreinigung anfragen",
    formService: "Bauendreinigung",
    priceNote: "Angebot nach Fläche und Bauzustand",
    durationNote: "Bauzwischen- oder Bauendreinigung nach Bedarf",
    imageSrc: "/images/services/hero-bauendreinigung.jpg",
    imageAlt: "Bauendreinigung in einem sanierten Altbau: Staubsaugen und Entfernen der Schutzfolie vom Fenster",
    imagePosition: "40% center",
    featuresTitle: "Leistungsumfang der Bauendreinigung",
    features: [
      "Entfernung von Staub und üblichen Bauresten",
      "Reinigung von Oberflächen und Böden",
      "Reinigung von Fenstern und Sanitärbereichen nach Vereinbarung",
      "Bauzwischen- und Bauendreinigung je nach Bedarf",
    ],
    includedTitle: "Was Sie von uns erwarten können",
    included: CLEANING_INCLUDED,
    processSteps: cleaningSteps(
      "Wir klären Bauzustand, Flächen und den gewünschten Übergabetermin.",
      "Die vereinbarten Bereiche werden für die Nutzung oder Übergabe vorbereitet."
    ),
    relatedSlugs: ["grundreinigung", "fensterreinigung", "trockenbau-innenausbau"],
  },
  {
    id: "treppenhausreinigung",
    slug: "treppenhausreinigung",
    category: "reinigung",
    categoryLabel: "Reinigung",
    number: "06",
    title: "Treppenhausreinigung",
    subtitle: "Gepflegte Gemeinschaftsbereiche für Ihre Immobilie.",
    heroDescription:
      "Wir reinigen Treppenhäuser und gemeinschaftlich genutzte Flächen in Wohn- und Gewerbeobjekten nach einem abgestimmten Turnus.",
    ctaLabel: "Treppenhausreinigung anfragen",
    formService: "Treppenhausreinigung",
    priceNote: "Individuelles Angebot nach Objekt und Turnus",
    durationNote: "Regelmäßig nach Objektplan",
    imageSrc: "/images/services/hero-treppenhausreinigung.jpg",
    imageAlt: "Treppenhausreinigung in einem Gründerzeithaus mit Terrazzoboden und Holzgeländer",
    imagePosition: "47% center",
    featuresTitle: "Leistungsumfang der Treppenhausreinigung",
    features: [
      "Treppen, Podeste und Flure",
      "Handläufe und erreichbare Kontaktflächen",
      "Eingangsbereiche",
      "Regelmäßige Reinigung nach Objektplan",
    ],
    includedTitle: "Was Sie von uns erwarten können",
    included: CLEANING_INCLUDED,
    processSteps: cleaningSteps(
      "Wir besprechen Objekt, Etagen und den gewünschten Reinigungsturnus.",
      "Die Reinigung erfolgt regelmäßig nach dem abgestimmten Objektplan."
    ),
    relatedSlugs: ["unterhaltsreinigung", "fensterreinigung", "grundreinigung"],
  },
  {
    id: "praxisreinigung",
    slug: "praxisreinigung",
    aliases: ["praxis-und-hygienereinigung"],
    category: "reinigung",
    categoryLabel: "Reinigung",
    number: "07",
    title: "Praxisreinigung",
    subtitle: "Sorgfältige Reinigung von Praxisräumen.",
    heroDescription:
      "Wir übernehmen vereinbarte Reinigungsarbeiten in Praxis- und Behandlungsumgebungen unter Berücksichtigung der objektspezifischen Vorgaben. Hygienisch sensible Spezialleistungen werden nur angeboten, soweit die notwendigen Voraussetzungen vorliegen.",
    ctaLabel: "Praxisreinigung anfragen",
    formService: "Praxisreinigung",
    priceNote: "Individuelles Angebot nach Praxis und Vorgaben",
    durationNote: "Regelmäßig nach abgestimmtem Plan",
    imageSrc: "/images/services/hero-unterhaltsreinigung.jpg",
    imageAlt: "Reinigungskräfte in einheitlicher Tadik's-Arbeitskleidung pflegen einen Empfangsbereich",
    imagePosition: "43% center",
    featuresTitle: "Leistungsumfang der Praxisreinigung",
    features: [
      "Warte- und Empfangsbereiche",
      "Böden und Oberflächen",
      "Sanitär- und Nebenräume",
      "Reinigungsabläufe nach abgestimmtem Plan",
    ],
    scopeNote:
      "Hygienisch sensible Spezialleistungen bieten wir nur an, soweit die notwendigen Voraussetzungen vorliegen. Bitte nennen Sie uns die Vorgaben Ihrer Praxis.",
    includedTitle: "Was Sie von uns erwarten können",
    included: CLEANING_INCLUDED,
    processSteps: cleaningSteps(
      "Wir besprechen Räume, Praxiszeiten und die objektspezifischen Vorgaben.",
      "Die Reinigung erfolgt nach dem abgestimmten Plan außerhalb oder während der Praxiszeiten."
    ),
    relatedSlugs: ["unterhaltsreinigung", "grundreinigung", "fensterreinigung"],
  },
  {
    id: "haushaltsreinigung",
    slug: "haushaltsreinigung",
    aliases: ["privatreinigung"],
    category: "reinigung",
    categoryLabel: "Reinigung",
    number: "08",
    title: "Haushaltsreinigung",
    subtitle: "Mehr Zeit im Alltag durch zuverlässige Unterstützung.",
    heroDescription:
      "Wir bieten regelmäßige und einmalige Reinigungsleistungen für private Haushalte an. Umfang und Häufigkeit vereinbaren wir individuell.",
    ctaLabel: "Haushaltsreinigung anfragen",
    formService: "Haushaltsreinigung",
    priceNote: "Individuelles Angebot nach Umfang",
    durationNote: "Regelmäßig oder einmalig nach Vereinbarung",
    imageSrc: "/images/services/hero-polsterreinigung.jpg",
    imageAlt: "Reinigung einer hellen Altbauwohnung: Fenster, Wohnbereich und Polstermöbel",
    imagePosition: "40% center",
    featuresTitle: "Leistungsumfang der Haushaltsreinigung",
    features: [
      "Wohnungs- und Hausreinigung",
      "Küche, Bad und Wohnbereiche",
      "Fensterreinigung nach Vereinbarung",
      "Grundreinigung bei besonderem Bedarf",
    ],
    includedTitle: "Was Sie von uns erwarten können",
    included: CLEANING_INCLUDED,
    processSteps: cleaningSteps(
      "Wir besprechen, welche Räume gereinigt werden sollen und wie häufig.",
      "Die Reinigung erfolgt regelmäßig oder einmalig zum vereinbarten Termin."
    ),
    relatedSlugs: ["fensterreinigung", "grundreinigung", "treppenhausreinigung"],
  },
  {
    id: "fassadenreinigung",
    slug: "fassadenreinigung",
    aliases: ["aussenreinigung", "fassaden-und-aussenreinigung"],
    category: "reinigung",
    categoryLabel: "Reinigung",
    number: "09",
    title: "Fassaden- & Außenreinigung",
    subtitle: "Großflächige Fassadenreinigung für Industrie und Gewerbe.",
    heroDescription:
      "TADIK’S Cleaning übernimmt nach individueller Prüfung die Reinigung von Gebäudefassaden, Industriehallen und gewerblichen Außenflächen. Wir haben bereits eine komplette Industriehallenfassade unter Einsatz einer Hubarbeitsbühne gereinigt. Verfahren und Zugangstechnik werden passend zum Objekt geplant.",
    ctaLabel: "Fassadenreinigung anfragen",
    formService: "Fassaden- & Außenreinigung",
    priceNote: "Angebot nach individueller Prüfung des Objekts",
    durationNote: "Verfahren und Zugangstechnik passend zum Objekt",
    imageSrc: "/images/references/fassade-goessnitz-nachher.webp",
    imageAlt: "Gereinigte weiße Metallfassade einer Industriehalle in Gößnitz",
    imagePosition: "35% center",
    isNew: true,
    heroIsProjectPhoto: true,
    reference: {
      title: "Reinigung einer Industriehallenfassade in Gößnitz",
      description:
        "Komplette Metallfassade einer Industriehalle, gereinigt unter Einsatz einer Hubarbeitsbühne. Entfernt wurden übliche Schmutz- und Witterungsablagerungen auf der gesamten Fassadenfläche.",
      beforeSrc: "/images/references/fassade-goessnitz-vorher.webp",
      beforeAlt: "Industriehallenfassade in Gößnitz vor der Reinigung mit dunklen Schmutz- und Witterungsstreifen, davor eine Hubarbeitsbühne",
      afterSrc: "/images/references/fassade-goessnitz-nachher.webp",
      afterAlt: "Dieselbe Industriehallenfassade in Gößnitz nach der Reinigung mit gleichmäßig heller Oberfläche",
    },
    featuresTitle: "Leistungsumfang der Fassaden- & Außenreinigung",
    features: [
      "Reinigung von Metall- und Hallenfassaden",
      "Großflächige gewerbliche Außenfassaden",
      "Entfernung üblicher Schmutz- und Witterungsablagerungen",
      "Arbeiten in größeren Höhen mit geeigneter Zugangstechnik nach Prüfung",
    ],
    scopeNote:
      "Jedes Objekt prüfen wir vorab individuell – Fassadenmaterial, Höhe, Zugang und Umfang bestimmen Verfahren und Zugangstechnik.",
    includedTitle: "Was Sie von uns erwarten können",
    included: [
      "Persönlicher Ansprechpartner für Ihr Objekt",
      "Individuelle Prüfung von Fassade, Zugang und Umfang",
      "Verfahren und Zugangstechnik passend zum Objekt geplant",
      "Einsatz in Chemnitz, Umgebung und nach Absprache darüber hinaus",
    ],
    processSteps: cleaningSteps(
      "Wir prüfen Fassade, Material, Fläche und Zugänglichkeit und planen Verfahren und Zugangstechnik.",
      "Die Reinigung erfolgt nach dem abgestimmten Ablauf mit geeigneter Zugangstechnik."
    ),
    relatedSlugs: ["fensterreinigung", "grundreinigung", "bauendreinigung"],
  },

  // ==========================================
  // BAU
  // ==========================================
  {
    id: "trockenbau",
    slug: "trockenbau-innenausbau",
    aliases: ["trockenbau", "innenausbau"],
    category: "bau",
    categoryLabel: "Bau",
    number: "01",
    title: "Trockenbau & Innenausbau",
    subtitle: "Flexible Raumgestaltung für Wohn- und Gewerbeimmobilien.",
    heroDescription:
      "TADIK’S BAU übernimmt Trockenbauarbeiten bei Neubau, Umbau und Renovierung. Wir unterstützen Sie bei der funktionalen und individuellen Gestaltung Ihrer Räume.",
    ctaLabel: "Trockenbau anfragen",
    formService: "Trockenbau & Innenausbau",
    priceNote: "Angebot nach Prüfung Ihres Projekts",
    durationNote: "Material, Ausführung und Umfang nach Projekt",
    imageSrc: "/images/services/hero-trockenbau-innenausbau.jpg",
    imageAlt: "Montage einer Gipskartonplatte auf dem Metallständerwerk beim Dachausbau eines Altbaus",
    imagePosition: "53% center",
    featuresTitle: "Leistungsumfang Trockenbau & Innenausbau",
    features: [
      "Nichttragende Trockenbau- und Trennwände",
      "Abgehängte Decken",
      "Gipskartonarbeiten",
      "Raumaufteilung und Innenausbau",
    ],
    scopeNote:
      "Wir stimmen Material, Ausführung und Umfang der Arbeiten auf das jeweilige Projekt ab.",
    includedTitle: "Was Sie von uns erwarten können",
    included: BAU_INCLUDED,
    processSteps: bauSteps(
      "Wir prüfen Räume, Anforderungen und gewünschte Ausführung – bei Bedarf vor Ort.",
      "Die vereinbarten Trockenbau- und Ausbauarbeiten werden umgesetzt."
    ),
    relatedSlugs: ["abbruch-entkernung", "renovierung-sanierung", "bauendreinigung"],
  },
  {
    id: "abbruch",
    slug: "abbruch-entkernung",
    aliases: ["abbruch", "rueckbau", "entkernung"],
    category: "bau",
    categoryLabel: "Bau",
    number: "02",
    title: "Abbruch, Rückbau & Entkernung",
    subtitle: "Wir schaffen Platz für Neues.",
    heroDescription:
      "Wir unterstützen Bauunternehmen, Immobilienbesitzer, Hausverwaltungen und private Auftraggeber bei Rückbau- und Entkernungsarbeiten – vom einzelnen Raum bis zu umfangreicheren Objekten.",
    ctaLabel: "Rückbauprojekt anfragen",
    formService: "Abbruch, Rückbau & Entkernung",
    priceNote: "Angebot nach Prüfung der baulichen Gegebenheiten",
    durationNote: "Art und Umfang werden vorab abgestimmt",
    imageSrc: "/images/services/hero-abbruch-entkernung.jpg",
    imageAlt: "Entkernung einer ehemaligen Backstein-Fabrikhalle mit Schutzhelm, Atemschutz und Bauschuttcontainer",
    imagePosition: "40% center",
    featuresTitle: "Leistungsumfang Abbruch, Rückbau & Entkernung",
    features: [
      "Rückbau nichttragender Wände",
      "Entkernung von Wohnungen und Gebäuden",
      "Demontage vorhandener Einbauten",
      "Entfernung alter Boden- und Wandbeläge",
      "Beräumung und Organisation der Entsorgung nach Vereinbarung",
      "Besenreine Übergabe nach Vereinbarung",
    ],
    scopeNote:
      "Art und Umfang der Arbeiten werden vorab anhand der baulichen Gegebenheiten abgestimmt. Tragende Bauteile, Schadstoffe und besondere Entsorgungsanforderungen bedürfen einer gesonderten Prüfung.",
    includedTitle: "Was Sie von uns erwarten können",
    included: BAU_INCLUDED,
    processSteps: bauSteps(
      "Wir prüfen die baulichen Gegebenheiten und klären, welche Arbeiten anfallen.",
      "Rückbau, Entkernung und Beräumung erfolgen im vereinbarten Umfang."
    ),
    relatedSlugs: ["trockenbau-innenausbau", "entruempelung-beraeumung", "renovierung-sanierung"],
  },
  {
    id: "sanierung",
    slug: "renovierung-sanierung",
    aliases: ["sanierung", "komplettsanierung", "renovierung"],
    category: "bau",
    categoryLabel: "Bau",
    number: "03",
    title: "Renovierung & Sanierungsprojekte",
    subtitle: "Individuelle Unterstützung bei Umbau und Modernisierung.",
    heroDescription:
      "Ob Wohnungsrenovierung, Umbau oder umfangreicheres Sanierungsprojekt: TADIK’S BAU übernimmt vereinbarte Arbeiten im Rahmen des eigenen Leistungsangebots. Bei weiteren Gewerken prüfen wir die Zusammenarbeit mit geeigneten Fach- und Partnerunternehmen.",
    ctaLabel: "Renovierungsprojekt anfragen",
    formService: "Renovierung & Sanierung",
    priceNote: "Angebot nach individueller Projektprüfung",
    durationNote: "Nächste Schritte gemeinsam abgestimmt",
    imageSrc: "/images/services/hero-renovierung-sanierung.jpg",
    imageAlt: "Baubesprechung mit Plänen in einer leeren Gründerzeitwohnung vor der Sanierung",
    imagePosition: "47% center",
    featuresTitle: "So unterstützen wir Ihr Renovierungsprojekt",
    features: [
      "Wohnungsrenovierung und Umbau",
      "Umfangreichere Sanierungsprojekte",
      "Vereinbarte Arbeiten im Rahmen unseres Leistungsangebots",
      "Weitere Gewerke in Zusammenarbeit mit geeigneten Partnerunternehmen",
    ],
    scopeNote:
      "Senden Sie uns Ihre Projektbeschreibung. Wir besprechen gemeinsam, welche Leistungen wir übernehmen können und wie die nächsten Schritte aussehen.",
    includedTitle: "Was Sie von uns erwarten können",
    included: BAU_INCLUDED,
    processSteps: bauSteps(
      "Wir prüfen, welche Leistungen wir übernehmen und wo Partnerunternehmen sinnvoll sind.",
      "Die vereinbarten Arbeiten werden umgesetzt und mit Ihnen abgestimmt."
    ),
    relatedSlugs: ["trockenbau-innenausbau", "abbruch-entkernung", "bauendreinigung"],
  },
  {
    id: "beraeumung",
    slug: "entruempelung-beraeumung",
    aliases: ["entruempelung", "baustellenberaeumung"],
    category: "bau",
    categoryLabel: "Bau",
    number: "04",
    title: "Entrümpelung & Baustellenberäumung",
    subtitle: "Freie Flächen für den nächsten Projektschritt.",
    heroDescription:
      "Wir unterstützen bei der Räumung von Wohnungen, Gebäuden und Baustellen und bereiten Flächen für nachfolgende Arbeiten vor.",
    ctaLabel: "Beräumung anfragen",
    formService: "Entrümpelung & Baustellenberäumung",
    priceNote: "Angebot nach Umfang und Entsorgungsbedarf",
    durationNote: "Termin nach Vereinbarung",
    imageSrc: "/images/services/hero-entruempelungen.jpg",
    imageAlt: "Entrümpelung: Möbel und Umzugskartons werden vor einem Gründerzeithaus in den Transporter geladen",
    imagePosition: "42% center",
    featuresTitle: "Leistungsumfang Entrümpelung & Baustellenberäumung",
    features: [
      "Entrümpelung von Wohnungen und Gebäuden",
      "Demontage und Beräumung vorhandener Einrichtungen",
      "Baustellenberäumung",
      "Organisation der Entsorgung nach Vereinbarung",
      "Besenreine Übergabe nach Vereinbarung",
    ],
    scopeNote:
      "Für schadstoffbelastete oder besonders überwachungsbedürftige Abfälle gelten gesonderte Voraussetzungen.",
    includedTitle: "Was Sie von uns erwarten können",
    included: BAU_INCLUDED,
    processSteps: bauSteps(
      "Wir klären Umfang, Zugang und Entsorgungsbedarf – bei Bedarf vor Ort.",
      "Die Flächen werden geräumt und für die nachfolgenden Arbeiten vorbereitet."
    ),
    relatedSlugs: ["abbruch-entkernung", "bauendreinigung", "trockenbau-innenausbau"],
  },
];

export function getServicePath(service: ServiceDetailData): string {
  return `/${service.category === "bau" ? "bau" : "services"}/${service.slug}`;
}

export function getServicesByCategory(
  category: ServiceDetailData["category"]
): ServiceDetailData[] {
  return ALL_SERVICE_DETAILS.filter((s) => s.category === category);
}

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
