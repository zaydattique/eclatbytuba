import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

/**
 * Auth — JWT sessions for admin.
 * Production: AUTH_SECRET / NEXTAUTH_SECRET required (no fallback).
 * Production: ADMIN_EMAIL + ADMIN_PASSWORD required (no demo defaults).
 */

function getSecretKey(): Uint8Array {
  const raw =
    process.env.NEXTAUTH_SECRET ||
    process.env.AUTH_SECRET ||
    (process.env.NODE_ENV === "production" ? "" : "eclat-dev-secret-change-me");

  if (!raw) {
    throw new Error(
      "AUTH_SECRET (or NEXTAUTH_SECRET) is required in production"
    );
  }
  return new TextEncoder().encode(raw);
}

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "SUPER_ADMIN" | "CUSTOMER";
};

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as SessionUser["role"],
    };
  } catch {
    return null;
  }
}

/** Admin login — no demo defaults in production */
export async function authenticateAdmin(
  email: string,
  password: string
): Promise<SessionUser | null> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (process.env.NODE_ENV === "production") {
    if (!adminEmail || !adminPassword) {
      console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in production");
      return null;
    }
  }

  const expectedEmail = adminEmail || "admin@eclatbytuba.com";
  const expectedPassword = adminPassword || "eclat2026";

  if (email === expectedEmail && password === expectedPassword) {
    return {
      id: "admin-1",
      email: expectedEmail,
      name: "Admin",
      role: "SUPER_ADMIN",
    };
  }
  return null;
}

export const SESSION_COOKIE = "eclat_session";

/** Require admin session from request cookies (admin app same-origin) */
export async function requireAdminSession(
  req: NextRequest
): Promise<SessionUser | null> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const user = await verifySessionToken(token);
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return null;
  }
  return user;
}

/**
 * Optional cross-app secret for web routes during dual-origin deploy.
 * Prefer admin-app API routes; use this only as defense-in-depth on web.
 */
export function requireAdminApiSecret(req: NextRequest): boolean {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) return false;
  const header = req.headers.get("x-eclat-admin-secret");
  return Boolean(header && header === secret);
}
