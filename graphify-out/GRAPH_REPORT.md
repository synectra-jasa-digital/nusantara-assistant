# Graph Report - D:/portofolio/nusantara-assistant  (2026-08-26)

## Corpus Check
- 53 files · ~62,277 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 232 nodes · 373 edges · 20 communities
- Extraction: 88% EXTRACTED · 11% INFERRED · 1% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.79)
- Token cost: 465,170 input · 0 output

## Community Hubs (Navigation)
- Docs, Mockups & Design System
- React Chat UI Components
- Core Dependencies & Scripts
- Pages & Documentation UI
- Chat API & Tool Dispatch
- Beranda Mobile Concepts
- Beranda Desktop Mockup
- Chat Desktop Mockup
- Build Tooling Dependencies
- Docs Desktop Mockup
- README Architecture Narrative
- BI Kurs SOAP Parser
- Chat Mobile Mockup
- Layout & Footer Components
- Docs Mobile Mockup

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 29 edges
2. `Icon()` - 15 edges
3. `Docs Intro Page (Pengenalan dan Instalasi)` - 9 edges
4. `BMKG (cuaca & gempa data source)` - 7 edges
5. `Bank Indonesia kurs referensi (JISDOR)` - 7 edges
6. `Statistik BPS` - 7 edges
7. `Beranda (Home) page mockup - desktop` - 7 edges
8. `Beranda (Homepage) Screen Mockup` - 7 edges
9. `Beranda (Home) Mobile Screen Mockup` - 7 edges
10. `useAutoTranslate()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Chat page mockup - desktop` --shares_data_with--> `lib/toolDispatcher.js name-to-function + UI card mapping`  [INFERRED]
  stitch/chat_data_nusantara_assistant/code.html → README.md
- `Weather Data Card (BMKG) UI pattern` --references--> `BMKG (cuaca & gempa data source)`  [EXTRACTED]
  stitch/chat_data_nusantara_assistant/code.html → README.md
- `Weather Data Card (BMKG) UI pattern - mobile` --references--> `BMKG (cuaca & gempa data source)`  [EXTRACTED]
  stitch/chat_data_nusantara_assistant_mobile/code.html → README.md
- `Cuaca BMKG endpoint card (Public, no auth)` --references--> `BMKG (cuaca & gempa data source)`  [EXTRACTED]
  stitch/dokumentasi_data_nusantara_assistant/code.html → README.md
- `Cuaca BMKG endpoint card (Public, no auth) - mobile` --references--> `BMKG (cuaca & gempa data source)`  [EXTRACTED]
  stitch/dokumentasi_data_nusantara_assistant_mobile/code.html → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Four Core Public Data Pillars (BMKG, BI, Wilayah, BPS)** — readme_bmkg, readme_bank_indonesia_kurs, readme_wilayah_administratif, readme_bps_statistik [EXTRACTED 1.00]
- **Tool-Call Result Card UI Pattern** — stitch_chat_data_nusantara_assistant_code_weather_card, stitch_chat_data_nusantara_assistant_code_currency_card, stitch_chat_data_nusantara_assistant_code_admin_breadcrumb_card, stitch_chat_data_nusantara_assistant_code_bps_stat_card, readme_lib_tooldispatcher [INFERRED 0.85]
- **Nusantara Bright Design System Components** — stitch_nusantara_bright_design_color_palette, stitch_nusantara_bright_design_typography, stitch_nusantara_bright_design_shape_language, stitch_nusantara_bright_design_component_specs [EXTRACTED 1.00]

## Communities (20 total, 0 thin omitted)

