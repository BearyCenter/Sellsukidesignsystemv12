import React, { useState } from "react";
import { Layers, ChevronRight } from "lucide-react";
import { Modal, ConfirmDialog } from "../../lib/components/ds-modal";
import { DSButton } from "../../lib/components/ds-button";
import { DSInput, DSTextarea } from "../../lib/components/ds-input";
import { FormLabel } from "../../lib/components/ds-form";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";
import { useI18n } from "../i18n";

export function ModalShowcase() {
  const { t } = useI18n();
  const [basicOpen, setBasicOpen] = useState(false);
  const [smOpen, setSmOpen] = useState(false);
  const [lgOpen, setLgOpen] = useState(false);
  const [xlOpen, setXlOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [scrollOpen, setScrollOpen] = useState(false);

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.modal.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.modal.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.modal.desc")}
        </p>
      </div>

      <Section title="Sizes" description="Five sizes from small to fullscreen." code={`<Modal open={open} onClose={close} title="Title" size="md">
  Content here
</Modal>`}>
        <div className="flex flex-wrap gap-3">
          <DSButton variant="outline" onClick={() => setSmOpen(true)}>Small</DSButton>
          <DSButton onClick={() => setBasicOpen(true)}>Medium (Default)</DSButton>
          <DSButton variant="outline" onClick={() => setLgOpen(true)}>Large</DSButton>
          <DSButton variant="outline" onClick={() => setXlOpen(true)}>Extra Large</DSButton>
        </div>
      </Section>

      <Section title="Form Modal" description="Modal with form inputs and footer actions." code={`<Modal open={open} onClose={close} title="Edit Profile" footer={<>...</>}>
  <form>...</form>
</Modal>`}>
        <DSButton onClick={() => setFormOpen(true)}>Open Form Modal</DSButton>
      </Section>

      <Section title="Confirm Dialog" description="Pre-built confirmation pattern with default and destructive variants." code={`<ConfirmDialog
  open={open}
  onClose={close}
  onConfirm={handleConfirm}
  variant="destructive"
  title="Delete item?"
  description="This cannot be undone."
/>`}>
        <div className="flex flex-wrap gap-3">
          <DSButton variant="outline" onClick={() => setConfirmOpen(true)}>Confirm Dialog</DSButton>
          <DSButton variant="destructive" onClick={() => setDestructiveOpen(true)}>Destructive Confirm</DSButton>
        </div>
      </Section>

      <Section title="Scrollable Content" description="Long content auto-scrolls within the modal body." code={`<Modal open={open} onClose={close} title="Terms" size="md">
  {longContent}
</Modal>`}>
        <DSButton variant="outline" onClick={() => setScrollOpen(true)}>Open Scrollable</DSButton>
      </Section>

      {/* Modals */}
      <Modal open={smOpen} onClose={() => setSmOpen(false)} title="Small Modal" description="Compact dialog for simple messages." size="sm">
        <span className="text-foreground" style={fontLabel}>This is a small modal suitable for alerts or short confirmations.</span>
      </Modal>

      <Modal open={basicOpen} onClose={() => setBasicOpen(false)} title="Medium Modal" description="Default size for most use cases." size="md">
        <span className="text-foreground" style={fontLabel}>This is the default medium-sized modal. It works well for forms, details, and general content.</span>
      </Modal>

      <Modal open={lgOpen} onClose={() => setLgOpen(false)} title="Large Modal" description="For complex forms or detailed content." size="lg">
        <span className="text-foreground" style={fontLabel}>A larger modal for complex layouts, multi-step forms, or detailed information displays.</span>
      </Modal>

      <Modal open={xlOpen} onClose={() => setXlOpen(false)} title="Extra Large Modal" description="Near-fullscreen for data-heavy UIs." size="xl">
        <span className="text-foreground" style={fontLabel}>Extra large modal for dashboards, data tables, or other content that needs maximum screen space.</span>
      </Modal>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="Edit Profile"
        description="Update your personal information."
        size="md"
        footer={
          <>
            <DSButton variant="outline" onClick={() => setFormOpen(false)}>Cancel</DSButton>
            <DSButton onClick={() => setFormOpen(false)}>Save Changes</DSButton>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <FormLabel>Full Name</FormLabel>
            <DSInput defaultValue="Somsak Jaidee" className="mt-1" />
          </div>
          <div>
            <FormLabel>Email</FormLabel>
            <DSInput defaultValue="somsak@sellsuki.co.th" type="email" className="mt-1" />
          </div>
          <div>
            <FormLabel>Bio</FormLabel>
            <DSTextarea defaultValue="Senior Frontend Developer at Sellsuki" rows={3} className="mt-1" />
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={() => {}} title="Submit Changes?" description="Are you sure you want to submit these changes? This will update the live system." />

      <ConfirmDialog open={destructiveOpen} onClose={() => setDestructiveOpen(false)} onConfirm={() => {}} variant="destructive" title="Delete User?" description="This will permanently delete the user and all associated data. This action cannot be undone." confirmLabel="Delete" />

      <Modal open={scrollOpen} onClose={() => setScrollOpen(false)} title="Terms of Service" description="Please review the terms below." size="md">
        <div className="space-y-4 text-foreground" style={fontLabel}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i}>
              <span className="block mb-1" style={{ fontWeight: "var(--weight-button)" }}>Section {i + 1}: Lorem Ipsum</span>
              <span className="text-muted-foreground block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
