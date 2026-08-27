<p><strong>Nusantara Assistant</strong> adalah asisten chat AI yang menjawab pertanyaan seputar data publik Indonesia langsung dari sumber resminya, tanpa pernah mengarang angka.</p>

<p>Mengakses data publik Indonesia biasanya berarti membuka banyak situs pemerintah dengan format berbeda-beda: BMKG untuk cuaca dan gempa, Bank Indonesia untuk kurs referensi, portal wilayah administratif, BPS untuk statistik, dan layanan pihak ketiga untuk kualitas udara. Nusantara Assistant menyatukan semua sumber ini di balik satu antarmuka chat berbahasa Indonesia: setiap jawaban ditelusuri lewat pemanggilan tool (function calling) ke API atau dataset asli, sehingga pengguna cukup bertanya dengan bahasa sehari-hari dan mendapat jawaban akurat lengkap dengan kartu data visual.</p>

<p>Fitur &amp; Alur Utama:</p>
<ul>
<li>Tool-calling multi-sumber ke BMKG (cuaca dan gempa), Bank Indonesia (kurs referensi JISDOR), wilayah administratif (offline dari dataset CSV lokal), statistik BPS, dan kualitas udara IQAir.</li>
<li>Streaming response kata demi kata lewat Server-Sent Events, lengkap dengan tombol hentikan generasi dan tahap <em>self-check</em> sebelum jawaban final dikirim.</li>
<li>Visualisasi perbandingan otomatis berupa grafik batang interaktif ketika pengguna membandingkan data antar wilayah.</li>
<li>Input dan output suara berbahasa Indonesia lewat Web Speech API bawaan peramban, tanpa dependensi tambahan.</li>
<li>Panel API Playground pada halaman dokumentasi untuk menguji setiap tool secara langsung dan melihat respons JSON beserta tampilan kartunya.</li>
<li>Server Model Context Protocol (MCP) yang mengekspos tool yang sama untuk dipakai langsung dari Claude Desktop, Claude Code, atau editor pendukung MCP lainnya.</li>
<li>Rate limiting dan pembatasan payload di setiap endpoint publik untuk mencegah penyalahgunaan kuota API.</li>
<li>Arsitektur tanpa database - riwayat percakapan cukup hidup di state peramban.</li>
</ul>

<p>Tech Stack:</p>
<ul>
<li>React 18 dan Vite untuk antarmuka frontend.</li>
<li>Tailwind CSS untuk styling.</li>
<li>Vercel Serverless Functions (Node.js) sebagai backend API.</li>
<li>Groq API dengan model GPT-OSS untuk kemampuan tool-calling dan percakapan.</li>
<li>Model Context Protocol SDK untuk server MCP.</li>
<li>Recharts untuk visualisasi data perbandingan.</li>
<li>Dataset CSV wilayah administratif lokal (Permendagri 72/2019) tanpa database eksternal.</li>
</ul>
