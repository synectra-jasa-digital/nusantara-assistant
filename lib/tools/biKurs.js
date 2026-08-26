// Bank Indonesia wsKursBI - legacy SOAP/XML web service, not REST/JSON.
// WSDL: https://www.bi.go.id/biwebservice/wskursbi.asmx?wsdl
//
// Confirmed from BI's own operation pages:
//   - getSubKursJisdor1 takes no parameters, returns the latest ~14 JISDOR
//     reference rate records.
//   - The result comes back as an ADO.NET DataSet (an <xsd:schema> plus a
//     <diffgr:diffgram> block) embedded inside the SOAP response, which is
//     typical for older ASMX services and different from a plain REST JSON
//     body.
//
// BI's documentation does NOT publish the exact row field names inside the
// diffgram, so `parseDiffgramRows` below tries several likely aliases
// (mts_uang/kurs_jual/kurs_beli and similar). Log a raw response once and
// adjust FIELD_ALIASES to match if BI's actual field names differ.
import { XMLParser } from 'fast-xml-parser'

const SOAP_URL = 'https://www.bi.go.id/biwebservice/wskursbi.asmx'

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true, // strips soap:, diffgr:, xsd: prefixes for easier access
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
  // BPS/BI-style DataSet XML usually nests rows under an arbitrary root
  // (often DocumentElement or NewDataSet) with repeating <Table> children.
  const root = diffgram?.DocumentElement ?? diffgram?.NewDataSet ?? {}
  const tables = root?.Table
  if (!tables) return []
  return Array.isArray(tables) ? tables : [tables]
}

/**
 * Latest JISDOR reference rate for one currency.
 * @param {{ currency_code: string }} args
 */
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
