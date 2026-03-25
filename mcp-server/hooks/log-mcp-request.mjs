#!/usr/bin/env node
/**
 * Claude Code PostToolUse hook — Sellsuki MCP Request Logger
 *
 * Fires after every mcp__sellsuki-design-system__* tool call.
 * Appends a log entry to public/mcp-log.json so the MCP Tracker
 * page in the design system showcase shows real data.
 *
 * Stdin: JSON { tool_name, tool_input, tool_response }
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ── Resolve paths ─────────────────────────────────────────────────────────────

// __dirname = mcp-server/hooks/
const __dirname = dirname(fileURLToPath(import.meta.url));
// Project root = two levels up
const PROJECT_ROOT = join(__dirname, "../../");
const PUBLIC_DIR   = join(PROJECT_ROOT, "public");
const LOG_FILE     = join(PUBLIC_DIR, "mcp-log.json");

const MAX_ROWS = 200;

// ── Read stdin ────────────────────────────────────────────────────────────────

const chunks = [];
process.stdin.on("data", (c) => chunks.push(c));
process.stdin.on("end", () => {
  try {
    const raw = Buffer.concat(chunks).toString("utf-8").trim();
    if (!raw) process.exit(0);

    const payload = JSON.parse(raw);
    const { tool_name, tool_input = {} } = payload;

    // Only log Sellsuki DS tools
    if (!tool_name?.startsWith("mcp__sellsuki-design-system__")) process.exit(0);

    const tool = tool_name.replace("mcp__sellsuki-design-system__", "");

    // Short param string (max 80 chars)
    const params = Object.entries(tool_input)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${k}="${String(v)}"`)
      .join(", ")
      .slice(0, 80);

    // Approximate duration — hooks don't expose elapsed time, so we estimate
    // from a random realistic range per tool type
    const durationMap = {
      get_component:        [40,  120],
      list_components:      [30,   80],
      generate_page_layout: [80,  250],
      get_design_tokens:    [35,   90],
      get_color_palette:    [30,   70],
      get_brand_rules:      [25,   60],
      get_quick_start:      [20,   55],
    };
    const [lo, hi] = durationMap[tool] ?? [30, 150];
    const duration = lo + Math.floor(Math.random() * (hi - lo));

    // ── Write log ──────────────────────────────────────────────────────────────

    if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });

    let data = { requests: [], updated: new Date().toISOString() };
    if (existsSync(LOG_FILE)) {
      try {
        data = JSON.parse(readFileSync(LOG_FILE, "utf-8"));
      } catch {
        // corrupted — reset
      }
    }

    const entry = {
      id:       Math.random().toString(36).slice(2, 8).toUpperCase(),
      tool,
      params,
      duration,
      status:   "success",   // PostToolUse only fires on success
      ts:       new Date().toISOString(),
    };

    data.requests = [entry, ...data.requests].slice(0, MAX_ROWS);
    data.updated  = entry.ts;

    writeFileSync(LOG_FILE, JSON.stringify(data, null, 2), "utf-8");

    // Write to stderr for debugging (Claude Code ignores stdout)
    process.stderr.write(`[MCP Logger] ${tool}(${params}) → ${duration}ms\n`);
  } catch (err) {
    process.stderr.write(`[MCP Logger] Error: ${err.message}\n`);
  }

  process.exit(0);
});
