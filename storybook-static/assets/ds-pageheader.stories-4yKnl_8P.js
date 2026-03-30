import{j as n}from"./jsx-runtime-D_zvdyIk.js";const N={fontFamily:"var(--font-h3, 'DB HeaventRounded', sans-serif)",fontSize:"var(--text-h3, 28px)",fontWeight:"var(--weight-h3, 700)",color:"var(--foreground)",lineHeight:1.3},w={fontFamily:"var(--font-p, 'DB HeaventRounded', sans-serif)",fontSize:"var(--text-p, 24px)",fontWeight:"var(--weight-p, 400)",color:"var(--muted-foreground)",lineHeight:1.4},B={fontFamily:"var(--font-caption, 'DB HeaventRounded', sans-serif)",fontSize:"var(--text-caption, 20px)"};function W({title:t,subtitle:e,breadcrumb:d,actions:l,tabs:c,sticky:C=!1,className:z=""}){return n.jsxs("div",{className:`bg-background border-b border-border ${C?"sticky top-0 z-10":""} ${z}`,children:[n.jsxs("div",{className:"px-6 pt-5 pb-4",children:[d&&n.jsx("div",{className:"mb-2",style:B,children:d}),n.jsxs("div",{className:"flex items-start justify-between gap-4",children:[n.jsxs("div",{className:"min-w-0",children:[n.jsx("h3",{style:N,className:"truncate",children:t}),e&&n.jsx("p",{className:"mt-0.5",style:w,children:e})]}),l&&n.jsx("div",{className:"flex items-center gap-2 flex-shrink-0 pt-0.5",children:l})]})]}),c&&n.jsx("div",{className:"px-6",children:c})]})}W.__docgenInfo={description:"",methods:[],displayName:"PageHeader",props:{title:{required:!0,tsType:{name:"string"},description:"Main page title (required)"},subtitle:{required:!1,tsType:{name:"string"},description:"Optional subtitle below the title"},breadcrumb:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Breadcrumb content — pass a <Breadcrumb /> component"},actions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Action buttons — right-aligned (pass DSButton components)"},tabs:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Tab navigation below the header — pass a <Tabs /> component"},sticky:{required:!1,tsType:{name:"boolean"},description:"Stick to top of viewport while scrolling",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional className",defaultValue:{value:'""',computed:!1}}}};const D={title:"Components/PageHeader",component:W,tags:["autodocs"],parameters:{layout:"fullscreen"},argTypes:{title:{control:"text"},subtitle:{control:"text"},sticky:{control:"boolean"}}},r={args:{title:"Order Management",subtitle:"Manage and track all customer orders"}},a={args:{title:"Create Campaign",subtitle:"Set up a new marketing campaign",breadcrumb:n.jsxs("nav",{style:{fontSize:13,color:"#6b7280",fontFamily:"var(--font-label)"},children:[n.jsx("span",{children:"Dashboard"}),n.jsx("span",{style:{margin:"0 6px"},children:"/"}),n.jsx("span",{children:"Marketing"}),n.jsx("span",{style:{margin:"0 6px"},children:"/"}),n.jsx("span",{style:{color:"#1f2937",fontWeight:500},children:"Create Campaign"})]})}},o={args:{title:"Products",subtitle:"Manage your product catalog",actions:n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{style:{height:36,padding:"0 16px",borderRadius:8,border:"1px solid #e5e7eb",background:"#fff",fontFamily:"var(--font-button)",fontSize:14,fontWeight:600,cursor:"pointer",color:"#1f2937"},children:"Export"}),n.jsx("button",{style:{height:36,padding:"0 16px",borderRadius:8,border:"none",background:"#32a9ff",fontFamily:"var(--font-button)",fontSize:14,fontWeight:600,cursor:"pointer",color:"#fff"},children:"+ Add Product"})]})}},s={args:{title:"Orders",actions:n.jsx("button",{style:{height:36,padding:"0 16px",borderRadius:8,border:"none",background:"#32a9ff",fontFamily:"var(--font-button)",fontSize:14,fontWeight:600,cursor:"pointer",color:"#fff"},children:"Export"}),tabs:n.jsx("div",{style:{display:"flex",gap:0,borderBottom:"none"},children:["All","Pending","Shipped","Delivered","Cancelled"].map((t,e)=>n.jsx("button",{style:{padding:"8px 16px",border:"none",background:"none",fontFamily:"var(--font-button)",fontSize:14,cursor:"pointer",borderBottom:e===0?"2px solid #32a9ff":"2px solid transparent",color:e===0?"#32a9ff":"#6b7280",fontWeight:e===0?600:400},children:t},t))})}},i={args:{title:"Campaign Management",subtitle:"Create and manage marketing campaigns",sticky:!1,breadcrumb:n.jsxs("nav",{style:{fontSize:13,color:"#6b7280",fontFamily:"var(--font-button)"},children:[n.jsx("span",{children:"Dashboard"}),n.jsx("span",{style:{margin:"0 6px"},children:"/"}),n.jsx("span",{style:{color:"#1f2937"},children:"Campaign"})]}),actions:n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{style:{height:36,padding:"0 16px",borderRadius:8,border:"1px solid #e5e7eb",background:"#fff",fontFamily:"var(--font-button)",fontSize:14,fontWeight:600,cursor:"pointer",color:"#1f2937"},children:"Import"}),n.jsx("button",{style:{height:36,padding:"0 16px",borderRadius:8,border:"none",background:"#32a9ff",fontFamily:"var(--font-button)",fontSize:14,fontWeight:600,cursor:"pointer",color:"#fff"},children:"+ New Campaign"})]}),tabs:n.jsx("div",{style:{display:"flex"},children:["All Campaigns","Active","Scheduled","Completed"].map((t,e)=>n.jsx("button",{style:{padding:"8px 16px",border:"none",background:"none",fontFamily:"var(--font-button)",fontSize:14,cursor:"pointer",borderBottom:e===0?"2px solid #32a9ff":"2px solid transparent",color:e===0?"#32a9ff":"#6b7280",fontWeight:e===0?600:400},children:t},t))})}};var p,f,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: "Order Management",
    subtitle: "Manage and track all customer orders"
  }
}`,...(u=(f=r.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var b,g,m;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    title: "Create Campaign",
    subtitle: "Set up a new marketing campaign",
    breadcrumb: <nav style={{
      fontSize: 13,
      color: "#6b7280",
      fontFamily: "var(--font-label)"
    }}>\r
        <span>Dashboard</span>\r
        <span style={{
        margin: "0 6px"
      }}>/</span>\r
        <span>Marketing</span>\r
        <span style={{
        margin: "0 6px"
      }}>/</span>\r
        <span style={{
        color: "#1f2937",
        fontWeight: 500
      }}>Create Campaign</span>\r
      </nav>
  }
}`,...(m=(g=a.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var h,x,y;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: "Products",
    subtitle: "Manage your product catalog",
    actions: <div style={{
      display: "flex",
      gap: 8
    }}>\r
        <button style={{
        height: 36,
        padding: "0 16px",
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        background: "#fff",
        fontFamily: "var(--font-button)",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        color: "#1f2937"
      }}>\r
          Export\r
        </button>\r
        <button style={{
        height: 36,
        padding: "0 16px",
        borderRadius: 8,
        border: "none",
        background: "#32a9ff",
        fontFamily: "var(--font-button)",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        color: "#fff"
      }}>\r
          + Add Product\r
        </button>\r
      </div>
  }
}`,...(y=(x=o.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var v,S,j;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    title: "Orders",
    actions: <button style={{
      height: 36,
      padding: "0 16px",
      borderRadius: 8,
      border: "none",
      background: "#32a9ff",
      fontFamily: "var(--font-button)",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      color: "#fff"
    }}>\r
        Export\r
      </button>,
    tabs: <div style={{
      display: "flex",
      gap: 0,
      borderBottom: "none"
    }}>\r
        {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map((t, i) => <button key={t} style={{
        padding: "8px 16px",
        border: "none",
        background: "none",
        fontFamily: "var(--font-button)",
        fontSize: 14,
        cursor: "pointer",
        borderBottom: i === 0 ? "2px solid #32a9ff" : "2px solid transparent",
        color: i === 0 ? "#32a9ff" : "#6b7280",
        fontWeight: i === 0 ? 600 : 400
      }}>\r
            {t}\r
          </button>)}\r
      </div>
  }
}`,...(j=(S=s.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var k,R,F;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    title: "Campaign Management",
    subtitle: "Create and manage marketing campaigns",
    sticky: false,
    breadcrumb: <nav style={{
      fontSize: 13,
      color: "#6b7280",
      fontFamily: "var(--font-button)"
    }}>\r
        <span>Dashboard</span>\r
        <span style={{
        margin: "0 6px"
      }}>/</span>\r
        <span style={{
        color: "#1f2937"
      }}>Campaign</span>\r
      </nav>,
    actions: <div style={{
      display: "flex",
      gap: 8
    }}>\r
        <button style={{
        height: 36,
        padding: "0 16px",
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        background: "#fff",
        fontFamily: "var(--font-button)",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        color: "#1f2937"
      }}>\r
          Import\r
        </button>\r
        <button style={{
        height: 36,
        padding: "0 16px",
        borderRadius: 8,
        border: "none",
        background: "#32a9ff",
        fontFamily: "var(--font-button)",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        color: "#fff"
      }}>\r
          + New Campaign\r
        </button>\r
      </div>,
    tabs: <div style={{
      display: "flex"
    }}>\r
        {["All Campaigns", "Active", "Scheduled", "Completed"].map((t, i) => <button key={t} style={{
        padding: "8px 16px",
        border: "none",
        background: "none",
        fontFamily: "var(--font-button)",
        fontSize: 14,
        cursor: "pointer",
        borderBottom: i === 0 ? "2px solid #32a9ff" : "2px solid transparent",
        color: i === 0 ? "#32a9ff" : "#6b7280",
        fontWeight: i === 0 ? 600 : 400
      }}>\r
            {t}\r
          </button>)}\r
      </div>
  }
}`,...(F=(R=i.parameters)==null?void 0:R.docs)==null?void 0:F.source}}};const T=["Default","WithBreadcrumb","WithActions","WithTabs","FullFeature"];export{r as Default,i as FullFeature,o as WithActions,a as WithBreadcrumb,s as WithTabs,T as __namedExportsOrder,D as default};
