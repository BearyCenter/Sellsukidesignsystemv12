import React, { useState, useCallback } from "react";
import { Layers, ChevronRight, FileText, User, Settings, Package, Zap } from "lucide-react";
import { SearchField, type SearchSize } from "../components/ds-search";
import { CodeBlock } from "../components/code-block";
import { useI18n } from "../i18n";

const fontLabel: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" };

function Section({ title, description, children, code }: { title: string; description?: string; children: React.ReactNode; code?: string }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-foreground">{title}</h4>
        {description && <p className="text-muted-foreground mt-0.5" style={fontLabel}>{description}</p>}
      </div>
      {children}
      {code && <CodeBlock code={code} />}
    </div>
  );
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <span className="uppercase tracking-wider text-muted-foreground block" style={{ fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.75)", fontWeight: "var(--weight-label)" }}>{label}</span>
      {children}
    </div>
  );
}

const allSuggestions = [
  { id: "1", label: "Getting Started", description: "Quick start guide", icon: <FileText size={14} /> },
  { id: "2", label: "User Management", description: "Manage team members", icon: <User size={14} /> },
  { id: "3", label: "Settings", description: "App configuration", icon: <Settings size={14} /> },
  { id: "4", label: "Package Registry", description: "Manage packages", icon: <Package size={14} /> },
  { id: "5", label: "Performance", description: "Speed optimization", icon: <Zap size={14} /> },
];

export function SearchShowcase() {
  const { t } = useI18n();
  const [searchVal, setSearchVal] = useState("");
  const [suggestions, setSuggestions] = useState(allSuggestions);
  const [asyncVal, setAsyncVal] = useState("");
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [asyncSuggestions, setAsyncSuggestions] = useState<typeof allSuggestions>([]);

  const handleSearch = useCallback((q: string) => {
    if (!q.trim()) { setSuggestions(allSuggestions); return; }
    setSuggestions(allSuggestions.filter((s) => s.label.toLowerCase().includes(q.toLowerCase())));
  }, []);

  const handleAsync = useCallback((q: string) => {
    setAsyncVal(q);
    if (!q.trim()) { setAsyncSuggestions([]); setAsyncLoading(false); return; }
    setAsyncLoading(true);
    setTimeout(() => {
      setAsyncSuggestions(allSuggestions.filter((s) => s.label.toLowerCase().includes(q.toLowerCase())));
      setAsyncLoading(false);
    }, 600);
  }, []);

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.search.title")}</span>
        </div>
        <h1 className="text-foreground">{t("page.search.title")}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontLabel}>
          {t("page.search.desc")}
        </p>
      </div>

      <Section title="Variants" description="Three visual styles." code={`<SearchField variant="default" placeholder="Search..." />
<SearchField variant="outlined" placeholder="Search..." />
<SearchField variant="filled" placeholder="Search..." />`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
          <DemoCard label="Default"><SearchField variant="default" placeholder="Default search..." /></DemoCard>
          <DemoCard label="Outlined"><SearchField variant="outlined" placeholder="Outlined search..." /></DemoCard>
          <DemoCard label="Filled"><SearchField variant="filled" placeholder="Filled search..." /></DemoCard>
        </div>
      </Section>

      <Section title="Sizes" description="Three sizes for different layouts." code={`<SearchField size="sm" />
<SearchField size="md" />
<SearchField size="lg" />`}>
        <div className="space-y-4 max-w-md">
          <DemoCard label="Small"><SearchField size="sm" placeholder="Small search..." /></DemoCard>
          <DemoCard label="Medium"><SearchField size="md" placeholder="Medium search..." /></DemoCard>
          <DemoCard label="Large"><SearchField size="lg" placeholder="Large search..." /></DemoCard>
        </div>
      </Section>

      <Section title="With Suggestions" description="Dropdown suggestions with icon and description. Type to filter." code={`<SearchField
  suggestions={results}
  onSuggestionSelect={(s) => console.log(s)}
  onSearch={handleSearch}
/>`}>
        <div className="max-w-md">
          <SearchField
            value={searchVal}
            onChange={(v) => { setSearchVal(v); handleSearch(v); }}
            suggestions={searchVal ? suggestions : []}
            onSuggestionSelect={(s) => { setSearchVal(s.label); setSuggestions([]); }}
            placeholder="Search documentation..."
          />
        </div>
      </Section>

      <Section title="Async / Debounced" description="Debounced search with loading state (600ms simulated delay)." code={`<SearchField
  loading={loading}
  debounce={300}
  onSearch={handleAsyncSearch}
  suggestions={asyncResults}
/>`}>
        <div className="max-w-md">
          <SearchField
            value={asyncVal}
            onChange={handleAsync}
            loading={asyncLoading}
            suggestions={asyncSuggestions}
            onSuggestionSelect={(s) => { setAsyncVal(s.label); setAsyncSuggestions([]); }}
            placeholder="Search with debounce..."
          />
        </div>
      </Section>

      <Section title="Disabled" description="Non-interactive state." code={`<SearchField disabled placeholder="Search disabled..." />`}>
        <div className="max-w-md">
          <SearchField disabled placeholder="Search disabled..." />
        </div>
      </Section>
    </div>
  );
}