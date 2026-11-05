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

function buildBody(s: ContactSubmission): string {
  return [
    `Neue Anfrage über das Kontaktformular (${s.referenceId})`,
    "",
    `Bereich:  ${s.category}`,
    `Leistung: ${s.service}`,
    `Name:     ${s.name}`,
    `Telefon:  ${s.phone || "—"}`,
    `E-Mail:   ${s.email || "—"}`,
    `Ort/PLZ:  ${s.address || "—"}`,
    `Fläche:   ${s.area || "—"}`,
    "",
    "Nachricht:",
    s.comment || "—",
  ].join("\n");
}

/** Plain text only, so form input can never be rendered as HTML in the mail client. */
export async function sendContactMail(s: ContactSubmission): Promise<void> {
  const config = getMailConfig();
  if (!config) throw new Error("SMTP is not configured");

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port !== 465,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });

  await transporter.sendMail({
    from: { name: `${COMPANY_INFO.name} Website`, address: config.from },
    to: config.to,
    replyTo: s.email ? { name: s.name, address: s.email } : undefined,
    subject: `Neue Anfrage ${s.referenceId}: ${s.service}`,
    text: buildBody(s),
  });
}
