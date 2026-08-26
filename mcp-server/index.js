#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { toolSchemas } from '../lib/toolSchemas.js'
import { runTool } from '../lib/toolDispatcher.js'

const server = new Server(
  { name: 'data-nusantara', version: '0.1.0' },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: toolSchemas.map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.input_schema,
  })),
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { result } = await runTool(request.params.name, request.params.arguments ?? {})
  return {
    content: [{ type: 'text', text: JSON.stringify(result) }],
    isError: Boolean(result?.error),
  }
})

await server.connect(new StdioServerTransport())
