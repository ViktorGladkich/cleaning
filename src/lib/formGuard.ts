import type { NextRequest } from "next/server";

// Server-side protection shared by /api/contact and /api/bewerbung.

/** Strip HTML tags, control chars, null bytes, and trim excessive whitespace. */
export function sanitizeInput(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\0/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLen);
}

/** Detect URLs, HTML injection, BBCode, or common spam patterns. */
export function containsSpamPatterns(text: string): boolean {
  const lower = text.toLowerCase();
  // Block links in free-text fields (major vector for form spam)
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

export function getClientIp(req: NextRequest): string {
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

/** CSRF defense: reject cross-origin browser submissions. */
export function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const MIN_DWELL_TIME_MS = 2200; // Humans take at least 2.2s to fill a form
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000; // 2 hours max form session age

/** The browser measures how long the form was open, so a wrong device clock cannot lock visitors out. */
export function isPlausibleDwellTime(value: unknown): boolean {
  const elapsed = Number(value);
  return Number.isFinite(elapsed) && elapsed >= MIN_DWELL_TIME_MS && elapsed <= MAX_FORM_AGE_MS;
}

interface RateRecord {
  timestamps: number[];
  lastSubmit: number;
}

export type RateLimitResult = "ok" | "cooldown" | "limit";

/**
 * In-memory sliding window rate limiter per IP.
 * Best effort: each serverless instance keeps its own store.
 */
export function createRateLimiter({
  windowMs = 10 * 60 * 1000, // 10 minutes (stated in the Datenschutzerklärung)
  maxRequests = 3,
  cooldownMs = 15 * 1000,
  maxEntries = 2000, // Hard memory cap against spoofed-IP floods
} = {}) {
  const store = new Map<string, RateRecord>();

  // IPs are dropped as soon as they leave the window, on the next request to this instance.
  function cleanup(now: number) {
    for (const [ip, record] of store.entries()) {
      const valid = record.timestamps.filter((t) => now - t < windowMs);
      if (valid.length === 0) {
        store.delete(ip);
      } else {
        record.timestamps = valid;
      }
    }
    while (store.size >= maxEntries) {
      const oldestKey = store.keys().next().value;
      if (!oldestKey) break;
      store.delete(oldestKey);
    }
  }

  return {
    check(ip: string, now: number): RateLimitResult {
      cleanup(now);
      const record = store.get(ip);
      if (!record) return "ok";
      if (now - record.lastSubmit < cooldownMs) return "cooldown";
      if (record.timestamps.length >= maxRequests) return "limit";
      return "ok";
    },
    record(ip: string, now: number) {
      const record = store.get(ip) || { timestamps: [], lastSubmit: 0 };
      record.timestamps.push(now);
      record.lastSubmit = now;
      store.set(ip, record);
    },
  };
}
