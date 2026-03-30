import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as g}from"./createLucideIcon-DG6FjBK_.js";import{M as C}from"./minus-BlcBJDUM.js";import{U as O,S as A}from"./users-yGUaxJhm.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"m7 7 10 10",key:"1fmybs"}],["path",{d:"M17 7v10H7",key:"6fjiku"}]],$=g("arrow-down-right",E);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],W=g("arrow-up-right",U);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],B=g("dollar-sign",H),h={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},_={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},k={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},F={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-button)"},V={sm:{fontFamily:"var(--font-h4)",fontSize:"var(--text-h4)",fontWeight:"var(--weight-h4)"},md:{fontFamily:"var(--font-h2)",fontSize:"var(--text-h2)",fontWeight:"var(--weight-h2)"},lg:{fontFamily:"var(--font-h1)",fontSize:"var(--text-h1)",fontWeight:"var(--weight-h1)"}};function s({title:p,value:n,prefix:r,suffix:t,trend:a,trendLabel:i,icon:l,size:v="md",loading:f}){const M=V[v],D=(a==null?void 0:a.direction)==="up"?"text-chart-2":(a==null?void 0:a.direction)==="down"?"text-destructive":"text-muted-foreground",I=(a==null?void 0:a.direction)==="up"?W:(a==null?void 0:a.direction)==="down"?$:C;return f?e.jsxs("div",{className:"space-y-2 animate-pulse",children:[e.jsx("div",{className:"h-3 w-20 bg-muted rounded-[var(--radius-sm)]"}),e.jsx("div",{className:"h-8 w-32 bg-muted rounded-[var(--radius-sm)]"}),e.jsx("div",{className:"h-3 w-24 bg-muted rounded-[var(--radius-sm)]"})]}):e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[l&&e.jsx("span",{className:"text-muted-foreground",children:l}),e.jsx("span",{className:"text-muted-foreground",style:h,children:p})]}),e.jsxs("div",{className:"flex items-baseline gap-1",children:[r&&e.jsx("span",{className:"text-muted-foreground",style:_,children:r}),e.jsx("span",{className:"text-foreground",style:M,children:typeof n=="number"?n.toLocaleString():n}),t&&e.jsx("span",{className:"text-muted-foreground",style:h,children:t})]}),a&&e.jsxs("div",{className:`flex items-center gap-1 ${D}`,children:[e.jsx(I,{size:14}),e.jsxs("span",{style:F,children:[a.value,"%"]}),i&&e.jsx("span",{className:"text-muted-foreground",style:k,children:i})]})]})}function u({title:p,value:n,prefix:r,trend:t,trendLabel:a,icon:i,iconBg:l}){const v=(t==null?void 0:t.direction)==="up"?"text-chart-2":(t==null?void 0:t.direction)==="down"?"text-destructive":"text-muted-foreground",f=(t==null?void 0:t.direction)==="up"?W:(t==null?void 0:t.direction)==="down"?$:C;return e.jsx("div",{className:"rounded-[var(--radius-lg)] border border-border bg-card p-5 overflow-hidden",children:e.jsxs("div",{className:"flex items-start justify-between gap-3",children:[e.jsxs("div",{className:"space-y-1 min-w-0 flex-1",children:[e.jsx("span",{className:"text-muted-foreground",style:h,children:p}),e.jsxs("div",{className:"flex items-baseline gap-1",children:[r&&e.jsx("span",{className:"text-muted-foreground",style:_,children:r}),e.jsx("span",{className:"text-foreground",style:{fontFamily:"var(--font-h3)",fontSize:"var(--text-h3)",fontWeight:"var(--weight-h3)"},children:typeof n=="number"?n.toLocaleString():n})]}),t&&e.jsxs("div",{className:`flex items-center gap-1 ${v}`,children:[e.jsx(f,{size:12}),e.jsxs("span",{style:F,children:[t.value,"%"]}),a&&e.jsx("span",{className:"text-muted-foreground",style:k,children:a})]})]}),i&&e.jsx("div",{className:`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0 ${l||"bg-primary/10 text-primary"}`,children:i})]})})}s.__docgenInfo={description:"",methods:[],displayName:"Statistic",props:{title:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},prefix:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},suffix:{required:!1,tsType:{name:"string"},description:""},trend:{required:!1,tsType:{name:"StatisticTrend"},description:""},trendLabel:{required:!1,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"StatCard",props:{title:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},prefix:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},trend:{required:!1,tsType:{name:"StatisticTrend"},description:""},trendLabel:{required:!1,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},iconBg:{required:!1,tsType:{name:"string"},description:""}}};const Y={title:"Components/Statistic",component:s,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]},loading:{control:"boolean"}}},o={args:{title:"Total Revenue",value:45231,prefix:"$",trend:{value:12.5,direction:"up"},trendLabel:"vs last month"}},d={render:()=>e.jsxs("div",{style:{display:"flex",gap:32},children:[e.jsx(s,{title:"Small",value:1234,size:"sm"}),e.jsx(s,{title:"Medium",value:5678,size:"md"}),e.jsx(s,{title:"Large",value:9012,size:"lg"})]})},c={render:()=>e.jsxs("div",{style:{display:"flex",gap:32},children:[e.jsx(s,{title:"Revenue",value:"$12,345",trend:{value:8.2,direction:"up"},trendLabel:"vs last month"}),e.jsx(s,{title:"Refunds",value:"$432",trend:{value:3.1,direction:"down"},trendLabel:"vs last month"}),e.jsx(s,{title:"Orders",value:156,trend:{value:0,direction:"neutral"},trendLabel:"no change"})]})},m={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:16,maxWidth:800},children:[e.jsx(u,{title:"Revenue",value:"$45,231",icon:e.jsx(B,{size:20}),trend:{value:12.5,direction:"up"},trendLabel:"vs last month"}),e.jsx(u,{title:"Customers",value:2350,icon:e.jsx(O,{size:20}),trend:{value:5.2,direction:"up"},trendLabel:"vs last month"}),e.jsx(u,{title:"Orders",value:1280,icon:e.jsx(A,{size:20}),trend:{value:1.8,direction:"down"},trendLabel:"vs last month"})]})};var x,y,b;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    title: "Total Revenue",
    value: 45231,
    prefix: "$",
    trend: {
      value: 12.5,
      direction: "up"
    },
    trendLabel: "vs last month"
  }
}`,...(b=(y=o.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var j,S,N;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 32
  }}>\r
      <Statistic title="Small" value={1234} size="sm" />\r
      <Statistic title="Medium" value={5678} size="md" />\r
      <Statistic title="Large" value={9012} size="lg" />\r
    </div>
}`,...(N=(S=d.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};var w,z,R;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 32
  }}>\r
      <Statistic title="Revenue" value="$12,345" trend={{
      value: 8.2,
      direction: "up"
    }} trendLabel="vs last month" />\r
      <Statistic title="Refunds" value="$432" trend={{
      value: 3.1,
      direction: "down"
    }} trendLabel="vs last month" />\r
      <Statistic title="Orders" value={156} trend={{
      value: 0,
      direction: "neutral"
    }} trendLabel="no change" />\r
    </div>
}`,...(R=(z=c.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};var T,L,q;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    maxWidth: 800
  }}>\r
      <StatCard title="Revenue" value="$45,231" icon={<DollarSign size={20} />} trend={{
      value: 12.5,
      direction: "up"
    }} trendLabel="vs last month" />\r
      <StatCard title="Customers" value={2350} icon={<Users size={20} />} trend={{
      value: 5.2,
      direction: "up"
    }} trendLabel="vs last month" />\r
      <StatCard title="Orders" value={1280} icon={<ShoppingCart size={20} />} trend={{
      value: 1.8,
      direction: "down"
    }} trendLabel="vs last month" />\r
    </div>
}`,...(q=(L=m.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};const Z=["Default","AllSizes","WithTrends","StatCardExample"];export{d as AllSizes,o as Default,m as StatCardExample,c as WithTrends,Z as __namedExportsOrder,Y as default};
