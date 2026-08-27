import { toolSchemas } from '../lib/toolSchemas.js'
import { runTool } from '../lib/toolDispatcher.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { tool, input } = req.body ?? {}
  if (!toolSchemas.some((t) => t.name === tool)) {
    res.status(400).json({ error: `Tool tidak dikenal: ${tool}` })
    return
  }

  const { result, card } = await runTool(tool, input ?? {})
  res.status(200).json({ result, card })
}
