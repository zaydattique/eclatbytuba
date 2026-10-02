/**
 * Rate limiting — Security + UX
 * Prefer Upstash Redis when configured (durable across instances).
 * Falls back to in-memory Map for local/dev single-instance.
 */

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  retryAfterMs?: number;
};

export type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type Entry = { count: number; resetAt: number };

const memoryStore = new Map<string, Entry>();

function memoryRateLimit(opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  let entry = memoryStore.get(opts.key);

  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + opts.windowMs };
    memoryStore.set(opts.key, entry);
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

function upstashConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  );
}

async function upstashRateLimit(opts: RateLimitOptions): Promise<RateLimitResult> {
  const base = process.env.UPSTASH_REDIS_REST_URL!.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const windowSec = Math.max(1, Math.ceil(opts.windowMs / 1000));
  const redisKey = `rl:${opts.key}`;

  try {
    const res = await fetch(`${base}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", redisKey],
        ["EXPIRE", redisKey, windowSec],
        ["TTL", redisKey],
      ]),
    });

    if (!res.ok) {
      console.error("Upstash rate limit HTTP", res.status);
      return memoryRateLimit(opts);
    }

    const data = (await res.json()) as Array<{ result?: number }>;
    const count = Number(data?.[0]?.result ?? 0);
    const ttl = Number(data?.[2]?.result ?? windowSec);

    if (count > opts.limit) {
      return {
        success: false,
        remaining: 0,
        retryAfterMs: Math.max(0, (ttl > 0 ? ttl : windowSec) * 1000),
      };
    }

    return {
      success: true,
      remaining: Math.max(0, opts.limit - count),
    };
  } catch (e) {
    console.error("Upstash rate limit failed, using memory:", e);
    return memoryRateLimit(opts);
  }
}

/** Async rate limit — uses Upstash when env is set, else memory. */
export async function rateLimit(
  opts: RateLimitOptions
): Promise<RateLimitResult> {
  if (upstashConfigured()) return upstashRateLimit(opts);
  return memoryRateLimit(opts);
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
