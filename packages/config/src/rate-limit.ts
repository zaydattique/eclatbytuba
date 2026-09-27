/**
 * Rate limiting — Security + UX
 * Prevents login brute-force, checkout spam, upload abuse.
 */

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  retryAfterMs?: number;
};

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

export function rateLimit(opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  let entry = store.get(opts.key);

  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + opts.windowMs };
    store.set(opts.key, entry);
  }

  entry.count += 1;

  if (entry.count > opts.limit) {
    return {
      success: false,
      remaining: 0,
      retryAfterMs: Math.max(0, entry.resetAt - now),
    };
  }

  return {
    success: true,
    remaining: Math.max(0, opts.limit - entry.count),
  };
}

export const RATE_LIMITS = {
  login: { limit: 5, windowMs: 15 * 60 * 1000 },
  checkout: { limit: 10, windowMs: 10 * 60 * 1000 },
  upload: { limit: 20, windowMs: 60 * 60 * 1000 },
  api: { limit: 120, windowMs: 60 * 1000 },
  review: { limit: 5, windowMs: 60 * 60 * 1000 },
} as const;

export function clientKey(prefix: string, ip: string, extra?: string): string {
  return extra ? `${prefix}:${ip}:${extra}` : `${prefix}:${ip}`;
}
