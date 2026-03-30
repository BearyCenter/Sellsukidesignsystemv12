import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as x}from"./circle-check-B9Qg33F-.js";import{c as k}from"./createLucideIcon-DG6FjBK_.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],h=k("circle",E),F={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},v={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},m={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"};function _({items:r,variant:p="default",size:a="md"}){const f=a==="sm"?"w-6 h-6":a==="lg"?"w-10 h-10":"w-8 h-8",n=a==="sm"?12:a==="lg"?18:14,g=t=>t==="completed"?"bg-chart-2 text-primary-foreground":t==="current"?"bg-primary text-primary-foreground":t==="error"?"bg-destructive text-primary-foreground":"bg-muted text-muted-foreground";return p==="compact"?e.jsx("div",{className:"space-y-0",children:r.map((t,s)=>e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:`${f} rounded-full flex items-center justify-center flex-shrink-0 ${g(t.status)}`,children:t.icon||(t.status==="completed"?e.jsx(x,{size:n}):e.jsx(h,{size:n}))}),s<r.length-1&&e.jsx("div",{className:"w-0.5 flex-1 min-h-4 bg-border"})]}),e.jsxs("div",{className:"pb-4 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-foreground",style:v,children:t.title}),t.time&&e.jsx("span",{className:"text-muted-foreground",style:m,children:t.time})]}),t.description&&e.jsx("p",{className:"text-muted-foreground mt-0.5",style:m,children:t.description})]})]},s))}):e.jsx("div",{className:"relative",children:r.map((t,s)=>{const d=p==="alternate"&&s%2===1;return e.jsxs("div",{className:`flex gap-4 pb-8 last:pb-0 ${d?"flex-row-reverse":""}`,children:[e.jsxs("div",{className:"flex flex-col items-center flex-shrink-0",children:[e.jsx("div",{className:`${f} rounded-full flex items-center justify-center ${g(t.status)}`,children:t.icon||(t.status==="completed"?e.jsx(x,{size:n}):e.jsx(h,{size:n}))}),s<r.length-1&&e.jsx("div",{className:"w-0.5 flex-1 bg-border mt-1"})]}),e.jsxs("div",{className:`flex-1 min-w-0 ${d?"text-right":""}`,children:[e.jsxs("div",{className:`flex items-center gap-2 ${d?"justify-end":""}`,children:[e.jsx("span",{className:"text-foreground",style:v,children:t.title}),t.time&&e.jsx("span",{className:"text-muted-foreground",style:m,children:t.time})]}),t.description&&e.jsx("p",{className:"text-muted-foreground mt-0.5",style:F,children:t.description}),t.children&&e.jsx("div",{className:"mt-2",children:t.children})]})]},s)})})}_.__docgenInfo={description:"",methods:[],displayName:"Timeline",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"TimelineItem"}],raw:"TimelineItem[]"},description:""},variant:{required:!1,tsType:{name:"union",raw:'"default" | "alternate" | "compact"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"alternate"'},{name:"literal",value:'"compact"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}}}};const D={title:"Components/Timeline",component:_,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","alternate","compact"]},size:{control:"select",options:["sm","md","lg"]}}},u=[{title:"Order placed",description:"Your order has been confirmed.",time:"10:00 AM",status:"completed"},{title:"Payment received",description:"Payment processed successfully.",time:"10:15 AM",status:"completed"},{title:"Shipping",description:"Package is being prepared.",time:"11:00 AM",status:"current"},{title:"Delivered",description:"Estimated delivery tomorrow.",status:"pending"}],l={args:{items:u}},i={args:{items:u,variant:"alternate"}},o={args:{items:u,variant:"compact"}},c={args:{items:[{title:"Started",status:"completed",time:"9:00 AM"},{title:"Processing",status:"completed",time:"9:30 AM"},{title:"Failed",description:"An error occurred during processing.",status:"error",time:"10:00 AM"}]}};var j,y,b;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    items
  }
}`,...(b=(y=l.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var N,w,A;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    items,
    variant: "alternate"
  }
}`,...(A=(w=i.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var S,M,T;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    items,
    variant: "compact"
  }
}`,...(T=(M=o.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var z,C,$;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    items: [{
      title: "Started",
      status: "completed" as const,
      time: "9:00 AM"
    }, {
      title: "Processing",
      status: "completed" as const,
      time: "9:30 AM"
    }, {
      title: "Failed",
      description: "An error occurred during processing.",
      status: "error" as const,
      time: "10:00 AM"
    }]
  }
}`,...($=(C=c.parameters)==null?void 0:C.docs)==null?void 0:$.source}}};const O=["Default","Alternate","Compact","WithError"];export{i as Alternate,o as Compact,l as Default,c as WithError,O as __namedExportsOrder,D as default};
