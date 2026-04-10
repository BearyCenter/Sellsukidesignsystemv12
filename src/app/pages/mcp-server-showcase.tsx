import { useState, useCallback } from "react";
import pkg from "../../../package.json";
import {
  Server,
  Plus,
  Trash2,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Wrench,
  FileText,
  Database,
  Globe,
  Terminal,
  Play,
  ArrowRight,
  Info,
  Box,
  Package,
  ExternalLink,
  BookOpen,
  Eye,
  Github,
  Cpu,
  Sparkles,
  Monitor,
  Code2,
  Palette,
  Layout,
} from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";
import { useI18n } from "../i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ToolParam {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

interface MCPTool {
  id: string;
  name: string;
  description: string;
  params: ToolParam[];
}

interface MCPResource {
  id: string;
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

let idCounter = 0;
function uid() {
  return `_${++idCounter}_${Date.now()}`;
}

function copyText(text: string) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  } catch {
    navigator.clipboard?.writeText(text);
  }
}

// ─── Copy Button (Inline) ────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        copyText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[var(--radius-sm)] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer flex-shrink-0"
      style={smallLabel}
      title="Copy to clipboard"
    >
      {copied ? <Check size={12} className="text-chart-2" /> : <Copy size={12} />}
    </button>
  );
}

// ─── Architecture Diagram ─────────────────────────────────────────────────────

