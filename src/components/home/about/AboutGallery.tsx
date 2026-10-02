"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { GALLERY_CARDS } from "./aboutData";

export function AboutGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      // 1. Kinetic Monumental Typography Line-Reveal in Gallery
      gsap.fromTo(
        ".gallery-hero-line",
        { y: "115%" },
        {
          y: "0%",
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".gallery-lime-pill",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          delay: 0.35,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".gallery-lime-text",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          delay: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Corner texts reveal (Top-Left & Bottom-Right)
      gsap.fromTo(
        [".gallery-corner-text-top", ".gallery-corner-text-bottom"],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const revealedCards = new Set<number>();

      // ==============================================================
      // PINNED MASTER TIMELINE: Seamlessly pins without jerking or freezing
      // ==============================================================
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: gallery,
          start: "top top",
          end: "+=2600",
          pin: true,
          pinSpacing: true,
          scrub: 0.4, // Fluid & immediate response with Lenis smooth scroll
          anticipatePin: 0, // Disable anticipatePin to prevent sudden pre-pin hitch with Lenis
          invalidateOnRefresh: true,
        },
      });

      // Animate each floating gallery card (vertical glide + corner unmask in view + parallax drift)
      GALLERY_CARDS.forEach((card) => {
        const wrap = gallery.querySelector(`.${card.wrapperClass.split(" ")[0]}`);
        const mask = gallery.querySelector(`.${card.maskClass}`);
        const img = gallery.querySelector(`.${card.imageClass}`);
        if (!wrap || !mask) return;

        const duration = card.duration ?? 0.52;

        // 1. Float from beneath the bottom of the screen (115vh) up and off top (-135vh)
        pinTl.fromTo(
          wrap,
          { y: "115vh", ...(card.isCenter ? { xPercent: -50 } : {}) },
          { y: "-135vh", ...(card.isCenter ? { xPercent: -50 } : {}), duration, ease: "none" },
          card.startTime
        );

        // 2. Corner mask unmasking happens ONCE right as the card emerges into the visible screen!
        // At startTime + 0.035, the card is entering the visible area from the bottom edge.
        pinTl.call(
          () => {
            if (!revealedCards.has(card.id)) {
              revealedCards.add(card.id);
              gsap.fromTo(
                mask,
                { clipPath: card.initialClipPath, opacity: 0 },
                {
                  clipPath: card.finalClipPath,
                  opacity: 1,
                  duration: 1.4,
                  ease: "power2.out",
                  overwrite: "auto",
                }
              );
            }
          },
          [],
          card.startTime + 0.025
        );

        // 3. Image parallax drift inside the masked container with unique depth per card
        if (img) {
          const pY = card.parallaxY ?? 25;
          const pScale = card.parallaxScale ?? 1.35;

          pinTl.fromTo(
            img,
            { scale: pScale, yPercent: -pY },
            { scale: pScale, yPercent: pY, duration, ease: "none" },
            card.startTime
          );
        }
      });
    },
    { scope: galleryRef }
  );

  return (
    <div
      ref={galleryRef}
      className="relative w-full h-[100svh] min-h-[580px] sm:h-screen sm:min-h-[640px] max-h-[1080px] overflow-hidden border-t border-slate-200/60 my-0"
    >
      {/* Pinned background / text stage: centered & fixed in place */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between py-8 sm:py-14 pointer-events-none select-none">
        
        {/* Corner Text: Top-Left */}
        <div className="px-4 sm:px-8 lg:px-12 flex justify-start">
          <div className="gallery-corner-text-top max-w-xs sm:max-w-sm text-xs sm:text-sm text-slate-500 font-normal leading-relaxed text-left pointer-events-auto">
            Präziser Innenausbau trifft auf vollendete Sauberkeit. Jedes Detail meisterhaft bedacht – von der ersten Trockenbauwand bis zur bezugsfertigen Perfektion.
          </div>
        </div>

        {/* Giant Monumental Headline in Center (3 Lines) */}
        <div className="gallery-typography-wrapper text-center my-auto px-4 relative z-10">
          <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.6rem] xl:text-[4.1rem] font-medium text-brand-navy tracking-tight leading-[1.08] select-none">
            {/* Line 1 */}
            <span className="block overflow-hidden whitespace-nowrap">
              <span className="block gallery-hero-line translate-y-full will-change-transform">
                Zwei Gewerke.
              </span>
            </span>
            {/* Line 2 */}
            <span className="block overflow-hidden whitespace-nowrap pt-1.5 sm:pt-2.5">
              <span className="block gallery-hero-line translate-y-full will-change-transform">
                Ein meisterhafter
              </span>
            </span>
            {/* Line 3 */}
            <span className="block overflow-hidden whitespace-nowrap pt-1.5 sm:pt-2.5">
              <span className="block gallery-hero-line translate-y-full will-change-transform">
                <span className="gallery-lime-pill inline-block bg-brand-lime px-3 sm:px-5 py-0.5 sm:py-1 rounded sm:rounded-md text-slate-900 origin-left scale-x-0 transform-gpu">
                  <span className="gallery-lime-text opacity-0">Qualitätsstandard</span>
                </span>
              </span>
            </span>
          </h3>
        </div>

        {/* Corner Text: Bottom-Right */}
        <div className="px-4 sm:px-8 lg:px-12 flex justify-end">
          <div className="gallery-corner-text-bottom max-w-xs sm:max-w-sm text-xs sm:text-sm text-slate-500 font-normal leading-relaxed text-left sm:text-right pointer-events-auto">
            Strukturierte Ästhetik & werterhaltende Pflege für anspruchsvolle Wohn- und Gewerbeobjekte in Chemnitz und ganz Sachsen.
          </div>
        </div>

      </div>

      {/* Floating Parallax Images (z-30: glide OVER text and off-screen) */}
      {GALLERY_CARDS.map((card) => (
        <div key={card.id} className={card.wrapperClass}>
          <div
            className={`${card.maskClass} ${card.widthClass} ${card.aspectClass} rounded sm:rounded-md overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 opacity-0`}
            style={{ clipPath: card.initialClipPath }}
          >
            <Image
              src={card.src}
              alt={card.alt}
              fill
              quality={90}
              sizes={card.sizes}
              className={`${card.imageClass} object-cover object-center will-change-transform`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
