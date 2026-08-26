const ENDPOINT = 'https://api.bmkg.go.id/publik/prakiraan-cuaca'

export async function getWeather({ region_code }) {
  const url = `${ENDPOINT}?adm4=${encodeURIComponent(region_code)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`BMKG weather request failed: ${res.status}`)
  const json = await res.json()

  const lokasi = json?.lokasi
  const firstSlot = json?.data?.[0]?.cuaca?.[0]?.[0]

  if (!firstSlot) {
    throw new Error('BMKG tidak mengembalikan data cuaca untuk kode wilayah ini')
  }

  return {
    location: [lokasi?.desa, lokasi?.kecamatan, lokasi?.kotkab].filter(Boolean).join(', '),
    city: lokasi?.kotkab ?? null,
    datetime: firstSlot.local_datetime,
    weather_desc: firstSlot.weather_desc,
    temperature: firstSlot.t,
    humidity: firstSlot.hu,
    wind_speed: firstSlot.ws,
  }
}
