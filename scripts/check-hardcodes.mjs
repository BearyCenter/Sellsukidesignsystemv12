// scripts/check-hardcodes.mjs
// Auto-generates HARDCODE_LOG.md from stylelint-disable comments in Svelte files
// Run: node scripts/check-hardcodes.mjs

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const SVELTE_DIR = join(ROOT, 'src/lib/svelte');
const OUTPUT = join(ROOT, 'HARDCODE_LOG.md');

const TAGS = ['[PENDING TOKEN]', '[DESIGN EXCEPTION]', '[THIRD PARTY]'];

function walkDir(dir) {
  const entries = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) entries.push(...walkDir(full));
    else if (name.endsWith('.svelte')) entries.push(full);
  }
  return entries;
}

const files = walkDir(SVELTE_DIR);
const log = { '[PENDING TOKEN]': [], '[DESIGN EXCEPTION]': [], '[THIRD PARTY]': [], UNKNOWN: [] };

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('stylelint-disable')) continue;
    const match = line.match(/--\s*(\[.+?\])\s*(.*)/);
    const tag = match?.[1] ?? 'UNKNOWN';
    const reason = match?.[2]?.trim() ?? line.trim();
    const rel = relative(ROOT, file).replace(/\\/g, '/');
    const nextLine = lines[i + 1]?.trim() ?? '';
    const bucket = TAGS.includes(tag) ? tag : 'UNKNOWN';
    log[bucket].push({ file: rel, line: i + 2, reason, code: nextLine });
  }
}

const date = new Date().toISOString().slice(0, 10);
let md = `# Hardcode Log\n\n> Auto-generated on ${date} by \`node scripts/check-hardcodes.mjs\`  \n> Review these entries and create DS tokens or mark as accepted exceptions.\n\n`;

const sections = {
  '[PENDING TOKEN]': '## 🟡 Pending Token — รอ DS Center สร้าง token',
  '[DESIGN EXCEPTION]': '## ✅ Design Exception — ยืนยันแล้ว ไม่ต้องสร้าง token',
  '[THIRD PARTY]': '## 🔵 Third Party — มาจาก lib ภายนอก ควบคุมไม่ได้',
  UNKNOWN: '## ❓ Unknown — ไม่มี tag ที่รู้จัก ต้องระบุเหตุผล'
};

for (const [tag, heading] of Object.entries(sections)) {
  const items = log[tag];
  if (!items.length) continue;
  md += `${heading}\n\n`;
  md += `| File | Line | Code | เหตุผล |\n|---|---|---|---|\n`;
  for (const { file, line, code, reason } of items) {
    md += `| \`${file}\` | ${line} | \`${code}\` | ${reason} |\n`;
  }
  md += '\n';
}

if (Object.values(log).every(a => !a.length)) {
  md += '_ไม่มี hardcode ที่ถูก disable — ✅ ทุกค่าใช้ DS tokens_\n';
}

writeFileSync(OUTPUT, md);
console.log(`✅ HARDCODE_LOG.md generated (${Object.values(log).flat().length} entries)`);
