"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, AlertCircle, X, Loader2, Phone } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";
import {
  CategoryType,
  ContactFieldErrors,
  ContactFormState,
  INITIAL_CONTACT_FORM_STATE,
  SERVICES_BY_CAT,
  cleanField,
  getPreselection,
  validateContactForm,
} from "./contactHubData";
import { getServiceDetailBySlug } from "@/data/serviceDetails";
import { ContactDirectSidebar } from "./ContactDirectSidebar";
import { ContactServiceSelects } from "./ContactServiceSelects";
import { ContactToast, ContactSuccessCard } from "./ContactSuccessState";

export function ContactHubSection() {
  const containerRef = useRef<HTMLElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const formLoadedAtRef = useRef<number>(0);

  const [category, setCategory] = useState<CategoryType>("reinigung");
  const [selectedService, setSelectedService] = useState<string>(
    SERVICES_BY_CAT.reinigung[0]
  );
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [referenceId, setReferenceId] = useState<string>("TDK-2401");
  const [formData, setFormData] = useState<ContactFormState>(
    INITIAL_CONTACT_FORM_STATE
  );

  // Record form mount timestamp for anti-bot dwell-time verification and
  // preselect the service when a request button linked here (?service=…).
  useEffect(() => {
    formLoadedAtRef.current = performance.now();
    const preselection = getPreselection(window.location.search, getServiceDetailBySlug);
    if (preselection) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- URL is only readable after mount on this static page
      setCategory(preselection.category);
      setSelectedService(preselection.service);
    }
  }, []);

  const isUrgent = category === "notfall";

  const handleCategoryChange = (cat: CategoryType) => {
    setCategory(cat);
    setSelectedService(SERVICES_BY_CAT[cat][0]);
  };

  // Phone and e-mail depend on each other (one of them is required), so an
  // existing error on either field is re-checked against both values.
  const updateContactField = (field: "phone" | "email", value: string) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    if (fieldErrors.phone || fieldErrors.email) {
      const { errors } = validateContactForm(next, isUrgent);
      setFieldErrors((prev) => ({
        ...prev,
        phone: errors.phone,
        email: errors.email,
      }));
    }
  };

  const scrollToAndHighlightFirstInvalid = (errors: ContactFieldErrors) => {
    const invalidTargets: HTMLElement[] = [];

    if (errors.name && nameInputRef.current) {
      invalidTargets.push(nameInputRef.current);
    }
    if (errors.phone && phoneInputRef.current) {
      invalidTargets.push(phoneInputRef.current);
    }
    if (errors.email && emailInputRef.current) {
      invalidTargets.push(emailInputRef.current);
    }

    if (invalidTargets.length > 0) {
      const firstTarget = invalidTargets[0];
      firstTarget.scrollIntoView({ behavior: "smooth", block: "center" });

      if (firstTarget instanceof HTMLInputElement) {
        setTimeout(() => {
          firstTarget.focus({ preventScroll: true });
        }, 320);
      }

      gsap.fromTo(
        invalidTargets,
        { x: -6 },
        {
          x: 0,
          duration: 0.45,
          ease: "elastic.out(1, 0.3)",
          clearProps: "transform",
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);
    const { errors, generalError } = validateContactForm(formData, isUrgent);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0 || generalError) {
      if (generalError) {
        setErrorMessage(generalError);
      }
      scrollToAndHighlightFirstInvalid(errors);
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
          timing: formData.timing.trim(),
          comment: formData.comment.trim(),
          website: formData.website,
          companyFax: formData.companyFax,
          formElapsedMs: Math.round(performance.now() - formLoadedAtRef.current),
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
    setFieldErrors({});
    formLoadedAtRef.current = performance.now();
    setFormData(INITIAL_CONTACT_FORM_STATE);
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
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="anfrage"
      aria-label="Kontaktformular & Direkter Kontakt"
      className="relative z-10 w-full py-16 sm:py-24 lg:py-28 bg-brand-cream border-t border-brand-navy/10"
    >
      {/* Floating Responsive Notification Toast */}
      {showToast && (
        <ContactToast
          referenceId={referenceId}
          name={formData.name}
          onClose={() => setShowToast(false)}
        />
      )}

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Info (5 cols) — sticky on scroll alongside the form */}
          <ContactDirectSidebar />

          {/* Right Column: Interactive Form & Confirmation Card (7 cols) */}
          <div className="lg:col-span-7 min-w-0">
            <div className="hub-reveal bg-white rounded-2xl sm:rounded-3xl border border-brand-navy/10 p-5 xs:p-6 sm:p-9 lg:p-10 shadow-lg shadow-brand-navy/5 relative overflow-x-clip">
              {submitted ? (
                <ContactSuccessCard
                  referenceId={referenceId}
                  selectedService={selectedService}
                  name={formData.name}
                  phone={formData.phone}
                  email={formData.email}
                  onReset={handleResetForm}
                />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 sm:space-y-6"
                >
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-brand-navy/50 block mb-1">
                      {isUrgent ? "Kurzfristiger Einsatz" : "Anfrageformular"}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-brand-navy">
                      {isUrgent ? "Dringende Reinigung anfragen" : "Unverbindlich anfragen"}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-navy/70 mt-1 font-light">
                      {isUrgent
                        ? "Kurzfristige Einsätze sind nach Verfügbarkeit möglich. Für eine schnelle Abstimmung rufen Sie uns am besten direkt an."
                        : "Beschreiben Sie uns Ihr Vorhaben – auch wenn die gewünschte Leistung nicht ausdrücklich aufgeführt ist. Wir prüfen die Möglichkeiten und melden uns zur weiteren Abstimmung."}
                    </p>
                    {isUrgent && (
                      <a
                        href={`tel:${COMPANY_INFO.phoneRaw}`}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-lime px-3.5 py-2 text-sm font-medium text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Jetzt anrufen: {COMPANY_INFO.phone}
                      </a>
                    )}
                  </div>

                  {/* Hidden Anti-Bot Honeypot Fields (Invisible to real users & screen readers) */}
                  <div
                    aria-hidden="true"
                    className="sr-only pointer-events-none"
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
                      <span className="flex-1 leading-relaxed">
                        {errorMessage}
                      </span>
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
                  <ContactServiceSelects
                    category={category}
                    selectedService={selectedService}
                    onCategoryChange={handleCategoryChange}
                    onServiceChange={setSelectedService}
                  />

                  {/* Step 3: Contact Inputs with Sanitization & Inline Error Highlighting */}
                  <p className="text-xs text-brand-navy/70 font-light pt-1">
                    {isUrgent
                      ? "* Pflichtfeld. Bei dringenden Anfragen benötigen wir Ihre Telefonnummer."
                      : "* Pflichtfeld. Für Rückfragen genügt eine Kontaktmöglichkeit: Telefon oder E-Mail."}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className={`block text-xs font-mono font-normal uppercase tracking-wider mb-1.5 transition-colors ${
                          fieldErrors.name
                            ? "text-red-600"
                            : "text-brand-navy/70"
                        }`}
                      >
                        Ihr Name *
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        maxLength={80}
                        autoComplete="name"
                        aria-invalid={Boolean(fieldErrors.name)}
                        value={formData.name}
                        onChange={(e) => {
                          const val = cleanField(e.target.value, 80);
                          setFormData({ ...formData, name: val });
                          if (fieldErrors.name && val.trim().length >= 2) {
                            setFieldErrors((prev) => ({
                              ...prev,
                              name: undefined,
                            }));
                          }
                        }}
                        placeholder="z. B. Max Mustermann"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none transition-all ${
                          fieldErrors.name
                            ? "border-red-500 bg-red-50/40 ring-2 ring-red-500/15 focus:border-red-600 focus:bg-white"
                            : "border-brand-navy/15 bg-brand-cream/30 focus:border-brand-navy focus:bg-white"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-normal"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{fieldErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className={`block text-xs font-mono font-normal uppercase tracking-wider mb-1.5 transition-colors ${
                          fieldErrors.phone
                            ? "text-red-600"
                            : "text-brand-navy/70"
                        }`}
                      >
                        Telefonnummer{isUrgent ? " *" : ""}
                      </label>
                      <input
                        ref={phoneInputRef}
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        maxLength={30}
                        autoComplete="tel"
                        aria-invalid={Boolean(fieldErrors.phone)}
                        value={formData.phone}
                        onChange={(e) =>
                          updateContactField("phone", cleanField(e.target.value, 30))
                        }
                        placeholder="z. B. 0371 1234567"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none transition-all ${
                          fieldErrors.phone
                            ? "border-red-500 bg-red-50/40 ring-2 ring-red-500/15 focus:border-red-600 focus:bg-white"
                            : "border-brand-navy/15 bg-brand-cream/30 focus:border-brand-navy focus:bg-white"
                        }`}
                      />
                      {fieldErrors.phone && (
                        <p
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-normal"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{fieldErrors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className={`block text-xs font-mono font-normal uppercase tracking-wider mb-1.5 transition-colors ${
                          fieldErrors.email
                            ? "text-red-600"
                            : "text-brand-navy/70"
                        }`}
                      >
                        E-Mail-Adresse
                      </label>
                      <input
                        ref={emailInputRef}
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        maxLength={120}
                        autoComplete="email"
                        aria-invalid={Boolean(fieldErrors.email)}
                        value={formData.email}
                        onChange={(e) =>
                          updateContactField("email", cleanField(e.target.value, 120))
                        }
                        placeholder="ihre.adresse@firma.de"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none transition-all ${
                          fieldErrors.email
                            ? "border-red-500 bg-red-50/40 ring-2 ring-red-500/15 focus:border-red-600 focus:bg-white"
                            : "border-brand-navy/15 bg-brand-cream/30 focus:border-brand-navy focus:bg-white"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-normal"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{fieldErrors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-address"
                        className="block text-xs font-mono font-normal uppercase tracking-wider text-brand-navy/70 mb-1.5"
                      >
                        {isUrgent ? "Objektort / PLZ" : "Ort / Postleitzahl"}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                    <label
                      htmlFor="contact-area"
                      className="block text-xs font-mono font-normal uppercase tracking-wider text-brand-navy/70 mb-1.5"
                    >
                      Fläche / Umfang (optional)
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
                      placeholder="z. B. ca. 180 m² Büro"
                      className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
                    />
                  </div>

                    <div>
                      <label
                        htmlFor="contact-timing"
                        className="block text-xs font-mono font-normal uppercase tracking-wider text-brand-navy/70 mb-1.5"
                      >
                        {isUrgent ? "Gewünschter Zeitpunkt" : "Gewünschter Zeitraum (optional)"}
                      </label>
                      <input
                        id="contact-timing"
                        name="timing"
                        type="text"
                        maxLength={100}
                        value={formData.timing}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            timing: cleanField(e.target.value, 100),
                          })
                        }
                        placeholder={isUrgent ? "z. B. morgen Vormittag" : "z. B. ab März 2027"}
                        className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-comment"
                        className="block text-xs font-mono font-normal uppercase tracking-wider text-brand-navy/70"
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
                      rows={4}
                      maxLength={1200}
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          comment: cleanField(e.target.value, 1200),
                        })
                      }
                      placeholder={
                        isUrgent
                          ? "Was ist passiert und welche Bereiche sollen gereinigt werden?"
                          : "Beschreiben Sie kurz Ihr Vorhaben, Art der gewünschten Arbeiten oder besondere Wünsche …"
                      }
                      className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-brand-cream/30 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* Data protection notice (Art. 13 DSGVO); processing rests on Art. 6 Abs. 1 lit. b/f, not on consent */}
                  <p className="text-xs text-brand-navy/70 leading-relaxed">
                    Ihre Angaben verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage. Details finden Sie in unserer{" "}
                    <a
                      href="/datenschutz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-brand-navy font-medium"
                    >
                      Datenschutzerklärung
                    </a>
                    .
                  </p>

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
                            Anfrage wird gesendet …
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-brand-lime font-medium">
                            {isUrgent ? "Dringende Anfrage senden" : "Anfrage unverbindlich senden"}
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
