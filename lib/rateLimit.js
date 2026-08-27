const hits = new Map()

export function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  return (
    (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  )
}

export function isRateLimited(key, max = 20, windowMs = 60_000) {
  const now = Date.now()
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  timestamps.push(now)
  hits.set(key, timestamps)
  return timestamps.length > max
}
