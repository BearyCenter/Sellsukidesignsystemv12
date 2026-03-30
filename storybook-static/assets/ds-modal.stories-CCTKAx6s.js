import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as t}from"./index-ZH-6pyQh.js";import{X as M}from"./x-DzaArQBv.js";import"./_commonjsHelpers-CqkleIqs.js";import"./createLucideIcon-DG6FjBK_.js";const A={sm:"max-w-sm",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl",full:"max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"};function s({open:n,onClose:r,title:o,description:i,size:l="md",children:f,footer:d,closeOnOverlay:b=!0,showCloseButton:a=!0,className:q=""}){const x=t.useRef(null);return t.useEffect(()=>{if(!n)return;const h=S=>{S.key==="Escape"&&r()};return document.addEventListener("keydown",h),document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",h),document.body.style.overflow=""}},[n,r]),t.useEffect(()=>{n&&x.current&&x.current.focus()},[n]),n?e.jsxs("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4",children:[e.jsx("div",{className:"absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200",onClick:b?r:void 0}),e.jsxs("div",{ref:x,tabIndex:-1,role:"dialog","aria-modal":"true","aria-labelledby":o?"modal-title":void 0,className:`relative w-full ${A[l]} bg-card rounded-[var(--radius-lg)] shadow-elevation-sm border border-border animate-in zoom-in-95 fade-in duration-200 flex flex-col ${l==="full"?"h-full":"max-h-[85vh]"} ${q}`,children:[(o||a)&&e.jsxs("div",{className:"flex items-start justify-between gap-4 px-6 pt-6 pb-2 flex-shrink-0",children:[e.jsxs("div",{className:"min-w-0 flex-1",children:[o&&e.jsx("h4",{id:"modal-title",className:"text-foreground",children:o}),i&&e.jsx("span",{className:"text-muted-foreground block mt-0.5",style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},children:i})]}),a&&e.jsx("button",{onClick:r,className:"flex-shrink-0 w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer","aria-label":"Close",children:e.jsx(M,{size:16})})]}),e.jsx("div",{className:"flex-1 overflow-y-auto px-6 py-4",style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},children:f}),d&&e.jsx("div",{className:"flex items-center justify-end gap-2 px-6 py-4 border-t border-border flex-shrink-0",children:d})]})]}):null}function g({open:n,onClose:r,onConfirm:o,title:i="Are you sure?",description:l="This action cannot be undone.",confirmLabel:f="Confirm",cancelLabel:d="Cancel",variant:b="default"}){const a={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"};return e.jsx(s,{open:n,onClose:r,title:i,description:l,size:"sm",children:e.jsxs("div",{className:"flex items-center justify-end gap-2 pt-4",children:[e.jsx("button",{onClick:r,className:"px-4 py-2 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-muted transition-colors cursor-pointer",style:a,children:d}),e.jsx("button",{onClick:()=>{o(),r()},className:`px-4 py-2 rounded-[var(--radius-md)] text-primary-foreground transition-colors cursor-pointer ${b==="destructive"?"bg-destructive hover:bg-destructive/90":"bg-primary hover:bg-primary/90"}`,style:a,children:f})]})})}s.__docgenInfo={description:"",methods:[],displayName:"Modal",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl" | "full"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'},{name:"literal",value:'"full"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},closeOnOverlay:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showCloseButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};g.__docgenInfo={description:"",methods:[],displayName:"ConfirmDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onConfirm:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Are you sure?"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"This action cannot be undone."',computed:!1}},confirmLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Confirm"',computed:!1}},cancelLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Cancel"',computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"default" | "destructive"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"destructive"'}]},description:"",defaultValue:{value:'"default"',computed:!1}}}};const I={title:"Components/Modal",component:s,tags:["autodocs"]},u={render:()=>{const[n,r]=t.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>r(!0),style:{padding:"8px 16px",background:"#32A9FF",color:"white",border:"none",borderRadius:8,cursor:"pointer"},children:"Open Modal"}),e.jsx(s,{open:n,onClose:()=>r(!1),title:"Modal Title",description:"This is a modal description.",children:e.jsx("p",{children:"Modal content goes here."})})]})}},c={render:()=>{const[n,r]=t.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>r(!0),style:{padding:"8px 16px",background:"#32A9FF",color:"white",border:"none",borderRadius:8,cursor:"pointer"},children:"Open Modal"}),e.jsx(s,{open:n,onClose:()=>r(!1),title:"Confirm Action",footer:e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>r(!1),style:{padding:"8px 16px",border:"1px solid #ddd",borderRadius:8,cursor:"pointer"},children:"Cancel"}),e.jsx("button",{onClick:()=>r(!1),style:{padding:"8px 16px",background:"#32A9FF",color:"white",border:"none",borderRadius:8,cursor:"pointer"},children:"Save"})]}),children:e.jsx("p",{children:"Are you sure you want to save these changes?"})})]})}},p={render:()=>{const[n,r]=t.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>r(!0),style:{padding:"8px 16px",background:"#32A9FF",color:"white",border:"none",borderRadius:8,cursor:"pointer"},children:"Confirm"}),e.jsx(g,{open:n,onClose:()=>r(!1),onConfirm:()=>alert("Confirmed!")})]})}},m={render:()=>{const[n,r]=t.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>r(!0),style:{padding:"8px 16px",background:"#E11D48",color:"white",border:"none",borderRadius:8,cursor:"pointer"},children:"Delete"}),e.jsx(g,{open:n,onClose:()=>r(!1),onConfirm:()=>alert("Deleted!"),title:"Delete Item",description:"This action cannot be undone.",variant:"destructive",confirmLabel:"Delete"})]})}};var v,y,C;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <button onClick={() => setOpen(true)} style={{
        padding: "8px 16px",
        background: "#32A9FF",
        color: "white",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
      }}>Open Modal</button>\r
        <Modal open={open} onClose={() => setOpen(false)} title="Modal Title" description="This is a modal description.">\r
          <p>Modal content goes here.</p>\r
        </Modal>\r
      </>;
  }
}`,...(C=(y=u.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var j,w,k;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <button onClick={() => setOpen(true)} style={{
        padding: "8px 16px",
        background: "#32A9FF",
        color: "white",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
      }}>Open Modal</button>\r
        <Modal open={open} onClose={() => setOpen(false)} title="Confirm Action" footer={<>\r
            <button onClick={() => setOpen(false)} style={{
          padding: "8px 16px",
          border: "1px solid #ddd",
          borderRadius: 8,
          cursor: "pointer"
        }}>Cancel</button>\r
            <button onClick={() => setOpen(false)} style={{
          padding: "8px 16px",
          background: "#32A9FF",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer"
        }}>Save</button>\r
          </>}>\r
          <p>Are you sure you want to save these changes?</p>\r
        </Modal>\r
      </>;
  }
}`,...(k=(w=c.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var F,T,O;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <button onClick={() => setOpen(true)} style={{
        padding: "8px 16px",
        background: "#32A9FF",
        color: "white",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
      }}>Confirm</button>\r
        <ConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={() => alert("Confirmed!")} />\r
      </>;
  }
}`,...(O=(T=p.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};var D,R,N;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <button onClick={() => setOpen(true)} style={{
        padding: "8px 16px",
        background: "#E11D48",
        color: "white",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
      }}>Delete</button>\r
        <ConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={() => alert("Deleted!")} title="Delete Item" description="This action cannot be undone." variant="destructive" confirmLabel="Delete" />\r
      </>;
  }
}`,...(N=(R=m.parameters)==null?void 0:R.docs)==null?void 0:N.source}}};const W=["Default","WithFooter","ConfirmDialogDefault","ConfirmDialogDestructive"];export{p as ConfirmDialogDefault,m as ConfirmDialogDestructive,u as Default,c as WithFooter,W as __namedExportsOrder,I as default};
