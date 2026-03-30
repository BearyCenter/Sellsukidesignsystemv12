import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./index-ZH-6pyQh.js";import{r as M}from"./index-BP-xEy0R.js";import{C as N}from"./chevron-right-BjfhjwKz.js";import{c as E}from"./createLucideIcon-DG6FjBK_.js";import{C as z}from"./copy-VVieBT9s.js";import{T as D}from"./trash-2-DGMClNkr.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DVyBTwwr.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]],L=E("share",F);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],T=E("square-pen",P),W={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},_={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"},B={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"};function H({items:t,parentRect:e}){const r=o.useRef(null),[l,d]=o.useState({top:e.top,left:e.right+4});return o.useEffect(()=>{if(!r.current)return;const a=r.current.getBoundingClientRect();let u=e.top,s=e.right+4;s+a.width>window.innerWidth-8&&(s=e.left-a.width-4),u+a.height>window.innerHeight-8&&(u=window.innerHeight-a.height-8),d({top:u,left:s})},[e]),M.createPortal(n.jsx("div",{ref:r,className:"fixed z-[9999] min-w-[200px] rounded-[var(--radius)] border border-border bg-popover shadow-elevation-sm py-1",style:{top:l.top,left:l.left},children:t.map((i,a)=>n.jsx(R,{item:i},a))}),document.body)}function R({item:t}){const[e,r]=o.useState(!1),l=o.useRef(null),d=o.useRef(null);if(t.divider)return n.jsx("div",{className:"my-1 border-t border-border"});if(t.label)return n.jsx("div",{className:"px-3 py-1.5 text-muted-foreground",style:B,children:t.label});const i=t.children&&t.children.length>0,a=()=>{d.current&&clearTimeout(d.current),i&&r(!0)},u=()=>{d.current=setTimeout(()=>r(!1),150)};return n.jsxs("div",{ref:l,className:"relative",onMouseEnter:a,onMouseLeave:u,children:[n.jsxs("button",{onClick:()=>{var s;i||(s=t.onClick)==null||s.call(t)},disabled:t.disabled,className:`w-full flex items-center text-left rounded-[var(--radius-sm)] transition-colors cursor-pointer ${t.destructive?"text-destructive hover:bg-destructive/10":t.disabled?"text-muted-foreground opacity-50 cursor-not-allowed":"text-popover-foreground hover:bg-[var(--Colors--Background--bg-primary_hover)]"}`,style:{padding:"var(--Spacing--Spacing-md) var(--Spacing--Spacing-2xl)",gap:"var(--Spacing--Spacing-lg)",...W},children:[t.icon&&n.jsx("span",{className:"flex-shrink-0",children:t.icon}),n.jsx("span",{className:"flex-1",children:t.text}),t.shortcut&&n.jsx("span",{className:"text-muted-foreground ml-4",style:_,children:t.shortcut}),i&&n.jsx(N,{size:14,className:"text-muted-foreground"})]}),i&&e&&l.current&&n.jsx(H,{items:t.children,parentRect:l.current.getBoundingClientRect()})]})}function h({items:t,open:e,onClose:r,triggerRef:l,className:d=""}){const i=o.useRef(null),[a,u]=o.useState({top:0,left:0});return o.useEffect(()=>{if(!e||!l.current)return;const s=l.current.getBoundingClientRect();let c=s.bottom+4,f=s.left;requestAnimationFrame(()=>{if(!i.current)return;const p=i.current.getBoundingClientRect();f+p.width>window.innerWidth-8&&(f=s.right-p.width),c+p.height>window.innerHeight-8&&(c=s.top-p.height-4),u({top:c,left:f})}),u({top:c,left:f})},[e,l]),o.useEffect(()=>{if(!e)return;const s=c=>{var f,p;(f=l.current)!=null&&f.contains(c.target)||(p=i.current)!=null&&p.contains(c.target)||r()};return document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[e,r,l]),e?M.createPortal(n.jsxs("div",{ref:i,className:`fixed z-[9999] min-w-[200px] rounded-[var(--radius)] border border-border bg-popover shadow-elevation-sm py-1 animate-[fadeIn_0.15s_ease] ${d}`,style:{top:a.top,left:a.left},children:[t.map((s,c)=>n.jsx(R,{item:s},c)),n.jsx("style",{children:"@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }"})]}),document.body):null}h.displayName="Menu";const K={title:"Components/Menu",component:h,tags:["autodocs"]},m={render:()=>{const[t,e]=o.useState(!1),r=o.useRef(null);return n.jsxs(n.Fragment,{children:[n.jsx("button",{ref:r,onClick:()=>e(!t),children:"Open Menu"}),n.jsx(h,{open:t,onClose:()=>e(!1),triggerRef:r,items:[{text:"Edit",icon:n.jsx(T,{size:14}),onClick:()=>e(!1)},{text:"Copy",icon:n.jsx(z,{size:14}),shortcut:"Ctrl+C",onClick:()=>e(!1)},{text:"Share",icon:n.jsx(L,{size:14}),onClick:()=>e(!1)},{divider:!0},{text:"Delete",icon:n.jsx(D,{size:14}),destructive:!0,onClick:()=>e(!1)}]})]})}},x={render:()=>{const[t,e]=o.useState(!1),r=o.useRef(null);return n.jsxs(n.Fragment,{children:[n.jsx("button",{ref:r,onClick:()=>e(!t),children:"Open Menu"}),n.jsx(h,{open:t,onClose:()=>e(!1),triggerRef:r,items:[{label:"Actions"},{text:"Edit",onClick:()=>e(!1)},{text:"Duplicate",onClick:()=>e(!1)},{divider:!0},{label:"Danger Zone"},{text:"Delete",destructive:!0,onClick:()=>e(!1)}]})]})}},g={render:()=>{const[t,e]=o.useState(!1),r=o.useRef(null);return n.jsxs(n.Fragment,{children:[n.jsx("button",{ref:r,onClick:()=>e(!t),children:"Open Menu"}),n.jsx(h,{open:t,onClose:()=>e(!1),triggerRef:r,items:[{text:"New File",onClick:()=>e(!1)},{text:"Export As",children:[{text:"PDF",onClick:()=>e(!1)},{text:"PNG",onClick:()=>e(!1)},{text:"SVG",onClick:()=>e(!1)}]},{divider:!0},{text:"Settings",onClick:()=>e(!1)}]})]})}};var v,C,b;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return <>\r
        <button ref={ref} onClick={() => setOpen(!open)}>\r
          Open Menu\r
        </button>\r
        <Menu open={open} onClose={() => setOpen(false)} triggerRef={ref} items={[{
        text: "Edit",
        icon: <Edit size={14} />,
        onClick: () => setOpen(false)
      }, {
        text: "Copy",
        icon: <Copy size={14} />,
        shortcut: "Ctrl+C",
        onClick: () => setOpen(false)
      }, {
        text: "Share",
        icon: <Share size={14} />,
        onClick: () => setOpen(false)
      }, {
        divider: true
      }, {
        text: "Delete",
        icon: <Trash2 size={14} />,
        destructive: true,
        onClick: () => setOpen(false)
      }]} />\r
      </>;
  }
}`,...(b=(C=m.parameters)==null?void 0:C.docs)==null?void 0:b.source}}};var k,S,y;x.parameters={...x.parameters,docs:{...(k=x.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return <>\r
        <button ref={ref} onClick={() => setOpen(!open)}>\r
          Open Menu\r
        </button>\r
        <Menu open={open} onClose={() => setOpen(false)} triggerRef={ref} items={[{
        label: "Actions"
      }, {
        text: "Edit",
        onClick: () => setOpen(false)
      }, {
        text: "Duplicate",
        onClick: () => setOpen(false)
      }, {
        divider: true
      }, {
        label: "Danger Zone"
      }, {
        text: "Delete",
        destructive: true,
        onClick: () => setOpen(false)
      }]} />\r
      </>;
  }
}`,...(y=(S=x.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var O,j,w;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return <>\r
        <button ref={ref} onClick={() => setOpen(!open)}>\r
          Open Menu\r
        </button>\r
        <Menu open={open} onClose={() => setOpen(false)} triggerRef={ref} items={[{
        text: "New File",
        onClick: () => setOpen(false)
      }, {
        text: "Export As",
        children: [{
          text: "PDF",
          onClick: () => setOpen(false)
        }, {
          text: "PNG",
          onClick: () => setOpen(false)
        }, {
          text: "SVG",
          onClick: () => setOpen(false)
        }]
      }, {
        divider: true
      }, {
        text: "Settings",
        onClick: () => setOpen(false)
      }]} />\r
      </>;
  }
}`,...(w=(j=g.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};const Q=["Default","WithGroups","WithSubmenu"];export{m as Default,x as WithGroups,g as WithSubmenu,Q as __namedExportsOrder,K as default};
