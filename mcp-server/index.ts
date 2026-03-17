#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { components, componentCategories } from "./data/components.js";
import { colorPalette, typography, spacing, borderRadius, semanticColors, elevation, darkMode } from "./data/tokens.js";
import { brandIdentity, doRules, dontRules, layoutPatterns, buttonSystem, quickStartTemplate, resources } from "./data/brand-rules.js";

// ─── Server ──────────────────────────────────────────────────────────────────

const server = new McpServer({
  name: "sellsuki-design-system",
  version: "1.0.0",
  description: "Sellsuki Design System v1.2 MCP Server — provides component info, design tokens, brand rules, and code generation for @uxuissk/design-system",
});

// ─── Tool: list_components ───────────────────────────────────────────────────

server.tool(
  "list_components",
  "List all 41 components in the Sellsuki Design System, optionally filtered by category",
  {
    category: z.enum(["form", "display", "navigation", "feedback", "layout", "all"]).optional().describe("Filter by category (default: all)"),
  },
  async ({ category }) => {
    const filterCat = category === "all" ? undefined : category;

    const grouped: Record<string, string[]> = {};
    for (const [name, comp] of Object.entries(components)) {
      if (filterCat && comp.category !== filterCat) continue;
      const catLabel = componentCategories[comp.category];
      if (!grouped[catLabel]) grouped[catLabel] = [];
      grouped[catLabel].push(`${name} — ${comp.description}`);
    }

    let text = `# Sellsuki Design System — Components${filterCat ? ` (${componentCategories[filterCat]})` : ""}\n\n`;
    text += `Package: \`npm install @uxuissk/design-system\`\n`;
    text += `Total: ${Object.values(components).filter(c => !filterCat || c.category === filterCat).length} components\n\n`;

    for (const [cat, items] of Object.entries(grouped)) {
      text += `## ${cat}\n`;
      for (const item of items) {
        text += `- ${item}\n`;
      }
      text += "\n";
    }

    return { content: [{ type: "text", text }] };
  }
);

// ─── Tool: get_component ─────────────────────────────────────────────────────

server.tool(
  "get_component",
  "Get detailed info about a specific component including props, example code, and import statement",
  {
    name: z.string().describe("Component name (e.g. DSButton, Modal, Dropdown, Badge)"),
  },
  async ({ name }) => {
    // Fuzzy match: try exact, then case-insensitive, then partial
    let comp = components[name];
    if (!comp) {
      const lower = name.toLowerCase();
      const key = Object.keys(components).find(
        k => k.toLowerCase() === lower || k.toLowerCase().includes(lower) || components[k].displayName.toLowerCase() === lower
      );
      if (key) comp = components[key];
    }

    if (!comp) {
      return {
        content: [{
          type: "text",
          text: `Component "${name}" not found.\n\nAvailable components: ${Object.keys(components).join(", ")}`,
        }],
      };
    }

    let text = `# ${comp.displayName} (${comp.name})\n\n`;
    text += `**Category:** ${componentCategories[comp.category]}\n`;
    text += `**Description:** ${comp.description}\n\n`;
    text += `## Import\n\`\`\`tsx\nimport { ${comp.imports.join(", ")} } from "@uxuissk/design-system";\n\`\`\`\n\n`;
    text += `## Props\n\n`;
    text += `| Prop | Type | Default | Description |\n`;
    text += `|------|------|---------|-------------|\n`;
    for (const prop of comp.props) {
      text += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.default ? `\`${prop.default}\`` : "—"} | ${prop.description} |\n`;
    }
    text += `\n## Example\n\`\`\`tsx\n${comp.example}\n\`\`\`\n`;

    return { content: [{ type: "text", text }] };
  }
);

// ─── Tool: get_design_tokens ─────────────────────────────────────────────────

