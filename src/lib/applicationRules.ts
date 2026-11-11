// Rules shared by the application form (client) and /api/bewerbung (server).
import { EMAIL_PATTERN, isValidName, isValidPhone } from "@/lib/contactRules";

export const APPLICATION_AREAS = ["Cleaning", "BAU", "Beides"] as const;
export const EMPLOYMENT_TYPES = ["Vollzeit", "Teilzeit", "Minijob"] as const;
export const YES_NO = ["Ja", "Nein"] as const;

/** Vercel limits request bodies to 4.5 MB, so the CV stays below that. */
export const CV_MAX_BYTES = 4 * 1024 * 1024;
export const CV_ACCEPT = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
export const CV_EXTENSIONS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

export const FIELD_LIMITS = {
  name: 80,
  phone: 30,
  email: 120,
  city: 80,
  languages: 200,
  experience: 1200,
  startDate: 60,
  message: 1500,
} as const;

export interface ApplicationFields {
  name: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  languages: string;
  experience: string;
  driversLicense: string;
  ownCar: string;
  employment: string;
  startDate: string;
  message: string;
  privacyAck: boolean;
}

export type ApplicationErrors = Partial<Record<keyof ApplicationFields | "cv", string>>;

function isOneOf(value: string, options: readonly string[], optional = true): boolean {
  return (optional && value === "") || options.includes(value);
}

export function validateApplication(f: ApplicationFields): ApplicationErrors {
  const errors: ApplicationErrors = {};
  if (!isValidName(f.name)) errors.name = "Bitte gib deinen Vor- und Nachnamen an.";
  if (!f.phone) errors.phone = "Bitte gib deine Telefonnummer an.";
  else if (!isValidPhone(f.phone)) errors.phone = "Bitte gib eine gültige Telefonnummer an.";
  if (f.email && !EMAIL_PATTERN.test(f.email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse an.";
  }
  if (!isOneOf(f.area, APPLICATION_AREAS, false)) {
    errors.area = "Bitte wähle einen Bereich aus.";
  }
  if (!isOneOf(f.employment, EMPLOYMENT_TYPES)) errors.employment = "Ungültige Auswahl.";
  if (!isOneOf(f.driversLicense, YES_NO)) errors.driversLicense = "Ungültige Auswahl.";
  if (!isOneOf(f.ownCar, YES_NO)) errors.ownCar = "Ungültige Auswahl.";
  if (!f.privacyAck) {
    errors.privacyAck = "Bitte bestätige, dass du die Datenschutzhinweise gelesen hast.";
  }
  return errors;
}

export function getFileExtension(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  return dot === -1 ? "" : fileName.slice(dot + 1).toLowerCase();
}

/** Client-side pre-check; the server additionally checks the file signature. */
export function validateCvFile(file: { name: string; size: number }): string | undefined {
  if (!CV_EXTENSIONS.includes(getFileExtension(file.name))) {
    return "Erlaubt sind PDF, Word (DOC/DOCX), JPG oder PNG.";
  }
  if (file.size > CV_MAX_BYTES) return "Die Datei darf höchstens 4 MB groß sein.";
  if (file.size === 0) return "Die Datei ist leer.";
  return undefined;
}
