# Sellsuki DS — MCP Server Config Guide

> MCP Server URL: `https://sellsukidesignsystem.onrender.com`
> SSE Endpoint: `https://sellsukidesignsystem.onrender.com/sse`
> Health Check: `https://sellsukidesignsystem.onrender.com/health`

---

## Claude Code

ไฟล์ `.mcp.json` ที่ root ของ project:

```json
{
  "mcpServers": {
    "sellsuki-design-system": {
      "type": "sse",
      "url": "https://sellsukidesignsystem.onrender.com/sse"
    }
  }
}
```

---

## Cursor

ไฟล์ `.cursor/mcp.json` ที่ root ของ project:

```json
{
  "mcpServers": {
    "sellsuki-design-system": {
      "url": "https://sellsukidesignsystem.onrender.com/sse"
    }
  }
}
```

หรือไปที่ **Cursor Settings → MCP → Add Server** แล้วกรอก URL

---

## VSCode (GitHub Copilot)

ไฟล์ `.vscode/mcp.json` ที่ root ของ project:

```json
{
  "servers": {
    "sellsuki-design-system": {
      "type": "sse",
      "url": "https://sellsukidesignsystem.onrender.com/sse"
    }
  }
}
```

---

## Codex CLI (OpenAI)

ไฟล์ `~/.codex/config.yaml`:

```yaml
mcp_servers:
  - name: sellsuki-design-system
    url: https://sellsukidesignsystem.onrender.com/sse
    transport: sse
```

---

## Google AI Studio / Firebase Studio

AI Studio ยังไม่รองรับ MCP โดยตรง — ใช้ System Prompt แทน:

```
Fetch design rules from: https://sellsukidesignsystem.onrender.com
AI Rules reference: https://sellsukidesignsystemv12.vercel.app/ai-rules.md
```

---

## Tools ทั้งหมดที่ชี้ไปที่ Render server

| Tool | Config file | Status |
|------|------------|--------|
| Claude Code | `.mcp.json` | ✅ |
| Cursor | `.cursor/mcp.json` | ✅ |
| VSCode Copilot | `.vscode/mcp.json` | ✅ |
| Codex CLI | `~/.codex/config.yaml` | Manual |
| AI Studio | System Prompt | ไม่รองรับ MCP |
