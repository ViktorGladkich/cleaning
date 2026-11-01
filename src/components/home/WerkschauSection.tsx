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

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      // On desktop, set initial clipPath & opacity on card masks for the first-load reveal animation.
      // On mobile, images have no appearance animation and remain immediately visible.
      if (!isMobile) {
        GALLERY_CARDS.forEach((card) => {
          const mask = gallery.querySelector(`.${card.maskClass}`);
          if (mask) {
            gsap.set(mask, { clipPath: card.initialClipPath, opacity: 0 });
          }
        });
      } else {
        GALLERY_CARDS.forEach((card) => {
          const mask = gallery.querySelector(`.${card.maskClass}`);
          if (mask) {
            gsap.set(mask, { clearProps: "clipPath,opacity" });
          }
        });
      }

      // 1. Unified Kinetic Typography Reveal (single timeline prevents race conditions and scroll jitter)
      // Once completed, all transforms & will-change are cleared so the text sits on a pure
      // static raster layer and never jitters when images glide over it on mobile GPUs.
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: gallery,
          start: "top 78%",
          once: true,
        },
        onComplete: () => {
          gallery
            .querySelectorAll(".werkschau-hero-line")
            .forEach((el) => el.classList.remove("translate-y-full"));
          gallery
            .querySelectorAll(".werkschau-lime-pill")
            .forEach((el) => el.classList.remove("scale-x-0"));
          gsap.set(
            [
              ".werkschau-hero-line",
              ".werkschau-lime-pill",
              ".werkschau-corner-text-top",
              ".werkschau-corner-text-bottom",
            ],
            { clearProps: "transform,translate,scale,rotate,willChange" }
          );
        },
      });

      revealTl
        .fromTo(
          ".werkschau-hero-line",
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
          }
        )
        .fromTo(
          ".werkschau-lime-pill",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.65,
            ease: "power3.inOut",
          },
          "-=0.5"
        )
        .fromTo(
          ".werkschau-lime-text",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.25"
        )
        .fromTo(
          [
            ".werkschau-corner-text-top",
            ".werkschau-corner-text-bottom",
            ".werkschau-scroll-indicator",
          ],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.5"
        );

      const revealedCards = new Set<number>();

      // ==============================================================
      // PINNED MASTER TIMELINE: Seamlessly pins without jerking or freezing
      // Cards float sequentially one below another: Left -> Right -> Center -> Left -> Right
      // ==============================================================
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: gallery,
          start: "top top",
          end: "+=3000",
          pin: true,
          pinSpacing: true,
          scrub: 0.45,
          anticipatePin: 0,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });
      gsap.set(gallery, { clearProps: "transform" });

      // Smooth continuous oscillation of the scroll indicator line (desktop/tablet only)
      if (!isMobile) {
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
      }

      // Animate each floating gallery card (vertical glide + corner unmask on desktop + parallax drift)
      GALLERY_CARDS.forEach((card) => {
        const wrap = gallery.querySelector(`.${card.wrapperClass.split(" ")[0]}`);
        const mask = gallery.querySelector(`.${card.maskClass}`);
        const img = gallery.querySelector(`.${card.imageClass}`);
        if (!wrap || !mask) return;

        const duration = card.duration ?? 0.46;

        // 1. Float from beneath the bottom of the screen up and off top using pixel values
        // (avoids dynamic mobile CSS `vh` unit recalculation inside transform matrices during scroll)
        pinTl.fromTo(
          wrap,
          {
            y: () => gallery.offsetHeight * 1.15,
            ...(card.isCenter ? { xPercent: -50 } : {}),
            force3D: true,
          },
          {
            y: () => -gallery.offsetHeight * 1.35,
            ...(card.isCenter ? { xPercent: -50 } : {}),
            force3D: true,
            duration,
            ease: "none",
          },
          card.startTime
        );

        // 2. Corner mask unmasking happens ONCE right as the card emerges into view (desktop only)
        if (!isMobile) {
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
                    onComplete: () => {
                      gsap.set(mask, { clearProps: "clipPath" });
                    },
                  }
                );
              }
            },
            [],
            card.startTime + 0.025
          );
        }

        // 3. Image parallax drift inside the masked container with unique depth per card
        if (img) {
          const pY = card.parallaxY ?? 25;
          const pScale = card.parallaxScale ?? 1.35;

          pinTl.fromTo(
            img,
            { scale: pScale, yPercent: -pY, force3D: true },
            { scale: pScale, yPercent: pY, force3D: true, duration, ease: "none" },
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
      className="relative z-10 w-full bg-brand-cream overflow-x-clip pb-10 sm:pb-14 lg:pb-18"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={galleryRef}
          className="relative w-full h-svh min-h-145 sm:h-screen sm:min-h-160 max-h-270 overflow-hidden my-0"
        >
          {/* Pinned background / text stage: centered & fixed in place on a pure static layer */}
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
                  <span className="block werkschau-hero-line translate-y-full">
                    Präzision im Bau.
                  </span>
                </span>
                {/* Line 2 */}
                <span className="block overflow-hidden whitespace-nowrap pt-1.5 sm:pt-2.5">
                  <span className="block werkschau-hero-line translate-y-full">
                    Perfektion im Glanz.
                  </span>
                </span>
                {/* Line 3 with Lime Accent Pill */}
                <span className="block overflow-hidden whitespace-nowrap pt-1.5 sm:pt-2.5">
                  <span className="block werkschau-hero-line translate-y-full">
                    <span className="werkschau-lime-pill inline-block bg-brand-lime px-3 py-0.5 rounded sm:rounded-md text-brand-navy origin-left scale-x-0">
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
          </div>

          {/* Informational Scroll Indicator (hidden on mobile, visible on desktop/tablet, isolated from text stage) */}
          <div className="werkschau-scroll-indicator absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1.5 pointer-events-none select-none">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-brand-navy/70">
              Scrollen
            </span>
            <div className="w-5 h-8 rounded-full border border-brand-navy/30 bg-white/70 backdrop-blur-xs flex items-start justify-center pt-1.5 shadow-xs overflow-hidden">
              <span className="werkschau-indicator-dot w-1 h-2.5 rounded-full bg-brand-navy will-change-transform" />
            </div>
          </div>

          {/* Floating Parallax Images (z-30: isolated paint/compositing layer so moving cards never re-tile static text) */}
          <div
            className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
            style={{ contain: "layout paint" }}
          >
            {GALLERY_CARDS.map((card) => (
              <div key={card.id} className={card.wrapperClass}>
                <div
                  className={`relative ${card.maskClass} ${card.widthClass} ${card.aspectClass} rounded sm:rounded-md overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 md:opacity-0`}
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
      </div>
    </section>
  );
}
