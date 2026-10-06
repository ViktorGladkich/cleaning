"use client";

import React from "react";
import { AboutEditorialHeader } from "./about/AboutEditorialHeader";
import { AboutGallery } from "./about/AboutGallery";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 w-full pt-20 sm:pt-24 lg:pt-28 pb-0 bg-brand-cream overflow-x-clip"
    >
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AboutEditorialHeader />
        <AboutGallery />
      </div>
    </section>
  );
}
