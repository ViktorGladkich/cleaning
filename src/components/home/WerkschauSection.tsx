"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { GALLERY_CARDS } from "./about/aboutData";

export function WerkschauSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      // 1. Kinetic Monumental Typography Line-Reveal
      gsap.fromTo(
        ".werkschau-hero-line",
        { y: "115%" },
        {
          y: "0%",
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".werkschau-lime-pill",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          delay: 0.35,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".werkschau-lime-text",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          delay: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            once: true,
          },
        }
      );

      // Corner texts & Scroll indicator reveal
      gsap.fromTo(
        [
          ".werkschau-corner-text-top",
          ".werkschau-corner-text-bottom",
          ".werkschau-scroll-indicator",
        ],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 78%",
            once: true,
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
          scrub: 0.4,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });

      // Smooth continuous oscillation of the scroll indicator line
      gsap.to(".werkschau-indicator-dot", {
        y: 11,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Fade out scroll indicator as the cards begin to glide up
      pinTl.to(
        ".werkschau-scroll-indicator",
        { opacity: 0, y: 15, duration: 0.08, ease: "power2.out" },
        0.04
      );

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

        // 2. Corner mask unmasking happens ONCE right as the card emerges into view
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
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="werkschau"
      aria-label="Werkschau & Meisterdetails"
      className="relative z-10 w-full bg-brand-cream overflow-x-clip"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={galleryRef}
          className="relative w-full h-svh min-h-145 sm:h-screen sm:min-h-160 max-h-270 overflow-hidden border-t border-slate-200/60 my-0"
        >
          {/* Pinned background / text stage: centered & fixed in place */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between py-8 sm:py-14 pointer-events-none select-none">
            {/* Corner Text: Top-Left */}
            <div className="px-4 sm:px-8 lg:px-12 flex justify-start">
              <div className="werkschau-corner-text-top max-w-xs sm:max-w-sm text-xs sm:text-sm text-brand-navy/60 font-light leading-relaxed text-left pointer-events-auto">
                Einblicke in unsere Handwerks- &amp; Reinigungsstandards. Vom denkmalgeschützten Altbau bis zum modernen Gewerbeobjekt in Chemnitz und ganz Sachsen.
              </div>
            </div>

            {/* Giant Monumental Headline in Center (3 Lines) */}
            <div className="werkschau-typography-wrapper text-center my-auto px-4 relative z-10">
              <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.6rem] xl:text-[4.1rem] font-medium text-brand-navy tracking-tight leading-[1.08] select-none">
                {/* Line 1 */}
                <span className="block overflow-hidden whitespace-nowrap">
                  <span className="block werkschau-hero-line translate-y-full will-change-transform">
                    Präzision im Bau.
                  </span>
                </span>
                {/* Line 2 */}
                <span className="block overflow-hidden whitespace-nowrap pt-1.5 sm:pt-2.5">
                  <span className="block werkschau-hero-line translate-y-full will-change-transform">
                    Perfektion im Glanz.
                  </span>
                </span>
                {/* Line 3 with Lime Accent Pill */}
                <span className="block overflow-hidden whitespace-nowrap pt-1.5 sm:pt-2.5">
                  <span className="block werkschau-hero-line translate-y-full will-change-transform">
                    <span className="werkschau-lime-pill inline-block bg-brand-lime px-3 py-0.5 rounded sm:rounded-md text-brand-navy origin-left scale-x-0 transform-gpu">
                      <span className="werkschau-lime-text opacity-0">Bis ins Detail</span>
                    </span>
                  </span>
                </span>
              </h3>
            </div>

            {/* Corner Text: Bottom-Right */}
            <div className="px-4 sm:px-8 lg:px-12 flex justify-end">
              <div className="werkschau-corner-text-bottom max-w-xs sm:max-w-sm text-xs sm:text-sm text-brand-navy/60 font-light leading-relaxed text-left sm:text-right pointer-events-auto">
                Keine Kompromisse bei Material, Hygiene und Ausführung. Festangestellte Fachkräfte und lückenlose Qualitätskontrolle bei jedem Schritt.
              </div>
            </div>

            {/* Informational Scroll Indicator */}
            <div className="werkschau-scroll-indicator absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none select-none">
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-brand-navy/70">
                Scrollen
              </span>
              <div className="w-5 h-8 rounded-full border border-brand-navy/30 bg-white/70 backdrop-blur-xs flex items-start justify-center pt-1.5 shadow-xs overflow-hidden">
                <span className="werkschau-indicator-dot w-1 h-2.5 rounded-full bg-brand-navy will-change-transform" />
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
      </div>
    </section>
  );
}
