"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 520);
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Header entrance reveal (Matching Referenzen)
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
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            ".faq-desc",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
            "-=0.6"
          );
      }

      // 2. Left Square Image entrance + smooth downward glide towards last question + parallax
      if (imageContainerRef.current && accordionRef.current) {
        // Initial entrance
        gsap.fromTo(
          imageContainerRef.current,
          { opacity: 0, scale: 0.94, y: 35 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: accordionRef.current,
              start: "top 72%",
              once: true,
            },
          }
        );

        // Smooth downward glide tracking to the last question on desktop
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          gsap.to(imageContainerRef.current, {
            y: () => {
              const accHeight = accordionRef.current?.offsetHeight || 0;
              const imgHeight = imageContainerRef.current?.offsetHeight || 0;
              return Math.max(0, accHeight - imgHeight);
            },
            ease: "none",
            scrollTrigger: {
              trigger: accordionRef.current,
              start: "top 25%",
              end: "bottom 75%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });
        });

        // Parallax drift inside the square photo
        const imgInner = imageContainerRef.current.querySelector(".faq-parallax-photo");
        if (imgInner) {
          gsap.fromTo(
            imgInner,
            { yPercent: -12, scale: 1.15 },
            {
              yPercent: 12,
              scale: 1.15,
              ease: "none",
              scrollTrigger: {
                trigger: accordionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      }

      // 3. Staggered cascade reveal of questions one after another like a smooth ladder
      const rows = accordionRef.current?.querySelectorAll(".faq-accordion-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: accordionRef.current,
              start: "top 72%",
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
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header: Editorial split layout WITHOUT bottom border line */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-12 mb-10 sm:mb-14"
        >
          <div className="max-w-2xl">
            <span className="faq-eyebrow text-xs sm:text-sm font-mono tracking-widest text-brand-navy/60 uppercase block mb-3 will-change-transform">
              Klarheit &amp; Transparenz
            </span>
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

          <div className="max-w-md lg:text-right">
            <p className="faq-desc text-sm sm:text-[15px] text-brand-navy/75 leading-relaxed font-light will-change-transform">
              Alle wichtigen Details zu Festpreisen, Termintreue, Schnittstellen und Gewährleistung transparent aufgeschlüsselt.
            </p>
          </div>
        </div>

        {/* Two-Column Grid: Left Clean Square Image | Right Accordion */}
        <div ref={contentGridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* Left Column: Clean Square Image aligned with first question and gliding down to the last question */}
          <div className="lg:col-span-5 relative self-stretch">
            <div
              ref={imageContainerRef}
              className="faq-image-card w-full will-change-transform"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_16px_50px_rgba(15,24,43,0.08)] border border-slate-200/80 group">
                <div className="relative w-full h-[124%] -top-[12%] will-change-transform faq-parallax-photo">
                  <Image
                    src="/images/faq_architectural_craft.jpg"
                    alt="Tadiks meisterhafte Architektur & Sauberkeit"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
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
                        "absolute bottom-0 left-0 right-0 h-[2px] bg-brand-navy origin-left transition-transform duration-500 ease-out pointer-events-none z-10",
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
                        <span className="block text-[11px] font-mono tracking-wider text-brand-navy/50 uppercase mb-1">
                          {faq.category}
                        </span>
                        <span className="text-base sm:text-lg lg:text-[19px] font-medium text-brand-navy leading-snug group-hover:text-brand-navy/70 transition-colors">
                          {faq.question}
                        </span>
                      </div>

                      {/* Geometric Plus/Minus Icon with rounded-[5px] and silky cubic-bezier rotation */}
                      <div
                        className={cn(
                          "w-8 h-8 rounded-[5px] border flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isOpen
                            ? "rotate-45 bg-brand-navy text-white border-brand-navy shadow-xs"
                            : "bg-white text-brand-navy border-slate-200 group-hover:border-brand-navy group-hover:bg-brand-navy/5"
                        )}
                      >
                        <Plus className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      </div>
                    </button>

                    {/* Smooth Collapsible Content with Apple/Stripe-grade cubic-bezier easing */}
                    <div
                      data-open={isOpen ? "true" : "false"}
                      className="faq-accordion-grid overflow-hidden"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="faq-accordion-inner min-h-0 overflow-hidden">
                        <div
                          className={cn(
                            "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pt-4 pb-2",
                            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                          )}
                        >
                          <p className="text-sm sm:text-[15px] text-brand-navy/75 leading-relaxed font-light pr-6 sm:pr-12">
                            {faq.answer}
                          </p>
                        </div>
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
