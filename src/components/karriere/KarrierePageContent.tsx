import React from "react";
import Image from "next/image";
import { Phone, Mail, Sparkles, HardHat, UserCheck } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { COMPANY_INFO } from "@/lib/constants";
import { ApplicationForm } from "./ApplicationForm";

const HIGHLIGHTS = [
  {
    Icon: Sparkles,
    title: "Cleaning",
    text: "Reinigung von Büros, Hotels, Treppenhäusern, Praxen, Haushalten und mehr.",
  },
  {
    Icon: HardHat,
    title: "BAU",
    text: "Trockenbau, Rückbau, Entkernung, Renovierung und Beräumung.",
  },
  {
    Icon: UserCheck,
    title: "Mit Erfahrung oder als Quereinsteiger",
    text: "Erzähl uns kurz, wer du bist und in welchem Bereich du arbeiten möchtest.",
  },
];

export function KarrierePageContent() {
  return (
    <div className="relative w-full bg-brand-cream text-brand-navy selection:bg-brand-navy selection:text-white">
      {/* Hero */}
      <section
        aria-label="Karriere"
        className="relative z-10 flex min-h-[78svh] w-full items-center justify-center overflow-hidden bg-brand-navy"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/services/about-team.jpg"
            alt="Team von TADIK’S Cleaning & BAU in einheitlicher Arbeitskleidung"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/40 to-black/65 pointer-events-none" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center pt-36 pb-20 sm:pt-44 sm:pb-28">
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-lime">
            Karriere bei TADIK’S Cleaning &amp; BAU
          </span>
          <h1 className="mt-4 text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.05]">
            Werde Teil <span className="text-brand-lime font-light">unseres Teams!</span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
            Du möchtest im Bereich Reinigung oder Bau arbeiten? Dann freuen wir uns auf deine
            Bewerbung bei TADIK’S Cleaning &amp; BAU.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton href="#bewerbung" size="md">
              Jetzt online bewerben
            </CtaButton>
          </div>
          <p className="mt-6 text-xs text-white/75">Symbolbild: KI-generiert.</p>
        </div>
      </section>

      {/* Intro + form */}
      <section
        id="bewerbung"
        aria-label="Online-Bewerbung"
        className="relative z-10 w-full scroll-mt-28 py-16 sm:py-24 border-t border-brand-navy/10"
      >
        <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/80 block mb-3">
                Unkompliziert bewerben
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight leading-tight">
                Ob mit Berufserfahrung oder als{" "}
                <span className="inline-block bg-brand-lime rounded-lg px-1">
                  motivierter Quereinsteiger.
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-brand-navy/75 leading-relaxed">
                Erzähle uns kurz, wer du bist und in welchem Bereich du arbeiten möchtest. Bewirb
                dich unkompliziert über unser Online-Formular. Ein Lebenslauf ist freiwillig.
              </p>
            </div>

            <ul className="space-y-3">
              {HIGHLIGHTS.map(({ Icon, title, text }) => (
                <li
                  key={title}
                  className="flex items-start gap-3.5 rounded-2xl border border-brand-navy/10 bg-white p-4"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" />
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-brand-navy/70 leading-relaxed">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-brand-navy p-5 text-white">
              <p className="text-sm text-white/80">Fragen zur Bewerbung?</p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 hover:text-brand-lime"
                >
                  <Phone className="h-4 w-4" />
                  {COMPANY_INFO.phone}
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="inline-flex items-center gap-2 hover:text-brand-lime"
                >
                  <Mail className="h-4 w-4" />
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-brand-navy/10 p-5 sm:p-9 lg:p-10 shadow-lg shadow-brand-navy/5">
              <ApplicationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
