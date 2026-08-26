# README Architecture Narrative

> 9 nodes · cohesion 0.22

## Key Concepts

- **api/chat.js serverless tool-use loop endpoint** (4 connections) — `README.md`
- **lib/tools/* stateless data-source implementations** (3 connections) — `README.md`
- **lib/toolDispatcher.js name-to-function + UI card mapping** (2 connections) — `README.md`
- **lib/toolSchemas.js tool definitions** (2 connections) — `README.md`
- **Rationale: lib/tools kept separate from api/chat.js for future MCP server reuse** (2 connections) — `README.md`
- **Qwen 2.5 via Alibaba Cloud DashScope** (1 connections) — `README.md`
- **React (Vite) frontend (src/)** (1 connections) — `README.md`
- **Roadmap: package lib/tools as standalone MCP server** (1 connections) — `README.md`
- **Roadmap: add streaming response to /api/chat.js** (1 connections) — `README.md`

## Relationships

- [Docs, Mockups & Design System](Docs%2C_Mockups_%26_Design_System.md) (1 shared connections)

## Source Files

- `README.md`

## Audit Trail

- EXTRACTED: 7 (78%)
- INFERRED: 2 (22%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*