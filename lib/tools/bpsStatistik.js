const BASE = 'https://webapi.bps.go.id/v1/api'

export async function getStatistic({ domain_code, var_id }) {
  const key = process.env.BPS_API_KEY
  if (!key) {
    throw new Error(
      'BPS_API_KEY belum diset. Daftar gratis di https://webapi.bps.go.id/developer/ lalu isi di .env'
    )
  }

  const url = `${BASE}/list/model/data/lang/ind/domain/${encodeURIComponent(
    domain_code
  )}/var/${encodeURIComponent(var_id)}/key/${key}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`BPS request failed: ${res.status}`)
  const json = await res.json()

  const varInfo = json?.data?.[0]?.var?.[0]
  const tahunList = json?.data?.[0]?.tahun ?? []
  const datacontent = json?.data?.[1]?.datacontent

  if (!varInfo || !datacontent) {
    throw new Error('BPS tidak mengembalikan data untuk domain/variabel ini')
  }

  const latestTahun = tahunList.reduce((a, b) => (b.val > (a?.val ?? -Infinity) ? b : a), null)
  const entry =
    Object.entries(datacontent).find(([k]) => latestTahun && k.endsWith(String(latestTahun.val))) ??
    Object.entries(datacontent)[0]

  if (!entry) {
    throw new Error('BPS tidak mengembalikan data untuk domain/variabel ini')
  }

  return {
    indicator: varInfo.title,
    value: entry[1],
    unit: varInfo.unit ?? '',
    period: latestTahun?.label,
    region: domain_code,
  }
}
