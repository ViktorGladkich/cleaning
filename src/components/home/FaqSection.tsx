"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Plus, ArrowUpRight } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: "ANGEBOT & PREISE",
    question: "Wie schnell erhalten wir ein verbindliches Angebot und fallen dafür Kosten an?",
    answer:
      "Die Erstbesichtigung und Bedarfsanalyse bei Ihnen vor Ort in Chemnitz und Region sind für Sie zu 100% kostenlos und unverbindlich. Innerhalb von 24 Stunden nach der Besichtigung erhalten Sie ein transparent aufgeschlüsseltes Festpreisangebot — ohne versteckte Nebenkosten oder nachträgliche Aufschläge.",
  },
  {
    category: "BAU & REINIGUNG AUS EINER HAND",
    question: "Was bedeutet 'Bau, Sanierung und Reinigung aus einer Hand' konkret für unser Projekt?",
    answer:
      "Bei herkömmlichen Abläufen entstehen Verzögerungen und Streitigkeiten oft an der Schnittstelle zwischen Trockenbauern, Malern und Reinigungsfirmen. Bei uns arbeiten eigene feste Gewerke Hand in Hand unter der Leitung eines festen deutschen Objektleiters. Das spart bis zu 30% Bauzeit und garantiert eine schlüsselfertig bezugsfertige Übergabe ohne Schnittstellenverlust.",
  },
  {
    category: "QUALITÄT & PERSONAL",
    question: "Arbeiten bei Ihnen feste Teams oder wechseln die Reinigungskräfte ständig?",
    answer:
      "Wir setzen konsequent auf feste, festangestellte Fachkräfte und feste Objektleiter für jedes Objekt. Gerade in Praxen, Büros oder privaten Wohnräumen sind Diskretion, Vertrautheit und gleichbleibend hohe Qualität unverzichtbar. Im Urlaubs- oder Krankheitsfall greift ein nahtloser, vorab eingearbeiteter Vertretungsplan.",
  },
  {
    category: "SICHERHEIT & VERSICHERUNG",
    question: "Sind unsere Räumlichkeiten und Sachwerte während der Arbeiten abgesichert?",
    answer:
      "Selbstverständlich. Tadiks ist umfassend gewerblich betriebshaftpflichtversichert. Alle Mitarbeiter sind tarifvertraglich angemeldet, sozialversichert und werden regelmäßig in Arbeitsschutz, Materialkunde und Datenschutz (DSGVO) geschult.",
  },
  {
    category: "HYGIENE & STANDARDS",
    question: "Welche Reinigungsmittel, Geräte und Hygienestandards kommen zum Einsatz?",
    answer:
      "Wir arbeiten ausschließlich mit zertifizierten Profi-Systemen von Kärcher und biologisch abbaubaren, materialschonenden Reinigungskonzentraten namhafter deutscher Hersteller. Für sensible Bereiche wie Arztpraxen oder Reinräume wenden wir das streng codierte Vier-Farben-Hygienesystem nach RKI-Vorgaben an.",
  },
  {
    category: "EINSATZGEBIET & VERTRÄGE",
    question: "Welche Regionen bedienen Sie und gibt es langfristige Knebelverträge?",
    answer:
      "Unser Hauptfokus liegt auf Chemnitz, Zwickau, Freiberg, Mittweida und dem gesamten sächsischen Raum. Bei regelmäßigen Unterhaltsreinigungen arbeiten wir mit fairen, flexiblen Vereinbarungen mit transparenten Kündigungsfristen. Wir binden Kunden durch messbare Qualität, nicht durch starre Vertragslaufzeiten.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default for immediate context
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Left column reveal
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Accordion rows reveal
      const rows = accordionRef.current?.querySelectorAll(".faq-accordion-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: accordionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-10 w-full py-20 sm:py-28 lg:py-36 bg-brand-cream border-t border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Editorial Heading & Quick Contact */}
          <div ref={leftColRef} className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-brand-navy/60 uppercase block mb-3">
              Klarheit &amp; Transparenz
            </span>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-brand-navy leading-[1.14]"
            >
              Häufige Fragen vor dem <span className="font-medium text-brand-navy">ersten Schritt.</span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-brand-navy/75 leading-relaxed font-light max-w-md">
              Alle wichtigen Details zu Festpreisen, Termintreue, Schnittstellen und Gewährleistung transparent aufgeschlüsselt.
            </p>

            {/* Direct Contact Prompt Box */}
            <div className="mt-8 sm:mt-10 p-6 sm:p-7 rounded-xl bg-white border border-slate-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)] max-w-md">
              <h3 className="text-sm font-medium text-brand-navy">
                Sie haben eine individuelle Frage zu Ihrem Objekt?
              </h3>
              <p className="text-xs sm:text-[13px] text-brand-navy/60 font-light mt-1.5 leading-relaxed">
                Sprechen Sie direkt mit einem unserer Objektleiter in Chemnitz. Wir beraten Sie persönlich und unverbindlich.
              </p>

              <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-navy hover:text-brand-navy/70 transition-colors group"
                >
                  <span>Jetzt persönliche Anfrage stellen</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Minimalist Accordion */}
          <div ref={accordionRef} className="lg:col-span-7">
            <div className="divide-y divide-slate-200/80 border-y border-slate-200/80">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="faq-accordion-row py-6 sm:py-7 transition-colors duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left flex items-start justify-between gap-4 group cursor-pointer select-none"
                    >
                      <div className="pr-4">
                        <span className="block text-[11px] font-mono tracking-wider text-brand-navy/50 uppercase mb-1">
                          {faq.category}
                        </span>
                        <span className="text-base sm:text-lg lg:text-[19px] font-medium text-brand-navy leading-snug group-hover:text-brand-navy/70 transition-colors">
                          {faq.question}
                        </span>
                      </div>

                      {/* Smooth Rotating Plus/Minus Icon */}
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? "rotate-45 bg-brand-navy text-white border-brand-navy"
                            : "bg-white text-brand-navy border-slate-200 group-hover:border-brand-navy/40"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Smooth Collapsible Content (CSS Grid Row technique) */}
                    <div
                      className={`grid transition-all duration-300 ease-out overflow-hidden ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm sm:text-[15px] text-brand-navy/75 leading-relaxed font-light pt-1 pr-6 sm:pr-12">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
