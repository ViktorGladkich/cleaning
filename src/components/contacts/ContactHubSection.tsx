"use client";

import React, { useState, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Send,
  Building2,
  Hammer,
  Layers,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";

type CategoryType = "reinigung" | "bau" | "kombi";

const SERVICES_BY_CAT: Record<CategoryType, string[]> = {
  reinigung: [
    "Unterhaltsreinigung",
    "Grundreinigung",
    "Bauendreinigung",
    "Fenster- & Glasreinigung",
    "Büro- & Praxisreinigung",
    "Fassaden- & Spezialreinigung",
  ],
  bau: [
    "Trockenbau & Akustik",
    "Maler- & Spachtelarbeiten (Q1–Q4)",
    "Komplettsanierung",
    "Bodenleger- & Fliesenarbeiten",
    "Abbruch & Entkernung",
  ],
  kombi: [
    "Komplettausbau inkl. Bauendreinigung",
    "Praxis- & Bürosanierung mit Turnusreinigung",
    "Mieterwechsel-Renovierung mit Endreinigung",
  ],
};

export function ContactHubSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [category, setCategory] = useState<CategoryType>("reinigung");
  const [selectedService, setSelectedService] = useState<string>(SERVICES_BY_CAT.reinigung[0]);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    area: "",
    comment: "",
    privacyAccepted: false,
  });

  const handleCategoryChange = (cat: CategoryType) => {
    setCategory(cat);
    setSelectedService(SERVICES_BY_CAT[cat][0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setSubmitted(true);
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        ".hub-col",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="anfrage"
      aria-label="Kontaktformular & Direkter Kontakt"
      className="relative z-10 w-full py-16 sm:py-24 lg:py-28 bg-brand-cream border-t border-brand-navy/10 overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Info & Trust Badges (5 cols) */}
          <div className="hub-col lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/80 block mb-3">
                Direkter Draht
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-brand-navy leading-tight">
                Sprechen Sie direkt mit{" "}
                <span className="font-semibold text-brand-navy">unserem Meister</span>.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-brand-navy/70 leading-relaxed font-light">
                Keine langen Warteschleifen. Rufen Sie uns an oder schreiben Sie uns — wir melden uns innerhalb von 24 Stunden verlässlich zurück.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3.5 pt-2">
              {/* Phone */}
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-navy/10 shadow-xs hover:shadow-md hover:border-brand-navy/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-navy/5 text-brand-navy flex items-center justify-center shrink-0 group-hover:bg-brand-navy group-hover:text-brand-lime transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-mono uppercase text-brand-navy/50 block mb-0.5">
                    Telefon &amp; WhatsApp
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-brand-navy group-hover:text-brand-navy/80 transition-colors block">
                    {COMPANY_INFO.phone}
                  </span>
                  <span className="text-[11px] text-brand-navy/60 mt-0.5 block">
                    Mo – Sa: 07:00 – 19:00 Uhr erreichbar
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-navy/10 shadow-xs hover:shadow-md hover:border-brand-navy/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-navy/5 text-brand-navy flex items-center justify-center shrink-0 group-hover:bg-brand-navy group-hover:text-brand-lime transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-mono uppercase text-brand-navy/50 block mb-0.5">
                    E-Mail-Anfrage
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-brand-navy group-hover:text-brand-navy/80 transition-colors block truncate">
                    {COMPANY_INFO.email}
                  </span>
                  <span className="text-[11px] text-brand-navy/60 mt-0.5 block">
                    Antwortgarantie innerhalb von 24 Stunden
                  </span>
                </div>
              </a>

              {/* Address / Headquarters */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-navy/10 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-brand-navy/5 text-brand-navy flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-mono uppercase text-brand-navy/50 block mb-0.5">
                    Standort &amp; Büro
                  </span>
                  <span className="text-base font-semibold text-brand-navy block">
                    {COMPANY_INFO.address}
                  </span>
                  <span className="text-[11px] text-brand-navy/60 mt-0.5 block">
                    Einsatzgebiet: Chemnitz, Zwickau, Freiberg &amp; Mittelsachsen
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Trust Signals */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
              <div className="p-3.5 rounded-xl bg-white/70 border border-brand-navy/10">
                <ShieldCheck className="w-4 h-4 text-brand-navy mb-1 sm:mx-0 mx-auto" />
                <span className="text-xs font-semibold text-brand-navy block">
                  Betriebshaftpflicht
                </span>
                <span className="text-[10px] text-brand-navy/60">Voll versichert</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 border border-brand-navy/10">
                <Award className="w-4 h-4 text-brand-navy mb-1 sm:mx-0 mx-auto" />
                <span className="text-xs font-semibold text-brand-navy block">
                  100% Festpreis
                </span>
                <span className="text-[10px] text-brand-navy/60">Keine Nachkosten</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 border border-brand-navy/10">
                <Sparkles className="w-4 h-4 text-brand-navy mb-1 sm:mx-0 mx-auto" />
                <span className="text-xs font-semibold text-brand-navy block">
                  24h Angebot
                </span>
                <span className="text-[10px] text-brand-navy/60">Schnelle Taktung</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Interactive Form (7 cols) */}
          <div className="hub-col lg:col-span-7">
            <div className="bg-white rounded-3xl border border-brand-navy/10 p-6 sm:p-10 shadow-lg shadow-brand-navy/5 relative overflow-hidden">
              {submitted ? (
                <div className="py-14 sm:py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-lime flex items-center justify-center mx-auto text-brand-navy shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-brand-navy">
                    Vielen Dank für Ihre Anfrage!
                  </h3>
                  <p className="text-sm sm:text-base text-brand-navy/75 max-w-md mx-auto leading-relaxed font-light">
                    Wir haben Ihre Daten für das Gewerk{" "}
                    <strong className="font-semibold text-brand-navy">
                      &bdquo;{selectedService}&ldquo;
                    </strong>{" "}
                    erhalten. Unser Büro in Chemnitz meldet sich innerhalb von 24 Stunden telefonisch bei Ihnen unter{" "}
                    <strong className="font-semibold text-brand-navy">
                      {formData.phone}
                    </strong>
                    .
                  </p>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          address: "",
                          area: "",
                          comment: "",
                          privacyAccepted: false,
                        });
                      }}
                      className="px-6 py-2.5 rounded-lg border border-brand-navy/20 text-xs font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition-all cursor-pointer"
                    >
                      Weitere Anfrage senden
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-brand-navy/50 block mb-1">
                      Kostenlose Bedarfsanalyse
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-brand-navy">
                      Angebot unverbindlich anfragen
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-navy/70 mt-1 font-light">
                      Wählen Sie Ihr gewünschtes Gewerk — wir erstellen Ihnen innerhalb von 24h ein verbindliches Festpreisangebot.
                    </p>
                  </div>

                  {/* Step 1: Category Tabs */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-brand-navy/70 mb-2">
                      1. Bereich wählen *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleCategoryChange("reinigung")}
                        className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          category === "reinigung"
                            ? "bg-brand-navy text-brand-lime border-brand-navy shadow-xs"
                            : "bg-brand-cream/60 text-brand-navy/80 border-brand-navy/10 hover:bg-brand-cream"
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="truncate">Reinigung</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategoryChange("bau")}
                        className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          category === "bau"
                            ? "bg-brand-navy text-brand-lime border-brand-navy shadow-xs"
                            : "bg-brand-cream/60 text-brand-navy/80 border-brand-navy/10 hover:bg-brand-cream"
                        }`}
                      >
                        <Hammer className="w-3.5 h-3.5" />
                        <span className="truncate">Bau &amp; Ausbau</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategoryChange("kombi")}
                        className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          category === "kombi"
                            ? "bg-brand-navy text-brand-lime border-brand-navy shadow-xs"
                            : "bg-brand-cream/60 text-brand-navy/80 border-brand-navy/10 hover:bg-brand-cream"
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span className="truncate">Kombi-Projekt</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Specific Service Select Pills */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-brand-navy/70 mb-2">
                      2. Konkrete Leistung *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES_BY_CAT[category].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSelectedService(item)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                            selectedService === item
                              ? "bg-brand-navy text-white border-brand-navy font-medium shadow-xs"
                              : "bg-white text-brand-navy/80 border-brand-navy/15 hover:border-brand-navy/40"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Contact Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5">
                        Ihr Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="z. B. Max Mustermann"
                        className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5">
                        Telefonnummer *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+49 (0) 176..."
                        className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5">
                        E-Mail-Adresse *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="ihre.adresse@firma.de"
                        className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5">
                        Ort / Postleitzahl
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="z. B. 09111 Chemnitz"
                        className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5">
                      Fläche / Quadratmeter (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                      placeholder="z. B. ca. 180 m² Büro oder 4 Zimmer Wohnung"
                      className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5">
                      Nachricht / Details zum Projekt
                    </label>
                    <textarea
                      rows={3}
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                      placeholder="Beschreiben Sie kurz Ihr Vorhaben, den gewünschten Starttermin oder spezielle Wünsche..."
                      className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* DSGVO Consent */}
                  <label className="flex items-start gap-2.5 text-xs text-brand-navy/70 cursor-pointer pt-1 select-none">
                    <input
                      type="checkbox"
                      required
                      checked={formData.privacyAccepted}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          privacyAccepted: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-brand-navy accent-brand-navy mt-0.5"
                    />
                    <span>
                      Ich willige ein, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen gespeichert und verarbeitet werden. Details siehe{" "}
                      <a
                        href="/datenschutz"
                        className="underline hover:text-brand-navy font-medium"
                      >
                        Datenschutz
                      </a>
                      .
                    </span>
                  </label>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-white font-semibold text-sm tracking-wide transition-all shadow-md active:scale-99 flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span className="text-brand-lime font-medium">
                        Unverbindliches Festpreisangebot anfordern
                      </span>
                      <Send className="w-4 h-4 text-brand-lime group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="text-center text-[11px] text-brand-navy/50 mt-2.5">
                      100% kostenfrei &bull; Keine automatische Vertragsbindung &bull; Rückmeldung in 24h
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
