import{j as e}from"./jsx-runtime-D_zvdyIk.js";const w={none:"",sm:"shadow-elevation-sm",md:"shadow-elevation-sm",lg:"shadow-elevation-sm"};function a({children:r,className:c,hover:j,elevation:R="none"}){return e.jsx("div",{className:`rounded-[var(--radius-lg)] border border-border bg-card overflow-hidden ${w[R]??""} ${j?"hover:border-primary/40 hover:shadow-elevation-sm transition-all cursor-pointer":""} ${c??""}`,children:r})}a.displayName="Card";function i({children:r,action:c}){return e.jsxs("div",{className:"px-5 py-4 border-b border-border flex items-center justify-between",children:[e.jsx("div",{children:r}),c]})}i.displayName="CardHeader";function o({children:r}){return e.jsx("div",{className:"px-5 py-4",children:r})}o.displayName="CardBody";function l({children:r}){return e.jsx("div",{className:"px-5 py-3 border-t border-border bg-muted/10 flex items-center gap-2",children:r})}l.displayName="CardFooter";a.__docgenInfo={description:"",methods:[],displayName:"Card",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},hover:{required:!1,tsType:{name:"boolean"},description:""},elevation:{required:!1,tsType:{name:"union",raw:'"none" | "sm" | "md" | "lg"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"none"',computed:!1}}}};i.__docgenInfo={description:"",methods:[],displayName:"CardHeader",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};o.__docgenInfo={description:"",methods:[],displayName:"CardBody",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};l.__docgenInfo={description:"",methods:[],displayName:"CardFooter",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const T={title:"Components/Card",component:a,tags:["autodocs"],argTypes:{hover:{control:"boolean"},elevation:{control:"select",options:["none","sm","md","lg"]}}},d={render:()=>e.jsxs(a,{children:[e.jsx(i,{children:"Card Title"}),e.jsx(o,{children:"This is the card body content."}),e.jsx(l,{children:e.jsx("button",{children:"Action"})})]})},t={render:()=>e.jsx("div",{style:{display:"flex",gap:16,flexWrap:"wrap"},children:["none","sm","md","lg"].map(r=>e.jsx(a,{elevation:r,children:e.jsxs(o,{children:["Elevation: ",r]})},r))})},n={render:()=>e.jsx(a,{hover:!0,children:e.jsx(o,{children:"Hover over this card to see the effect."})})},s={render:()=>e.jsxs(a,{children:[e.jsx(i,{action:e.jsx("button",{style:{color:"var(--primary)"},children:"Edit"}),children:"Settings"}),e.jsx(o,{children:"Card content with a header action button."})]})};var p,m,u;d.parameters={...d.parameters,docs:{...(p=d.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Card>\r
      <CardHeader>Card Title</CardHeader>\r
      <CardBody>This is the card body content.</CardBody>\r
      <CardFooter>\r
        <button>Action</button>\r
      </CardFooter>\r
    </Card>
}`,...(u=(m=d.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var h,y,v;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 16,
    flexWrap: "wrap"
  }}>\r
      {(["none", "sm", "md", "lg"] as const).map(e => <Card key={e} elevation={e}>\r
          <CardBody>Elevation: {e}</CardBody>\r
        </Card>)}\r
    </div>
}`,...(v=(y=t.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var C,x,f;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Card hover>\r
      <CardBody>Hover over this card to see the effect.</CardBody>\r
    </Card>
}`,...(f=(x=n.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var b,g,N;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Card>\r
      <CardHeader action={<button style={{
      color: "var(--primary)"
    }}>Edit</button>}>\r
        Settings\r
      </CardHeader>\r
      <CardBody>Card content with a header action button.</CardBody>\r
    </Card>
}`,...(N=(g=s.parameters)==null?void 0:g.docs)==null?void 0:N.source}}};const B=["Default","Elevations","Hoverable","WithHeaderAction"];export{d as Default,t as Elevations,n as Hoverable,s as WithHeaderAction,B as __namedExportsOrder,T as default};
