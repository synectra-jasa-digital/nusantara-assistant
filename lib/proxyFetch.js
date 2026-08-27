export function proxiedFetch(url, options) {
  const proxyUrl = process.env.PROXY_URL
  const target = proxyUrl ? `${proxyUrl}?url=${encodeURIComponent(url)}` : url
  return fetch(target, options)
}
