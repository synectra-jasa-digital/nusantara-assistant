---
type: community
cohesion: 0.39
members: 8
---

# BI Kurs SOAP Parser

**Cohesion:** 0.39 - loosely connected
**Members:** 8 nodes

## Members
- [[FIELD_ALIASES]] - code - lib/tools/biKurs.js
- [[biKurs.js]] - code - lib/tools/biKurs.js
- [[buildEnvelope()]] - code - lib/tools/biKurs.js
- [[callSoap()]] - code - lib/tools/biKurs.js
- [[getExchangeRate()]] - code - lib/tools/biKurs.js
- [[parseDiffgramRows()]] - code - lib/tools/biKurs.js
- [[parser]] - code - lib/tools/biKurs.js
- [[pickField()]] - code - lib/tools/biKurs.js

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/BI_Kurs_SOAP_Parser
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_Chat API & Tool Dispatch]]

## Top bridge nodes
- [[biKurs.js]] - degree 8, connects to 1 community
- [[getExchangeRate()]] - degree 5, connects to 1 community