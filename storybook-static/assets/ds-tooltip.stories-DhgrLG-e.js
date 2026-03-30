import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{T as o}from"./ds-tooltip-0N8kTnAg.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-BP-xEy0R.js";import"./index-DVyBTwwr.js";const x={title:"Components/Tooltip",component:o,tags:["autodocs"],argTypes:{placement:{control:"select",options:["top","bottom","left","right"]}}},n={render:()=>t.jsx("div",{style:{padding:60,display:"flex",justifyContent:"center"},children:t.jsx(o,{content:"This is a tooltip",children:t.jsx("button",{children:"Hover me"})})})},e={render:()=>t.jsxs("div",{style:{padding:80,display:"flex",gap:32,justifyContent:"center"},children:[t.jsx(o,{content:"Top tooltip",placement:"top",children:t.jsx("button",{children:"Top"})}),t.jsx(o,{content:"Bottom tooltip",placement:"bottom",children:t.jsx("button",{children:"Bottom"})}),t.jsx(o,{content:"Left tooltip",placement:"left",children:t.jsx("button",{children:"Left"})}),t.jsx(o,{content:"Right tooltip",placement:"right",children:t.jsx("button",{children:"Right"})})]})};var r,i,l;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 60,
    display: "flex",
    justifyContent: "center"
  }}>\r
      <Tooltip content="This is a tooltip">\r
        <button>Hover me</button>\r
      </Tooltip>\r
    </div>
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var p,s,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 80,
    display: "flex",
    gap: 32,
    justifyContent: "center"
  }}>\r
      <Tooltip content="Top tooltip" placement="top">\r
        <button>Top</button>\r
      </Tooltip>\r
      <Tooltip content="Bottom tooltip" placement="bottom">\r
        <button>Bottom</button>\r
      </Tooltip>\r
      <Tooltip content="Left tooltip" placement="left">\r
        <button>Left</button>\r
      </Tooltip>\r
      <Tooltip content="Right tooltip" placement="right">\r
        <button>Right</button>\r
      </Tooltip>\r
    </div>
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const T=["Default","AllPlacements"];export{e as AllPlacements,n as Default,T as __namedExportsOrder,x as default};
