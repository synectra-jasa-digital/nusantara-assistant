// BPS WebAPI (Statistics Indonesia). Needs a free API key/App ID from
// https://webapi.bps.go.id/developer/ - set as BPS_API_KEY.
// Endpoint pattern confirmed from BPS's own documentation examples:
// https://webapi.bps.go.id/v1/api/{path}/model/{model}/lang/{lang}/domain/{domain}/var/{var}/key/{key}

const BASE = 'https://webapi.bps.go.id/v1/api'

/**
 * @param {{ domain_code: string, var_id: string }} args
 *   domain_code - BPS region code, e.g. "3200" for Jawa Barat, "0000" for national
 *   var_id - BPS variable id from their indicator catalog
 */
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

  // BPS's "data" model returns var metadata plus a datacontent map keyed by
  // "<vervar><var><turvar><tahun>" (concatenated, no separators) -> value.
  // Match the key's suffix against the `tahun` lookup's code to find the
  // entry for the most recent year, since datacontent doesn't tag entries directly.
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
