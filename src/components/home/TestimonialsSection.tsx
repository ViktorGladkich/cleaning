"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface TestimonialItem {
  id: string;
  category: string;
  clientType: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  src: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "medical",
    category: "01 / 04",
    clientType: "Praxis & Gesundheitswesen",
    quote:
      "In sensiblen medizinischen Bereichen gibt es keinen Spielraum für Fehler. Tadiks überzeugt seit über zwei Jahren mit kompromissloser Hygiene, geschultem festem Personal und lückenlosen Dokumentationen nach RKI-Richtlinien.",
    author: "Dr. med. Christian Weber",
    role: "Leitender Facharzt & Praxisinhaber",
    company: "Gemeinschaftspraxis am Schlossteich",
    location: "Chemnitz",
    src: "/images/service_cleaning_card.jpg",
  },
  {
    id: "construction",
    category: "02 / 04",
    clientType: "Gewerbliche Projektentwicklung",
    quote:
      "Die nahtlose Verzahnung aus meisterhaftem Trockenbau und anschließender bezugsfertiger Bauendreinigung spart uns bei jedem Projekt wertvolle Wochen. Keine Schnittstellenverluste, feste deutsche Bauleiter und verbindliche Festpreise.",
    author: "Dipl.-Ing. Markus Lindner",
    role: "Geschäftsführer & Gesamtprojektleiter",
    company: "Lindner Projektentwicklung GmbH",
    location: "Chemnitz & Leipzig",
    src: "/images/service_bau_card.jpg",
  },
  {
    id: "residential",
    category: "03 / 04",
    clientType: "Privates Denkmalschutzobjekt",
    quote:
      "Unsere Jugendstil-Villa auf dem Kaßberg erforderte äußerste handwerkliche Präzision. Die Spachtel- und Malerarbeiten auf Q4-Niveau sowie die millimetergenaue Baufeinreinigung vor unserem Einzug waren schlichtweg meisterhaft.",
    author: "Elena & Thomas Vogel",
    role: "Eigentümer",
    company: "Denkmalgeschützte Villa Kaßberg",
    location: "Chemnitz",
    src: "/images/about_gallery_3.webp",
  },
  {
    id: "commercial",
    category: "04 / 04",
    clientType: "Technologiepark & Campus",
    quote:
      "Streifenfreie Panoramafenster und ein täglich makelloses Arbeitsumfeld für über 90 Entwickler. Bemerkenswert ist die Konstanz: dieselben vertrauten Mitarbeiter und ein Objektleiter, der bei Sonderwünschen innerhalb von Minuten reagiert.",
    author: "Stefan Becker",
    role: "Head of Operations & Facility Management",
    company: "Technologie Campus Chemnitz",
    location: "Chemnitz",
    src: "/images/service_grid_glas.jpg",
  },
];

