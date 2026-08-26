export const toolSchemas = [
  {
    name: 'get_region_info',
    description:
      'Cari kode wilayah administratif Indonesia (provinsi, kabupaten/kota, atau kecamatan) berdasarkan nama. Panggil ini dulu sebelum get_weather kalau user cuma sebut nama kota. Hasilnya punya field level/name yang mengikuti level yang ditanya user (jangan diubah jadi level lain saat menjawab), dan field weather_code terpisah (selalu level desa/adm4) khusus untuk dikirim ke get_weather.',
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
          description:
            'Kode wilayah level 4 (adm4) dari get_region_info - pakai field weather_code-nya, BUKAN field code. Contoh 31.71.03.1001',
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
  {
    name: 'get_air_quality',
    description:
      'Ambil indeks kualitas udara (AQI, skala US EPA) real-time dari IQAir untuk satu kota di Indonesia.',
    input_schema: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'Nama kota dalam bahasa Inggris, contoh "Jakarta", "Surabaya"' },
        province: {
          type: 'string',
          description: 'Nama provinsi dalam bahasa Inggris, contoh "Jakarta", "East Java", "West Java"',
        },
      },
      required: ['city', 'province'],
    },
  },
]
