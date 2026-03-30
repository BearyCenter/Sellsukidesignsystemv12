import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as F}from"./index-ZH-6pyQh.js";import{L as M}from"./loader-circle-C4dAkWyb.js";import{P as C}from"./plus-D8yesTpw.js";import{S as Y}from"./settings-BXaJJ-8e.js";import{T as O}from"./trash-2-DGMClNkr.js";import{c as Z}from"./createLucideIcon-DG6FjBK_.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],te=Z("arrow-right",ee),re={sm:"h-8 px-3 gap-1.5",md:"h-9 px-4 gap-2",lg:"h-10 px-5 gap-2",xl:"h-11 px-6 gap-2.5"},ae={sm:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},md:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},lg:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},xl:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"}},H={sm:14,md:16,lg:18,xl:20},J={primary:"bg-primary text-primary-foreground border border-primary hover:bg-primary/90 active:bg-primary/80 shadow-elevation-sm",secondary:"bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary/90 active:bg-secondary/80 shadow-elevation-sm",outline:"bg-transparent text-foreground border border-border hover:bg-muted active:bg-muted/80",ghost:"bg-transparent text-foreground border border-transparent hover:bg-muted active:bg-muted/80",destructive:"bg-destructive text-destructive-foreground border border-destructive hover:bg-destructive/90 active:bg-destructive/80 shadow-elevation-sm",link:"bg-transparent text-primary border border-transparent underline-offset-4 hover:underline px-0 h-auto"},t=F.forwardRef(({variant:a="primary",size:r="md",loading:n=!1,loadingText:i,leftIcon:o,rightIcon:l,fullWidth:h=!1,active:y=!1,disabled:d,children:u,className:Q="",...U},X)=>{const b=d||n;return e.jsx("button",{ref:X,disabled:b,className:`inline-flex items-center justify-center rounded-[var(--radius-md)] transition-all duration-150
          ${re[r]}
          ${J[a]}
          ${h?"w-full":""}
          ${y?"ring-2 ring-ring/30":""}
          ${b?"opacity-50 cursor-not-allowed pointer-events-none":"cursor-pointer active:scale-[0.98]"}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
          ${Q}
        `,style:ae[r],...U,children:n?e.jsxs(e.Fragment,{children:[e.jsx(M,{size:H[r],className:"animate-spin flex-shrink-0"}),i&&e.jsx("span",{children:i})]}):e.jsxs(e.Fragment,{children:[o&&e.jsx("span",{className:"flex-shrink-0",children:o}),u&&e.jsx("span",{children:u}),l&&e.jsx("span",{className:"flex-shrink-0",children:l})]})})});t.displayName="DSButton";const s=F.forwardRef(({variant:a="ghost",size:r="md",loading:n=!1,icon:i,disabled:o,className:l="",...h},y)=>{const d=o||n,u={sm:"w-8 h-8",md:"w-9 h-9",lg:"w-10 h-10",xl:"w-11 h-11"};return e.jsx("button",{ref:y,disabled:d,className:`inline-flex items-center justify-center rounded-[var(--radius-md)] transition-all duration-150
          ${u[r]}
          ${J[a]}
          ${d?"opacity-50 cursor-not-allowed pointer-events-none":"cursor-pointer active:scale-[0.98]"}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
          ${l}
        `,...h,children:n?e.jsx(M,{size:H[r],className:"animate-spin"}):i})});s.displayName="IconButton";function K({children:a,className:r=""}){return e.jsx("div",{className:`inline-flex [&>button]:rounded-none [&>button:first-child]:rounded-l-[var(--radius-md)] [&>button:last-child]:rounded-r-[var(--radius-md)] [&>button:not(:last-child)]:border-r-0 ${r}`,children:a})}t.__docgenInfo={description:"",methods:[],displayName:"DSButton",props:{variant:{required:!1,tsType:{name:"union",raw:'"primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"',elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"secondary"'},{name:"literal",value:'"outline"'},{name:"literal",value:'"ghost"'},{name:"literal",value:'"destructive"'},{name:"literal",value:'"link"'}]},description:"",defaultValue:{value:'"primary"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},loadingText:{required:!1,tsType:{name:"string"},description:""},leftIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},rightIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},active:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{defaultValue:{value:'""',computed:!1},required:!1}}};s.__docgenInfo={description:"",methods:[],displayName:"IconButton",props:{variant:{required:!1,tsType:{name:"union",raw:'"primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"',elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"secondary"'},{name:"literal",value:'"outline"'},{name:"literal",value:'"ghost"'},{name:"literal",value:'"destructive"'},{name:"literal",value:'"link"'}]},description:"",defaultValue:{value:'"ghost"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},icon:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},"aria-label":{required:!0,tsType:{name:"string"},description:""},className:{defaultValue:{value:'""',computed:!1},required:!1}}};K.__docgenInfo={description:"",methods:[],displayName:"ButtonGroup",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const me={title:"Components/Button",component:t,tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","outline","ghost","destructive","link"]},size:{control:"select",options:["sm","md","lg","xl"]},loading:{control:"boolean"},fullWidth:{control:"boolean"},disabled:{control:"boolean"},active:{control:"boolean"}}},c={args:{children:"Button",variant:"primary",size:"md"}},m={render:()=>e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:12,alignItems:"center"},children:[e.jsx(t,{variant:"primary",children:"Primary"}),e.jsx(t,{variant:"secondary",children:"Secondary"}),e.jsx(t,{variant:"outline",children:"Outline"}),e.jsx(t,{variant:"ghost",children:"Ghost"}),e.jsx(t,{variant:"destructive",children:"Destructive"}),e.jsx(t,{variant:"link",children:"Link"})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[e.jsx(t,{size:"sm",children:"Small"}),e.jsx(t,{size:"md",children:"Medium"}),e.jsx(t,{size:"lg",children:"Large"}),e.jsx(t,{size:"xl",children:"Extra Large"})]})},v={render:()=>e.jsxs("div",{style:{display:"flex",gap:12},children:[e.jsx(t,{leftIcon:e.jsx(C,{size:16}),children:"Add Item"}),e.jsx(t,{rightIcon:e.jsx(te,{size:16}),children:"Next"}),e.jsx(t,{variant:"destructive",leftIcon:e.jsx(O,{size:16}),children:"Delete"})]})},g={args:{loading:!0,loadingText:"Saving..."}},f={render:()=>e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx(s,{icon:e.jsx(C,{size:16}),"aria-label":"Add"}),e.jsx(s,{icon:e.jsx(Y,{size:16}),"aria-label":"Settings",variant:"outline"}),e.jsx(s,{icon:e.jsx(O,{size:16}),"aria-label":"Delete",variant:"destructive"})]})},x={render:()=>e.jsxs(K,{children:[e.jsx(t,{variant:"outline",children:"Left"}),e.jsx(t,{variant:"outline",children:"Center"}),e.jsx(t,{variant:"outline",children:"Right"})]})};var S,B,j;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    children: "Button",
    variant: "primary",
    size: "md"
  }
}`,...(j=(B=c.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};var D,z,w;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center"
  }}>\r
      <DSButton variant="primary">Primary</DSButton>\r
      <DSButton variant="secondary">Secondary</DSButton>\r
      <DSButton variant="outline">Outline</DSButton>\r
      <DSButton variant="ghost">Ghost</DSButton>\r
      <DSButton variant="destructive">Destructive</DSButton>\r
      <DSButton variant="link">Link</DSButton>\r
    </div>
}`,...(w=(z=m.parameters)==null?void 0:z.docs)==null?void 0:w.source}}};var I,N,R;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12,
    alignItems: "center"
  }}>\r
      <DSButton size="sm">Small</DSButton>\r
      <DSButton size="md">Medium</DSButton>\r
      <DSButton size="lg">Large</DSButton>\r
      <DSButton size="xl">Extra Large</DSButton>\r
    </div>
}`,...(R=(N=p.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var T,q,k;v.parameters={...v.parameters,docs:{...(T=v.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12
  }}>\r
      <DSButton leftIcon={<Plus size={16} />}>Add Item</DSButton>\r
      <DSButton rightIcon={<ArrowRight size={16} />}>Next</DSButton>\r
      <DSButton variant="destructive" leftIcon={<Trash2 size={16} />}>Delete</DSButton>\r
    </div>
}`,...(k=(q=v.parameters)==null?void 0:q.docs)==null?void 0:k.source}}};var L,V,$;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    loading: true,
    loadingText: "Saving..."
  }
}`,...($=(V=g.parameters)==null?void 0:V.docs)==null?void 0:$.source}}};var A,W,_;f.parameters={...f.parameters,docs:{...(A=f.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 8
  }}>\r
      <IconButton icon={<Plus size={16} />} aria-label="Add" />\r
      <IconButton icon={<Settings size={16} />} aria-label="Settings" variant="outline" />\r
      <IconButton icon={<Trash2 size={16} />} aria-label="Delete" variant="destructive" />\r
    </div>
}`,...(_=(W=f.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var E,G,P;x.parameters={...x.parameters,docs:{...(E=x.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <ButtonGroup>\r
      <DSButton variant="outline">Left</DSButton>\r
      <DSButton variant="outline">Center</DSButton>\r
      <DSButton variant="outline">Right</DSButton>\r
    </ButtonGroup>
}`,...(P=(G=x.parameters)==null?void 0:G.docs)==null?void 0:P.source}}};const pe=["Primary","AllVariants","AllSizes","WithIcons","Loading","IconButtonExample","ButtonGroupExample"];export{p as AllSizes,m as AllVariants,x as ButtonGroupExample,f as IconButtonExample,g as Loading,c as Primary,v as WithIcons,pe as __namedExportsOrder,me as default};
