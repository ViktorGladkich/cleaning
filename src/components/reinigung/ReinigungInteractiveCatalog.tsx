"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowUpRight, Shield, Building2, Home, Hammer } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";

type Category = "all" | "gewerbe" | "privat" | "spezial";

interface ServiceItem {
  id: string;
  category: "gewerbe" | "privat" | "spezial";
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  features: string[];
  specs: { label: string; value: string }[];
  priceInfo: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "unterhaltsreinigung",
    category: "gewerbe",
    title: "Unterhaltsreinigung",
    subtitle: "Büros, Praxen & gewerbliche Liegenschaften",
    description:
      "Kontinuierliche Pflege und maximale Hygiene nach individuellem Turnus. Diskreter Abendservice oder wahlweise während des laufenden Betriebs durch fest zugeteiltes, geschultes Stammpersonal.",
    image: "/images/service_grid_unterhalt.webp",
    badge: "Bestseller Gewerbe",
    features: [
      "Feste Objektleitung & verlässliche Ansprechpartner",
      "Ergonomische 4-Farben-Mikrofaserhygiene nach RKI-Standards",
      "CO₂-neutrale & materialschonende Reinigungsprodukte",
      "Lückenlose Dokumentation via digitalem Qualitätsnachweis",
    ],
    specs: [
      { label: "Turnus", value: "Täglich bis wöchentlich" },
      { label: "Personal", value: "Festes Stammpersonal" },
      { label: "Einsatzzeit", value: "Früh, Abend oder 24/7" },
    ],
    priceInfo: "Individuell nach m² & Leistungsverzeichnis",
  },
  {
    id: "glas-und-fassade",
    category: "gewerbe",
    title: "Glas- & Rahmenreinigung",
    subtitle: "Streifenfreier Durchblick & Fassadenglanz",
    description:
      "Modernste Osmose-Reinigungstechnologie mit reinem, demineralisiertem Wasser. Reinigt Glas, Rahmen und Lamellen rückstandsfrei ohne chemische Schlieren – bis in 20 Meter Höhe sicher vom Boden aus.",
    image: "/images/service_grid_glas.webp",
    badge: "Osmose-Technologie",
    features: [
      "Keine Gerüstkosten durch Teleskop-Osmosestäbe bis 20m",
      "Inklusive gründlicher Stock- und Rahmenwäsche",
      "Schützt Beschläge, Dichtungen und Fensterbänke nachhaltig",
      "Auch für schwer zugängliche Industrie- & Wintergartenverglasungen",
    ],
    specs: [
      { label: "Verfahren", value: "Reinstwasser (Osmose)" },
      { label: "Reichweite", value: "Bis zu 20m ohne Hebebühne" },
      { label: "Ergebnis", value: "100% streifen- & fleckenfrei" },
    ],
    priceInfo: "Pauschal nach Fensteranzahl oder m²-Glasfläche",
  },
  {
    id: "baureinigung",
    category: "spezial",
    title: "Bau- & Endreinigung",
    subtitle: "Vom Rohbau zur bezugsfertigen Übergabe",
    description:
      "Grobe Bauschuttbeseitigung während der Bauphase sowie penible Feinreinigung für die Bauabnahme. Wir entfernen Zementschleier, Farbnebel, Silikonreste und Feinstaub termingetreu für Architekten und Bauherren.",
    image: "/images/service_grid_bauende.webp",
    badge: "Bauherren-Favorit",
    features: [
      "Bauzwischenreinigung & bezugsfertige Baufeinreinigung",
      "Schonende Entfernung von Schutzfolien & Zementschleiern",
      "Einsatz von HEPA-14 Industriestaubsaugern gegen Baustaub",
      "Termintreue Abnahmegarantie für Architekten & Generalunternehmer",
    ],
    specs: [
      { label: "Einsatz", value: "Grobreinigung bis Feinreinigung" },
      { label: "Filterklasse", value: "HEPA-14 Feinstaubschutz" },
      { label: "Termine", value: "Auch express & wochenends" },
    ],
    priceInfo: "Transparente Festpreise nach Besichtigung",
  },
  {
    id: "privatresidenz",
    category: "privat",
    title: "Privatreinigung & Villen",
    subtitle: "Exklusive Diskretion für anspruchsvolle Haushalte",
    description:
      "Umfassender Premium-Reinigungsservice für private Wohnhäuser, Penthouses und Residenzen. Geschultes Personal mit einwandfreiem Führungszeugnis und höchstem Respekt vor Ihrem privaten Rückzugsort.",
    image: "/images/service_cleaning_card.jpg",
    badge: "Premium Privat",
    features: [
      "Strengste Diskretion & vertrauensvolles Stammpersonal",
      "Spezialpflege für Parkett, Marmor, Granit & Designer-Armaturen",
      "20 % steuerlich absetzbar als haushaltsnahe Dienstleistung (§ 35a)",
      "Vollständige Versicherungshaftung bei Ihnen zuhause",
    ],
    specs: [
      { label: "Steuerbonus", value: "Bis zu 4.000 € Rückerstattung" },
      { label: "Schutz", value: "Voll haftpflichtversichert" },
      { label: "Vertrag", value: "Flexibel ohne Knebelverträge" },
    ],
    priceInfo: "Transparente Stundensätze oder Monatspauschale",
  },
  {
    id: "sonderreinigung",
    category: "spezial",
    title: "Sonder- & Grundreinigung",
    subtitle: "Tiefenhygiene bei Mieterwechsel & Events",
    description:
      "Maschinelle Aufbereitung stark beanspruchter Böden (PVC, Linoleum, Fliesen), Teppich-Shampoonierung, Desinfektion nach Infektionsschutz oder Vorbereitung von Gewerbeflächen vor Neuvermietung.",
    image: "/images/leistungen_reinigung_1.jpg",
    badge: "Intensivpflege",
    features: [
      "Einscheibenmaschinen & Sprühextraktion für Teppichböden",
      "Entschichtung und Neuversiegelung von elastischen Bodenbelägen",
      "Hygienische Geruchsneutralisation & Sanitärtiefenreinigung",
      "Perfekt für Übergaben, Wohnungsauflösungen & Gastronomie",
    ],
    specs: [
      { label: "Geräte", value: "Kärcher Professional Einscheibe" },
      { label: "Material", value: "Polymer- & PU-Langzeitversiegelung" },
      { label: "Wirkung", value: "Wie neu eingezogen" },
    ],
    priceInfo: "Projektbasiert nach Flächenzustand",
  },
  {
    id: "industriereinigung",
    category: "gewerbe",
    title: "Industrie- & Hallenreinigung",
    subtitle: "Produktionsstätten, Lagerhallen & Werkstätten",
    description:
      "Leistungsstarke Reinigung von Industriehallen, Werkstattböden und Logistikzentren. Wir entfernen Öle, Fette, Reifenabrieb und Produktionsstaub mit modernen Aufsitz-Kehrsaugmaschinen.",
    image: "/images/leistungen_reinigung_2.jpg",
    badge: "Heavy Duty",
    features: [
      "Befahrbare Scheuersaugmaschinen für Großflächen über 1.000 m²",
      "Fachgerechte Abscheidung und Entsorgung ölhaltiger Rückstände",
      "Einhaltung der berufsgenossenschaftlichen Arbeitssicherheitsregeln",
      "Reinigungsintervalle außerhalb der laufenden Schichtzeiten",
    ],
    specs: [
      { label: "Fläche", value: "Von 200 m² bis über 10.000 m²" },
      { label: "Maschinen", value: "Industrie-Scheuersaugtechnik" },
      { label: "Sicherheit", value: "Zertifizierter Arbeitsschutz" },
    ],
    priceInfo: "Staffelpreise nach m²-Volumen",
  },
];

