# 🇮🇩 Nusantara.AI — Data Assistant

> **Asisten AI Terintegrasi untuk Data Publik Indonesia**  
> *Menyajikan Informasi Real-Time dari BMKG, Bank Indonesia, BPS, IQAir, dan Wilayah Administratif secara Akurat & Bebas Halusinasi.*

[![React](https://img.shields.io/badge/Frontend-React_18_%2B_Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS_v3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Backend-Vercel_Serverless-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Groq](https://img.shields.io/badge/AI_Engine-Groq_GPT--OSS-F05032?logo=fastapi&logoColor=white)](https://groq.com/)
[![MCP Ready](https://img.shields.io/badge/Protocol-MCP_Server_Supported-7C3AED)](https://modelcontextprotocol.io/)

---

## 📌 Ringkasan Eksekutif

Mengakses data publik resmi Indonesia sering kali memerlukan navigasi ke berbagai portal pemerintah dengan struktur dan format yang beragam. **Nusantara Assistant** menyatukan seluruh ekosistem data publik Indonesia ke dalam **satu antarmuka percakapan berbasis AI** yang intuitif, cepat, dan transparan.

Aplikasi ini menggunakan mekanisme *Function Calling (Tool Use)* tingkat lanjut. Setiap kali pengguna mengajukan pertanyaan dalam bahasa sehari-hari, AI tidak mengarang angka melainkan secara otomatis mengeksekusi pemanggilan *tool* langsung ke endpoint API atau dataset resmi pemerintah. Hasil jawaban kemudian disajikan dalam bentuk teks responsif dan **kartu visual interaktif**.

---

## ✨ Fitur & Kapabilitas Utama

### 🛠️ 1. Multi-Source Tool Calling (Tanpa Halusinasi)
- **🌦️ BMKG Weather & Seismic**: Prakiraan cuaca terkini per kota dan laporan guncangan gempa bumi terupdate (AUTOGEMPA).
- **💵 Bank Indonesia (JISDOR)**: Nilai tukar mata uang referensi resmi Bank Indonesia.
- **🍃 Kualitas Udara (IQAir / AQI)**: Pemantauan Indeks Standar Pencemar Udara (ISPU) & PM2.5 real-time di berbagai wilayah Indonesia.
- **📊 Statistik BPS**: Data indikator makro ekonomi, inflasi, pertumbuhan PDB, dan ketenagakerjaan dari Badan Pusat Statistik.
- **🗺️ Wilayah Administratif**: Pencarian hierarki Provinsi, Kabupaten/Kota, Kecamatan, hingga Desa/Kelurahan secara *offline* menggunakan dataset resmi Permendagri.

### ⚡ 2. Real-Time SSE Streaming & Self-Check Verification
- **Response kata-demi-kata (*Typewriter Effect*)** menggunakan *Server-Sent Events (SSE)* untuk respon yang instan.
- **Fitur Kontrol**: Dilengkapi tombol *Stop Generation* (*AbortController*) untuk menghentikan respon kapan saja.
- **Self-Check Engine**: Menjamin keabsahan parameter data sebelum respon dikirimkan ke layar pengguna.

### 📊 3. Visualisasi Data & Grafik Interaktif
- Secara otomatis merender **Grafik Batang Interaktif (*Recharts*)** ketika pengguna meminta perbandingan data antar-wilayah (misal: *"Bandingkan cuaca/inflasi Surabaya vs Jakarta"*).

### 🎙️ 4. Asisten Suara Bahasa Indonesia (Native Web Speech API)
- **Input Suara (*Speech-to-Text*)**: Memungkinkan perintah suara langsung dalam bahasa Indonesia (`id-ID`).
- **Pembacaan Suara (*Text-to-Speech*)**: Tombol audio pada setiap pesan untuk mendengarkan bacaan balasan AI tanpa memerlukan *API Key* tambahan.

### 🔌 5. Integrasi MCP (Model Context Protocol) & Interactive Playground
- **Dual-Mode Engine**: Pustaka data yang sama diekspos sebagai **Server MCP (`stdio`)**, sehingga dapat dihubungkan langsung ke **Claude Desktop, Claude Code, Cursor**, atau editor pendukung MCP lainnya.
- **Interactive API Playground**: Halaman Dokumentasi (`/docs`) yang dilengkapi fasilitas *Try It Live* untuk menguji respons JSON dan kartu data secara langsung dari browser.

---

## 🛠️ Arsitektur & Teknologi (Tech Stack)

| Lapisan | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Frontend UI** | React 18, Vite, Tailwind CSS | Antarmuka *Glassmorphism* modern, serba responsif, dan ringan. |
| **Backend API** | Vercel Serverless Functions | Arsitektur *stateless*, bebas biaya pemeliharaan server (*zero-server maintenance*). |
| **AI Inference** | Groq API (`openai/gpt-oss-120b`) | Eksekusi *tool-calling* super cepat dengan latensi terendah. |
| **Visualisasi** | Recharts (Lazy Loaded) | Komponen grafik interaktif dengan performa rendering optimal. |
| **Audio & Suara** | Web Speech API (Native Browser) | Integrasi STT & TTS bawaan tanpa *overhead* paket eksternal. |
| **Protokol Eksternal**| Model Context Protocol (MCP SDK) | Memungkinkan integrasi *native* dengan alat AI profesional. |

---

## 🌐 Uji Coba & Demo Live

- **Website App**: [https://nusantara-assistant-red.vercel.app](https://nusantara-assistant-red.vercel.app)
- **Dokumentasi API & Playground**: [https://nusantara-assistant-red.vercel.app/docs](https://nusantara-assistant-red.vercel.app/docs)
