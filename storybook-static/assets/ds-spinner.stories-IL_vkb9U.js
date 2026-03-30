import{j as s}from"./jsx-runtime-D_zvdyIk.js";const z={sm:"w-4 h-4 border-2",md:"w-8 h-8 border-[3px]",lg:"w-12 h-12 border-4",xl:"w-16 h-16 border-4"};function e({size:g="md",color:x,className:f=""}){return s.jsx("div",{className:`${z[g]} rounded-full border-muted animate-spin ${f}`,style:{borderTopColor:x??"var(--primary)"},role:"status","aria-label":"Loading"})}e.displayName="Spinner";e.__docgenInfo={description:"",methods:[],displayName:"Spinner",props:{size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"Spinner size",defaultValue:{value:'"md"',computed:!1}},color:{required:!1,tsType:{name:"string"},description:"Spinner color (CSS value)"},className:{required:!1,tsType:{name:"string"},description:"Additional class name",defaultValue:{value:'""',computed:!1}}}};const v={title:"Components/Spinner",component:e,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg","xl"]}}},r={args:{size:"md"}},a={render:()=>s.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center"},children:[s.jsx(e,{size:"sm"}),s.jsx(e,{size:"md"}),s.jsx(e,{size:"lg"}),s.jsx(e,{size:"xl"})]})},n={args:{size:"lg",color:"#ef4444"}};var l,o,i;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    size: "md"
  }
}`,...(i=(o=r.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var t,d,m;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 16,
    alignItems: "center"
  }}>\r
      <Spinner size="sm" />\r
      <Spinner size="md" />\r
      <Spinner size="lg" />\r
      <Spinner size="xl" />\r
    </div>
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,c,u;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    size: "lg",
    color: "#ef4444"
  }
}`,...(u=(c=n.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const y=["Default","AllSizes","CustomColor"];export{a as AllSizes,n as CustomColor,r as Default,y as __namedExportsOrder,v as default};
