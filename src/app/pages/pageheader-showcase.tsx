import React from "react";
import { PageHeader as ShowcasePageHeader, Section, DemoBox, APITable } from "./_showcase-factory";
import { PageHeader } from "../../lib/components/ds-pageheader";
import { DSButton } from "../../lib/components/ds-button";
import { Breadcrumb } from "../../lib/components/ds-breadcrumb";
import { Tabs } from "../../lib/components/ds-tabs";

export function PageHeaderShowcase() {
  return (
    <div className="space-y-14">
      <ShowcasePageHeader titleKey="page.pageheader.title" descKey="page.pageheader.desc" />

      <Section title="Basic" description="Title, subtitle, and action buttons." code={`<PageHeader
  title="Product List"
  subtitle="Manage your store's product catalog"
  actions={<DSButton>Add Product</DSButton>}
/>`}>
        <DemoBox className="!p-0 overflow-hidden">
          <PageHeader
            title="Product List"
            subtitle="Manage your store's product catalog"
            actions={
              <>
                <DSButton variant="outline">Export</DSButton>
                <DSButton>Add Product</DSButton>
              </>
            }
          />
        </DemoBox>
      </Section>

      <Section title="With Breadcrumb" description="Breadcrumb navigation above the title." code={`<PageHeader
  title="SKU-001"
  breadcrumb={<Breadcrumb items={[...]} />}
  actions={<DSButton>Edit</DSButton>}
/>`}>
        <DemoBox className="!p-0 overflow-hidden">
          <PageHeader
            title="Wireless Headphones Pro"
            subtitle="SKU-001 · Electronics"
            breadcrumb={
              <Breadcrumb items={[
                { label: "Products", href: "#" },
                { label: "Electronics", href: "#" },
                { label: "Wireless Headphones Pro" },
              ]} />
            }
            actions={
              <>
                <DSButton variant="outline">Duplicate</DSButton>
                <DSButton>Edit Product</DSButton>
              </>
            }
          />
        </DemoBox>
      </Section>

      <Section title="With Tabs" description="Tab navigation anchored to the page header bottom edge." code={`<PageHeader
  title="Orders"
  tabs={<Tabs tabs={[...]} />}
/>`}>
        <DemoBox className="!p-0 overflow-hidden">
          <PageHeader
            title="Orders"
            subtitle="24 orders this month"
            actions={<DSButton>Create Order</DSButton>}
            tabs={
              <Tabs
                tabs={[
                  { id: "all", label: "All Orders" },
                  { id: "pending", label: "Pending" },
                  { id: "shipped", label: "Shipped" },
                  { id: "completed", label: "Completed" },
                ]}
                activeTab="all"
                onChange={() => {}}
              />
            }
          />
        </DemoBox>
      </Section>

      <Section title="Sticky Mode" description="Header sticks to top when scrolling." code={`<PageHeader title="Inventory" sticky />`}>
        <DemoBox className="!p-0 overflow-hidden">
          <div className="h-32 overflow-y-auto relative">
            <PageHeader
              title="Inventory Management"
              subtitle="Stock levels across all warehouses"
              sticky
              actions={<DSButton size="sm">Sync</DSButton>}
            />
            <div className="p-4 space-y-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="h-8 rounded bg-muted/30" />
              ))}
            </div>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "title", type: "string", def: "—", desc: "Main page title (required)" },
        { prop: "subtitle", type: "string", def: "—", desc: "Secondary description below title" },
        { prop: "breadcrumb", type: "ReactNode", def: "—", desc: "Breadcrumb component above title" },
        { prop: "actions", type: "ReactNode", def: "—", desc: "Action buttons — right-aligned" },
        { prop: "tabs", type: "ReactNode", def: "—", desc: "Tab navigation at bottom of header" },
        { prop: "sticky", type: "boolean", def: "false", desc: "Stick to top while scrolling" },
      ]} />
    </div>
  );
}
