import React from "react";
import { MoreHorizontal, Heart, Share2, ArrowRight, User, Settings } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";
import { Card, CardHeader, CardBody, CardFooter } from "../../lib/components/ds-card";
import { DSButton, IconButton } from "../../lib/components/ds-button";

export function CardShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.card.title" descKey="page.card.desc" />

      <Section title="Basic Card" description="Simple card with header, body, and footer slots." code={`<SskCard>\n  <SskCardHeader>Title</SskCardHeader>\n  <SskCardBody>Content</SskCardBody>\n  <SskCardFooter>Actions</SskCardFooter>\n</SskCard>`}>
        <DemoBox>
          <div className="max-w-sm">
            <Card>
              <CardHeader action={<IconButton icon={<MoreHorizontal size={16} />} variant="ghost" size="sm" aria-label="More options" />}>
                <span className="text-foreground block" style={fontLabelBold}>Project Overview</span>
                <span className="text-muted-foreground" style={smallLabel}>Last updated 2 hours ago</span>
              </CardHeader>
              <CardBody>
                <p className="text-muted-foreground" style={fontLabel}>
                  This card displays a summary of the current project status. Cards are the primary container for grouped content in the SSK Design System.
                </p>
              </CardBody>
              <CardFooter>
                <DSButton size="sm">View Details</DSButton>
                <DSButton variant="outline" size="sm">Dismiss</DSButton>
              </CardFooter>
            </Card>
          </div>
        </DemoBox>
      </Section>

      <Section title="Interactive Cards" description="Hover effects for clickable card patterns." code={`<SskCard hover>\n  <SskCardBody>Clickable content</SskCardBody>\n</SskCard>`}>
        <DemoBox>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <User size={20} />, title: "Users", value: "2,847", change: "+12%" },
              { icon: <Settings size={20} />, title: "Configurations", value: "156", change: "+3%" },
              { icon: <Heart size={20} />, title: "Favorites", value: "1,204", change: "+8%" },
            ].map((item) => (
              <Card key={item.title} hover>
                <CardBody>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[var(--radius)] bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">{item.icon}</div>
                    <div>
                      <span className="text-muted-foreground block" style={smallLabel}>{item.title}</span>
                      <span className="text-foreground block" style={fontLabelBold}>{item.value}</span>
                    </div>
                    <span className="ml-auto text-chart-2" style={btnStyle}>{item.change}</span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </DemoBox>
      </Section>

      <Section title="Elevation Variants" description="Different shadow levels for visual hierarchy." code={`<SskCard elevation="sm" />\n<SskCard elevation="md" />`}>
        <DemoBox>
          <div className="flex flex-wrap gap-6 justify-center py-4">
            {[
              { label: "Flat", shadow: "none" },
              { label: "SM", shadow: "0 1px 2px rgba(0,0,0,.05)" },
              { label: "Default", shadow: "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)" },
              { label: "MD", shadow: "0 4px 16px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.06)" },
            ].map((e) => (
              <div key={e.label} className="w-32 h-24 rounded-[var(--radius-md)] border border-border bg-card flex items-center justify-center" style={{ boxShadow: e.shadow }}>
                <span className="text-muted-foreground" style={btnStyle}>{e.label}</span>
              </div>
            ))}
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "children", type: "ReactNode", def: "—", desc: "Card content (Header, Body, Footer)" },
        { prop: "hover", type: "boolean", def: "false", desc: "Interactive hover effect" },
        { prop: "elevation", type: '"none" | "sm" | "md" | "lg"', def: '"sm"', desc: "Shadow level" },
        { prop: "padding", type: "boolean", def: "true", desc: "Apply default padding" },
      ]} />
    </div>
  );
}
