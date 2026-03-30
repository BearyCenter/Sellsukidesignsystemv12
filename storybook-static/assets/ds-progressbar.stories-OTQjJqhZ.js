import{j as e}from"./jsx-runtime-D_zvdyIk.js";const T={fontFamily:"var(--font-label)",fontSize:"var(--text-label)"},q={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"};function a({value:V,max:z=100,size:P="md",color:i,label:o,showValue:u,indeterminate:n,className:N=""}){const S={sm:"h-1.5",md:"h-2.5",lg:"h-4"},d=n?0:Math.min(100,Math.max(0,(V??0)/z*100));return e.jsxs("div",{className:`w-full ${N}`,children:[(o||u)&&e.jsxs("div",{className:"flex items-center justify-between mb-1.5",children:[o&&e.jsx("span",{className:"text-foreground",style:T,children:o}),u&&!n&&e.jsxs("span",{className:"text-muted-foreground",style:q,children:[Math.round(d),"%"]})]}),e.jsx("div",{className:`w-full ${S[P]} rounded-full bg-muted overflow-hidden`,children:n?e.jsx("div",{className:"h-full w-1/3 rounded-full animate-[indeterminate_1.5s_infinite_ease-in-out]",style:{backgroundColor:i??"var(--primary)"}}):e.jsx("div",{className:"h-full rounded-full transition-all duration-500",style:{width:`${d}%`,backgroundColor:i??"var(--primary)"}})}),e.jsx("style",{children:"@keyframes indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }"})]})}a.displayName="ProgressBar";a.__docgenInfo={description:"",methods:[],displayName:"ProgressBar",props:{value:{required:!1,tsType:{name:"number"},description:""},max:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},color:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},showValue:{required:!1,tsType:{name:"boolean"},description:""},indeterminate:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const C={title:"Components/ProgressBar",component:a,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]},value:{control:{type:"range",min:0,max:100}},showValue:{control:"boolean"},indeterminate:{control:"boolean"}}},s={args:{value:60,label:"Progress",showValue:!0}},r={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:400},children:[e.jsx(a,{value:40,size:"sm",label:"Small",showValue:!0}),e.jsx(a,{value:60,size:"md",label:"Medium",showValue:!0}),e.jsx(a,{value:80,size:"lg",label:"Large",showValue:!0})]})},l={args:{indeterminate:!0,label:"Loading..."}},t={args:{value:75,color:"#22c55e",label:"Upload Progress",showValue:!0}};var m,c,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    value: 60,
    label: "Progress",
    showValue: true
  }
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var f,g,v;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 400
  }}>\r
      <ProgressBar value={40} size="sm" label="Small" showValue />\r
      <ProgressBar value={60} size="md" label="Medium" showValue />\r
      <ProgressBar value={80} size="lg" label="Large" showValue />\r
    </div>
}`,...(v=(g=r.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var h,x,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    indeterminate: true,
    label: "Loading..."
  }
}`,...(b=(x=l.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var y,w,j;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    value: 75,
    color: "#22c55e",
    label: "Upload Progress",
    showValue: true
  }
}`,...(j=(w=t.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};const _=["Default","AllSizes","Indeterminate","CustomColor"];export{r as AllSizes,t as CustomColor,s as Default,l as Indeterminate,_ as __namedExportsOrder,C as default};
