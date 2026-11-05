// Validation rules shared by the contact form (client) and /api/contact (server).

export type CategoryType = "reinigung" | "bau" | "kombi";

export const SERVICES_BY_CAT: Record<CategoryType, string[]> = {
  reinigung: [
    "Unterhaltsreinigung",
    "Grundreinigung",
    "Bauendreinigung",
    "Fenster- & Glasreinigung",
    "Büro- & Praxisreinigung",
    "Hotelreinigung",
    "Treppenhausreinigung",
    "Industrie- & Hallenreinigung",
    "Entrümpelungen",
    "Fassaden- & Spezialreinigung",
  ],
  bau: [
    "Trockenbau & Akustik",
    "Komplettsanierung",
    "Abbruch & Entkernung",
  ],
  kombi: [
    "Komplettausbau inkl. Bauendreinigung",
    "Praxis- & Bürosanierung mit Turnusreinigung",
    "Mieterwechsel-Renovierung mit Endreinigung",
  ],
};

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
  email: string
): { phone?: string; email?: string } {
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
