const ALLOWED_HOSTS = ['www.bi.go.id', 'data.bmkg.go.id', 'api.bmkg.go.id', 'webapi.bps.go.id']

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const target = url.searchParams.get('url')
    if (!target) return new Response('Missing url param', { status: 400 })

    let targetUrl
    try {
      targetUrl = new URL(target)
    } catch {
      return new Response('Invalid url param', { status: 400 })
    }

    if (!ALLOWED_HOSTS.includes(targetUrl.hostname)) {
      return new Response(`Host not allowed: ${targetUrl.hostname}`, { status: 403 })
    }

    const proxyRequest = new Request(targetUrl.toString(), request)
    return fetch(proxyRequest)
  },
}
