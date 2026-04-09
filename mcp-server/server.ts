import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { components, componentCategories } from "./data/components.js";
import { colorPalette, typography, spacing, borderRadius, semanticColors, elevation, darkMode } from "./data/tokens.js";
import { brandIdentity, doRules, dontRules, layoutPatterns, buttonSystem, quickStartTemplate, resources } from "./data/brand-rules.js";
import { withLog } from "./logger.js";

// ─── Contract loader helpers ─────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// __dirname = mcp-server/dist → go up twice to reach repo root → contracts/
const contractsRoot = join(__dirname, "../..", "contracts");

function loadContract(filePath: string): Record<string, unknown> {
  try {
    const abs = join(contractsRoot, filePath);
    return JSON.parse(readFileSync(abs, "utf-8"));
  } catch {
    return { error: `Contract not found: ${filePath}` };
  }
}

function loadContractRegistry(): Record<string, unknown> {
  return loadContract("meta/index.json");
}

function loadChangelog(): Record<string, unknown> {
  return loadContract("meta/changelog.json");
}

export function createServer(): McpServer {
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
    async ({ category }) => withLog("list_components", { category: category ?? "all" }, async () => {
      const filterCat = category === "all" ? undefined : category;

      const grouped: Record<string, string[]> = {};
      for (const [name, comp] of Object.entries(components)) {
        if (filterCat && comp.category !== filterCat) continue;
        const catLabel = componentCategories[comp.category];
        if (!grouped[catLabel]) grouped[catLabel] = [];
        grouped[catLabel].push(`${name} — ${comp.description}`);
      }

      let text = `# Sellsuki Design System — Components${filterCat ? ` (${componentCategories[filterCat]})` : ""}\n\n`;
      text += `Package: \`npm install @uxuissk/design-system@latest\`\n`;
      text += `Total: ${Object.values(components).filter(c => !filterCat || c.category === filterCat).length} components\n\n`;
      text += `> ⚠️ **Always import CSS first** — without this, fonts and tokens will NOT work:\n`;
      text += `> \`import "@uxuissk/design-system/styles.css";\` (at app root, before any component)\n\n`;

      for (const [cat, items] of Object.entries(grouped)) {
        text += `## ${cat}\n`;
        for (const item of items) {
          text += `- ${item}\n`;
        }
        text += "\n";
      }

      return { content: [{ type: "text", text }] };
    })
  );

  // ─── Tool: get_component ─────────────────────────────────────────────────────

  server.tool(
    "get_component",
    "Get detailed info about a specific component including props, example code, and import statement",
    {
      name: z.string().describe("Component name (e.g. DSButton, Modal, Dropdown, Badge)"),
    },
    async ({ name }) => withLog("get_component", { name }, async () => {
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
      text += `> ⚠️ **CSS import required** — fonts and all design tokens (size, color, spacing) will NOT work without this line at your app root:\n`;
      text += `> \`\`\`tsx\n> import "@uxuissk/design-system/styles.css";\n> \`\`\`\n> Add this **before** any component import. Missing this = tiny/wrong fonts, broken colors.\n\n`;
      text += `**Category:** ${componentCategories[comp.category]}\n`;
      text += `**Description:** ${comp.description}\n\n`;
      text += `## Import\n\`\`\`tsx\n// 1. CSS FIRST — required for tokens (fonts, colors, spacing)\nimport "@uxuissk/design-system/styles.css";\n\n// 2. Components\nimport { ${comp.imports.join(", ")} } from "@uxuissk/design-system";\n\`\`\`\n\n`;
      text += `## Props\n\n`;
      text += `| Prop | Type | Default | Description |\n`;
      text += `|------|------|---------|-------------|\n`;
      for (const prop of comp.props) {
        text += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.default ? `\`${prop.default}\`` : "—"} | ${prop.description} |\n`;
      }
      text += `\n## Example\n\`\`\`tsx\n${comp.example}\n\`\`\`\n`;

      return { content: [{ type: "text", text }] };
    })
  );

  // ─── Tool: get_design_tokens ─────────────────────────────────────────────────

  server.tool(
    "get_design_tokens",
    "Get design tokens for a specific category: typography, spacing, radius, elevation, or colors",
    {
      category: z.enum(["typography", "spacing", "radius", "elevation", "colors", "dark-mode", "all"]).describe("Token category"),
    },
    async ({ category }) => withLog("get_design_tokens", { category }, async () => {
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
    })
  );

  // ─── Tool: get_color_palette ─────────────────────────────────────────────────

  server.tool(
    "get_color_palette",
    "Get the complete color palette with all ramps: brand (Sky), neutral (Gray), success (Emerald), warning (Amber), danger (Rose), secondary (Orange)",
    {
      palette: z.enum(["brand", "neutral", "success", "warning", "danger", "secondary", "all"]).optional().describe("Specific palette (default: all)"),
    },
    async ({ palette }) => withLog("get_color_palette", { palette: palette ?? "all" }, async () => {
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
    })
  );

  // ─── Tool: get_brand_rules ───────────────────────────────────────────────────

  server.tool(
    "get_brand_rules",
    "Get the DO and DON'T rules for generating UI with Sellsuki Design System, including brand identity and layout patterns",
    {},
    async () => withLog("get_brand_rules", {}, async () => {
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
    })
  );

  // ─── Tool: get_quick_start ───────────────────────────────────────────────────

  server.tool(
    "get_quick_start",
    "Get the quick-start code template for setting up a new page with Sellsuki Design System",
    {},
    async () => withLog("get_quick_start", {}, async () => {
      let text = "# Quick Start — Sellsuki Design System\n\n";
      text += `## Install\n\`\`\`bash\nnpm install @uxuissk/design-system@latest\n\`\`\`\n\n`;
      text += `## ⚠️ CRITICAL: CSS Import (Step 1 — Do NOT skip)\n\n`;
      text += `The CSS file contains **all design tokens**: font sizes, colors, spacing, border-radius.\n`;
      text += `**Without it**: fonts render at wrong sizes (too small/large), colors are broken, components look unstyled.\n\n`;
      text += `\`\`\`tsx\n// main.tsx or App.tsx — MUST be the very first import\nimport "@uxuissk/design-system/styles.css";\n\`\`\`\n\n`;
      text += `**Font rule**: DB HeaventRounded is used for ALL text — headings, body, buttons, badges, nav.\n`;
      text += `Minimum font size in the system: **14px** (\`var(--text-caption)\`). Nothing should be smaller.\n\n`;
      text += `## Template\n\`\`\`tsx\n${quickStartTemplate}\n\`\`\`\n\n`;
      text += `## Links\n`;
      text += `- **Storybook**: ${resources.storybook}\n`;
      text += `- **Preview**: ${resources.preview}\n`;
      text += `- **Figma**: ${resources.figma}\n`;

      return { content: [{ type: "text", text }] };
    })
  );

  // ─── Tool: generate_page_layout ──────────────────────────────────────────────

  server.tool(
    "generate_page_layout",
    "Generate a page layout code scaffold using Sellsuki DS components based on a description",
    {
      description: z.string().describe("Description of the page (e.g. 'order list page with table, search, and pagination')"),
      includeLayout: z.boolean().optional().describe("Include TopNavbar + Sidebar layout (default: true)"),
    },
    async ({ description, includeLayout = true }) => withLog("generate_page_layout", { description, includeLayout }, async () => {
      const desc = description.toLowerCase();

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

      if (!suggested.includes("DSButton")) suggested.push("DSButton");

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
      text += `> ⚠️ **CSS import is line 1 of the generated code — do NOT remove it.**\n`;
      text += `> \`import "@uxuissk/design-system/styles.css"\` loads all tokens: fonts (DB HeaventRounded), colors, spacing.\n`;
      text += `> Without it: fonts default to browser size (~16px unstyled), colors and spacing break.\n\n`;
      text += `**Description:** ${description}\n\n`;
      text += `**Suggested Components:** ${suggested.join(", ")}\n\n`;
      text += `\`\`\`tsx\n${code}\`\`\`\n\n`;
      text += `## Next Steps\n`;
      text += `1. ✅ CSS import is already included — keep it as the first line\n`;
      text += `2. Fill in the TODO sections with actual component usage\n`;
      text += `3. Add loading state with \`<Skeleton />\` or \`<Spinner />\`\n`;
      text += `4. Add empty state with \`<EmptyState />\`\n`;
      text += `5. Add error handling with \`<Alert />\`\n`;

      return { content: [{ type: "text", text }] };
    })
  );

  // ─── Tool: suggest_components ───────────────────────────────────────────────

  server.tool(
    "suggest_components",
    "Given a feature description, suggest the best Sellsuki DS components to use — includes layout, data entry, display, and feedback components",
    {
      feature: z.string().describe("Feature description (e.g. 'order list page with filters', 'product edit form', 'dashboard with charts')"),
    },
    async ({ feature }) => withLog("suggest_components", { feature }, async () => {
      const f = feature.toLowerCase();
      const suggestions: { component: string; reason: string }[] = [];

      // Layout
      suggestions.push({ component: "FeaturePageScaffold", reason: "Use as page layout engine — pick the right layout prop" });

      if (f.includes("list") || f.includes("table") || f.includes("order") || f.includes("product")) {
        suggestions.push({ component: "AdvancedDataTable", reason: "Server-side pagination, sort, bulk actions, expandable rows" });
        suggestions.push({ component: "PageHeader", reason: "Page title + primary action + breadcrumbs" });
        suggestions.push({ component: "FilterBar", reason: "Search + multi-filter bar" });
        suggestions.push({ component: "ThumbnailCell", reason: "Image+title+SKU in table rows" });
        suggestions.push({ component: "Badge", reason: "Status labels (Pending, Shipped, etc.)" });
        suggestions.push({ component: "Pagination", reason: "Table pagination footer" });
      }

      if (f.includes("form") || f.includes("edit") || f.includes("create") || f.includes("add")) {
        suggestions.push({ component: "DSInput", reason: "Text input with showCount, validation states" });
        suggestions.push({ component: "DSTextarea", reason: "Multi-line with character count" });
        suggestions.push({ component: "Dropdown", reason: "Select / dropdown" });
        suggestions.push({ component: "Switch", reason: "Toggle boolean settings" });
        suggestions.push({ component: "RepeatableFieldList", reason: "Dynamic add/remove rows (variants, line items)" });
        suggestions.push({ component: "RichTextEditor", reason: "Product description, campaign content" });
      }

      if (f.includes("detail") || f.includes("view")) {
        suggestions.push({ component: "Card", reason: "Content sections (CardHeader + CardBody)" });
        suggestions.push({ component: "Timeline", reason: "Activity/status history" });
        suggestions.push({ component: "Divider", reason: "Section dividers" });
      }

      if (f.includes("dashboard") || f.includes("analytics") || f.includes("report") || f.includes("chart")) {
        suggestions.push({ component: "StatCard", reason: "KPI metric cards with trend" });
        suggestions.push({ component: "LineChart", reason: "Revenue/order trends over time" });
        suggestions.push({ component: "BarChart", reason: "Channel/category comparisons" });
        suggestions.push({ component: "DonutChart", reason: "Distribution (status, segments)" });
        suggestions.push({ component: "AreaChart", reason: "Trend with filled area" });
        suggestions.push({ component: "MiniSparkline", reason: "Inline sparkline in stat cards" });
        suggestions.push({ component: "DateRangePicker", reason: "Period selection (today/7d/30d/custom)" });
      }

      if (f.includes("wizard") || f.includes("step") || f.includes("onboard")) {
        suggestions.push({ component: "Stepper", reason: "Multi-step progress indicator" });
        suggestions.push({ component: "ChoiceCard", reason: "Selection step (delivery, plan, etc.)" });
      }

      if (f.includes("setting") || f.includes("config") || f.includes("preference")) {
        suggestions.push({ component: "ScaffoldSection", reason: "Settings section with title + description" });
        suggestions.push({ component: "Switch", reason: "Toggle preferences" });
      }

      if (f.includes("image") || f.includes("gallery") || f.includes("media") || f.includes("photo")) {
        suggestions.push({ component: "ImageGallery", reason: "Grid gallery with lightbox, select, upload" });
        suggestions.push({ component: "FileUpload", reason: "Drag-drop file upload" });
      }

      if (f.includes("payment") || f.includes("shipping") || f.includes("delivery") || f.includes("method")) {
        suggestions.push({ component: "RadioCard", reason: "Payment/shipping method selection cards" });
      }

      if (f.includes("date") || f.includes("time") || f.includes("schedule") || f.includes("booking")) {
        suggestions.push({ component: "DatePicker", reason: "Single date selection" });
        suggestions.push({ component: "DateRangePicker", reason: "Date range with presets" });
        suggestions.push({ component: "TimePicker", reason: "Time selection" });
        suggestions.push({ component: "DateTimePicker", reason: "Combined date+time" });
      }

      // Always suggest feedback
      suggestions.push({ component: "Skeleton", reason: "Loading state placeholder" });
      suggestions.push({ component: "EmptyState", reason: "No data state" });
      suggestions.push({ component: "Alert", reason: "Error/warning/info messages" });
      suggestions.push({ component: "toast", reason: "Success/error notifications" });
      suggestions.push({ component: "DSButton", reason: "Action buttons (max 1 primary per view)" });

      // Determine layout type
      let layout = "list";
      if (f.includes("detail") || f.includes("view")) layout = "detail";
      else if (f.includes("setting") || f.includes("config")) layout = "settings";
      else if (f.includes("wizard") || f.includes("step") || f.includes("onboard")) layout = "wizard";
      else if (f.includes("dashboard") || f.includes("overview")) layout = "dashboard";
      else if (f.includes("form") || f.includes("edit") || f.includes("create")) layout = "form";
      else if (f.includes("report") || f.includes("analytics")) layout = "report";

      let text = `# Component Suggestions for: "${feature}"\n\n`;
      text += `**Recommended layout:** \`<FeaturePageScaffold layout="${layout}" />\`\n\n`;
      text += `## Components\n\n`;
      text += `| Component | Why |\n|-----------|-----|\n`;
      const seen = new Set<string>();
      for (const s of suggestions) {
        if (seen.has(s.component)) continue;
        seen.add(s.component);
        text += `| \`${s.component}\` | ${s.reason} |\n`;
      }
      text += `\n## Import\n\`\`\`tsx\nimport "@uxuissk/design-system/styles.css";\nimport {\n  ${[...seen].join(",\n  ")},\n} from "@uxuissk/design-system";\n\`\`\`\n`;

      return { content: [{ type: "text", text }] };
    })
  );

  // ─── Tool: get_page_pattern ─────────────────────────────────────────────────

  server.tool(
    "get_page_pattern",
    "Get a complete page pattern template for a specific layout type — includes all regions, states (loading/empty/error), and recommended components",
    {
      layout: z.enum(["list", "detail", "settings", "wizard", "dashboard", "form", "report"]).describe("Page layout type"),
    },
    async ({ layout }) => withLog("get_page_pattern", { layout }, async () => {
      const patterns: Record<string, { title: string; description: string; regions: string[]; states: string[]; code: string }> = {
        list: {
          title: "List Page",
          description: "Table/grid of items — most common (Orders, Products, Customers)",
          regions: ["header (PageHeader)", "stats (StatCard grid)", "filters (FilterBar)", "content (AdvancedDataTable)", "footer (Pagination)"],
          states: ["loading → Skeleton rows", "empty → EmptyState", "error → Alert", "filtered-empty → 'No results for filters'"],
          code: `import "@uxuissk/design-system/styles.css";
import {
  FeaturePageScaffold, PageHeader, FilterBar, AdvancedDataTable,
  StatCard, Pagination, DSButton, Skeleton, EmptyState, Alert,
} from "@uxuissk/design-system";

export default function ListPage() {
  const { data, loading, error, pagination } = useApiData();

  return (
    <FeaturePageScaffold
      layout="list"
      header={
        <PageHeader
          title="Orders"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Orders" }]}
          primaryAction={{ label: "Create order", icon: <Plus size={16} /> }}
        />
      }
      stats={
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total" value={stats.total} trend={stats.trend} />
        </div>
      }
      filters={<FilterBar filters={filterConfig} value={filters} onChange={setFilters} />}
      content={
        loading ? <Skeleton variant="table" rows={8} /> :
        error ? <Alert variant="error">{error}</Alert> :
        data.length === 0 ? <EmptyState title="No orders yet" /> :
        <AdvancedDataTable columns={columns} data={data} pagination={pagination} onPageChange={setPage} />
      }
      footer={!loading && data.length > 0 && <Pagination {...pagination} onChange={setPage} />}
    />
  );
}`,
        },
        detail: {
          title: "Detail Page",
          description: "Item detail with main content and side panel (Order detail, Product view)",
          regions: ["header (PageHeader)", "main (Cards, sections)", "aside (Summary, customer info, status)"],
          states: ["loading → Skeleton cards", "error → Alert", "not-found → EmptyState"],
          code: `<FeaturePageScaffold
  layout="detail"
  header={<PageHeader title="Order #1234" breadcrumbs={[...]} secondaryActions={[...]} />}
  main={
    <div className="space-y-4">
      <Card><CardHeader>Items</CardHeader><CardBody>...</CardBody></Card>
      <Card><CardHeader>Shipping</CardHeader><CardBody>...</CardBody></Card>
    </div>
  }
  aside={
    <div className="space-y-4">
      <Card><CardHeader>Summary</CardHeader><CardBody>...</CardBody></Card>
      <Card><CardHeader>Customer</CardHeader><CardBody>...</CardBody></Card>
    </div>
  }
/>`,
        },
        settings: {
          title: "Settings Page",
          description: "Stacked sections with forms (Store settings, Notification prefs)",
          regions: ["header (PageHeader)", "sections (ScaffoldSection × N)"],
          states: ["loading → Skeleton sections", "save-error → toast error"],
          code: `<FeaturePageScaffold
  layout="settings"
  header={<PageHeader title="Settings" />}
  sections={
    <div className="space-y-10">
      <ScaffoldSection title="General" description="Store info">
        <DSInput label="Store name" ... />
      </ScaffoldSection>
      <Divider />
      <ScaffoldSection title="Notifications" action={<DSButton variant="ghost">Reset</DSButton>}>
        <Switch label="New order" ... />
      </ScaffoldSection>
    </div>
  }
/>`,
        },
        wizard: {
          title: "Wizard Page",
          description: "Multi-step form with stepper and sticky action bar",
          regions: ["header (PageHeader)", "stepper (Stepper)", "form (Card with fields)", "actions (sticky bar: Cancel + Next)"],
          states: ["step-loading → Skeleton", "validation-error → FormError", "submit-loading → Button loading"],
          code: `<FeaturePageScaffold
  layout="wizard"
  header={<PageHeader title="Add Product" />}
  stepper={<Stepper steps={steps} currentStep={step} />}
  form={
    <Card><CardHeader>Step {step} — {steps[step].label}</CardHeader>
      <CardBody>...</CardBody>
    </Card>
  }
  actions={
    <>
      <DSButton variant="ghost" onClick={prev}>Back</DSButton>
      <DSButton variant="primary" onClick={next}>Next</DSButton>
    </>
  }
/>`,
        },
        dashboard: {
          title: "Dashboard Page",
          description: "KPI cards + charts + optional table",
          regions: ["header (PageHeader)", "kpis (ScaffoldKPIRow + StatCard)", "primaryChart (2/3 wide)", "secondaryCharts (1/3 sidebar)", "content (table)"],
          states: ["loading → Skeleton cards + chart placeholders", "error → Alert"],
          code: `<FeaturePageScaffold
  layout="dashboard"
  header={<PageHeader title="Dashboard" />}
  kpis={
    <ScaffoldKPIRow>
      <StatCard title="Revenue" value="฿284K" trend={{ value: 12, direction: "up" }} />
      <StatCard title="Orders" value="1,284" />
    </ScaffoldKPIRow>
  }
  primaryChart={<Card><CardBody><AreaChart series={revenueSeries} smooth /></CardBody></Card>}
  secondaryCharts={
    <>
      <Card><CardBody><DonutChart data={statusData} /></CardBody></Card>
      <Card><CardBody><BarChart series={channelData} /></CardBody></Card>
    </>
  }
  content={<AdvancedDataTable ... />}
/>`,
        },
        form: {
          title: "Form Page",
          description: "Single form with sticky save/cancel bar (Edit product, Create campaign)",
          regions: ["header (PageHeader)", "form (Cards with inputs)", "actions (sticky bar: Discard + Save)"],
          states: ["loading → Skeleton form", "submit-loading → Button loading", "validation-error → FormError per field"],
          code: `<FeaturePageScaffold
  layout="form"
  header={<PageHeader title="Edit Product" breadcrumbs={[...]} />}
  form={
    <div className="space-y-6">
      <Card><CardHeader>Basic info</CardHeader><CardBody>
        <DSInput label="Name" required ... />
        <DSTextarea label="Description" showCharCount maxLength={500} />
      </CardBody></Card>
      <Card><CardHeader>Pricing</CardHeader><CardBody>
        <DSInput label="Price" prefix="฿" />
      </CardBody></Card>
    </div>
  }
  actions={
    <>
      <DSButton variant="ghost">Discard</DSButton>
      <DSButton variant="primary" loading={saving}>Save changes</DSButton>
    </>
  }
/>`,
        },
        report: {
          title: "Report Page",
          description: "Analytics page: stats + date range + charts + data table",
          regions: ["header (PageHeader + Export)", "stats (StatCard grid)", "dateRange (DateRangePicker)", "charts (full-width chart)", "secondaryCharts (3-col grid)", "table (AdvancedDataTable)"],
          states: ["loading → Skeleton", "no-data → EmptyState", "error → Alert"],
          code: `<FeaturePageScaffold
  layout="report"
  header={<PageHeader title="Sales Report" primaryAction={{ label: "Export CSV", variant: "outline" }} />}
  stats={<div className="grid grid-cols-2 lg:grid-cols-4 gap-4"><StatCard ... /></div>}
  dateRange={<DateRangePicker presets={["today","last7","last30","thisMonth","custom"]} />}
  charts={<Card><CardBody><LineChart series={revenueSeries} smooth /></CardBody></Card>}
  secondaryCharts={<><Card>...</Card><Card>...</Card><Card>...</Card></>}
  table={<AdvancedDataTable ... />}
/>`,
        },
      };

      const pattern = patterns[layout];
      let text = `# Page Pattern: ${pattern.title}\n\n`;
      text += `**Description:** ${pattern.description}\n\n`;
      text += `## Regions\n`;
      for (const r of pattern.regions) text += `- ${r}\n`;
      text += `\n## Required States\n`;
      for (const s of pattern.states) text += `- ${s}\n`;
      text += `\n## Code Template\n\`\`\`tsx\n${pattern.code}\n\`\`\`\n`;

      return { content: [{ type: "text", text }] };
    })
  );

  // ─── Tool: get_feature_template ─────────────────────────────────────────────

  server.tool(
    "get_feature_template",
    "Generate a complete feature page code template with API hooks, loading/empty/error states, and the recommended FeaturePageScaffold layout",
    {
      feature: z.string().describe("Feature name (e.g. 'order list', 'product detail', 'analytics dashboard')"),
      product: z.enum(["sellsuki", "patona", "sukispace", "shipmunk", "akita"]).optional().describe("Product (affects brand config)"),
    },
    async ({ feature, product = "sellsuki" }) => withLog("get_feature_template", { feature, product }, async () => {
      const f = feature.toLowerCase();

      let layout = "list";
      if (f.includes("detail") || f.includes("view")) layout = "detail";
      else if (f.includes("setting")) layout = "settings";
      else if (f.includes("wizard") || f.includes("step")) layout = "wizard";
      else if (f.includes("dashboard") || f.includes("overview")) layout = "dashboard";
      else if (f.includes("form") || f.includes("edit") || f.includes("create")) layout = "form";
      else if (f.includes("report") || f.includes("analytics")) layout = "report";

      const brandImport = `${product}BrandConfig`;
      const titleCase = feature.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
      const componentName = titleCase.replace(/\s+/g, "");

      let code = `// ─── ${titleCase} Page ─────────────────────────────────────\n\n`;
      code += `import "@uxuissk/design-system/styles.css";\n`;
      code += `import { useState, useEffect } from "react";\n`;
      code += `import {\n`;
      code += `  FeaturePageScaffold,\n  PageHeader,\n  DSButton,\n`;
      code += `  Skeleton,\n  EmptyState,\n  Alert,\n  toast,\n  ToastContainer,\n`;
      code += `  useAppShell,\n  useBreadcrumbs,\n`;

      if (layout === "list") code += `  AdvancedDataTable,\n  FilterBar,\n  StatCard,\n  Pagination,\n  Badge,\n  ThumbnailCell,\n`;
      if (layout === "detail") code += `  Card,\n  CardHeader,\n  CardBody,\n  Divider,\n  Badge,\n  Timeline,\n`;
      if (layout === "settings") code += `  ScaffoldSection,\n  DSInput,\n  Switch,\n  Divider,\n`;
      if (layout === "wizard") code += `  Stepper,\n  Card,\n  CardHeader,\n  CardBody,\n  DSInput,\n  DSTextarea,\n`;
      if (layout === "dashboard") code += `  ScaffoldKPIRow,\n  StatCard,\n  Card,\n  CardHeader,\n  CardBody,\n  AreaChart,\n  DonutChart,\n  BarChart,\n`;
      if (layout === "form") code += `  Card,\n  CardHeader,\n  CardBody,\n  DSInput,\n  DSTextarea,\n  Dropdown,\n`;
      if (layout === "report") code += `  StatCard,\n  Card,\n  CardHeader,\n  CardBody,\n  LineChart,\n  BarChart,\n  DonutChart,\n  DateRangePicker,\n  AdvancedDataTable,\n`;

      code += `} from "@uxuissk/design-system";\n\n`;

      code += `// ─── API Hook (replace with real implementation) ─────────────\n`;
      code += `function use${componentName}Data() {\n`;
      code += `  const [data, setData] = useState<any[]>([]);\n`;
      code += `  const [loading, setLoading] = useState(true);\n`;
      code += `  const [error, setError] = useState<string | null>(null);\n\n`;
      code += `  useEffect(() => {\n`;
      code += `    // TODO: Replace with real API call\n`;
      code += `    const timer = setTimeout(() => {\n`;
      code += `      setData([]); // Replace with fetched data\n`;
      code += `      setLoading(false);\n`;
      code += `    }, 600);\n`;
      code += `    return () => clearTimeout(timer);\n`;
      code += `  }, []);\n\n`;
      code += `  return { data, loading, error, refetch: () => {} };\n`;
      code += `}\n\n`;

      code += `// ─── Page Component ──────────────────────────────────────────\n`;
      code += `export default function ${componentName}Page() {\n`;
      code += `  const { data, loading, error } = use${componentName}Data();\n`;
      code += `  useBreadcrumbs([{ label: "Home", href: "/" }, { label: "${titleCase}" }]);\n\n`;
      code += `  return (\n`;
      code += `    <FeaturePageScaffold\n      layout="${layout}"\n`;
      code += `      header={\n        <PageHeader\n          title="${titleCase}"\n          breadcrumbs={[{ label: "Home", href: "/" }, { label: "${titleCase}" }]}\n`;
      code += `          primaryAction={{ label: "TODO: Primary Action" }}\n        />\n      }\n`;

      if (layout === "list") {
        code += `      content={\n`;
        code += `        loading ? <Skeleton variant="table" rows={8} /> :\n`;
        code += `        error ? <Alert variant="error">{error}</Alert> :\n`;
        code += `        data.length === 0 ? <EmptyState title="No data yet" action={{ label: "Create", onClick: () => {} }} /> :\n`;
        code += `        <AdvancedDataTable columns={[]} data={data} />\n`;
        code += `      }\n`;
      } else if (layout === "detail") {
        code += `      main={\n        loading ? <Skeleton variant="card" /> :\n`;
        code += `        <div className="space-y-4"><Card><CardHeader>Details</CardHeader><CardBody>TODO</CardBody></Card></div>\n      }\n`;
        code += `      aside={\n        <div className="space-y-4"><Card><CardHeader>Info</CardHeader><CardBody>TODO</CardBody></Card></div>\n      }\n`;
      } else if (layout === "form") {
        code += `      form={\n        <div className="space-y-6">\n`;
        code += `          <Card><CardHeader>Information</CardHeader><CardBody>\n`;
        code += `            <div className="space-y-4">\n              <DSInput label="Name" required />\n              <DSTextarea label="Description" showCharCount maxLength={500} />\n`;
        code += `            </div>\n          </CardBody></Card>\n        </div>\n      }\n`;
        code += `      actions={\n        <>\n          <DSButton variant="ghost">Cancel</DSButton>\n          <DSButton variant="primary">Save</DSButton>\n        </>\n      }\n`;
      } else {
        code += `      content={loading ? <Skeleton /> : <div>TODO: Build ${layout} content</div>}\n`;
      }

      code += `    />\n  );\n}\n`;

      let text = `# Feature Template: ${titleCase}\n\n`;
      text += `**Layout:** \`${layout}\`  |  **Product:** ${product}\n\n`;
      text += `## Complete Code\n\`\`\`tsx\n${code}\n\`\`\`\n\n`;
      text += `## Checklist\n`;
      text += `- [ ] Replace mock API hook with real implementation\n`;
      text += `- [ ] Add loading state (Skeleton) ✅ included\n`;
      text += `- [ ] Add empty state (EmptyState) ✅ included\n`;
      text += `- [ ] Add error state (Alert) ✅ included\n`;
      text += `- [ ] Connect to AppShellProvider via useBreadcrumbs ✅ included\n`;
      text += `- [ ] Ensure max 1 primary button per view\n`;
      text += `- [ ] Test responsive (375/768/1280px)\n`;

      return { content: [{ type: "text", text }] };
    })
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
          "FONT: DB HeaventRounded — ALL text (body, button, label, heading, badge, nav — NEVER Inter)",
          "H1: 48px | H2: 40px | H3: 28px | H4: 24px | Body: 20px | Label: 18px | Button/Badge: 18px | Caption: 14px",
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

  // ─── Tool: get_contract ──────────────────────────────────────────────────────

  server.tool(
    "get_contract",
    "Get a Sellsuki governance contract by ID. Returns the full machine-readable contract including rules, forbidden patterns, AI behavior, and compliance checklist.",
    {
      contract_id: z.enum([
        "sellsuki.appshell.canonical",
        "sellsuki.brand.structure",
        "sellsuki.vibecode.rules",
      ]).describe("Contract identifier to retrieve"),
      section: z.enum(["all", "rules", "ai_behavior", "compliance_checklist", "tokens", "shell", "brand"]).optional().describe("Return only a specific section (default: all)"),
    },
    async ({ contract_id, section }) => withLog("get_contract", { contract_id, section }, async () => {
      const fileMap: Record<string, string> = {
        "sellsuki.appshell.canonical": "appshell.contract.json",
        "sellsuki.brand.structure": "brand-structure.contract.json",
        "sellsuki.vibecode.rules": "vibe-code.contract.json",
      };

      const contract = loadContract(fileMap[contract_id]);
      if ("error" in contract) {
        return { content: [{ type: "text", text: `Error: ${contract.error}` }] };
      }

      const payload = (section && section !== "all")
        ? { contract_id: contract.contract_id, version: contract.version, [section]: (contract as Record<string, unknown>)[section] }
        : contract;

      return {
        content: [{
          type: "text",
          text: JSON.stringify(payload, null, 2),
        }],
      };
    })
  );

  // ─── Tool: list_contracts ─────────────────────────────────────────────────────

  server.tool(
    "list_contracts",
    "List all approved Sellsuki governance contracts from the contract registry",
    {},
    async () => withLog("list_contracts", {}, async () => {
      const registry = loadContractRegistry() as {
        contracts?: Array<{ contract_id: string; type: string; status: string; summary: string; latest_approved_version: string; mcp_uri: string }>;
      };
      const contracts = registry.contracts ?? [];

      let text = "# Sellsuki MCP Contracts\n\n";
      text += "Machine-readable governance contracts for AppShell, brand structure, and AI/vibe coding.\n\n";
      for (const c of contracts) {
        text += `## ${c.contract_id} v${c.latest_approved_version}\n`;
        text += `- **Type:** ${c.type}\n`;
        text += `- **Status:** ${c.status}\n`;
        text += `- **Summary:** ${c.summary}\n`;
        text += `- **MCP URI:** \`${c.mcp_uri}\`\n\n`;
      }

      return { content: [{ type: "text", text }] };
    })
  );

  // ─── Tool: get_contract_changelog ────────────────────────────────────────────

  server.tool(
    "get_contract_changelog",
    "Get the Sellsuki contract changelog — tracks all contract versions, changes, and migration impact",
    {},
    async () => withLog("get_contract_changelog", {}, async () => {
      const changelog = loadChangelog();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(changelog, null, 2),
        }],
      };
    })
  );

  // ─── Resources: sellsuki://contracts/* ───────────────────────────────────────

  server.resource(
    "contract-appshell",
    "sellsuki://contracts/appshell",
    async () => ({
      contents: [{
        uri: "sellsuki://contracts/appshell",
        mimeType: "application/json",
        text: JSON.stringify(loadContract("appshell.contract.json"), null, 2),
      }],
    })
  );

  server.resource(
    "contract-brand-structure",
    "sellsuki://contracts/brand-structure",
    async () => ({
      contents: [{
        uri: "sellsuki://contracts/brand-structure",
        mimeType: "application/json",
        text: JSON.stringify(loadContract("brand-structure.contract.json"), null, 2),
      }],
    })
  );

  server.resource(
    "contract-vibe-code",
    "sellsuki://contracts/vibe-code",
    async () => ({
      contents: [{
        uri: "sellsuki://contracts/vibe-code",
        mimeType: "application/json",
        text: JSON.stringify(loadContract("vibe-code.contract.json"), null, 2),
      }],
    })
  );

  server.resource(
    "contract-changelog",
    "sellsuki://contracts/changelog",
    async () => ({
      contents: [{
        uri: "sellsuki://contracts/changelog",
        mimeType: "application/json",
        text: JSON.stringify(loadChangelog(), null, 2),
      }],
    })
  );

  server.resource(
    "contract-registry",
    "sellsuki://contracts/registry",
    async () => ({
      contents: [{
        uri: "sellsuki://contracts/registry",
        mimeType: "application/json",
        text: JSON.stringify(loadContractRegistry(), null, 2),
      }],
    })
  );

  return server;
}
