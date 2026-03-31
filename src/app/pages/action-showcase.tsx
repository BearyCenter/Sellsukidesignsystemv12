import {
  Layers,
  ChevronRight,
  Copy,
  Scissors,
  Clipboard,
  Trash2,
  Edit3,
  Download,
  Share2,
  Archive,
  Star,
  ArrowRight,
  Plus,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import { ActionDropdown, type ActionEntry } from "../components/action-dropdown";
import { DSButton, IconButton } from "../../lib/components/ds-button";
import { useI18n } from "../i18n";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";

// ─── Sample Data ──────────────────────────────────────────────────────────────

const basicActions: ActionEntry[] = [
  { id: "edit", label: "Edit", icon: <Edit3 size={15} />, shortcut: "⌘E", onClick: () => {} },
  { id: "copy", label: "Copy", icon: <Copy size={15} />, shortcut: "⌘C", onClick: () => {} },
  { id: "cut", label: "Cut", icon: <Scissors size={15} />, shortcut: "⌘X", onClick: () => {} },
  { id: "paste", label: "Paste", icon: <Clipboard size={15} />, shortcut: "⌘V", onClick: () => {} },
  { type: "divider" },
  { id: "delete", label: "Delete", icon: <Trash2 size={15} />, destructive: true, shortcut: "⌫", onClick: () => {} },
];

const groupedActions: ActionEntry[] = [
  { type: "group", label: "File", items: [
    { id: "download", label: "Download", icon: <Download size={15} />, onClick: () => {} },
    { id: "share", label: "Share", icon: <Share2 size={15} />, onClick: () => {} },
    { id: "archive", label: "Archive", icon: <Archive size={15} />, onClick: () => {} },
  ]},
  { type: "group", label: "Organize", items: [
    { id: "star", label: "Add to Favorites", icon: <Star size={15} />, onClick: () => {} },
    { id: "move", label: "Move to…", icon: <ArrowRight size={15} />, disabled: true, onClick: () => {} },
  ]},
  { type: "divider" },
  { id: "delete-all", label: "Delete All", icon: <Trash2 size={15} />, destructive: true, onClick: () => {} },
];

const nestedActions: ActionEntry[] = [
  { id: "new", label: "New", icon: <Plus size={15} />, children: [
    { id: "new-file", label: "File", onClick: () => {} },
    { id: "new-folder", label: "Folder", onClick: () => {} },
    { id: "new-project", label: "Project", onClick: () => {} },
  ]},
  { id: "share", label: "Share with…", icon: <Share2 size={15} />, children: [
    { id: "share-team", label: "Team", onClick: () => {} },
    { id: "share-org", label: "Organization", onClick: () => {} },
    { id: "share-public", label: "Public Link", description: "Anyone with the link can view", onClick: () => {} },
  ]},
  { type: "divider" },
  { id: "settings", label: "Settings", icon: <Settings size={15} />, onClick: () => {} },
];

const activeActions: ActionEntry[] = [
  { id: "list", label: "List View", active: true, onClick: () => {} },
  { id: "grid", label: "Grid View", onClick: () => {} },
  { id: "board", label: "Board View", onClick: () => {} },
  { type: "divider" },
  { id: "compact", label: "Compact Mode", active: true, onClick: () => {} },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ActionShowcase() {
  const { t } = useI18n();
  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.action.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.action.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.action.desc")}
        </p>
      </div>

      <Section
        title="Basic Actions"
        description="Simple action list with icons, shortcuts, and a destructive action."
        code={`import { ActionDropdown } from "./components/action-dropdown";

const actions = [
  { id: "edit", label: "Edit", icon: <Edit3 size={15} />, shortcut: "⌘E", onClick: () => {} },
  { id: "copy", label: "Copy", icon: <Copy size={15} />, shortcut: "⌘C", onClick: () => {} },
  { type: "divider" },
  { id: "delete", label: "Delete", icon: <Trash2 size={15} />, destructive: true, onClick: () => {} },
];

<ActionDropdown items={actions} label="Edit Actions" />`}
      >
        <div className="flex flex-wrap gap-4">
          <ActionDropdown items={basicActions} label="Edit Actions" />
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes to fit different UI density."
        code={`<ActionDropdown items={actions} label="Small" size="sm" />
<ActionDropdown items={actions} label="Medium" size="md" />
<ActionDropdown items={actions} label="Large" size="lg" />`}
      >
        <div className="flex flex-wrap items-start gap-4">
          <DemoCard label="Small"><ActionDropdown items={basicActions} label="Small" size="sm" /></DemoCard>
          <DemoCard label="Medium"><ActionDropdown items={basicActions} label="Medium" size="md" /></DemoCard>
          <DemoCard label="Large"><ActionDropdown items={basicActions} label="Large" size="lg" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Grouped Actions"
        description="Organize actions into semantic groups with labels."
        code={`const actions = [
  { type: "group", label: "File", items: [
    { id: "download", label: "Download", icon: <Download size={15} />, onClick: () => {} },
    { id: "share", label: "Share", icon: <Share2 size={15} />, onClick: () => {} },
  ]},
  { type: "divider" },
  { id: "delete", label: "Delete All", destructive: true, onClick: () => {} },
];

<ActionDropdown items={actions} label="File Actions" />`}
      >
        <ActionDropdown items={groupedActions} label="File Actions" />
      </Section>

      <Section
        title="Nested Sub-menus"
        description="Action items can expand into sub-menus on hover."
        code={`const actions = [
  { id: "new", label: "New", icon: <Plus size={15} />, children: [
    { id: "new-file", label: "File", onClick: () => {} },
    { id: "new-folder", label: "Folder", onClick: () => {} },
  ]},
  { id: "share", label: "Share with…", icon: <Share2 size={15} />, children: [
    { id: "share-team", label: "Team", onClick: () => {} },
    { id: "share-public", label: "Public Link", onClick: () => {} },
  ]},
];

<ActionDropdown items={actions} label="More Options" />`}
      >
        <ActionDropdown items={nestedActions} label="More Options" />
      </Section>

      <Section
        title="Active / Check State"
        description="Indicate currently selected or active options with a check mark."
        code={`const actions = [
  { id: "list", label: "List View", active: true, onClick: () => {} },
  { id: "grid", label: "Grid View", onClick: () => {} },
];

<ActionDropdown items={actions} label="View Options" />`}
      >
        <ActionDropdown items={activeActions} label="View Options" />
      </Section>

      <Section
        title="Alignment"
        description="Panel can align left or right to the trigger."
        code={`<ActionDropdown items={actions} label="Align Left" align="left" />
<ActionDropdown items={actions} label="Align Right" align="right" />`}
      >
        <div className="flex gap-4">
          <ActionDropdown items={basicActions} label="Align Left" align="left" />
          <ActionDropdown items={basicActions} label="Align Right" align="right" />
        </div>
      </Section>

      <Section
        title="Custom Trigger"
        description="Use any element as the dropdown trigger."
        code={`<ActionDropdown
  items={actions}
  trigger={
    <IconButton icon={<MoreHorizontal size={16} />} aria-label="More" variant="outline" />
  }
/>

<ActionDropdown
  items={actions}
  trigger={
    <DSButton variant="primary" rightIcon={<ChevronRight size={14} />}>
      File Menu
    </DSButton>
  }
/>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <ActionDropdown items={basicActions} trigger={<IconButton icon={<MoreHorizontal size={16} />} aria-label="More options" variant="outline" />} />
          <ActionDropdown items={groupedActions} trigger={<DSButton variant="primary" rightIcon={<ChevronRight size={14} />}>File Menu</DSButton>} />
          <ActionDropdown items={activeActions} trigger={<DSButton variant="outline" size="sm" leftIcon={<Settings size={14} />}>Settings</DSButton>} />
        </div>
      </Section>

      <Section
        title="States"
        description="Disabled and loading states."
        code={`<ActionDropdown items={actions} label="Disabled" disabled />
<ActionDropdown items={actions} label="Loading" loading />`}
      >
        <div className="flex flex-wrap gap-4">
          <DemoCard label="Disabled"><ActionDropdown items={basicActions} label="Disabled" disabled /></DemoCard>
          <DemoCard label="Loading"><ActionDropdown items={basicActions} label="Loading" loading /></DemoCard>
        </div>
      </Section>
    </div>
  );
}
