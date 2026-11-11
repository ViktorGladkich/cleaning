import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isMailConfigured, sendContactMail } from "@/lib/contactMail";
import {
  CategoryType,
  SERVICES_BY_CAT,
  isValidName,
  validateContactMethods,
} from "@/lib/contactRules";
import {
  containsSpamPatterns,
  createRateLimiter,
  getClientIp,
  isPlausibleDwellTime,
  isSameOrigin,
  sanitizeInput,
} from "@/lib/formGuard";

const rateLimiter = createRateLimiter();

function isCategory(value: string): value is CategoryType {
  return Object.hasOwn(SERVICES_BY_CAT, value);
}

const DELIVERY_FAILED_MESSAGE = `Ihre Anfrage konnte gerade nicht zugestellt werden. Bitte rufen Sie uns an oder schreiben Sie uns direkt per E-Mail.`;

export async function POST(req: NextRequest) {
  try {
    // 1. Content-Type & Payload Size Check
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Ungültiges Anfrageformat." },
        { status: 415 }
      );
    }

    const contentLength = Number(req.headers.get("content-length") || "0");
    if (contentLength > 8192) {
      return NextResponse.json(
        { error: "Die Anfrage ist zu groß." },
        { status: 413 }
      );
    }

    // 2. Same-Origin Check (CSRF defense)
    if (!isSameOrigin(req)) {
      return NextResponse.json(
        { error: "Ungültige Herkunft der Anfrage." },
        { status: 403 }
      );
    }

    const now = Date.now();

    // 3. IP Rate Limiting
    const ip = getClientIp(req);
    const rate = rateLimiter.check(ip, now);

    if (rate === "cooldown") {
      return NextResponse.json(
        {
          error:
            "Bitte warten Sie einen kurzen Moment, bevor Sie eine weitere Anfrage absenden.",
        },
        { status: 429 }
      );
    }

    if (rate === "limit") {
      return NextResponse.json(
        {
          error:
            "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in einigen Minuten erneut oder rufen Sie uns direkt an.",
        },
        { status: 429 }
      );
    }

    // 4. Parse JSON safely
    const rawText = await req.text();
    if (rawText.length > 8192) {
      return NextResponse.json(
        { error: "Die Anfrage ist zu groß." },
        { status: 413 }
      );
    }

    const body = JSON.parse(rawText) as Record<string, unknown>;

    // 5. Honeypot Check (if hidden bot fields are filled, return fake 200 to fool bots without processing)
    const honeypotWebsite = typeof body.website === "string" ? body.website.trim() : "";
    const honeypotFax = typeof body.companyFax === "string" ? body.companyFax.trim() : "";
    if (honeypotWebsite.length > 0 || honeypotFax.length > 0) {
      return NextResponse.json({
        ok: true,
        referenceId: "TDK-000000",
      });
    }

    // 6. Human Dwell-Time Verification (duration measured by the browser, so a
    // wrong device clock cannot lock real visitors out)
    if (!isPlausibleDwellTime(body.formElapsedMs)) {
      return NextResponse.json(
        {
          error:
            "Sicherheitsprüfung fehlgeschlagen. Bitte laden Sie die Seite neu und senden Sie das Formular erneut ab.",
        },
        { status: 400 }
      );
    }

    // 7. Sanitize & Validate All Fields
    const category = sanitizeInput(body.category, 20);
    const service = sanitizeInput(body.service, 100);
    const name = sanitizeInput(body.name, 80);
    const phone = sanitizeInput(body.phone, 30);
    const email = sanitizeInput(body.email, 120);
    const address = sanitizeInput(body.address, 100);
    const area = sanitizeInput(body.area, 80);
    const timing = sanitizeInput(body.timing, 100);
    const comment = sanitizeInput(body.comment, 1200);

    if (!isCategory(category) || !SERVICES_BY_CAT[category].includes(service)) {
      return NextResponse.json(
        { error: "Bitte wählen Sie einen gültigen Leistungsbereich." },
        { status: 400 }
      );
    }

    if (!isValidName(name)) {
      return NextResponse.json(
        { error: "Bitte geben Sie Ihren vollständigen Namen korrekt ein." },
        { status: 400 }
      );
    }

    const contactErrors = validateContactMethods(phone, email, category === "notfall");
    const contactError = contactErrors.phone || contactErrors.email;
    if (contactError) {
      return NextResponse.json({ error: contactError }, { status: 400 });
    }

    // 8. Check for link / bot spam in text fields
    if (
      containsSpamPatterns(name) ||
      containsSpamPatterns(address) ||
      containsSpamPatterns(area) ||
      containsSpamPatterns(timing) ||
      containsSpamPatterns(comment)
    ) {
      return NextResponse.json(
        {
          error:
            "Ihre Nachricht enthält unzulässige Links oder Zeichenfolgen. Bitte entfernen Sie Weblinks aus dem Text.",
        },
        { status: 400 }
      );
    }

    // 9. Deliver. Success is only reported once the mail server accepted the message.
    if (!isMailConfigured()) {
      console.error("[contact] SMTP is not configured; submission was not delivered");
      return NextResponse.json({ error: DELIVERY_FAILED_MESSAGE }, { status: 503 });
    }

    rateLimiter.record(ip, now);

    const referenceId = `TDK-${randomBytes(3).toString("hex").toUpperCase()}`;

    try {
      await sendContactMail({
        referenceId,
        category,
        service,
        name,
        phone,
        email,
        address,
        area,
        timing,
        comment,
      });
    } catch (mailError) {
      // Never log the error object: SMTP errors can echo addresses from the form.
      const code =
        mailError instanceof Error && "code" in mailError ? mailError.code : "unknown";
      console.error(`[contact] Delivery failed for ${referenceId}: ${String(code)}`);
      return NextResponse.json({ error: DELIVERY_FAILED_MESSAGE }, { status: 502 });
    }

    return NextResponse.json(
      {
        ok: true,
        referenceId,
        submittedAt: new Date(now).toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      },
      { status: 400 }
    );
  }
}
