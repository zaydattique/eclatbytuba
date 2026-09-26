import { SignJWT, jwtVerify } from "jose";

const SECRET = () =>
  new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "eclat-dev-secret-change-me"
  );

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
    .sign(SECRET());
}

export async function verifySessionToken(
  token: string
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET());
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

/** Demo credentials — replace with real DB lookup in production */
export async function authenticateAdmin(
  email: string,
  password: string
): Promise<SessionUser | null> {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@eclatbytuba.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "eclat2026";

  if (email === adminEmail && password === adminPassword) {
    return {
      id: "admin-1",
      email: adminEmail,
      name: "Admin",
      role: "SUPER_ADMIN",
    };
  }
  return null;
}

export const SESSION_COOKIE = "eclat_session";
