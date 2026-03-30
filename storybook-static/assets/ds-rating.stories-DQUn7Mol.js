import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as q}from"./index-ZH-6pyQh.js";import{c as A}from"./createLucideIcon-DG6FjBK_.js";import{S as M}from"./star-Ct95z5pi.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],C=A("heart",$);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M7 10v12",key:"1qc93n"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",key:"emmmcr"}]],F=A("thumbs-up",E),W={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},Z={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"};function a({value:r=0,onChange:n,max:v=5,size:l="md",disabled:s,readOnly:o,icon:p="star",showValue:_,label:f}){const[N,g]=q.useState(0),D=l==="sm"?16:l==="lg"?28:20,k=l==="sm"?"gap-0.5":l==="lg"?"gap-1.5":"gap-1",H=p==="heart"?C:p==="thumb"?F:M,I=p==="heart"?"text-destructive":"text-chart-5",L=Array.from({length:v},(t,i)=>i+1);return e.jsxs("div",{className:`inline-flex items-center ${k} ${s?"opacity-50 pointer-events-none":""}`,children:[f&&e.jsx("span",{className:"text-foreground mr-2",style:W,children:f}),L.map(t=>{const i=t<=(N||r);return e.jsx("button",{type:"button",className:`transition-transform ${o||s?"":"cursor-pointer hover:scale-110"} ${i?I:"text-muted-foreground/40"}`,onMouseEnter:()=>!o&&!s&&g(t),onMouseLeave:()=>g(0),onClick:()=>!o&&!s&&(n==null?void 0:n(t===r?0:t)),disabled:s||o,children:e.jsx(H,{size:D,fill:i?"currentColor":"none"})},t)}),_&&e.jsxs("span",{className:"text-foreground ml-1",style:Z,children:[r,"/",v]})]})}a.__docgenInfo={description:"",methods:[],displayName:"Rating",props:{value:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(v: number) => void",signature:{arguments:[{type:{name:"number"},name:"v"}],return:{name:"void"}}},description:""},max:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"5",computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},icon:{required:!1,tsType:{name:"union",raw:'"star" | "heart" | "thumb"',elements:[{name:"literal",value:'"star"'},{name:"literal",value:'"heart"'},{name:"literal",value:'"thumb"'}]},description:"",defaultValue:{value:'"star"',computed:!1}},showValue:{required:!1,tsType:{name:"boolean"},description:""},label:{required:!1,tsType:{name:"string"},description:""}}};const P={title:"Components/Rating",component:a,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]},icon:{control:"select",options:["star","heart","thumb"]},max:{control:{type:"number",min:1,max:10}},readOnly:{control:"boolean"},disabled:{control:"boolean"},showValue:{control:"boolean"}}},u={render:()=>{const[r,n]=q.useState(3);return e.jsx(a,{value:r,onChange:n,showValue:!0})}},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(a,{value:4,icon:"star",label:"Stars",readOnly:!0}),e.jsx(a,{value:3,icon:"heart",label:"Hearts",readOnly:!0}),e.jsx(a,{value:2,icon:"thumb",label:"Thumbs",readOnly:!0})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(a,{value:3,size:"sm",showValue:!0,readOnly:!0}),e.jsx(a,{value:3,size:"md",showValue:!0,readOnly:!0}),e.jsx(a,{value:3,size:"lg",showValue:!0,readOnly:!0})]})},d={args:{value:4,readOnly:!0,showValue:!0,label:"Average Rating"}};var h,y,b;u.parameters={...u.parameters,docs:{...(h=u.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState(3);
    return <Rating value={val} onChange={setVal} showValue />;
  }
}`,...(b=(y=u.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var x,V,w;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12
  }}>\r
      <Rating value={4} icon="star" label="Stars" readOnly />\r
      <Rating value={3} icon="heart" label="Hearts" readOnly />\r
      <Rating value={2} icon="thumb" label="Thumbs" readOnly />\r
    </div>
}`,...(w=(V=c.parameters)==null?void 0:V.docs)==null?void 0:w.source}}};var j,O,S;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12
  }}>\r
      <Rating value={3} size="sm" showValue readOnly />\r
      <Rating value={3} size="md" showValue readOnly />\r
      <Rating value={3} size="lg" showValue readOnly />\r
    </div>
}`,...(S=(O=m.parameters)==null?void 0:O.docs)==null?void 0:S.source}}};var R,T,z;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    value: 4,
    readOnly: true,
    showValue: true,
    label: "Average Rating"
  }
}`,...(z=(T=d.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};const Q=["Default","AllIcons","AllSizes","ReadOnly"];export{c as AllIcons,m as AllSizes,u as Default,d as ReadOnly,Q as __namedExportsOrder,P as default};
