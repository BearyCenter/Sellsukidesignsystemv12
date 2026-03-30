import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{X as k}from"./x-DzaArQBv.js";import{r as i}from"./index-ZH-6pyQh.js";import"./createLucideIcon-DG6FjBK_.js";import"./_commonjsHelpers-CqkleIqs.js";const S={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"};function n({open:r,onClose:t,title:d,children:y,side:D="right",size:s="md",footer:c,className:C=""}){if(!r)return null;const p={sm:"w-72",md:"w-96",lg:"w-[480px]"},m={sm:"h-48",md:"h-72",lg:"h-96"},O={right:`top-0 right-0 h-full ${p[s]} animate-[slideRight_0.2s_ease]`,left:`top-0 left-0 h-full ${p[s]} animate-[slideLeft_0.2s_ease]`,top:`top-0 left-0 w-full ${m[s]} animate-[slideTop_0.2s_ease]`,bottom:`bottom-0 left-0 w-full ${m[s]} animate-[slideBottom_0.2s_ease]`};return e.jsxs("div",{className:"fixed inset-0 z-50",children:[e.jsx("div",{className:"absolute inset-0 bg-foreground/20",onClick:t}),e.jsxs("div",{className:`absolute bg-card border border-border shadow-elevation-sm flex flex-col ${O[D]} ${C}`,children:[d&&e.jsxs("div",{className:"px-5 py-4 border-b border-border flex items-center justify-between flex-shrink-0",children:[e.jsx("span",{className:"text-foreground",style:S,children:d}),e.jsx("button",{onClick:t,className:"text-muted-foreground hover:text-foreground cursor-pointer",children:e.jsx(k,{size:18})})]}),e.jsx("div",{className:"flex-1 overflow-y-auto p-5",children:y}),c&&e.jsx("div",{className:"px-5 py-3 border-t border-border flex items-center gap-2 flex-shrink-0",children:c})]}),e.jsx("style",{children:`
        @keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideTop { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes slideBottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `})]})}n.displayName="Drawer";n.__docgenInfo={description:"",methods:[],displayName:"Drawer",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},side:{required:!1,tsType:{name:"union",raw:'"left" | "right" | "top" | "bottom"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'},{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:"",defaultValue:{value:'"right"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const L={title:"Components/Drawer",component:n,tags:["autodocs"],argTypes:{side:{control:"select",options:["left","right","top","bottom"]},size:{control:"select",options:["sm","md","lg"]}}},o={render:()=>{const[r,t]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>t(!0),children:"Open Drawer"}),e.jsx(n,{open:r,onClose:()=>t(!1),title:"Drawer Title",children:e.jsx("p",{children:"Drawer content goes here."})})]})}},a={render:()=>{const[r,t]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>t(!0),children:"Open Left Drawer"}),e.jsx(n,{open:r,onClose:()=>t(!1),title:"Left Drawer",side:"left",children:e.jsx("p",{children:"This drawer slides in from the left."})})]})}},l={render:()=>{const[r,t]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>t(!0),children:"Open Drawer with Footer"}),e.jsx(n,{open:r,onClose:()=>t(!1),title:"Settings",footer:e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>t(!1),children:"Cancel"}),e.jsx("button",{onClick:()=>t(!1),children:"Save"})]}),children:e.jsx("p",{children:"Edit your settings here."})})]})}};var u,f,h;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <button onClick={() => setOpen(true)}>Open Drawer</button>\r
        <Drawer open={open} onClose={() => setOpen(false)} title="Drawer Title">\r
          <p>Drawer content goes here.</p>\r
        </Drawer>\r
      </>;
  }
}`,...(h=(f=o.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var g,x,b;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <button onClick={() => setOpen(true)}>Open Left Drawer</button>\r
        <Drawer open={open} onClose={() => setOpen(false)} title="Left Drawer" side="left">\r
          <p>This drawer slides in from the left.</p>\r
        </Drawer>\r
      </>;
  }
}`,...(b=(x=a.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var w,j,v;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <button onClick={() => setOpen(true)}>Open Drawer with Footer</button>\r
        <Drawer open={open} onClose={() => setOpen(false)} title="Settings" footer={<>\r
              <button onClick={() => setOpen(false)}>Cancel</button>\r
              <button onClick={() => setOpen(false)}>Save</button>\r
            </>}>\r
          <p>Edit your settings here.</p>\r
        </Drawer>\r
      </>;
  }
}`,...(v=(j=l.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};const q=["Default","LeftSide","WithFooter"];export{o as Default,a as LeftSide,l as WithFooter,q as __namedExportsOrder,L as default};
