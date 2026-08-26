import { XMLParser } from 'fast-xml-parser'

const SOAP_URL = 'https://www.bi.go.id/biwebservice/wskursbi.asmx'

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
})

function buildEnvelope(operation, paramsXml = '') {
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${operation} xmlns="http://tempuri.org/">${paramsXml}</${operation}>
  </soap:Body>
</soap:Envelope>`
}

async function callSoap(operation, paramsXml = '') {
  const res = await fetch(SOAP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: `http://tempuri.org/${operation}`,
    },
    body: buildEnvelope(operation, paramsXml),
  })

  if (!res.ok) throw new Error(`BI SOAP request failed: ${res.status}`)
  const xml = await res.text()
  return parser.parse(xml)
}

const FIELD_ALIASES = {
  currency: ['mts_uang', 'currency', 'kd_valas', 'nama_uang'],
  buy: ['jual', 'kurs_jual', 'buy'],
  sell: ['beli', 'kurs_beli', 'sell', 'nilai'],
  date: ['tanggal', 'tgl_kurs', 'date'],
}

function pickField(row, aliases) {
  for (const key of aliases) {
    if (row?.[key] != null) return row[key]
  }
  return null
}

function parseDiffgramRows(parsed, resultKey) {
  const result = parsed?.Envelope?.Body?.[`${resultKey}Response`]?.[`${resultKey}Result`]
  const diffgram = result?.diffgram
  const root = diffgram?.DocumentElement ?? diffgram?.NewDataSet ?? {}
  const tables = root?.Table
  if (!tables) return []
  return Array.isArray(tables) ? tables : [tables]
}

export async function getExchangeRate({ currency_code }) {
  const parsed = await callSoap('getSubKursJisdor1')
  const rows = parseDiffgramRows(parsed, 'getSubKursJisdor1')

  const needle = currency_code.toUpperCase()
  const row = rows.find((r) => pickField(r, FIELD_ALIASES.currency)?.toString().toUpperCase().includes(needle))

  if (!row) {
    throw new Error(
      `Kurs untuk ${currency_code} tidak ditemukan pada respons terbaru. Cek struktur field di lib/tools/biKurs.js jika ini terus terjadi.`
    )
  }

  return {
    currency: currency_code.toUpperCase(),
    buy: pickField(row, FIELD_ALIASES.buy),
    sell: pickField(row, FIELD_ALIASES.sell),
    date: pickField(row, FIELD_ALIASES.date),
    source: 'JISDOR',
  }
}
