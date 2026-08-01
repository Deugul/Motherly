/**
 * HTTP layer: per-host rate limiting, exponential backoff, 429/503 handling,
 * redirect following and byte-range support. Uses Node's built-in fetch (>=18).
 */

const UAS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
];

const lastHit = new Map();
let uaIndex = 0;

/**
 * Circuit breaker. A host that never completes a TCP/TLS handshake (blocked,
 * firewalled, DNS-dead) would otherwise burn `timeoutMs * retries` on every
 * asset. After `TRIP_AFTER` consecutive connection-level failures with zero
 * successes, the host is marked unreachable and skipped for the rest of the run.
 */
const TRIP_AFTER = 3;
const breaker = new Map(); // host -> { failures, ok, tripped }

function breakerFor(host) {
  let b = breaker.get(host);
  if (!b) {
    b = { failures: 0, ok: false, tripped: false };
    breaker.set(host, b);
  }
  return b;
}

/** Hosts skipped this run, for the report. */
export function unreachableHosts() {
  return [...breaker.entries()].filter(([, b]) => b.tripped).map(([h]) => h);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function nextUA() {
  uaIndex = (uaIndex + 1) % UAS.length;
  return UAS[uaIndex];
}

function hostOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

/** Serialise requests per host so we never trip archive rate limits. */
async function throttle(host, cfg) {
  const gap = cfg.hostDelayMs[host] ?? cfg.hostDelayMs.default ?? 0;
  if (!gap) return;

  const prev = lastHit.get(host) || 0;
  const wait = prev + gap - Date.now();
  // Reserve the slot before awaiting so concurrent callers queue behind us.
  lastHit.set(host, Math.max(Date.now(), prev + gap));
  if (wait > 0) await sleep(wait);
}

export class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

/**
 * Fetch with retries. Returns { ok, status, buffer, contentType, finalUrl, headers }.
 * Never throws on HTTP status — only on exhausted network retries.
 */
export async function fetchWithRetry(url, cfg, opts = {}) {
  const {
    method = "GET",
    headers = {},
    range = null,
    accept = "*/*",
    retries = cfg.retries,
    binary = true,
  } = opts;

  const host = hostOf(url);
  const b = breakerFor(host);
  if (b.tripped) {
    return { ok: false, status: 0, buffer: null, error: "host unreachable (circuit open)", skipped: true };
  }

  let lastErr = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    await throttle(host, cfg);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);

    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "User-Agent": nextUA(),
          Accept: accept,
          "Accept-Language": "en-US,en;q=0.9",
          ...(range ? { Range: `bytes=${range}` } : {}),
          ...headers,
        },
      });

      // The host answered — any HTTP status proves reachability.
      b.ok = true;
      b.failures = 0;

      // Back off and retry on rate limit / transient upstream failures.
      if (res.status === 429 || res.status === 503 || res.status === 502 || res.status === 504) {
        const retryAfter = Number(res.headers.get("retry-after"));
        const wait = Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : Math.min(30000, 1500 * 2 ** attempt);
        clearTimeout(timer);
        if (attempt === retries) {
          return { ok: false, status: res.status, buffer: null, finalUrl: res.url, rateLimited: true };
        }
        await sleep(wait);
        continue;
      }

      if (!res.ok) {
        clearTimeout(timer);
        return {
          ok: false,
          status: res.status,
          buffer: null,
          finalUrl: res.url,
          contentType: res.headers.get("content-type") || "",
        };
      }

      const buffer = binary
        ? Buffer.from(await res.arrayBuffer())
        : Buffer.from(await res.text(), "utf8");

      clearTimeout(timer);
      return {
        ok: true,
        status: res.status,
        buffer,
        contentType: res.headers.get("content-type") || "",
        finalUrl: res.url,
        headers: res.headers,
      };
    } catch (err) {
      clearTimeout(timer);
      lastErr = err;
      if (!b.ok) {
        b.failures++;
        // Never responded and repeatedly failed to connect — stop paying for it.
        if (b.failures >= TRIP_AFTER) {
          b.tripped = true;
          return { ok: false, status: 0, buffer: null, error: "host unreachable (circuit tripped)", skipped: true };
        }
      }
      if (attempt === retries) break;
      await sleep(Math.min(20000, 800 * 2 ** attempt));
    }
  }

  return {
    ok: false,
    status: 0,
    buffer: null,
    error: lastErr ? `${lastErr.name}: ${lastErr.message}` : "unknown network error",
  };
}

/** Convenience wrapper returning decoded text, or "" on failure. */
export async function fetchText(url, cfg, opts = {}) {
  const res = await fetchWithRetry(url, cfg, {
    ...opts,
    accept: opts.accept || "text/html,application/json;q=0.9,*/*;q=0.8",
  });
  return res.ok && res.buffer ? res.buffer.toString("utf8") : "";
}

/** Convenience wrapper returning parsed JSON, or null on failure. */
export async function fetchJson(url, cfg, opts = {}) {
  const text = await fetchText(url, cfg, { ...opts, accept: "application/json,*/*;q=0.8" });
  if (!text.trim()) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Bounded-concurrency map that never rejects; failures surface as null. */
export async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      try {
        results[index] = await worker(items[index], index);
      } catch (err) {
        results[index] = { error: err.message };
      }
    }
  });

  await Promise.all(runners);
  return results;
}
