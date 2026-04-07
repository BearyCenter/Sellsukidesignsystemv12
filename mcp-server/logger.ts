/**
 * Sellsuki MCP Server — Request Logger
 *
 * Writes each tool invocation to a GitHub Gist so the MCP Tracker page
 * can read real production data from any deployment environment.
 *
 * Env vars required (set in Render / Vercel dashboard):
 *   GIST_ID      — GitHub Gist ID  (1f93c4696db118e8013a589169435b42)
 *   GITHUB_TOKEN — Personal Access Token with `gist` scope
 *
 * Falls back to local public/mcp-log.json when env vars are absent (dev mode).
 * Safe for stdio mode: never touches stdout.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ─── Config ───────────────────────────────────────────────────────────────────

const GIST_ID    = process.env.GIST_ID    ?? "";
const GIST_TOKEN = process.env.GITHUB_TOKEN ?? "";
const GIST_FILE  = "mcp-log.json";
const GIST_API   = `https://api.github.com/gists/${GIST_ID}`;
const GIST_RAW   = `https://gist.githubusercontent.com/BearyCenter/${GIST_ID}/raw/${GIST_FILE}`;

// Remote relay — used when running as local stdio (no GITHUB_TOKEN in env)
// Posts to Render server which already has the token and writes to Gist
const REMOTE_LOG = process.env.REMOTE_LOG_URL ?? "https://sellsukidesignsystem.onrender.com/log";

const USE_GIST   = Boolean(GIST_ID && GIST_TOKEN);
const USE_RELAY  = !USE_GIST && Boolean(REMOTE_LOG);

// ─── Local fallback path ───────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const projectRoot = __dirname.endsWith("dist")
  ? join(__dirname, "../../")
  : join(__dirname, "../");

const LOG_FILE = join(projectRoot, "public", "mcp-log.json");
const MAX_ROWS = 200;

// ─── Types ────────────────────────────────────────────────────────────────────

export type RequestLog = {
  id:       string;
  tool:     string;
  params:   string;
  duration: number;
  status:   "success" | "error";
  ts:       string;  // ISO 8601
  source?:  string;  // "claude" | "codex" | "cursor" | "mcp" | etc.
};

type LogFile = {
  requests: RequestLog[];
  updated:  string;
};

// ─── Source detection ─────────────────────────────────────────────────────────
// Each tool sets MCP_SOURCE in its config env — this is the only reliable way.
// Render SSE clients that don't pass source will show "mcp".

function detectSource(): string {
  return process.env.MCP_SOURCE ?? (USE_GIST ? "mcp" : "mcp");
}

// ─── Gist helpers ─────────────────────────────────────────────────────────────

async function readGist(): Promise<LogFile> {
  try {
    const res = await fetch(`${GIST_RAW}?t=${Date.now()}`, {
      headers: { "Cache-Control": "no-cache" },
    });
    if (!res.ok) return { requests: [], updated: new Date().toISOString() };
    return (await res.json()) as LogFile;
  } catch {
    return { requests: [], updated: new Date().toISOString() };
  }
}

async function writeGist(data: LogFile): Promise<{ ok: boolean; status: number; body?: string }> {
  const res = await fetch(GIST_API, {
    method: "PATCH",
    headers: {
      Authorization:  `Bearer ${GIST_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent":   "SellsukiDS-MCP",
    },
    body: JSON.stringify({
      files: { [GIST_FILE]: { content: JSON.stringify(data, null, 2) } },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    process.stderr.write(`[Logger] Gist write FAILED — HTTP ${res.status}: ${body.slice(0, 200)}\n`);
    return { ok: false, status: res.status, body };
  }
  return { ok: true, status: res.status };
}

// ─── Local fallback helpers ────────────────────────────────────────────────────

function readLocal(): LogFile {
  try {
    if (existsSync(LOG_FILE)) {
      return JSON.parse(readFileSync(LOG_FILE, "utf-8")) as LogFile;
    }
  } catch { /* corrupted – start fresh */ }
  return { requests: [], updated: new Date().toISOString() };
}

function writeLocal(data: LogFile): void {
  const dir = join(projectRoot, "public");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(LOG_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Test Gist connectivity and token validity. Used by /debug/gist endpoint.
 */
export async function checkGistStatus(): Promise<{
  configured: boolean;
  gistId: string;
  tokenPresent: boolean;
  readOk?: boolean;
  writeOk?: boolean;
  writeStatus?: number;
  writeError?: string;
  requestCount?: number;
  lastEntry?: string;
}> {
  if (!USE_GIST) {
    return {
      configured: false,
      gistId: GIST_ID || "(not set)",
      tokenPresent: Boolean(GIST_TOKEN),
    };
  }

  // Test read
  let readOk = false;
  let requestCount = 0;
  let lastEntry = "";
  try {
    const data = await readGist();
    readOk = true;
    requestCount = data.requests.length;
    lastEntry = data.requests[0]?.ts ?? "(none)";
  } catch { /* */ }

  // Test write (write same data back — no-op content change)
  let writeOk = false;
  let writeStatus = 0;
  let writeError = "";
  try {
    const data = await readGist();
    const result = await writeGist({ ...data, updated: new Date().toISOString() });
    writeOk = result.ok;
    writeStatus = result.status;
    if (!result.ok) writeError = result.body ?? "";
  } catch (e) {
    writeError = String(e);
  }

  return {
    configured: true,
    gistId: GIST_ID,
    tokenPresent: true,
    readOk,
    writeOk,
    writeStatus,
    writeError: writeError.slice(0, 200),
    requestCount,
    lastEntry,
  };
}

/**
 * Record a single MCP tool call (fire-and-forget, never throws).
 */
export async function logRequest(entry: Omit<RequestLog, "id" | "ts">): Promise<void> {
  try {
    const record: RequestLog = {
      id:     Math.random().toString(36).slice(2, 8).toUpperCase(),
      ts:     new Date().toISOString(),
      source: detectSource(),
      ...entry,
    };

    if (USE_GIST) {
      // Running on Render — write directly to Gist
      const data = await readGist();
      data.requests = [record, ...data.requests].slice(0, MAX_ROWS);
      data.updated  = record.ts;
      await writeGist(data);
    } else if (USE_RELAY) {
      // Running locally (stdio) — relay to Render which has the token
      await fetch(REMOTE_LOG, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ tool: record.tool, params: record.params, duration: record.duration, status: record.status, source: record.source }),
      }).catch(() => { /* fire-and-forget */ });
    } else {
      // Fallback — write to local file (dev mode, no network)
      const data = readLocal();
      data.requests = [record, ...data.requests].slice(0, MAX_ROWS);
      data.updated  = record.ts;
      writeLocal(data);
    }
  } catch {
    // Never throw — logging must not break tool execution
  }
}

/**
 * Wrap an async tool handler, measure duration, and log result.
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
  const paramStr = Object.entries(params)
    .map(([k, v]) => `${k}="${String(v)}"`)
    .join(", ")
    .slice(0, 80);

  try {
    const result = await fn();
    void logRequest({ tool, params: paramStr, duration: Date.now() - start, status: "success" });
    return result;
  } catch (err) {
    void logRequest({ tool, params: paramStr, duration: Date.now() - start, status: "error" });
    throw err;
  }
}