function ArchitectureDiagram() {
  const { t } = useI18n();
  const nodes = [
    { icon: <Globe size={20} />, label: t("mcp.arch.host"), sub: t("mcp.arch.hostSub"), color: "var(--primary)" },
    { icon: <Box size={20} />, label: t("mcp.arch.client"), sub: t("mcp.arch.clientSub"), color: "var(--chart-2)" },
    { icon: <Server size={20} />, label: t("mcp.arch.server"), sub: t("mcp.arch.serverSub"), color: "var(--chart-5)" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
      {nodes.map((node, i) => (
        <div key={i} className="flex flex-col md:flex-row items-center flex-1">
          <div
            className="flex flex-col items-center gap-2 p-5 rounded-[var(--radius-md)] border border-border bg-card flex-1 w-full"
            style={{ minWidth: 0 }}
          >
            <div
              className="w-10 h-10 rounded-[var(--radius)] flex items-center justify-center"
              style={{ backgroundColor: node.color, color: "white" }}
            >
              {node.icon}
            </div>
            <span className="text-foreground text-center" style={fontLabelBold}>
              {node.label}
            </span>
            <span className="text-muted-foreground text-center" style={smallLabel}>
              {node.sub}
            </span>
          </div>
          {i < nodes.length - 1 && (
            <div className="flex items-center justify-center py-2 md:py-0 md:px-2 flex-shrink-0">
              <ArrowRight size={20} className="text-muted-foreground hidden md:block" />
              <ChevronDown size={20} className="text-muted-foreground md:hidden" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Capability Card ──────────────────────────────────────────────────────────

function CapabilityCard({ icon, title, desc, items }: { icon: React.ReactNode; title: string; desc: string; items: string[] }) {
  return (
    <div className="p-5 rounded-[var(--radius-md)] border border-border bg-card space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-[var(--radius)] flex items-center justify-center bg-primary/10 text-primary">
          {icon}
        </div>
        <span className="text-foreground" style={fontLabelBold}>{title}</span>
      </div>
      <p className="text-muted-foreground" style={smallLabel}>{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="px-2 py-0.5 rounded-[var(--radius-sm)] bg-muted text-muted-foreground"
            style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Interactive Tool Builder ─────────────────────────────────────────────────

function ToolParamRow({
  param,
  onChange,
  onRemove,
}: {
  param: ToolParam;
  onChange: (p: ToolParam) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          value={param.name}
          onChange={(e) => onChange({ ...param, name: e.target.value })}
          placeholder="name"
          className="px-3 py-1.5 rounded-[var(--radius)] border border-border bg-input-background text-foreground"
          style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
        />
        <select
          value={param.type}
          onChange={(e) => onChange({ ...param, type: e.target.value })}
          className="px-3 py-1.5 rounded-[var(--radius)] border border-border bg-input-background text-foreground cursor-pointer"
          style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
        >
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="boolean">boolean</option>
          <option value="object">object</option>
          <option value="array">array</option>
        </select>
        <input
          value={param.description}
          onChange={(e) => onChange({ ...param, description: e.target.value })}
          placeholder="description"
          className="px-3 py-1.5 rounded-[var(--radius)] border border-border bg-input-background text-foreground"
          style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
        />
      </div>
      <label className="flex items-center gap-1.5 pt-2 flex-shrink-0 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={param.required}
          onChange={(e) => onChange({ ...param, required: e.target.checked })}
          className="accent-primary cursor-pointer"
        />
        <span className="text-muted-foreground" style={smallLabel}>req</span>
      </label>
      <button
        onClick={onRemove}
        className="p-1.5 rounded-[var(--radius-sm)] text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer flex-shrink-0 mt-1"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

function ToolCard({
  tool,
  onChange,
  onRemove,
}: {
  tool: MCPTool;
  onChange: (t: MCPTool) => void;
  onRemove: () => void;
}) {
  const [expanded, setExpanded] = useState(true);

  const addParam = () => {
    onChange({
      ...tool,
      params: [...tool.params, { name: "", type: "string", description: "", required: true }],
    });
  };

  const updateParam = (idx: number, p: ToolParam) => {
    const next = [...tool.params];
    next[idx] = p;
    onChange({ ...tool, params: next });
  };

  const removeParam = (idx: number) => {
    onChange({ ...tool, params: tool.params.filter((_, i) => i !== idx) });
  };

  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 cursor-pointer text-foreground"
          style={fontLabelBold}
        >
          <ChevronRight
            size={14}
            className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
          />
          <Wrench size={14} className="text-primary" />
          <span>{tool.name || "Untitled Tool"}</span>
        </button>
        <button
          onClick={onRemove}
          className="p-1.5 rounded-[var(--radius-sm)] text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>
      {expanded && (
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-muted-foreground block" style={smallLabel}>Tool Name</label>
              <input
                value={tool.name}
                onChange={(e) => onChange({ ...tool, name: e.target.value })}
                placeholder="e.g. get_weather"
                className="w-full px-3 py-2 rounded-[var(--radius)] border border-border bg-input-background text-foreground"
                style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
              />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground block" style={smallLabel}>Description</label>
              <input
                value={tool.description}
                onChange={(e) => onChange({ ...tool, description: e.target.value })}
                placeholder="e.g. Get current weather for a location"
                className="w-full px-3 py-2 rounded-[var(--radius)] border border-border bg-input-background text-foreground"
                style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
              />
            </div>
          </div>

          {/* Parameters */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground" style={smallLabel}>Parameters</span>
              <button
                onClick={addParam}
                className="flex items-center gap-1 px-2 py-1 rounded-[var(--radius-sm)] text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                style={smallLabel}
              >
                <Plus size={12} /> Add
              </button>
            </div>
            {tool.params.length === 0 && (
              <p className="text-muted-foreground py-2 text-center" style={smallLabel}>
                No parameters defined. Click "Add" to create one.
              </p>
            )}
            {tool.params.map((param, idx) => (
              <ToolParamRow
                key={idx}
                param={param}
                onChange={(p) => updateParam(idx, p)}
                onRemove={() => removeParam(idx)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Resource Card ────────────────────────────────────────────────────────────

function ResourceCard({
  resource,
  onChange,
  onRemove,
}: {
  resource: MCPResource;
  onChange: (r: MCPResource) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-primary" />
          <span className="text-foreground" style={fontLabelBold}>{resource.name || "Untitled Resource"}</span>
        </div>
        <button
          onClick={onRemove}
          className="p-1.5 rounded-[var(--radius-sm)] text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-muted-foreground block" style={smallLabel}>Name</label>
          <input
            value={resource.name}
            onChange={(e) => onChange({ ...resource, name: e.target.value })}
            placeholder="e.g. user_data"
            className="w-full px-3 py-2 rounded-[var(--radius)] border border-border bg-input-background text-foreground"
            style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
          />
        </div>
        <div className="space-y-1">
          <label className="text-muted-foreground block" style={smallLabel}>URI Template</label>
          <input
            value={resource.uri}
            onChange={(e) => onChange({ ...resource, uri: e.target.value })}
            placeholder="e.g. data://users/{id}"
            className="w-full px-3 py-2 rounded-[var(--radius)] border border-border bg-input-background text-foreground"
            style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
          />
        </div>
        <div className="space-y-1">
          <label className="text-muted-foreground block" style={smallLabel}>Description</label>
          <input
            value={resource.description}
            onChange={(e) => onChange({ ...resource, description: e.target.value })}
            placeholder="Describe this resource"
            className="w-full px-3 py-2 rounded-[var(--radius)] border border-border bg-input-background text-foreground"
            style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
          />
        </div>
        <div className="space-y-1">
          <label className="text-muted-foreground block" style={smallLabel}>MIME Type</label>
          <select
            value={resource.mimeType}
            onChange={(e) => onChange({ ...resource, mimeType: e.target.value })}
            className="w-full px-3 py-2 rounded-[var(--radius)] border border-border bg-input-background text-foreground cursor-pointer"
            style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
          >
            <option value="application/json">application/json</option>
            <option value="text/plain">text/plain</option>
            <option value="text/html">text/html</option>
            <option value="text/csv">text/csv</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// ─── Code Generator ───────────────────────────────────────────────────────────

function generateServerCode(
  serverName: string,
  serverDesc: string,
  tools: MCPTool[],
  resources: MCPResource[],
  transport: string,
): string {
  const lines: string[] = [];
  lines.push(`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";`);
  if (transport === "stdio") {
    lines.push(`import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";`);
  } else {
    lines.push(`import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";`);
    lines.push(`import express from "express";`);
  }
  lines.push(`import { z } from "zod";`);
  lines.push(``);
  lines.push(`const server = new McpServer({`);
  lines.push(`  name: "${serverName || "my-mcp-server"}",`);
  lines.push(`  version: "1.0.0",`);
  if (serverDesc) {
    lines.push(`  description: "${serverDesc}",`);
  }
  lines.push(`});`);

  // Tools
  if (tools.length > 0) {
    lines.push(``);
    lines.push(`// ─── Tools ────────────────────────────────────────────────`);
    for (const tool of tools) {
      if (!tool.name) continue;
      lines.push(``);

      // Build schema object
      const schemaEntries: string[] = [];
      for (const p of tool.params) {
        if (!p.name) continue;
        const zType = p.type === "number" ? "z.number()" : p.type === "boolean" ? "z.boolean()" : "z.string()";
        const desc = p.description ? `.describe("${p.description}")` : "";
        const opt = !p.required ? ".optional()" : "";
        schemaEntries.push(`    ${p.name}: ${zType}${desc}${opt},`);
      }

      lines.push(`server.tool(`);
      lines.push(`  "${tool.name}",`);
      if (tool.description) {
        lines.push(`  "${tool.description}",`);
      }
      lines.push(`  {`);
      for (const entry of schemaEntries) {
        lines.push(entry);
      }
      lines.push(`  },`);
      lines.push(`  async (${tool.params.length > 0 ? `{ ${tool.params.filter(p => p.name).map(p => p.name).join(", ")} }` : ""}) => {`);
      lines.push(`    // TODO: Implement ${tool.name} logic`);
      lines.push(`    return {`);
      lines.push(`      content: [{ type: "text", text: "Result from ${tool.name}" }],`);
      lines.push(`    };`);
      lines.push(`  },`);
      lines.push(`);`);
    }
  }

  // Resources
  if (resources.length > 0) {
    lines.push(``);
    lines.push(`// ─── Resources ────────────────────────────────────────────`);
    for (const res of resources) {
      if (!res.name) continue;
      lines.push(``);
      lines.push(`server.resource(`);
      lines.push(`  "${res.name}",`);
      lines.push(`  "${res.uri || `data://${res.name}`}",`);
      lines.push(`  async (uri) => ({`);
      lines.push(`    contents: [{`);
      lines.push(`      uri: uri.href,`);
      lines.push(`      mimeType: "${res.mimeType}",`);
      lines.push(`      text: JSON.stringify({ /* your data */ }),`);
      lines.push(`    }],`);
      lines.push(`  }),`);
      lines.push(`);`);
    }
  }

  // Transport
  lines.push(``);
  lines.push(`// ─── Transport ────────────────────────────────────────────`);
  if (transport === "stdio") {
    lines.push(``);
    lines.push(`const transport = new StdioServerTransport();`);
    lines.push(`await server.connect(transport);`);
    lines.push(`console.log("MCP server running on stdio");`);
  } else {
    lines.push(``);
    lines.push(`const app = express();`);
    lines.push(`const transports: Record<string, SSEServerTransport> = {};`);
    lines.push(``);
    lines.push(`app.get("/sse", async (req, res) => {`);
    lines.push(`  const transport = new SSEServerTransport("/messages", res);`);
    lines.push(`  transports[transport.sessionId] = transport;`);
    lines.push(`  await server.connect(transport);`);
    lines.push(`});`);
    lines.push(``);
    lines.push(`app.post("/messages", async (req, res) => {`);
    lines.push(`  const sessionId = req.query.sessionId as string;`);
    lines.push(`  await transports[sessionId].handlePostMessage(req, res);`);
    lines.push(`});`);
    lines.push(``);
    lines.push(`app.listen(3001, () => {`);
    lines.push(`  console.log("MCP SSE server running on port 3001");`);
    lines.push(`});`);
  }

  return lines.join("\n");
}

// ─── Code Preview with Copy ───────────────────────────────────────────────────

function CodePreview({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    copyText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div
      className="overflow-hidden"
      style={{
        backgroundColor: "var(--code-bg)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--code-border)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--code-border)" }}
      >
        <div className="flex items-center gap-2">
          <Terminal size={13} style={{ color: "var(--code-func)" }} />
          <span style={{ color: "var(--code-text)", fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-button)" }}>
            {title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 cursor-pointer transition-all"
          style={{
            borderRadius: "var(--radius-full)",
            color: copied ? "var(--code-string)" : "var(--code-line-number)",
            fontFamily: "var(--font-button)",
            fontSize: "var(--text-p)",
            fontWeight: "var(--weight-button)",
            background: "var(--code-surface)",
            border: "1px solid var(--code-border)",
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre
        className="p-4 overflow-x-auto"
        style={{
          fontFamily: "var(--font-button)",
          fontSize: "var(--text-p)",
          fontWeight: "var(--weight-label)",
          lineHeight: "1.7",
          color: "var(--code-text)",
          margin: 0,
        }}
      >
        {code}
      </pre>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "idle" | "ready" | "error" }) {
  const config = {
    idle: { bg: "bg-muted", text: "text-muted-foreground", label: "Idle", dot: "bg-muted-foreground" },
    ready: { bg: "bg-chart-2/10", text: "text-chart-2", label: "Ready", dot: "bg-chart-2" },
    error: { bg: "bg-destructive/10", text: "text-destructive", label: "Error", dot: "bg-destructive" },
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[var(--radius-full)] ${config.bg} ${config.text}`} style={smallLabel}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const DEFAULT_TOOLS: MCPTool[] = [
  {
    id: uid(),
    name: "get_weather",
    description: "Get current weather for a location",
    params: [
      { name: "city", type: "string", description: "City name", required: true },
      { name: "units", type: "string", description: "Temperature units (celsius/fahrenheit)", required: false },
    ],
  },
];

const DEFAULT_RESOURCES: MCPResource[] = [];

export function MCPServerShowcase() {
  const { t } = useI18n();
  const [serverName, setServerName] = useState("sellsuki-mcp");
  const [serverDesc, setServerDesc] = useState("Sellsuki e-commerce MCP server");
  const [transport, setTransport] = useState<"stdio" | "sse">("stdio");
  const [tools, setTools] = useState<MCPTool[]>(DEFAULT_TOOLS);
  const [resources, setResources] = useState<MCPResource[]>(DEFAULT_RESOURCES);
  const [activeTab, setActiveTab] = useState<"tools" | "resources">("tools");
  const [serverStatus, setServerStatus] = useState<"idle" | "ready" | "error">("idle");

  // Generated code
  const generatedCode = generateServerCode(serverName, serverDesc, tools, resources, transport);

  const addTool = () => {
    setTools((prev) => [
      ...prev,
      { id: uid(), name: "", description: "", params: [] },
    ]);
  };

  const updateTool = (id: string, t: MCPTool) => {
    setTools((prev) => prev.map((tool) => (tool.id === id ? t : tool)));
  };

  const removeTool = (id: string) => {
    setTools((prev) => prev.filter((tool) => tool.id !== id));
  };

  const addResource = () => {
    setResources((prev) => [
      ...prev,
      { id: uid(), uri: "", name: "", description: "", mimeType: "application/json" },
    ]);
  };

  const updateResource = (id: string, r: MCPResource) => {
    setResources((prev) => prev.map((res) => (res.id === id ? r : res)));
  };

  const removeResource = (id: string) => {
    setResources((prev) => prev.filter((res) => res.id !== id));
  };

  const handleTestServer = () => {
    setServerStatus("idle");
    setTimeout(() => {
      const hasValidTool = tools.some((t) => t.name.trim() !== "");
      setServerStatus(hasValidTool ? "ready" : "error");
    }, 1200);
  };

  // ─── Sellsuki DS Deployment Info ───────────────────────────────────────────
  const DS_VERSION = pkg.version;
  const DS_PACKAGES = [
    { name: "@uxuissk/design-system", version: pkg.version, desc: "React components (60+)", url: "https://www.npmjs.com/package/@uxuissk/design-system" },
    { name: "@uxuissk/design-tokens", version: "0.1.1", desc: "Shared CSS + JS tokens", url: "https://www.npmjs.com/package/@uxuissk/design-tokens" },
    { name: "@uxuissk/design-system-svelte", version: "scaffold", desc: "Svelte components (from CCS)", url: null },
  ];
  const DS_LINKS = [
    { icon: <Package size={16} />, label: "npm package", url: "https://www.npmjs.com/package/@uxuissk/design-system", code: "npm install @uxuissk/design-system" },
    { icon: <Package size={16} />, label: "npm tokens", url: "https://www.npmjs.com/package/@uxuissk/design-tokens", code: "npm install @uxuissk/design-tokens" },
    { icon: <Cpu size={16} />, label: "MCP Server URL", url: "https://sellsukidesignsystemv12-zsj5.vercel.app/api/mcp", code: "https://sellsukidesignsystemv12-zsj5.vercel.app/api/mcp" },
    { icon: <BookOpen size={16} />, label: "Storybook", url: "https://sellsukidesignsystemv12.vercel.app", code: null },
    { icon: <Eye size={16} />, label: "Preview", url: "https://sellsukidesignsystemv12-2bee.vercel.app", code: null },
    { icon: <Github size={16} />, label: "GitHub", url: "https://github.com/BearyCenter/Sellsukidesignsystemv12", code: "branch: main" },
  ];

  const AI_RULES_LINKS = [
    { label: "AI Rules (Markdown)", url: "https://sellsukidesignsystemv12.vercel.app/ai-rules.md", desc: "สำหรับ Claude.ai, v0, Google AI Studio" },
    { label: "AI Rules (JSON)", url: "https://sellsukidesignsystemv12.vercel.app/ai-rules.json", desc: "สำหรับ programmatic access, MCP" },
  ];

  const AI_TOOLS = [
    { name: "Claude Code", mode: "Full", setup: "CLAUDE.md (auto-read)", icon: <Terminal size={14} /> },
    { name: "Cursor / Windsurf", mode: "Full", setup: ".cursorrules (auto-read)", icon: <Code2 size={14} /> },
    { name: "Figma Make", mode: "Full", setup: "MCP Connector", icon: <Palette size={14} /> },
    { name: "Claude.ai", mode: "Sandbox", setup: "Project Instructions", icon: <Sparkles size={14} /> },
    { name: "v0 (Vercel)", mode: "Sandbox", setup: "Prefix prompt / URL", icon: <Layout size={14} /> },
    { name: "Google AI Studio", mode: "Sandbox", setup: "System Instructions", icon: <Monitor size={14} /> },
    { name: "Firebase Studio", mode: "Full", setup: ".idx/airules.md", icon: <Code2 size={14} /> },
    { name: "Bolt.new", mode: "Full", setup: "Prefix prompt + npm install", icon: <Globe size={14} /> },
    { name: "Lovable", mode: "Full", setup: "Knowledge files", icon: <Globe size={14} /> },
  ];

  return (
    <div className="space-y-10">
      <PageHeader titleKey="page.mcpServer.title" descKey="page.mcpServer.desc" />

      {/* ─── Sellsuki DS Package Info ──────────────────────────── */}
      <Section
        title={`@uxuissk/design-system@${DS_VERSION}`}
        description="Package, MCP Server, and deployment URLs — copy and use directly"
      >
        <DemoBox>
          <div className="space-y-5">
            {/* Version badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-full)] bg-chart-2/10 text-chart-2"
                style={fontLabelBold}
              >
                <Package size={14} /> v{DS_VERSION}
              </span>
              <a
                href="https://www.npmjs.com/package/@uxuissk/design-system"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
                style={smallLabel}
              >
                npmjs.com/package/@uxuissk/design-system <ExternalLink size={12} />
              </a>
            </div>

            {/* Monorepo packages */}
            <div className="space-y-2">
              <span className="text-foreground block" style={fontLabelBold}>Monorepo Packages</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {DS_PACKAGES.map((pkg) => (
                  <div key={pkg.name} className="p-3 rounded-[var(--radius)] border border-border bg-card">
                    <div className="flex items-center gap-2 mb-1">
                      <Package size={13} className="text-primary flex-shrink-0" />
                      <span className="text-foreground truncate" style={{ ...smallLabel, fontWeight: 600 }}>{pkg.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${pkg.version === "scaffold" ? "bg-amber-500/10 text-amber-600" : "bg-chart-2/10 text-chart-2"}`}>{pkg.version}</span>
                    </div>
                    <p className="text-muted-foreground" style={smallLabel}>{pkg.desc}</p>
                    {pkg.url && (
                      <a href={pkg.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline mt-1.5" style={smallLabel}>
                        npm <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Install & Import */}
            <div className="space-y-2">
              <span className="text-foreground block" style={fontLabelBold}>Install & Import</span>
              <CodePreview
                code={`npm install @uxuissk/design-system@${DS_VERSION}`}
                title="terminal"
              />
              <CodePreview
                code={`import "@uxuissk/design-system/styles.css";
import {
  // Data Entry
  DSButton, IconButton, ButtonGroup,
  DSInput, DSTextarea, DSCheckbox, DSRadio,
  Dropdown, DatePicker, SearchField, Switch,
  NumberInput, OTPInput, ColorPicker, FileUpload,
  TagInput, Rating, TransferList,
  // Data Display
  DSTable, AdvancedDataTable,
  Card, CardHeader, CardBody, CardFooter,
  StatCard, Statistic, Badge, Tag,
  Avatar, AvatarGroup, Timeline, Tree,
  EmptyState, Skeleton,
  // Navigation
  TopNavbar, Sidebar, Breadcrumb, Tabs, Stepper, Pagination,
  // Feedback
  Modal, Drawer, Alert, ConfirmDialog, Tooltip, Popover,
  toast, ToastContainer, Notification, Spinner, ProgressBar,
  // Layout
  Divider, PageHeader, FilterBar,
  // Form
  FormField, FormLabel, FormError,
} from "@uxuissk/design-system";

// Shared tokens (optional — for CSS-in-JS or Svelte)
import { colors, typography, spacing } from "@uxuissk/design-tokens";`}
                title="app.tsx"
              />
            </div>

            {/* Links table */}
            <div className="space-y-2">
              <span className="text-foreground block" style={fontLabelBold}>Deployment URLs</span>
              <div className="overflow-x-auto">
                <table className="w-full text-left" style={smallLabel}>
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-3 py-2 text-muted-foreground" style={smallLabel}>Service</th>
                      <th className="px-3 py-2 text-muted-foreground" style={smallLabel}>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DS_LINKS.map((link) => (
                      <tr key={link.label} className="border-b border-border/50">
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2 text-foreground" style={fontLabel}>
                            {link.icon} {link.label}
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline break-all"
                              style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)" }}
                            >
                              {link.url}
                            </a>
                            {link.code && (
                              <CopyButton text={link.code} />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MCP Server highlight */}
            <div className="flex items-start gap-3 p-4 rounded-[var(--radius)] bg-chart-5/5 border border-chart-5/20">
              <Cpu size={18} className="text-chart-5 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-foreground block" style={fontLabelBold}>MCP Server (Streamable HTTP)</span>
                <p className="text-muted-foreground" style={smallLabel}>
                  ใช้ URL นี้เป็น Figma Connector URL ได้เลย หรือเพิ่มใน claude_desktop_config.json
                </p>
                <CodePreview
                  code={`// Figma Make → Connectors → Add Custom → URL:
https://sellsukidesignsystemv12-zsj5.vercel.app/api/mcp

// Claude Desktop config:
{
  "mcpServers": {
    "sellsuki-ds": {
      "url": "https://sellsukidesignsystemv12-zsj5.vercel.app/api/mcp"
    }
  }
}`}
                  title="MCP Connector Setup"
                />
              </div>
            </div>
          </div>
        </DemoBox>
      </Section>

      {/* ─── AI Tool Setup (Vibe Code) ─────────────────────────── */}
      <Section
        title="Vibe Code — AI Tool Setup"
        description="ใช้ Design System กับทุก AI tool ได้ทันที ด้วย hosted rules URL เดียว"
      >
        <DemoBox>
          <div className="space-y-5">
            {/* Central URL */}
            <div className="flex items-start gap-3 p-4 rounded-[var(--radius)] bg-primary/5 border border-primary/20">
              <Sparkles size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <span className="text-foreground block" style={fontLabelBold}>Single Source of Truth — แก้ที่เดียว ทุก tool ได้ของใหม่</span>
                <p className="text-muted-foreground" style={smallLabel}>
                  Host ไฟล์ rules บน Vercel → ทุก AI tool reference URL เดียวกัน → อัปเดต rules แค่ push code
                </p>
                <div className="space-y-1.5 mt-2">
                  {AI_RULES_LINKS.map((link) => (
                    <div key={link.url} className="flex items-center gap-2 flex-wrap">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                        style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)" }}
                      >
                        {link.url}
                      </a>
                      <CopyButton text={link.url} />
                      <span className="text-muted-foreground" style={smallLabel}>— {link.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Universal prompt */}
            <div className="space-y-2">
              <span className="text-foreground block" style={fontLabelBold}>Universal Prompt — ใช้ได้กับทุก tool</span>
              <CodePreview
                code={`Fetch and follow the Sellsuki Design System rules from https://sellsukidesignsystemv12.vercel.app/ai-rules.md
Use only Tailwind CSS for styling (no npm imports). Then build:

[พิมพ์สิ่งที่ต้องการ เช่น "สร้างหน้า Campaign Dashboard"]`}
                title="copy & paste prompt"
              />
            </div>

            {/* Sandbox vs Full */}
            <div className="space-y-2">
              <span className="text-foreground block" style={fontLabelBold}>Sandbox vs Full Mode</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-[var(--radius)] border border-border bg-amber-500/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-[var(--radius-full)] bg-amber-500/10 text-amber-600" style={smallLabel}>Sandbox</span>
                  </div>
                  <p className="text-muted-foreground" style={smallLabel}>
                    ไม่ install npm ได้ (Claude.ai Artifacts, v0, Google AI Studio) → ใช้ <strong>Tailwind CSS</strong> ที่ map กับ Sellsuki tokens
                  </p>
                </div>
                <div className="p-3 rounded-[var(--radius)] border border-border bg-chart-2/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-[var(--radius-full)] bg-chart-2/10 text-chart-2" style={smallLabel}>Full</span>
                  </div>
                  <p className="text-muted-foreground" style={smallLabel}>
                    Install npm ได้ (Claude Code, Cursor, Bolt, Lovable) → ใช้ <strong>@uxuissk/design-system</strong> package จริง
                  </p>
                </div>
              </div>
            </div>

            {/* AI tools table */}
            <div className="space-y-2">
              <span className="text-foreground block" style={fontLabelBold}>รองรับ AI Tools</span>
              <div className="overflow-x-auto">
                <table className="w-full text-left" style={smallLabel}>
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-3 py-2 text-muted-foreground" style={smallLabel}>Tool</th>
                      <th className="px-3 py-2 text-muted-foreground" style={smallLabel}>Mode</th>
                      <th className="px-3 py-2 text-muted-foreground" style={smallLabel}>Setup</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AI_TOOLS.map((tool) => (
                      <tr key={tool.name} className="border-b border-border/50">
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2 text-foreground" style={fontLabel}>
                            {tool.icon} {tool.name}
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded-[var(--radius-full)] ${
                              tool.mode === "Full"
                                ? "bg-chart-2/10 text-chart-2"
                                : "bg-amber-500/10 text-amber-600"
                            }`}
                            style={smallLabel}
                          >
                            {tool.mode}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-muted-foreground" style={smallLabel}>
                          {tool.setup}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Guidelines folder */}
            <div className="flex items-start gap-3 p-4 rounded-[var(--radius)] bg-muted/30 border border-border">
              <FileText size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-foreground block" style={fontLabelBold}>guidelines/ folder</span>
                <p className="text-muted-foreground" style={smallLabel}>
                  Setup guide เฉพาะแต่ละ tool อยู่ใน <code className="px-1 py-0.5 bg-muted rounded text-foreground">guidelines/</code> บน GitHub:
                  v0-system-prompt.md, google-ai-studio-prompt.md, bolt-lovable-prompt.md, relume-prompt.md, firebase-studio-airules.md
                </p>
              </div>
            </div>
          </div>
        </DemoBox>
      </Section>

      {/* ─── Overview ──────────────────────────────────────────── */}
      <Section title={t("mcp.overview.title")} description={t("mcp.overview.desc")}>
        <DemoBox>
          <div className="space-y-6">
            {/* What is MCP */}
            <div className="flex items-start gap-3 p-4 rounded-[var(--radius)] bg-primary/5 border border-primary/20">
              <Info size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-foreground block" style={fontLabelBold}>{t("mcp.whatIs.title")}</span>
                <p className="text-muted-foreground" style={smallLabel}>{t("mcp.whatIs.body")}</p>
              </div>
            </div>

            {/* Architecture */}
            <div className="space-y-3">
              <span className="text-foreground block" style={fontLabelBold}>{t("mcp.arch.title")}</span>
              <ArchitectureDiagram />
            </div>
          </div>
        </DemoBox>
      </Section>

      {/* ─── Capabilities ─────────────────────────────────────── */}
      <Section title={t("mcp.capabilities.title")} description={t("mcp.capabilities.desc")}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CapabilityCard
            icon={<Wrench size={16} />}
            title={t("mcp.cap.tools")}
            desc={t("mcp.cap.toolsDesc")}
            items={["Function Calling", "Zod Schema", "Async Handlers"]}
          />
          <CapabilityCard
            icon={<Database size={16} />}
            title={t("mcp.cap.resources")}
            desc={t("mcp.cap.resourcesDesc")}
            items={["URI Templates", "MIME Types", "Dynamic Data"]}
          />
          <CapabilityCard
            icon={<FileText size={16} />}
            title={t("mcp.cap.prompts")}
            desc={t("mcp.cap.promptsDesc")}
            items={["Templates", "Arguments", "Multi-message"]}
          />
        </div>
      </Section>

      {/* ─── Interactive Builder ───────────────────────────────── */}
      <Section title={t("mcp.builder.title")} description={t("mcp.builder.desc")}>
        <div className="space-y-6">
          {/* Server Config */}
          <DemoBox>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server size={16} className="text-primary" />
                  <span className="text-foreground" style={fontLabelBold}>{t("mcp.builder.config")}</span>
                </div>
                <StatusBadge status={serverStatus} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-muted-foreground block" style={smallLabel}>{t("mcp.builder.name")}</label>
                  <input
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-[var(--radius)] border border-border bg-input-background text-foreground"
                    style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground block" style={smallLabel}>{t("mcp.builder.description")}</label>
                  <input
                    value={serverDesc}
                    onChange={(e) => setServerDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-[var(--radius)] border border-border bg-input-background text-foreground"
                    style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" }}
                  />
                </div>
              </div>

              {/* Transport */}
              <div className="space-y-1">
                <label className="text-muted-foreground block" style={smallLabel}>{t("mcp.builder.transport")}</label>
                <div className="flex gap-2">
                  {(["stdio", "sse"] as const).map((tp) => (
                    <button
                      key={tp}
                      onClick={() => setTransport(tp)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] border cursor-pointer transition-all ${
                        transport === tp
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                      style={btnStyle}
                    >
                      {tp === "stdio" ? <Terminal size={13} /> : <Globe size={13} />}
                      <span className="uppercase">{tp}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DemoBox>

          {/* Tabs: Tools / Resources */}
          <div className="space-y-4">
            <div className="flex items-center gap-1 border-b border-border">
              {(["tools", "resources"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  style={btnStyle}
                >
                  {tab === "tools" ? <Wrench size={13} /> : <Database size={13} />}
                  <span className="capitalize">{tab}</span>
                  <span
                    className="ml-1 px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-muted text-muted-foreground"
                    style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-badge)", fontWeight: "var(--weight-button)", lineHeight: "1" }}
                  >
                    {tab === "tools" ? tools.length : resources.length}
                  </span>
                </button>
              ))}
            </div>

            {activeTab === "tools" && (
              <div className="space-y-3">
                {tools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onChange={(t) => updateTool(tool.id, t)}
                    onRemove={() => removeTool(tool.id)}
                  />
                ))}
                <button
                  onClick={addTool}
                  className="w-full py-3 rounded-[var(--radius-md)] border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer flex items-center justify-center gap-2"
                  style={btnStyle}
                >
                  <Plus size={14} /> {t("mcp.builder.addTool")}
                </button>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-3">
                {resources.map((res) => (
                  <ResourceCard
                    key={res.id}
                    resource={res}
                    onChange={(r) => updateResource(res.id, r)}
                    onRemove={() => removeResource(res.id)}
                  />
                ))}
                <button
                  onClick={addResource}
                  className="w-full py-3 rounded-[var(--radius-md)] border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer flex items-center justify-center gap-2"
                  style={btnStyle}
                >
                  <Plus size={14} /> {t("mcp.builder.addResource")}
                </button>
              </div>
            )}
          </div>

          {/* Test button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTestServer}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] bg-primary text-primary-foreground cursor-pointer transition-all hover:opacity-90"
              style={btnStyle}
            >
              <Play size={14} /> {t("mcp.builder.validate")}
            </button>
            {serverStatus === "ready" && (
              <span className="text-chart-2" style={smallLabel}>{t("mcp.builder.validMsg")}</span>
            )}
            {serverStatus === "error" && (
              <span className="text-destructive" style={smallLabel}>{t("mcp.builder.errorMsg")}</span>
            )}
          </div>

          {/* Generated Code */}
          <CodePreview code={generatedCode} title={`${serverName || "server"}.ts`} />
        </div>
      </Section>

      {/* ─── Quick Start ───────────────────────────────────────── */}
      <Section
        title={t("mcp.quickstart.title")}
        description={t("mcp.quickstart.desc")}
        code={`# Initialize project
npm init -y

# Install dependencies
npm install @modelcontextprotocol/sdk zod

# For SSE transport (optional)
npm install express
npm install -D @types/express

# Run your server
npx tsx server.ts`}
      >
        <DemoBox>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0" style={btnStyle}>1</div>
              <div>
                <span className="text-foreground block" style={fontLabelBold}>{t("mcp.step1.title")}</span>
                <p className="text-muted-foreground" style={smallLabel}>{t("mcp.step1.desc")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0" style={btnStyle}>2</div>
              <div>
                <span className="text-foreground block" style={fontLabelBold}>{t("mcp.step2.title")}</span>
                <p className="text-muted-foreground" style={smallLabel}>{t("mcp.step2.desc")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0" style={btnStyle}>3</div>
              <div>
                <span className="text-foreground block" style={fontLabelBold}>{t("mcp.step3.title")}</span>
                <p className="text-muted-foreground" style={smallLabel}>{t("mcp.step3.desc")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0" style={btnStyle}>4</div>
              <div>
                <span className="text-foreground block" style={fontLabelBold}>{t("mcp.step4.title")}</span>
                <p className="text-muted-foreground" style={smallLabel}>{t("mcp.step4.desc")}</p>
              </div>
            </div>
          </div>
        </DemoBox>
      </Section>

      {/* ─── Client Configuration ──────────────────────────────── */}
      <Section
        title={t("mcp.clientConfig.title")}
        description={t("mcp.clientConfig.desc")}
      >
        <DemoBox>
          <div className="space-y-4">
            <span className="text-foreground block" style={fontLabelBold}>{t("mcp.clientConfig.claude")}</span>
            <CodePreview
              code={`{
  "mcpServers": {
    "${serverName || "my-server"}": {
      "command": "npx",
      "args": ["tsx", "server.ts"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}`}
              title="claude_desktop_config.json"
            />
            <span className="text-foreground block mt-4" style={fontLabelBold}>{t("mcp.clientConfig.cursor")}</span>
            <CodePreview
              code={`{
  "mcpServers": {
    "${serverName || "my-server"}": {
      "command": "npx",
      "args": ["tsx", "server.ts"]
    }
  }
}`}
              title=".cursor/mcp.json"
            />
          </div>
        </DemoBox>
      </Section>

      {/* ─── API Reference ─────────────────────────────────────── */}
      <Section title={t("section.apiReference")}>
        <APITable
          rows={[
            { prop: "name", type: "string", def: "—", desc: "Server name displayed to clients" },
            { prop: "version", type: "string", def: "\"1.0.0\"", desc: "Semantic version of the server" },
            { prop: "description", type: "string", def: "—", desc: "Human-readable server description" },
            { prop: "server.tool()", type: "method", def: "—", desc: "Register a tool with name, schema, and handler" },
            { prop: "server.resource()", type: "method", def: "—", desc: "Register a resource with URI template" },
            { prop: "server.prompt()", type: "method", def: "—", desc: "Register a prompt template" },
            { prop: "server.connect()", type: "method", def: "—", desc: "Connect to a transport (stdio/SSE)" },
            { prop: "StdioServerTransport", type: "class", def: "—", desc: "Standard I/O transport for local processes" },
            { prop: "SSEServerTransport", type: "class", def: "—", desc: "Server-Sent Events transport for HTTP" },
          ]}
        />
      </Section>
    </div>
  );
}