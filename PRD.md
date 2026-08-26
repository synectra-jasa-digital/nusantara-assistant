# Product Requirement Document (PRD)
## Nusantara Assistant — Feature Expansion v2.0

**Versi Dokumen:** 2.0  
**Tanggal:** 27 Agustus 2026  
**Status:** Draf Usulan Fitur  
**Penulis:** Antigravity AI & Team Nusantara Assistant  

---

## 1. Ringkasan Eksekutif (Executive Summary)

**Nusantara Assistant** adalah aplikasi asisten AI interaktif yang mengintegrasikan data publik Indonesia dari berbagai lembaga resmi (BMKG, Bank Indonesia, BPS, dan Wilayah Administratif). 

Dokumen Persyaratan Produk (PRD) ini menjabarkan peta jalan peningkatan fitur v2.0 yang bertujuan memperluas cakupan data publik, meningkatkan pengalaman interaksi pengguna (*real-time AI response* dan *voice assistance*), memberikan visualisasi data yang kaya, serta memperkuat ekosistem pengembang (MCP & API Playground).

*(Catatan: Sesuai arahan, fitur riwayat obrolan/chat history dikecualikan dari cakupan rilis ini).*

---

## 2. Tujuan & Indikator Keberhasilan (Objectives & Success Metrics)

### 2.1 Tujuan Utama
1. **Memperluas Sumber Data Publik**: Menambahkan informasi yang sangat dibutuhkan masyarakat harian seperti harga pangan strategis dan kualitas udara.
2. **Meningkatkan Pengalaman Pengguna (UX)**: Mengurangi *perceived latency* menggunakan *streaming response* (kata-demi-kata) dan mendukung interaksi suara.
3. **Visualisasi Data Interaktif**: Menyajikan data statistik dan perbandingan dalam bentuk grafik visual yang mudah dipahami.
4. **Kemudahan Integrasi Pengembang**: Memudahkan pengembang pihak ketiga memakai MCP Server Nusantara Assistant secara langsung.

### 2.2 Indikator Keberhasilan (KPI)
- **Time-to-First-Token (TTFT)** untuk respon chat < 800ms menggunakan teknik *streaming response*.
- **Cakupan Data**: Berhasil mengintegrasikan minimal 2 sumber data publik baru tanpa memerlukan login/database.
- **Kemudahan Penggunaan Suara**: Akurasi pengenalan *Speech-to-Text* bahasa Indonesia > 90% pada peramban modern.

---

## 3. Cakupan Fitur (Feature Specifications)

### Fitur 1: Integrasi Data Harga Pangan Strategis (PIHPS) & Kualitas Udara (AQI)

#### 1.1 Deskripsi
Menambahkan 2 *Tool API* baru ke dalam mesin *tool-calling* Groq/GPT-OSS:
1. **Tool Harga Pangan (`tool_pihps_harga_pangan`)**: Mengambil data komoditas harian (Beras, Cabai Merah, Daging Ayam, Telur, Minyak Goreng) per provinsi/pasar.
2. **Tool Kualitas Udara (`tool_aqi_kualitas_udara`)**: Mengambil indeks standar pencemar udara (ISPU / AQI) per kota utama di Indonesia.

#### 1.2 Persyaratan Fungsional
- **Pengenalan Maksud (Intent Recognition)**: AI secara otomatis memilih `tool_pihps_harga_pangan` ketika pengguna bertanya *"Berapa harga cabai di Jawa Barat hari ini?"* atau `tool_aqi_kualitas_udara` saat bertanya *"Bagaimana kualitas udara Jakarta hari ini?"*.
- **Kartu UI Khusus (`PihpsCard` & `AqiCard`)**: Menampilkan ringkasan data dalam bentuk kartu visual yang rapi dengan indikator status warna (Hijau = Baik, Kuning = Sedang, Merah = Berbahaya).

---

### Fitur 2: Streaming Response AI (Real-Time Typewriter Effect)

#### 2.1 Deskripsi
Mengubah endpoint `/api/chat.js` dari pola *request-response synchronous* (menunggu penuh) menjadi *Server-Sent Events (SSE)* / *ReadableStream*.

#### 2.2 Persyaratan Fungsional
- Teks jawaban AI dirender secara bertahap (kata-demi-kata) ke layar pengguna begitu token pertama diterima dari Groq API.
- Apabila AI mengembalikan *tool call* (kartu data), kartu UI ditampilkan secara mulus setelah eksekusi fungsi data publik selesai.
- Tombol *"Stop Generation"* muncul di bilah input ketika AI sedang menghasilkan teks.

---

### Fitur 3: Visualisasi Data & Grafik Interaktif (Chart Component)

#### 3.1 Deskripsi
Menyediakan kartu komponen grafik interaktif (`StatistikChartCard`) menggunakan pustaka `Recharts` untuk permintaan yang melibatkan perbandingan data atau deret waktu (*time-series*).

