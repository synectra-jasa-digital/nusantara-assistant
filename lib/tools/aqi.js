const BASE = 'https://api.airvisual.com/v2'

const POLLUTANT_NAMES = {
  p1: 'PM10',
  p2: 'PM2.5',
  o3: 'Ozon (O3)',
  n2: 'Nitrogen Dioksida (NO2)',
  s2: 'Sulfur Dioksida (SO2)',
  co: 'Karbon Monoksida (CO)',
}

export async function getAirQuality({ city, province }) {
  const key = process.env.IQAIR_API_KEY
  if (!key) {
    throw new Error('IQAIR_API_KEY belum diset. Daftar gratis di https://dashboard.iqair.com/ lalu isi di .env')
  }

  const url = `${BASE}/city?${new URLSearchParams({ city, state: province, country: 'Indonesia', key })}`
  const res = await fetch(url)
  const json = await res.json()

  if (json.status !== 'success') {
    throw new Error(json?.data?.message || `IQAir tidak menemukan data untuk ${city}, ${province}`)
  }

  const pollution = json.data.current.pollution

  return {
    city: json.data.city,
    state: json.data.state,
    aqi: pollution.aqius,
    main_pollutant: POLLUTANT_NAMES[pollution.mainus] ?? pollution.mainus,
    measured_at: pollution.ts,
  }
}
