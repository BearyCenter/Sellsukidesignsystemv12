import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as f}from"./check-YojSnU74.js";import{r as T}from"./index-ZH-6pyQh.js";import"./createLucideIcon-DG6FjBK_.js";import"./_commonjsHelpers-CqkleIqs.js";const k={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},x={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},g={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"},h={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"};function m({steps:r,current:n,orientation:C="horizontal",onStepClick:a,className:p=""}){return C==="vertical"?e.jsx("div",{className:`flex flex-col ${p}`,children:r.map((i,t)=>{const s=t<n,o=t===n;return e.jsxs("div",{className:"flex gap-3",onClick:()=>a==null?void 0:a(t),children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${a?"cursor-pointer":""} ${s||o?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"}`,style:h,children:s?e.jsx(f,{size:14}):t+1}),t<r.length-1&&e.jsx("div",{className:`w-px flex-1 min-h-[24px] my-1 ${s?"bg-primary":"bg-border"}`})]}),e.jsxs("div",{className:`pb-6 ${t===r.length-1?"pb-0":""}`,children:[e.jsx("span",{className:`block ${o?"text-foreground":"text-muted-foreground"}`,style:o?x:k,children:i.title}),i.description&&e.jsx("span",{className:"text-muted-foreground block",style:g,children:i.description})]})]},t)})}):e.jsx("div",{className:`flex items-center ${p}`,children:r.map((i,t)=>{const s=t<n,o=t===n;return e.jsxs("div",{className:`flex items-center ${t<r.length-1?"flex-1":""}`,children:[e.jsxs("div",{className:"flex flex-col items-center gap-1",onClick:()=>a==null?void 0:a(t),children:[e.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${a?"cursor-pointer":""} ${s||o?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"}`,style:h,children:s?e.jsx(f,{size:14}):t+1}),e.jsx("span",{className:`text-center ${o?"text-foreground":"text-muted-foreground"}`,style:o?x:g,children:i.title})]}),t<r.length-1&&e.jsx("div",{className:`flex-1 h-px mx-2 mt-[-20px] ${s?"bg-primary":"bg-border"}`})]},t)})})}m.displayName="Stepper";m.__docgenInfo={description:"",methods:[],displayName:"Stepper",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"StepDefinition"}],raw:"StepDefinition[]"},description:"Step definitions"},current:{required:!0,tsType:{name:"number"},description:"Current active step (0-based)"},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"Layout direction",defaultValue:{value:'"horizontal"',computed:!1}},onStepClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:"Step click handler (for navigating to completed steps)"},className:{required:!1,tsType:{name:"string"},description:"Additional class name",defaultValue:{value:'""',computed:!1}}}};const M={title:"Components/Stepper",component:m,tags:["autodocs"],argTypes:{orientation:{control:"select",options:["horizontal","vertical"]}}},l=[{title:"Account",description:"Create your account"},{title:"Profile",description:"Set up your profile"},{title:"Review",description:"Review and submit"}],c={args:{steps:l,current:1}},d={args:{steps:l,current:1,orientation:"vertical"}},u={render:()=>{const[r,n]=T.useState(0);return e.jsxs("div",{style:{maxWidth:600},children:[e.jsx(m,{steps:l,current:r,onStepClick:n}),e.jsxs("div",{style:{marginTop:24,display:"flex",gap:8},children:[e.jsx("button",{onClick:()=>n(Math.max(0,r-1)),disabled:r===0,children:"Back"}),e.jsx("button",{onClick:()=>n(Math.min(l.length-1,r+1)),disabled:r===l.length-1,children:"Next"})]})]})}};var v,b,y;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    steps,
    current: 1
  }
}`,...(y=(b=c.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var j,N,w;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    steps,
    current: 1,
    orientation: "vertical"
  }
}`,...(w=(N=d.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var S,$,z;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const [current, setCurrent] = useState(0);
    return <div style={{
      maxWidth: 600
    }}>\r
        <Stepper steps={steps} current={current} onStepClick={setCurrent} />\r
        <div style={{
        marginTop: 24,
        display: "flex",
        gap: 8
      }}>\r
          <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>\r
            Back\r
          </button>\r
          <button onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))} disabled={current === steps.length - 1}>\r
            Next\r
          </button>\r
        </div>\r
      </div>;
  }
}`,...(z=($=u.parameters)==null?void 0:$.docs)==null?void 0:z.source}}};const V=["Default","Vertical","Interactive"];export{c as Default,u as Interactive,d as Vertical,V as __namedExportsOrder,M as default};
