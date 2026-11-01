"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Send,
  Building2,
  Hammer,
  Layers,
  AlertCircle,
  X,
  Clock,
  ShieldCheck,
  Loader2,
  ChevronDown,
  Check,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";

type CategoryType = "reinigung" | "bau" | "kombi";

const CATEGORY_OPTIONS: {
  id: CategoryType;
  label: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "reinigung",
    label: "Reinigung",
    subtitle: "Unterhalts-, Grund-, Glas- & Praxisreinigung",
    Icon: Building2,
  },
  {
    id: "bau",
    label: "Bau & Ausbau",
    subtitle: "Trockenbau, Maler, Boden & Komplettsanierung",
    Icon: Hammer,
  },
  {
    id: "kombi",
    label: "Kombi-Projekt",
    subtitle: "Ausbau & anschließende Bauendreinigung",
    Icon: Layers,
  },
];

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

// Client-side sanitizer to strip HTML tags and control characters
function cleanField(val: string, maxLen: number): string {
  return val
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .slice(0, maxLen);
}

export function ContactHubSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);
  const dropdownWrapRef = useRef<HTMLDivElement>(null);
  const formLoadedAtRef = useRef<number>(0);

  const [category, setCategory] = useState<CategoryType>("reinigung");
  const [selectedService, setSelectedService] = useState<string>(
    SERVICES_BY_CAT.reinigung[0]
  );
  const [openDropdown, setOpenDropdown] = useState<
    "category" | "service" | null
  >(null);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string>("TDK-2401");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    area: "",
    comment: "",
    privacyAccepted: false,
    // Honeypot fields (must remain empty for real users)
    website: "",
    companyFax: "",
  });

  // Record form mount timestamp for anti-bot dwell-time verification
  useEffect(() => {
    formLoadedAtRef.current = Date.now();
  }, []);

  // Close custom select dropdowns on outside click or Escape key
  useEffect(() => {
    if (!openDropdown) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (
        dropdownWrapRef.current &&
        !dropdownWrapRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDropdown]);

  // Animate success card & floating notification toast when submitted
  useEffect(() => {
    if (submitted && successCardRef.current) {
      gsap.fromTo(
        successCardRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }
      );
    }
    ScrollTrigger.refresh();
  }, [submitted]);

  useEffect(() => {
    if (!showToast || !toastRef.current) return;

    gsap.fromTo(
      toastRef.current,
      { opacity: 0, y: -24, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)" }
    );

    const timer = setTimeout(() => {
      if (toastRef.current) {
        gsap.to(toastRef.current, {
          opacity: 0,
          y: -16,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setShowToast(false),
        });
      } else {
        setShowToast(false);
      }
    }, 7500);

    return () => clearTimeout(timer);
  }, [showToast]);

  const handleCategoryChange = (cat: CategoryType) => {
    setCategory(cat);
    setSelectedService(SERVICES_BY_CAT[cat][0]);
    setOpenDropdown(null);
  };

  const activeCategoryMeta =
    CATEGORY_OPTIONS.find((opt) => opt.id === category) || CATEGORY_OPTIONS[0];
  const ActiveCategoryIcon = activeCategoryMeta.Icon;

  const validateClientSide = (): string | null => {
    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();

    if (trimmedName.length < 2 || !/^[\p{L}\s.'-]+$/u.test(trimmedName)) {
      return "Bitte geben Sie Ihren Vor- und Nachnamen korrekt ein (ohne Sonderzeichen oder Links).";
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, "");
    if (
      phoneDigits.length < 7 ||
      phoneDigits.length > 18 ||
      !/^[+\d\s()/.-]+$/.test(trimmedPhone)
    ) {
      return "Bitte geben Sie eine gültige Telefonnummer für unseren Rückruf ein.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }

    if (
      /(https?:\/\/|www\.|<script|\[url=)/i.test(
        `${formData.name} ${formData.address} ${formData.area} ${formData.comment}`
      )
    ) {
      return "Aus Sicherheitsgründen sind Weblinks oder Code im Formular nicht gestattet.";
    }

    if (!formData.privacyAccepted) {
      return "Bitte bestätigen Sie die Datenschutzerklärung, um die Anfrage abzusenden.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);
    const validationError = validateClientSide();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          service: selectedService,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          area: formData.area.trim(),
          comment: formData.comment.trim(),
          privacyAccepted: formData.privacyAccepted,
          website: formData.website,
          companyFax: formData.companyFax,
          formLoadedAt: formLoadedAtRef.current,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        referenceId?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setErrorMessage(
          data.error ||
            "Ihre Anfrage konnte nicht gesendet werden. Bitte prüfen Sie Ihre Angaben."
        );
        setIsSubmitting(false);
        return;
      }

      if (data.referenceId) {
        setReferenceId(data.referenceId);
      }
      setIsSubmitting(false);
      setSubmitted(true);
      setShowToast(true);
    } catch {
      setErrorMessage(
        "Verbindungsfehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an."
      );
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setShowToast(false);
    setErrorMessage(null);
    formLoadedAtRef.current = Date.now();
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      area: "",
      comment: "",
      privacyAccepted: false,
      website: "",
      companyFax: "",
    });
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        ".hub-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.16,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Smoothly move Left Column (Direct Contact Info cards) down alongside the taller Right Form on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (!leftColRef.current || !rightColRef.current) return;

        gsap.fromTo(
          leftColRef.current,
          { y: 0 },
          {
            y: () => {
              if (!leftColRef.current || !rightColRef.current) return 0;
              return Math.max(
                0,
                rightColRef.current.offsetHeight -
                  leftColRef.current.offsetHeight
              );
            },
            ease: "none",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 68%",
              end: "bottom 82%",
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="anfrage"
      aria-label="Kontaktformular & Direkter Kontakt"
      className="relative z-10 w-full py-16 sm:py-24 lg:py-28 bg-brand-cream border-t border-brand-navy/10 overflow-x-clip"
    >
      {/* Floating Responsive Notification Toast (adapts from 320px mobile to 4K desktop) */}
      {showToast && (
        <div
          ref={toastRef}
          role="status"
          aria-live="polite"
          className="fixed top-22 sm:top-26 inset-x-3 sm:inset-x-auto sm:right-6 lg:right-10 z-60 sm:w-full sm:max-w-md pointer-events-auto"
        >
          <div className="bg-brand-navy text-white rounded-2xl p-4 sm:p-5 border border-brand-lime/35 shadow-[0_20px_50px_rgba(15,24,43,0.35)] flex items-start gap-3.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-lime">
                  Anfrage übermittelt &bull; #{referenceId}
                </span>
                <button
                  type="button"
                  onClick={() => setShowToast(false)}
                  aria-label="Benachrichtigung schließen"
                  className="text-white/60 hover:text-white transition-colors p-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm sm:text-[15px] font-medium text-white mt-0.5 leading-snug">
                Vielen Dank, {formData.name}! Ihre Nachricht ist bei uns eingegangen.
              </p>
              <p className="text-xs text-white/75 font-light mt-1 leading-relaxed">
                Unser Chemnitzer Meisterbüro meldet sich innerhalb von 24 Stunden bei Ihnen.
              </p>
            </div>
          </div>
        </div>
      )}

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Info (5 cols) — follows the form smoothly on scroll */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 self-start will-change-transform"
          >
            <div className="hub-reveal space-y-6">
              <div>
                <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-brand-navy/80 block mb-3">
                  Direkter Draht
                </span>
                <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-brand-navy leading-tight">
                  Sprechen Sie direkt mit{" "}
                  <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-normal ml-0">
                    unserem Meister.
                  </span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-brand-navy/70 leading-relaxed font-light">
                  Keine langen Warteschleifen. Rufen Sie uns an oder schreiben Sie uns — wir melden uns innerhalb von 24 Stunden verlässlich zurück.
                </p>
              </div>

              {/* Direct Cards */}
              <div className="space-y-3.5 pt-2">
                {/* Phone & Mobile */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-navy/10 shadow-xs hover:shadow-md hover:border-brand-navy/30 transition-[box-shadow,border-color] duration-300">
                  <div className="text-brand-navy flex items-center justify-center shrink-0 pt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-mono uppercase text-brand-navy/50 block mb-0.5">
                      Telefon &amp; Mobil / WhatsApp
                    </span>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <a
                        href={`tel:${COMPANY_INFO.phoneRaw}`}
                        className="text-base sm:text-lg font-semibold text-brand-navy hover:text-brand-navy/80 transition-colors"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                      <span className="text-brand-navy/30">&bull;</span>
                      <a
                        href={`tel:${COMPANY_INFO.mobileRaw}`}
                        className="text-base sm:text-lg font-semibold text-brand-navy hover:text-brand-navy/80 transition-colors"
                      >
                        {COMPANY_INFO.mobile}
                      </a>
                    </div>
                    <span className="text-[11px] text-brand-navy/60 mt-0.5 block">
                      Mo – Sa: 07:00 – 19:00 Uhr erreichbar
                    </span>
                  </div>
                </div>

                {/* Email */}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-navy/10 shadow-xs hover:shadow-md hover:border-brand-navy/30 transition-[box-shadow,border-color] duration-300"
                >
                  <div className="text-brand-navy flex items-center justify-center shrink-0 pt-0.5">
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
                  <div className="text-brand-navy flex items-center justify-center shrink-0 pt-0.5">
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
            </div>
          </div>

          {/* Right Column: High-End Interactive Form & Confirmation Card (7 cols) */}
          <div ref={rightColRef} className="lg:col-span-7">
            <div className="hub-reveal bg-white rounded-2xl sm:rounded-3xl border border-brand-navy/10 p-5 xs:p-6 sm:p-9 lg:p-10 shadow-lg shadow-brand-navy/5 relative">
              {submitted ? (
                <div
                  ref={successCardRef}
                  role="region"
                  aria-label="Sendebestätigung"
                  className="py-4 sm:py-6 space-y-6 sm:space-y-7"
                >
                  {/* Top Badge + Check Icon */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-brand-navy/10">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 shadow-xs">
                        <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-brand-navy/60 block">
                          Eingangsbestätigung &bull; #{referenceId}
                        </span>
                        <h3 className="text-xl xs:text-2xl sm:text-3xl font-normal tracking-tight text-brand-navy leading-tight mt-0.5">
                          Anfrage{" "}
                          <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-normal ml-0">
                            erfolgreich gesendet.
                          </span>
                        </h3>
                      </div>
                    </div>

                    <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cream border border-brand-navy/10 text-xs font-medium text-brand-navy shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-navy" />
                      SSL-verschlüsselt
                    </span>
                  </div>

                  {/* Confirmation Message */}
                  <p className="text-sm sm:text-base text-brand-navy/75 leading-relaxed font-light">
                    Vielen Dank,{" "}
                    <span className="font-medium text-brand-navy">
                      {formData.name}
                    </span>
                    . Wir haben Ihre Anfrage erhalten und an unseren zuständigen Objektleiter in Chemnitz weitergeleitet.
                  </p>

                  {/* Responsive Summary Grid (1 col on mobile, 2 cols on tablet/desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-brand-cream/80 border border-brand-navy/10">
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-navy/50 block">
                        Gewählte Leistung
                      </span>
                      <span className="text-sm sm:text-[15px] font-medium text-brand-navy block truncate">
                        {selectedService}
                      </span>
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-navy/50 block">
                        Rückrufnummer
                      </span>
                      <span className="text-sm sm:text-[15px] font-medium text-brand-navy block truncate">
                        {formData.phone}
                      </span>
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-navy/50 block">
                        E-Mail-Bestätigung
                      </span>
                      <span className="text-sm sm:text-[15px] font-medium text-brand-navy block truncate">
                        {formData.email}
                      </span>
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-navy/50 block">
                        Rückmeldung
                      </span>
                      <span className="text-sm sm:text-[15px] font-medium text-brand-navy flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-navy shrink-0" />
                        <span>Innerhalb von 24 Stunden</span>
                      </span>
                    </div>
                  </div>

                  {/* Responsive Action Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-brand-lime text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center"
                    >
                      Weitere Anfrage senden
                    </button>

                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-brand-navy/15 hover:border-brand-navy/35 text-xs sm:text-sm font-medium text-brand-navy transition-colors text-center"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Direkt anrufen: {COMPANY_INFO.phone}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 sm:space-y-6"
                >
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

                  {/* Hidden Anti-Bot Honeypot Fields (Invisible to real users & screen readers) */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-2499.75 top-auto w-px h-px overflow-hidden opacity-0 pointer-events-none"
                  >
                    <label htmlFor="contact-website-hp">Website</label>
                    <input
                      id="contact-website-hp"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                    <label htmlFor="contact-fax-hp">Fax</label>
                    <input
                      id="contact-fax-hp"
                      name="companyFax"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.companyFax}
                      onChange={(e) =>
                        setFormData({ ...formData, companyFax: e.target.value })
                      }
                    />
                  </div>

                  {/* Validation / Security Alert Banner */}
                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-3.5 sm:p-4 rounded-xl bg-brand-cream border border-brand-navy/25 text-brand-navy flex items-start gap-3 text-xs sm:text-sm"
                    >
                      <AlertCircle className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" />
                      <span className="flex-1 leading-relaxed">{errorMessage}</span>
                      <button
                        type="button"
                        onClick={() => setErrorMessage(null)}
                        aria-label="Hinweis schließen"
                        className="text-brand-navy/50 hover:text-brand-navy cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Step 1 & Step 2: Stylized Custom Select Dropdowns */}
                  <div
                    ref={dropdownWrapRef}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {/* 1. Bereich wählen * */}
                    <div className="relative">
                      <label
                        id="label-category-select"
                        className="block text-xs font-mono uppercase tracking-wider text-brand-navy/70 mb-1.5"
                      >
                        1. Bereich wählen *
                      </label>
                      <button
                        type="button"
                        aria-labelledby="label-category-select"
                        aria-haspopup="listbox"
                        aria-expanded={openDropdown === "category"}
                        onClick={() =>
                          setOpenDropdown((prev) =>
                            prev === "category" ? null : "category"
                          )
                        }
                        className={`w-full px-3.5 py-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
                          openDropdown === "category"
                            ? "bg-white border-brand-navy shadow-xs"
                            : "bg-brand-cream/30 border-brand-navy/15 hover:border-brand-navy/35 hover:bg-brand-cream/50"
                        }`}
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <ActiveCategoryIcon className="w-4 h-4 text-brand-navy/75 shrink-0" />
                          <span className="text-sm font-normal text-brand-navy truncate">
                            {activeCategoryMeta.label}
                          </span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-brand-navy/60 shrink-0 transition-transform duration-200 ${
                            openDropdown === "category" ? "rotate-180 text-brand-navy" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu for 1. Bereich wählen */}
                      {openDropdown === "category" && (
                        <div
                          role="listbox"
                          aria-labelledby="label-category-select"
                          className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-white rounded-xl border border-brand-navy/15 shadow-xl shadow-brand-navy/10 p-1.5 space-y-1"
                        >
                          {CATEGORY_OPTIONS.map((opt) => {
                            const IconComp = opt.Icon;
                            const isSelected = category === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => handleCategoryChange(opt.id)}
                                className={`w-full px-3 py-2.5 rounded-lg text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                                  isSelected
                                    ? "bg-brand-navy text-white"
                                    : "text-brand-navy hover:bg-brand-cream/70"
                                }`}
                              >
                                <span className="flex items-center gap-2.5 min-w-0">
                                  <IconComp
                                    className={`w-4 h-4 shrink-0 ${
                                      isSelected
                                        ? "text-brand-lime"
                                        : "text-brand-navy/70"
                                    }`}
                                  />
                                  <span className="min-w-0 block">
                                    <span className="text-xs sm:text-sm font-normal block truncate">
                                      {opt.label}
                                    </span>
                                    <span
                                      className={`text-[11px] font-light block truncate ${
                                        isSelected
                                          ? "text-white/70"
                                          : "text-brand-navy/55"
                                      }`}
                                    >
                                      {opt.subtitle}
                                    </span>
                                  </span>
                                </span>

                                {isSelected && (
                                  <Check className="w-4 h-4 text-brand-lime shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* 2. Konkrete Leistung * */}
                    <div className="relative">
                      <label
                        id="label-service-select"
                        className="block text-xs font-mono uppercase tracking-wider text-brand-navy/70 mb-1.5"
                      >
                        2. Konkrete Leistung *
                      </label>
                      <button
                        type="button"
                        aria-labelledby="label-service-select"
                        aria-haspopup="listbox"
                        aria-expanded={openDropdown === "service"}
                        onClick={() =>
                          setOpenDropdown((prev) =>
                            prev === "service" ? null : "service"
                          )
                        }
                        className={`w-full px-3.5 py-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
                          openDropdown === "service"
                            ? "bg-white border-brand-navy shadow-xs"
                            : "bg-brand-cream/30 border-brand-navy/15 hover:border-brand-navy/35 hover:bg-brand-cream/50"
                        }`}
                      >
                        <span className="text-sm font-normal text-brand-navy truncate">
                          {selectedService}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-brand-navy/60 shrink-0 transition-transform duration-200 ${
                            openDropdown === "service" ? "rotate-180 text-brand-navy" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu for 2. Konkrete Leistung */}
                      {openDropdown === "service" && (
                        <div
                          role="listbox"
                          aria-labelledby="label-service-select"
                          className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-white rounded-xl border border-brand-navy/15 shadow-xl shadow-brand-navy/10 p-1.5 space-y-1 max-h-64 overflow-y-auto"
                        >
                          {SERVICES_BY_CAT[category].map((item) => {
                            const isSelected = selectedService === item;
                            return (
                              <button
                                key={item}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                  setSelectedService(item);
                                  setOpenDropdown(null);
                                }}
                                className={`w-full px-3 py-2.5 rounded-lg text-left flex items-center justify-between gap-2.5 text-xs sm:text-sm font-normal transition-colors cursor-pointer ${
                                  isSelected
                                    ? "bg-brand-navy text-white"
                                    : "text-brand-navy/85 hover:bg-brand-cream/70"
                                }`}
                              >
                                <span className="truncate">{item}</span>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-brand-lime shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 3: Contact Inputs with Strict Length & Sanitization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5"
                      >
                        Ihr Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        maxLength={80}
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: cleanField(e.target.value, 80),
                          })
                        }
                        placeholder="z. B. Max Mustermann"
                        className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5"
                      >
                        Telefonnummer *
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        required
                        maxLength={30}
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: cleanField(e.target.value, 30),
                          })
                        }
                        placeholder="+49 (0) 176..."
                        className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5"
                      >
                        E-Mail-Adresse *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        required
                        maxLength={120}
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: cleanField(e.target.value, 120),
                          })
                        }
                        placeholder="ihre.adresse@firma.de"
                        className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-address"
                        className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5"
                      >
                        Ort / Postleitzahl
                      </label>
                      <input
                        id="contact-address"
                        name="address"
                        type="text"
                        maxLength={100}
                        autoComplete="postal-code"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: cleanField(e.target.value, 100),
                          })
                        }
                        placeholder="z. B. 09111 Chemnitz"
                        className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-area"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70 mb-1.5"
                    >
                      Fläche / Quadratmeter (optional)
                    </label>
                    <input
                      id="contact-area"
                      name="area"
                      type="text"
                      maxLength={80}
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          area: cleanField(e.target.value, 80),
                        })
                      }
                      placeholder="z. B. ca. 180 m² Büro oder 4 Zimmer Wohnung"
                      className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-comment"
                        className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/70"
                      >
                        Nachricht / Details zum Projekt
                      </label>
                      <span className="text-[11px] font-mono text-brand-navy/40">
                        {formData.comment.length} / 1200
                      </span>
                    </div>
                    <textarea
                      id="contact-comment"
                      name="comment"
                      rows={3}
                      maxLength={1200}
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          comment: cleanField(e.target.value, 1200),
                        })
                      }
                      placeholder="Beschreiben Sie kurz Ihr Vorhaben, den gewünschten Starttermin oder spezielle Wünsche..."
                      className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors resize-none"
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
                      className="w-4 h-4 rounded text-brand-navy accent-brand-navy mt-0.5 shrink-0"
                    />
                    <span className="leading-relaxed">
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
                      disabled={isSubmitting}
                      className="w-full py-4 px-5 sm:px-6 rounded-xl bg-brand-navy hover:bg-brand-navy/90 disabled:opacity-60 disabled:pointer-events-none text-white font-semibold text-xs xs:text-sm tracking-wide transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 text-brand-lime animate-spin shrink-0" />
                          <span className="text-brand-lime font-medium">
                            Anfrage wird sicher übertragen...
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-brand-lime font-medium">
                            Unverbindliches Festpreisangebot anfordern
                          </span>
                          <Send className="w-4 h-4 text-brand-lime group-hover:translate-x-1 transition-transform shrink-0" />
                        </>
                      )}
                    </button>
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
