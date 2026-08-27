import { toolSchemas } from '../lib/toolSchemas.js'
import { runTool } from '../lib/toolDispatcher.js'

const SYSTEM_PROMPT = `Kamu adalah asisten yang menjawab pertanyaan seputar data publik Indonesia: cuaca dan gempa BMKG, kurs referensi Bank Indonesia, wilayah administratif, statistik BPS, dan kualitas udara.
Selalu pakai tool yang tersedia untuk mengambil data nyata, jangan pernah mengarang angka.

Cuaca: kalau user cuma sebut nama kota untuk pertanyaan cuaca, panggil get_region_info TEPAT SATU KALI dengan nama itu untuk dapat kode wilayahnya, lalu langsung panggil get_weather dengan field weather_code dari hasilnya (bukan field code). Jangan panggil get_region_info lagi setelah itu.

Wilayah administratif: get_region_info juga bisa dipanggil langsung kalau user memang tanya soal wilayahnya sendiri (bukan cuma buat cuaca), dari level provinsi sampai kecamatan. Saat menjawab, sebut nama & level wilayah persis sesuai yang ditanya user (pakai field name/level dari hasilnya) - kalau user tanya soal kota, jawab level kota, jangan turun ke level kecamatan/desa; kalau user tanya soal kecamatan, baru jawab level kecamatan. Nama desa/kelurahan dari field weather_code itu cuma titik acuan teknis buat ambil data cuaca, jangan disebut kalau user tidak menanyakannya.

Kurs Bank Indonesia: get_exchange_rate butuh kode mata uang 3 huruf (ISO 4217), SATU kode per panggilan - jangan pernah gabung beberapa kode jadi satu string (mis. "USD,JPY"), itu tidak akan ketemu. Kalau user tanya beberapa mata uang sekaligus, panggil tool ini berkali-kali, sekali per mata uang. Terjemahkan sendiri nama umum ke kodenya sebelum manggil tool - dolar AS/dolar→USD, yen Jepang→JPY, euro→EUR, dolar Singapura→SGD, dolar Australia→AUD, ringgit Malaysia→MYR, yuan/renminbi→CNY, poundsterling→GBP, won Korea→KRW, dan seterusnya. Kalau user cuma bilang "dolar" tanpa negara, asumsikan USD.

Statistik BPS: get_statistic butuh domain_code (kode wilayah versi BPS) dan var_id (ID variabel dari katalog BPS). Kalau butuh domain_code untuk suatu wilayah, panggil get_region_info dulu lalu hilangkan tanda titik dari field code-nya (mis. wilayah code "32.73" jadi domain_code "3273"); untuk level provinsi tambahkan "00" di belakang (mis. "32" jadi domain_code "3200"). var_id tidak bisa diturunkan dari wilayah - kalau kamu tidak yakin var_id yang tepat untuk variabel yang ditanya, jangan menebak: bilang terus terang ke user kamu tidak punya ID variabel itu di katalog BPS, jangan panggil get_statistic dengan var_id sembarangan.

Kualitas udara: get_air_quality butuh nama city dan province dalam bahasa Inggris (data dari IQAir). Terjemahkan nama kota/provinsi Indonesia ke bahasa Inggris sendiri sebelum manggil tool, contoh: Jakarta Pusat→city "Jakarta", province "Jakarta"; Surabaya→city "Surabaya", province "East Java"; Bandung→city "Bandung", province "West Java". Angka AQI pakai skala US EPA (0-50 baik, 51-150 sedang, di atas 150 berbahaya bagi kesehatan).

Perbandingan atau permintaan berganda: kalau user minta bandingkan cuaca, statistik, atau kualitas udara antara 2+ wilayah, atau minta beberapa kurs/wilayah/data sekaligus dalam satu pertanyaan, panggil tool yang relevan berkali-kali secara berurutan (satu panggilan per item, jangan digabung jadi satu argumen), baru jawab dengan ringkasannya.

Jawab singkat, jelas, ramah, dan terasa hidup seperti ngobrol - boleh tutup dengan tawaran follow-up yang relevan (mis. "mau cek prakiraan besok juga?"), dalam bahasa yang sama dengan pertanyaan user.`

const SELF_CHECK_PROMPT = `Cek ulang balasanmu barusan terhadap hasil tool yang sudah kamu dapat di percakapan ini. Kalau ada angka, nama wilayah/level, atau fakta yang meleset dari data tool, atau kamu menyebut sesuatu yang tidak ada di data tool, revisi balasannya sekarang. Kalau sudah akurat, tulis ulang balasan yang sama persis. Jangan panggil tool lagi, jawab teks saja.`

const MAX_TOOL_ROUNDS = 6
const GROQ_BASE_URL = 'https://api.groq.com/openai/v1'
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'

