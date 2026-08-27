<p><strong>Nusantara Assistant</strong> adalah asisten chat AI yang menyatukan berbagai sumber data publik resmi Indonesia ke dalam satu antarmuka percakapan yang akurat dan bebas halusinasi.</p>

<p>Mengakses data publik Indonesia biasanya berarti membuka banyak portal pemerintah dengan format berbeda-beda: BMKG untuk cuaca dan gempa, Bank Indonesia untuk kurs referensi, portal wilayah administratif, BPS untuk statistik, dan layanan pihak ketiga untuk kualitas udara. Nusantara Assistant menyelesaikan ini lewat mekanisme <em>function calling</em>: setiap pertanyaan dalam bahasa sehari-hari dijawab dengan memanggil tool langsung ke API atau dataset resmi, bukan dikarang oleh model, lalu disajikan sebagai teks responsif lengkap dengan kartu data visual.</p>

<p>Fitur &amp; Alur Utama:</p>
<ul>
<li>Tool-calling multi-sumber ke BMKG (cuaca dan gempa/autogempa), Bank Indonesia (kurs referensi JISDOR), wilayah administratif (offline dari dataset CSV lokal Permendagri), statistik BPS (inflasi, PDB, ketenagakerjaan), dan kualitas udara IQAir (AQI/ISPU, PM2.5).</li>
<li>Streaming response kata demi kata lewat Server-Sent Events, lengkap dengan tombol hentikan generasi dan tahap <em>self-check</em> yang memverifikasi jawaban terhadap data tool sebelum dikirim ke layar.</li>
<li>Visualisasi perbandingan otomatis berupa grafik batang interaktif ketika pengguna membandingkan data antar wilayah.</li>
<li>Input dan output suara berbahasa Indonesia lewat Web Speech API bawaan peramban, tanpa dependensi tambahan.</li>
<li>Panel API Playground pada halaman dokumentasi untuk menguji setiap tool secara langsung dan melihat respons JSON beserta tampilan kartunya.</li>
<li>Server Model Context Protocol (MCP) yang mengekspos tool yang sama untuk dipakai langsung dari Claude Desktop, Claude Code, Cursor, atau editor pendukung MCP lainnya.</li>
<li>Rate limiting dan pembatasan payload di setiap endpoint publik untuk mencegah penyalahgunaan kuota API.</li>
<li>Arsitektur tanpa database - riwayat percakapan cukup hidup di state peramban.</li>
</ul>

<p>Tech Stack:</p>
<ul>
<li>React 18 dan Vite untuk antarmuka frontend.</li>
<li>Tailwind CSS untuk styling.</li>
<li>Vercel Serverless Functions (Node.js) sebagai backend API, arsitektur stateless tanpa server yang perlu dikelola.</li>
<li>Groq API dengan model GPT-OSS untuk kemampuan tool-calling dan percakapan berlatensi rendah.</li>
<li>Model Context Protocol SDK untuk server MCP.</li>
<li>Recharts (lazy-loaded) untuk visualisasi data perbandingan.</li>
<li>Dataset CSV wilayah administratif lokal (Permendagri 72/2019) tanpa database eksternal.</li>
</ul>
