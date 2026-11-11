import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isMailConfigured, sendApplicationMail } from "@/lib/contactMail";
import {
  CV_MAX_BYTES,
  FIELD_LIMITS,
  getFileExtension,
  validateApplication,
  validateCvFile,
  type ApplicationFields,
} from "@/lib/applicationRules";
import {
  containsSpamPatterns,
  createRateLimiter,
  getClientIp,
  isPlausibleDwellTime,
  isSameOrigin,
  sanitizeInput,
} from "@/lib/formGuard";

const rateLimiter = createRateLimiter();

// Form fields plus a CV of at most 4 MB, encoded as multipart.
const MAX_BODY_BYTES = CV_MAX_BYTES + 64 * 1024;

const DELIVERY_FAILED_MESSAGE =
  "Deine Bewerbung konnte gerade nicht zugestellt werden. Bitte ruf uns an oder schick sie per E-Mail an info@tadiks-cleaning.de.";

const CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

/** Checks the first bytes so a renamed executable is not forwarded as "lebenslauf.pdf". */
function hasExpectedSignature(ext: string, bytes: Uint8Array): boolean {
  const starts = (...sig: number[]) => sig.every((b, i) => bytes[i] === b);
  switch (ext) {
    case "pdf":
      return starts(0x25, 0x50, 0x44, 0x46); // %PDF
    case "png":
      return starts(0x89, 0x50, 0x4e, 0x47);
    case "jpg":
    case "jpeg":
      return starts(0xff, 0xd8, 0xff);
    case "docx":
      return starts(0x50, 0x4b, 0x03, 0x04); // ZIP container
    case "doc":
      return starts(0xd0, 0xcf, 0x11, 0xe0); // OLE2 container
    default:
      return false;
  }
}

/** Keeps the original name readable but safe for mail clients and file systems. */
function safeFileName(name: string, ext: string): string {
  const base = name
    .replace(/\.[^.]*$/, "")
    .normalize("NFKD")
    .replace(/[^\w\- ]+/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 60);
  return `${base || "Lebenslauf"}.${ext}`;
}

function field(form: FormData, key: keyof typeof FIELD_LIMITS): string {
  return sanitizeInput(form.get(key), FIELD_LIMITS[key]);
}

function choice(form: FormData, key: string): string {
  return sanitizeInput(form.get(key), 20);
}

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return error("Ungültiges Anfrageformat.", 415);
    }

    if (Number(req.headers.get("content-length") || "0") > MAX_BODY_BYTES) {
      return error("Die Bewerbung ist zu groß. Der Lebenslauf darf höchstens 4 MB haben.", 413);
    }

    if (!isSameOrigin(req)) {
      return error("Ungültige Herkunft der Anfrage.", 403);
    }

    const now = Date.now();
    const ip = getClientIp(req);
    const rate = rateLimiter.check(ip, now);
    if (rate === "cooldown") {
      return error("Bitte warte einen kurzen Moment, bevor du erneut absendest.", 429);
    }
    if (rate === "limit") {
      return error(
        "Zu viele Bewerbungen in kurzer Zeit. Bitte versuch es in einigen Minuten erneut oder ruf uns an.",
        429
      );
    }

    const form = await req.formData();

    // Honeypot: bots get a fake success and nothing is sent.
    const honeypot = sanitizeInput(form.get("website"), 200) + sanitizeInput(form.get("companyFax"), 200);
    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true, referenceId: "TDK-B-000000" });
    }

    if (!isPlausibleDwellTime(form.get("formElapsedMs"))) {
      return error(
        "Sicherheitsprüfung fehlgeschlagen. Bitte lade die Seite neu und sende das Formular erneut ab.",
        400
      );
    }

    const fields: ApplicationFields = {
      name: field(form, "name"),
      phone: field(form, "phone"),
      email: field(form, "email"),
      city: field(form, "city"),
      area: choice(form, "area"),
      languages: field(form, "languages"),
      experience: field(form, "experience"),
      driversLicense: choice(form, "driversLicense"),
      ownCar: choice(form, "ownCar"),
      employment: choice(form, "employment"),
      startDate: field(form, "startDate"),
      message: field(form, "message"),
      privacyAck: form.get("privacyAck") === "true",
    };

    const fieldErrors = validateApplication(fields);
    const firstError = Object.values(fieldErrors)[0];
    if (firstError) return error(firstError, 400);

    const freeText = [fields.name, fields.city, fields.languages, fields.experience, fields.startDate, fields.message];
    if (freeText.some(containsSpamPatterns)) {
      return error("Deine Nachricht enthält unzulässige Links. Bitte entferne Weblinks aus dem Text.", 400);
    }

    // Optional CV
    let cv: { filename: string; content: Buffer; contentType: string } | undefined;
    const upload = form.get("cv");
    if (upload instanceof File && upload.size > 0) {
      const fileError = validateCvFile(upload);
      if (fileError) return error(fileError, 400);
      const ext = getFileExtension(upload.name);
      const content = Buffer.from(await upload.arrayBuffer());
      if (!hasExpectedSignature(ext, content)) {
        return error("Die Datei konnte nicht gelesen werden. Bitte lade eine PDF-, Word-, JPG- oder PNG-Datei hoch.", 400);
      }
      cv = { filename: safeFileName(upload.name, ext), content, contentType: CONTENT_TYPES[ext] };
    }

    if (!isMailConfigured()) {
      console.error("[bewerbung] SMTP is not configured; application was not delivered");
      return error(DELIVERY_FAILED_MESSAGE, 503);
    }

    rateLimiter.record(ip, now);
    const referenceId = `TDK-B-${randomBytes(3).toString("hex").toUpperCase()}`;

    try {
      await sendApplicationMail({ referenceId, ...fields, cv });
    } catch (mailError) {
      // Never log the error object: SMTP errors can echo personal data from the form.
      const code = mailError instanceof Error && "code" in mailError ? mailError.code : "unknown";
      console.error(`[bewerbung] Delivery failed for ${referenceId}: ${String(code)}`);
      return error(DELIVERY_FAILED_MESSAGE, 502);
    }

    return NextResponse.json(
      { ok: true, referenceId },
      { status: 200, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch {
    return error("Beim Senden ist ein Fehler aufgetreten. Bitte versuch es erneut.", 400);
  }
}
