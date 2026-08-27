import translate from 'google-translate-api-x'
import { clientIp, isRateLimited } from '../lib/rateLimit.js'

const MAX_TEXTS = 20
const MAX_TEXT_LENGTH = 2000

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (isRateLimited(clientIp(req))) {
    res.status(429).json({ error: 'Terlalu banyak permintaan, coba lagi sebentar.' })
    return
  }

  const { texts } = req.body ?? {}
  if (!Array.isArray(texts) || texts.length === 0) {
    res.status(400).json({ error: '"texts" wajib diisi sebagai array.' })
    return
  }
  if (texts.length > MAX_TEXTS || texts.some((t) => typeof t !== 'string' || t.length > MAX_TEXT_LENGTH)) {
    res.status(400).json({ error: `Maks ${MAX_TEXTS} teks, masing-masing maks ${MAX_TEXT_LENGTH} karakter.` })
    return
  }

  try {
    const results = await translate(texts, { from: 'id', to: 'en' })
    const translated = (Array.isArray(results) ? results : [results]).map((r) => r.text)
    res.status(200).json({ translated })
  } catch (err) {
    console.error('translate handler error:', err)
    res.status(500).json({ error: 'Terjadi kesalahan saat menerjemahkan.' })
  }
}
