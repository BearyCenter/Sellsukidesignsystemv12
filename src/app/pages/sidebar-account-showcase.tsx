import React, { useState } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, smallLabel } from "./_showcase-factory";
import { SidebarAccountSwitcher } from "../../lib/components/ds-sidebar-account";
import type { SidebarAccountItem } from "../../lib/components/ds-sidebar-account";

/* ─── Mock data ─────────────────────────────────────────────────────────────── */

const COMPANIES: SidebarAccountItem[] = [
  { id: "1", name: "Sellsuki Company", handle: "@sellsuki", avatarFallback: "S" },
  { id: "2", name: "Baby & Mom", handle: "@babymom", avatarFallback: "B" },
  { id: "3", name: "Multy's Shop", handle: "@multy", avatarFallback: "M" },
];

const BRANCHES: SidebarAccountItem[] = [
  { id: "b1", name: "สาขา รัชดาภิเษก" },
  { id: "b2", name: "สาขา สีลม" },
  { id: "b3", name: "สาขา อโศก" },
];

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function SidebarAccountShowcase() {
  const [company, setCompany] = useState(COMPANIES[0]);
  const [branch] = useState(BRANCHES[0]);

  const [company2, setCompany2] = useState(COMPANIES[0]);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.sidebar-account.title" descKey="page.sidebar-account.desc" />

      {/* Basic Usage */}
      <Section
        title="Basic Usage"
        description="Shows the active company with branch sub-label. Clicking opens a dropdown to switch accounts."
        code={`<SidebarAccountSwitcher
  company={company}
  branch={branch}
  companies={companies}
  onCompanyChange={setCompany}
/>`}
      >
        <DemoBox>
          <div className="max-w-[280px]">
            <SidebarAccountSwitcher
              company={company}
              branch={branch}
              companies={COMPANIES}
              onCompanyChange={setCompany}
            />
          </div>
        </DemoBox>
      </Section>

      {/* Company Only (no branch) */}
      <Section
        title="Company Only"
        description="Without branch — shows only the company name."
        code={`<SidebarAccountSwitcher
  company={company}
  companies={companies}
  onCompanyChange={setCompany}
/>`}
      >
        <DemoBox>
          <div className="max-w-[280px]">
            <SidebarAccountSwitcher
              company={company2}
              companies={COMPANIES}
              onCompanyChange={setCompany2}
            />
          </div>
        </DemoBox>
      </Section>

      {/* Collapsed Mode */}
      <Section
        title="Collapsed Mode"
        description="When the sidebar is collapsed, shows only the avatar icon."
        code={`<SidebarAccountSwitcher
  company={company}
  companies={companies}
  collapsed
/>`}
      >
        <DemoBox>
          <div className="flex items-center gap-8">
            <DemoCard label="Collapsed">
              <SidebarAccountSwitcher
                company={company}
                companies={COMPANIES}
                collapsed
              />
            </DemoCard>
            <DemoCard label="No company (fallback)">
              <SidebarAccountSwitcher
                companies={COMPANIES}
                collapsed
              />
            </DemoCard>
          </div>
        </DemoBox>
      </Section>

      {/* In Sidebar Context */}
      <Section
        title="In Sidebar Context"
        description="How it appears inside the Sidebar at the top — the typical integration pattern."
        code={`// Inside your Sidebar top section:
<div style={{ padding: "12px" }}>
  <SidebarAccountSwitcher
    company={activeCompany}
    branch={activeBranch}
    companies={allCompanies}
    onCompanyChange={handleCompanySwitch}
  />
</div>`}
      >
        <DemoBox className="p-0 overflow-hidden">
          <div
            style={{
              width: 280,
              background: "var(--sidebar-bg, var(--background))",
              borderRight: "1px solid var(--border)",
            }}
          >
            {/* Simulated sidebar header */}
            <div className="p-3 border-b border-border">
              <SidebarAccountSwitcher
                company={company}
                branch={branch}
                companies={COMPANIES}
                onCompanyChange={setCompany}
              />
            </div>
            {/* Simulated nav items */}
            <div className="p-3 space-y-1">
              {["Products", "Orders", "Customers", "Reports"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius)] text-muted-foreground"
                  style={fontLabel}
                >
                  <div className="w-4 h-4 rounded bg-muted" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </DemoBox>
      </Section>

      {/* No Account */}
      <Section
        title="Empty / No Account"
        description="Fallback when no company is passed — shows placeholder state."
        code={`<SidebarAccountSwitcher companies={companies} />`}
      >
        <DemoBox>
          <div className="max-w-[280px]">
            <SidebarAccountSwitcher companies={COMPANIES} />
          </div>
        </DemoBox>
      </Section>

      <APITable
        rows={[
          { prop: "company", type: "SidebarAccountItem", def: "—", desc: "Active company shown in trigger" },
          { prop: "branch", type: "SidebarAccountItem", def: "—", desc: "Active branch shown as sub-label" },
          { prop: "provider", type: "SidebarAccountItem", def: "—", desc: "Active provider (alternative to branch)" },
          { prop: "companies", type: "SidebarAccountItem[]", def: "[]", desc: "List of companies to switch to" },
          { prop: "branches", type: "SidebarAccountItem[]", def: "[]", desc: "List of branches" },
          { prop: "providers", type: "SidebarAccountItem[]", def: "[]", desc: "List of providers" },
          { prop: "onCompanyChange", type: "(item) => void", def: "—", desc: "Called when user selects a company" },
          { prop: "onBranchChange", type: "(item) => void", def: "—", desc: "Called when user selects a branch" },
          { prop: "onProviderChange", type: "(item) => void", def: "—", desc: "Called when user selects a provider" },
          { prop: "collapsed", type: "boolean", def: "false", desc: "Icon-only collapsed mode" },
        ]}
      />

      {/* SidebarAccountItem type */}
      <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
        <div className="px-5 py-3 bg-muted/30 border-b border-border">
          <span className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "700" }}>
            SidebarAccountItem Type
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/20 border-b border-border">
                <th className="text-left px-4 py-2 text-muted-foreground" style={smallLabel}>Field</th>
                <th className="text-left px-4 py-2 text-muted-foreground" style={smallLabel}>Type</th>
                <th className="text-left px-4 py-2 text-muted-foreground" style={smallLabel}>Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { field: "id", type: "string", desc: "Unique identifier" },
                { field: "name", type: "string", desc: "Display name" },
                { field: "handle", type: "string?", desc: 'Sub-label e.g. "@sellsuki"' },
                { field: "avatarUrl", type: "string?", desc: "Image URL — shown as circular avatar" },
                { field: "avatarFallback", type: "string?", desc: "Initials fallback when no avatarUrl" },
              ].map((r) => (
                <tr key={r.field}>
                  <td className="px-4 py-2"><code className="text-primary" style={smallLabel}>{r.field}</code></td>
                  <td className="px-4 py-2"><code className="text-foreground" style={smallLabel}>{r.type}</code></td>
                  <td className="px-4 py-2 text-muted-foreground" style={smallLabel}>{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
