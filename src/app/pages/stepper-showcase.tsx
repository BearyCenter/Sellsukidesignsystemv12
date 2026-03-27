import { useState } from "react";
import { PageHeader, Section, DemoBox, APITable, smallLabel, btnStyle } from "./_showcase-factory";
import { Stepper } from "../../lib/components/ds-stepper";

export function StepperShowcase() {
  const [step1, setStep1] = useState(1);
  const [step2, setStep2] = useState(2);

  const basicSteps = [
    { title: "Account", description: "Create your account" },
    { title: "Profile", description: "Complete your profile" },
    { title: "Settings", description: "Configure preferences" },
    { title: "Done", description: "All set!" },
  ];

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.stepper.title" descKey="page.stepper.desc" />

      <Section title="Horizontal Stepper" description="Standard left-to-right step progression." code={`<SskStepper steps={steps} current={1} />`}>
        <DemoBox>
          <div className="max-w-lg mx-auto space-y-6">
            <Stepper steps={basicSteps} current={step1} />
            <div className="flex justify-center gap-3">
              <button onClick={() => setStep1(Math.max(0, step1 - 1))} className="px-4 py-2 rounded-[var(--radius)] border border-border text-foreground hover:bg-muted/30 cursor-pointer" style={btnStyle} disabled={step1 === 0}>Back</button>
              <button onClick={() => setStep1(Math.min(basicSteps.length, step1 + 1))} className="px-4 py-2 rounded-[var(--radius)] bg-primary text-primary-foreground cursor-pointer" style={btnStyle} disabled={step1 >= basicSteps.length}>{step1 === basicSteps.length - 1 ? "Finish" : "Next"}</button>
            </div>
          </div>
        </DemoBox>
      </Section>

      <Section title="Vertical Stepper" description="Vertical layout for sidebar or mobile flows." code={`<SskStepper steps={steps} current={2} orientation="vertical" />`}>
        <DemoBox>
          <div className="max-w-sm">
            <Stepper steps={basicSteps} current={step2} orientation="vertical" />
            <div className="flex gap-3 mt-4 ml-11">
              <button onClick={() => setStep2(Math.max(0, step2 - 1))} className="px-3 py-1.5 rounded-[var(--radius)] border border-border text-foreground hover:bg-muted/30 cursor-pointer" style={btnStyle}>Back</button>
              <button onClick={() => setStep2(Math.min(basicSteps.length, step2 + 1))} className="px-3 py-1.5 rounded-[var(--radius)] bg-primary text-primary-foreground cursor-pointer" style={btnStyle}>Next</button>
            </div>
          </div>
        </DemoBox>
      </Section>

      <Section title="Clickable Steps" description="Allow users to navigate to any completed step." code={`<SskStepper steps={steps} current={1} onStepClick={goToStep} />`}>
        <DemoBox>
          <div className="max-w-lg mx-auto">
            <Stepper steps={basicSteps} current={1} onStepClick={(i) => { if (i <= 1) alert(`Navigate to step ${i + 1}: ${basicSteps[i].title}`); }} />
            <p className="text-center text-muted-foreground mt-4" style={smallLabel}>Click on step 1 (completed) to navigate back</p>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "steps", type: "{ title: string; description?: string }[]", def: "—", desc: "Step definitions" },
        { prop: "current", type: "number", def: "0", desc: "Current active step (0-based)" },
        { prop: "orientation", type: '"horizontal" | "vertical"', def: '"horizontal"', desc: "Layout direction" },
        { prop: "onStepClick", type: "(index: number) => void", def: "—", desc: "Step click handler" },
      ]} />
    </div>
  );
}