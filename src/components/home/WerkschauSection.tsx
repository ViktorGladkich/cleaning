"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { GALLERY_CARDS } from "./about/aboutData";

// Length of the GSAP card timeline: the CSS version maps the same segments onto the scroll.
const TIMELINE_LENGTH = Math.max(...GALLERY_CARDS.map((card) => card.startTime + (card.duration ?? 0.46)));
import { useLockedHeroHeight } from "@/hooks/useLockedHeroHeight";

export function WerkschauSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Lock mobile gallery height in exact pixels so Google App WebView
  // toolbar collapse/expansion doesn't resize the sticky container or trigger layout shifts.
  const lockedGalleryHeight = useLockedHeroHeight(0);

  useGSAP(
    () => {
      const scrollTrack = scrollTrackRef.current;
      const gallery = galleryRef.current;
      if (!scrollTrack || !gallery) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      // Phones with scroll-driven animations: the cards move in CSS, in step with the
      // scroll. Moving them from JS inside a sticky stage lags behind on iOS.
      const cssDriven = isMobile && CSS.supports("animation-timeline: view()");

      // Set initial off-screen position for all floating cards immediately on mount
      GALLERY_CARDS.forEach((card) => {
        const wrap = gallery.querySelector(`.${card.wrapperClass.split(" ")[0]}`);
        const mask = gallery.querySelector(`.${card.maskClass}`);
        const img = gallery.querySelector(`.${card.imageClass}`);

        if (wrap && !cssDriven) {
          gsap.set(wrap, {
            y: () => gallery.offsetHeight * 1.15,
            ...(card.isCenter ? { xPercent: -50 } : {}),
            force3D: true,
          });
        }

        if (mask) {
          if (!isMobile) {
            gsap.set(mask, { clipPath: card.initialClipPath, opacity: 0 });
          } else {
            gsap.set(mask, { clearProps: "clipPath,opacity" });
          }
        }

        if (img) {
          if (!isMobile) {
            const pY = card.parallaxY ?? 8;
            const pScale = card.parallaxScale ?? 1.24;
            gsap.set(img, { scale: pScale, yPercent: -pY, force3D: true });
          } else {
            gsap.set(img, { clearProps: "transform" });
          }
        }
      });

      // 1. Unified Kinetic Typography Reveal when section enters viewport
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTrack,
          start: "top 82%",
          once: true,
        },
      });

      revealTl
        .fromTo(
          ".werkschau-hero-line",
          { yPercent: 115, y: 0 },
          {
            yPercent: 0,
            y: 0,
            duration: 1.0,
            stagger: 0.12,
            ease: "power4.out",
          }
        )
        .fromTo(
          ".werkschau-lime-pill",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power3.inOut",
          },
          "-=0.55"
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
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.55"
        );

      const revealedCards = new Set<number>();

      // ==============================================================
      // NATIVE STICKY SCROLL TIMELINE (Zero JS pin jitter on mobile/desktop)
      // Hardware CSS `position: sticky` holds galleryRef rock-solid at top-0
      // while ScrollTrigger scrubs the floating cards from bottom to top.
      // ==============================================================
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTrack,
          start: "top top",
          end: "bottom bottom",
          scrub: isMobile ? true : 0.35,
          invalidateOnRefresh: !isMobile,
        },
      });

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

      const galleryHeight = gallery.offsetHeight;

      // Animate each floating gallery card (vertical glide + corner unmask on desktop + parallax drift)
      GALLERY_CARDS.forEach((card) => {
        const wrap = gallery.querySelector(`.${card.wrapperClass.split(" ")[0]}`);
        const mask = gallery.querySelector(`.${card.maskClass}`);
        const img = gallery.querySelector(`.${card.imageClass}`);
        if (!wrap || !mask) return;

        const duration = card.duration ?? 0.46;

        // 1. Float from beneath the bottom of the screen up and off top using pixel values
        if (!cssDriven) pinTl.fromTo(
          wrap,
          {
            y: () => galleryHeight * 1.15,
            ...(card.isCenter ? { xPercent: -50 } : {}),
            force3D: true,
          },
          {
            y: () => -galleryHeight * 1.35,
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

        // 3. Image parallax drift inside the masked container (desktop only; on mobile single-layer card translation prevents GPU re-tiling)
        if (img && !isMobile) {
          const pY = card.parallaxY ?? 8;
          const pScale = card.parallaxScale ?? 1.24;

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
      aria-label="Werkschau & Projektdetails"
      className="relative z-10 w-full bg-brand-cream pb-10 sm:pb-14 lg:pb-18"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Tall Scroll Track: native CSS sticky inside keeps the stage 100% vibration-free during scroll */}
        <div
          ref={scrollTrackRef}
          style={{ height: lockedGalleryHeight ? `${lockedGalleryHeight * 3.6}px` : undefined }}
          className="werkschau-track relative w-full h-[360svh] min-h-650"
        >
          <div
            ref={galleryRef}
            style={
              {
                height: lockedGalleryHeight ? `${lockedGalleryHeight}px` : undefined,
                "--gallery-h": lockedGalleryHeight ? `${lockedGalleryHeight}px` : "100svh",
              } as React.CSSProperties
            }
            className="sticky top-0 w-full h-svh sm:h-screen sm:min-h-160 max-h-270 overflow-hidden"
          >
            {/* Static background / text stage: promoted to its own hardware layer, completely decoupled from moving cards */}
            <div
              className="absolute inset-0 z-10 flex flex-col justify-between py-8 sm:py-14 pointer-events-none select-none"
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
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
                    <span className="block werkschau-hero-line">
                      Präzision im Bau.
                    </span>
                  </span>
                  {/* Line 2 */}
                  <span className="block overflow-hidden whitespace-nowrap pt-1.5 sm:pt-2.5">
                    <span className="block werkschau-hero-line">
                      Perfektion im Glanz.
                    </span>
                  </span>
                  {/* Line 3 with Lime Accent Pill */}
                  <span className="block overflow-hidden whitespace-nowrap pt-1.5 sm:pt-2.5">
                    <span className="block werkschau-hero-line">
                      <span className="werkschau-lime-pill inline-block bg-brand-lime px-3 py-0.5 rounded sm:rounded-md text-brand-navy origin-left">
                        <span className="werkschau-lime-text">Bis ins Detail</span>
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

            {/* Floating Parallax Images (z-30: isolated GPU compositing layer so moving cards never re-tile static text) */}
            <div
              className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
              style={{
                contain: "layout paint",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              {GALLERY_CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`werkschau-card ${card.wrapperClass}`}
                  style={
                    {
                      "--from": `${(card.startTime / TIMELINE_LENGTH) * 100}%`,
                      "--to": `${((card.startTime + (card.duration ?? 0.46)) / TIMELINE_LENGTH) * 100}%`,
                      "--shift-x": card.isCenter ? "-50%" : "0px",
                    } as React.CSSProperties
                  }
                >
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
      </div>
    </section>
  );
}
