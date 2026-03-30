import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as d}from"./index-ZH-6pyQh.js";import{H as te}from"./house-CGCrBEi_.js";import{U as re}from"./user-6HmpBwmQ.js";import{S as ne}from"./settings-BXaJJ-8e.js";import"./_commonjsHelpers-CqkleIqs.js";import"./createLucideIcon-DG6FjBK_.js";const ae={sm:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)",padding:"6px 12px"},md:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)",padding:"8px 16px"},lg:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)",padding:"10px 20px"}};function r({tabs:g,variant:s="default",size:G="md",defaultTab:J,activeTab:x,onChange:v,fullWidth:h=!1,className:K=""}){var S,w;const[M,Q]=d.useState(J??((S=g[0])==null?void 0:S.id)??""),l=x??M,y=d.useRef(null),[j,X]=d.useState({left:0,width:0}),Y=t=>{x||Q(t),v==null||v(t)};d.useEffect(()=>{if(s!=="underline"&&s!=="default")return;const t=y.current;if(!t)return;const n=t.querySelector(`[data-tab-id="${l}"]`);n&&X({left:n.offsetLeft,width:n.offsetWidth})},[l,s]);const T=(w=g.find(t=>t.id===l))==null?void 0:w.content,Z=(()=>{switch(s){case"bordered":return"border border-border rounded-[var(--radius)] bg-muted/30 p-1 gap-1";case"pills":return"gap-1.5";case"underline":return"border-b border-border relative";default:return"border-b border-border relative"}})(),ee=(t,n)=>{const i="relative flex items-center gap-1.5 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap";if(n)return`${i} opacity-40 !cursor-not-allowed`;switch(s){case"bordered":return`${i} rounded-[var(--radius-sm)] ${t?"bg-card text-foreground shadow-elevation-sm":"text-muted-foreground hover:text-foreground hover:bg-card/50"}`;case"pills":return`${i} rounded-[var(--radius)] ${t?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground hover:bg-muted"}`;case"underline":return`${i} ${t?"text-primary":"text-muted-foreground hover:text-foreground"}`;default:return`${i} ${t?"text-primary":"text-muted-foreground hover:text-foreground"}`}};return e.jsxs("div",{className:K,children:[e.jsxs("div",{ref:y,className:`flex ${h?"":"inline-flex"} ${Z}`,role:"tablist",children:[(s==="default"||s==="underline")&&e.jsx("div",{className:"absolute bottom-0 h-0.5 bg-primary transition-all duration-200 rounded-full",style:{left:j.left,width:j.width}}),g.map(t=>{const n=l===t.id;return e.jsxs("button",{"data-tab-id":t.id,role:"tab","aria-selected":n,disabled:t.disabled,onClick:()=>!t.disabled&&Y(t.id),className:`${ee(n,!!t.disabled)} ${h?"flex-1 justify-center":""}`,style:ae[G],children:[t.icon&&e.jsx("span",{className:"flex-shrink-0",children:t.icon}),e.jsx("span",{children:t.label}),t.badge!==void 0&&e.jsx("span",{className:`ml-1 rounded-full min-w-[18px] text-center inline-flex items-center justify-center ${n&&s==="pills"?"bg-primary-foreground/20 text-primary-foreground":"bg-muted text-muted-foreground"}`,style:{fontFamily:"var(--font-label)",fontSize:"12px",fontWeight:"var(--weight-label)",lineHeight:"1",padding:"1px 6px"},children:t.badge})]},t.id)})]}),T&&e.jsx("div",{className:"pt-4",role:"tabpanel",children:T})]})}r.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{tabs:{required:!0,tsType:{name:"Array",elements:[{name:"TabItem"}],raw:"TabItem[]"},description:""},variant:{required:!1,tsType:{name:"union",raw:'"default" | "bordered" | "pills" | "underline"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"bordered"'},{name:"literal",value:'"pills"'},{name:"literal",value:'"underline"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},defaultTab:{required:!1,tsType:{name:"string"},description:""},activeTab:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const a=[{id:"overview",label:"Overview"},{id:"details",label:"Details"},{id:"settings",label:"Settings",badge:3}],me={title:"Components/Tabs",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","bordered","pills","underline"]},size:{control:"select",options:["sm","md","lg"]},fullWidth:{control:"boolean"}}},o={args:{tabs:a}},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32},children:[e.jsxs("div",{children:[e.jsx("p",{style:{marginBottom:8,fontWeight:600},children:"Default"}),e.jsx(r,{tabs:a,variant:"default"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{marginBottom:8,fontWeight:600},children:"Bordered"}),e.jsx(r,{tabs:a,variant:"bordered"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{marginBottom:8,fontWeight:600},children:"Pills"}),e.jsx(r,{tabs:a,variant:"pills"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{marginBottom:8,fontWeight:600},children:"Underline"}),e.jsx(r,{tabs:a,variant:"underline"})]})]})},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24},children:[e.jsx(r,{tabs:a,size:"sm"}),e.jsx(r,{tabs:a,size:"md"}),e.jsx(r,{tabs:a,size:"lg"})]})},m={render:()=>e.jsx(r,{tabs:[{id:"home",label:"Home",icon:e.jsx(te,{size:16})},{id:"profile",label:"Profile",icon:e.jsx(re,{size:16})},{id:"settings",label:"Settings",icon:e.jsx(ne,{size:16}),badge:2}]})},p={render:()=>e.jsx(r,{tabs:[{id:"active",label:"Active"},{id:"disabled",label:"Disabled",disabled:!0},{id:"another",label:"Another"}]})},b={args:{tabs:a,fullWidth:!0}},f={render:()=>e.jsx(r,{tabs:[{id:"tab1",label:"Overview",content:e.jsx("div",{style:{padding:16},children:"Overview content here."})},{id:"tab2",label:"Details",content:e.jsx("div",{style:{padding:16},children:"Details content here."})},{id:"tab3",label:"Settings",content:e.jsx("div",{style:{padding:16},children:"Settings content here."})}]})};var W,z,D;o.parameters={...o.parameters,docs:{...(W=o.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    tabs: sampleTabs
  }
}`,...(D=(z=o.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var $,B,q;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 32
  }}>\r
      <div><p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Default</p><Tabs tabs={sampleTabs} variant="default" /></div>\r
      <div><p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Bordered</p><Tabs tabs={sampleTabs} variant="bordered" /></div>\r
      <div><p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Pills</p><Tabs tabs={sampleTabs} variant="pills" /></div>\r
      <div><p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Underline</p><Tabs tabs={sampleTabs} variant="underline" /></div>\r
    </div>
}`,...(q=(B=c.parameters)==null?void 0:B.docs)==null?void 0:q.source}}};var N,A,I;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 24
  }}>\r
      <Tabs tabs={sampleTabs} size="sm" />\r
      <Tabs tabs={sampleTabs} size="md" />\r
      <Tabs tabs={sampleTabs} size="lg" />\r
    </div>
}`,...(I=(A=u.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var F,H,O;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <Tabs tabs={[{
    id: "home",
    label: "Home",
    icon: <Home size={16} />
  }, {
    id: "profile",
    label: "Profile",
    icon: <User size={16} />
  }, {
    id: "settings",
    label: "Settings",
    icon: <Settings size={16} />,
    badge: 2
  }]} />
}`,...(O=(H=m.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var V,C,E;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <Tabs tabs={[{
    id: "active",
    label: "Active"
  }, {
    id: "disabled",
    label: "Disabled",
    disabled: true
  }, {
    id: "another",
    label: "Another"
  }]} />
}`,...(E=(C=p.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var U,P,_;b.parameters={...b.parameters,docs:{...(U=b.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    tabs: sampleTabs,
    fullWidth: true
  }
}`,...(_=(P=b.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var R,k,L;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <Tabs tabs={[{
    id: "tab1",
    label: "Overview",
    content: <div style={{
      padding: 16
    }}>Overview content here.</div>
  }, {
    id: "tab2",
    label: "Details",
    content: <div style={{
      padding: 16
    }}>Details content here.</div>
  }, {
    id: "tab3",
    label: "Settings",
    content: <div style={{
      padding: 16
    }}>Settings content here.</div>
  }]} />
}`,...(L=(k=f.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};const pe=["Default","AllVariants","Sizes","WithIcons","WithDisabled","FullWidth","WithContent"];export{c as AllVariants,o as Default,b as FullWidth,u as Sizes,f as WithContent,p as WithDisabled,m as WithIcons,pe as __namedExportsOrder,me as default};
