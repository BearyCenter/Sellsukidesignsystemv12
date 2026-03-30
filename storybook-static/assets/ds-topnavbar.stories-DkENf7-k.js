import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./index-ZH-6pyQh.js";import{T as k,S as D,P as N}from"./ds-topnavbar-D5YafcLS.js";import{H as w}from"./house-CGCrBEi_.js";import{S as A,U as P}from"./users-yGUaxJhm.js";import{S as W}from"./settings-BXaJJ-8e.js";import"./_commonjsHelpers-CqkleIqs.js";import"./createLucideIcon-DG6FjBK_.js";import"./ds-tooltip-0N8kTnAg.js";import"./index-BP-xEy0R.js";import"./index-DVyBTwwr.js";import"./chevron-up-CDiEuP6f.js";import"./check-YojSnU74.js";import"./chevron-right-BjfhjwKz.js";import"./search-C31aNDpM.js";import"./bell-DyFwNdCs.js";const V={title:"Components/TopNavbar",component:k,tags:["autodocs"],argTypes:{showSearch:{control:"boolean"},notificationCount:{control:"number"},height:{control:"text"}}},a={args:{brand:{name:"Sellsuki"},breadcrumbs:[{label:"Home",href:"/"},{label:"Products"}],user:{name:"John Doe"},showSearch:!0,onNotificationClick:()=>{},notificationCount:3}},r={args:{brand:{name:"App"},user:{name:"Admin"}}},o={args:{brand:{name:"Sellsuki"},breadcrumbs:[{label:"Dashboard"},{label:"Orders"}],user:{name:"Watcharapong C."},showSearch:!0,notificationCount:5,onNotificationClick:()=>{},onSidebarToggle:()=>alert("Sidebar toggled")}},n={render:()=>{const[y,t]=i.useState(!1),[j,T]=i.useState("dashboard"),z=[{label:"Main",items:[{id:"dashboard",label:"Dashboard",icon:e.jsx(w,{size:16})},{id:"orders",label:"Orders",icon:e.jsx(A,{size:16}),badge:"12"},{id:"products",label:"Products",icon:e.jsx(N,{size:16})},{id:"customers",label:"Customers",icon:e.jsx(P,{size:16})},{id:"settings",label:"Settings",icon:e.jsx(W,{size:16})}]}];return e.jsxs("div",{style:{border:"1px solid var(--border)",borderRadius:8,overflow:"hidden",height:480},children:[e.jsx(k,{brand:{name:"Sellsuki"},breadcrumbs:[{label:"Dashboard"}],user:{name:"John Doe"},showSearch:!0,notificationCount:3,onNotificationClick:()=>{},onSidebarToggle:()=>t(s=>!s)}),e.jsxs("div",{style:{display:"flex",height:"calc(100% - 72px)"},children:[e.jsx(D,{brand:{name:"Sellsuki"},groups:z,activeItem:j,onNavigate:s=>T(s.id),collapsed:y,onCollapsedChange:t,showCollapseToggle:!1}),e.jsx("main",{style:{flex:1,padding:24,background:"var(--background)",fontFamily:"var(--font-body)"},children:e.jsxs("p",{style:{color:"var(--muted-foreground)",fontSize:14},children:["Click the ",e.jsx("strong",{children:"☰ burger"})," in the navbar to collapse/expand the sidebar."]})})]})]})}};var l,d,c;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    brand: {
      name: "Sellsuki"
    },
    breadcrumbs: [{
      label: "Home",
      href: "/"
    }, {
      label: "Products"
    }],
    user: {
      name: "John Doe"
    },
    showSearch: true,
    onNotificationClick: () => {},
    notificationCount: 3
  }
}`,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var b,m,p;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    brand: {
      name: "App"
    },
    user: {
      name: "Admin"
    }
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,g,h;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    brand: {
      name: "Sellsuki"
    },
    breadcrumbs: [{
      label: "Dashboard"
    }, {
      label: "Orders"
    }],
    user: {
      name: "Watcharapong C."
    },
    showSearch: true,
    notificationCount: 5,
    onNotificationClick: () => {},
    onSidebarToggle: () => alert("Sidebar toggled")
  }
}`,...(h=(g=o.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var S,f,C,v,x;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("dashboard");
    const groups = [{
      label: "Main",
      items: [{
        id: "dashboard",
        label: "Dashboard",
        icon: <Home size={16} />
      }, {
        id: "orders",
        label: "Orders",
        icon: <ShoppingCart size={16} />,
        badge: "12"
      }, {
        id: "products",
        label: "Products",
        icon: <Package size={16} />
      }, {
        id: "customers",
        label: "Customers",
        icon: <Users size={16} />
      }, {
        id: "settings",
        label: "Settings",
        icon: <Settings size={16} />
      }]
    }];
    return <div style={{
      border: "1px solid var(--border)",
      borderRadius: 8,
      overflow: "hidden",
      height: 480
    }}>\r
        <TopNavbar brand={{
        name: "Sellsuki"
      }} breadcrumbs={[{
        label: "Dashboard"
      }]} user={{
        name: "John Doe"
      }} showSearch notificationCount={3} onNotificationClick={() => {}} onSidebarToggle={() => setCollapsed(c => !c)} />\r
        <div style={{
        display: "flex",
        height: "calc(100% - 72px)"
      }}>\r
          <Sidebar brand={{
          name: "Sellsuki"
        }} groups={groups} activeItem={active} onNavigate={item => setActive(item.id)} collapsed={collapsed} onCollapsedChange={setCollapsed} showCollapseToggle={false} />\r
          <main style={{
          flex: 1,
          padding: 24,
          background: "var(--background)",
          fontFamily: "var(--font-body)"
        }}>\r
            <p style={{
            color: "var(--muted-foreground)",
            fontSize: 14
          }}>\r
              Click the <strong>☰ burger</strong> in the navbar to collapse/expand the sidebar.\r
            </p>\r
          </main>\r
        </div>\r
      </div>;
  }
}`,...(C=(f=n.parameters)==null?void 0:f.docs)==null?void 0:C.source},description:{story:"Full interactive layout — TopNavbar burger controls Sidebar collapse",...(x=(v=n.parameters)==null?void 0:v.docs)==null?void 0:x.description}}};const X=["Default","Minimal","WithSidebarToggle","WithCollapsibleSidebar"];export{a as Default,r as Minimal,n as WithCollapsibleSidebar,o as WithSidebarToggle,X as __namedExportsOrder,V as default};