const openAiTools = toolSchemas.map((tool) => ({
  type: 'function',
  function: { name: tool.name, description: tool.description, parameters: tool.input_schema },
}))

async function callGroq(apiKey, conversation, { withTools } = {}) {
  const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: conversation,
      ...(withTools ? { tools: openAiTools } : {}),
    }),
  })

  if (!response.ok) {
    throw new Error(`Groq request failed: ${response.status} ${await response.text()}`)
  }

  return response.json()
}

async function streamGroqText(apiKey, conversation, onDelta) {
  const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: GROQ_MODEL, messages: conversation, stream: true }),
  })

  if (!response.ok) {
    throw new Error(`Groq request failed: ${response.status} ${await response.text()}`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let full = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const parts = buffer.split('\n\n')
    buffer = parts.pop()

    for (const part of parts) {
      const trimmed = part.trim()
      if (!trimmed.startsWith('data:')) continue
      const payload = trimmed.slice(5).trim()
      if (!payload || payload === '[DONE]') continue
      const json = JSON.parse(payload)
      const delta = json.choices?.[0]?.delta?.content
      if (delta) {
        full += delta
        onDelta(delta)
      }
    }
  }

  return full
}

function fakeStream(text, onDelta) {
  return new Promise((resolve) => {
    if (!text) {
      resolve()
      return
    }
    const chunkSize = 4
    let i = 0
    const interval = setInterval(() => {
      onDelta(text.slice(i, i + chunkSize))
      i += chunkSize
      if (i >= text.length) {
        clearInterval(interval)
        resolve()
      }
    }, 12)
  })
}

function buildComparisonCharts(cards) {
  const charts = []

  const weatherCards = cards.filter((c) => c.type === 'weather')
  if (weatherCards.length >= 2) {
    charts.push({
      type: 'chart',
      data: {
        title: 'Perbandingan Suhu',
        unit: '°C',
        series: weatherCards.map((c) => ({ label: c.data.city || c.data.location || '-', value: c.data.temperature })),
      },
    })
  }

  const statistikCards = cards.filter((c) => c.type === 'statistik')
  if (statistikCards.length >= 2) {
    charts.push({
      type: 'chart',
      data: {
        title: statistikCards[0]?.data?.indicator || 'Perbandingan Statistik',
        unit: statistikCards[0]?.data?.unit || '',
        series: statistikCards.map((c) => ({ label: c.data.region || '-', value: Number(c.data.value) })),
      },
    })
  }

  const aqiCards = cards.filter((c) => c.type === 'aqi')
  if (aqiCards.length >= 2) {
    charts.push({
      type: 'chart',
      data: {
        title: 'Perbandingan Kualitas Udara (AQI)',
        unit: '',
        series: aqiCards.map((c) => ({ label: c.data.city || '-', value: c.data.aqi })),
      },
    })
  }

  return charts
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'GROQ_API_KEY belum diset di environment variables.' })
    return
  }

  const { messages } = req.body ?? {}
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: '"messages" wajib diisi sebagai array.' })
    return
  }

  const conversation = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages]
  const cards = []

  try {
    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const data = await callGroq(apiKey, conversation, { withTools: true })
      const message = data.choices[0].message
      const toolCalls = message.tool_calls ?? []

      if (toolCalls.length === 0) {
        const draftReply = message.content ?? ''
        const allCards = [...cards, ...buildComparisonCharts(cards)]

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        })

        const send = (delta) => res.write(`data: ${JSON.stringify({ delta })}\n\n`)

        let finalReply = draftReply
        if (draftReply && cards.length > 0) {
          const checkConversation = [
            ...conversation,
            { role: 'assistant', content: draftReply },
            { role: 'user', content: SELF_CHECK_PROMPT },
          ]
          finalReply = await streamGroqText(apiKey, checkConversation, send)
        } else {
          await fakeStream(draftReply, send)
        }

        res.write(`data: ${JSON.stringify({ done: true, cards: allCards, reply: finalReply })}\n\n`)
        res.end()
        return
      }

      conversation.push({ role: 'assistant', content: message.content ?? null, tool_calls: toolCalls })

      for (const call of toolCalls) {
        const args = JSON.parse(call.function.arguments || '{}')
        const { result, card } = await runTool(call.function.name, args)
        if (card) cards.push(card)
        conversation.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(result) })
      }
    }

    res.status(200).json({
      reply: 'Maaf, butuh terlalu banyak langkah untuk menjawab ini. Coba pertanyaan yang lebih spesifik.',
      cards,
    })
  } catch (err) {
    console.error('chat handler error:', err)
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: 'Terjadi kesalahan di server.' })}\n\n`)
      res.end()
    } else {
      res.status(500).json({ error: 'Terjadi kesalahan di server.' })
    }
  }
}