// Tactile Neumorphic / ambient multi-layer drop shadow
const NEUMORPHIC_SHADOW =
  "rgba(0, 0, 0, 0.08) 0px 0.706592px 0.706592px -0.666667px, rgba(0, 0, 0, 0.08) 0px 1.80656px 1.80656px -1.33333px, rgba(0, 0, 0, 0.07) 0px 3.62176px 3.62176px -2px, rgba(0, 0, 0, 0.07) 0px 6.8656px 6.8656px -2.66667px, rgba(0, 0, 0, 0.05) 0px 13.6468px 13.6468px -3.33333px, rgba(0, 0, 0, 0.02) 0px 30px 30px -4px, rgb(255, 255, 255) 0px 3px 1px 0px inset";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const cardWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardImagesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Prevent mobile address bar jitter: lock --vh to viewport width changes only
  useEffect(() => {
    const updateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    updateVh();

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      // Only recalculate when viewport width changes (orientation change or desktop resize)
      // This prevents jitter when mobile address bar hides/shows vertically
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        updateVh();
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Cinematic Header Reveal
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 82%",
            once: true,
          },
        });

        headerTl
          .fromTo(
            ".testi-eyebrow",
            { opacity: 0, y: -20, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
          )
          .fromTo(
            ".testi-title",
            { opacity: 0, y: 45, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            ".testi-desc",
            { opacity: 0, y: 30, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
            "-=0.7"
          );
      }

      // 2. Stacking Cards: Parallax Image Entrance & Card Scale Down without fading
      cardWrappersRef.current.forEach((wrapper, i) => {
        if (!wrapper) return;

        const inner = cardInnersRef.current[i];
        const image = cardImagesRef.current[i];

        // Parallax image zoom as this card scrolls into view
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "top 20%",
                scrub: true,
              },
            }
          );
        }

        // When the NEXT card wrapper approaches and stacks directly on top of this card:
        // Subtle depth scale down (without opacity fading) so it remains 100% crisp until covered
        const nextWrapper = cardWrappersRef.current[i + 1];
        if (inner && nextWrapper) {
          gsap.to(inner, {
            scale: 0.96,
            ease: "none",
            scrollTrigger: {
              trigger: nextWrapper,
              start: "top 85%",
              end: "top 15%",
              scrub: true,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative z-10 w-full py-20 sm:py-28 lg:py-36 bg-brand-cream"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header: Aligned horizontally with description text */}
        <div
          ref={headerRef}
          className="pb-12 sm:pb-16"
        >
          <div className="mb-4">
            <span className="testi-eyebrow text-xs sm:text-sm font-mono tracking-widest text-brand-navy/60 uppercase block will-change-transform">
              Referenzen &amp; Kundenerfahrungen
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
            <div className="max-w-2xl">
              <h2
                id="testimonials-heading"
                className="testi-title text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-brand-navy leading-[1.12] will-change-transform"
              >
                Vertrauen entsteht durch{" "}
                <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-medium ml-0">
                  messbare Perfektion.
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:text-right pt-1 lg:pt-1.5 shrink-0">
              <p className="testi-desc text-sm sm:text-[15px] text-brand-navy/75 leading-relaxed font-light will-change-transform">
                Ausgewählte Stimmen von Gewerbekunden, Praxen und anspruchsvollen Privateigentümern aus Chemnitz und ganz Sachsen.
              </p>
            </div>
          </div>
        </div>

        {/* Stacking Cards Parallax Container */}
        <div
          ref={stackContainerRef}
          className="relative w-full mt-8 sm:mt-12 pb-8 sm:pb-12"
        >
          {TESTIMONIALS.map((item, i) => {
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardWrappersRef.current[i] = el;
                }}
                className="sticky top-20 sm:top-24 lg:top-28 flex items-center justify-center will-change-transform px-1 sm:px-0"
                style={{
                  height: "calc(var(--vh, 1svh) * 85)",
                  minHeight: "460px",
                  zIndex: i + 1,
                }}
              >
                <div
                  ref={(el) => {
                    cardInnersRef.current[i] = el;
                  }}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-8 origin-top w-full max-w-5xl rounded-[20px] p-5 sm:p-7 md:p-9 lg:p-10 bg-white will-change-transform"
                  style={{
                    boxShadow: NEUMORPHIC_SHADOW,
                  }}
                >
                  {/* Content Side: flex-1 ensures it fills space without overflow when gap is added */}
                  <div className="flex flex-col justify-center w-full md:flex-1 min-w-0 gap-5 sm:gap-6 py-1">
                    <div className="flex flex-col gap-4 sm:gap-5">
                      {/* Step & Client Category */}
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-xs font-mono tracking-widest text-brand-navy/40 uppercase">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-brand-navy/50">
                          {item.clientType}
                        </span>
                      </div>

                      {/* Client Header Info */}
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-brand-navy">
                          {item.author}
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-navy/60 font-light mt-1">
                          {item.role} · <span className="font-normal text-brand-navy/80">{item.company}</span>
                        </p>
                        <span className="inline-block text-[11px] text-brand-navy/45 font-mono mt-0.5">
                          Standort: {item.location}
                        </span>
                      </div>

                      {/* Main Authentic Quote */}
                      <div className="pt-2">
                        <p className="text-sm sm:text-[15px] md:text-base lg:text-[17px] text-brand-navy/85 font-light leading-relaxed tracking-tight">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image Side: absolute inset-0 wrapper guarantees image fill doesn't collapse in Safari */}
                  <div className="relative w-full md:w-[46%] lg:w-[48%] h-[200px] sm:h-[240px] md:h-auto md:min-h-[340px] lg:min-h-[360px] rounded-[16px] overflow-hidden bg-neutral-100 shadow-[rgba(0,0,0,0.05)_0px_10px_20px_-5px] shrink-0">
                    <div
                      ref={(el) => {
                        cardImagesRef.current[i] = el;
                      }}
                      className="absolute inset-0 w-full h-full will-change-transform"
                    >
                      <Image
                        src={item.src}
                        alt={item.author}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
