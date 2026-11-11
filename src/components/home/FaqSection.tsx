"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, isTouchLayout } from "@/lib/gsap";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface FaqSectionProps {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  items?: FaqItem[];
  className?: string;
}

const FAQS: FaqItem[] = [
  {
    category: "ANFRAGE & ANGEBOT",
    question: "Wie erhalte ich ein Angebot?",
    answer:
      "Schildern Sie uns Ihr Vorhaben telefonisch, per E-Mail oder über das Anfrageformular. Wir besprechen Bedarf und Umfang – bei Bedarf bei einem Termin vor Ort – und erstellen Ihnen ein individuell abgestimmtes Angebot.",
  },
  {
    category: "REINIGUNG & BAU",
    question: "Bieten Sie Reinigung und Bauleistungen an?",
    answer:
      "Ja. TADIK’S Cleaning übernimmt Reinigungsleistungen für Gewerbe und Privatkunden, TADIK’S BAU unterstützt bei Trockenbau, Rückbau, Entkernung, Renovierung und Beräumung. So können Sie zum Beispiel nach Bauarbeiten auch die Bauendreinigung bei uns anfragen.",
  },
  {
    category: "LEISTUNGSUMFANG",
    question: "Kann ich auch Leistungen anfragen, die nicht auf der Webseite stehen?",
    answer:
      "Ja, gern. Beschreiben Sie uns Ihr Vorhaben – wir prüfen die Möglichkeiten. Bei Bauprojekten prüfen wir für weitere Gewerke auch die Zusammenarbeit mit geeigneten Partnerunternehmen.",
  },
  {
    category: "KURZFRISTIGE EINSÄTZE",
    question: "Ist auch eine kurzfristige Reinigung möglich?",
    answer:
      "Kurzfristige Einsätze prüfen wir gern – abhängig von Art, Umfang und verfügbarer Kapazität. Am schnellsten erreichen Sie uns telefonisch unter 0371 23559475.",
  },
  {
    category: "ANSPRECHPARTNER",
    question: "Wer ist mein Ansprechpartner?",
    answer:
      "Ihr direkter Ansprechpartner ist Michel Kislovskij, Inhaber von TADIK’S Cleaning & BAU. Er bespricht mit Ihnen Ihren Bedarf und die Rahmenbedingungen.",
  },
  {
    category: "EINSATZGEBIET",
    question: "Wo sind Sie im Einsatz?",
    answer:
      "Wir sind in Chemnitz und Umgebung tätig. Aufträge außerhalb der Region prüfen wir auf Anfrage.",
  },
  {
    category: "KARRIERE",
    question: "Suchen Sie Mitarbeiter?",
    answer:
      "Wir freuen uns über Bewerbungen für die Bereiche Reinigung und Bau – mit Berufserfahrung oder als Quereinsteiger. Bewerben Sie sich unkompliziert über unser Online-Formular auf der Karriereseite.",
  },
];

export function FaqSection({
  id = "faq",
  eyebrow = "Klarheit & Transparenz",
  title,
  subtitle = "Antworten zu Anfrage, Leistungen, kurzfristigen Einsätzen und Ihrem Ansprechpartner.",
  imageSrc = "/images/faq_architectural_craft.webp",
  imageAlt = "Tadiks professionelle Ausführung & Sauberkeit",
  items = FAQS,
  className,
}: FaqSectionProps = {}) {
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
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          )
          .fromTo(
            ".faq-title",
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" },
            "-=0.5",
          )
          .fromTo(
            ".faq-desc",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
            "-=0.6",
          );
      }

      // 2. Downward glide of image tracking smoothly alongside questions on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (
          !imageContainerRef.current ||
          !accordionRef.current ||
          !contentGridRef.current
        )
          return;

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
      const imgInner = imageContainerRef.current?.querySelector(
        ".faq-parallax-photo",
      );
      if (imgInner && !isTouchLayout()) {
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
          },
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
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative z-10 w-full pb-20 sm:pb-28 lg:pb-36 bg-brand-cream overflow-hidden",
        className,
      )}
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header: Eyebrow + Split Row with headline and right text horizontally aligned */}
        <div ref={headerRef} className="pb-8 sm:pb-12 mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="faq-eyebrow text-xs sm:text-sm font-mono tracking-widest text-brand-navy/60 uppercase block will-change-transform">
              {eyebrow}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
            <div className="max-w-2xl">
              <h2
                id={`${id}-heading`}
                className="faq-title text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-brand-navy leading-[1.12] will-change-transform"
              >
                {title || (
                  <>
                    Häufige Fragen vor dem{" "}
                    <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-medium ml-0">
                      ersten Schritt.
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="max-w-md lg:text-right pt-1 lg:pt-1.5 shrink-0">
              <p className="faq-desc text-sm sm:text-[15px] text-brand-navy/75 leading-relaxed font-light will-change-transform">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Left Gliding Image | Right Accordion */}
        <div
          ref={contentGridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start"
        >
          {/* Left Column: Image placed at left edge of the container */}
          <div className="lg:col-span-5 relative flex flex-col items-start lg:items-start">
            <div
              ref={imageContainerRef}
              className="w-full max-w-107.5 sm:max-w-115 will-change-transform"
            >
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-[0_16px_50px_rgba(15,24,43,0.08)] border border-slate-200/80 group">
                <div className="relative w-full h-[120%] top-[-10%] will-change-transform faq-parallax-photo">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
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
              {items.map((faq, idx) => {
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
                        isOpen
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
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
                            isOpen
                              ? "text-brand-navy font-medium"
                              : "text-brand-navy/85 group-hover:text-brand-navy",
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
                            : "bg-slate-200/80 text-brand-navy group-hover:bg-brand-navy group-hover:text-white",
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
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-4"
                          : "grid-rows-[0fr] opacity-0 mt-0",
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
