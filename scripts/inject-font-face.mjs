// scripts/inject-font-face.mjs
// Post-build: inject @font-face declarations into dist CSS
// Runs AFTER vite build to avoid Tailwind CSS base64-inlining fonts

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const CSS_PATH = join(ROOT, 'dist', 'sellsuki-ds.css');

if (!existsSync(CSS_PATH)) {
  console.error('❌ dist/sellsuki-ds.css not found — run vite build first');
  process.exit(1);
}

const FONT_FACE = `
/* ═══════════════════════════════════════════════════════════════════════════
   @font-face — DB HeaventRounded (Sellsuki brand font)
   Auto-loaded when consumer imports "@uxuissk/design-system/styles.css"
   Font files: dist/fonts/*.woff2
   ═══════════════════════════════════════════════════════════════════════════ */

@font-face {
  font-family: 'DB HeaventRounded';
  src: url('./fonts/DBHeaventRounded-Regular.woff2') format('woff2'),
       url('./fonts/DBHeaventRounded-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DB HeaventRounded';
  src: url('./fonts/DBHeaventRounded-Med.woff2') format('woff2'),
       url('./fonts/DBHeaventRounded-Med.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DB HeaventRounded';
  src: url('./fonts/DBHeaventRounded-Bold.woff2') format('woff2'),
       url('./fonts/DBHeaventRounded-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DB HeaventRounded';
  src: url('./fonts/DBHeaventRounded-Black.woff2') format('woff2'),
       url('./fonts/DBHeaventRounded-Black.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
`;

const css = readFileSync(CSS_PATH, 'utf8');

// Prepend @font-face so fonts load first
writeFileSync(CSS_PATH, FONT_FACE + css);

const sizeKB = (readFileSync(CSS_PATH).length / 1024).toFixed(1);
console.log(`✅ @font-face injected into dist/sellsuki-ds.css (${sizeKB} KB)`);
