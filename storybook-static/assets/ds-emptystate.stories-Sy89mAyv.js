import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as k}from"./inbox-BGao-uSU.js";import{S as z}from"./search-C31aNDpM.js";import{P as c}from"./plus-D8yesTpw.js";import"./createLucideIcon-DG6FjBK_.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";const C={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},d={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"};function v({icon:a,title:j,description:l,action:t,secondaryAction:r,size:s="md"}){const S=s==="sm"?"w-10 h-10":s==="lg"?"w-16 h-16":"w-12 h-12",N=s==="sm"?"py-6 px-4":s==="lg"?"py-14 px-8":"py-10 px-6";return e.jsxs("div",{className:`flex flex-col items-center text-center ${N}`,children:[a&&e.jsx("div",{className:`${S} rounded-full bg-muted flex items-center justify-center mb-4`,children:e.jsx("span",{className:"text-muted-foreground",children:a})}),e.jsx("h4",{className:"text-foreground",children:j}),l&&e.jsx("p",{className:"text-muted-foreground mt-1.5 max-w-sm",style:C,children:l}),(t||r)&&e.jsxs("div",{className:"flex items-center gap-3 mt-5",children:[t&&e.jsxs("button",{onClick:t.onClick,className:"inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer",style:d,children:[t.icon,t.label]}),r&&e.jsx("button",{onClick:r.onClick,className:"inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-accent transition-colors cursor-pointer",style:d,children:r.label})]})]})}v.__docgenInfo={description:"",methods:[],displayName:"EmptyState",props:{icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},title:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},action:{required:!1,tsType:{name:"EmptyStateAction"},description:""},secondaryAction:{required:!1,tsType:{name:"signature",type:"object",raw:"{ label: string; onClick: () => void }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}}}};const R={title:"Components/EmptyState",component:v,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]}}},o={args:{icon:e.jsx(k,{size:24}),title:"No items found",description:"There are no items to display at this time."}},n={args:{icon:e.jsx(c,{size:24}),title:"No products yet",description:"Start by adding your first product to the catalog.",action:{label:"Add Product",onClick:()=>{},icon:e.jsx(c,{size:14})},secondaryAction:{label:"Import",onClick:()=>{}}}},i={args:{icon:e.jsx(z,{size:24}),title:"No results found",description:"Try adjusting your search or filter criteria.",size:"sm"}};var m,p,u;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    icon: <Inbox size={24} />,
    title: "No items found",
    description: "There are no items to display at this time."
  }
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,f,y;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    icon: <Plus size={24} />,
    title: "No products yet",
    description: "Start by adding your first product to the catalog.",
    action: {
      label: "Add Product",
      onClick: () => {},
      icon: <Plus size={14} />
    },
    secondaryAction: {
      label: "Import",
      onClick: () => {}
    }
  }
}`,...(y=(f=n.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var x,h,b;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    icon: <Search size={24} />,
    title: "No results found",
    description: "Try adjusting your search or filter criteria.",
    size: "sm"
  }
}`,...(b=(h=i.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};const W=["Default","WithAction","SearchEmpty"];export{o as Default,i as SearchEmpty,n as WithAction,W as __namedExportsOrder,R as default};
