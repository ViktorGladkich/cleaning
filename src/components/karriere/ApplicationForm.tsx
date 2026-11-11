"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, FileText, Loader2, Send, Upload, X } from "lucide-react";
import {
  APPLICATION_AREAS,
  CV_ACCEPT,
  EMPLOYMENT_TYPES,
  FIELD_LIMITS,
  YES_NO,
  validateApplication,
  validateCvFile,
  type ApplicationErrors,
  type ApplicationFields,
} from "@/lib/applicationRules";
import { cleanField } from "@/components/contacts/contactHubData";
import { cn } from "@/lib/utils";

const INITIAL: ApplicationFields = {
  name: "",
  phone: "",
  email: "",
  city: "",
  area: "",
  languages: "",
  experience: "",
  driversLicense: "",
  ownCar: "",
  employment: "",
  startDate: "",
  message: "",
  privacyAck: false,
};

const inputClass = (invalid?: boolean) =>
  cn(
    "w-full px-4 py-3 rounded-xl border text-sm text-brand-navy placeholder:text-brand-navy/35 focus:outline-none transition-colors",
    invalid
      ? "border-red-500 bg-red-50/40 ring-2 ring-red-500/15 focus:border-red-600 focus:bg-white"
      : "border-brand-navy/15 bg-brand-cream/30 focus:border-brand-navy focus:bg-white"
  );

const labelClass = (invalid?: boolean) =>
  cn(
    "block text-xs font-mono font-normal uppercase tracking-wider mb-1.5",
    invalid ? "text-red-600" : "text-brand-navy/70"
  );

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

/** Segmented single choice rendered as radio buttons (keyboard and screen-reader friendly). */
function ChoiceGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  required,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <fieldset>
      <legend className={labelClass(Boolean(error))}>
        {legend}
        {required ? " *" : ""}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={cn(
                "cursor-pointer select-none rounded-lg border px-4 py-2.5 text-sm transition-colors has-focus-visible:ring-2 has-focus-visible:ring-brand-navy/40",
                checked
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-brand-navy/15 bg-brand-cream/30 text-brand-navy hover:border-brand-navy/40"
              )}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
      <FieldError message={error} />
    </fieldset>
  );
}

