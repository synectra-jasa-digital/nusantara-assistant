import { getRegionInfo } from './tools/wilayah.js'
import { getWeather } from './tools/bmkgWeather.js'
import { getEarthquakeLatest, getEarthquakeList } from './tools/bmkgEarthquake.js'
import { getExchangeRate } from './tools/biKurs.js'
import { getStatistic } from './tools/bpsStatistik.js'

// Maps a tool name (as declared in toolSchemas.js) to its implementation,
// and to the card type the frontend should render for its result.
const HANDLERS = {
  get_region_info: { run: getRegionInfo, cardType: 'wilayah' },
  get_weather: { run: getWeather, cardType: 'weather' },
  get_earthquake_latest: { run: () => getEarthquakeLatest(), cardType: 'earthquake' },
  get_earthquake_list: { run: () => getEarthquakeList(), cardType: null }, // list result, no single card
  get_exchange_rate: { run: getExchangeRate, cardType: 'kurs' },
  get_statistic: { run: getStatistic, cardType: 'statistik' },
}

/**
 * Executes a tool call requested by Claude.
 * @param {string} name
 * @param {object} input
 * @returns {Promise<{ result: any, card: { type: string, data: any } | null }>}
 */
export async function runTool(name, input) {
  const handler = HANDLERS[name]
  if (!handler) {
    return { result: { error: `Tool tidak dikenal: ${name}` }, card: null }
  }

  try {
    const result = await handler.run(input)
    const card = handler.cardType ? { type: handler.cardType, data: result } : null
    return { result, card }
  } catch (err) {
    return { result: { error: err.message }, card: null }
  }
}
