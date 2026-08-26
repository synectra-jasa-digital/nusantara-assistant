# Chat API & Tool Dispatch

> 20 nodes · cohesion 0.16

## Key Concepts

- **toolDispatcher.js** (14 connections) — `lib/toolDispatcher.js`
- **chat.js** (6 connections) — `api/chat.js`
- **bmkgEarthquake.js** (4 connections) — `lib/tools/bmkgEarthquake.js`
- **wilayah.js** (4 connections) — `lib/tools/wilayah.js`
- **getRegionInfo()** (4 connections) — `lib/tools/wilayah.js`
- **runTool()** (3 connections) — `lib/toolDispatcher.js`
- **fetchJson()** (3 connections) — `lib/tools/bmkgEarthquake.js`
- **getEarthquakeLatest()** (3 connections) — `lib/tools/bmkgEarthquake.js`
- **getEarthquakeList()** (3 connections) — `lib/tools/bmkgEarthquake.js`
- **handler()** (2 connections) — `api/chat.js`
- **bmkgWeather.js** (2 connections) — `lib/tools/bmkgWeather.js`
- **getWeather()** (2 connections) — `lib/tools/bmkgWeather.js`
- **bpsStatistik.js** (2 connections) — `lib/tools/bpsStatistik.js`
- **getStatistic()** (2 connections) — `lib/tools/bpsStatistik.js`
- **fetchJson()** (2 connections) — `lib/tools/wilayah.js`
- **findByName()** (2 connections) — `lib/tools/wilayah.js`
- **toolSchemas.js** (2 connections) — `lib/toolSchemas.js`
- **toolSchemas** (2 connections) — `lib/toolSchemas.js`
- **openAiTools** (1 connections) — `api/chat.js`
- **HANDLERS** (1 connections) — `lib/toolDispatcher.js`

## Relationships

- [BI Kurs SOAP Parser](BI_Kurs_SOAP_Parser.md) (2 shared connections)

## Source Files

- `api/chat.js`
- `lib/toolDispatcher.js`
- `lib/toolSchemas.js`
- `lib/tools/bmkgEarthquake.js`
- `lib/tools/bmkgWeather.js`
- `lib/tools/bpsStatistik.js`
- `lib/tools/wilayah.js`

## Audit Trail

- EXTRACTED: 29 (88%)
- INFERRED: 4 (12%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*