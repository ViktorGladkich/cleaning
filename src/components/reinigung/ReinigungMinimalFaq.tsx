"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface CleaningFaqItem {
  category: string;
  question: string;
  answer: string;
}

const CLEANING_FAQS: CleaningFaqItem[] = [
  {
    category: "PERSONAL & DISKRETION",
    question: "Kommt immer das gleiche Reinigungsteam in unsere Räume?",
    answer:
      "Ja, ausnahmslos. Wir teilen jedem Objekt feste Mitarbeiter und einen festen Objektleiter zu. Gerade in sensiblen Büros, Arztpraxen oder Privatresidenzen setzen wir auf Vertrautheit, Diskretion und lückenlose Zuverlässigkeit. Bei Krankheit oder Urlaub springt ein vorab eingewiesenes Vertreterteam ein.",
  },
  {
    category: "VERSICHERUNG & SCHUTZ",
    question: "Wie sind unsere Räumlichkeiten und Schlüssel abgesichert?",
    answer:
      "Tadiks verfügt über eine gewerbliche Betriebshaftpflichtversicherung mit einer Deckungssumme von bis zu 5.000.000 € für Personen-, Sach- und Vermögensschäden, einschließlich lückenlosem Schlüssel- und Schließanlagenverlustschutz.",
  },
  {
    category: "STEUERN & VORTEILE",
    question: "Können die Kosten steuerlich abgesetzt werden?",
    answer:
      "Ja. Als gewerblicher Auftraggeber setzen Sie alle Reinigungsausgaben zu 100% als Betriebsausgaben an. Als Privatkunde profitieren Sie von § 35a EStG für haushaltsnahe Dienstleistungen: 20% der Lohnkosten (bis zu 4.000 € jährlich) werden direkt von Ihrer Steuerschuld abgezogen.",
  },
  {
    category: "TECHNIK & MATERIAL",
    question: "Bringen Sie Kärcher-Geräte und Reinigungsmittel selbst mit?",
    answer:
      "Selbstverständlich. Wir stellen sämtliche professionellen Kärcher-Systeme, HEPA-14 Feinstaubsauger, Osmose-Filteranlagen und ökologische Markenreiniger zur Verfügung. Sie müssen weder Geräte lagern noch Reinigungsmittel nachkaufen.",
  },
  {
    category: "VERTRAG & KÜNDIGUNG",
    question: "Gibt es lange Vertragslaufzeiten oder Knebelverträge?",
    answer:
      "Nein. Wir binden Kunden durch gleichbleibend hohe Qualität, nicht durch Knebelklauseln. Unsere Vereinbarungen sind transparent, monatlich flexibel anpassbar und jederzeit fair kündbar.",
  },
  {
    category: "NOTFALL & VOR-ORT-START",
    question: "Wie schnell können Sie nach der Besichtigung starten?",
    answer:
      "Nach der kostenfreien Vor-Ort-Begehung erhalten Sie innerhalb von 24 Stunden Ihr verbindliches Festpreisangebot. Der reguläre Reinigungsbetrieb kann in der Regel binnen 48 bis 72 Stunden aufgenommen werden. Im Expressfall (Bauabnahme oder Event) auch innerhalb von 24 Stunden.",
  },
];

export function ReinigungMinimalFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Parallax glide for the image on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (!imageContainerRef.current) return;
        gsap.to(imageContainerRef.current, {
          y: 70,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      ref={sectionRef}
      id="reinigung-faq"
      aria-label="Häufig gestellte Fragen zur Reinigung"
      className="relative z-20 w-full py-20 sm:py-28 lg:py-36 bg-brand-cream overflow-hidden rounded-t-[20px] sm:rounded-t-[32px] shadow-[0_-25px_60px_rgba(15,24,43,0.12)] border-t border-slate-200/80 -mt-8 sm:-mt-12"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow & Split Header */}
        <div className="pb-8 sm:pb-12 mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-brand-navy/60 uppercase block">
              Klarheit &amp; Transparenz
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-brand-navy leading-[1.12]">
                Häufige Fragen zu Ablauf &amp;{" "}
                <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-medium ml-0">
                  Hygienestandards.
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:text-right pt-1 shrink-0">
              <p className="text-sm sm:text-[15px] text-brand-navy/75 leading-relaxed font-light">
                Verbindliche Antworten zu Festpreisen, Personal, Schlüsselsicherheit
                und Materialverträglichkeit auf einen Blick.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Left Image | Right Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Subtle Architectural Photo */}
          <div className="lg:col-span-5 relative flex flex-col items-start">
            <div
              ref={imageContainerRef}
              className="w-full max-w-[440px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_16px_50px_rgba(15,24,43,0.06)] will-change-transform"
            >
              <div className="relative aspect-4/3 w-full">
                <Image
                  src="/images/hero_premium_cleaning_bau.jpg"
                  alt="Tadiks Meisterbetrieb für Hygiene und Werterhalt"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Clean Accordion */}
          <div className="lg:col-span-7">
            <div className="border-t border-slate-200/80">
              {CLEANING_FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="relative py-6 sm:py-7 border-b border-slate-200/80 group transition-colors"
                  >
                    {/* Hover indicator line */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-brand-navy origin-left transition-transform duration-500 ease-out pointer-events-none z-10",
                        isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />

                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="pr-4">
                        <span className="text-[11px] font-mono tracking-widest uppercase text-brand-navy/60 group-hover:text-brand-navy block mb-2">
                          {faq.category}
                        </span>
                        <span
                          className={cn(
                            "text-lg sm:text-xl font-normal transition-colors duration-200 tracking-tight leading-snug block",
                            isOpen ? "text-brand-navy font-medium" : "text-brand-navy/85 group-hover:text-brand-navy"
                          )}
                        >
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 mt-1",
                          isOpen
                            ? "bg-brand-navy text-white border-brand-navy rotate-45"
                            : "border-slate-300 text-brand-navy group-hover:border-brand-navy"
                        )}
                      >
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen ? "grid-rows-[1fr] opacity-100 pt-4" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm sm:text-[15px] text-brand-navy/75 leading-relaxed font-light">
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
