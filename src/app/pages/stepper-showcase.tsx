import { useState } from "react";
import { Check } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

function Stepper({ steps, current, orientation = "horizontal", onStepClick }: { steps: { title: string; description?: string }[]; current: number; orientation?: "horizontal" | "vertical"; onStepClick?: (i: number) => void }) {
  if (orientation === "vertical") {
    return (
      <div className="flex flex-col">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={i} className="flex gap-3" onClick={() => onStepClick?.(i)}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${onStepClick ? "cursor-pointer" : ""} ${done ? "bg-primary text-primary-foreground" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`} style={btnStyle}>
                  {done ? <Check size={14} /> : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`w-px flex-1 min-h-[24px] my-1 ${done ? "bg-primary" : "bg-border"}`} />}
              </div>
              <div className={`pb-6 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                <span className={`block ${active ? "text-foreground" : "text-muted-foreground"}`} style={active ? fontLabelBold : fontLabel}>{step.title}</span>
                {step.description && <span className="text-muted-foreground block" style={smallLabel}>{step.description}</span>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center gap-1" onClick={() => onStepClick?.(i)}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${onStepClick ? "cursor-pointer" : ""} ${done ? "bg-primary text-primary-foreground" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`} style={btnStyle}>
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-center ${active ? "text-foreground" : "text-muted-foreground"}`} style={active ? fontLabelBold : smallLabel}>{step.title}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-px mx-2 mt-[-20px] ${done ? "bg-primary" : "bg-border"}`} />}
          </div>
        );
      })}
    </div>
  );
}

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