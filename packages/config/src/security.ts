/**
 * Security helpers — headers, cookies, password rules
 */

export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-DNS-Prefetch-Control": "on",
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; frame-src https://js.stripe.com; connect-src 'self' https:;",
};

export const SESSION_COOKIE = {
  name: "eclat_session",
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export const PASSWORD_RULES = {
  minLength: 10,
  requireLetter: true,
  requireNumber: true,
};

export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_RULES.minLength) {
    return `Password must be at least ${PASSWORD_RULES.minLength} characters`;
  }
  if (PASSWORD_RULES.requireLetter && !/[a-zA-Z]/.test(password)) {
    return "Password must include a letter";
  }
  if (PASSWORD_RULES.requireNumber && !/[0-9]/.test(password)) {
    return "Password must include a number";
  }
  return null;
}

export const SENSITIVE_SETTING_KEYS = [
  "stripe_secret_key",
  "resend_api_key",
  "meta_capi_token",
  "jazzcash_password",
] as const;
