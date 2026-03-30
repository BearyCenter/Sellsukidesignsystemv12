import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{E as W}from"./ellipsis-DDkn3aFt.js";import{c as B}from"./createLucideIcon-DG6FjBK_.js";import{C as _}from"./chevron-right-BjfhjwKz.js";import{H as q}from"./house-CGCrBEi_.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["circle",{cx:"12.1",cy:"12.1",r:"1",key:"18d7e5"}]],P=B("dot",E);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M22 2 2 22",key:"y4kqgn"}]],k=B("slash",T),A={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},F={sm:{fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"},md:A,lg:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"}};function t({items:s,separator:p="chevron",size:m="md",maxItems:d}){const C=p==="slash"?e.jsx(k,{size:12,className:"text-muted-foreground"}):p==="dot"?e.jsx(P,{size:16,className:"text-muted-foreground"}):e.jsx(_,{size:12,className:"text-muted-foreground"}),D=m==="sm"?"gap-1":m==="lg"?"gap-2.5":"gap-1.5",f=F[m];let u=s;if(d&&s.length>d){const r=s.slice(0,1),a=s.slice(-(d-1));u=[...r,{label:"…"},...a]}return e.jsx("nav",{"aria-label":"Breadcrumb",children:e.jsx("ol",{className:`flex items-center flex-wrap ${D}`,children:u.map((r,a)=>e.jsxs("li",{className:"flex items-center gap-1.5",children:[a>0&&e.jsx("span",{className:"mx-0.5",children:C}),r.label==="…"?e.jsx("span",{className:"w-6 h-6 flex items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground hover:bg-accent cursor-pointer",children:e.jsx(W,{size:14})}):a===u.length-1?e.jsxs("span",{className:"inline-flex items-center gap-1.5 text-foreground",style:{...f,fontWeight:"var(--weight-button)"},children:[r.icon,r.label]}):e.jsxs("a",{href:r.href||"#",onClick:H=>H.preventDefault(),className:"inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors",style:f,children:[r.icon,r.label]})]},a))})})}t.__docgenInfo={description:"",methods:[],displayName:"Breadcrumb",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"BreadcrumbItem"}],raw:"BreadcrumbItem[]"},description:""},separator:{required:!1,tsType:{name:"union",raw:'"chevron" | "slash" | "dot"',elements:[{name:"literal",value:'"chevron"'},{name:"literal",value:'"slash"'},{name:"literal",value:'"dot"'}]},description:"",defaultValue:{value:'"chevron"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},maxItems:{required:!1,tsType:{name:"number"},description:""}}};const J={title:"Components/Breadcrumb",component:t,tags:["autodocs"],argTypes:{separator:{control:"select",options:["chevron","slash","dot"]},size:{control:"select",options:["sm","md","lg"]}}},i=[{label:"Home",href:"/"},{label:"Products",href:"/products"},{label:"Electronics",href:"/products/electronics"},{label:"Laptops"}],o={args:{items:i}},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(t,{items:i,separator:"chevron"}),e.jsx(t,{items:i,separator:"slash"}),e.jsx(t,{items:i,separator:"dot"})]})},l={args:{items:[{label:"Home",href:"/"},{label:"Category",href:"/cat"},{label:"Sub Category",href:"/cat/sub"},{label:"Products",href:"/products"},{label:"Detail"}],maxItems:3}},c={args:{items:[{label:"Home",href:"/",icon:e.jsx(q,{size:14})},{label:"Settings",href:"/settings"},{label:"Profile"}]}};var h,g,b;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    items
  }
}`,...(b=(g=o.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var x,v,y;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>\r
      <Breadcrumb items={items} separator="chevron" />\r
      <Breadcrumb items={items} separator="slash" />\r
      <Breadcrumb items={items} separator="dot" />\r
    </div>
}`,...(y=(v=n.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var j,S,N;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Home",
      href: "/"
    }, {
      label: "Category",
      href: "/cat"
    }, {
      label: "Sub Category",
      href: "/cat/sub"
    }, {
      label: "Products",
      href: "/products"
    }, {
      label: "Detail"
    }],
    maxItems: 3
  }
}`,...(N=(S=l.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};var I,w,z;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Home",
      href: "/",
      icon: <Home size={14} />
    }, {
      label: "Settings",
      href: "/settings"
    }, {
      label: "Profile"
    }]
  }
}`,...(z=(w=c.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};const K=["Default","AllSeparators","WithMaxItems","WithIcon"];export{n as AllSeparators,o as Default,c as WithIcon,l as WithMaxItems,K as __namedExportsOrder,J as default};
