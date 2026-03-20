# Sellsuki Design System — AI Tool Setup Guides

> ไฟล์ในโฟลเดอร์นี้ช่วยให้ทุก AI tool สร้าง UI ที่มี mood & tone เดียวกับ Sellsuki

## ⚠️ Sandbox vs Production Mode

AI tools แบ่งเป็น 2 กลุ่ม ตามความสามารถในการใช้ npm package:

| Mode | เครื่องมือ | วิธีสร้าง UI |
|------|-----------|-------------|
| **Sandbox** (ไม่ install npm ได้) | Claude.ai Artifacts, v0, Google AI Studio | ใช้ **Tailwind CSS** ที่ map กับ Sellsuki tokens |
| **Full** (install npm ได้) | Claude Code, Cursor, Bolt.new, Lovable, Firebase Studio | ใช้ **@uxuissk/design-system** package จริง |

> **PO / UX ส่วนใหญ่ใช้ Sandbox mode** — prompt ต้องบอกให้สร้าง UI ด้วย Tailwind ไม่ใช่ import package

## Quick Start — เลือก tool ที่ใช้

| AI Tool | ไฟล์ที่ต้องใช้ | วิธี setup | Mode |
|---------|---------------|-----------|------|
| **Claude.ai (Projects)** | `claude-project-system-prompt.md` | Copy → Project Instructions | Sandbox + Full |
| **Claude Code** | `../CLAUDE.md` | อัตโนมัติ (auto-read) | Full |
| **Cursor / Windsurf** | `../.cursorrules` | อัตโนมัติ (auto-read) | Full |
| **Figma Make** | MCP Connector | Connectors → Sellsuki DS | Full |
| **v0 (Vercel)** | `v0-system-prompt.md` | Copy → prefix prompt | Sandbox |
| **Google AI Studio** | `google-ai-studio-prompt.md` | Copy → System Instructions | Sandbox |
| **Firebase Studio (IDX)** | `firebase-studio-airules.md` | Copy → `.idx/airules.md` | Full |
| **Bolt.new** | `bolt-lovable-prompt.md` | Copy → prefix prompt | Full |
| **Lovable** | `bolt-lovable-prompt.md` | Copy → Knowledge / initial prompt | Full |
| **Relume** | `relume-prompt.md` | Style Guide + prompt prefix | Sandbox |
| **Any tool** | `sellsuki-design-tokens.json` | Upload as reference file | Both |

## Files in this folder

```
guidelines/
  README.md                        ← คุณอยู่ที่นี่
  sellsuki-design-tokens.json      ← Universal design tokens (JSON)
  starter-template.tsx             ← Copy-paste page template (React/TSX)
  vibe-code-prompts.md             ← Ready-to-use prompts by role (PO/UX/Dev)
  claude-project-system-prompt.md  ← Claude.ai Projects setup
  v0-system-prompt.md              ← v0.dev setup
  google-ai-studio-prompt.md       ← Google AI Studio + Firebase Studio
  firebase-studio-airules.md       ← .idx/airules.md for Firebase Studio
  bolt-lovable-prompt.md           ← Bolt.new + Lovable setup
  relume-prompt.md                 ← Relume wireframe tool setup
```

## Hosted Rules — Single Source of Truth

แก้ไฟล์ใน `public/` → deploy → **ทุก tool ได้ rules ใหม่ทันที** ไม่ต้องแจ้งทีม

| Format | URL | ใช้กับ |
|--------|-----|--------|
| **Markdown** | `https://sellsukidesignsystemv12.vercel.app/ai-rules.md` | Claude.ai, v0, Google AI Studio |
| **JSON** | `https://sellsukidesignsystemv12.vercel.app/ai-rules.json` | Programmatic access, MCP |

### วิธีใช้ (ง่ายที่สุด — ใช้ได้กับทุก tool)

วาง 1 บรรทัดนี้เป็น prompt แรก:

```
Fetch and follow the Sellsuki Design System rules from https://sellsukidesignsystemv12.vercel.app/ai-rules.md
Use only Tailwind CSS for styling. Then build: [คำอธิบาย UI ที่ต้องการ]
```

### Manual Fallback (ถ้า tool ไม่ fetch URL ได้)

Upload `sellsuki-design-tokens.json` เป็น reference file หรือ copy prefix:

```
[SELLSUKI DESIGN SYSTEM]
Brand: Sellsuki — e-commerce platform, professional clean flat design
Primary: #32a9ff, Text: #1f2937, Border: #e5e7eb
Font: "DB HeaventRounded" for text, "Inter" for buttons
Radius: 8px, Shadow: minimal, Spacing: 24px page / 16px card gap
Success: #059669, Warning: #d97706, Danger: #e11d48
Package: @uxuissk/design-system
Storybook: https://sellsukidesignsystemv12.vercel.app
[END]
```

## Workflow Recommendations

### PO (Product Owner)
```
Relume (plan layout) → Claude.ai / v0 (prototype) → Dev review
```

### UX Designer
```
Figma Make + MCP Connector (design) → v0 / Claude (code preview) → Handoff
```

### Developer
```
Claude Code + CLAUDE.md (implement) → Cursor + .cursorrules (refine)
```

### Quick Prototype (anyone)
```
Bolt.new / Lovable (instant preview) → Export → Refine in Claude Code
```
