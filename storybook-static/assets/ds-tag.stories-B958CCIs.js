import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{X as I}from"./x-DzaArQBv.js";import{S as D}from"./star-Ct95z5pi.js";import"./createLucideIcon-DG6FjBK_.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";const F={default:"bg-muted/50 text-foreground border-border",primary:"bg-primary/10 text-primary border-primary/20",success:"bg-chart-2/10 text-chart-2 border-chart-2/20",warning:"bg-chart-5/10 text-chart-5 border-chart-5/20",destructive:"bg-destructive/10 text-destructive border-destructive/20",info:"bg-accent text-accent-foreground border-primary/20"},V={sm:"px-1.5 py-0.5",md:"px-2 py-0.5",lg:"px-3 py-1.5"},_={sm:{fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"},md:{fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"},lg:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"}};function r({children:S,color:z="default",size:l="md",icon:i,closable:C,onClose:R,className:N=""}){const W=F[z],q=V[l],A=_[l];return e.jsxs("span",{className:`inline-flex items-center gap-1 rounded-full border ${W} ${q} ${N}`,style:A,children:[i&&e.jsx("span",{className:"flex-shrink-0",children:i}),S,C&&e.jsx("button",{className:"hover:opacity-70 cursor-pointer",onClick:R,children:e.jsx(I,{size:l==="sm"?10:12})})]})}r.displayName="Tag";r.__docgenInfo={description:"",methods:[],displayName:"Tag",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Tag content"},color:{required:!1,tsType:{name:"union",raw:'"default" | "primary" | "success" | "warning" | "destructive" | "info"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"primary"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"destructive"'},{name:"literal",value:'"info"'}]},description:"Color variant",defaultValue:{value:'"default"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"Tag size",defaultValue:{value:'"md"',computed:!1}},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Leading icon element"},closable:{required:!1,tsType:{name:"boolean"},description:"Show close button"},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Close callback"},className:{required:!1,tsType:{name:"string"},description:"Additional class name",defaultValue:{value:'""',computed:!1}}}};const O={title:"Components/Tag",component:r,tags:["autodocs"],argTypes:{color:{control:"select",options:["default","primary","success","warning","destructive","info"]},size:{control:"select",options:["sm","md","lg"]},closable:{control:"boolean"}}},a={args:{children:"Tag"}},s={render:()=>e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx(r,{color:"default",children:"Default"}),e.jsx(r,{color:"primary",children:"Primary"}),e.jsx(r,{color:"success",children:"Success"}),e.jsx(r,{color:"warning",children:"Warning"}),e.jsx(r,{color:"destructive",children:"Destructive"}),e.jsx(r,{color:"info",children:"Info"})]})},o={render:()=>e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(r,{size:"sm",children:"Small"}),e.jsx(r,{size:"md",children:"Medium"}),e.jsx(r,{size:"lg",children:"Large"})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx(r,{closable:!0,onClose:()=>{},color:"primary",children:"React"}),e.jsx(r,{closable:!0,onClose:()=>{},color:"success",children:"Vue"}),e.jsx(r,{closable:!0,onClose:()=>{},color:"warning",children:"Angular"})]})},n={render:()=>e.jsx(r,{icon:e.jsx(D,{size:12}),color:"warning",children:"Featured"})};var c,d,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: "Tag"
  }
}`,...(u=(d=a.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,g,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 8,
    flexWrap: "wrap"
  }}>\r
      <Tag color="default">Default</Tag>\r
      <Tag color="primary">Primary</Tag>\r
      <Tag color="success">Success</Tag>\r
      <Tag color="warning">Warning</Tag>\r
      <Tag color="destructive">Destructive</Tag>\r
      <Tag color="info">Info</Tag>\r
    </div>
}`,...(p=(g=s.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var f,x,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 8,
    alignItems: "center"
  }}>\r
      <Tag size="sm">Small</Tag>\r
      <Tag size="md">Medium</Tag>\r
      <Tag size="lg">Large</Tag>\r
    </div>
}`,...(y=(x=o.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var v,T,h;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 8
  }}>\r
      <Tag closable onClose={() => {}} color="primary">React</Tag>\r
      <Tag closable onClose={() => {}} color="success">Vue</Tag>\r
      <Tag closable onClose={() => {}} color="warning">Angular</Tag>\r
    </div>
}`,...(h=(T=t.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};var b,j,w;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Tag icon={<Star size={12} />} color="warning">Featured</Tag>
}`,...(w=(j=n.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};const X=["Default","AllColors","AllSizes","Closable","WithIcon"];export{s as AllColors,o as AllSizes,t as Closable,a as Default,n as WithIcon,X as __namedExportsOrder,O as default};