server.tool(
  "get_design_tokens",
  "Get design tokens for a specific category: typography, spacing, radius, elevation, or colors",
  {
    category: z.enum(["typography", "spacing", "radius", "elevation", "colors", "dark-mode", "all"]).describe("Token category"),
  },
  async ({ category }) => {
    let text = `# Sellsuki Design Tokens`;
    if (category !== "all") text += ` — ${category}`;
    text += "\n\n";

    if (category === "typography" || category === "all") {
      text += "## Typography\n\n### Font Families\n";
      text += "| Usage | Font | Notes |\n|-------|------|-------|\n";
      for (const f of typography.families) {
        text += `| ${f.usage} | \`${f.font}\` | ${f.notes} |\n`;
      }
      text += "\n### Type Scale\n";
      text += "| Token | Size | Weight | Usage |\n|-------|------|--------|-------|\n";
      for (const t of typography.scale) {
        text += `| \`${t.token}\` | ${t.size} | ${t.weight} | ${t.usage} |\n`;
      }
      text += "\n";
    }

    if (category === "spacing" || category === "all") {
      text += "## Spacing\n\n### Base Scale\n";
      text += "| Token | Value |\n|-------|-------|\n";
      for (const s of spacing.base) {
        text += `| \`${s.token}\` | ${s.value} |\n`;
      }
      text += "\n### Semantic Spacing\n";
      for (const [k, v] of Object.entries(spacing.semantic)) {
        text += `- **${k}**: ${v}\n`;
      }
      text += "\n";
    }

    if (category === "radius" || category === "all") {
      text += "## Border Radius\n";
      text += "| Token | Value |\n|-------|-------|\n";
      for (const r of borderRadius) {
        text += `| \`${r.token}\` | ${r.value} |\n`;
      }
      text += "\n";
    }

    if (category === "elevation" || category === "all") {
      text += `## Elevation\n\n- **elevation-sm**: \`${elevation.sm}\`\n- ${elevation.note}\n\n`;
    }

    if (category === "colors" || category === "all") {
      text += "## Semantic Colors\n\n### Backgrounds\n";
      text += "| Token | Resolves To | Hex |\n|-------|-------------|-----|\n";
      for (const c of semanticColors.backgrounds) {
        text += `| \`${c.token}\` | ${c.resolves} | \`${c.hex}\` |\n`;
      }
      text += "\n### Text\n";
      text += "| Token | Resolves To | Hex |\n|-------|-------------|-----|\n";
      for (const c of semanticColors.text) {
        text += `| \`${c.token}\` | ${c.resolves} | \`${c.hex}\` |\n`;
      }
      text += "\n### Strokes / Borders\n";
      text += "| Token | Resolves To | Hex |\n|-------|-------------|-----|\n";
      for (const c of semanticColors.strokes) {
        text += `| \`${c.token}\` | ${c.resolves} | \`${c.hex}\` |\n`;
      }
      text += "\n";
    }

    if (category === "dark-mode" || category === "all") {
      text += `## Dark Mode\n\n${darkMode.description}\n\n`;
      text += "| Token | Light | Dark |\n|-------|-------|------|\n";
      for (const m of darkMode.mappings) {
        text += `| \`${m.token}\` | \`${m.light}\` | \`${m.dark}\` |\n`;
      }
      text += "\n";
    }

    return { content: [{ type: "text", text }] };
  }
);

// ─── Tool: get_color_palette ─────────────────────────────────────────────────

server.tool(
  "get_color_palette",
  "Get the complete color palette with all ramps: brand (Sky), neutral (Gray), success (Emerald), warning (Amber), danger (Rose), secondary (Orange)",
  {
    palette: z.enum(["brand", "neutral", "success", "warning", "danger", "secondary", "all"]).optional().describe("Specific palette (default: all)"),
  },
  async ({ palette }) => {
    const show = palette === "all" || !palette
      ? Object.entries(colorPalette)
      : Object.entries(colorPalette).filter(([k]) => k === palette);

    let text = "# Sellsuki Color Palette\n\n";
    for (const [, pal] of show) {
      text += `## ${pal.name}\n`;
      text += "| Token | Hex | Usage |\n|-------|-----|-------|\n";
      for (const c of pal.colors) {
        text += `| \`${c.token}\` | \`${c.hex}\` | ${c.usage} |\n`;
      }
      text += "\n";
    }

    return { content: [{ type: "text", text }] };
  }
);

// ─── Tool: get_brand_rules ───────────────────────────────────────────────────

