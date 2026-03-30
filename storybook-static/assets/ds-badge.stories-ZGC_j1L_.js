import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{X as O}from"./x-DzaArQBv.js";import{S as V}from"./star-Ct95z5pi.js";import"./createLucideIcon-DG6FjBK_.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";const k={default:"bg-primary text-primary-foreground",secondary:"bg-secondary/15 text-secondary",outline:"bg-transparent border border-border text-foreground",destructive:"bg-destructive/15 text-destructive",success:"bg-chart-2/15 text-chart-2",warning:"bg-chart-5/15 text-chart-5"},C={sm:{className:"px-1.5 py-0.5 gap-1",style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},iconSize:10},md:{className:"px-2.5 py-0.5 gap-1.5",style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},iconSize:12},lg:{className:"px-3 py-1 gap-1.5",style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},iconSize:14}},_={default:"bg-primary-foreground",secondary:"bg-secondary",outline:"bg-foreground",destructive:"bg-destructive",success:"bg-chart-2",warning:"bg-chart-5"};function a({children:W,variant:d="default",size:q="md",icon:c,dot:D,removable:A,onRemove:F,className:I=""}){const o=C[q];return e.jsxs("span",{className:`inline-flex items-center rounded-full whitespace-nowrap ${k[d]} ${o.className} ${I}`,style:{...o.style,lineHeight:"1.2"},children:[D&&e.jsx("span",{className:`w-1.5 h-1.5 rounded-full flex-shrink-0 ${_[d]}`}),c&&e.jsx("span",{className:"flex-shrink-0",children:c}),e.jsx("span",{children:W}),A&&e.jsx("button",{onClick:F,className:"flex-shrink-0 hover:opacity-70 transition-opacity cursor-pointer rounded-full -mr-0.5","aria-label":"Remove",children:e.jsx(O,{size:o.iconSize})})]})}a.__docgenInfo={description:"",methods:[],displayName:"Badge",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},variant:{required:!1,tsType:{name:"union",raw:`| "default"\r
| "secondary"\r
| "outline"\r
| "destructive"\r
| "success"\r
| "warning"`,elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"secondary"'},{name:"literal",value:'"outline"'},{name:"literal",value:'"destructive"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},dot:{required:!1,tsType:{name:"boolean"},description:""},removable:{required:!1,tsType:{name:"boolean"},description:""},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const X={title:"Components/Badge",component:a,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","secondary","outline","destructive","success","warning"]},size:{control:"select",options:["sm","md","lg"]},dot:{control:"boolean"},removable:{control:"boolean"}}},r={args:{children:"Badge"}},n={render:()=>e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx(a,{variant:"default",children:"Default"}),e.jsx(a,{variant:"secondary",children:"Secondary"}),e.jsx(a,{variant:"outline",children:"Outline"}),e.jsx(a,{variant:"destructive",children:"Destructive"}),e.jsx(a,{variant:"success",children:"Success"}),e.jsx(a,{variant:"warning",children:"Warning"})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(a,{size:"sm",children:"Small"}),e.jsx(a,{size:"md",children:"Medium"}),e.jsx(a,{size:"lg",children:"Large"})]})},s={render:()=>e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx(a,{dot:!0,variant:"success",children:"Active"}),e.jsx(a,{dot:!0,variant:"destructive",children:"Offline"}),e.jsx(a,{dot:!0,variant:"warning",children:"Pending"})]})},i={render:()=>e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx(a,{removable:!0,onRemove:()=>{},children:"Tag 1"}),e.jsx(a,{removable:!0,onRemove:()=>{},variant:"secondary",children:"Tag 2"})]})},l={render:()=>e.jsx(a,{icon:e.jsx(V,{size:12}),variant:"warning",children:"Featured"})};var u,m,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: "Badge"
  }
}`,...(g=(m=r.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var p,v,f;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 8,
    flexWrap: "wrap"
  }}>\r
      <Badge variant="default">Default</Badge>\r
      <Badge variant="secondary">Secondary</Badge>\r
      <Badge variant="outline">Outline</Badge>\r
      <Badge variant="destructive">Destructive</Badge>\r
      <Badge variant="success">Success</Badge>\r
      <Badge variant="warning">Warning</Badge>\r
    </div>
}`,...(f=(v=n.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var y,x,h;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 8,
    alignItems: "center"
  }}>\r
      <Badge size="sm">Small</Badge>\r
      <Badge size="md">Medium</Badge>\r
      <Badge size="lg">Large</Badge>\r
    </div>
}`,...(h=(x=t.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var b,B,j;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 8
  }}>\r
      <Badge dot variant="success">Active</Badge>\r
      <Badge dot variant="destructive">Offline</Badge>\r
      <Badge dot variant="warning">Pending</Badge>\r
    </div>
}`,...(j=(B=s.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};var S,w,z;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 8
  }}>\r
      <Badge removable onRemove={() => {}}>Tag 1</Badge>\r
      <Badge removable onRemove={() => {}} variant="secondary">Tag 2</Badge>\r
    </div>
}`,...(z=(w=i.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var R,N,T;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <Badge icon={<Star size={12} />} variant="warning">Featured</Badge>
}`,...(T=(N=l.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};const G=["Default","AllVariants","AllSizes","WithDot","Removable","WithIcon"];export{t as AllSizes,n as AllVariants,r as Default,i as Removable,s as WithDot,l as WithIcon,G as __namedExportsOrder,X as default};
