"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const partners = [
  { name: "Arnold Electronic", src: "/logos/arnold_electronic_logo.svg", width: 140 },
  { name: "Biendo Hotel", src: "/logos/biendo_hotel_logo.svg", width: 120 },
  { name: "Günter Hüttner", src: "/logos/Gunter_Hüttner_logo.svg", width: 150 },
  { name: "Pentagon", src: "/logos/Pentagon_logo.svg", width: 120 },
  { name: "Zur Zeile", src: "/logos/Zur_Zeile_logo.avif", width: 130 },
  { name: "Hildebrand Partner", src: "/logos/hildebrand-partner-logo.svg", width: 140 },
  { name: "Edeka", src: "/logos/Edeka.webp", width: 110 },
  { name: "Luxor", src: "/logos/logo_luxor.svg", width: 110 },
];

// Doubled partner list so all 8 logos seamlessly populate any viewport width
const marqueeList = [...partners, ...partners];

export function PartnersMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Title smooth upward reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 2. Marquee track smooth fade-in
      if (marqueeRef.current) {
        gsap.fromTo(
          marqueeRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
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
      id="partners"
      className="relative z-10 w-full pt-12 pb-6 sm:pt-16 sm:pb-8 bg-brand-cream overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <p
          ref={titleRef}
          className="text-center text-lg font-medium uppercase tracking-widest text-brand-navy will-change-transform"
        >
          Unsere starken Partner &amp; Referenzen
        </p>
      </div>

      <div
        ref={marqueeRef}
        className="relative flex overflow-hidden w-full bg-brand-cream mask-fade-edges pb-6 select-none will-change-transform"
      >
        {/* Track 1 */}
        <div
          className="flex animate-marquee items-center min-w-max gap-12 sm:gap-16 lg:gap-20 pr-12 sm:pr-16 lg:pr-20 hover:[animation-play-state:paused]"
          style={{ animationDuration: "40s" }}
        >
          {marqueeList.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 mix-blend-multiply shrink-0"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={50}
                className="h-9 sm:h-11 w-auto max-w-[150px] object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>
        
        {/* Track 2: Duplicate for seamless looping */}
        <div
          className="flex animate-marquee items-center min-w-max gap-12 sm:gap-16 lg:gap-20 pr-12 sm:pr-16 lg:pr-20 hover:[animation-play-state:paused]"
          style={{ animationDuration: "40s" }}
          aria-hidden="true"
        >
          {marqueeList.map((partner, idx) => (
            <div
              key={`dup-${idx}`}
              className="flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 mix-blend-multiply shrink-0"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={50}
                className="h-9 sm:h-11 w-auto max-w-[150px] object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
