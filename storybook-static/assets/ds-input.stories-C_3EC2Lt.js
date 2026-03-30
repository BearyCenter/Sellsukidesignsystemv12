import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{D as a,a as B}from"./ds-input-CKS3h5pF.js";import{M as H}from"./mail-D7L2eZHR.js";import{S as _}from"./search-C31aNDpM.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";import"./x-DzaArQBv.js";import"./createLucideIcon-DG6FjBK_.js";import"./eye-ZqUzu1S3.js";import"./circle-alert-B5B9c3p0.js";import"./circle-check-B9Qg33F-.js";const re={title:"Components/Input",component:a,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]},variant:{control:"select",options:["default","outlined","filled","ghost"]},state:{control:"select",options:["default","error","success","warning"]}}},r={args:{placeholder:"Enter text..."}},s={args:{label:"Email",placeholder:"you@example.com",required:!0}},l={args:{label:"Search",placeholder:"Type to search...",clearable:!0,defaultValue:"Hello"}},t={args:{label:"Password",type:"password",showPasswordToggle:!0,placeholder:"Enter password"}},o={args:{label:"Email",errorMessage:"Invalid email address",defaultValue:"invalid"}},n={args:{label:"Username",successMessage:"Username is available!",state:"success",defaultValue:"sellsuki"}},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:400},children:[e.jsx(a,{variant:"default",label:"Default",placeholder:"Default variant"}),e.jsx(a,{variant:"outlined",label:"Outlined",placeholder:"Outlined variant"}),e.jsx(a,{variant:"filled",label:"Filled",placeholder:"Filled variant"}),e.jsx(a,{variant:"ghost",label:"Ghost",placeholder:"Ghost variant"})]})},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:400},children:[e.jsx(a,{leftIcon:e.jsx(H,{size:16}),placeholder:"Email address"}),e.jsx(a,{leftIcon:e.jsx(_,{size:16}),placeholder:"Search...",clearable:!0})]})},d={render:()=>e.jsx(B,{label:"Description",placeholder:"Write something...",helperText:"Max 500 characters"})},p={render:()=>e.jsx(B,{label:"Bio",placeholder:"Tell us about yourself...",showCharCount:!0,maxLength:200})};var u,m,h;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text..."
  }
}`,...(h=(m=r.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var g,x,f;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: "Email",
    placeholder: "you@example.com",
    required: true
  }
}`,...(f=(x=s.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var b,v,S;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: "Search",
    placeholder: "Type to search...",
    clearable: true,
    defaultValue: "Hello"
  }
}`,...(S=(v=l.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var D,T,y;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: "Password",
    type: "password",
    showPasswordToggle: true,
    placeholder: "Enter password"
  }
}`,...(y=(T=t.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};var I,W,w;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: "Email",
    errorMessage: "Invalid email address",
    defaultValue: "invalid"
  }
}`,...(w=(W=o.parameters)==null?void 0:W.docs)==null?void 0:w.source}}};var j,E,C;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: "Username",
    successMessage: "Username is available!",
    state: "success" as const,
    defaultValue: "sellsuki"
  }
}`,...(C=(E=n.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var M,V,P;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 400
  }}>\r
      <DSInput variant="default" label="Default" placeholder="Default variant" />\r
      <DSInput variant="outlined" label="Outlined" placeholder="Outlined variant" />\r
      <DSInput variant="filled" label="Filled" placeholder="Filled variant" />\r
      <DSInput variant="ghost" label="Ghost" placeholder="Ghost variant" />\r
    </div>
}`,...(P=(V=c.parameters)==null?void 0:V.docs)==null?void 0:P.source}}};var z,O,F;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 400
  }}>\r
      <DSInput leftIcon={<Mail size={16} />} placeholder="Email address" />\r
      <DSInput leftIcon={<Search size={16} />} placeholder="Search..." clearable />\r
    </div>
}`,...(F=(O=i.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var G,L,U;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <DSTextarea label="Description" placeholder="Write something..." helperText="Max 500 characters" />
}`,...(U=(L=d.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};var k,q,A;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <DSTextarea label="Bio" placeholder="Tell us about yourself..." showCharCount maxLength={200} />
}`,...(A=(q=p.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};const se=["Default","WithLabel","Clearable","PasswordToggle","WithError","WithSuccess","AllVariants","WithIcons","TextareaDefault","TextareaWithCharCount"];export{c as AllVariants,l as Clearable,r as Default,t as PasswordToggle,d as TextareaDefault,p as TextareaWithCharCount,o as WithError,i as WithIcons,s as WithLabel,n as WithSuccess,se as __namedExportsOrder,re as default};
