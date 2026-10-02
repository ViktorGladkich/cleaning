"use client";

import React from "react";
import Image from "next/image";

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

export function PartnersMarquee() {
  return (
    <section className="relative z-10 w-full pt-12 pb-6 sm:pt-16 sm:pb-8 bg-brand-cream  overflow-hidden">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <p className="text-center text-lg font-medium uppercase tracking-widest text-brand-navy">
          Unsere starken Partner & Referenzen
        </p>
      </div>

      <div className="relative flex overflow-hidden w-full bg-brand-cream mask-fade-edges pb-6">
        <div className="flex animate-marquee items-center min-w-max space-x-12 sm:space-x-24 px-6 sm:px-12">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center transition-all duration-500 mix-blend-multiply"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={60}
                style={{ width: partner.width, height: "auto", maxHeight: "60px", objectFit: "contain" }}
                className="pointer-events-none"
              />
            </div>
          ))}
        </div>
        
        {/* Duplicate for seamless looping */}
        <div className="flex animate-marquee items-center min-w-max space-x-12 sm:space-x-24 px-6 sm:px-12" aria-hidden="true">
          {partners.map((partner, idx) => (
            <div
              key={`dup-${idx}`}
              className="flex items-center justify-center transition-all duration-500 mix-blend-multiply"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={60}
                style={{ width: partner.width, height: "auto", maxHeight: "60px", objectFit: "contain" }}
                className="pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
