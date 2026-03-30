import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-ZH-6pyQh.js";import{X as D}from"./x-DzaArQBv.js";import"./_commonjsHelpers-CqkleIqs.js";import"./createLucideIcon-DG6FjBK_.js";const q={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},N={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"},F={default:"bg-card border-border",outline:"bg-transparent border-border",filled:"bg-muted/30 border-transparent"};function r({tags:t,onChange:n,placeholder:c,disabled:l,maxTags:o,variant:p="default",className:j=""}){const[g,m]=s.useState(""),I=()=>{const e=g.trim();!e||t.includes(e)||o&&t.length>=o||(n([...t,e]),m(""))},w=e=>{n(t.filter(A=>A!==e))};return a.jsxs("div",{className:`flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-[var(--radius)] border ${F[p]} transition-colors focus-within:border-primary ${l?"opacity-50 pointer-events-none":""} ${j}`,children:[t.map(e=>a.jsxs("span",{className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-sm)] bg-primary/10 text-primary",style:N,children:[e,a.jsx("button",{className:"hover:text-destructive cursor-pointer",onClick:()=>w(e),children:a.jsx(D,{size:12})})]},e)),a.jsx("input",{value:g,onChange:e=>m(e.target.value),onKeyDown:e=>{e.key==="Enter"&&(e.preventDefault(),I()),e.key==="Backspace"&&!g&&t.length&&n(t.slice(0,-1))},placeholder:t.length?"":c,className:"flex-1 min-w-[80px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground",style:q,disabled:l})]})}r.displayName="TagInput";r.__docgenInfo={description:"",methods:[],displayName:"TagInput",props:{tags:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of tag values"},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(tags: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"tags"}],return:{name:"void"}}},description:"Callback when tags change"},placeholder:{required:!1,tsType:{name:"string"},description:"Input placeholder text"},disabled:{required:!1,tsType:{name:"boolean"},description:"Disable input"},maxTags:{required:!1,tsType:{name:"number"},description:"Maximum number of tags"},variant:{required:!1,tsType:{name:"union",raw:'"default" | "outline" | "filled"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"outline"'},{name:"literal",value:'"filled"'}]},description:"Visual variant",defaultValue:{value:'"default"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional class name",defaultValue:{value:'""',computed:!1}}}};const B={title:"Components/TagInput",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","outline","filled"]},disabled:{control:"boolean"}}},i={render:()=>{const[t,n]=s.useState(["React","TypeScript"]);return a.jsx(r,{tags:t,onChange:n,placeholder:"Add a tag..."})}},u={render:()=>{const[t,n]=s.useState(["Tag 1","Tag 2"]);return a.jsx(r,{tags:t,onChange:n,maxTags:5,placeholder:"Max 5 tags..."})}},d={render:()=>{const[t,n]=s.useState(["Default"]),[c,l]=s.useState(["Outline"]),[o,p]=s.useState(["Filled"]);return a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:400},children:[a.jsx(r,{tags:t,onChange:n,variant:"default",placeholder:"Default variant"}),a.jsx(r,{tags:c,onChange:l,variant:"outline",placeholder:"Outline variant"}),a.jsx(r,{tags:o,onChange:p,variant:"filled",placeholder:"Filled variant"})]})}};var f,h,v;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    const [tags, setTags] = useState(["React", "TypeScript"]);
    return <TagInput tags={tags} onChange={setTags} placeholder="Add a tag..." />;
  }
}`,...(v=(h=i.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var x,y,T;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    const [tags, setTags] = useState(["Tag 1", "Tag 2"]);
    return <TagInput tags={tags} onChange={setTags} maxTags={5} placeholder="Max 5 tags..." />;
  }
}`,...(T=(y=u.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var b,S,C;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState(["Default"]);
    const [b, setB] = useState(["Outline"]);
    const [c, setC] = useState(["Filled"]);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      maxWidth: 400
    }}>\r
        <TagInput tags={a} onChange={setA} variant="default" placeholder="Default variant" />\r
        <TagInput tags={b} onChange={setB} variant="outline" placeholder="Outline variant" />\r
        <TagInput tags={c} onChange={setC} variant="filled" placeholder="Filled variant" />\r
      </div>;
  }
}`,...(C=(S=d.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};const E=["Default","WithMaxTags","AllVariants"];export{d as AllVariants,i as Default,u as WithMaxTags,E as __namedExportsOrder,B as default};
