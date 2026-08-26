// wilayah.id - static, keyless JSON API for Indonesian administrative
// regions. Docs: https://wilayah.id/
//
// There is no search-by-name endpoint, so `get_region_info` fetches the
// province list and walks down one level at a time, matching by name at
// each step. This keeps it working with only 4 lightweight requests at
// most, and needs no API key.

const BASE = 'https://wilayah.id/api'

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`wilayah.id request failed: ${res.status} ${url}`)
  return res.json()
}

function findByName(items, name) {
  const needle = name.toLowerCase()
  return (
    items.find((i) => i.name.toLowerCase() === needle) ||
    items.find((i) => i.name.toLowerCase().includes(needle)) ||
    null
  )
}

/**
 * Resolve a place name to its administrative code and hierarchy.
 * Tries to match at province, then regency, then district level.
 * @param {{ query: string }} args
 */
export async function getRegionInfo({ query }) {
  const provinces = (await fetchJson(`${BASE}/provinces.json`)).data

  const provinceMatch = findByName(provinces, query)
  if (provinceMatch) {
    return {
      code: provinceMatch.code,
      name: provinceMatch.name,
      level: 'provinsi',
      breadcrumb: [provinceMatch.name],
    }
  }

  // Not a province name - search regencies across all provinces.
  // This is the expensive path (one request per province) but only runs
  // when the direct province match misses, which is the common case for
  // city/regency-level questions.
  for (const province of provinces) {
    const regencies = (await fetchJson(`${BASE}/regencies/${province.code}.json`)).data
    const regencyMatch = findByName(regencies, query)
    if (regencyMatch) {
      const districts = (await fetchJson(`${BASE}/districts/${regencyMatch.code}.json`)).data
      const districtMatch = findByName(districts, query)
      if (districtMatch) {
        return {
          code: districtMatch.code,
          name: districtMatch.name,
          level: 'kecamatan',
          breadcrumb: [province.name, regencyMatch.name, districtMatch.name],
        }
      }
      return {
        code: regencyMatch.code,
        name: regencyMatch.name,
        level: 'kabupaten/kota',
        breadcrumb: [province.name, regencyMatch.name],
      }
    }
  }

  throw new Error(`Wilayah "${query}" tidak ditemukan`)
}
