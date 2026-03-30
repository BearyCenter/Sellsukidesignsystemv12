import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{R as C}from"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";const v=["bg-primary","bg-chart-2","bg-chart-5","bg-destructive","bg-secondary"],F={xs:{box:"w-6 h-6",font:{fontFamily:"var(--font-label)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"}},sm:{box:"w-8 h-8",font:{fontFamily:"var(--font-label)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"}},md:{box:"w-10 h-10",font:{fontFamily:"var(--font-label)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"}},lg:{box:"w-14 h-14",font:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"}},xl:{box:"w-20 h-20",font:{fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"}}},G={xs:"w-2 h-2",sm:"w-2.5 h-2.5",md:"w-3 h-3",lg:"w-3.5 h-3.5",xl:"w-4 h-4"},T={online:"bg-chart-2",offline:"bg-secondary",busy:"bg-destructive",away:"bg-chart-5"},q={fontFamily:"var(--font-label)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"};function a({src:r,name:t,size:l="md",status:s,className:o=""}){const n=F[l],f=t?t.split(" ").map(U=>U[0]).join("").slice(0,2).toUpperCase():"?",i=t?v[t.length%v.length]:"bg-muted";return e.jsxs("div",{className:`relative inline-flex ${o}`,children:[r?e.jsx("img",{src:r,alt:t||"avatar",className:`${n.box} rounded-full object-cover`}):e.jsx("div",{className:`${n.box} rounded-full ${i} text-primary-foreground flex items-center justify-center`,style:n.font,children:f}),s&&e.jsx("span",{className:`absolute bottom-0 right-0 ${G[l]} ${T[s]} rounded-full border-2 border-card`})]})}function p({children:r,max:t,className:l=""}){const s=C.Children.toArray(r),o=t?s.slice(0,t):s,n=t&&s.length>t?s.length-t:0;return e.jsxs("div",{className:`flex -space-x-2 ${l}`,children:[o.map((f,i)=>e.jsx("div",{className:"relative",style:{zIndex:o.length-i},children:f},i)),n>0&&e.jsxs("div",{className:"relative w-10 h-10 rounded-full bg-muted text-foreground flex items-center justify-center border-2 border-card",style:{...q,zIndex:0},children:["+",n]})]})}a.displayName="Avatar";p.displayName="AvatarGroup";a.__docgenInfo={description:"",methods:[],displayName:"Avatar",props:{src:{required:!1,tsType:{name:"string"},description:"Image URL"},name:{required:!1,tsType:{name:"string"},description:"Full name (used for initials fallback)"},size:{required:!1,tsType:{name:"union",raw:'"xs" | "sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"xs"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"Avatar size",defaultValue:{value:'"md"',computed:!1}},status:{required:!1,tsType:{name:"union",raw:'"online" | "offline" | "busy" | "away"',elements:[{name:"literal",value:'"online"'},{name:"literal",value:'"offline"'},{name:"literal",value:'"busy"'},{name:"literal",value:'"away"'}]},description:"Status indicator"},className:{required:!1,tsType:{name:"string"},description:"Additional class name",defaultValue:{value:'""',computed:!1}}}};p.__docgenInfo={description:"",methods:[],displayName:"AvatarGroup",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Avatar elements"},max:{required:!1,tsType:{name:"number"},description:"Maximum number of avatars to display before showing +N"},className:{required:!1,tsType:{name:"string"},description:"Additional class name",defaultValue:{value:'""',computed:!1}}}};const W={title:"Components/Avatar",component:a,tags:["autodocs"],argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"]},status:{control:"select",options:["online","offline","busy","away"]}}},m={args:{name:"John Doe",size:"md"}},d={render:()=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[e.jsx(a,{name:"AB",size:"xs"}),e.jsx(a,{name:"CD",size:"sm"}),e.jsx(a,{name:"EF",size:"md"}),e.jsx(a,{name:"GH",size:"lg"}),e.jsx(a,{name:"IJ",size:"xl"})]})},c={render:()=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[e.jsx(a,{name:"Online User",status:"online"}),e.jsx(a,{name:"Offline User",status:"offline"}),e.jsx(a,{name:"Busy User",status:"busy"}),e.jsx(a,{name:"Away User",status:"away"})]})},u={render:()=>e.jsxs(p,{max:3,children:[e.jsx(a,{name:"Alice"}),e.jsx(a,{name:"Bob"}),e.jsx(a,{name:"Charlie"}),e.jsx(a,{name:"Diana"}),e.jsx(a,{name:"Eve"})]})};var x,g,b;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    name: "John Doe",
    size: "md"
  }
}`,...(b=(g=m.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var y,h,A;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12,
    alignItems: "center"
  }}>\r
      <Avatar name="AB" size="xs" />\r
      <Avatar name="CD" size="sm" />\r
      <Avatar name="EF" size="md" />\r
      <Avatar name="GH" size="lg" />\r
      <Avatar name="IJ" size="xl" />\r
    </div>
}`,...(A=(h=d.parameters)==null?void 0:h.docs)==null?void 0:A.source}}};var j,w,z;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12,
    alignItems: "center"
  }}>\r
      <Avatar name="Online User" status="online" />\r
      <Avatar name="Offline User" status="offline" />\r
      <Avatar name="Busy User" status="busy" />\r
      <Avatar name="Away User" status="away" />\r
    </div>
}`,...(z=(w=c.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var S,N,I;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <AvatarGroup max={3}>\r
      <Avatar name="Alice" />\r
      <Avatar name="Bob" />\r
      <Avatar name="Charlie" />\r
      <Avatar name="Diana" />\r
      <Avatar name="Eve" />\r
    </AvatarGroup>
}`,...(I=(N=u.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};const $=["Default","AllSizes","WithStatus","GroupExample"];export{d as AllSizes,m as Default,u as GroupExample,c as WithStatus,$ as __namedExportsOrder,W as default};
