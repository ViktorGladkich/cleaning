"use client";

import React from "react";
import { AboutEditorialHeader } from "./about/AboutEditorialHeader";
import { AboutGallery } from "./about/AboutGallery";
import { AboutFeatures } from "./about/AboutFeatures";
import { AboutStats } from "./about/AboutStats";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 w-full py-20 sm:py-24 lg:py-28 bg-brand-cream overflow-x-clip"
    >
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AboutEditorialHeader />
        <AboutGallery />
        <AboutFeatures />
        <AboutStats />
      </div>
    </section>
  );
}
