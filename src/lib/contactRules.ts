// Validation rules shared by the contact form (client) and /api/contact (server).

export type CategoryType = "reinigung" | "bau" | "kombi" | "notfall";

export const SERVICES_BY_CAT: Record<CategoryType, string[]> = {
  reinigung: [
    "Unterhalts- & Büroreinigung",
    "Hotelreinigung",
    "Fenster- & Glasreinigung",
    "Grund- & Sonderreinigung",
    "Bauendreinigung",
    "Treppenhausreinigung",
    "Praxisreinigung",
    "Haushaltsreinigung",
    "Fassaden- & Außenreinigung",
    "Sonstige Reinigungsanfrage",
  ],
  bau: [
    "Trockenbau & Innenausbau",
    "Abbruch, Rückbau & Entkernung",
    "Renovierung & Sanierung",
    "Entrümpelung & Baustellenberäumung",
    "Bodenverlegung / Montage von Bauelementen",
    "Zusammenarbeit für Bauunternehmen",
    "Sonstiges Bauvorhaben",
  ],
  kombi: [
    "Renovierung mit anschließender Bauendreinigung",
    "Rückbau mit Beräumung und Reinigung",
    "Sonstiges Kombi-Projekt",
  ],
  notfall: [
    "Kurzfristige Grund- & Sonderreinigung",
    "Dringende Bauendreinigung / Reinigung vor Übergabe",
    "Zusätzlicher Reinigungseinsatz für Gewerbeobjekte",
    "Individuelle Reinigungsanfrage",
  ],
};

/** Urgent requests are answered by phone, so a number is required there. */
export const PHONE_REQUIRED_MESSAGE =
  "Für kurzfristige Einsätze benötigen wir Ihre Telefonnummer.";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Letters incl. accents, plus the punctuation real names and couples use
// ("Elena & Thomas Vogel", "D’Angelo"). Deliberately excludes line breaks.
const NAME_PATTERN = /^[\p{L}\p{M} .,'’&-]+$/u;

export function isValidName(name: string): boolean {
  return name.length >= 2 && NAME_PATTERN.test(name);
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 18 && /^[+\d\s()/.-]+$/.test(phone);
}

export const CONTACT_METHOD_REQUIRED_MESSAGE =
  "Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.";
export const INVALID_PHONE_MESSAGE =
  "Bitte geben Sie eine gültige Telefonnummer ein.";
export const INVALID_EMAIL_MESSAGE =
  "Bitte geben Sie eine gültige E-Mail-Adresse ein.";

/**
 * Phone and e-mail are each optional, but at least one is needed to reply
 * (data minimisation, Art. 5 Abs. 1 lit. c DSGVO).
 */
export function validateContactMethods(
  phone: string,
  email: string,
  phoneRequired = false
): { phone?: string; email?: string } {
  if (phoneRequired && !phone) {
    return {
      phone: PHONE_REQUIRED_MESSAGE,
      email: email && !EMAIL_PATTERN.test(email) ? INVALID_EMAIL_MESSAGE : undefined,
    };
  }
  if (!phone && !email) {
    return {
      phone: CONTACT_METHOD_REQUIRED_MESSAGE,
      email: CONTACT_METHOD_REQUIRED_MESSAGE,
    };
  }
  return {
    phone: phone && !isValidPhone(phone) ? INVALID_PHONE_MESSAGE : undefined,
    email: email && !EMAIL_PATTERN.test(email) ? INVALID_EMAIL_MESSAGE : undefined,
  };
}
