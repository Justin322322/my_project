type RateLimitOptions = {
  windowMs: number; // time window in ms
  max: number; // max requests per IP per window
};

type Counter = {
  count: number;
  expiresAt: number;
};

const ipCounters: Map<string, Counter> = new Map();

export function rateLimit(ip: string, options: RateLimitOptions) {
  const now = Date.now();
  const existing = ipCounters.get(ip);

  if (!existing || existing.expiresAt <= now) {
    ipCounters.set(ip, { count: 1, expiresAt: now + options.windowMs });
    return { allowed: true, remaining: options.max - 1, resetAt: now + options.windowMs };
  }

  if (existing.count >= options.max) {
    return { allowed: false, remaining: 0, resetAt: existing.expiresAt };
  }

  existing.count += 1;
  ipCounters.set(ip, existing);
  return { allowed: true, remaining: options.max - existing.count, resetAt: existing.expiresAt };
}

export function getClientIp(headers: Headers): string {
  // Try standard proxy headers first, then fallback
  const xff = headers.get("x-forwarded-for") || headers.get("x-real-ip");
  if (xff) {
    // x-forwarded-for can be a list: client, proxy1, proxy2
    const ip = xff.split(",")[0]?.trim();
    if (ip) return ip;
  }
  // As a last resort, use a constant bucket to avoid crashing
  return "unknown";
}


