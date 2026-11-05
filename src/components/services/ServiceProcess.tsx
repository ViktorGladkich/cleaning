"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ServiceDetailData } from "@/data/serviceDetails";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PROCESS_IMAGES: Record<ServiceDetailData["category"], string[]> = {
  reinigung: [
    "/images/services/step-reinigung-1.webp",
    "/images/services/step-reinigung-2.webp",
    "/images/services/step-reinigung-3.webp",
    "/images/services/step-reinigung-4.webp",
  ],
  bau: [
    "/images/services/step-bau-1.webp",
    "/images/services/step-bau-2.webp",
    "/images/services/step-bau-3.webp",
    "/images/services/step-bau-4.webp",
  ],
};

const HIDDEN = "inset(0 100% 0 0)";
const SHOWN = "inset(0 0% 0 0)";

interface ServiceProcessProps {
  service: ServiceDetailData;
}

export function ServiceProcess({ service }: ServiceProcessProps) {
  const rootRef = useRef<HTMLElement>(null);
  const images = PROCESS_IMAGES[service.category];
  const imageFor = (index: number) => images[index % images.length];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const steps = root.querySelectorAll<HTMLElement>("[data-step]");
      const frames = root.querySelectorAll<HTMLElement>("[data-frame]");
      const lines = root.querySelectorAll<HTMLElement>("[data-line]");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        frames.forEach((frame, index) => {
          if (index === 0) return;
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: steps[index],
                start: "top 88%",
                end: "top 42%",
                scrub: true,
              },
            })
            .fromTo(frame, { clipPath: HIDDEN }, { clipPath: SHOWN }, 0)
            .fromTo(lines[index - 1], { left: "0%" }, { left: "100%" }, 0);
        });

        steps.forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0.28 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 82%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
        });
      });

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: reduce)", () => {
        frames.forEach((frame, index) => {
          if (index === 0) return;
          gsap.set(frame, { clipPath: HIDDEN });
          ScrollTrigger.create({
            trigger: steps[index],
            start: "top 55%",
            onEnter: () => gsap.set(frame, { clipPath: SHOWN }),
            onLeaveBack: () => gsap.set(frame, { clipPath: HIDDEN }),
          });
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="bg-brand-ink py-20 text-white sm:py-28">
      <div className="grid grid-cols-1 gap-6 px-(--pad) lg:grid-cols-12 lg:gap-8">
        <p className="text-base text-white/75 lg:col-span-3 lg:pt-4">Ablauf</p>
        <h2 className="text-3xl font-normal leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl hyphens-auto lg:col-span-9">
          Vom ersten Gespräch bis zur Abnahme.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 px-(--pad) lg:mt-16 lg:grid-cols-12">
        <div className="sticky top-28 hidden h-[calc(100svh-9rem)] overflow-hidden rounded-sm lg:col-span-6 lg:block">
          {service.processSteps.map((step, index) => (
            <div
              key={step.number}
              data-frame
              className="absolute inset-0"
              style={{ zIndex: index + 1 }}
            >
              <Image
                src={imageFor(index)}
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          ))}
          {service.processSteps.slice(1).map((step) => (
            <div
              key={step.number}
              data-line
              aria-hidden="true"
              style={{ zIndex: service.processSteps.length + 1, left: "100%" }}
              className="absolute inset-y-0 w-0.5 bg-brand-lime shadow-[0_0_24px_5px_rgba(234,243,178,0.5)]"
            />
          ))}
        </div>

        <ol className="lg:col-span-5 lg:col-start-8">
          {service.processSteps.map((step, index) => (
            <li
              key={step.number}
              data-step
              className="flex flex-col justify-center border-t border-white/20 py-10 first:border-t-0 first:pt-0 lg:min-h-[78svh] lg:border-t-0 lg:py-0"
            >
              <div className="relative mb-7 aspect-square overflow-hidden rounded-sm lg:hidden">
                <Image
                  src={imageFor(index)}
                  alt=""
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </div>
              <span
                aria-hidden="true"
                className="text-3xl font-light leading-none tracking-tight text-brand-lime sm:text-4xl lg:text-5xl"
              >
                {step.number}
              </span>
              <h3 className="mt-4 text-2xl font-normal leading-[1.15] tracking-tight lg:text-3xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-base font-light leading-relaxed text-white/85 lg:text-lg">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