export function ApplicationForm() {
  const [fields, setFields] = useState<ApplicationFields>(INITIAL);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState({ website: "", companyFax: "" });
  const formLoadedAtRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formLoadedAtRef.current = performance.now();
  }, []);

  const set = <K extends keyof ApplicationFields>(key: K, value: ApplicationFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const text = (key: keyof typeof FIELD_LIMITS) => ({
    value: fields[key],
    maxLength: FIELD_LIMITS[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      set(key, cleanField(e.target.value, FIELD_LIMITS[key])),
  });

  const handleFile = (file: File | null) => {
    if (!file) {
      setCvFile(null);
      setErrors((prev) => ({ ...prev, cv: undefined }));
      return;
    }
    const fileError = validateCvFile(file);
    setErrors((prev) => ({ ...prev, cv: fileError }));
    setCvFile(fileError ? null : file);
    if (fileError && fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setGeneralError(null);

    const trimmed = Object.fromEntries(
      Object.entries(fields).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
    ) as unknown as ApplicationFields;
    const validation = validateApplication(trimmed);
    setErrors(validation);
    if (Object.values(validation).some(Boolean)) {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true'], fieldset:has([role='alert'])");
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const body = new FormData();
    for (const [key, value] of Object.entries(trimmed)) body.append(key, String(value));
    if (cvFile) body.append("cv", cvFile);
    body.append("website", honeypot.website);
    body.append("companyFax", honeypot.companyFax);
    body.append("formElapsedMs", String(Math.round(performance.now() - formLoadedAtRef.current)));

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bewerbung", { method: "POST", body });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setGeneralError(
          data.error || "Deine Bewerbung konnte nicht gesendet werden. Bitte prüfe deine Angaben."
        );
        return;
      }
      setSubmittedName(trimmed.name);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setGeneralError(
        "Verbindungsfehler beim Senden. Bitte versuch es erneut oder ruf uns direkt an."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedName) {
    return (
      <div role="status" className="py-6 sm:py-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-navy" />
        <h3 className="mt-5 text-2xl sm:text-3xl font-medium tracking-tight text-brand-navy">
          Vielen Dank für deine Bewerbung!
        </h3>
        <p className="mt-3 text-sm sm:text-base text-brand-navy/75 leading-relaxed max-w-md mx-auto">
          Hallo {submittedName}, deine Bewerbung ist bei uns eingegangen. Wir sehen sie uns an und
          melden uns bei dir.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-brand-navy px-6 py-3 text-sm font-medium text-white hover:bg-brand-navy/90 transition-colors"
        >
          Zur Startseite
        </Link>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6 scroll-mt-32">
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-brand-navy/50 block mb-1">
          Online-Bewerbung
        </span>
        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-brand-navy">
          Jetzt online bewerben
        </h3>
        <p className="text-xs sm:text-sm text-brand-navy/70 mt-1">
          * Pflichtfeld. Ein Lebenslauf ist freiwillig.
        </p>
      </div>

      {/* Honeypot fields, invisible to people and screen readers */}
      <div aria-hidden="true" className="sr-only pointer-events-none">
        <label htmlFor="apply-website-hp">Website</label>
        <input
          id="apply-website-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot.website}
          onChange={(e) => setHoneypot((p) => ({ ...p, website: e.target.value }))}
        />
        <label htmlFor="apply-fax-hp">Fax</label>
        <input
          id="apply-fax-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot.companyFax}
          onChange={(e) => setHoneypot((p) => ({ ...p, companyFax: e.target.value }))}
        />
      </div>

      {generalError && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-brand-cream border border-brand-navy/25 text-brand-navy flex items-start gap-3 text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="flex-1 leading-relaxed">{generalError}</span>
          <button
            type="button"
            onClick={() => setGeneralError(null)}
            aria-label="Hinweis schließen"
            className="text-brand-navy/50 hover:text-brand-navy cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Person & contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="apply-name" className={labelClass(Boolean(errors.name))}>
            Vor- und Nachname *
          </label>
          <input
            id="apply-name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            placeholder="z. B. Anna Schneider"
            className={inputClass(Boolean(errors.name))}
            {...text("name")}
          />
          <FieldError message={errors.name} />
        </div>
        <div>
          <label htmlFor="apply-phone" className={labelClass(Boolean(errors.phone))}>
            Telefonnummer *
          </label>
          <input
            id="apply-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            placeholder="z. B. 0157 1234567"
            className={inputClass(Boolean(errors.phone))}
            {...text("phone")}
          />
          <FieldError message={errors.phone} />
        </div>
        <div>
          <label htmlFor="apply-email" className={labelClass(Boolean(errors.email))}>
            E-Mail-Adresse (optional)
          </label>
          <input
            id="apply-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            placeholder="name@beispiel.de"
            className={inputClass(Boolean(errors.email))}
            {...text("email")}
          />
          <FieldError message={errors.email} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="apply-city" className={labelClass()}>
            Wohnort / Stadt
          </label>
          <input
            id="apply-city"
            type="text"
            autoComplete="address-level2"
            placeholder="z. B. Chemnitz"
            className={inputClass()}
            {...text("city")}
          />
        </div>
      </div>

      {/* Job preferences */}
      <ChoiceGroup
        legend="Gewünschter Bereich"
        name="area"
        options={APPLICATION_AREAS}
        value={fields.area}
        onChange={(v) => set("area", v)}
        error={errors.area}
        required
      />
      <ChoiceGroup
        legend="Gewünschte Beschäftigung"
        name="employment"
        options={EMPLOYMENT_TYPES}
        value={fields.employment}
        onChange={(v) => set("employment", v)}
        error={errors.employment}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ChoiceGroup
          legend="Führerschein vorhanden?"
          name="driversLicense"
          options={YES_NO}
          value={fields.driversLicense}
          onChange={(v) => set("driversLicense", v)}
          error={errors.driversLicense}
        />
        <ChoiceGroup
          legend="Eigenes Auto vorhanden?"
          name="ownCar"
          options={YES_NO}
          value={fields.ownCar}
          onChange={(v) => set("ownCar", v)}
          error={errors.ownCar}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="apply-start" className={labelClass()}>
            Frühestmöglicher Arbeitsbeginn
          </label>
          <input
            id="apply-start"
            type="text"
            placeholder="z. B. sofort oder 01.02.2027"
            className={inputClass()}
            {...text("startDate")}
          />
        </div>
        <div>
          <label htmlFor="apply-languages" className={labelClass()}>
            Sprachkenntnisse
          </label>
          <input
            id="apply-languages"
            type="text"
            placeholder="z. B. Deutsch gut, Russisch fließend"
            className={inputClass()}
            {...text("languages")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="apply-experience" className={labelClass()}>
          Bisherige Erfahrung
        </label>
        <textarea
          id="apply-experience"
          rows={3}
          placeholder="z. B. 2 Jahre Gebäudereinigung oder Quereinsteiger"
          className={cn(inputClass(), "resize-none")}
          {...text("experience")}
        />
      </div>

      <div>
        <label htmlFor="apply-message" className={labelClass()}>
          Nachricht (optional)
        </label>
        <textarea
          id="apply-message"
          rows={4}
          placeholder="Erzähl uns kurz, wer du bist und was du suchst …"
          className={cn(inputClass(), "resize-none")}
          {...text("message")}
        />
      </div>

      {/* CV upload */}
      <div>
        <span className={labelClass(Boolean(errors.cv))}>Lebenslauf hochladen (optional)</span>
        {cvFile ? (
          <div className="flex items-center gap-3 rounded-xl border border-brand-navy/15 bg-brand-cream/40 px-4 py-3">
            <FileText className="h-5 w-5 shrink-0 text-brand-navy" />
            <span className="min-w-0 flex-1 truncate text-sm text-brand-navy">{cvFile.name}</span>
            <span className="shrink-0 text-xs text-brand-navy/60">
              {(cvFile.size / 1024 / 1024).toFixed(1)} MB
            </span>
            <button
              type="button"
              onClick={() => {
                handleFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              aria-label="Datei entfernen"
              className="shrink-0 text-brand-navy/60 hover:text-brand-navy cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="apply-cv"
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed px-4 py-6 text-center transition-colors has-focus-visible:ring-2 has-focus-visible:ring-brand-navy/40",
              errors.cv
                ? "border-red-500 bg-red-50/40"
                : "border-brand-navy/25 bg-brand-cream/30 hover:border-brand-navy/50"
            )}
          >
            <Upload className="h-5 w-5 text-brand-navy/70" />
            <span className="text-sm font-medium text-brand-navy">Datei auswählen</span>
            <span className="text-xs text-brand-navy/60">PDF, Word, JPG oder PNG · max. 4 MB</span>
          </label>
        )}
        <input
          ref={fileInputRef}
          id="apply-cv"
          type="file"
          accept={CV_ACCEPT}
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
        <FieldError message={errors.cv} />
      </div>

      {/* Privacy notice (Art. 13 DSGVO) */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={fields.privacyAck}
            onChange={(e) => set("privacyAck", e.target.checked)}
            aria-invalid={Boolean(errors.privacyAck)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand-navy"
          />
          <span className="text-xs sm:text-sm text-brand-navy/80 leading-relaxed">
            Ich habe die{" "}
            <a
              href="/datenschutz#bewerbung"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium hover:text-brand-navy"
            >
              Datenschutzhinweise zur Bewerbung
            </a>{" "}
            gelesen. Meine Angaben werden nur für das Bewerbungsverfahren bei TADIK’S Cleaning &amp;
            BAU verwendet. *
          </span>
        </label>
        <FieldError message={errors.privacyAck} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-xl bg-brand-navy hover:bg-brand-navy/90 disabled:opacity-60 disabled:pointer-events-none text-sm font-medium tracking-wide transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer group"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 text-brand-lime animate-spin" />
            <span className="text-brand-lime">Bewerbung wird gesendet …</span>
          </>
        ) : (
          <>
            <span className="text-brand-lime">Bewerbung absenden</span>
            <Send className="w-4 h-4 text-brand-lime group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
