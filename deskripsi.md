<p><strong>Nusantara Assistant</strong> adalah asisten chat AI yang menyatukan berbagai sumber data publik resmi Indonesia ke dalam satu antarmuka percakapan yang akurat dan bebas halusinasi.</p>

<p>Mengakses data publik Indonesia biasanya berarti membuka banyak portal pemerintah dengan format berbeda-beda: BMKG untuk cuaca dan gempa, Bank Indonesia untuk kurs referensi, portal wilayah administratif, BPS untuk statistik, dan layanan pihak ketiga untuk kualitas udara. Nusantara Assistant menyelesaikan ini lewat mekanisme <em>function calling</em>: setiap pertanyaan dalam bahasa sehari-hari dijawab dengan memanggil tool langsung ke API atau dataset resmi, bukan dikarang oleh model, lalu disajikan sebagai teks responsif lengkap dengan kartu data visual.</p>

<p>Fitur &amp; Alur Utama:</p>
<ul>
<li><strong>Tool-calling multi-sumber</strong> ke lima sumber data resmi sekaligus:
<ul>
<li><strong>BMKG</strong> — cuaca terkini dan gempa bumi (autogempa).</li>
<li><strong>Bank Indonesia</strong> — kurs referensi JISDOR.</li>
<li><strong>Wilayah Administratif</strong> — provinsi hingga desa/kelurahan, offline dari dataset CSV lokal Permendagri.</li>
<li><strong>BPS</strong> — statistik inflasi, PDB, dan ketenagakerjaan.</li>
<li><strong>IQAir</strong> — kualitas udara AQI/ISPU dan PM2.5.</li>
</ul>
</li>
<li><strong>Streaming response</strong> kata demi kata lewat Server-Sent Events, dengan tombol hentikan generasi dan tahap <em>self-check</em> yang memverifikasi jawaban terhadap data tool sebelum dikirim ke layar.</li>
<li><strong>Visualisasi perbandingan otomatis</strong> berupa grafik batang interaktif ketika pengguna membandingkan data antar wilayah.</li>
<li><strong>Voice I/O</strong> — input dan output suara berbahasa Indonesia lewat Web Speech API bawaan peramban, tanpa dependensi tambahan.</li>
<li><strong>API Playground</strong> pada halaman dokumentasi untuk menguji setiap tool secara langsung dan melihat respons JSON beserta tampilan kartunya.</li>
<li><strong>Server Model Context Protocol (MCP)</strong> yang mengekspos tool yang sama untuk dipakai langsung dari Claude Desktop, Claude Code, Cursor, atau editor pendukung MCP lainnya.</li>
<li><strong>Rate limiting</strong> dan pembatasan payload di setiap endpoint publik untuk mencegah penyalahgunaan kuota API.</li>
<li><strong>Tanpa database</strong> — riwayat percakapan cukup hidup di state peramban.</li>
</ul>

<p>Tech Stack:</p>
<ul>
<li><strong>Frontend:</strong> React 18, Vite, Tailwind CSS.</li>
<li><strong>Backend:</strong> Vercel Serverless Functions (Node.js), arsitektur stateless tanpa server yang perlu dikelola.</li>
<li><strong>AI Engine:</strong> Groq API dengan model GPT-OSS untuk tool-calling dan percakapan berlatensi rendah.</li>
<li><strong>Protokol:</strong> Model Context Protocol SDK untuk server MCP.</li>
<li><strong>Visualisasi:</strong> Recharts (lazy-loaded) untuk grafik perbandingan.</li>
<li><strong>Data Wilayah:</strong> dataset CSV lokal (Permendagri 72/2019) tanpa database eksternal.</li>
</ul>
