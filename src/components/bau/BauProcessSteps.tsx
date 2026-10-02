import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BauProcessSteps() {
  const steps = [
    {
      step: "01",
      title: "Kostenlose Besichtigung",
      desc: "Wir schauen uns Ihr Objekt vor Ort in Chemnitz an, messen alles genau aus und besprechen Ihre Wünsche.",
    },
    {
      step: "02",
      title: "Festpreis-Angebot",
      desc: "Sie erhalten ein verbindliches, detailliertes Angebot ohne versteckte Zusatzkosten.",
    },
    {
      step: "03",
      title: "Fachgerechter Bau",
      desc: "Erfahrene Handwerker führen die Arbeiten zügig, sauber und mit Qualitätsmaterialien aus.",
    },
    {
      step: "04",
      title: "Bauendreinigung & Übergabe",
      desc: "Wir entfernen Bauschutt und Feinstaub und übergeben Ihnen die Räume schlüsselfertig und glänzend sauber.",
    },
  ];

  return (
    <div className="mt-20">
      <SectionHeading
        badge="Unser Ablauf"
        title="In 4 einfachen Schritten zum perfekten Ergebnis"
        subtitle="Transparent, termintreu und ohne Überraschungen – so arbeiten wir in Chemnitz und Umgebung."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {steps.map((item) => (
          <div
            key={item.step}
            className="p-6 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 space-y-3 relative overflow-hidden"
          >
            <span className="text-4xl font-extrabold text-brand-navy/20 dark:text-brand-navy/30 block">
              {item.step}
            </span>
            <h4 className="text-base font-bold text-neutral-900 dark:text-white">
              {item.title}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
