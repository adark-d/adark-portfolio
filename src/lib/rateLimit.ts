/**
 * In-memory sliding-window rate limiter.
 *
 * Tracks request timestamps per key (typically IP address) and rejects
 * requests that exceed the configured limit within the window. Stale
 * entries are pruned on every check to prevent unbounded memory growth.
 */

interface RateLimitEntry {
  timestamps: number[]
}

const store = new Map<string, RateLimitEntry>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 10

/** Remove entries whose timestamps have all expired */
function prune() {
  const now = Date.now()
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < WINDOW_MS)
    if (entry.timestamps.length === 0) store.delete(key)
  }
}

/**
 * Returns `{ allowed: true }` if the key hasn't exceeded the limit,
 * or `{ allowed: false, retryAfter }` with seconds until the oldest
 * request in the window expires.
 */
export function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()

  if (store.size > 10_000) prune()

  let entry = store.get(key)
  if (!entry) {
    entry = { timestamps: [] }
    store.set(key, entry)
  }

  entry.timestamps = entry.timestamps.filter((t) => now - t < WINDOW_MS)

  if (entry.timestamps.length >= MAX_REQUESTS) {
    const oldest = entry.timestamps[0]
    const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1000)
    return { allowed: false, retryAfter }
  }

  entry.timestamps.push(now)
  return { allowed: true }
}
