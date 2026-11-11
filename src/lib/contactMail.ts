import nodemailer from "nodemailer";
import { COMPANY_INFO } from "@/lib/constants";

export interface ContactSubmission {
  referenceId: string;
  category: string;
  service: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  timing: string;
  comment: string;
}

interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
}

function getMailConfig(): MailConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_MAIL_FROM, CONTACT_MAIL_TO } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: CONTACT_MAIL_FROM || SMTP_USER,
    to: CONTACT_MAIL_TO || COMPANY_INFO.email,
  };
}

export function isMailConfigured(): boolean {
  return getMailConfig() !== null;
}

const CATEGORY_LABELS: Record<string, string> = {
  reinigung: "Reinigung",
  bau: "Bau",
  kombi: "Kombi-Projekt",
  notfall: "DRINGEND – kurzfristiger Einsatz",
};

function buildBody(s: ContactSubmission): string {
  return [
    `Neue Anfrage über das Kontaktformular (${s.referenceId})`,
    "",
    `Bereich:  ${CATEGORY_LABELS[s.category] ?? s.category}`,
    `Leistung: ${s.service}`,
    `Name:     ${s.name}`,
    `Telefon:  ${s.phone || "—"}`,
    `E-Mail:   ${s.email || "—"}`,
    `Ort/PLZ:  ${s.address || "—"}`,
    `Fläche:   ${s.area || "—"}`,
    `Zeitpunkt/Zeitraum: ${s.timing || "—"}`,
    "",
    "Nachricht:",
    s.comment || "—",
  ].join("\n");
}

function createTransport(config: MailConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port !== 465,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 20000,
  });
}

/** Plain text only, so form input can never be rendered as HTML in the mail client. */
export async function sendContactMail(s: ContactSubmission): Promise<void> {
  const config = getMailConfig();
  if (!config) throw new Error("SMTP is not configured");

  await createTransport(config).sendMail({
    from: { name: `${COMPANY_INFO.name} Website`, address: config.from },
    to: config.to,
    replyTo: s.email ? { name: s.name, address: s.email } : undefined,
    subject: `${s.category === "notfall" ? "DRINGEND – " : ""}Neue Anfrage ${s.referenceId}: ${s.service}`,
    text: buildBody(s),
  });
}

export interface ApplicationSubmission {
  referenceId: string;
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
  cv?: { filename: string; content: Buffer; contentType: string };
}

function buildApplicationBody(a: ApplicationSubmission): string {
  const line = (label: string, value: string) => `${label.padEnd(22)}${value || "—"}`;
  return [
    `Neue Bewerbung über die Karriereseite (${a.referenceId})`,
    "",
    line("Name:", a.name),
    line("Telefon:", a.phone),
    line("E-Mail:", a.email),
    line("Wohnort:", a.city),
    line("Bereich:", a.area),
    line("Beschäftigung:", a.employment),
    line("Arbeitsbeginn:", a.startDate),
    line("Führerschein:", a.driversLicense),
    line("Eigenes Auto:", a.ownCar),
    line("Sprachkenntnisse:", a.languages),
    "",
    "Bisherige Erfahrung:",
    a.experience || "—",
    "",
    "Nachricht:",
    a.message || "—",
    "",
    a.cv ? `Lebenslauf: im Anhang (${a.cv.filename})` : "Lebenslauf: nicht angehängt",
    "",
    "Hinweis: Bewerbungsdaten nach Abschluss des Verfahrens löschen (siehe Datenschutzerklärung).",
  ].join("\n");
}

export async function sendApplicationMail(a: ApplicationSubmission): Promise<void> {
  const config = getMailConfig();
  if (!config) throw new Error("SMTP is not configured");

  await createTransport(config).sendMail({
    from: { name: `${COMPANY_INFO.name} Karriere`, address: config.from },
    to: process.env.APPLICATION_MAIL_TO || config.to,
    replyTo: a.email ? { name: a.name, address: a.email } : undefined,
    subject: `Neue Bewerbung ${a.referenceId}: ${a.name} (${a.area})`,
    text: buildApplicationBody(a),
    attachments: a.cv
      ? [{ filename: a.cv.filename, content: a.cv.content, contentType: a.cv.contentType }]
      : undefined,
  });
}
