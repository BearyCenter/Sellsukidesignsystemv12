import React, { useState } from "react";
import { Layers, ChevronRight } from "lucide-react";
import { Alert, toast, ToastContainer } from "../../lib/components/ds-alert";
import { DSButton } from "../../lib/components/ds-button";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";
import { useI18n } from "../i18n";

export function AlertShowcase() {
  const { t } = useI18n();
  return (
    <div className="space-y-14">
      <ToastContainer />

      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.alert.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.alert.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.alert.desc")}
        </p>
      </div>

      <Section title="Variants" description="Four semantic variants for different message types." code={`<Alert variant="info" title="Info">Informational message.</Alert>
<Alert variant="success" title="Success">Operation completed.</Alert>
<Alert variant="warning" title="Warning">Proceed with caution.</Alert>
<Alert variant="error" title="Error">Something went wrong.</Alert>`}>
        <div className="space-y-3">
          <Alert variant="info" title="Information">Your account settings have been updated successfully. Changes will take effect immediately.</Alert>
          <Alert variant="success" title="Success">Deployment completed. All 24 services are now running the latest version.</Alert>
          <Alert variant="warning" title="Warning">Your API rate limit is at 85%. Consider upgrading your plan to avoid service interruptions.</Alert>
          <Alert variant="error" title="Error">Failed to connect to the database. Please check your credentials and try again.</Alert>
        </div>
      </Section>

      <Section title="Without Title" description="Compact alerts without a heading." code={`<Alert variant="info">A brief inline message.</Alert>`}>
        <div className="space-y-3">
          <Alert variant="info">This is a brief informational message without a title.</Alert>
          <Alert variant="success">Changes saved successfully.</Alert>
          <Alert variant="warning">Disk usage is above 90%.</Alert>
          <Alert variant="error">Invalid email address format.</Alert>
        </div>
      </Section>

      <Section title="Dismissible" description="Alerts with a close button." code={`<Alert variant="info" title="Tip" dismissible>
  You can dismiss this alert.
</Alert>`}>
        <div className="space-y-3">
          <Alert variant="info" title="Pro Tip" dismissible>Press Cmd+K to open the command palette for quick navigation.</Alert>
          <Alert variant="warning" title="Deprecation Notice" dismissible>The v1 API will be deprecated on April 2026. Please migrate to v2.</Alert>
        </div>
      </Section>

      <Section title="With Actions" description="Alerts with action buttons for inline responses." code={`<Alert variant="warning" title="Update Available" action={<DSButton size="sm">Update Now</DSButton>}>
  A new version is available.
</Alert>`}>
        <div className="space-y-3">
          <Alert
            variant="warning"
            title="Update Available"
            action={
              <div className="flex gap-2">
                <DSButton size="sm">Update Now</DSButton>
                <DSButton variant="outline" size="sm">Later</DSButton>
              </div>
            }
          >
            Version 2.1.0 is available with 3 new features and 7 bug fixes.
          </Alert>
          <Alert
            variant="error"
            title="Payment Failed"
            dismissible
            action={
              <DSButton variant="destructive" size="sm">Retry Payment</DSButton>
            }
          >
            Your last payment of $49.00 could not be processed. Please update your billing information.
          </Alert>
        </div>
      </Section>

      <Section title="Toast Notifications" description="Transient notifications that auto-dismiss. Click buttons to trigger." code={`import { toast } from "./components/ds-alert";

toast.info("Message saved as draft.");
toast.success("File uploaded successfully!", "Upload Complete");
toast.warning("Connection unstable.");
toast.error("Failed to delete item.", "Error");`}>
        <div className="flex flex-wrap gap-3">
          <DSButton onClick={() => toast.info("Your changes have been saved as a draft.")}>
            Info Toast
          </DSButton>
          <DSButton variant="secondary" onClick={() => toast.success("File uploaded successfully!", "Upload Complete")}>
            Success Toast
          </DSButton>
          <DSButton variant="outline" onClick={() => toast.warning("Your session will expire in 5 minutes.", "Session Warning")}>
            Warning Toast
          </DSButton>
          <DSButton variant="destructive" onClick={() => toast.error("Failed to delete the selected items.", "Deletion Error")}>
            Error Toast
          </DSButton>
        </div>
      </Section>
    </div>
  );
}
