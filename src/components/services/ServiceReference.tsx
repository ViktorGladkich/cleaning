import React from "react";
import Image from "next/image";
import { ServiceDetailData } from "@/data/serviceDetails";

type Reference = NonNullable<ServiceDetailData["reference"]>;

/** Real project photos, before and after. Only published with the client's approval. */
export function ServiceReference({ reference }: { reference: Reference }) {
  const photos = [
    { label: "Vorher", src: reference.beforeSrc, alt: reference.beforeAlt },
    { label: "Nachher", src: reference.afterSrc, alt: reference.afterAlt },
  ];

  return (
    <section
      aria-labelledby="referenz-title"
      className="bg-brand-cream pb-20 text-brand-ink sm:pb-28"
    >
      <div className="grid grid-cols-1 gap-6 px-(--pad) lg:grid-cols-12 lg:gap-8">
        <p className="text-base text-brand-ink/75 lg:col-span-3 lg:pt-3">Referenz</p>
        <div className="lg:col-span-9">
          <h2
            id="referenz-title"
            className="text-3xl font-normal leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl hyphens-auto"
          >
            {reference.title}
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-brand-ink/80 sm:text-lg">
            {reference.description}
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 px-(--pad) md:grid-cols-2 lg:mt-14 lg:gap-6">
        {photos.map((photo) => (
          <figure key={photo.label} className="relative overflow-hidden rounded-2xl bg-brand-ink/5">
            <div className="relative aspect-4/3 w-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute left-3 top-3 rounded-md bg-brand-ink/85 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {photo.label}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 px-(--pad) text-xs text-brand-ink/60">
        Eigene Projektfotos, Gößnitz.
      </p>
    </section>
  );
}
