import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as O}from"./index-ZH-6pyQh.js";import{M as R}from"./minus-BlcBJDUM.js";import{P as B}from"./plus-D8yesTpw.js";import"./_commonjsHelpers-CqkleIqs.js";import"./createLucideIcon-DG6FjBK_.js";const G={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},H={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},J={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"},K={sm:"h-8",md:"h-10",lg:"h-12"},y={sm:14,md:16,lg:18};function r({value:v,defaultValue:C=0,onChange:x,min:d,max:c,step:n=1,disabled:s,size:p="md",label:h,placeholder:F,error:f,className:P=""}){const[_,D]=O.useState(C),t=v??_,b=g=>{const a=Math.max(d??-1/0,Math.min(c??1/0,g));x&&x(a),v===void 0&&D(a)},$=d===void 0||t-n>=d,Q=c===void 0||t+n<=c;return e.jsxs("div",{className:P,children:[h&&e.jsx("label",{className:"block text-foreground mb-1.5",style:G,children:h}),e.jsxs("div",{className:`inline-flex items-center rounded-[var(--radius-md)] border ${f?"border-destructive":"border-border"} bg-background overflow-hidden ${s?"opacity-50 pointer-events-none":""}`,children:[e.jsx("button",{type:"button",onClick:()=>b(t-n),disabled:s||!$,className:"flex items-center justify-center px-2.5 border-r border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors cursor-pointer",style:{height:"100%"},children:e.jsx(R,{size:y[p]})}),e.jsx("input",{type:"number",value:t,placeholder:F,onChange:g=>{const a=parseFloat(g.target.value);isNaN(a)||b(a)},disabled:s,className:`w-20 text-center bg-transparent outline-none text-foreground ${K[p]} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`,style:H}),e.jsx("button",{type:"button",onClick:()=>b(t+n),disabled:s||!Q,className:"flex items-center justify-center px-2.5 border-l border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors cursor-pointer",style:{height:"100%"},children:e.jsx(B,{size:y[p]})})]}),f&&e.jsx("p",{className:"mt-1.5 text-destructive",style:J,children:f})]})}r.__docgenInfo={description:"",methods:[],displayName:"NumberInput",props:{value:{required:!1,tsType:{name:"number"},description:""},defaultValue:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number) => void",signature:{arguments:[{type:{name:"number"},name:"value"}],return:{name:"void"}}},description:""},min:{required:!1,tsType:{name:"number"},description:""},max:{required:!1,tsType:{name:"number"},description:""},step:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const ae={title:"Components/NumberInput",component:r,tags:["autodocs"]},o={args:{defaultValue:1,min:0,max:100}},l={args:{label:"Quantity",defaultValue:1,min:1,max:99}},i={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{label:"Small",size:"sm",defaultValue:5}),e.jsx(r,{label:"Medium",size:"md",defaultValue:10}),e.jsx(r,{label:"Large",size:"lg",defaultValue:15})]})},u={args:{label:"Price",defaultValue:0,step:.5,min:0,max:100}},m={args:{label:"Amount",defaultValue:0,error:"Amount must be greater than 0"}};var V,N,j;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    defaultValue: 1,
    min: 0,
    max: 100
  }
}`,...(j=(N=o.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var S,z,q;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: "Quantity",
    defaultValue: 1,
    min: 1,
    max: 99
  }
}`,...(q=(z=l.parameters)==null?void 0:z.docs)==null?void 0:q.source}}};var I,T,w;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <NumberInput label="Small" size="sm" defaultValue={5} />\r
      <NumberInput label="Medium" size="md" defaultValue={10} />\r
      <NumberInput label="Large" size="lg" defaultValue={15} />\r
    </div>
}`,...(w=(T=i.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var W,M,k;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: "Price",
    defaultValue: 0,
    step: 0.5,
    min: 0,
    max: 100
  }
}`,...(k=(M=u.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var L,E,A;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: "Amount",
    defaultValue: 0,
    error: "Amount must be greater than 0"
  }
}`,...(A=(E=m.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};const re=["Default","WithLabel","Sizes","WithStep","WithError"];export{o as Default,i as Sizes,m as WithError,l as WithLabel,u as WithStep,re as __namedExportsOrder,ae as default};
