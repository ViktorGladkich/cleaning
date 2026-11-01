import React from "react";
import { Building2, Hammer, Layers } from "lucide-react";

export type CategoryType = "reinigung" | "bau" | "kombi";

export interface CategoryOption {
  id: CategoryType;
  label: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export interface ContactFieldErrors {
  name?: string;
  phone?: string;
  email?: string;
  privacy?: string;
}

export interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  comment: string;
  privacyAccepted: boolean;
  // Honeypot fields (must remain empty for real users)
  website: string;
  companyFax: string;
}

export const INITIAL_CONTACT_FORM_STATE: ContactFormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  area: "",
  comment: "",
  privacyAccepted: false,
  website: "",
  companyFax: "",
};

export const CATEGORY_OPTIONS: CategoryOption[] = [
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

export const SERVICES_BY_CAT: Record<CategoryType, string[]> = {
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

/**
 * Strips HTML tags and control characters from user input on the client side.
 */
export function cleanField(val: string, maxLen: number): string {
  return val
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .slice(0, maxLen);
}

/**
 * Validates all required contact form fields and returns per-field error messages
 * along with an optional general security error.
 */
export function validateContactForm(formData: ContactFormState): {
  errors: ContactFieldErrors;
  generalError: string | null;
} {
  const errors: ContactFieldErrors = {};
  let generalError: string | null = null;

  const trimmedName = formData.name.trim();
  const trimmedPhone = formData.phone.trim();
  const trimmedEmail = formData.email.trim();

  if (trimmedName.length < 2 || !/^[\p{L}\s.'-]+$/u.test(trimmedName)) {
    errors.name = "Bitte geben Sie Ihren Vor- und Nachnamen korrekt ein.";
  }

  const phoneDigits = trimmedPhone.replace(/\D/g, "");
  if (
    phoneDigits.length < 7 ||
    phoneDigits.length > 18 ||
    !/^[+\d\s()/.-]+$/.test(trimmedPhone)
  ) {
    errors.phone = "Bitte geben Sie eine gültige Telefonnummer ein.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  if (!formData.privacyAccepted) {
    errors.privacy =
      "Bitte bestätigen Sie die Datenschutzerklärung, um die Anfrage abzusenden.";
  }

  if (
    /(https?:\/\/|www\.|<script|\[url=)/i.test(
      `${formData.name} ${formData.address} ${formData.area} ${formData.comment}`
    )
  ) {
    generalError =
      "Aus Sicherheitsgründen sind Weblinks oder Code im Formular nicht gestattet.";
  }

  return { errors, generalError };
}

