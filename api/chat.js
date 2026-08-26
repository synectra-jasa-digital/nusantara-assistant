// Vercel serverless function - POST /api/chat
// Runs a tool-use loop against GPT-OSS (via Groq's OpenAI-compatible
// endpoint): send the conversation + tool schemas, execute whichever tools
// the model asks for, feed results back, repeat until it returns a plain
// text answer. Non-streaming by design, to keep the tool-loop logic simple
// and easy to debug.
//
// No database: each request is stateless, the full conversation is sent
// by the client every time (see src/pages/Chat.jsx).
import { toolSchemas } from '../lib/toolSchemas.js'
import { runTool } from '../lib/toolDispatcher.js'

const SYSTEM_PROMPT = `Kamu adalah asisten yang menjawab pertanyaan seputar data publik Indonesia: cuaca dan gempa BMKG, kurs referensi Bank Indonesia, wilayah administratif, dan statistik BPS.
Selalu pakai tool yang tersedia untuk mengambil data nyata, jangan pernah mengarang angka.

Cuaca: kalau user cuma sebut nama kota untuk pertanyaan cuaca, panggil get_region_info TEPAT SATU KALI dengan nama itu untuk dapat kode wilayahnya, lalu langsung panggil get_weather dengan field weather_code dari hasilnya (bukan field code). Jangan panggil get_region_info lagi setelah itu.

Wilayah administratif: get_region_info juga bisa dipanggil langsung kalau user memang tanya soal wilayahnya sendiri (bukan cuma buat cuaca), dari level provinsi sampai kecamatan. Saat menjawab, sebut nama & level wilayah persis sesuai yang ditanya user (pakai field name/level dari hasilnya) - kalau user tanya soal kota, jawab level kota, jangan turun ke level kecamatan/desa; kalau user tanya soal kecamatan, baru jawab level kecamatan. Nama desa/kelurahan dari field weather_code itu cuma titik acuan teknis buat ambil data cuaca, jangan disebut kalau user tidak menanyakannya.

Kurs Bank Indonesia: get_exchange_rate butuh kode mata uang 3 huruf (ISO 4217). Terjemahkan sendiri nama umum ke kodenya sebelum manggil tool - dolar AS/dolar→USD, yen Jepang→JPY, euro→EUR, dolar Singapura→SGD, dolar Australia→AUD, ringgit Malaysia→MYR, yuan/renminbi→CNY, poundsterling→GBP, won Korea→KRW, dan seterusnya. Kalau user cuma bilang "dolar" tanpa negara, asumsikan USD.

Statistik BPS: get_statistic butuh domain_code (kode wilayah versi BPS) dan var_id (ID variabel dari katalog BPS). Kalau butuh domain_code untuk suatu wilayah, panggil get_region_info dulu lalu hilangkan tanda titik dari field code-nya (mis. wilayah code "32.73" jadi domain_code "3273"); untuk level provinsi tambahkan "00" di belakang (mis. "32" jadi domain_code "3200"). var_id tidak bisa diturunkan dari wilayah - kalau kamu tidak yakin var_id yang tepat untuk variabel yang ditanya, jangan menebak: bilang terus terang ke user kamu tidak punya ID variabel itu di katalog BPS, jangan panggil get_statistic dengan var_id sembarangan.

Jawab singkat, jelas, ramah, dan terasa hidup seperti ngobrol - boleh tutup dengan tawaran follow-up yang relevan (mis. "mau cek prakiraan besok juga?"), dalam bahasa yang sama dengan pertanyaan user.`

const MAX_TOOL_ROUNDS = 6
const GROQ_BASE_URL = 'https://api.groq.com/openai/v1'
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'

// toolSchemas is kept in the Anthropic/JSON-Schema shape (name, description,
// input_schema) since that's reused as-is for a future MCP server. Groq's
// endpoint speaks the OpenAI function-calling shape, so adapt it here at
// the edge.
const openAiTools = toolSchemas.map((tool) => ({
  type: 'function',
  function: { name: tool.name, description: tool.description, parameters: tool.input_schema },
}))

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
      const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: GROQ_MODEL, messages: conversation, tools: openAiTools }),
      })

      if (!response.ok) {
        throw new Error(`Groq request failed: ${response.status} ${await response.text()}`)
      }

      const data = await response.json()
      const message = data.choices[0].message
      const toolCalls = message.tool_calls ?? []

      if (toolCalls.length === 0) {
        res.status(200).json({ reply: message.content ?? '', cards })
        return
      }

      // Model wants to call one or more tools - run them, collect any
      // cards for the frontend, then continue the loop with the results.
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
    res.status(500).json({ error: 'Terjadi kesalahan di server.' })
  }
}
