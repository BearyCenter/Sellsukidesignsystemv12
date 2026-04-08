# Hardcode Log

> Auto-generated on 2026-04-08 by `node scripts/check-hardcodes.mjs`  
> Review these entries and create DS tokens or mark as accepted exceptions.

## ✅ Design Exception — ยืนยันแล้ว ไม่ต้องสร้าง token

| File | Line | Code | เหตุผล |
|---|---|---|---|
| `src/lib/svelte/ui/Heading.svelte` | 28 | `.h1 { font-size: var(--text-h1-app); font-weight: 400; }` | App-scale H1: DS spec is 48px but Svelte app uses 36px for layout density */ |
| `src/lib/svelte/ui/Heading.svelte` | 31 | `.h3 { font-size: var(--text-h3-app); font-weight: 700; }` | App-scale H3: DS spec is 28px but Svelte app uses 22px */ |

