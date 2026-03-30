import{j as e}from"./jsx-runtime-D_zvdyIk.js";const z={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"};function o({label:i,orientation:$="horizontal",dashed:N,spacing:d="md",className:l=""}){const c={sm:"my-2",md:"my-4",lg:"my-8"},r=N?"border-dashed":"border-solid";return $==="vertical"?e.jsx("div",{className:`inline-block h-full min-h-[24px] border-l border-border ${r} mx-3 ${l}`}):i?e.jsxs("div",{className:`flex items-center gap-3 ${c[d]} ${l}`,children:[e.jsx("div",{className:`flex-1 border-t border-border ${r}`}),e.jsx("span",{className:"text-muted-foreground flex-shrink-0",style:z,children:i}),e.jsx("div",{className:`flex-1 border-t border-border ${r}`})]}):e.jsx("hr",{className:`border-t border-border ${r} ${c[d]} ${l}`})}o.displayName="Divider";o.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{label:{required:!1,tsType:{name:"string"},description:""},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},dashed:{required:!1,tsType:{name:"boolean"},description:""},spacing:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const q={title:"Components/Divider",component:o,tags:["autodocs"],argTypes:{orientation:{control:"select",options:["horizontal","vertical"]},spacing:{control:"select",options:["sm","md","lg"]},dashed:{control:"boolean"}}},a={args:{}},s={args:{label:"OR"}},t={args:{dashed:!0}},n={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",height:40,gap:8},children:[e.jsx("span",{children:"Left"}),e.jsx(o,{orientation:"vertical"}),e.jsx("span",{children:"Right"})]})};var m,p,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {}
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var f,g,h;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: "OR"
  }
}`,...(h=(g=s.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var v,b,x;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    dashed: true
  }
}`,...(x=(b=t.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var y,j,D;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    height: 40,
    gap: 8
  }}>\r
      <span>Left</span>\r
      <Divider orientation="vertical" />\r
      <span>Right</span>\r
    </div>
}`,...(D=(j=n.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};const L=["Default","WithLabel","Dashed","Vertical"];export{t as Dashed,a as Default,n as Vertical,s as WithLabel,L as __namedExportsOrder,q as default};
