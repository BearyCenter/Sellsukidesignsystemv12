import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./index-ZH-6pyQh.js";import{X as k}from"./x-DzaArQBv.js";import"./_commonjsHelpers-CqkleIqs.js";import"./createLucideIcon-DG6FjBK_.js";const q={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"};function o({trigger:t,children:P,placement:N="bottom",title:u,open:l,onOpenChange:p}){const[T,R]=m.useState(!1),n=l!==void 0?l:T,d=r=>{p==null||p(r),l===void 0&&R(r)},c=m.useRef(null);m.useEffect(()=>{if(!n)return;const r=S=>{c.current&&!c.current.contains(S.target)&&d(!1)};return document.addEventListener("mousedown",r),()=>document.removeEventListener("mousedown",r)},[n]);const C={top:"bottom-full left-1/2 -translate-x-1/2 mb-2",bottom:"top-full left-1/2 -translate-x-1/2 mt-2",left:"right-full top-1/2 -translate-y-1/2 mr-2",right:"left-full top-1/2 -translate-y-1/2 ml-2"};return e.jsxs("div",{className:"relative inline-block",ref:c,children:[e.jsx("div",{onClick:()=>d(!n),className:"cursor-pointer",children:t}),n&&e.jsx("div",{className:`absolute z-50 ${C[N]} w-max max-w-xs`,children:e.jsxs("div",{className:"rounded-[var(--radius-lg)] border border-border bg-card shadow-elevation-sm overflow-hidden",children:[u&&e.jsxs("div",{className:"px-4 py-2.5 border-b border-border flex items-center justify-between",children:[e.jsx("span",{className:"text-foreground",style:q,children:u}),e.jsx("button",{onClick:()=>d(!1),className:"text-muted-foreground hover:text-foreground cursor-pointer",children:e.jsx(k,{size:14})})]}),e.jsx("div",{className:"px-4 py-3",children:P})]})})]})}o.__docgenInfo={description:"",methods:[],displayName:"Popover",props:{trigger:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},placement:{required:!1,tsType:{name:"union",raw:'"top" | "bottom" | "left" | "right"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"bottom"',computed:!1}},title:{required:!1,tsType:{name:"string"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(v: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"v"}],return:{name:"void"}}},description:""}}};const L={title:"Components/Popover",component:o,tags:["autodocs"],argTypes:{placement:{control:"select",options:["top","bottom","left","right"]}}},s={render:()=>e.jsx("div",{style:{padding:80,display:"flex",justifyContent:"center"},children:e.jsx(o,{trigger:e.jsx("button",{children:"Click me"}),title:"Popover Title",children:e.jsx("p",{children:"This is the popover content."})})})},a={render:()=>e.jsx("div",{style:{padding:120,display:"flex",gap:40,flexWrap:"wrap",justifyContent:"center"},children:["top","bottom","left","right"].map(t=>e.jsx(o,{trigger:e.jsx("button",{children:t}),placement:t,title:`${t} popover`,children:e.jsxs("p",{children:["Placed on ",t]})},t))})},i={render:()=>e.jsx("div",{style:{padding:80,display:"flex",justifyContent:"center"},children:e.jsx(o,{trigger:e.jsx("button",{children:"Info"}),children:e.jsx("p",{children:"Simple popover without a title bar."})})})};var f,v,x;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 80,
    display: "flex",
    justifyContent: "center"
  }}>\r
      <Popover trigger={<button>Click me</button>} title="Popover Title">\r
        <p>This is the popover content.</p>\r
      </Popover>\r
    </div>
}`,...(x=(v=s.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var g,b,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 120,
    display: "flex",
    gap: 40,
    flexWrap: "wrap",
    justifyContent: "center"
  }}>\r
      {(["top", "bottom", "left", "right"] as const).map(p => <Popover key={p} trigger={<button>{p}</button>} placement={p} title={\`\${p} popover\`}>\r
          <p>Placed on {p}</p>\r
        </Popover>)}\r
    </div>
}`,...(h=(b=a.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var y,j,w;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 80,
    display: "flex",
    justifyContent: "center"
  }}>\r
      <Popover trigger={<button>Info</button>}>\r
        <p>Simple popover without a title bar.</p>\r
      </Popover>\r
    </div>
}`,...(w=(j=i.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};const $=["Default","AllPlacements","WithoutTitle"];export{a as AllPlacements,s as Default,i as WithoutTitle,$ as __namedExportsOrder,L as default};
