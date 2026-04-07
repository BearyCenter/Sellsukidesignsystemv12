#!/usr/bin/env node

import type { Request, Response } from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { createServer } from "./server.js";
import { checkGistStatus } from "./logger.js";

// ─── HTTP + SSE Mode (for Figma Connector / remote clients) ────────────────

const app = createMcpExpressApp({
  // Allow Render domain + localhost for health checks
  allowedHosts: [
    "sellsukidesignsystem.onrender.com",
    "localhost",
    "127.0.0.1",
  ],
});

// Store active SSE transports by session ID
const transports: Record<string, SSEServerTransport> = {};

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    server: "sellsuki-design-system-mcp",
    version: "1.0.0",
    transports: Object.keys(transports).length,
  });
});

// Remote log — local stdio clients POST here so Render (which has GITHUB_TOKEN) writes to Gist
app.post("/log", async (req: Request, res: Response) => {
  try {
    const { logRequest } = await import("./logger.js");
    const { tool, params, duration, status, source } = req.body ?? {};
    if (!tool) { res.status(400).json({ ok: false, error: "missing tool" }); return; }
    await logRequest({ tool, params: params ?? "", duration: duration ?? 0, status: status ?? "success", source: source ?? "mcp" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

// Test — manually log one request entry to verify full Gist pipeline
app.get("/test-log", async (_req: Request, res: Response) => {
  try {
    const { logRequest } = await import("./logger.js");
    await logRequest({ tool: "test_ping", params: "source=browser", duration: 0, status: "success" });
    res.json({ ok: true, message: "Test entry logged — check /debug/gist for updated requestCount" });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

// Debug — Gist connectivity test (tells you if token is valid and logging works)
app.get("/debug/gist", async (_req: Request, res: Response) => {
  try {
    const status = await checkGistStatus();
    res.json({ ok: status.writeOk ?? false, ...status });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

// SSE endpoint — client connects here to establish stream
app.get("/sse", async (req: Request, res: Response) => {
  console.log("[SSE] New connection from", req.ip);

  try {
    const transport = new SSEServerTransport("/messages", res);
    const sessionId = transport.sessionId;
    transports[sessionId] = transport;

    transport.onclose = () => {
      console.log(`[SSE] Session ${sessionId} closed`);
      delete transports[sessionId];
    };

    const server = createServer();
    await server.connect(transport);
    console.log(`[SSE] Session ${sessionId} connected`);
  } catch (error) {
    console.error("[SSE] Error:", error);
    if (!res.headersSent) {
      res.status(500).send("Error establishing SSE stream");
    }
  }
});

// Messages endpoint — client sends JSON-RPC requests here
app.post("/messages", async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;

  if (!sessionId) {
    res.status(400).json({
      jsonrpc: "2.0",
      error: { code: -32600, message: "Missing sessionId parameter" },
      id: null,
    });
    return;
  }

  const transport = transports[sessionId];
  if (!transport) {
    res.status(404).json({
      jsonrpc: "2.0",
      error: { code: -32600, message: "Session not found" },
      id: null,
    });
    return;
  }

  try {
    await transport.handlePostMessage(req, res, req.body);
  } catch (error) {
    console.error("[Messages] Error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
});

// ─── Start ───────────────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT || "3100", 10);

app.listen(PORT, () => {
  console.log(`\n  Sellsuki DS MCP Server (HTTP+SSE)`);
  console.log(`  Listening on port ${PORT}`);
  console.log(`  SSE endpoint: http://localhost:${PORT}/sse`);
  console.log(`  Health check: http://localhost:${PORT}/health\n`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down...");
  for (const sessionId in transports) {
    try {
      await transports[sessionId].close();
      delete transports[sessionId];
    } catch {}
  }
  process.exit(0);
});
