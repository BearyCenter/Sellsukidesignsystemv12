import React, { useState } from "react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { FilterBar, type FilterBarValue } from "../../lib/components/ds-filterbar";

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

const CATEGORY_OPTIONS = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Food & Drink", value: "food" },
  { label: "Home & Garden", value: "home" },
];

const WAREHOUSE_OPTIONS = [
  { label: "Bangkok", value: "bkk" },
  { label: "Chiang Mai", value: "cnx" },
  { label: "Phuket", value: "hkt" },
];

export function FilterBarShowcase() {
  const [value1, setValue1] = useState<FilterBarValue>({ filters: {} });
  const [value2, setValue2] = useState<FilterBarValue>({ filters: {} });

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.filterbar.title" descKey="page.filterbar.desc" />

      <Section title="With Search & Filters" description="Search field combined with single and multi-select filter dropdowns." code={`<FilterBar
  showSearch
  searchPlaceholder="Search products..."
  filters={[
    { key: "status", label: "Status", type: "single", options: [...] },
    { key: "category", label: "Category", type: "multi", options: [...] },
  ]}
  onFilterChange={setValue}
/>`}>
        <DemoBox>
          <div className="space-y-3">
            <FilterBar
              showSearch
              searchPlaceholder="Search products..."
              filters={[
                { key: "status", label: "Status", type: "single", options: STATUS_OPTIONS },
                { key: "category", label: "Category", type: "multi", options: CATEGORY_OPTIONS },
                { key: "warehouse", label: "Warehouse", type: "multi", options: WAREHOUSE_OPTIONS },
              ]}
              value={value1}
              onFilterChange={setValue1}
            />
            {(value1.search || Object.values(value1.filters).some(Boolean)) && (
              <div className="text-muted-foreground" style={fontLabel}>
                Active filters:{" "}
                <code className="text-primary">{JSON.stringify(value1)}</code>
              </div>
            )}
          </div>
        </DemoBox>
      </Section>

      <Section title="Filters Only" description="Dropdown filters without a search field." code={`<FilterBar
  filters={[
    { key: "status", label: "Status", type: "single", options: [...] },
  ]}
  onFilterChange={setValue}
/>`}>
        <DemoBox>
          <FilterBar
            filters={[
              { key: "status", label: "Status", type: "single", options: STATUS_OPTIONS },
              { key: "warehouse", label: "Warehouse", type: "multi", options: WAREHOUSE_OPTIONS },
            ]}
            value={value2}
            onFilterChange={setValue2}
          />
        </DemoBox>
      </Section>

      <Section title="Search Only" description="Search field without filter dropdowns." code={`<FilterBar showSearch searchPlaceholder="Search..." />`}>
        <DemoBox>
          <FilterBar showSearch searchPlaceholder="Search orders by ID, product, or customer..." />
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "filters", type: "FilterConfig[]", def: "[]", desc: "Filter dropdown definitions" },
        { prop: "showSearch", type: "boolean", def: "false", desc: "Show search input field" },
        { prop: "searchPlaceholder", type: "string", def: '"Search..."', desc: "Search field placeholder" },
        { prop: "value", type: "FilterBarValue", def: "—", desc: "Controlled value (search + filters)" },
        { prop: "onFilterChange", type: "(value: FilterBarValue) => void", def: "—", desc: "Called on any filter or search change" },
        { prop: "filters[].key", type: "string", def: "—", desc: "Unique filter identifier" },
        { prop: "filters[].label", type: "string", def: "—", desc: "Dropdown button label" },
        { prop: "filters[].type", type: '"single" | "multi"', def: "—", desc: "Single or multi-select" },
        { prop: "filters[].options", type: "FilterOption[]", def: "—", desc: "Available filter options" },
      ]} />
    </div>
  );
}
