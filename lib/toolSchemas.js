// Anthropic tool-use schemas. Kept separate from the implementations in
// ./tools so the same definitions could also seed an MCP server later
// (an MCP tool's inputSchema is the same JSON Schema shape).

export const toolSchemas = [
  {
    name: 'get_region_info',
    description:
      'Cari kode wilayah administratif Indonesia (provinsi, kabupaten/kota, atau kecamatan) berdasarkan nama. Panggil ini dulu sebelum get_weather kalau user cuma sebut nama kota.',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Nama wilayah, contoh "Bandung" atau "Kemayoran"' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_weather',
    description: 'Ambil prakiraan cuaca 3 hari ke depan dari BMKG untuk kode wilayah tertentu.',
    input_schema: {
      type: 'object',
      properties: {
        region_code: {
          type: 'string',
          description: 'Kode wilayah level 4 (adm4) dari get_region_info, contoh 31.71.03.1001',
        },
      },
      required: ['region_code'],
    },
  },
  {
    name: 'get_earthquake_latest',
    description: 'Ambil informasi gempa bumi paling baru dari BMKG.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'get_earthquake_list',
    description: 'Ambil daftar hingga 15 gempa bumi terkini dengan magnitudo 5.0 ke atas dari BMKG.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'get_exchange_rate',
    description: 'Ambil kurs referensi JISDOR terbaru dari Bank Indonesia untuk satu mata uang asing.',
    input_schema: {
      type: 'object',
      properties: {
        currency_code: { type: 'string', description: 'Kode mata uang 3 huruf, contoh USD, JPY, SGD' },
      },
      required: ['currency_code'],
    },
  },
  {
    name: 'get_statistic',
    description: 'Ambil data statistik resmi dari BPS untuk wilayah dan variabel tertentu.',
    input_schema: {
      type: 'object',
      properties: {
        domain_code: { type: 'string', description: 'Kode wilayah BPS, contoh 3200 untuk Jawa Barat' },
        var_id: { type: 'string', description: 'ID variabel statistik dari katalog BPS' },
      },
      required: ['domain_code', 'var_id'],
    },
  },
]