export function ReinigungInteractiveCatalog() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const filteredServices =
    activeCategory === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  useGSAP(
    () => {
      // Animate filter changes smoothly and refresh ScrollTrigger
      gsap.fromTo(
        ".catalog-service-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    },
    { scope: cardsContainerRef, dependencies: [activeCategory] }
  );

  return (
    <section
      id="katalog"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-brand-cream text-[#0f182b]"
    >
      {/* Decorative architectural background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(#0f182b 1px, transparent 1px), radial-gradient(#0f182b 1px, #FAFAFA 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px",
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-navy font-semibold block mb-3">
            Leistungen &amp; Einsatzbereiche
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0f182b] leading-[1.1]">
            Hygienestandards nach Maß.{" "}
            <span className="text-brand-navy block sm:inline">
              Vom Einzelbüro bis zum Industriekomplex.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Wählen Sie Ihren gewünschten Bereich. Wir bieten transparente Festpreismodelle,
            strikte Kontrollprotokolle und feste Ansprechpartner für maximale Zuverlässigkeit in Chemnitz und Mittelsachsen.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-12 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeCategory === "all"
                ? "bg-[#0f182b] text-brand-lime shadow-md shadow-[#0f182b]/15"
                : "bg-white text-slate-600 hover:text-[#0f182b] hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <span>Alle Leistungen</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === "all"
                  ? "bg-brand-lime text-[#0f182b]"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {SERVICES_DATA.length}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory("gewerbe")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeCategory === "gewerbe"
                ? "bg-[#0f182b] text-brand-lime shadow-md shadow-[#0f182b]/15"
                : "bg-white text-slate-600 hover:text-[#0f182b] hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Gewerbe & Büro</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === "gewerbe"
                  ? "bg-brand-lime text-[#0f182b]"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {SERVICES_DATA.filter((s) => s.category === "gewerbe").length}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory("privat")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeCategory === "privat"
                ? "bg-[#0f182b] text-brand-lime shadow-md shadow-[#0f182b]/15"
                : "bg-white text-slate-600 hover:text-[#0f182b] hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Privat & Residenzen</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === "privat"
                  ? "bg-brand-lime text-[#0f182b]"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {SERVICES_DATA.filter((s) => s.category === "privat").length}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory("spezial")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeCategory === "spezial"
                ? "bg-[#0f182b] text-brand-lime shadow-md shadow-[#0f182b]/15"
                : "bg-white text-slate-600 hover:text-[#0f182b] hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Hammer className="w-4 h-4" />
            <span>Spezial & Bau</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === "spezial"
                  ? "bg-brand-lime text-[#0f182b]"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {SERVICES_DATA.filter((s) => s.category === "spezial").length}
            </span>
          </button>
        </div>

        {/* Dynamic Cards Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="catalog-service-card group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-1.5"
            >
              {/* Card Image Header with Badge */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0f182b]/85 via-[#0f182b]/20 to-transparent" />

                {/* Floating Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-brand-lime text-[#0f182b] shadow-sm">
                    {service.badge}
                  </span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="text-xs uppercase tracking-wider text-brand-light-blue font-medium block">
                    {service.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Features Checklist */}
                <div className="space-y-2.5 mb-6 flex-1">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Specs Pill Matrix */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center mb-6">
                  {service.specs.map((spec, i) => (
                    <div key={i} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                        {spec.label}
                      </div>
                      <div className="text-xs font-bold text-[#0f182b] mt-0.5 truncate" title={spec.value}>
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price info & CTA Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                  <div className="text-xs text-slate-500">
                    <span className="block font-medium text-slate-700">Kalkulation</span>
                    <span className="text-[11px] text-slate-400">{service.priceInfo}</span>
                  </div>

                  <Link
                    href={`/kontakt?leistung=${service.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0f182b] hover:bg-brand-navy text-white text-xs font-semibold tracking-wide transition-colors group-hover:bg-brand-navy"
                  >
                    <span>Anfragen</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner note */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-linear-to-r from-[#0f182b] to-[#1c2e56] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-lime text-[#0f182b] flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Nicht das Passende gefunden?</h4>
              <p className="text-sm text-slate-300 mt-0.5">
                Wir erstellen maßgeschneiderte Leistungsverzeichnisse exakt für Ihre Liegenschaft.
              </p>
            </div>
          </div>
          <Link
            href="/kontakt"
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-brand-lime hover:bg-white text-[#0f182b] font-bold text-sm tracking-wide transition-colors text-center shrink-0"
          >
            Kostenloses Vor-Ort-Audit anfordern
          </Link>
        </div>
      </Container>
    </section>
  );
}
