import React from "react";
import { Building2, Hammer, Layers, Siren } from "lucide-react";
import {
  CategoryType,
  SERVICES_BY_CAT as SERVICES_BY_CAT_LOCAL,
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
  timing: string;
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
  timing: "",
  comment: "",
  website: "",
  companyFax: "",
};

export const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: "reinigung",
    label: "Reinigung",
    subtitle: "Büro-, Glas-, Praxis-, Haushalts- & Fassadenreinigung",
    Icon: Building2,
  },
  {
    id: "bau",
    label: "Bau",
    subtitle: "Trockenbau, Rückbau, Renovierung & Beräumung",
    Icon: Hammer,
  },
  {
    id: "kombi",
    label: "Kombi-Projekt",
    subtitle: "Bauarbeiten & anschließende Reinigung",
    Icon: Layers,
  },
  {
    id: "notfall",
    label: "Dringende Reinigung",
    subtitle: "Kurzfristiger Einsatz nach Verfügbarkeit",
    Icon: Siren,
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
export function validateContactForm(
  formData: ContactFormState,
  phoneRequired = false
): {
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
    formData.email.trim(),
    phoneRequired
  );
  if (contactErrors.phone) errors.phone = contactErrors.phone;
  if (contactErrors.email) errors.email = contactErrors.email;

  if (
    /(https?:\/\/|www\.|<script|\[url=)/i.test(
      `${formData.name} ${formData.address} ${formData.area} ${formData.timing} ${formData.comment}`
    )
  ) {
    generalError =
      "Aus Sicherheitsgründen sind Weblinks oder Code im Formular nicht gestattet.";
  }

  return { errors, generalError };
}


/**
 * Reads ?service=<slug> or ?bereich=notfall from the URL so request buttons
 * across the site open the form with the matching service preselected.
 */
export function getPreselection(
  search: string,
  serviceLookup: (slug: string) => { category: "reinigung" | "bau"; formService: string } | undefined
): { category: CategoryType; service: string } | null {
  const params = new URLSearchParams(search);
  if (params.get("bereich") === "notfall") {
    return { category: "notfall", service: SERVICES_BY_CAT_LOCAL.notfall[0] };
  }
  const slug = params.get("service");
  if (!slug) return null;
  const match = serviceLookup(slug);
  if (match && SERVICES_BY_CAT_LOCAL[match.category].includes(match.formService)) {
    return { category: match.category, service: match.formService };
  }
  const bauExtra: Record<string, string> = {
    "weitere-bauleistungen": "Bodenverlegung / Montage von Bauelementen",
    zusammenarbeit: "Zusammenarbeit für Bauunternehmen",
    bauprojekt: "Sonstiges Bauvorhaben",
  };
  if (bauExtra[slug]) return { category: "bau", service: bauExtra[slug] };
  return null;
}
