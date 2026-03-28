import React, { useState } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel } from "./_showcase-factory";
import { OTPInput } from "../../lib/components/ds-otpinput";
import { DSButton } from "../../lib/components/ds-button";

export function OTPInputShowcase() {
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [completed, setCompleted] = useState(false);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.otpinput.title" descKey="page.otpinput.desc" />

      <Section title="Basic Usage" description="6-digit OTP field — auto-focuses next box on input." code={`<OTPInput length={6} label="Verification Code" onComplete={(code) => verify(code)} />`}>
        <DemoBox>
          <div className="flex flex-col items-start gap-4">
            <OTPInput
              length={6}
              label="Verification Code"
              value={otp1}
              onChange={setOtp1}
              onComplete={(v) => { setOtp1(v); setCompleted(true); }}
            />
            {otp1 && (
              <span className="text-muted-foreground" style={fontLabel}>
                Current: <code className="text-primary">{otp1}</code>
                {completed && <span className="text-chart-2 ml-2">✓ Complete</span>}
              </span>
            )}
            <DSButton variant="outline" size="sm" onClick={() => { setOtp1(""); setCompleted(false); }}>Reset</DSButton>
          </div>
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts." code={`<OTPInput size="sm" length={4} />
<OTPInput size="md" length={4} />
<OTPInput size="lg" length={4} />`}>
        <DemoBox>
          <div className="space-y-6">
            <DemoCard label="Small"><OTPInput size="sm" length={4} label="PIN (sm)" /></DemoCard>
            <DemoCard label="Medium"><OTPInput size="md" length={4} label="PIN (md)" /></DemoCard>
            <DemoCard label="Large"><OTPInput size="lg" length={4} label="PIN (lg)" /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Masked" description="Hide digits for PIN or password entry." code={`<OTPInput length={4} masked label="PIN" />`}>
        <DemoBox>
          <OTPInput length={4} masked label="Enter PIN" value={otp2} onChange={setOtp2} />
        </DemoBox>
      </Section>

      <Section title="States" description="Error and disabled states." code={`<OTPInput error="Invalid code. Please try again." />
<OTPInput disabled />`}>
        <DemoBox>
          <div className="space-y-6">
            <DemoCard label="Error">
              <OTPInput length={6} label="OTP Code" error="Invalid code. Please try again." />
            </DemoCard>
            <DemoCard label="Disabled">
              <OTPInput length={6} label="OTP Code" disabled />
            </DemoCard>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "length", type: "number", def: "6", desc: "Number of OTP digits" },
        { prop: "value", type: "string", def: "—", desc: "Controlled value" },
        { prop: "onChange", type: "(value: string) => void", def: "—", desc: "Value change callback" },
        { prop: "onComplete", type: "(value: string) => void", def: "—", desc: "Called when all digits are filled" },
        { prop: "masked", type: "boolean", def: "false", desc: "Show dots instead of digits" },
        { prop: "size", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Input box size" },
        { prop: "label", type: "string", def: "—", desc: "Field label" },
        { prop: "error", type: "string", def: "—", desc: "Validation error message" },
        { prop: "disabled", type: "boolean", def: "false", desc: "Disable all inputs" },
      ]} />
    </div>
  );
}
