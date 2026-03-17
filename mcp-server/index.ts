#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

// ─── Stdio Mode (for Claude Code local usage) ──────────────────────────────

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
