/**
 * Sellsuki MCP Server — Request Logger
 *
 * Writes each tool invocation to public/mcp-log.json so the
 * MCP Tracker page in the design system showcase can read real data.
 *
 * Safe for stdio mode: only writes to the log file, never touches stdout.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ─── Resolve log file path ────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// Works for both: tsx (source) and dist/ (compiled)
const projectRoot = __dirname.endsWith("dist")
  ? join(__dirname, "../../")   // mcp-server/dist → project root
  : join(__dirname, "../");     // mcp-server/      → project root

const LOG_FILE  = join(projectRoot, "public", "mcp-log.json");
const MAX_ROWS  = 200;   // keep last N requests in the file

// ─── Types ────────────────────────────────────────────────────────────────────

export type RequestLog = {
  id:       string;
  tool:     string;
  params:   string;   // serialised (short)
  duration: number;   // ms
  status:   "success" | "error";
  ts:       string;   // ISO 8601
};

type LogFile = {
  requests: RequestLog[];
  updated:  string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readLog(): LogFile {
  try {
    if (existsSync(LOG_FILE)) {
      return JSON.parse(readFileSync(LOG_FILE, "utf-8")) as LogFile;
    }
  } catch {
    // corrupted file – start fresh
  }
  return { requests: [], updated: new Date().toISOString() };
}

function ensurePublicDir() {
  const dir = join(projectRoot, "public");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Record a single MCP tool call.
 * Called from server.ts after each tool handler resolves/rejects.
 */
export function logRequest(entry: Omit<RequestLog, "id" | "ts">): void {
  try {
    ensurePublicDir();
    const data = readLog();

    const record: RequestLog = {
      id:  Math.random().toString(36).slice(2, 8).toUpperCase(),
      ts:  new Date().toISOString(),
      ...entry,
    };

    // Prepend newest first, cap at MAX_ROWS
    data.requests = [record, ...data.requests].slice(0, MAX_ROWS);
    data.updated  = record.ts;

    writeFileSync(LOG_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Never throw — logging must not break tool execution
  }
}

/**
 * Convenience: wrap an async tool handler, measure duration, and log result.
 *
 * Usage in server.ts:
 *   withLog("get_component", { name }, () => handler({ name }))
 */
export async function withLog<T>(
  tool: string,
  params: Record<string, unknown>,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();
  // Build short param string (max 80 chars)
  const paramStr = Object.entries(params)
    .map(([k, v]) => `${k}="${String(v)}"`)
    .join(", ")
    .slice(0, 80);

  try {
    const result = await fn();
    logRequest({
      tool,
      params:   paramStr,
      duration: Date.now() - start,
      status:   "success",
    });
    return result;
  } catch (err) {
    logRequest({
      tool,
      params:   paramStr,
      duration: Date.now() - start,
      status:   "error",
    });
    throw err;
  }
}
