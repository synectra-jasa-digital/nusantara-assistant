import { toolSchemas } from '../lib/toolSchemas.js'
import { runTool } from '../lib/toolDispatcher.js'
import { clientIp, isRateLimited } from '../lib/rateLimit.js'

const MAX_INPUT_VALUE_LENGTH = 200

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (isRateLimited(clientIp(req), 10)) {
    res.status(429).json({ error: 'Terlalu banyak permintaan, coba lagi sebentar.' })
    return
  }

  const { tool, input } = req.body ?? {}
  if (!toolSchemas.some((t) => t.name === tool)) {
    res.status(400).json({ error: `Tool tidak dikenal: ${tool}` })
    return
  }
  if (input && Object.values(input).some((v) => typeof v === 'string' && v.length > MAX_INPUT_VALUE_LENGTH)) {
    res.status(400).json({ error: `Setiap parameter maks ${MAX_INPUT_VALUE_LENGTH} karakter.` })
    return
  }

  const { result, card } = await runTool(tool, input ?? {})
  res.status(200).json({ result, card })
}
