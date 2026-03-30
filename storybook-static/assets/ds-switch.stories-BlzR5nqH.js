import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";const A={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},T={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"},q={sm:{track:"w-7 h-4",thumb:"w-3 h-3",on:"translate-x-3"},md:{track:"w-10 h-6",thumb:"w-4.5 h-4.5",on:"translate-x-4.5"},lg:{track:"w-14 h-8",thumb:"w-6.5 h-6.5",on:"translate-x-6"}},B={primary:"bg-primary",success:"bg-chart-2",warning:"bg-chart-5",destructive:"bg-destructive"},N={sm:{w:12,h:12,on:14},md:{w:18,h:18,on:18},lg:{w:26,h:26,on:24}};function s({checked:t,onChange:n,label:a,description:o,size:c="md",disabled:l,color:h="primary"}){const p=q[c],g=N[c];return e.jsxs("label",{className:`inline-flex items-start gap-3 ${l?"opacity-50 pointer-events-none":"cursor-pointer"}`,children:[e.jsx("button",{role:"switch","aria-checked":t,onClick:()=>n(!t),disabled:l,className:`${p.track} rounded-full relative flex-shrink-0 transition-colors cursor-pointer ${t?B[h]:"bg-muted"}`,children:e.jsx("span",{className:"rounded-full bg-background shadow-elevation-sm absolute transition-transform",style:{width:g.w,height:g.h,top:"50%",transform:`translateY(-50%) translateX(${t?g.on:2}px)`,left:0}})}),(a||o)&&e.jsxs("div",{children:[a&&e.jsx("span",{className:"text-foreground block",style:A,children:a}),o&&e.jsx("span",{className:"text-muted-foreground block",style:T,children:o})]})]})}s.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(v: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"v"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},color:{required:!1,tsType:{name:"union",raw:'"primary" | "success" | "warning" | "destructive"',elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"destructive"'}]},description:"",defaultValue:{value:'"primary"',computed:!1}}}};const M={title:"Components/Switch",component:s,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]},color:{control:"select",options:["primary","success","warning","destructive"]},disabled:{control:"boolean"}}},i={render:()=>{const[t,n]=r.useState(!1);return e.jsx(s,{checked:t,onChange:n,label:"Enable notifications"})}},u={render:()=>{const[t,n]=r.useState(!0),[a,o]=r.useState(!0),[c,l]=r.useState(!0);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(s,{checked:t,onChange:n,size:"sm",label:"Small"}),e.jsx(s,{checked:a,onChange:o,size:"md",label:"Medium"}),e.jsx(s,{checked:c,onChange:l,size:"lg",label:"Large"})]})}},d={render:()=>{const[t,n]=r.useState(!0),[a,o]=r.useState(!0),[c,l]=r.useState(!0),[h,p]=r.useState(!0);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(s,{checked:t,onChange:n,color:"primary",label:"Primary"}),e.jsx(s,{checked:a,onChange:o,color:"success",label:"Success"}),e.jsx(s,{checked:c,onChange:l,color:"warning",label:"Warning"}),e.jsx(s,{checked:h,onChange:p,color:"destructive",label:"Destructive"})]})}},m={render:()=>{const[t,n]=r.useState(!1);return e.jsx(s,{checked:t,onChange:n,label:"Marketing emails",description:"Receive emails about new products and promotions."})}};var b,f,S;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onChange={setChecked} label="Enable notifications" />;
  }
}`,...(S=(f=i.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var x,v,k;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(true);
    const [c, setC] = useState(true);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 16
    }}>\r
        <Switch checked={a} onChange={setA} size="sm" label="Small" />\r
        <Switch checked={b} onChange={setB} size="md" label="Medium" />\r
        <Switch checked={c} onChange={setC} size="lg" label="Large" />\r
      </div>;
  }
}`,...(k=(v=u.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var w,y,C;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(true);
    const [c, setC] = useState(true);
    const [d, setD] = useState(true);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 16
    }}>\r
        <Switch checked={a} onChange={setA} color="primary" label="Primary" />\r
        <Switch checked={b} onChange={setB} color="success" label="Success" />\r
        <Switch checked={c} onChange={setC} color="warning" label="Warning" />\r
        <Switch checked={d} onChange={setD} color="destructive" label="Destructive" />\r
      </div>;
  }
}`,...(C=(y=d.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var j,D,z;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onChange={setChecked} label="Marketing emails" description="Receive emails about new products and promotions." />;
  }
}`,...(z=(D=m.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};const _=["Default","AllSizes","AllColors","WithDescription"];export{d as AllColors,u as AllSizes,i as Default,m as WithDescription,_ as __namedExportsOrder,M as default};
