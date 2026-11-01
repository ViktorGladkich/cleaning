import { NextRequest, NextResponse } from "next/server";

// In-memory sliding window rate limiter per IP
interface RateRecord {
  timestamps: number[];
  lastSubmit: number;
}

const rateLimitStore = new Map<string, RateRecord>();
const MAX_STORE_ENTRIES = 2000; // Hard memory cap against spoofed-IP DDoS
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 submissions per 10 minutes per IP
const MIN_COOLDOWN_MS = 15 * 1000; // Min 15s between consecutive submissions
const MIN_DWELL_TIME_MS = 2200; // Humans take at least 2.2s to fill the form
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000; // 2 hours max form session age

const ALLOWED_CATEGORIES = new Set(["reinigung", "bau", "kombi"]);

// Strip HTML tags, control chars, null bytes, and trim excessive whitespace
function sanitizeInput(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\0/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLen);
}

// Detect URLs, HTML injection, BBCode, or common spam patterns
function containsSpamPatterns(text: string): boolean {
  const lower = text.toLowerCase();
  // Block links in name/comment/address fields (major vector for contact form spam)
  if (/(https?:\/\/|www\.|\[url=|<a\s+href|bit\.ly|tinyurl\.com)/i.test(lower)) {
    return true;
  }
  // Block common automated SEO / crypto / casino spam terms
  if (
    /(viagra|cialis|casino|crypto\s*airdrop|bitcoin\s*investment|seo\s*rank|backlinks\s*service|telegram\s*@|whatsapp\s*\+\d{10,})/i.test(
      lower
    )
  ) {
    return true;
  }
  // Block excessive character repetition (e.g., "aaaaaaaaaaaaaaa")
  if (/(.)\1{14,}/.test(text)) {
    return true;
  }
  return false;
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim().slice(0, 64);
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim().slice(0, 64);
  }
  return "local-client";
}

function cleanupRateLimitStore(now: number) {
  if (rateLimitStore.size < 400) return;
  for (const [ip, record] of rateLimitStore.entries()) {
    const valid = record.timestamps.filter((t) => now - t < WINDOW_MS);
    if (valid.length === 0) {
      rateLimitStore.delete(ip);
    } else {
      record.timestamps = valid;
    }
  }
  // Enforce hard upper bound on Map size to prevent memory exhaustion
  while (rateLimitStore.size >= MAX_STORE_ENTRIES) {
    const oldestKey = rateLimitStore.keys().next().value;
    if (!oldestKey) break;
    rateLimitStore.delete(oldestKey);
  }
}

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
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json(
            { error: "Ungültige Herkunft der Anfrage." },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Ungültige Herkunft der Anfrage." },
          { status: 403 }
        );
      }
    }

    const now = Date.now();
    cleanupRateLimitStore(now);

    // 3. IP Rate Limiting
    const ip = getClientIp(req);
    const existing = rateLimitStore.get(ip) || { timestamps: [], lastSubmit: 0 };
    existing.timestamps = existing.timestamps.filter((t) => now - t < WINDOW_MS);

    if (now - existing.lastSubmit < MIN_COOLDOWN_MS) {
      return NextResponse.json(
        {
          error:
            "Bitte warten Sie einen kurzen Moment, bevor Sie eine weitere Anfrage absenden.",
        },
        { status: 429 }
      );
    }

    if (existing.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
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
        referenceId: "TDK-0000",
      });
    }

    // 6. Human Dwell-Time Verification
    const formLoadedAt = Number(body.formLoadedAt || 0);
    const elapsed = now - formLoadedAt;
    if (!formLoadedAt || elapsed < MIN_DWELL_TIME_MS || elapsed > MAX_FORM_AGE_MS) {
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
    const comment = sanitizeInput(body.comment, 1200);
    const privacyAccepted = body.privacyAccepted === true;

    if (!ALLOWED_CATEGORIES.has(category) || service.length < 2) {
      return NextResponse.json(
        { error: "Bitte wählen Sie einen gültigen Leistungsbereich." },
        { status: 400 }
      );
    }

    if (name.length < 2 || !/^[\p{L}\s.'-]+$/u.test(name)) {
      return NextResponse.json(
        { error: "Bitte geben Sie Ihren vollständigen Namen korrekt ein." },
        { status: 400 }
      );
    }

    const digitsOnly = phone.replace(/\D/g, "");
    if (
      digitsOnly.length < 7 ||
      digitsOnly.length > 18 ||
      !/^[+\d\s()/.-]+$/.test(phone)
    ) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gültige Telefonnummer ein." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "Bitte bestätigen Sie die Datenschutzerklärung." },
        { status: 400 }
      );
    }

    // 8. Check for link / bot spam in text fields
    if (
      containsSpamPatterns(name) ||
      containsSpamPatterns(address) ||
      containsSpamPatterns(area) ||
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

    // Record valid request in rate limiter
    existing.timestamps.push(now);
    existing.lastSubmit = now;
    rateLimitStore.set(ip, existing);

    // Generate clean reference code for user receipt
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `TDK-${randomSuffix}`;

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

