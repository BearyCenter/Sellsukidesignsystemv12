import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as y}from"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";const _=y.createContext(null),L={sm:{outer:"w-4 h-4",inner:"w-1.5 h-1.5",labelStyle:{fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"},descStyle:{fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"}},md:{outer:"w-5 h-5",inner:"w-2 h-2",labelStyle:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},descStyle:{fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"}},lg:{outer:"w-6 h-6",inner:"w-2.5 h-2.5",labelStyle:{fontFamily:"var(--font-caption)",fontSize:"var(--text-caption)",fontWeight:"var(--weight-label)"},descStyle:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"}}};function a({value:u,label:o,description:s,disabled:i,size:c,className:S=""}){const r=y.useContext(_),d=r?r.value===u:!1,t=i??(r==null?void 0:r.disabled)??!1,p=c??(r==null?void 0:r.size)??"md",n=L[p],m=()=>{t||r==null||r.onChange(u)};return e.jsxs("div",{className:`inline-flex items-start gap-2.5 ${t?"opacity-50":""} ${S}`,children:[e.jsx("button",{role:"radio","aria-checked":d,disabled:t,onClick:m,className:`${n.outer} flex-shrink-0 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer mt-0.5
          ${d?"border-primary":"border-border hover:border-primary/50"}
          ${t?"!cursor-not-allowed":""}
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none`,children:d&&e.jsx("span",{className:`${n.inner} rounded-full bg-primary transition-transform scale-100`})}),(o||s)&&e.jsxs("div",{className:"min-w-0",children:[o&&e.jsx("span",{className:`text-foreground block cursor-pointer ${t?"!cursor-not-allowed":""}`,style:n.labelStyle,onClick:m,children:o}),s&&e.jsx("span",{className:"text-muted-foreground block",style:n.descStyle,children:s})]})]})}function l({name:u,value:o,defaultValue:s="",onChange:i,label:c,size:S="md",disabled:r=!1,direction:d="vertical",children:t,error:p,className:n=""}){const[m,P]=y.useState(s),I=o??m,H=R=>{o===void 0&&P(R),i==null||i(R)};return e.jsx(_.Provider,{value:{value:I,onChange:H,size:S,disabled:r,name:u},children:e.jsxs("fieldset",{className:n,role:"radiogroup",children:[c&&e.jsx("legend",{className:"text-foreground mb-2 block",style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},children:c}),e.jsx("div",{className:`flex ${d==="vertical"?"flex-col gap-3":"flex-wrap gap-4"}`,children:t}),p&&e.jsx("span",{className:"text-destructive block mt-1.5",style:{fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"},children:p})]})})}a.__docgenInfo={description:"",methods:[],displayName:"DSRadio",props:{value:{required:!0,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};l.__docgenInfo={description:"",methods:[],displayName:"RadioGroup",props:{name:{required:!0,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},direction:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"vertical"',computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},error:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const Q={title:"Components/Radio",component:l,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]},direction:{control:"select",options:["horizontal","vertical"]},disabled:{control:"boolean"}}},b={render:()=>e.jsxs(l,{name:"demo",defaultValue:"a",label:"Choose one",children:[e.jsx(a,{value:"a",label:"Option A"}),e.jsx(a,{value:"b",label:"Option B"}),e.jsx(a,{value:"c",label:"Option C"})]})},f={render:()=>e.jsxs(l,{name:"plan",defaultValue:"starter",children:[e.jsx(a,{value:"starter",label:"Starter",description:"Best for small teams"}),e.jsx(a,{value:"pro",label:"Pro",description:"For growing businesses"}),e.jsx(a,{value:"enterprise",label:"Enterprise",description:"Custom solutions"})]})},v={render:()=>e.jsxs(l,{name:"disabled",defaultValue:"a",disabled:!0,children:[e.jsx(a,{value:"a",label:"Option A"}),e.jsx(a,{value:"b",label:"Option B"})]})},g={render:()=>e.jsxs("div",{style:{display:"flex",gap:32},children:[e.jsxs(l,{name:"sm",size:"sm",defaultValue:"a",label:"Small",children:[e.jsx(a,{value:"a",label:"A"}),e.jsx(a,{value:"b",label:"B"})]}),e.jsxs(l,{name:"md",size:"md",defaultValue:"a",label:"Medium",children:[e.jsx(a,{value:"a",label:"A"}),e.jsx(a,{value:"b",label:"B"})]}),e.jsxs(l,{name:"lg",size:"lg",defaultValue:"a",label:"Large",children:[e.jsx(a,{value:"a",label:"A"}),e.jsx(a,{value:"b",label:"B"})]})]})},x={render:()=>e.jsxs(l,{name:"horizontal",direction:"horizontal",defaultValue:"a",label:"Direction",children:[e.jsx(a,{value:"a",label:"Option A"}),e.jsx(a,{value:"b",label:"Option B"}),e.jsx(a,{value:"c",label:"Option C"})]})},h={render:()=>e.jsxs(l,{name:"error",error:"Please select an option",label:"Required",children:[e.jsx(a,{value:"a",label:"Option A"}),e.jsx(a,{value:"b",label:"Option B"})]})};var j,z,D;b.parameters={...b.parameters,docs:{...(j=b.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <RadioGroup name="demo" defaultValue="a" label="Choose one">\r
      <DSRadio value="a" label="Option A" />\r
      <DSRadio value="b" label="Option B" />\r
      <DSRadio value="c" label="Option C" />\r
    </RadioGroup>
}`,...(D=(z=b.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var w,O,V;f.parameters={...f.parameters,docs:{...(w=f.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <RadioGroup name="plan" defaultValue="starter">\r
      <DSRadio value="starter" label="Starter" description="Best for small teams" />\r
      <DSRadio value="pro" label="Pro" description="For growing businesses" />\r
      <DSRadio value="enterprise" label="Enterprise" description="Custom solutions" />\r
    </RadioGroup>
}`,...(V=(O=f.parameters)==null?void 0:O.docs)==null?void 0:V.source}}};var q,G,T;v.parameters={...v.parameters,docs:{...(q=v.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <RadioGroup name="disabled" defaultValue="a" disabled>\r
      <DSRadio value="a" label="Option A" />\r
      <DSRadio value="b" label="Option B" />\r
    </RadioGroup>
}`,...(T=(G=v.parameters)==null?void 0:G.docs)==null?void 0:T.source}}};var B,C,N;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 32
  }}>\r
      <RadioGroup name="sm" size="sm" defaultValue="a" label="Small">\r
        <DSRadio value="a" label="A" />\r
        <DSRadio value="b" label="B" />\r
      </RadioGroup>\r
      <RadioGroup name="md" size="md" defaultValue="a" label="Medium">\r
        <DSRadio value="a" label="A" />\r
        <DSRadio value="b" label="B" />\r
      </RadioGroup>\r
      <RadioGroup name="lg" size="lg" defaultValue="a" label="Large">\r
        <DSRadio value="a" label="A" />\r
        <DSRadio value="b" label="B" />\r
      </RadioGroup>\r
    </div>
}`,...(N=(C=g.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var A,W,F;x.parameters={...x.parameters,docs:{...(A=x.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <RadioGroup name="horizontal" direction="horizontal" defaultValue="a" label="Direction">\r
      <DSRadio value="a" label="Option A" />\r
      <DSRadio value="b" label="Option B" />\r
      <DSRadio value="c" label="Option C" />\r
    </RadioGroup>
}`,...(F=(W=x.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};var k,$,E;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <RadioGroup name="error" error="Please select an option" label="Required">\r
      <DSRadio value="a" label="Option A" />\r
      <DSRadio value="b" label="Option B" />\r
    </RadioGroup>
}`,...(E=($=h.parameters)==null?void 0:$.docs)==null?void 0:E.source}}};const U=["Default","WithDescription","Disabled","Sizes","Horizontal","WithError"];export{b as Default,v as Disabled,x as Horizontal,g as Sizes,f as WithDescription,h as WithError,U as __namedExportsOrder,Q as default};