server.tool(
  "get_brand_rules",
  "Get the DO and DON'T rules for generating UI with Sellsuki Design System, including brand identity and layout patterns",
  {},
  async () => {
    let text = "# Sellsuki Brand & Design Rules\n\n";
    text += "## Brand Identity\n";
    for (const [k, v] of Object.entries(brandIdentity)) {
      text += `- **${k}**: ${v}\n`;
    }

    text += "\n## DO ✓\n";
    for (const rule of doRules) {
      text += `1. ${rule}\n`;
    }

    text += "\n## DON'T ✗\n";
    for (const rule of dontRules) {
      text += `1. ${rule}\n`;
    }

    text += "\n## Layout Patterns\n";
    for (const [k, v] of Object.entries(layoutPatterns)) {
      text += `- **${k}**: ${v}\n`;
    }

    text += "\n## Button System\n\n### Variants\n";
    text += "| Variant | BG | Border | Text | Hover |\n|---------|-----|--------|------|-------|\n";
    for (const v of buttonSystem.variants) {
      text += `| \`${v.variant}\` | ${v.bg} | ${v.border} | ${v.text} | ${v.hover} |\n`;
    }

    text += "\n### Sizes\n";
    text += "| Size | Height |\n|------|--------|\n";
    for (const s of buttonSystem.sizes) {
      text += `| \`${s.size}\` | ${s.height} |\n`;
    }

    text += "\n## Resources\n";
    for (const [k, v] of Object.entries(resources)) {
      text += `- **${k}**: ${v}\n`;
    }

    return { content: [{ type: "text", text }] };
  }
);

// ─── Tool: get_quick_start ───────────────────────────────────────────────────

server.tool(
  "get_quick_start",
  "Get the quick-start code template for setting up a new page with Sellsuki Design System",
  {},
  async () => {
    let text = "# Quick Start — Sellsuki Design System\n\n";
    text += `## Install\n\`\`\`bash\nnpm install @uxuissk/design-system\n\`\`\`\n\n`;
    text += `## Template\n\`\`\`tsx\n${quickStartTemplate}\n\`\`\`\n\n`;
    text += `## Links\n`;
    text += `- **Storybook**: ${resources.storybook}\n`;
    text += `- **Preview**: ${resources.preview}\n`;
    text += `- **Figma**: ${resources.figma}\n`;

    return { content: [{ type: "text", text }] };
  }
);

// ─── Tool: generate_page_layout ──────────────────────────────────────────────