### Community 0 - "Docs, Mockups & Design System"
Cohesion: 0.09
Nodes (34): index.html app shell (Vite entry / #root mount), Bank Indonesia kurs referensi (JISDOR), Rationale: biKurs.js FIELD_ALIASES unverified SOAP/diffgram field-name guessing, BMKG (cuaca & gempa data source), Statistik BPS, Data Nusantara Assistant (project), Rationale/risk: Indonesian gov APIs block cloud-datacenter IPs (Vercel), Rationale: deliberately no database, chat history lives in React state (+26 more)

### Community 1 - "React Chat UI Components"
Cohesion: 0.16
Nodes (19): EarthquakeCard(), KursCard(), StatistikCard(), WeatherCard(), WilayahCard(), CARD_COMPONENTS, ChatBubble(), ChatInput() (+11 more)

### Community 2 - "Core Dependencies & Scripts"
Cohesion: 0.10
Nodes (20): fast-xml-parser, google-translate-api-x, dependencies, fast-xml-parser, google-translate-api-x, react, react-dom, react-router-dom (+12 more)

### Community 3 - "Pages & Documentation UI"
Cohesion: 0.15
Nodes (12): App(), CategoryCard(), TONES, DocsSidebar(), SECTION_ICONS, ParamTable(), docsSections, loadCache() (+4 more)

### Community 4 - "Chat API & Tool Dispatch"
Cohesion: 0.16
Nodes (13): handler(), openAiTools, HANDLERS, runTool(), fetchJson(), getEarthquakeLatest(), getEarthquakeList(), getWeather() (+5 more)

### Community 5 - "Beranda Mobile Concepts"
Cohesion: 0.19
Nodes (14): Bank Indonesia Exchange Rate Data Source, BMKG (Indonesian Meteorology, Climatology, Geophysics Agency) Data Source, BPS (Statistics Indonesia) Macroeconomic Data Source, Chat Interface Feature (Nusantara Assistant), Indonesia Administrative Regions Data (Province to Village), Feature Card: Cuaca & Gempa (BMKG real-time data), Footer Links: GitHub, Documentation, Privacy Policy, Terms, Hero Section: 'Navigasi Data Indonesia dengan Mudah' (+6 more)

### Community 6 - "Beranda Desktop Mockup"
Cohesion: 0.20
Nodes (12): Bank Indonesia data source, BMKG (Indonesian Meteorology, Climatology and Geophysics Agency) data source, BPS (Statistics Indonesia) data source, Feature Card: Cuaca dan Gempa (BMKG), Footer (GitHub / Documentation / Privacy Policy / Terms), Hero Section: 'Navigasi Data Indonesia dengan Mudah', Beranda (Homepage) Screen Mockup, Feature Card: Kurs Bank Indonesia (+4 more)

### Community 7 - "Chat Desktop Mockup"
Cohesion: 0.24
Nodes (12): BPS Population Projection Card (49.405.808 Jiwa, Jawa Barat, 2023), Chat Input Box (Tanyakan seputar data Indonesia...), Data Nusantara Assistant Chat UI, USD Exchange Rate Feature (Kurs USD), Latest Earthquake Feature (Gempa Terbaru), Eksplorasi Sidebar (Popular Topics Panel), Official Indonesian Government Data Sources (BMKG, BI, BPS), Kemendagri (Ministry of Home Affairs) Region Code Reference (+4 more)

### Community 8 - "Build Tooling Dependencies"
Cohesion: 0.18
Nodes (11): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, vite, @vitejs/plugin-react, tailwindcss (+3 more)

### Community 9 - "Docs Desktop Mockup"
Cohesion: 0.31
Nodes (10): BI Tools (sidebar nav), BPS Tools (sidebar nav), Cuaca BMKG Endpoint (Public), Deploy (sidebar nav), Docs Intro Page (Pengenalan dan Instalasi), Parameter Global (region_id, limit), Region Tools (sidebar nav), @datanusantara/sdk npm package (+2 more)

### Community 10 - "README Architecture Narrative"
Cohesion: 0.22
Nodes (9): api/chat.js serverless tool-use loop endpoint, lib/toolDispatcher.js name-to-function + UI card mapping, lib/tools/* stateless data-source implementations, lib/toolSchemas.js tool definitions, Rationale: lib/tools kept separate from api/chat.js for future MCP server reuse, Qwen 2.5 via Alibaba Cloud DashScope, React (Vite) frontend (src/), Roadmap: package lib/tools as standalone MCP server (+1 more)

### Community 11 - "BI Kurs SOAP Parser"
Cohesion: 0.39
Nodes (7): buildEnvelope(), callSoap(), FIELD_ALIASES, getExchangeRate(), parseDiffgramRows(), parser, pickField()

### Community 12 - "Chat Mobile Mockup"
Cohesion: 0.36
Nodes (8): BMKG Data Source Reference, BPS (Badan Pusat Statistik) Data Source Reference, Chat Input Bar (Tanya sesuatu tentang Indonesia), Data Nusantara Assistant Chat Screen (Mobile Mockup), ID/EN Language Toggle, Population Data Card (Jawa Timur 2023, 41.4 Juta Jiwa), Suggested Query Chips (Cuaca Jakarta, Populasi Jawa Barat), Weather Data Card (Jakarta Pusat, 32C Cerah Berawan)

### Community 13 - "Layout & Footer Components"
Cohesion: 0.40
Nodes (4): Footer(), LINKS, SOURCES, Layout()

### Community 14 - "Docs Mobile Mockup"
Cohesion: 0.73
Nodes (6): @data-nusantara/core npm package, Cuaca BMKG API Endpoint, Data Nusantara Assistant Docs Intro Screen, limit Global Parameter, region_id Global Parameter, Statistik BPS API Endpoint

## Ambiguous Edges - Review These
- `Bank Indonesia kurs referensi (JISDOR)` → `Rationale/risk: Indonesian gov APIs block cloud-datacenter IPs (Vercel)`  [AMBIGUOUS]
  README.md · relation: references
- `Statistik BPS` → `Rationale/risk: Indonesian gov APIs block cloud-datacenter IPs (Vercel)`  [AMBIGUOUS]
  README.md · relation: references
- `Feature Card: Wilayah Administratif` → `BPS (Statistics Indonesia) data source`  [AMBIGUOUS]
  stitch/beranda_data_nusantara_assistant/screen.png · relation: conceptually_related_to
- `Statistik BPS Endpoint (Key Required)` → `@datanusantara/sdk npm package`  [AMBIGUOUS]
  stitch/dokumentasi_data_nusantara_assistant/screen.png · relation: conceptually_related_to

## Knowledge Gaps
- **57 isolated node(s):** `openAiTools`, `HANDLERS`, `parser`, `FIELD_ALIASES`, `name` (+52 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Bank Indonesia kurs referensi (JISDOR)` and `Rationale/risk: Indonesian gov APIs block cloud-datacenter IPs (Vercel)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Statistik BPS` and `Rationale/risk: Indonesian gov APIs block cloud-datacenter IPs (Vercel)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Feature Card: Wilayah Administratif` and `BPS (Statistics Indonesia) data source`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Statistik BPS Endpoint (Key Required)` and `@datanusantara/sdk npm package`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `useLanguage()` connect `React Chat UI Components` to `Pages & Documentation UI`, `Layout & Footer Components`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `openAiTools`, `HANDLERS`, `parser` to the rest of the system?**
  _57 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Docs, Mockups & Design System` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._