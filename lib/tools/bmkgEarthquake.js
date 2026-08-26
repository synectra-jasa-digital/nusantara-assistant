// BMKG open earthquake data. No API key, plain JSON.
// Source: https://github.com/infoBMKG/data-gempabumi

const LATEST_URL = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json'
const RECENT_URL = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json'

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`BMKG earthquake request failed: ${res.status}`)
  return res.json()
}

export async function getEarthquakeLatest() {
  const json = await fetchJson(LATEST_URL)
  return json?.Infogempa?.gempa
}

/** Up to 15 most recent earthquakes with magnitude 5.0+. */
export async function getEarthquakeList() {
  const json = await fetchJson(RECENT_URL)
  return json?.Infogempa?.gempa ?? []
}
