import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l,R as Je}from"./index-ZH-6pyQh.js";import{C as Xe}from"./chevron-up-CDiEuP6f.js";import{C as Ye}from"./chevron-down-ClZlXrfz.js";import{C as ee}from"./chevrons-up-down-DXwNTPXY.js";import{C as Ze}from"./circle-alert-B5B9c3p0.js";import{C as Qe}from"./chevron-right-BjfhjwKz.js";import{c as ze}from"./createLucideIcon-DG6FjBK_.js";import{C as et}from"./check-YojSnU74.js";import{X as tt}from"./x-DzaArQBv.js";import{E as nt}from"./eye-ZqUzu1S3.js";import{T as Pe}from"./trash-2-DGMClNkr.js";import{M as rt}from"./mail-D7L2eZHR.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]],st=ze("columns-3",at);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],$e=ze("download",ot),Ee={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"},G={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},N={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:400},x={sm:"px-3 py-2",md:"px-4 py-3",lg:"px-5 py-4"};function it({width:r}){return e.jsx("div",{className:"h-4 rounded bg-muted animate-pulse",style:{width:r??"80%"}})}function dt({columns:r,hidden:n,onToggle:a}){const[o,c]=l.useState(!1),h=l.useRef(null);l.useEffect(()=>{function m(g){h.current&&!h.current.contains(g.target)&&c(!1)}return o&&document.addEventListener("mousedown",m),()=>document.removeEventListener("mousedown",m)},[o]);const v=r.filter(m=>m.hideable!==!1);return e.jsxs("div",{ref:h,className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>c(m=>!m),className:"inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer",style:N,children:[e.jsx(st,{size:14}),"Columns"]}),o&&e.jsx("div",{className:"absolute right-0 top-full mt-1 z-30 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-elevation-sm w-44 py-1",children:v.map(m=>{const g=!n.has(m.key);return e.jsxs("button",{type:"button",onClick:()=>a(m.key),className:"w-full flex items-center justify-between gap-2 px-3 py-2 hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors cursor-pointer",style:N,children:[e.jsx("span",{children:m.header}),g&&e.jsx(et,{size:13,className:"text-[var(--primary)]"})]},m.key)})})]})}function lt({count:r,actions:n,selectedKeys:a,onClear:o}){return e.jsxs("div",{className:"flex items-center gap-3 px-4 py-2.5 bg-[var(--primary)]/8 border-b border-[var(--primary)]/20",children:[e.jsxs("span",{className:"text-[var(--primary)] flex-shrink-0",style:Ee,children:[r," selected"]}),e.jsx("div",{className:"flex items-center gap-2 flex-1 flex-wrap",children:n.map((c,h)=>e.jsxs("button",{type:"button",onClick:()=>c.onClick(a),className:`inline-flex items-center gap-1.5 h-7 px-3 rounded-md border transition-colors cursor-pointer ${c.variant==="destructive"?"border-[var(--destructive)] text-[var(--destructive)] hover:bg-[var(--destructive)]/10":"border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10"}`,style:{...N,fontWeight:500},children:[c.icon,c.label]},h))}),e.jsx("button",{type:"button",onClick:o,className:"text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer p-1 rounded",title:"Clear selection",children:e.jsx(tt,{size:14})})]})}const ct=[10,20,50,100];function ut({meta:r,onPageChange:n}){const{page:a,pageSize:o,totalCount:c}=r,h=Math.max(1,Math.ceil(c/o)),v=c===0?0:(a-1)*o+1,m=Math.min(a*o,c),g=l.useMemo(()=>{const d=[];if(h<=7)for(let u=1;u<=h;u++)d.push(u);else{d.push(1),a>3&&d.push("...");for(let u=Math.max(2,a-1);u<=Math.min(h-1,a+1);u++)d.push(u);a<h-2&&d.push("..."),d.push(h)}return d},[a,h]);return e.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-t border-[var(--border)] flex-wrap gap-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("span",{className:"text-[var(--muted-foreground)] whitespace-nowrap",style:N,children:[v,"–",m," of ",c.toLocaleString()]}),e.jsx("select",{value:o,onChange:d=>n(1,Number(d.target.value)),className:"h-7 px-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] cursor-pointer",style:N,children:ct.map(d=>e.jsxs("option",{value:d,children:[d," / page"]},d))})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(J,{disabled:a===1,onClick:()=>n(a-1,o),label:"‹ Prev"}),g.map((d,u)=>d==="..."?e.jsx("span",{className:"px-2 text-[var(--muted-foreground)]",style:N,children:"…"},`ellipsis-${u}`):e.jsx(J,{active:d===a,onClick:()=>n(d,o),label:String(d)},d)),e.jsx(J,{disabled:a===h,onClick:()=>n(a+1,o),label:"Next ›"})]})]})}function J({label:r,active:n,disabled:a,onClick:o}){return e.jsx("button",{type:"button",onClick:o,disabled:a,className:`min-w-[28px] h-7 px-2 rounded-md border transition-colors cursor-pointer ${n?"bg-[var(--primary)] border-[var(--primary)] text-primary-foreground":a?"border-transparent text-[var(--muted-foreground)] cursor-not-allowed":"border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"}`,style:{...N,fontWeight:n?600:400},children:r})}function k({columns:r,data:n,rowKey:a="id",pagination:o,sortBy:c,sortOrder:h,onPageChange:v,onSortChange:m,selectable:g=!1,selectedRows:d,onSelectionChange:u,bulkActions:w=[],onRowClick:S,expandedRowRender:s,loading:y=!1,loadingRows:P=5,error:C,emptyMessage:M="No data found",emptyDescription:X,showColumnToggle:Me=!1,size:b="md",stickyHeader:Oe=!1,className:De=""}){const[V,Be]=l.useState(new Set(r.filter(t=>t.defaultHidden).map(t=>t.key))),Ke=l.useCallback(t=>{Be(p=>{const i=new Set(p);return i.has(t)?i.delete(t):i.add(t),i})},[]),T=l.useMemo(()=>r.filter(t=>!V.has(t.key)),[r,V]),[Re,Le]=l.useState(new Set),j=d??Re,$=l.useCallback(t=>{d||Le(t);const p=n.filter(i=>t.has(i[a]));u==null||u(t,p)},[d,n,a,u]),O=l.useMemo(()=>n.map(t=>t[a]),[n,a]),D=O.length>0&&O.every(t=>j.has(t)),qe=j.size>0&&!D,_e=l.useCallback(()=>{$(D?new Set:new Set(O))},[D,O,$]),Ie=l.useCallback(t=>{const p=new Set(j);p.has(t)?p.delete(t):p.add(t),$(p)},[j,$]),[We,Fe]=l.useState(new Set),Y=l.useCallback(t=>{Fe(p=>{const i=new Set(p);return i.has(t)?i.delete(t):i.add(t),i})},[]),Ue=l.useCallback(t=>{m&&(c===t?m(t,h==="asc"?"desc":"asc"):m(t,"asc"))},[c,h,m]),B=l.useMemo(()=>{const t={};let p=0;g&&(p+=48),s&&(p+=40);for(const i of T)if(i.frozen){t[i.key]=p;const E=typeof i.width=="number"?i.width:parseInt(i.width??"120");p+=isNaN(E)?120:E}return t},[T,g,s]),H=T.length+(g?1:0)+(s?1:0),Ve="sticky z-[1] bg-card",He="sticky z-[2] bg-muted";return e.jsxs("div",{className:`rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden ${De}`,children:[Me&&e.jsx("div",{className:"flex items-center justify-end gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--background)]",children:e.jsx(dt,{columns:r,hidden:V,onToggle:Ke})}),g&&j.size>0&&w.length>0&&e.jsx(lt,{count:j.size,actions:w,selectedKeys:Array.from(j),onClear:()=>$(new Set)}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full border-collapse",style:{minWidth:"100%"},children:[e.jsx("thead",{className:Oe?"sticky top-0 z-10":"",children:e.jsxs("tr",{className:"border-b border-[var(--border)] bg-[var(--muted)]",children:[s&&e.jsx("th",{className:`${x[b]} w-10`}),g&&e.jsx("th",{className:`${x[b]} w-12`,children:e.jsx("input",{type:"checkbox",checked:D,ref:t=>{t&&(t.indeterminate=qe)},onChange:_e,className:"w-4 h-4 rounded border-[var(--border)] accent-[var(--primary)] cursor-pointer"})}),T.map(t=>{const p=t.frozen&&t.key in B,i=c===t.key;return e.jsx("th",{className:`${x[b]} text-${t.align??"left"} text-[var(--muted-foreground)] whitespace-nowrap select-none ${t.sortable&&m?"cursor-pointer hover:text-[var(--foreground)]":""} ${p?He:""}`,style:{...Ee,width:t.width,minWidth:t.minWidth??80,...p?{left:B[t.key],boxShadow:"2px 0 4px rgba(0,0,0,0.04)"}:{}},onClick:()=>t.sortable&&Ue(t.key),children:e.jsxs("span",{className:"inline-flex items-center gap-1",children:[t.header,t.sortable&&m&&e.jsx("span",{className:"text-[var(--muted-foreground)]",children:i?h==="asc"?e.jsx(Xe,{size:13}):e.jsx(Ye,{size:13}):e.jsx(ee,{size:12})})]})},t.key)})]})}),e.jsxs("tbody",{children:[C&&e.jsx("tr",{children:e.jsx("td",{colSpan:H,className:`${x[b]} text-center`,children:e.jsxs("div",{className:"flex flex-col items-center gap-2 py-10",children:[e.jsx(Ze,{size:32,className:"text-[var(--destructive)] opacity-60"}),e.jsx("span",{className:"text-[var(--destructive)]",style:G,children:C})]})})}),!C&&y&&Array.from({length:P}).map((t,p)=>e.jsxs("tr",{className:"border-b border-[var(--border)] last:border-b-0",children:[s&&e.jsx("td",{className:`${x[b]} w-10`}),g&&e.jsx("td",{className:`${x[b]} w-12`,children:e.jsx("div",{className:"w-4 h-4 rounded bg-muted animate-pulse"})}),T.map(i=>e.jsx("td",{className:`${x[b]}`,children:e.jsx(it,{width:i.align==="right"?"60%":i.align==="center"?"50%":"75%"})},i.key))]},`skel-${p}`)),!C&&!y&&n.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:H,className:`${x[b]} text-center`,children:e.jsxs("div",{className:"flex flex-col items-center gap-2 py-12",children:[e.jsx("div",{className:"w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)]",children:e.jsx(ee,{size:20})}),e.jsx("span",{className:"text-[var(--foreground)]",style:G,children:M}),X&&e.jsx("span",{className:"text-[var(--muted-foreground)]",style:N,children:X})]})})}),!C&&!y&&n.map((t,p)=>{const i=t[a],E=j.has(i),Z=We.has(i),Ge=!!S||!!s;return e.jsxs(Je.Fragment,{children:[e.jsxs("tr",{className:`border-b border-[var(--border)] last:border-b-0 transition-colors ${E?"bg-[var(--primary)]/5":"bg-[var(--card)] hover:bg-[var(--muted)]"} ${Ge?"cursor-pointer":""}`,onClick:()=>{S==null||S(t),s&&Y(i)},children:[s&&e.jsx("td",{className:`${x[b]} w-10 text-center`,onClick:f=>{f.stopPropagation(),Y(i)},children:e.jsx(Qe,{size:14,className:`text-[var(--muted-foreground)] transition-transform mx-auto ${Z?"rotate-90":""}`})}),g&&e.jsx("td",{className:`${x[b]} w-12`,onClick:f=>f.stopPropagation(),children:e.jsx("input",{type:"checkbox",checked:E,onChange:()=>Ie(i),className:"w-4 h-4 rounded border-[var(--border)] accent-[var(--primary)] cursor-pointer"})}),T.map(f=>{const Q=f.frozen&&f.key in B;return e.jsx("td",{className:`${x[b]} text-${f.align??"left"} text-[var(--foreground)] ${Q?Ve:""}`,style:{...G,...Q?{left:B[f.key],boxShadow:"2px 0 4px rgba(0,0,0,0.04)"}:{}},children:f.render?f.render(t[f.key],t,p):t[f.key]},f.key)})]}),s&&Z&&e.jsx("tr",{className:"bg-[var(--muted)] border-b border-[var(--border)]",children:e.jsx("td",{colSpan:H,className:"px-6 py-4",children:s(t)})})]},i??p)})]})]})}),o&&v&&!y&&!C&&e.jsx(ut,{meta:o,onPageChange:v})]})}k.__docgenInfo={description:"",methods:[],displayName:"AdvancedDataTable",props:{columns:{required:!0,tsType:{name:"Array",elements:[{name:"AdvancedColumn",elements:[{name:"T"}],raw:"AdvancedColumn<T>"}],raw:"AdvancedColumn<T>[]"},description:"Column definitions"},data:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:"Row data"},rowKey:{required:!1,tsType:{name:"string"},description:'Field to use as unique row key (default: "id")',defaultValue:{value:'"id"',computed:!1}},pagination:{required:!1,tsType:{name:"PaginationMeta"},description:"Server pagination metadata"},sortBy:{required:!1,tsType:{name:"string"},description:"Currently sorted column key"},sortOrder:{required:!1,tsType:{name:"union",raw:'"asc" | "desc"',elements:[{name:"literal",value:'"asc"'},{name:"literal",value:'"desc"'}]},description:"Current sort direction"},onPageChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(page: number, pageSize: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"},{type:{name:"number"},name:"pageSize"}],return:{name:"void"}}},description:"Called when user changes page or page size"},onSortChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(sortBy: string, sortOrder: SortOrder) => void",signature:{arguments:[{type:{name:"string"},name:"sortBy"},{type:{name:"union",raw:'"asc" | "desc"',elements:[{name:"literal",value:'"asc"'},{name:"literal",value:'"desc"'}]},name:"sortOrder"}],return:{name:"void"}}},description:"Called when user clicks a sortable column"},selectable:{required:!1,tsType:{name:"boolean"},description:"Enable row checkboxes",defaultValue:{value:"false",computed:!1}},selectedRows:{required:!1,tsType:{name:"Set",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Set<string | number>"},description:"Controlled selection (set of rowKey values)"},onSelectionChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(selected: Set<string | number>, rows: T[]) => void",signature:{arguments:[{type:{name:"Set",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Set<string | number>"},name:"selected"},{type:{name:"Array",elements:[{name:"T"}],raw:"T[]"},name:"rows"}],return:{name:"void"}}},description:"Called when selection changes"},bulkActions:{required:!1,tsType:{name:"Array",elements:[{name:"BulkAction"}],raw:"BulkAction[]"},description:"Actions shown in bulk action bar when rows are selected",defaultValue:{value:"[]",computed:!1}},onRowClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T) => void",signature:{arguments:[{type:{name:"T"},name:"row"}],return:{name:"void"}}},description:"Called when a row is clicked"},expandedRowRender:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T) => React.ReactNode",signature:{arguments:[{type:{name:"T"},name:"row"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:"Render function for expanded row content"},loading:{required:!1,tsType:{name:"boolean"},description:"Show skeleton loading rows",defaultValue:{value:"false",computed:!1}},loadingRows:{required:!1,tsType:{name:"number"},description:"Number of skeleton rows to show while loading",defaultValue:{value:"5",computed:!1}},error:{required:!1,tsType:{name:"string"},description:"Error message — renders error state instead of table body"},emptyMessage:{required:!1,tsType:{name:"string"},description:"Custom empty state message",defaultValue:{value:'"No data found"',computed:!1}},emptyDescription:{required:!1,tsType:{name:"string"},description:"Custom empty state description"},showColumnToggle:{required:!1,tsType:{name:"boolean"},description:"Show column visibility toggle button",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},stickyHeader:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const A=Array.from({length:12},(r,n)=>({id:n+1,name:`Company ${String.fromCharCode(65+n)}`,plan:["Free","Starter","Pro","Enterprise"][n%4],status:["active","inactive","pending"][n%3],users:Math.floor(Math.random()*200)+5,revenue:Math.floor(Math.random()*1e5)+1e3,createdAt:`2026-0${n%9+1}-${String(n+1).padStart(2,"0")}`})),mt=Array.from({length:8},(r,n)=>({id:n+1,name:["Alice Johnson","Bob Smith","Carol White","David Lee","Eva Martinez","Frank Brown","Grace Kim","Henry Wu"][n],email:`user${n+1}@sellsuki.com`,role:["Admin","Manager","Staff","Viewer"][n%4],workspace:`WS-${String(n+1).padStart(3,"0")}`,lastLogin:`2026-03-${String(20-n).padStart(2,"0")}`,status:n%3===2?"inactive":"active"})),te={active:{bg:"#d1fae5",text:"#065f46",label:"Active"},inactive:{bg:"#f3f4f6",text:"#6b7280",label:"Inactive"},pending:{bg:"#fef3c7",text:"#92400e",label:"Pending"}};function z({status:r}){const n=te[r]??te.inactive;return e.jsx("span",{style:{display:"inline-block",padding:"2px 8px",borderRadius:9999,background:n.bg,color:n.text,fontFamily:"var(--font-button)",fontSize:12,fontWeight:500,whiteSpace:"nowrap"},children:n.label})}const At={title:"Components/AdvancedDataTable",component:k,tags:["autodocs"],parameters:{layout:"padded"}},K={render:()=>e.jsx(k,{rowKey:"id",columns:[{key:"id",header:"ID",width:60},{key:"name",header:"Company Name",sortable:!0},{key:"plan",header:"Plan",width:100},{key:"status",header:"Status",width:100,render:r=>e.jsx(z,{status:r})},{key:"users",header:"Users",align:"right",sortable:!0,width:80},{key:"revenue",header:"Revenue",align:"right",sortable:!0,render:r=>`฿${r.toLocaleString()}`}],data:A.slice(0,6)})},R={render:()=>e.jsx(k,{rowKey:"id",columns:[{key:"name",header:"Company Name"},{key:"plan",header:"Plan",width:100},{key:"status",header:"Status",width:100},{key:"users",header:"Users",align:"right",width:80}],data:[],loading:!0,loadingRows:6})},L={render:()=>e.jsx(k,{rowKey:"id",columns:[{key:"name",header:"Company Name"},{key:"plan",header:"Plan"},{key:"status",header:"Status"}],data:[],emptyMessage:"No companies found",emptyDescription:"Try adjusting your search or filter criteria"})},q={render:()=>e.jsx(k,{rowKey:"id",columns:[{key:"name",header:"Company Name"},{key:"plan",header:"Plan"}],data:[],error:"Failed to load data. Please check your connection and try again."})},_={render:()=>{const[r,n]=l.useState(1),[a,o]=l.useState(5),[c,h]=l.useState(),[v,m]=l.useState("asc"),d=[...A].sort((u,w)=>{if(!c)return 0;const S=u[c],s=w[c],y=typeof S=="string"?S.localeCompare(s):S-s;return v==="asc"?y:-y}).slice((r-1)*a,r*a);return e.jsx(k,{rowKey:"id",columns:[{key:"id",header:"ID",width:60},{key:"name",header:"Company",sortable:!0},{key:"plan",header:"Plan",width:110},{key:"status",header:"Status",width:100,render:u=>e.jsx(z,{status:u})},{key:"users",header:"Users",align:"right",sortable:!0,width:80},{key:"revenue",header:"Revenue",align:"right",sortable:!0,render:u=>`฿${u.toLocaleString()}`}],data:d,pagination:{page:r,pageSize:a,totalCount:A.length},sortBy:c,sortOrder:v,onPageChange:(u,w)=>{n(u),o(w)},onSortChange:(u,w)=>{h(u),m(w),n(1)}})}},I={render:()=>{const[r,n]=l.useState(new Set),a=[{label:"Email",icon:e.jsx(rt,{size:13}),onClick:o=>alert(`Email: ${o.join(", ")}`)},{label:"Export",icon:e.jsx($e,{size:13}),onClick:o=>alert(`Export: ${o.join(", ")}`)},{label:"Delete",icon:e.jsx(Pe,{size:13}),variant:"destructive",onClick:o=>alert(`Delete: ${o.join(", ")}`)}];return e.jsx(k,{rowKey:"id",columns:[{key:"name",header:"Name"},{key:"email",header:"Email"},{key:"role",header:"Role",width:100},{key:"status",header:"Status",width:100,render:o=>e.jsx(z,{status:o})},{key:"lastLogin",header:"Last Login",width:120}],data:mt,selectable:!0,selectedRows:r,onSelectionChange:o=>n(o),bulkActions:a})}},W={render:()=>e.jsx(k,{rowKey:"id",columns:[{key:"name",header:"Company"},{key:"plan",header:"Plan",width:110},{key:"status",header:"Status",width:100,render:r=>e.jsx(z,{status:r})},{key:"users",header:"Users",align:"right",width:80}],data:A.slice(0,5),expandedRowRender:r=>e.jsxs("div",{style:{fontFamily:"var(--font-button)",fontSize:13,color:"#6b7280"},children:[e.jsxs("strong",{style:{color:"#1f2937"},children:["Details for ",r.name]}),e.jsxs("div",{style:{marginTop:8,display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12},children:[e.jsxs("div",{children:[e.jsx("span",{style:{display:"block",fontWeight:600,color:"#1f2937"},children:"Revenue"}),"฿",r.revenue.toLocaleString()]}),e.jsxs("div",{children:[e.jsx("span",{style:{display:"block",fontWeight:600,color:"#1f2937"},children:"Created"}),r.createdAt]}),e.jsxs("div",{children:[e.jsx("span",{style:{display:"block",fontWeight:600,color:"#1f2937"},children:"Workspace"}),"WS-",String(r.id).padStart(3,"0")]})]})]})})},F={render:()=>{const r=[{key:"id",header:"ID",width:60,frozen:!0,hideable:!1},{key:"name",header:"Company Name",width:180,frozen:!0},{key:"plan",header:"Plan",width:110},{key:"status",header:"Status",width:120,render:n=>e.jsx(z,{status:n})},{key:"users",header:"Users",align:"right",width:100},{key:"revenue",header:"Revenue",align:"right",width:140,render:n=>`฿${n.toLocaleString()}`},{key:"createdAt",header:"Created At",width:130,defaultHidden:!0}];return e.jsx(k,{rowKey:"id",columns:r,data:A.slice(0,8),showColumnToggle:!0})}},U={render:()=>{const[r,n]=l.useState(1),[a,o]=l.useState(5),[c,h]=l.useState("name"),[v,m]=l.useState("asc"),[g,d]=l.useState(new Set),w=[...A].sort((s,y)=>{const P=s[c],C=y[c],M=typeof P=="string"?P.localeCompare(C):P-C;return v==="asc"?M:-M}).slice((r-1)*a,r*a),S=[{label:"View",icon:e.jsx(nt,{size:13}),onClick:s=>alert(`View: ${s.join(",")}`)},{label:"Export",icon:e.jsx($e,{size:13}),onClick:s=>alert(`Export: ${s.join(",")}`)},{label:"Delete",icon:e.jsx(Pe,{size:13}),variant:"destructive",onClick:s=>alert(`Delete: ${s.join(",")}`)}];return e.jsx(k,{rowKey:"id",columns:[{key:"id",header:"ID",width:60,frozen:!0,hideable:!1,sortable:!0},{key:"name",header:"Company",width:180,frozen:!0,sortable:!0},{key:"plan",header:"Plan",width:110},{key:"status",header:"Status",width:120,render:s=>e.jsx(z,{status:s})},{key:"users",header:"Users",align:"right",width:90,sortable:!0},{key:"revenue",header:"Revenue",align:"right",sortable:!0,render:s=>`฿${s.toLocaleString()}`},{key:"createdAt",header:"Created",width:120,defaultHidden:!0}],data:w,pagination:{page:r,pageSize:a,totalCount:A.length},sortBy:c,sortOrder:v,onPageChange:(s,y)=>{n(s),o(y)},onSortChange:(s,y)=>{h(s),m(y),n(1)},selectable:!0,selectedRows:g,onSelectionChange:s=>d(s),bulkActions:S,showColumnToggle:!0,expandedRowRender:s=>e.jsxs("div",{style:{fontFamily:"var(--font-button)",fontSize:13,color:"#6b7280"},children:[e.jsx("strong",{style:{color:"#1f2937"},children:s.name})," — Revenue: ฿",s.revenue.toLocaleString()," · Created: ",s.createdAt]}),stickyHeader:!0})}};var ne,re,ae;K.parameters={...K.parameters,docs:{...(ne=K.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <AdvancedDataTable rowKey="id" columns={[{
    key: "id",
    header: "ID",
    width: 60
  }, {
    key: "name",
    header: "Company Name",
    sortable: true
  }, {
    key: "plan",
    header: "Plan",
    width: 100
  }, {
    key: "status",
    header: "Status",
    width: 100,
    render: v => <StatusBadge status={v} />
  }, {
    key: "users",
    header: "Users",
    align: "right",
    sortable: true,
    width: 80
  }, {
    key: "revenue",
    header: "Revenue",
    align: "right",
    sortable: true,
    render: v => \`฿\${v.toLocaleString()}\`
  }]} data={MOCK_COMPANIES.slice(0, 6)} />
}`,...(ae=(re=K.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var se,oe,ie;R.parameters={...R.parameters,docs:{...(se=R.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => <AdvancedDataTable rowKey="id" columns={[{
    key: "name",
    header: "Company Name"
  }, {
    key: "plan",
    header: "Plan",
    width: 100
  }, {
    key: "status",
    header: "Status",
    width: 100
  }, {
    key: "users",
    header: "Users",
    align: "right",
    width: 80
  }]} data={[]} loading loadingRows={6} />
}`,...(ie=(oe=R.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var de,le,ce;L.parameters={...L.parameters,docs:{...(de=L.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => <AdvancedDataTable rowKey="id" columns={[{
    key: "name",
    header: "Company Name"
  }, {
    key: "plan",
    header: "Plan"
  }, {
    key: "status",
    header: "Status"
  }]} data={[]} emptyMessage="No companies found" emptyDescription="Try adjusting your search or filter criteria" />
}`,...(ce=(le=L.parameters)==null?void 0:le.docs)==null?void 0:ce.source}}};var ue,me,pe;q.parameters={...q.parameters,docs:{...(ue=q.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: () => <AdvancedDataTable rowKey="id" columns={[{
    key: "name",
    header: "Company Name"
  }, {
    key: "plan",
    header: "Plan"
  }]} data={[]} error="Failed to load data. Please check your connection and try again." />
}`,...(pe=(me=q.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var he,ge,ye;_.parameters={..._.parameters,docs:{...(he=_.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState<string | undefined>();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const sorted = [...MOCK_COMPANIES].sort((a, b) => {
      if (!sortBy) return 0;
      const av = (a as any)[sortBy];
      const bv = (b as any)[sortBy];
      const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
      return sortOrder === "asc" ? cmp : -cmp;
    });
    const paged = sorted.slice((page - 1) * pageSize, page * pageSize);
    return <AdvancedDataTable rowKey="id" columns={[{
      key: "id",
      header: "ID",
      width: 60
    }, {
      key: "name",
      header: "Company",
      sortable: true
    }, {
      key: "plan",
      header: "Plan",
      width: 110
    }, {
      key: "status",
      header: "Status",
      width: 100,
      render: v => <StatusBadge status={v} />
    }, {
      key: "users",
      header: "Users",
      align: "right",
      sortable: true,
      width: 80
    }, {
      key: "revenue",
      header: "Revenue",
      align: "right",
      sortable: true,
      render: v => \`฿\${v.toLocaleString()}\`
    }]} data={paged} pagination={{
      page,
      pageSize,
      totalCount: MOCK_COMPANIES.length
    }} sortBy={sortBy} sortOrder={sortOrder} onPageChange={(p, ps) => {
      setPage(p);
      setPageSize(ps);
    }} onSortChange={(key, dir) => {
      setSortBy(key);
      setSortOrder(dir);
      setPage(1);
    }} />;
  }
}`,...(ye=(ge=_.parameters)==null?void 0:ge.docs)==null?void 0:ye.source}}};var fe,ve,be;I.parameters={...I.parameters,docs:{...(fe=I.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<Set<string | number>>(new Set());
    const bulkActions: BulkAction[] = [{
      label: "Email",
      icon: <Mail size={13} />,
      onClick: keys => alert(\`Email: \${keys.join(", ")}\`)
    }, {
      label: "Export",
      icon: <Download size={13} />,
      onClick: keys => alert(\`Export: \${keys.join(", ")}\`)
    }, {
      label: "Delete",
      icon: <Trash2 size={13} />,
      variant: "destructive",
      onClick: keys => alert(\`Delete: \${keys.join(", ")}\`)
    }];
    return <AdvancedDataTable rowKey="id" columns={[{
      key: "name",
      header: "Name"
    }, {
      key: "email",
      header: "Email"
    }, {
      key: "role",
      header: "Role",
      width: 100
    }, {
      key: "status",
      header: "Status",
      width: 100,
      render: v => <StatusBadge status={v} />
    }, {
      key: "lastLogin",
      header: "Last Login",
      width: 120
    }]} data={MOCK_USERS} selectable selectedRows={selected} onSelectionChange={s => setSelected(s)} bulkActions={bulkActions} />;
  }
}`,...(be=(ve=I.parameters)==null?void 0:ve.docs)==null?void 0:be.source}}};var xe,ke,we;W.parameters={...W.parameters,docs:{...(xe=W.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  render: () => <AdvancedDataTable rowKey="id" columns={[{
    key: "name",
    header: "Company"
  }, {
    key: "plan",
    header: "Plan",
    width: 110
  }, {
    key: "status",
    header: "Status",
    width: 100,
    render: v => <StatusBadge status={v} />
  }, {
    key: "users",
    header: "Users",
    align: "right",
    width: 80
  }]} data={MOCK_COMPANIES.slice(0, 5)} expandedRowRender={row => <div style={{
    fontFamily: "var(--font-button)",
    fontSize: 13,
    color: "#6b7280"
  }}>\r
          <strong style={{
      color: "#1f2937"
    }}>Details for {row.name}</strong>\r
          <div style={{
      marginTop: 8,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 12
    }}>\r
            <div><span style={{
          display: "block",
          fontWeight: 600,
          color: "#1f2937"
        }}>Revenue</span>฿{row.revenue.toLocaleString()}</div>\r
            <div><span style={{
          display: "block",
          fontWeight: 600,
          color: "#1f2937"
        }}>Created</span>{row.createdAt}</div>\r
            <div><span style={{
          display: "block",
          fontWeight: 600,
          color: "#1f2937"
        }}>Workspace</span>WS-{String(row.id).padStart(3, "0")}</div>\r
          </div>\r
        </div>} />
}`,...(we=(ke=W.parameters)==null?void 0:ke.docs)==null?void 0:we.source}}};var Se,Ce,je;F.parameters={...F.parameters,docs:{...(Se=F.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  render: () => {
    const columns: AdvancedColumn<Company>[] = [{
      key: "id",
      header: "ID",
      width: 60,
      frozen: true,
      hideable: false
    }, {
      key: "name",
      header: "Company Name",
      width: 180,
      frozen: true
    }, {
      key: "plan",
      header: "Plan",
      width: 110
    }, {
      key: "status",
      header: "Status",
      width: 120,
      render: v => <StatusBadge status={v} />
    }, {
      key: "users",
      header: "Users",
      align: "right",
      width: 100
    }, {
      key: "revenue",
      header: "Revenue",
      align: "right",
      width: 140,
      render: v => \`฿\${v.toLocaleString()}\`
    }, {
      key: "createdAt",
      header: "Created At",
      width: 130,
      defaultHidden: true
    }];
    return <AdvancedDataTable rowKey="id" columns={columns} data={MOCK_COMPANIES.slice(0, 8)} showColumnToggle />;
  }
}`,...(je=(Ce=F.parameters)==null?void 0:Ce.docs)==null?void 0:je.source}}};var Ne,Ae,Te;U.parameters={...U.parameters,docs:{...(Ne=U.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState<string>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selected, setSelected] = useState<Set<string | number>>(new Set());
    const sorted = [...MOCK_COMPANIES].sort((a, b) => {
      const av = (a as any)[sortBy];
      const bv = (b as any)[sortBy];
      const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
      return sortOrder === "asc" ? cmp : -cmp;
    });
    const paged = sorted.slice((page - 1) * pageSize, page * pageSize);
    const bulkActions: BulkAction[] = [{
      label: "View",
      icon: <Eye size={13} />,
      onClick: k => alert(\`View: \${k.join(",")}\`)
    }, {
      label: "Export",
      icon: <Download size={13} />,
      onClick: k => alert(\`Export: \${k.join(",")}\`)
    }, {
      label: "Delete",
      icon: <Trash2 size={13} />,
      variant: "destructive",
      onClick: k => alert(\`Delete: \${k.join(",")}\`)
    }];
    return <AdvancedDataTable rowKey="id" columns={[{
      key: "id",
      header: "ID",
      width: 60,
      frozen: true,
      hideable: false,
      sortable: true
    }, {
      key: "name",
      header: "Company",
      width: 180,
      frozen: true,
      sortable: true
    }, {
      key: "plan",
      header: "Plan",
      width: 110
    }, {
      key: "status",
      header: "Status",
      width: 120,
      render: v => <StatusBadge status={v} />
    }, {
      key: "users",
      header: "Users",
      align: "right",
      width: 90,
      sortable: true
    }, {
      key: "revenue",
      header: "Revenue",
      align: "right",
      sortable: true,
      render: v => \`฿\${v.toLocaleString()}\`
    }, {
      key: "createdAt",
      header: "Created",
      width: 120,
      defaultHidden: true
    }]} data={paged} pagination={{
      page,
      pageSize,
      totalCount: MOCK_COMPANIES.length
    }} sortBy={sortBy} sortOrder={sortOrder} onPageChange={(p, ps) => {
      setPage(p);
      setPageSize(ps);
    }} onSortChange={(key, dir) => {
      setSortBy(key);
      setSortOrder(dir);
      setPage(1);
    }} selectable selectedRows={selected} onSelectionChange={s => setSelected(s)} bulkActions={bulkActions} showColumnToggle expandedRowRender={row => <div style={{
      fontFamily: "var(--font-button)",
      fontSize: 13,
      color: "#6b7280"
    }}>\r
            <strong style={{
        color: "#1f2937"
      }}>{row.name}</strong> — Revenue: ฿{row.revenue.toLocaleString()} · Created: {row.createdAt}\r
          </div>} stickyHeader />;
  }
}`,...(Te=(Ae=U.parameters)==null?void 0:Ae.docs)==null?void 0:Te.source}}};const Tt=["Default","Loading","Empty","ErrorState","ServerSidePagination","SelectionAndBulkActions","ExpandableRows","FrozenColumnsAndToggle","CCSAdminPanel"];export{U as CCSAdminPanel,K as Default,L as Empty,q as ErrorState,W as ExpandableRows,F as FrozenColumnsAndToggle,R as Loading,I as SelectionAndBulkActions,_ as ServerSidePagination,Tt as __namedExportsOrder,At as default};
