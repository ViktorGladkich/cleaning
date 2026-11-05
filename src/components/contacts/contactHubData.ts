import React from "react";
import { Building2, Hammer, Layers } from "lucide-react";
import {
  CategoryType,
  isValidName,
  validateContactMethods,
} from "@/lib/contactRules";

export type { CategoryType } from "@/lib/contactRules";
export { EMAIL_PATTERN, SERVICES_BY_CAT } from "@/lib/contactRules";

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
}

export interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  comment: string;
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
    subtitle: "Trockenbau, Abbruch & Komplettsanierung",
    Icon: Hammer,
  },
  {
    id: "kombi",
    label: "Kombi-Projekt",
    subtitle: "Ausbau & anschließende Bauendreinigung",
    Icon: Layers,
  },
];

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

  if (!isValidName(formData.name.trim())) {
    errors.name = "Bitte geben Sie Ihren Vor- und Nachnamen korrekt ein.";
  }

  const contactErrors = validateContactMethods(
    formData.phone.trim(),
    formData.email.trim()
  );
  if (contactErrors.phone) errors.phone = contactErrors.phone;
  if (contactErrors.email) errors.email = contactErrors.email;

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

