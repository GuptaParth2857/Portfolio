import { createHash, timingSafeEqual } from "crypto";

const FALLBACK_PASSWORD = "parth-admin-2857";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || FALLBACK_PASSWORD;
}

export function usingFallbackPassword(): boolean {
  return !process.env.ADMIN_PASSWORD;
}

function token(): string {
  return createHash("sha256").update(adminPassword()).digest("hex");
}

export function verifyPassword(password: string): boolean {
  const expected = createHash("sha256").update(password).digest("hex");
  const actual = Buffer.from(expected);
  const ref = Buffer.from(token());
  if (actual.length !== ref.length) return false;
  return timingSafeEqual(actual, ref);
}

export function createSessionValue(): string {
  return token();
}

export function isValidSession(value: string | undefined): boolean {
  if (!value) return false;
  const ref = Buffer.from(token());
  const actual = Buffer.from(value);
  if (ref.length !== actual.length) return false;
  return timingSafeEqual(ref, actual);
}