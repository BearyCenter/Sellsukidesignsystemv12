import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as b}from"./index-ZH-6pyQh.js";import{X as H}from"./x-DzaArQBv.js";import{C as J,T as K,I as U}from"./triangle-alert-Dacb_-T2.js";import{C as Y}from"./circle-check-B9Qg33F-.js";import"./_commonjsHelpers-CqkleIqs.js";import"./createLucideIcon-DG6FjBK_.js";const Z={info:{bg:"bg-primary/5",border:"border-primary/30",text:"text-primary",icon:e.jsx(U,{size:18})},success:{bg:"bg-chart-2/5",border:"border-chart-2/30",text:"text-chart-2",icon:e.jsx(Y,{size:18})},warning:{bg:"bg-chart-5/5",border:"border-chart-5/30",text:"text-chart-5",icon:e.jsx(K,{size:18})},error:{bg:"bg-destructive/5",border:"border-destructive/30",text:"text-destructive",icon:e.jsx(J,{size:18})}};function a({variant:r="info",title:s,children:l,dismissible:t=!1,onDismiss:x,action:h,icon:L,className:M=""}){const[Q,B]=b.useState(!0),i=Z[r];if(!Q)return null;const G=()=>{B(!1),x==null||x()};return e.jsxs("div",{className:`flex gap-3 p-4 rounded-[var(--radius)] border ${i.bg} ${i.border} ${M}`,role:"alert",children:[e.jsx("span",{className:`flex-shrink-0 mt-0.5 ${i.text}`,children:L??i.icon}),e.jsxs("div",{className:"flex-1 min-w-0",children:[s&&e.jsx("span",{className:`block ${i.text}`,style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},children:s}),e.jsx("span",{className:"text-foreground block",style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},children:l}),h&&e.jsx("div",{className:"mt-2",children:h})]}),t&&e.jsx("button",{onClick:G,className:"flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer","aria-label":"Dismiss",children:e.jsx(H,{size:16})})]})}let X=[],o=[];function v(){X.forEach(r=>r([...o]))}const n={show:r=>{const s={...r,id:`toast-${Date.now()}-${Math.random().toString(36).slice(2)}`};o=[...o,s],v(),setTimeout(()=>{n.dismiss(s.id)},r.duration??4e3)},info:(r,s)=>n.show({variant:"info",message:r,title:s}),success:(r,s)=>n.show({variant:"success",message:r,title:s}),warning:(r,s)=>n.show({variant:"warning",message:r,title:s}),error:(r,s)=>n.show({variant:"error",message:r,title:s}),dismiss:r=>{o=o.filter(s=>s.id!==r),v()}};function P(){const[r,s]=b.useState([]),l=b.useRef(!1);return l.current||(l.current=!0,X.push(s)),r.length===0?null:e.jsx("div",{className:"fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none",children:r.map(t=>e.jsx("div",{className:"pointer-events-auto animate-in slide-in-from-right fade-in duration-300",children:e.jsx(a,{variant:t.variant,title:t.title,dismissible:!0,onDismiss:()=>n.dismiss(t.id),children:t.message})},t.id))})}a.__docgenInfo={description:"",methods:[],displayName:"Alert",props:{variant:{required:!1,tsType:{name:"union",raw:'"info" | "success" | "warning" | "error"',elements:[{name:"literal",value:'"info"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"error"'}]},description:"",defaultValue:{value:'"info"',computed:!1}},title:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},dismissible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};P.__docgenInfo={description:"",methods:[],displayName:"ToastContainer"};const oe={title:"Components/Alert",component:a,tags:["autodocs"],argTypes:{variant:{control:"select",options:["info","success","warning","error"]},dismissible:{control:"boolean"}}},c={args:{variant:"info",title:"Information",children:"This is an informational message."}},d={args:{variant:"success",title:"Success",children:"Operation completed successfully."}},u={args:{variant:"warning",title:"Warning",children:"Please review your changes."}},p={args:{variant:"error",title:"Error",children:"Something went wrong."}},m={args:{variant:"info",title:"Dismissible",children:"Click X to dismiss.",dismissible:!0}},f={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(a,{variant:"info",title:"Info",children:"Informational message."}),e.jsx(a,{variant:"success",title:"Success",children:"Operation completed."}),e.jsx(a,{variant:"warning",title:"Warning",children:"Review your changes."}),e.jsx(a,{variant:"error",title:"Error",children:"Something went wrong."})]})},g={render:()=>e.jsxs("div",{children:[e.jsx(P,{}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>n.info("Info toast"),style:{padding:"8px 16px",border:"1px solid #ddd",borderRadius:6,cursor:"pointer"},children:"Info"}),e.jsx("button",{onClick:()=>n.success("Saved!"),style:{padding:"8px 16px",border:"1px solid #ddd",borderRadius:6,cursor:"pointer"},children:"Success"}),e.jsx("button",{onClick:()=>n.warning("Check input"),style:{padding:"8px 16px",border:"1px solid #ddd",borderRadius:6,cursor:"pointer"},children:"Warning"}),e.jsx("button",{onClick:()=>n.error("Failed"),style:{padding:"8px 16px",border:"1px solid #ddd",borderRadius:6,cursor:"pointer"},children:"Error"})]})]})};var w,y,j;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: "info",
    title: "Information",
    children: "This is an informational message."
  }
}`,...(j=(y=c.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var S,R,C;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: "success",
    title: "Success",
    children: "Operation completed successfully."
  }
}`,...(C=(R=d.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var T,k,N;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Warning",
    children: "Please review your changes."
  }
}`,...(N=(k=u.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var I,A,E;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Error",
    children: "Something went wrong."
  }
}`,...(E=(A=p.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var W,D,q;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    variant: "info",
    title: "Dismissible",
    children: "Click X to dismiss.",
    dismissible: true
  }
}`,...(q=(D=m.parameters)==null?void 0:D.docs)==null?void 0:q.source}}};var z,$,V;f.parameters={...f.parameters,docs:{...(z=f.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12
  }}>\r
      <Alert variant="info" title="Info">Informational message.</Alert>\r
      <Alert variant="success" title="Success">Operation completed.</Alert>\r
      <Alert variant="warning" title="Warning">Review your changes.</Alert>\r
      <Alert variant="error" title="Error">Something went wrong.</Alert>\r
    </div>
}`,...(V=($=f.parameters)==null?void 0:$.docs)==null?void 0:V.source}}};var _,O,F;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div>\r
      <ToastContainer />\r
      <div style={{
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }}>\r
        <button onClick={() => toast.info("Info toast")} style={{
        padding: "8px 16px",
        border: "1px solid #ddd",
        borderRadius: 6,
        cursor: "pointer"
      }}>Info</button>\r
        <button onClick={() => toast.success("Saved!")} style={{
        padding: "8px 16px",
        border: "1px solid #ddd",
        borderRadius: 6,
        cursor: "pointer"
      }}>Success</button>\r
        <button onClick={() => toast.warning("Check input")} style={{
        padding: "8px 16px",
        border: "1px solid #ddd",
        borderRadius: 6,
        cursor: "pointer"
      }}>Warning</button>\r
        <button onClick={() => toast.error("Failed")} style={{
        padding: "8px 16px",
        border: "1px solid #ddd",
        borderRadius: 6,
        cursor: "pointer"
      }}>Error</button>\r
      </div>\r
    </div>
}`,...(F=(O=g.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};const le=["Info","Success","Warning","Error","Dismissible","AllVariants","ToastDemo"];export{f as AllVariants,m as Dismissible,p as Error,c as Info,d as Success,g as ToastDemo,u as Warning,le as __namedExportsOrder,oe as default};
