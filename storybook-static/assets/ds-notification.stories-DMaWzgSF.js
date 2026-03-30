import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as Y}from"./index-ZH-6pyQh.js";import{X as B}from"./x-DzaArQBv.js";import{c as E}from"./createLucideIcon-DG6FjBK_.js";import{B as D}from"./bell-DyFwNdCs.js";import{C as P,T as $,I as V}from"./triangle-alert-Dacb_-T2.js";import{C as H}from"./circle-check-B9Qg33F-.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",key:"178tsu"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05",key:"1hqiys"}]],R=E("bell-off",X);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],G=E("external-link",U),M={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},N={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},J={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"},v={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"};function a({type:o="info",title:l,message:i,closable:d=!0,onClose:c,action:m,avatar:n,time:r,read:s}){const p={info:e.jsx(V,{size:16,className:"text-primary"}),success:e.jsx(H,{size:16,className:"text-chart-2"}),warning:e.jsx($,{size:16,className:"text-chart-5"}),error:e.jsx(P,{size:16,className:"text-destructive"})},b={info:"border-l-primary",success:"border-l-chart-2",warning:"border-l-chart-5",error:"border-l-destructive"};return e.jsxs("div",{className:`flex gap-3 px-4 py-3 rounded-[var(--radius-md)] border border-border bg-card border-l-[3px] ${b[o]} ${s===!1?"bg-primary/5":""}`,children:[n?e.jsx("div",{className:"w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden",style:N,children:e.jsx("span",{className:"text-primary",children:n.slice(0,2).toUpperCase()})}):e.jsx("span",{className:"flex-shrink-0 mt-0.5",children:p[o]}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2",children:[e.jsx("span",{className:"text-foreground",style:N,children:l}),e.jsxs("div",{className:"flex items-center gap-1 flex-shrink-0",children:[r&&e.jsx("span",{className:"text-muted-foreground",style:J,children:r}),s===!1&&e.jsx("span",{className:"w-2 h-2 rounded-full bg-primary"}),d&&c&&e.jsx("button",{onClick:c,className:"text-muted-foreground hover:text-foreground cursor-pointer",children:e.jsx(B,{size:14})})]})]}),i&&e.jsx("p",{className:"text-muted-foreground mt-0.5",style:M,children:i}),m&&e.jsxs("button",{onClick:m.onClick,className:"inline-flex items-center gap-1 text-primary mt-2 hover:underline cursor-pointer",style:v,children:[m.label," ",e.jsx(G,{size:12})]})]})]})}function L({items:o,onMarkRead:l,onMarkAllRead:i,onDismiss:d,onClearAll:c}){const[m,n]=Y.useState(o),r=l!==void 0||i!==void 0,s=r?o:m,p=s.filter(t=>!t.read).length,b=()=>{i&&i(),r||n(t=>t.map(u=>({...u,read:!0})))},F=t=>{d&&d(t),r||n(u=>u.filter(f=>f.id!==t))},O=t=>{l&&l(t),r||n(u=>u.map(f=>f.id===t?{...f,read:!0}:f))};return e.jsxs("div",{className:"max-w-md rounded-[var(--radius-lg)] border border-border bg-card overflow-hidden",children:[e.jsxs("div",{className:"px-4 py-3 border-b border-border flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(D,{size:16,className:"text-foreground"}),e.jsx("span",{className:"text-foreground",style:N,children:"Notifications"}),p>0&&e.jsx("span",{className:"px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground",style:v,children:p})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[p>0&&e.jsx("button",{onClick:b,className:"text-primary cursor-pointer",style:v,children:"Mark all read"}),s.length>0&&c&&e.jsx("button",{onClick:c,className:"text-muted-foreground hover:text-destructive cursor-pointer",style:v,children:"Clear all"})]})]}),e.jsx("div",{className:"divide-y divide-border max-h-[360px] overflow-y-auto",children:s.map(t=>e.jsx("div",{className:`px-3 py-2 ${t.read?"":"bg-primary/5"}`,onClick:()=>!t.read&&O(t.id),children:e.jsx(a,{type:t.type,title:t.title,message:t.message,time:t.time,read:t.read,closable:!!d,onClose:()=>F(t.id)})},t.id))}),s.length===0&&e.jsxs("div",{className:"py-10 text-center text-muted-foreground",children:[e.jsx(R,{size:24,className:"mx-auto mb-2 opacity-40"}),e.jsx("span",{style:M,children:"No notifications"})]})]})}a.__docgenInfo={description:"",methods:[],displayName:"Notification",props:{type:{required:!1,tsType:{name:"union",raw:'"info" | "success" | "warning" | "error"',elements:[{name:"literal",value:'"info"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"error"'}]},description:"",defaultValue:{value:'"info"',computed:!1}},title:{required:!0,tsType:{name:"string"},description:""},message:{required:!1,tsType:{name:"string"},description:""},closable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"signature",type:"object",raw:"{ label: string; onClick: () => void }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},description:""},avatar:{required:!1,tsType:{name:"string"},description:""},time:{required:!1,tsType:{name:"string"},description:""},read:{required:!1,tsType:{name:"boolean"},description:""}}};L.__docgenInfo={description:"",methods:[],displayName:"NotificationCenter",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotificationCenterItem"}],raw:"NotificationCenterItem[]"},description:""},onMarkRead:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:"Called when a single notification is marked as read"},onMarkAllRead:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:'Called when "Mark all read" is clicked'},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:"Called when a notification is dismissed/removed"},onClearAll:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when all notifications are cleared"}}};const ie={title:"Components/Notification",component:a,tags:["autodocs"],argTypes:{type:{control:"select",options:["info","success","warning","error"]},closable:{control:"boolean"}}},g={args:{type:"info",title:"New update available",message:"A new version of the application is ready to install."}},y={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,maxWidth:480},children:[e.jsx(a,{type:"info",title:"Information",message:"This is an informational notification."}),e.jsx(a,{type:"success",title:"Success",message:"Your changes have been saved."}),e.jsx(a,{type:"warning",title:"Warning",message:"Your subscription is about to expire."}),e.jsx(a,{type:"error",title:"Error",message:"Failed to process your request."})]})},x={args:{type:"success",title:"Order shipped",message:"Your order #1234 has been shipped.",action:{label:"Track Order",onClick:()=>{}},time:"2m ago"}},h={render:()=>e.jsx(L,{items:[{id:"1",type:"info",title:"Welcome",message:"Thanks for joining!",time:"1h ago",read:!1},{id:"2",type:"success",title:"Payment received",message:"Invoice #42 paid.",time:"3h ago",read:!1},{id:"3",type:"warning",title:"Low stock",message:"Product A is running low.",time:"1d ago",read:!0}]})};var j,w,k;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    type: "info",
    title: "New update available",
    message: "A new version of the application is ready to install."
  }
}`,...(k=(w=g.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var C,T,q;y.parameters={...y.parameters,docs:{...(C=y.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxWidth: 480
  }}>\r
      <Notification type="info" title="Information" message="This is an informational notification." />\r
      <Notification type="success" title="Success" message="Your changes have been saved." />\r
      <Notification type="warning" title="Warning" message="Your subscription is about to expire." />\r
      <Notification type="error" title="Error" message="Failed to process your request." />\r
    </div>
}`,...(q=(T=y.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var I,z,S;x.parameters={...x.parameters,docs:{...(I=x.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    type: "success",
    title: "Order shipped",
    message: "Your order #1234 has been shipped.",
    action: {
      label: "Track Order",
      onClick: () => {}
    },
    time: "2m ago"
  }
}`,...(S=(z=x.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};var W,A,_;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <NotificationCenter items={[{
    id: "1",
    type: "info",
    title: "Welcome",
    message: "Thanks for joining!",
    time: "1h ago",
    read: false
  }, {
    id: "2",
    type: "success",
    title: "Payment received",
    message: "Invoice #42 paid.",
    time: "3h ago",
    read: false
  }, {
    id: "3",
    type: "warning",
    title: "Low stock",
    message: "Product A is running low.",
    time: "1d ago",
    read: true
  }]} />
}`,...(_=(A=h.parameters)==null?void 0:A.docs)==null?void 0:_.source}}};const ne=["Default","AllTypes","WithAction","CenterExample"];export{y as AllTypes,h as CenterExample,g as Default,x as WithAction,ne as __namedExportsOrder,ie as default};
