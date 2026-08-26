// BMKG public weather forecast API.
// Docs: https://data.bmkg.go.id/prakiraan-cuaca/
// No API key needed. Rate limit: 60 requests/minute/IP.
// Requires an adm4 (village/kelurahan level) administrative code, which
// is exactly the code format returned by wilayah.id - see getRegionInfo.

const ENDPOINT = 'https://api.bmkg.go.id/publik/prakiraan-cuaca'

/**
 * @param {{ region_code: string }} args - adm4 code, e.g. "31.71.03.1001"
 */
export async function getWeather({ region_code }) {
  const url = `${ENDPOINT}?adm4=${encodeURIComponent(region_code)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`BMKG weather request failed: ${res.status}`)
  const json = await res.json()

  // Response shape: { lokasi: {...}, data: [{ cuaca: [[{...3-hourly...}]] }] }
  const lokasi = json?.lokasi
  const firstSlot = json?.data?.[0]?.cuaca?.[0]?.[0]

  if (!firstSlot) {
    throw new Error('BMKG tidak mengembalikan data cuaca untuk kode wilayah ini')
  }

  return {
    location: [lokasi?.desa, lokasi?.kecamatan, lokasi?.kotkab].filter(Boolean).join(', '),
    datetime: firstSlot.local_datetime,
    weather_desc: firstSlot.weather_desc,
    temperature: firstSlot.t,
    humidity: firstSlot.hu,
    wind_speed: firstSlot.ws,
  }
}
