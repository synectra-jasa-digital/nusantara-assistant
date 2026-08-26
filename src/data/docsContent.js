// Static documentation content. Kept in Indonesian for now - the header
// chrome (nav, buttons) is bilingual via i18n, translating this much body
// copy is a good follow-up once the content itself stabilizes.

export const docsSections = [
  {
    id: 'pengenalan',
    group: 'Mulai',
    title: 'Pengenalan',
    badge: null,
    body: [
      'Data Nusantara Assistant adalah asisten chat AI yang menjawab pertanyaan seputar empat sumber data publik Indonesia: cuaca dan gempa dari BMKG, kurs referensi dari Bank Indonesia, data wilayah administratif, dan statistik dari BPS.',
      'Di balik chat interface ini, setiap jawaban dihasilkan lewat pemanggilan tool (function calling) ke API resmi masing-masing lembaga. Model tidak pernah mengarang angka, semua angka datang langsung dari sumbernya.',
    ],
  },
  {
    id: 'instalasi',
    group: 'Mulai',
    title: 'Instalasi',
    badge: null,
    body: ['Clone repo ini, install dependency, lalu salin file environment.'],
    code: `git clone <repo-url>
cd nusantara-data-assistant
npm install
cp .env.example .env
# isi GROQ_API_KEY dan BPS_API_KEY di .env
npm run dev`,
  },
  {
    id: 'konfigurasi',
    group: 'Mulai',
    title: 'Konfigurasi MCP',
    badge: null,
    body: [
      'Fungsi di folder lib/tools juga bisa dipakai ulang sebagai MCP server terpisah, bukan cuma lewat endpoint chat ini. Bungkus tiap fungsi sebagai satu MCP tool dengan @modelcontextprotocol/sdk supaya bisa dipanggil langsung dari Claude Desktop atau Claude Code.',
    ],
    code: `{
  "mcpServers": {
    "data-nusantara": {
      "command": "node",
      "args": ["./mcp-server/index.js"]
    }
  }
}`,
  },
  {
    id: 'tool-wilayah',
    group: 'Tools',
    title: 'get_region_info',
    badge: null,
    body: [
      'Mencari kode wilayah administratif berdasarkan nama. Hasil tool ini biasanya jadi input untuk get_weather, karena BMKG butuh kode wilayah, bukan nama kota.',
    ],
    params: [
      { name: 'query', type: 'string', desc: 'Nama wilayah, contoh "Kota Bandung" atau "Kemayoran"' },
    ],
    response: `{
  "code": "31.71.03.1001",
  "name": "Kemayoran",
  "level": "kelurahan",
  "breadcrumb": ["DKI Jakarta", "Jakarta Pusat", "Kemayoran"]
}`,
  },
  {
    id: 'tool-weather',
    group: 'Tools',
    title: 'get_weather',
    badge: null,
    body: ['Mengambil prakiraan cuaca 3 hari ke depan untuk kode wilayah tertentu, langsung dari BMKG.'],
    params: [
      { name: 'region_code', type: 'string', desc: 'Kode wilayah level 4 (adm4), contoh 31.71.03.1001' },
    ],
    response: `{
  "location": "Kemayoran, Jakarta Pusat",
  "datetime": "2026-08-26T15:00:00+07:00",
  "weather_desc": "Berawan",
  "temperature": 31,
  "humidity": 68,
  "wind_speed": 12
}`,
  },
  {
    id: 'tool-earthquake',
    group: 'Tools',
    title: 'get_earthquake_latest / get_earthquake_list',
    badge: null,
    body: [
      'get_earthquake_latest mengambil satu gempa paling baru. get_earthquake_list mengambil daftar hingga 15 gempa magnitudo 5.0 ke atas.',
    ],
    response: `{
  "Tanggal": "26 Agu 2026",
  "Jam": "14:32:10 WIB",
  "Magnitude": "5.4",
  "Kedalaman": "10 km",
  "Wilayah": "92 km BaratDaya Bengkulu",
  "Potensi": "Tidak berpotensi tsunami"
}`,
  },
  {
    id: 'tool-kurs',
    group: 'Tools',
    title: 'get_exchange_rate',
    badge: 'SOAP',
    body: [
      'Mengambil kurs referensi terbaru dari layanan wsKursBI Bank Indonesia. Layanan aslinya SOAP/XML, fungsi ini membungkusnya jadi JSON biasa.',
      'Catatan: field nama mata uang dan nilai pada respons SOAP mentah belum didokumentasikan lengkap oleh BI. Sesuaikan parser di lib/tools/biKurs.js dengan struktur XML asli setelah tes langsung.',
    ],
    params: [
      { name: 'currency_code', type: 'string', desc: 'Kode mata uang 3 huruf, contoh USD, JPY, SGD' },
    ],
    response: `{
  "currency": "USD",
  "buy": 15750,
  "sell": 15800,
  "date": "2026-08-26",
  "source": "JISDOR"
}`,
  },
  {
    id: 'tool-statistik',
    group: 'Tools',
    title: 'get_statistic',
    badge: 'Butuh API Key',
    body: [
      'Mengambil data statistik dari BPS WebAPI berdasarkan kode domain wilayah dan kode variabel. Butuh BPS_API_KEY, daftar gratis di webapi.bps.go.id/developer.',
    ],
    params: [
      { name: 'domain_code', type: 'string', desc: 'Kode wilayah BPS, contoh 3200 untuk Jawa Barat' },
      { name: 'var_id', type: 'string', desc: 'ID variabel statistik, lihat katalog BPS' },
    ],
    response: `{
  "indicator": "Jumlah Penduduk",
  "value": "48,782,700",
  "unit": "jiwa",
  "period": "2025",
  "region": "Jawa Barat"
}`,
  },
  {
    id: 'deploy',
    group: 'Deploy',
    title: 'Deploy ke Vercel',
    badge: null,
    body: [
      'Push repo ke GitHub, import project di Vercel, lalu set DASHSCOPE_API_KEY dan BPS_API_KEY di Project Settings > Environment Variables. Folder /api otomatis dijalankan sebagai serverless function, tidak perlu konfigurasi tambahan.',
      'Penting: beberapa situs pemerintah Indonesia memblokir IP datacenter (termasuk milik penyedia cloud besar). Kalau ada tool yang gagal fetch setelah deploy padahal jalan normal di lokal, ini kemungkinan besar penyebabnya. Lihat bagian Catatan Penting di README untuk opsi mitigasinya.',
    ],
  },
  {
    id: 'faq',
    group: 'Bantuan',
    title: 'FAQ',
    badge: null,
    body: [
      'Kenapa jawaban kurs kadang kosong? Layanan SOAP BI kadang lambat atau field respons berbeda dari dugaan awal, cek log function di Vercel untuk detail errornya.',
      'Apakah butuh database? Tidak. Semua tool ini stateless, hasil chat cukup disimpan di state React sisi browser.',
    ],
  },
]