#### 3.2 Persyaratan Fungsional
- **Perbandingan Wilayah**: Ketika pengguna meminta *"Bandingkan inflasi/cuaca antara Jakarta dan Surabaya"*, AI menghasilkan struktur kartu tipe `chart` berisi data perbandingan.
- **Fitur Interaktif**: Grafik mendukung *hover tooltip*, legenda warna yang jelas, serta responsif di layar HP maupun Desktop.

---

### Fitur 4: Asisten Suara Bahasa Indonesia (Voice Input & Text-to-Speech)

#### 4.1 Deskripsi
Memungkinkan pengguna berinteraksi dengan Nusantara Assistant menggunakan suara dalam Bahasa Indonesia.

#### 4.2 Persyaratan Fungsional
- **Input Suara (Speech-to-Text)**: Tombol mikrofon di bilah input chat. Menggunakan `Web Speech API (webkitSpeechRecognition)` dengan setelan bahasa `id-ID`. Teks hasil ucapan langsung dimasukkan ke dalam bilah input.
- **Audio Jawaban (Text-to-Speech)**: Tombol ikon speaker di setiap gelembung jawaban asisten untuk mendengarkan pembacaan pesan menggunakan sintesis suara bahasa Indonesia.

---

### Fitur 5: Interactive API Playground pada Dokumentasi (`/docs`)

#### 5.1 Deskripsi
Menambahkan panel *"Try It Live"* pada setiap halaman dokumentasi API/Tool.

#### 5.2 Persyaratan Fungsional
- Pengembang dapat memilih tool (misalnya: `bmkg_weather` atau `wilayah_search`), memasukkan parameter uji (misalnya: `kota: "Bandung"`), dan menekan tombol **"Jalankan Test"**.
- Hasil respons JSON mentah beserta *rendering card UI* langsung ditampilkan di area pratinjau playground secara *real-time*.

---

### Fitur 6: Publikasi MCP Server ke NPM Package (`@nusantara/mcp-server`)

#### 6.1 Deskripsi
Membungkus dan mempublikasikan repositori `mcp-server/index.js` ke registri NPM publik.

#### 6.2 Persyaratan Fungsional
- Pengguna Claude Desktop, Cursor, atau Antigravity IDE dapat memasang alat Nusantara Assistant hanya dengan menambahkan snippet konfigurasi berikut tanpa perlu men-clone repositori:

```json
{
  "mcpServers": {
    "nusantara-data": {
      "command": "npx",
      "args": ["-y", "@nusantara/mcp-server"]
    }
  }
}
```

---

## 4. Persyaratan Non-Fungsional (Non-Functional Requirements)

1. **Performa**:
   - Ukuran *bundle client* tidak membengkak (> 300KB gzip) dengan melakukan *lazy-loading* pada pustaka grafik (`Recharts`).
2. **Mitigasi Pemblokiran IP Datacenter**:
   - Menyediakan layer *fallback proxy* (Cloudflare Worker ringan) untuk menangani permintaan HTTP ke API pemerintah yang mengembalikan status `403 Forbidden` pada IP Vercel/Cloud.
3. **Aksesibilitas & UI**:
   - Mendukung skema warna *glassmorphism* yang memenuhi kontras minimal WCAG AA.
   - Responsif penuh dari ukuran layar 360px (mobile) hingga 1920px (desktop).

---

## 5. Peta Jalan Peluncuran (Implementation Roadmap)

| Fase | Durasi | Cakupan Utama |
| :--- | :--- | :--- |
| **Fase 1** | Minggu 1 | Implementasi *Streaming Response (SSE)* & Komponen Grafik `Recharts`. |
| **Fase 2** | Minggu 2 | Integrasi Data Baru (PIHPS Harga Pangan & AQI Udara) + Kartu UI. |
| **Fase 3** | Minggu 3 | Integrasi *Web Speech API* (Input/Output Suara Bahasa Indonesia). |
| **Fase 4** | Minggu 4 | Interactive API Playground di `/docs` & Publish `@nusantara/mcp-server` ke NPM. |

---

## 6. Persetujuan & Peninjauan Dokumen

- [x] **Konsep & Arsitektur Utama**: Disetujui oleh User
- [x] **Pengecualian Riwayat Chat**: Dikonfirmasi
- [x] **Pelaksanaan Fase 1 (Streaming & Visualisasi)**: Selesai - `api/chat.js` (SSE streaming + self-check pass + tombol Stop Generation), `src/components/cards/ChartCard.jsx` (Recharts, lazy-loaded)
- [x] **Fase 2 (AQI)**: Selesai - `lib/tools/aqi.js` (IQAir API), `AqiCard.jsx`. PIHPS di-skip (tidak ada API resmi pihak ketiga dari BI, dikonfirmasi user)
- [ ] **Fase 3 (Voice I/O)**: Belum dikerjakan
- [ ] **Fase 4 (API Playground & publish NPM)**: Belum dikerjakan
