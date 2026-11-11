"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ServiceDetailData } from "@/data/serviceDetails";
import { CtaButton } from "@/components/ui/CtaButton";
import { gsap } from "@/lib/gsap";
import { useLockedHeroHeight } from "@/hooks/useLockedHeroHeight";

interface ServiceDetailHeroProps {
  service: ServiceDetailData;
}

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const lockedHeight = useLockedHeroHeight(0);

  const words = service.title.split(" ");

  const categoryHref = service.category === "reinigung" ? "/services" : "/bau";
  const contactHref = `/contacts?service=${encodeURIComponent(service.slug)}#anfrage`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          // Starts while the page-transition curtain lifts, so the first thing
          // visitors see is the line clearing the dull image.
          const timeline = gsap.timeline({
            delay: 0.55,
            defaults: { ease: "power4.out" },
          });

          timeline
            .fromTo(
              ".hero-clean",
              { clipPath: "inset(0 100% 0 0)" },
              { clipPath: "inset(0 0% 0 0)", duration: 1.8, ease: "power2.inOut" },
              0
            )
            .fromTo(
              ".hero-line",
              { left: "0%", opacity: 1 },
              { left: "100%", duration: 1.8, ease: "power2.inOut" },
              0
            )
            .set(".hero-line", { opacity: 0 })
            .fromTo(
              ".hero-word",
              { yPercent: 115 },
              { yPercent: 0, duration: 1.25, stagger: 0.08 },
              0.3
            )
            .fromTo(
              ".hero-fade",
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 },
              0.95
            );
        },
        rootRef.current ?? undefined
      );

      // Desktop only: in-app mobile browsers resize the viewport while scrolling.
      mm.add(
        "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(".hero-media", {
            yPercent: -9,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        },
        rootRef.current ?? undefined
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      aria-label={service.title}
      style={{ minHeight: lockedHeight ? `${lockedHeight}px` : undefined }}
      className="relative isolate flex min-h-svh w-full flex-col justify-end overflow-hidden bg-brand-ink pb-8 pt-32 text-white sm:pb-12 sm:pt-36"
    >
      <div
        aria-hidden="true"
        className="hero-media absolute inset-x-0 top-0 bottom-[30%] -z-10 max-lg:[mask-image:linear-gradient(to_bottom,black_72%,transparent)] lg:-bottom-[10%]"
      >
        <Image
          src={service.imageSrc}
          alt=""
          fill
          sizes="100vw"
          style={{ objectPosition: service.imagePosition }}
          className="object-cover object-center brightness-[0.62] contrast-[0.9] grayscale"
        />
      </div>

      <div className="hero-media absolute inset-x-0 top-0 bottom-[30%] -z-10 max-lg:[mask-image:linear-gradient(to_bottom,black_72%,transparent)] lg:-bottom-[10%]">
        <div className="hero-clean absolute inset-0">
          <Image
            src={service.imageSrc}
            alt={service.imageAlt}
            fill
            preload
            sizes="100vw"
            style={{ objectPosition: service.imagePosition }}
            className="object-cover object-center"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hero-line pointer-events-none absolute inset-y-0 -z-10 w-0.5 bg-brand-lime opacity-0 shadow-[0_0_28px_6px_rgba(234,243,178,0.55)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/40 via-45% to-transparent to-75%"
      />

      <div className="w-full px-(--pad)">
        <nav
          aria-label="Brotkrumen"
          className="hero-fade mb-5 flex min-w-0 items-center gap-2 text-sm text-white/80"
        >
          <Link href="/" className="shrink-0 transition-colors hover:text-brand-lime">
            Startseite
          </Link>
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-white/50" />
          <Link href={categoryHref} className="shrink-0 transition-colors hover:text-brand-lime">
            {service.categoryLabel}
          </Link>
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-white/50" />
          <span aria-current="page" className="min-w-0 truncate text-white">
            {service.title}
          </span>
        </nav>

        {/* Same scale as the home page headline */}
        <h1 className="text-3xl font-medium leading-[1.1] tracking-tight text-white wrap-break-word hyphens-auto sm:text-5xl lg:text-[54px]">
          {words.map((word, index) => (
            <React.Fragment key={`${word}-${index}`}>
              <span className="inline-block max-w-full overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]">
                <span className="hero-word inline-block max-w-full">{word}</span>
              </span>
              {index < words.length - 1 ? " " : null}
            </React.Fragment>
          ))}
        </h1>

        <div className="mt-4 grid grid-cols-1 items-end gap-6 sm:mt-5 lg:grid-cols-12 lg:gap-8">
          <p className="hero-fade max-w-[58ch] text-sm leading-relaxed text-white/85 sm:text-base lg:col-span-7 lg:text-lg">
            {service.heroDescription}
          </p>

          <div className="hero-fade lg:col-span-5 lg:flex lg:justify-end">
            <CtaButton href={contactHref} size="md">
              {service.ctaLabel}
            </CtaButton>
          </div>
        </div>

        <p className="hero-fade mt-6 text-xs text-white/70">
          {service.heroIsProjectPhoto
            ? "Titelbild: eigenes Projektfoto. Weitere Symbolbilder auf dieser Seite: KI-generiert."
            : "Symbolbilder auf dieser Seite: KI-generiert."}
        </p>
      </div>
    </section>
  );
}
