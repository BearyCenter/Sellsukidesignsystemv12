import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as w}from"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";const H={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},J={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-label)"},Q={sm:"w-9 h-9",md:"w-11 h-11",lg:"w-14 h-14"};function c({length:a=6,value:v,onChange:b,onComplete:y,disabled:S,error:h,size:W="md",label:j,masked:R,className:_=""}){const[$,A]=w.useState(()=>"".padEnd(a,"")),o=w.useRef([]),T=(v??$).padEnd(a,"").split("").slice(0,a),u=w.useCallback(e=>{b&&b(e),v===void 0&&A(e),e.replace(/ /g,"").length===a&&y&&y(e)},[b,y,v,a]),K=(e,r)=>{var i;if(!/^\d$/.test(r))return;const t=T.slice();t[e]=r;const s=t.join("");u(s),e<a-1&&((i=o.current[e+1])==null||i.focus())},B=(e,r)=>{var t,s,i;if(r.key==="Backspace"){r.preventDefault();const l=T.slice();l[e]!==" "&&l[e]!==""?(l[e]=" ",u(l.join(""))):e>0&&(l[e-1]=" ",u(l.join("")),(t=o.current[e-1])==null||t.focus())}else r.key==="ArrowLeft"&&e>0?(s=o.current[e-1])==null||s.focus():r.key==="ArrowRight"&&e<a-1&&((i=o.current[e+1])==null||i.focus())},G=e=>{var t;e.preventDefault();const r=e.clipboardData.getData("text").replace(/\D/g,"").slice(0,a);if(r){u(r.padEnd(a," "));const s=Math.min(r.length,a-1);(t=o.current[s])==null||t.focus()}};return n.jsxs("div",{className:_,children:[j&&n.jsx("label",{className:"block text-foreground mb-2",style:H,children:j}),n.jsx("div",{className:"flex gap-2",onPaste:G,children:T.map((e,r)=>n.jsx("input",{ref:t=>{o.current[r]=t},type:R?"password":"text",inputMode:"numeric",maxLength:1,value:e===" "?"":e,disabled:S,onChange:t=>{const s=t.target.value;s&&K(r,s[s.length-1])},onKeyDown:t=>B(r,t),onFocus:t=>t.target.select(),className:`${Q[W]} text-center rounded-[var(--radius-md)] border outline-none transition-all
              ${h?"border-destructive focus:ring-2 focus:ring-destructive/30":"border-border focus:border-primary focus:ring-2 focus:ring-primary/20"}
              ${S?"opacity-50 pointer-events-none bg-muted":"bg-background"}
              text-foreground`,style:{fontFamily:"var(--font-button)",fontWeight:"var(--weight-button)"}},r))}),h&&n.jsx("p",{className:"mt-2 text-destructive",style:J,children:h})]})}c.__docgenInfo={description:"",methods:[],displayName:"OTPInput",props:{length:{required:!1,tsType:{name:"number"},description:"Number of OTP digits",defaultValue:{value:"6",computed:!1}},value:{required:!1,tsType:{name:"string"},description:"Controlled value"},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Called when the OTP value changes"},onComplete:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Called when all digits are filled"},disabled:{required:!1,tsType:{name:"boolean"},description:""},error:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},masked:{required:!1,tsType:{name:"boolean"},description:"Mask input (show dots instead of digits)"},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const ee={title:"Components/OTPInput",component:c,tags:["autodocs"]},d={args:{label:"Enter verification code"}},m={args:{label:"PIN Code",length:4}},p={args:{label:"Secure OTP",length:6,masked:!0}},f={render:()=>n.jsxs("div",{className:"space-y-6",children:[n.jsx(c,{label:"Small",size:"sm",length:4}),n.jsx(c,{label:"Medium",size:"md",length:4}),n.jsx(c,{label:"Large",size:"lg",length:4})]})},g={args:{label:"Verification Code",error:"Invalid code, please try again",length:6}};var x,I,P;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: "Enter verification code"
  }
}`,...(P=(I=d.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var k,z,D;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: "PIN Code",
    length: 4
  }
}`,...(D=(z=m.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var N,O,q;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: "Secure OTP",
    length: 6,
    masked: true
  }
}`,...(q=(O=p.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var E,C,M;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">\r
      <OTPInput label="Small" size="sm" length={4} />\r
      <OTPInput label="Medium" size="md" length={4} />\r
      <OTPInput label="Large" size="lg" length={4} />\r
    </div>
}`,...(M=(C=f.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var F,L,V;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    label: "Verification Code",
    error: "Invalid code, please try again",
    length: 6
  }
}`,...(V=(L=g.parameters)==null?void 0:L.docs)==null?void 0:V.source}}};const re=["Default","FourDigits","Masked","Sizes","WithError"];export{d as Default,m as FourDigits,p as Masked,f as Sizes,g as WithError,re as __namedExportsOrder,ee as default};
