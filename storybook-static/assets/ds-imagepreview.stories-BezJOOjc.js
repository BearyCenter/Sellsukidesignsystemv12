import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-ZH-6pyQh.js";import{c as f}from"./createLucideIcon-DG6FjBK_.js";import{X as O}from"./x-DzaArQBv.js";import{C as R}from"./chevron-left-B2K3R-Yt.js";import{C as L}from"./chevron-right-BjfhjwKz.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]],E=f("rotate-cw",q);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],T=f("zoom-in",F);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],W=f("zoom-out",D),A={fontFamily:"var(--font-label)",fontSize:"var(--text-label)",fontWeight:"var(--weight-label)"},V={fontFamily:"var(--font-button)",fontSize:"var(--text-button)",fontWeight:"var(--weight-button)"};function z({images:t,initialIndex:C=0}){const[x,p]=l.useState(!1),[n,i]=l.useState(C),[h,o]=l.useState(1),[P,s]=l.useState(0),c=t[n],S=()=>{i(r=>(r-1+t.length)%t.length),o(1),s(0)},_=()=>{i(r=>(r+1)%t.length),o(1),s(0)},M=()=>o(r=>Math.min(r+.25,3)),$=()=>o(r=>Math.max(r-.25,.5)),Z=()=>s(r=>(r+90)%360);return e.jsxs("div",{children:[e.jsx("div",{className:"flex flex-wrap gap-2",children:t.map((r,a)=>e.jsx("button",{onClick:()=>{i(a),p(!0),o(1),s(0)},className:`rounded-[var(--radius-md)] overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80
              ${n===a&&x?"border-primary":"border-border"}`,children:e.jsx("div",{className:"w-20 h-20 bg-muted flex items-center justify-center overflow-hidden",children:e.jsx("img",{src:r.thumbnail||r.src,alt:r.alt,className:"w-full h-full object-cover",loading:"lazy"})})},a))}),x&&e.jsxs("div",{role:"dialog","aria-modal":"true","aria-label":`Image preview: ${c.alt}`,className:"fixed inset-0 z-[60] bg-foreground/80 flex flex-col",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-3 bg-foreground/20",children:[e.jsxs("span",{className:"text-primary-foreground",style:A,children:[c.alt," (",n+1,"/",t.length,")"]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("button",{onClick:$,"aria-label":"Zoom out",className:"w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer",children:e.jsx(W,{size:16})}),e.jsxs("span",{className:"text-primary-foreground/70 px-2",style:V,"aria-live":"polite","aria-label":`Zoom level ${Math.round(h*100)}%`,children:[Math.round(h*100),"%"]}),e.jsx("button",{onClick:M,"aria-label":"Zoom in",className:"w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer",children:e.jsx(T,{size:16})}),e.jsx("button",{onClick:Z,"aria-label":"Rotate clockwise",className:"w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer",children:e.jsx(E,{size:16})}),e.jsx("div",{className:"w-px h-5 bg-primary-foreground/20 mx-1"}),e.jsx("button",{onClick:()=>{p(!1),o(1),s(0)},"aria-label":"Close preview",className:"w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer",children:e.jsx(O,{size:16})})]})]}),e.jsxs("div",{className:"flex-1 flex items-center justify-center relative overflow-hidden",onClick:r=>{r.target===r.currentTarget&&(p(!1),o(1),s(0))},children:[t.length>1&&e.jsx("button",{onClick:S,"aria-label":"Previous image",className:"absolute left-4 w-10 h-10 rounded-full bg-foreground/30 text-primary-foreground flex items-center justify-center hover:bg-foreground/50 cursor-pointer z-10",children:e.jsx(R,{size:20})}),e.jsx("img",{src:c.src,alt:c.alt,className:"max-w-[90%] max-h-[80vh] object-contain transition-transform",style:{transform:`scale(${h}) rotate(${P}deg)`}}),t.length>1&&e.jsx("button",{onClick:_,"aria-label":"Next image",className:"absolute right-4 w-10 h-10 rounded-full bg-foreground/30 text-primary-foreground flex items-center justify-center hover:bg-foreground/50 cursor-pointer z-10",children:e.jsx(L,{size:20})})]}),t.length>1&&e.jsx("div",{className:"flex items-center justify-center gap-2 py-3 bg-foreground/20",children:t.map((r,a)=>e.jsx("button",{onClick:()=>{i(a),o(1),s(0)},className:`w-12 h-12 rounded-[var(--radius-sm)] overflow-hidden border-2 cursor-pointer transition-all
                    ${a===n?"border-primary-foreground":"border-transparent opacity-50 hover:opacity-80"}`,children:e.jsx("img",{src:r.thumbnail||r.src,alt:r.alt,className:"w-full h-full object-cover"})},a))})]})]})}z.__docgenInfo={description:"",methods:[],displayName:"ImagePreview",props:{images:{required:!0,tsType:{name:"Array",elements:[{name:"ImagePreviewItem"}],raw:"ImagePreviewItem[]"},description:""},initialIndex:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};const Y={title:"Components/ImagePreview",component:z,tags:["autodocs"]},X=[{src:"https://picsum.photos/seed/a/800/600",alt:"Mountain landscape"},{src:"https://picsum.photos/seed/b/800/600",alt:"Ocean sunset"},{src:"https://picsum.photos/seed/c/800/600",alt:"Forest path"}],d={args:{images:X}},m={args:{images:[{src:"https://picsum.photos/seed/d/800/600",alt:"Single photo"}]}},u={args:{images:[{src:"https://picsum.photos/seed/1/800/600",alt:"Photo 1"},{src:"https://picsum.photos/seed/2/800/600",alt:"Photo 2"},{src:"https://picsum.photos/seed/3/800/600",alt:"Photo 3"},{src:"https://picsum.photos/seed/4/800/600",alt:"Photo 4"},{src:"https://picsum.photos/seed/5/800/600",alt:"Photo 5"}]}};var g,y,v;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    images: sampleImages
  }
}`,...(v=(y=d.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var b,j,w;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    images: [{
      src: "https://picsum.photos/seed/d/800/600",
      alt: "Single photo"
    }]
  }
}`,...(w=(j=m.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var N,k,I;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    images: [{
      src: "https://picsum.photos/seed/1/800/600",
      alt: "Photo 1"
    }, {
      src: "https://picsum.photos/seed/2/800/600",
      alt: "Photo 2"
    }, {
      src: "https://picsum.photos/seed/3/800/600",
      alt: "Photo 3"
    }, {
      src: "https://picsum.photos/seed/4/800/600",
      alt: "Photo 4"
    }, {
      src: "https://picsum.photos/seed/5/800/600",
      alt: "Photo 5"
    }]
  }
}`,...(I=(k=u.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};const ee=["Default","SingleImage","ManyImages"];export{d as Default,u as ManyImages,m as SingleImage,ee as __namedExportsOrder,Y as default};
