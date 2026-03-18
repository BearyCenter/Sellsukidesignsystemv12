# Sellsuki Design System — AI Tool Setup Guides

> ไฟล์ในโฟลเดอร์นี้ช่วยให้ทุก AI tool สร้าง UI ที่มี mood & tone เดียวกับ Sellsuki

## Quick Start — เลือก tool ที่ใช้

| AI Tool | ไฟล์ที่ต้องใช้ | วิธี setup |
|---------|---------------|-----------|
| **Claude Code** | `../CLAUDE.md` | อัตโนมัติ (auto-read) |
| **Cursor / Windsurf** | `../.cursorrules` | อัตโนมัติ (auto-read) |
| **Claude.ai (Projects)** | `claude-project-system-prompt.md` | Copy → Project Instructions |
| **Figma Make** | MCP Connector | Connectors → Sellsuki DS |
| **v0 (Vercel)** | `v0-system-prompt.md` | Copy → prefix prompt |
| **Google AI Studio** | `google-ai-studio-prompt.md` | Copy → System Instructions |
| **Firebase Studio (IDX)** | `firebase-studio-airules.md` | Copy → `.idx/airules.md` |
| **Bolt.new** | `bolt-lovable-prompt.md` | Copy → prefix prompt |
| **Lovable** | `bolt-lovable-prompt.md` | Copy → Knowledge / initial prompt |
| **Relume** | `relume-prompt.md` | Style Guide + prompt prefix |
| **Any tool** | `sellsuki-design-tokens.json` | Upload as reference file |

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

## Universal Approach (ใช้ได้กับทุก tool)

ถ้า tool ไหนไม่มี guide เฉพาะ ให้:

1. **Upload** `sellsuki-design-tokens.json` เป็น reference file
2. **Copy** prefix prompt ด้านล่างวางก่อน prompt จริง:

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
