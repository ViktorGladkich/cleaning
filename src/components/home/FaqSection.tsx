"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

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
    category: "GEWÄHRLEISTUNG & ABNAHME",
    question: "Welche Gewährleistung bieten Sie auf handwerkliche Bau- und Sanierungsleistungen?",
    answer:
      "Auf alle ausgeführten Bau- und Sanierungsleistungen (wie Trockenbau, Maler- und Spachtelarbeiten sowie Bodenverlegung) gewähren wir die volle VOB/BGB-Gewährleistung von bis zu 5 Jahren. Vor der Übergabe erfolgt eine gemeinsame, lückenlose Protokollabnahme mit Ihrem festen Objektleiter.",
  },
  {
    category: "FLEXIBILITÄT & ZEITPLAN",
    question: "Können Arbeiten auch außerhalb unserer regulären Geschäftszeiten oder am Wochenende stattfinden?",
    answer:
      "Ja, absolut. Sowohl im Bauhandwerk als auch in der Gebäudereinigung richten wir uns flexibel nach Ihrem Betriebsablauf. Arbeiten in den Abendstunden, nachts oder an Wochenenden sind für uns Standard, um Ihren laufenden Praxis-, Büro- oder Kundenbetrieb nicht zu beeinträchtigen.",
  },
  {
    category: "EINSATZGEBIET & VERTRÄGE",
    question: "Welche Regionen bedienen Sie und gibt es langfristige Knebelverträge?",
    answer:
      "Unser Hauptfokus liegt auf Chemnitz, Zwickau, Freiberg, Mittweida und dem gesamten sächsischen Raum. Bei regelmäßigen Unterhaltsreinigungen arbeiten wir mit fairen, flexiblen Vereinbarungen mit transparenten Kündigungsfristen. Wir binden Kunden durch messbare Qualität, nicht durch starre Vertragslaufzeiten.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentGridRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Header entrance reveal
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        });

        headerTl
          .fromTo(
            ".faq-eyebrow",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          )
          .fromTo(
            ".faq-title",
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            ".faq-desc",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
            "-=0.6"
          );
      }

      // 2. Downward glide of image tracking smoothly alongside questions on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (!imageContainerRef.current || !accordionRef.current || !contentGridRef.current) return;

        gsap.to(imageContainerRef.current, {
          y: () => {
            const accHeight = accordionRef.current?.offsetHeight || 0;
            const imgHeight = imageContainerRef.current?.offsetHeight || 0;
            return Math.max(0, accHeight - imgHeight);
          },
          ease: "none",
          scrollTrigger: {
            trigger: contentGridRef.current,
            start: "top 28%",
            end: "bottom 82%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      // 3. Continuous gentle parallax drift inside the photo
      const imgInner = imageContainerRef.current?.querySelector(".faq-parallax-photo");
      if (imgInner) {
        gsap.fromTo(
          imgInner,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 4. Staggered reveal of questions
      const rows = accordionRef.current?.querySelectorAll(".faq-accordion-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: accordionRef.current,
              start: "top 78%",
              once: true,
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
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header: Eyebrow + Split Row with headline and right text horizontally aligned */}
        <div ref={headerRef} className="pb-8 sm:pb-12 mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="faq-eyebrow text-xs sm:text-sm font-mono tracking-widest text-brand-navy/60 uppercase block will-change-transform">
              Klarheit &amp; Transparenz
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
            <div className="max-w-2xl">
              <h2
                id="faq-heading"
                className="faq-title text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-brand-navy leading-[1.12] will-change-transform"
              >
                Häufige Fragen vor dem{" "}
                <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-medium ml-0">
                  ersten Schritt.
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:text-right pt-1 lg:pt-1.5 shrink-0">
              <p className="faq-desc text-sm sm:text-[15px] text-brand-navy/75 leading-relaxed font-light will-change-transform">
                Alle wichtigen Details zu Festpreisen, Termintreue, Schnittstellen und Gewährleistung transparent aufgeschlüsselt.
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Left Gliding Image | Right Accordion */}
        <div ref={contentGridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Left Column: Image placed at left edge of the container */}
          <div className="lg:col-span-5 relative flex flex-col items-start lg:items-start">
            <div
              ref={imageContainerRef}
              className="w-full max-w-[430px] sm:max-w-[460px] will-change-transform"
            >
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-[0_16px_50px_rgba(15,24,43,0.08)] border border-slate-200/80 group">
                <div className="relative w-full h-[120%] top-[-10%] will-change-transform faq-parallax-photo">
                  <Image
                    src="/images/faq_architectural_craft.jpg"
                    alt="Tadiks meisterhafte Architektur & Sauberkeit"
                    fill
                    sizes="(max-width: 1024px) 100vw, 460px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Minimalist Accordion */}
          <div ref={accordionRef} className="lg:col-span-7">
            <div className="border-t border-slate-200/80">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="faq-accordion-row relative py-6 sm:py-7 group border-b border-slate-200/80 transition-colors duration-200"
                  >
                    {/* Masked Navy Fill Indicator Line on Hover */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-brand-navy origin-left transition-transform duration-500 ease-out pointer-events-none z-10",
                        isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />

                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="pr-4">
                        <span className="text-[11px] font-mono tracking-widest uppercase text-brand-navy/60 group-hover:text-brand-navy block mb-2 transition-colors duration-200">
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

                      {/* Animated Plus / Minus Indicator Icon - Squarish with rounded corners (rounded-lg) */}
                      <span
                        className={cn(
                          "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 mt-1",
                          isOpen
                            ? "bg-brand-navy text-brand-lime rotate-45 shadow-sm"
                            : "bg-slate-200/80 text-brand-navy group-hover:bg-brand-navy group-hover:text-white"
                        )}
                        aria-hidden="true"
                      >
                        <Plus className="w-4 h-4 transition-transform duration-300" />
                      </span>
                    </button>

                    {/* Smooth Collapsible Answer Body */}
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out overflow-hidden",
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm sm:text-[15px] leading-relaxed text-brand-navy/70 max-w-2xl font-light pr-4">
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
