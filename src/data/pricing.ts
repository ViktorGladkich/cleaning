import { PricingPlan } from "@/types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "basis",
    name: "Basis-Pflege",
    description: "Kompakte Unterhaltsreinigung für regelmäßige Frische in kleinen Wohnungen",
    price: 49,
    period: "ab 1–2 Zimmer Wohnung",
    features: [
      "Böden saugen und feucht wischen",
      "Staubwischen auf Oberflächen",
      "Sanitärreinigung (Bad, Dusche, WC)",
      "Müllentsorgung",
      "Dauer: ca. 2 Stunden",
    ],
    ctaText: "Basis anfragen",
  },
  {
    id: "comfort",
    name: "Komfort-Paket",
    description: "Unsere beliebteste Lösung für Familienwohnungen und Häuser in Chemnitz",
    price: 89,
    period: "für 3–4 Zimmer Wohnung",
    isPopular: true,
    features: [
      "Alle Leistungen aus dem Basis-Paket",
      "Küchenfronten & Arbeitsplatten reinigen",
      "Entkalkung von Armaturen & Duschwand",
      "Betten richten & Frischeduft",
      "Ökologische Markenreiniger inklusive",
      "Dauer: ca. 3–4 Stunden",
    ],
    ctaText: "Paket wählen",
  },
  {
    id: "premium",
    name: "Premium Grundreinigung",
    description: "Gründliche Tiefenreinigung inklusive Geräte- und Schrankinnenreinigung",
    price: 169,
    period: "für Objekte bis 90 m²",
    features: [
      "Alle Leistungen aus Komfort",
      "Backofen- und Kühlschrankinnenreinigung",
      "Fliesenspiegel raumhoch reinigen",
      "Fensterreinigung (bis zu 4 Fensterflügel)",
      "Einsatz im 2er- oder 3er-Profiteam",
      "Inkl. Kärcher Spezialdampfreiniger",
    ],
    ctaText: "Grundreinigung buchen",
  },
];

export const EXTRA_SERVICES = [
  { name: "Backofeninnenreinigung", price: 30, unit: "Gerät" },
  { name: "Kühlschrankinnenreinigung", price: 25, unit: "Gerät" },
  { name: "Mikrowellenreinigung", price: 15, unit: "Gerät" },
  { name: "Dunstabzugshaube entfetten", price: 25, unit: "Stk." },
  { name: "Bügelservice vor Ort", price: 28, unit: "Stunde" },
  { name: "Balkon- / Terrassenreinigung", price: 45, unit: "Balkon" },
  { name: "Küchenschränke innen", price: 40, unit: "Küche" },
  { name: "Fenster extra reinigen", price: 9, unit: "Flügel" },
];
