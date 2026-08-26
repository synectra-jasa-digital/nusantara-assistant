import translate from 'google-translate-api-x'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { texts } = req.body ?? {}
  if (!Array.isArray(texts) || texts.length === 0) {
    res.status(400).json({ error: '"texts" wajib diisi sebagai array.' })
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
