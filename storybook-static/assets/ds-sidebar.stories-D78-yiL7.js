import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./index-ZH-6pyQh.js";import{S as s,T as D,P as I}from"./ds-topnavbar-D5YafcLS.js";import{H as A}from"./house-CGCrBEi_.js";import{S as M,U as F}from"./users-yGUaxJhm.js";import{c as H}from"./createLucideIcon-DG6FjBK_.js";import{S as R}from"./settings-BXaJJ-8e.js";import"./_commonjsHelpers-CqkleIqs.js";import"./ds-tooltip-0N8kTnAg.js";import"./index-BP-xEy0R.js";import"./index-DVyBTwwr.js";import"./chevron-up-CDiEuP6f.js";import"./check-YojSnU74.js";import"./chevron-right-BjfhjwKz.js";import"./search-C31aNDpM.js";import"./bell-DyFwNdCs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],E=H("chart-column",_),ee={title:"Components/Sidebar",component:s,tags:["autodocs"],argTypes:{collapsed:{control:"boolean"},showCollapseToggle:{control:"boolean"}}},d=[{label:"Main",items:[{id:"home",label:"Dashboard",icon:e.jsx(A,{size:16})},{id:"products",label:"Products",icon:e.jsx(I,{size:16}),badge:"12"},{id:"orders",label:"Orders",icon:e.jsx(M,{size:16}),badge:"3"},{id:"analytics",label:"Analytics",icon:e.jsx(E,{size:16})}]},{label:"Management",items:[{id:"customers",label:"Customers",icon:e.jsx(F,{size:16})},{id:"settings",label:"Settings",icon:e.jsx(R,{size:16})}]}],n={render:()=>e.jsx("div",{style:{height:500},children:e.jsx(s,{brand:{name:"Sellsuki"},groups:d,activeItem:"home",onNavigate:()=>{}})})},l={render:()=>e.jsx("div",{style:{height:500},children:e.jsx(s,{brand:{name:"Sellsuki"},groups:d,activeItem:"home",collapsed:!0})})},a={render:()=>{const[c,t]=i.useState(!1),[p,m]=i.useState("home");return e.jsx("div",{style:{height:500},children:e.jsx(s,{brand:{name:"Sellsuki"},groups:d,activeItem:p,onNavigate:o=>m(o.id),collapsed:c,onCollapsedChange:t,showCollapseToggle:!0})})}},r={render:()=>{const[c,t]=i.useState(!1),[p,m]=i.useState("home");return e.jsxs("div",{style:{border:"1px solid var(--border)",borderRadius:8,overflow:"hidden",height:480},children:[e.jsx(D,{brand:{name:"Sellsuki"},breadcrumbs:[{label:"Dashboard"}],user:{name:"John Doe"},onSidebarToggle:()=>t(o=>!o)}),e.jsxs("div",{style:{display:"flex",height:"calc(100% - 72px)"},children:[e.jsx(s,{brand:{name:"Sellsuki"},groups:d,activeItem:p,onNavigate:o=>m(o.id),collapsed:c,onCollapsedChange:t,showCollapseToggle:!1}),e.jsx("main",{style:{flex:1,padding:24,background:"var(--background)",fontFamily:"var(--font-body)",fontSize:14,color:"var(--muted-foreground)"},children:"Burger ☰ in navbar toggles sidebar. Hover icons when collapsed to see DS Tooltip."})]})]})}};var g,u,b;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    height: 500
  }}>\r
      <Sidebar brand={{
      name: "Sellsuki"
    }} groups={groups} activeItem="home" onNavigate={() => {}} />\r
    </div>
}`,...(b=(u=n.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var h,v,S;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    height: 500
  }}>\r
      <Sidebar brand={{
      name: "Sellsuki"
    }} groups={groups} activeItem="home" collapsed />\r
    </div>
}`,...(S=(v=l.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var f,C,x,y,k;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("home");
    return <div style={{
      height: 500
    }}>\r
        <Sidebar brand={{
        name: "Sellsuki"
      }} groups={groups} activeItem={active} onNavigate={item => setActive(item.id)} collapsed={collapsed} onCollapsedChange={setCollapsed} showCollapseToggle />\r
      </div>;
  }
}`,...(x=(C=a.parameters)==null?void 0:C.docs)==null?void 0:x.source},description:{story:"Self-contained: collapse toggle in sidebar footer",...(k=(y=a.parameters)==null?void 0:y.docs)==null?void 0:k.description}}};var j,T,N,w,z;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("home");
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
      }} onSidebarToggle={() => setCollapsed(c => !c)} />\r
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
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "var(--muted-foreground)"
        }}>\r
            Burger ☰ in navbar toggles sidebar. Hover icons when collapsed to see DS Tooltip.\r
          </main>\r
        </div>\r
      </div>;
  }
}`,...(N=(T=r.parameters)==null?void 0:T.docs)==null?void 0:N.source},description:{story:"Recommended pattern: TopNavbar burger controls Sidebar — hide sidebar footer toggle",...(z=(w=r.parameters)==null?void 0:w.docs)==null?void 0:z.description}}};const oe=["Default","Collapsed","Collapsible","ControlledFromNavbar"];export{l as Collapsed,a as Collapsible,r as ControlledFromNavbar,n as Default,oe as __namedExportsOrder,ee as default};
