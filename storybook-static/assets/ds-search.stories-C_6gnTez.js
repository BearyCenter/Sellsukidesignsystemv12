import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./index-ZH-6pyQh.js";import{S as ee}from"./search-C31aNDpM.js";import{L as ae}from"./loader-circle-C4dAkWyb.js";import{X as re}from"./x-DzaArQBv.js";import"./_commonjsHelpers-CqkleIqs.js";import"./createLucideIcon-DG6FjBK_.js";const te={sm:{input:"h-8 px-8",icon:14,style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"}},md:{input:"h-10 px-9",icon:16,style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"}},lg:{input:"h-12 px-10",icon:18,style:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"}}},le={default:"bg-card border border-border focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",outlined:"bg-transparent border-2 border-border focus-within:border-primary",filled:"bg-muted/50 border border-transparent focus-within:border-ring focus-within:bg-card"};function l({value:x,onChange:u,onSearch:n,placeholder:B="Search...",size:I="md",variant:O="default",loading:w=!1,suggestions:t=[],onSuggestionSelect:i,clearable:K=!0,disabled:j=!1,autoFocus:H=!1,debounce:b=0,className:U=""}){const[X,G]=r.useState(""),[J,o]=r.useState(!1),[p,y]=r.useState(-1),d=x??X,z=r.useRef(null),S=r.useRef(null),F=r.useRef(void 0),c=te[I],T=r.useCallback(e=>{x===void 0&&G(e),u==null||u(e),b>0&&(clearTimeout(F.current),F.current=setTimeout(()=>n==null?void 0:n(e),b))},[x,u,n,b]),Q=e=>{e.key==="Enter"?p>=0&&t[p]?(i==null||i(t[p]),o(!1)):n==null||n(d):e.key==="ArrowDown"?(e.preventDefault(),y(s=>Math.min(s+1,t.length-1))):e.key==="ArrowUp"?(e.preventDefault(),y(s=>Math.max(s-1,-1))):e.key==="Escape"&&o(!1)};r.useEffect(()=>{const e=s=>{S.current&&!S.current.contains(s.target)&&o(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),r.useEffect(()=>{o(t.length>0&&d.length>0),y(-1)},[t,d]);const Y={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},Z={fontFamily:"var(--font-label)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"};return a.jsxs("div",{ref:S,className:`relative ${U}`,children:[a.jsxs("div",{className:`relative rounded-[var(--radius-md)] transition-all ${le[O]} ${j?"opacity-50 pointer-events-none":""}`,children:[a.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",children:a.jsx(ee,{size:c.icon})}),a.jsx("input",{ref:z,type:"text",value:d,onChange:e=>T(e.target.value),onKeyDown:Q,onFocus:()=>t.length>0&&d.length>0&&o(!0),placeholder:B,disabled:j,autoFocus:H,className:`w-full ${c.input} rounded-[var(--radius-md)] bg-transparent outline-none text-foreground placeholder:text-muted-foreground`,style:c.style}),a.jsxs("span",{className:"absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1",children:[w&&a.jsx(ae,{size:c.icon,className:"animate-spin text-muted-foreground"}),K&&d&&!w&&a.jsx("button",{onClick:()=>{var e;T(""),(e=z.current)==null||e.focus()},className:"text-muted-foreground hover:text-foreground transition-colors cursor-pointer",children:a.jsx(re,{size:c.icon})})]})]}),J&&t.length>0&&a.jsx("div",{className:"absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-[var(--radius-md)] shadow-elevation-sm z-50 overflow-hidden max-h-64 overflow-y-auto",style:{padding:"var(--Spacing--Spacing-sm)"},children:t.map((e,s)=>a.jsxs("button",{onClick:()=>{i==null||i(e),o(!1)},className:`w-full text-left flex items-center rounded-[var(--radius-sm)] transition-colors cursor-pointer ${s===p?"bg-[var(--Colors--Background--bg-brand-secondary)]":"hover:bg-[var(--Colors--Background--bg-primary_hover)]"}`,style:{padding:"var(--Spacing--Spacing-md) var(--Spacing--Spacing-2xl)",gap:"var(--Spacing--Spacing-lg)"},children:[e.icon&&a.jsx("span",{className:"text-muted-foreground flex-shrink-0",children:e.icon}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsx("span",{className:"text-foreground block truncate",style:Y,children:e.label}),e.description&&a.jsx("span",{className:"text-muted-foreground block truncate",style:{marginTop:"var(--Spacing--Spacing-xxs)",...Z},children:e.description})]})]},e.id))})]})}l.__docgenInfo={description:"",methods:[],displayName:"SearchField",props:{value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Search..."',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"default" | "outlined" | "filled"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"outlined"'},{name:"literal",value:'"filled"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},suggestions:{required:!1,tsType:{name:"Array",elements:[{name:"SearchSuggestion"}],raw:"SearchSuggestion[]"},description:"",defaultValue:{value:"[]",computed:!1}},onSuggestionSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(suggestion: SearchSuggestion) => void",signature:{arguments:[{type:{name:"SearchSuggestion"},name:"suggestion"}],return:{name:"void"}}},description:""},clearable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},autoFocus:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},debounce:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const pe={title:"Components/Search",component:l,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]},variant:{control:"select",options:["default","outlined","filled"]},loading:{control:"boolean"},disabled:{control:"boolean"}}},m={args:{placeholder:"Search..."}},f={args:{placeholder:"Search products...",suggestions:[{id:"1",label:"Product A",description:"Electronics"},{id:"2",label:"Product B",description:"Clothing"},{id:"3",label:"Product C",description:"Food"}],value:"Product"}},g={args:{loading:!0,placeholder:"Searching..."}},h={render:()=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:400},children:[a.jsx(l,{variant:"default",placeholder:"Default"}),a.jsx(l,{variant:"outlined",placeholder:"Outlined"}),a.jsx(l,{variant:"filled",placeholder:"Filled"})]})},v={render:()=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:400},children:[a.jsx(l,{size:"sm",placeholder:"Small"}),a.jsx(l,{size:"md",placeholder:"Medium"}),a.jsx(l,{size:"lg",placeholder:"Large"})]})};var N,q,k;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    placeholder: "Search..."
  }
}`,...(k=(q=m.parameters)==null?void 0:q.docs)==null?void 0:k.source}}};var D,V,E;f.parameters={...f.parameters,docs:{...(D=f.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    placeholder: "Search products...",
    suggestions: [{
      id: "1",
      label: "Product A",
      description: "Electronics"
    }, {
      id: "2",
      label: "Product B",
      description: "Clothing"
    }, {
      id: "3",
      label: "Product C",
      description: "Food"
    }],
    value: "Product"
  }
}`,...(E=(V=f.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var W,C,L;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    loading: true,
    placeholder: "Searching..."
  }
}`,...(L=(C=g.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var P,A,R;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 400
  }}>\r
      <SearchField variant="default" placeholder="Default" />\r
      <SearchField variant="outlined" placeholder="Outlined" />\r
      <SearchField variant="filled" placeholder="Filled" />\r
    </div>
}`,...(R=(A=h.parameters)==null?void 0:A.docs)==null?void 0:R.source}}};var M,_,$;v.parameters={...v.parameters,docs:{...(M=v.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 400
  }}>\r
      <SearchField size="sm" placeholder="Small" />\r
      <SearchField size="md" placeholder="Medium" />\r
      <SearchField size="lg" placeholder="Large" />\r
    </div>
}`,...($=(_=v.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};const me=["Default","WithSuggestions","Loading","AllVariants","Sizes"];export{h as AllVariants,m as Default,g as Loading,v as Sizes,f as WithSuggestions,me as __namedExportsOrder,pe as default};
