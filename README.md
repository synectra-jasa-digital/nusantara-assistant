# Data Nusantara Assistant

Asisten chat AI untuk empat sumber data publik Indonesia: cuaca dan gempa
BMKG, kurs referensi Bank Indonesia, wilayah administratif, dan statistik
BPS. React (Vite) di frontend, serverless function di Vercel untuk
tool-calling ke GPT-OSS (via Groq), tanpa database.

## Arsitektur singkat

```
src/            frontend React (Beranda, Chat, Dokumentasi)
api/chat.js     endpoint serverless - jalankan tool-use loop
mcp-server/     server MCP (stdio) - expose lib/tools/* yang sama ke Claude Desktop/Code
lib/tools/      implementasi tiap sumber data (fetch murni, stateless)
lib/toolSchemas.js   definisi tool (dipakai ulang untuk pemanggilan model & MCP)
lib/toolDispatcher.js   pemetaan nama tool -> fungsi + jenis kartu UI
```

`lib/tools/*` sengaja dipisah dari `api/chat.js` supaya bisa dipakai ulang
sebagai MCP server terpisah (`mcp-server/index.js`) - lihat halaman
Dokumentasi > Konfigurasi MCP di aplikasi untuk config client-nya.

```bash
npm run mcp   # jalankan MCP server lewat stdio
```

### Publish `@nusantara/mcp-server` ke npm

`mcp-server/index.js` mengimport `../lib/*` (di luar folder `mcp-server/`),
jadi tidak bisa langsung di-publish apa adanya - `scripts/build-mcp-package.sh`
menyalin `lib/toolSchemas.js`, `lib/toolDispatcher.js`, `lib/tools/*`, dan
`lib/data/wilayah/*.csv` ke `mcp-server/dist-npm/` (sudah di-gitignore) dengan
import path yang disesuaikan, supaya hasilnya jadi package berdiri sendiri.
Sudah diverifikasi jalan standalone (node_modules terisolasi, terpisah dari
monorepo ini).

```bash
npm login                          # sekali saja, butuh akun npm & akses scope @nusantara
bash scripts/build-mcp-package.sh
cd mcp-server/dist-npm
npm publish --access public
```

Naikkan versi di `mcp-server/package.json` sebelum publish ulang.

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env
# isi GROQ_API_KEY dan BPS_API_KEY

npx vercel dev   # jalankan api/ + frontend sekaligus di port 3000
# atau, kalau cuma mau kerja di UI tanpa backend:
npm run dev
```

## Environment variables

| Variabel            | Wajib | Keterangan                                                        |
| -------------------- | ----- | ------------------------------------------------------------------ |
| `GROQ_API_KEY`  | Ya    | Dipakai `api/chat.js` untuk memanggil GPT-OSS lewat Groq |
| `GROQ_MODEL`         | Tidak | Default `openai/gpt-oss-120b` kalau tidak diisi                   |
| `BPS_API_KEY`        | Untuk tool statistik | Daftar gratis di https://webapi.bps.go.id/developer/ |
| `IQAIR_API_KEY`      | Untuk tool kualitas udara | Daftar gratis (tier Community) di https://dashboard.iqair.com/ |

BMKG dan endpoint kurs JISDOR Bank Indonesia tidak butuh API key. Data
wilayah administratif (`lib/tools/wilayah.js`) dibundel lokal sebagai CSV
(`lib/data/wilayah/`, sumber: Permendagri 72/2019 via
github.com/guzfirdaus/Wilayah-Administrasi-Indonesia) - tidak ada
network call sama sekali, jadi tidak butuh key dan tidak kena rate limit.

## Deploy ke Vercel

1. Push repo ini ke GitHub.
2. Import project di Vercel, framework preset otomatis terdeteksi sebagai Vite.
3. Set `GROQ_API_KEY` dan `BPS_API_KEY` di Project Settings → Environment Variables.
4. Deploy. Folder `/api` otomatis jadi serverless function, tidak perlu konfigurasi tambahan.

## Catatan penting sebelum demo ke orang lain

**Situs pemerintah Indonesia kadang memblokir IP datacenter.** Beberapa
API di proyek ini (terutama BPS, kemungkinan juga BMKG dan BI) diketahui
memblokir permintaan dari IP milik penyedia cloud besar seperti AWS/GCP,
yang mana Vercel serverless function berjalan di atasnya. Ini bukan
asumsi, sudah terverifikasi langsung: saat proyek ini disusun, panggilan
ke `data.bmkg.go.id/DataMKG/TEWS/autogempa.json` dari sandbox cloud (IP
datacenter) mengembalikan `403 Forbidden`, padahal endpoint dan
formatnya sudah benar sesuai dokumentasi resmi. Ini bisa membuat kode yang
jalan mulus di komputer lokal kamu (IP rumah/kampus) tiba-tiba gagal fetch
setelah di-deploy ke Vercel. (Data wilayah administratif sudah tidak
kena isu ini lagi sejak dipindah ke CSV lokal.)

Cara mengeceknya: buka Vercel dashboard → Deployments → pilih deployment →
Functions → lihat log `api/chat`. Kalau errornya berbentuk timeout atau
403 tanpa pesan jelas dari API tujuan, ini kemungkinan besar penyebabnya.

Kalau itu terjadi, beberapa opsi mitigasi:
- Jalankan ulang request itu, sebagian blokir sifatnya rate-limit sementara, bukan permanen.
- Pakai proxy (misalnya Cloudflare Worker kecil) sebagai perantara antara Vercel dan API pemerintah, supaya request keluar dari IP yang berbeda.
- Untuk demo penting (wawancara kerja, presentasi), tes dulu H-1 supaya ada waktu pindah ke opsi proxy kalau ternyata diblokir.

**Field respons SOAP Bank Indonesia (`lib/tools/biKurs.js`) belum
terverifikasi 100 persen.** BI tidak mempublikasikan nama field yang
tepat di dalam data gempa mereka gunakan format XML DataSet lama (diffgram),
jadi parser di file ini mencoba beberapa kemungkinan nama field umum.
Jalankan satu request nyata, log responsnya, dan sesuaikan
`FIELD_ALIASES` di file itu kalau hasilnya kosong atau salah.

**Belum ada database, dan memang sengaja begitu.** Riwayat chat cukup
hidup di state React browser. Kalau nanti mau tambah fitur akun atau
riwayat permanen, itu titik yang tepat untuk baru menambahkan database.

## Roadmap yang masuk akal

- ~~Bungkus `lib/tools` sebagai MCP server terpisah~~ - selesai, lihat `mcp-server/index.js`. Belum dipublish sebagai package npm terpisah.
- Terjemahkan isi `src/data/docsContent.js` ke bahasa Inggris (saat ini bilingual baru di UI chrome, isi dokumentasi masih bahasa Indonesia).
- Tambah streaming response di `/api/chat.js` supaya jawaban muncul kata demi kata.
