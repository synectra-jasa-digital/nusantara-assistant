import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../data/wilayah')

function parseCsv(file) {
  const text = readFileSync(path.join(DATA_DIR, file), 'utf-8')
  return text
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map((line) => line.trim().split(';').map((cell) => cell.replace(/^"|"$/g, '')))
}

function formatCode(id) {
  return [id.slice(0, 2), id.slice(2, 4), id.slice(4, 6), id.slice(6, 10)].filter(Boolean).join('.')
}

function toTitleCase(name) {
  return name
    .replace(/^kab\.\s+/i, 'kabupaten ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function groupBy(items, key) {
  const map = new Map()
  for (const item of items) {
    if (!map.has(item[key])) map.set(item[key], [])
    map.get(item[key]).push(item)
  }
  return map
}

const provinces = parseCsv('provinces.csv').map(([id, name]) => ({
  id,
  code: formatCode(id),
  name: toTitleCase(name),
}))

const regencies = parseCsv('regencies.csv').map(([id, provinceId, name]) => ({
  id,
  provinceId,
  code: formatCode(id),
  name: toTitleCase(name),
}))

const districts = parseCsv('districts.csv').map(([id, regencyId, name]) => ({
  id,
  regencyId,
  code: formatCode(id),
  name,
}))

const villages = parseCsv('villages.csv').map(([id, districtId, name]) => ({
  id,
  districtId,
  code: formatCode(id),
  name,
}))

const districtsByRegency = groupBy(districts, 'regencyId')
const villagesByDistrict = groupBy(villages, 'districtId')

function stripAdminPrefix(name) {
  return name.replace(/^(kota|kabupaten)\s+/i, '')
}

function findExact(items, name) {
  const needle = name.toLowerCase()
  return items.find((i) => i.name.toLowerCase() === needle) ?? null
}

function findExactStripped(items, name) {
  const needle = name.toLowerCase()
  return items.find((i) => stripAdminPrefix(i.name).toLowerCase() === needle) ?? null
}

function findSubstring(items, name) {
  const needle = name.toLowerCase()
  return items.find((i) => i.name.toLowerCase().includes(needle)) ?? null
}

function resolveFromDistrict(province, regency, district, query) {
  const villagesHere = villagesByDistrict.get(district.id) ?? []
  const villageMatch = findExact(villagesHere, query)

  if (!villageMatch) {
    return {
      code: district.code,
      name: district.name,
      level: 'kecamatan',
      breadcrumb: [province.name, regency.name, district.name],
      weather_code: villagesHere[0]?.code ?? null,
    }
  }

  return {
    code: villageMatch.code,
    name: villageMatch.name,
    level: 'kelurahan/desa',
    breadcrumb: [province.name, regency.name, district.name, villageMatch.name],
    weather_code: villageMatch.code,
  }
}

export async function getRegionInfo({ query }) {
  const provinceMatch = findExact(provinces, query) ?? findSubstring(provinces, query)
  if (provinceMatch) {
    return {
      code: provinceMatch.code,
      name: provinceMatch.name,
      level: 'provinsi',
      breadcrumb: [provinceMatch.name],
    }
  }

  const regencyMatch = findExactStripped(regencies, query) ?? findSubstring(regencies, query)
  if (regencyMatch) {
    const province = provinces.find((p) => p.id === regencyMatch.provinceId)
    const districtsHere = districtsByRegency.get(regencyMatch.id) ?? []
    const districtMatch = findExact(districtsHere, query)

    if (!districtMatch) {
      const repDistrict = districtsHere[0]
      const repVillages = repDistrict ? villagesByDistrict.get(repDistrict.id) ?? [] : []
      return {
        code: regencyMatch.code,
        name: regencyMatch.name,
        level: 'kabupaten/kota',
        breadcrumb: [province.name, regencyMatch.name],
        weather_code: repVillages[0]?.code ?? null,
      }
    }

    return resolveFromDistrict(province, regencyMatch, districtMatch, query)
  }

  const districtMatch = findExact(districts, query) ?? findSubstring(districts, query)
  if (!districtMatch) throw new Error(`Wilayah "${query}" tidak ditemukan`)

  const regency = regencies.find((r) => r.id === districtMatch.regencyId)
  const province = provinces.find((p) => p.id === regency.provinceId)
  return resolveFromDistrict(province, regency, districtMatch, query)
}
