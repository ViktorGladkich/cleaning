"use client";

import React from "react";
import { ReinigungHero } from "./ReinigungHero";
import { ReinigungEditorialGrid } from "./ReinigungEditorialGrid";
import { ReinigungMinimalProtocol } from "./ReinigungMinimalProtocol";
import { ReinigungMinimalFaq } from "./ReinigungMinimalFaq";
import { ReinigungMinimalCta } from "./ReinigungMinimalCta";

export function ReinigungPageContent() {
  return (
    <div className="relative w-full bg-brand-cream text-brand-navy selection:bg-brand-navy selection:text-white">
      {/* 1. Ultra-clean full-frame hero with monumental typography & 4 minimalist metrics */}
      <ReinigungHero />

      {/* 2. Editorial 6-card grid with RollingText, diagonal arrows, photographic assets and top-sliding navy mask */}
      <ReinigungEditorialGrid />

      {/* 3. Deep Navy architectural statement with 4-step sequence */}
      <ReinigungMinimalProtocol />

      {/* 4. Minimalist FAQ with gliding architectural photo and clean line accordions */}
      <ReinigungMinimalFaq />

      {/* 5. Minimalist full-width frame CTA */}
      <ReinigungMinimalCta />
    </div>
  );
}