server.tool(
  "generate_page_layout",
  "Generate a page layout code scaffold using Sellsuki DS components based on a description",
  {
    description: z.string().describe("Description of the page (e.g. 'order list page with table, search, and pagination')"),
    includeLayout: z.boolean().optional().describe("Include TopNavbar + Sidebar layout (default: true)"),
  },
  async ({ description, includeLayout = true }) => {
    const desc = description.toLowerCase();

    // Detect which components to suggest
    const suggested: string[] = [];
    if (desc.includes("table") || desc.includes("list") || desc.includes("data")) suggested.push("DSTable");
    if (desc.includes("form") || desc.includes("input") || desc.includes("field")) suggested.push("DSInput", "DSTextarea");
    if (desc.includes("search")) suggested.push("SearchField");
    if (desc.includes("filter") || desc.includes("select") || desc.includes("dropdown")) suggested.push("Dropdown");
    if (desc.includes("pagination") || desc.includes("page")) suggested.push("Pagination");
    if (desc.includes("modal") || desc.includes("dialog")) suggested.push("Modal");
    if (desc.includes("tab")) suggested.push("Tabs");
    if (desc.includes("card")) suggested.push("Card", "CardHeader", "CardBody", "CardFooter");
    if (desc.includes("badge") || desc.includes("status")) suggested.push("Badge");
    if (desc.includes("button") || desc.includes("action")) suggested.push("DSButton");
    if (desc.includes("upload") || desc.includes("image")) suggested.push("FileUpload");
    if (desc.includes("date") || desc.includes("calendar")) suggested.push("DatePicker");
    if (desc.includes("chart") || desc.includes("stat") || desc.includes("metric")) suggested.push("Statistic", "StatCard");
    if (desc.includes("step") || desc.includes("wizard")) suggested.push("Stepper");
    if (desc.includes("toast") || desc.includes("notification")) suggested.push("toast", "ToastContainer");
    if (desc.includes("empty")) suggested.push("EmptyState");
    if (desc.includes("loading") || desc.includes("skeleton")) suggested.push("Skeleton", "Spinner");
    if (desc.includes("breadcrumb")) suggested.push("Breadcrumb");

    // Always include common ones
    if (!suggested.includes("DSButton")) suggested.push("DSButton");

    // Layout components
    const layoutImports = includeLayout ? ["TopNavbar", "Sidebar"] : [];

    const allImports = [...new Set([...layoutImports, ...suggested])];

    let code = `import "@uxuissk/design-system/styles.css";\n`;
    code += `import {\n  ${allImports.join(",\n  ")},\n} from "@uxuissk/design-system";\n\n`;

    code += `// Page: ${description}\n`;
    code += `export default function Page() {\n`;

    if (includeLayout) {
      code += `  return (\n`;
      code += `    <div className="min-h-screen bg-[var(--background)]">\n`;
      code += `      <TopNavbar\n`;
      code += `        brand={{ name: "Sellsuki" }}\n`;
      code += `        breadcrumbs={[{ label: "Home" }, { label: "Page Title" }]}\n`;
      code += `        showSearch\n`;
      code += `        user={{ name: "User" }}\n`;
      code += `      />\n`;
      code += `      <div className="flex">\n`;
      code += `        <Sidebar\n`;
      code += `          brand={{ name: "Sellsuki" }}\n`;
      code += `          groups={[\n`;
      code += `            { label: "Menu", items: [\n`;
      code += `              { id: "page", label: "This Page" },\n`;
      code += `            ]},\n`;
      code += `          ]}\n`;
      code += `          activeItem="page"\n`;
      code += `        />\n`;
      code += `        <main className="flex-1 p-6">\n`;
      code += `          {/* TODO: Build your page content here */}\n`;
      code += `          {/* Suggested components: ${suggested.join(", ")} */}\n`;
      code += `        </main>\n`;
      code += `      </div>\n`;
      code += `    </div>\n`;
      code += `  );\n`;
    } else {
      code += `  return (\n`;
      code += `    <div className="p-6 space-y-6">\n`;
      code += `      {/* TODO: Build your content here */}\n`;
      code += `      {/* Suggested components: ${suggested.join(", ")} */}\n`;
      code += `    </div>\n`;
      code += `  );\n`;
    }

    code += `}\n`;

    let text = `# Generated Page Layout\n\n`;
    text += `**Description:** ${description}\n\n`;
    text += `**Suggested Components:** ${suggested.join(", ")}\n\n`;
    text += `\`\`\`tsx\n${code}\`\`\`\n\n`;
    text += `## Next Steps\n`;
    text += `1. Fill in the TODO sections with actual component usage\n`;
    text += `2. Add loading state with \`<Skeleton />\` or \`<Spinner />\`\n`;
    text += `3. Add empty state with \`<EmptyState />\`\n`;
    text += `4. Add error handling with \`<Alert />\`\n`;

    return { content: [{ type: "text", text }] };
  }
);

// ─── Resources ───────────────────────────────────────────────────────────────

server.resource(
  "component-list",
  "sellsuki://components",
  async () => ({
    contents: [{
      uri: "sellsuki://components",
      mimeType: "text/plain",
      text: Object.entries(components)
        .map(([name, c]) => `${name} (${componentCategories[c.category]}): ${c.description}`)
        .join("\n"),
    }],
  })
);

server.resource(
  "design-tokens-summary",
  "sellsuki://tokens",
  async () => ({
    contents: [{
      uri: "sellsuki://tokens",
      mimeType: "text/plain",
      text: [
        "PRIMARY: Sky-500 #32a9ff",
        "PRIMARY HOVER: Sky-600 #1b8bf5",
        "TEXT PRIMARY: Gray-800 #1f2937",
        "TEXT SECONDARY: Gray-500 #6b7280",
        "BORDER: Gray-200 #e5e7eb",
        "SUCCESS: Emerald-600 #059669",
        "WARNING: Amber-600 #d97706",
        "DANGER: Rose-600 #e11d48",
        "RADIUS DEFAULT: 8px (radius-md)",
        "SHADOW: 0px 1px 2px 0px #0000000d (minimal)",
        "FONT BODY: DB HeaventRounded",
        "FONT BUTTON: Inter",
      ].join("\n"),
    }],
  })
);

server.resource(
  "brand-rules-summary",
  "sellsuki://rules",
  async () => ({
    contents: [{
      uri: "sellsuki://rules",
      mimeType: "text/plain",
      text: [
        "SETUP: import '@uxuissk/design-system/styles.css' at root",
        "INSTALL: npm install @uxuissk/design-system",
        "",
        "DO:",
        ...doRules.map(r => `  ✓ ${r}`),
        "",
        "DON'T:",
        ...dontRules.map(r => `  ✗ ${r}`),
      ].join("\n"),
    }],
  })
);

// ─── Start ───────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
