"use client";

import React, { useState } from "react";
import { Plus, Minus, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: "Organisation & Ablauf",
    question: "Kommt immer die gleiche Reinigungskraft in mein Objekt?",
    answer:
      "Ja, definitiv. Bei Tadiks arbeiten wir mit fest zugeteilten Objektteams und festen Ansprechpartnern. Nur bei Urlaub oder Krankheit springt ein vertrautes Springer-Team ein, das zuvor exakt in Ihr Objekt eingewiesen wurde. So gewährleisten wir absolute Diskretion und vertraute Qualität.",
  },
  {
    category: "Recht & Versicherung",
    question: "Wie ist Tadiks versichert, falls beim Reinigen etwas beschädigt wird?",
    answer:
      "Ihre Sicherheit steht an erster Stelle. Wir verfügen über eine umfassende Betriebshaftpflichtversicherung mit einer Deckungssumme von bis zu 5.000.000 € für Personen-, Sach- und echte Vermögensschäden sowie Schlüsselverlustrisiken.",
  },
  {
    category: "Steuern & Finanzen",
    question: "Kann ich die Reinigungskosten steuerlich geltend machen?",
    answer:
      "Ja. Als gewerbliches Unternehmen können Sie unsere Rechnungen zu 100 % als Betriebsausgaben verbuchen. Als Privatkunde profitieren Sie von § 35a EStG für haushaltsnahe Dienstleistungen: Bis zu 20 % der Lohnkosten (maximal 4.000 € pro Jahr) können Sie direkt von Ihrer tariflichen Einkommensteuer abziehen.",
  },
  {
    category: "Material & Umwelt",
    question: "Bringen Sie die Reinigungsmittel und Geräte selbst mit?",
    answer:
      "Selbstverständlich. Wir bringen alle benötigten Profi-Geräte (Industriesauger mit HEPA-Filtern, Kärcher Einscheibenmaschinen, Osmose-Teleskopstangen) sowie ökologisch zertifizierte Reinigungsmittel mit. Sie müssen sich um absolut nichts kümmern.",
  },
  {
    category: "Flexibilität & Verträge",
    question: "Gibt es lange Vertragslaufzeiten oder Knebelverträge?",
    answer:
      "Nein. Wir binden Kunden durch handwerkliche Spitzenleistung und nicht durch starre Vertragsklauseln. Wir bieten transparente Vereinbarungen mit flexiblen Anpassungsoptionen und fairen Kündigungsfristen.",
  },
  {
    category: "Notfall & Schnelligkeit",
    question: "Wie kurzfristig können Sie mit der Reinigung starten?",
    answer:
      "In der Regel können wir nach der Erstbegehung innerhalb von 48 bis 72 Stunden den regulären Betrieb aufnehmen. Bei Notfällen (z. B. nach Wasserschäden, kurzfristiger Bauabnahme oder vor wichtigen Events) bieten wir einen Express-Service innerhalb von 24 Stunden.",
  },
];

export function ReinigungFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#FAFAFA] text-[#0f182b] overflow-hidden">
      <Container>
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#3D568F] font-semibold block mb-3">
            Häufige Fragen &amp; Antworten
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0f182b] leading-[1.1]">
            Klarheit von Anfang an.{" "}
            <span className="text-[#3D568F] block sm:inline">
              Transparente Antworten.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Haben Sie eine Frage zur Schlüsselübergabe, Versicherung oder Turnusplanung?
            Hier finden Sie die wichtigsten Details auf einen Blick.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#3D568F] uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#0f182b]">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#0f182b] text-[#EAF3B2] rotate-180"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-14 max-w-xl mx-auto text-center p-6 rounded-2xl bg-slate-100/80 border border-slate-200">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Ihre Frage war nicht dabei?
          </p>
          <p className="text-sm font-medium text-slate-700 mt-1">
            Rufen Sie uns direkt an. Wir beraten Sie gern persönlich und unkompliziert.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#0f182b] text-white text-xs font-bold hover:bg-[#3D568F] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#EAF3B2]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[8px] bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              <span>Nachricht schreiben</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
