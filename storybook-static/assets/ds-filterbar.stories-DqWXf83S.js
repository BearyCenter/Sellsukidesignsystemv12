import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./index-ZH-6pyQh.js";import{S as W}from"./search-C31aNDpM.js";import{c as M}from"./createLucideIcon-DG6FjBK_.js";import{X as Y}from"./x-DzaArQBv.js";import{C as D}from"./chevron-down-ClZlXrfz.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]],X=M("sliders-horizontal",H),J={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"},v={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:400};function K({config:s,value:u,onChange:d}){var o;const[p,i]=c.useState(!1),t=Array.isArray(u)?u:u?[u]:[],m=t.length>0,S=c.useCallback(r=>{if(s.type==="single"){const n=t[0]===r?null:r;d(s.key,n),i(!1)}else{const n=t.includes(r)?t.filter(k=>k!==r):[...t,r];d(s.key,n.length?n:null)}},[s,t,d]),l=t.length===1?(o=s.options.find(r=>r.value===t[0]))==null?void 0:o.label:t.length>1?`${s.label} (${t.length})`:s.label;return e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>i(r=>!r),className:`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border transition-colors cursor-pointer select-none ${m?"bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]":"bg-[var(--background)] border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"}`,style:J,children:[l,m&&e.jsx("span",{className:"inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--primary)] text-primary-foreground text-[10px] font-bold",children:t.length}),e.jsx(D,{size:14,className:`transition-transform ${p?"rotate-180":""}`})]}),p&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>i(!1)}),e.jsx("div",{className:"absolute left-0 top-full mt-1 z-20 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-elevation-sm min-w-[160px] py-1 overflow-hidden",children:s.options.map(r=>{const n=t.includes(r.value);return e.jsxs("button",{type:"button",onClick:()=>S(r.value),className:`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors cursor-pointer ${n?"bg-[var(--primary)]/10 text-[var(--primary)]":"text-[var(--foreground)] hover:bg-[var(--muted)]"}`,style:v,children:[s.type==="multi"&&e.jsx("span",{className:`inline-flex items-center justify-center w-4 h-4 rounded border flex-shrink-0 ${n?"bg-[var(--primary)] border-[var(--primary)] text-primary-foreground":"border-[var(--border)]"}`,children:n&&e.jsx("svg",{width:"10",height:"8",viewBox:"0 0 10 8",fill:"none",children:e.jsx("path",{d:"M1 4L3.5 6.5L9 1",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}),r.label]},r.value)})})]})]})}function V({filters:s=[],searchPlaceholder:u="Search...",showSearch:d=!0,value:p,onFilterChange:i,className:t=""}){const[m,S]=c.useState({search:"",filters:{}}),l=p??m,o=c.useCallback(a=>{S(a),i==null||i(a)},[i]),r=c.useCallback(a=>{o({...l,search:a.target.value})},[l,o]),n=c.useCallback((a,U)=>{o({...l,filters:{...l.filters,[a]:U}})},[l,o]),k=c.useCallback(()=>{o({search:"",filters:{}})},[o]),O=Object.values(l.filters).filter(a=>a!==null&&(!Array.isArray(a)||a.length>0)).length,G=O>0||l.search&&l.search.length>0;return e.jsxs("div",{className:`flex items-center gap-2 flex-wrap bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 ${t}`,children:[d&&e.jsxs("div",{className:"relative flex items-center",children:[e.jsx(W,{size:14,className:"absolute left-2.5 text-[var(--muted-foreground)] pointer-events-none"}),e.jsx("input",{type:"text",value:l.search??"",onChange:r,placeholder:u,className:"h-8 pl-8 pr-3 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors min-w-[200px]",style:v})]}),d&&s.length>0&&e.jsx("div",{className:"w-px h-5 bg-[var(--border)] flex-shrink-0"}),s.length>0&&e.jsx(X,{size:14,className:"text-[var(--muted-foreground)] flex-shrink-0"}),s.map(a=>e.jsx(K,{config:a,value:l.filters[a.key]??null,onChange:n},a.key)),O>0&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]",style:v,children:[O," active"]}),G&&e.jsxs("button",{type:"button",onClick:k,className:"inline-flex items-center gap-1 h-7 px-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors cursor-pointer ml-auto",style:v,children:[e.jsx(Y,{size:12}),"Clear all"]})]})}V.__docgenInfo={description:"",methods:[],displayName:"FilterBar",props:{filters:{required:!1,tsType:{name:"Array",elements:[{name:"FilterConfig"}],raw:"FilterConfig[]"},description:"Filter definitions",defaultValue:{value:"[]",computed:!1}},searchPlaceholder:{required:!1,tsType:{name:"string"},description:"Search placeholder",defaultValue:{value:'"Search..."',computed:!1}},showSearch:{required:!1,tsType:{name:"boolean"},description:"Show search field",defaultValue:{value:"true",computed:!1}},value:{required:!1,tsType:{name:"FilterBarValue"},description:"Controlled value"},onFilterChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: FilterBarValue) => void",signature:{arguments:[{type:{name:"FilterBarValue"},name:"value"}],return:{name:"void"}}},description:"Callback when any filter/search changes"},className:{required:!1,tsType:{name:"string"},description:"Additional className",defaultValue:{value:'""',computed:!1}}}};const x=[{label:"Active",value:"active"},{label:"Inactive",value:"inactive"},{label:"Pending",value:"pending"}],w=[{label:"Electronics",value:"electronics"},{label:"Clothing",value:"clothing"},{label:"Food & Beverage",value:"food"},{label:"Home & Garden",value:"home"}],$=[{label:"Admin",value:"admin"},{label:"Manager",value:"manager"},{label:"Staff",value:"staff"},{label:"Viewer",value:"viewer"}],le={title:"Components/FilterBar",component:V,tags:["autodocs"],parameters:{layout:"padded"},argTypes:{showSearch:{control:"boolean"},searchPlaceholder:{control:"text"}}},y={args:{showSearch:!0,searchPlaceholder:"Search products...",filters:[]}},h={args:{showSearch:!1,filters:[{key:"status",label:"Status",type:"single",options:x},{key:"category",label:"Category",type:"multi",options:w}]}},f={args:{showSearch:!0,searchPlaceholder:"Search orders...",filters:[{key:"status",label:"Status",type:"single",options:x},{key:"category",label:"Category",type:"multi",options:w}]}},g={args:{showSearch:!0,searchPlaceholder:"Search users by name or email...",filters:[{key:"role",label:"Role",type:"multi",options:$},{key:"status",label:"Status",type:"single",options:x}]}},b={args:{showSearch:!0,searchPlaceholder:"Search...",filters:[{key:"status",label:"Status",type:"single",options:x},{key:"category",label:"Category",type:"multi",options:w},{key:"role",label:"Role",type:"multi",options:$}]}};var T,N,j;y.parameters={...y.parameters,docs:{...(T=y.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    showSearch: true,
    searchPlaceholder: "Search products...",
    filters: []
  }
}`,...(j=(N=y.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var C,P,A;h.parameters={...h.parameters,docs:{...(C=h.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    showSearch: false,
    filters: [{
      key: "status",
      label: "Status",
      type: "single",
      options: STATUS_OPTIONS
    }, {
      key: "category",
      label: "Category",
      type: "multi",
      options: CATEGORY_OPTIONS
    }]
  }
}`,...(A=(P=h.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};var F,_,I;f.parameters={...f.parameters,docs:{...(F=f.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    showSearch: true,
    searchPlaceholder: "Search orders...",
    filters: [{
      key: "status",
      label: "Status",
      type: "single",
      options: STATUS_OPTIONS
    }, {
      key: "category",
      label: "Category",
      type: "multi",
      options: CATEGORY_OPTIONS
    }]
  }
}`,...(I=(_=f.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var R,E,z;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    showSearch: true,
    searchPlaceholder: "Search users by name or email...",
    filters: [{
      key: "role",
      label: "Role",
      type: "multi",
      options: ROLE_OPTIONS
    }, {
      key: "status",
      label: "Status",
      type: "single",
      options: STATUS_OPTIONS
    }]
  }
}`,...(z=(E=g.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var L,B,q;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    showSearch: true,
    searchPlaceholder: "Search...",
    filters: [{
      key: "status",
      label: "Status",
      type: "single",
      options: STATUS_OPTIONS
    }, {
      key: "category",
      label: "Category",
      type: "multi",
      options: CATEGORY_OPTIONS
    }, {
      key: "role",
      label: "Role",
      type: "multi",
      options: ROLE_OPTIONS
    }]
  }
}`,...(q=(B=b.parameters)==null?void 0:B.docs)==null?void 0:q.source}}};const ne=["SearchOnly","FiltersOnly","SearchWithFilters","AdminPanel","ManyFilters"];export{g as AdminPanel,h as FiltersOnly,b as ManyFilters,y as SearchOnly,f as SearchWithFilters,ne as __namedExportsOrder,le as default};
