;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="82508fca-9dde-de95-b598-66111cd35d06")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,374251,e=>{"use strict";var r=e.i(389959),t=e.i(503867);function o(e){let[o,n]=r.useState(void 0);return(0,t.useLayoutEffect)(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});let r=new ResizeObserver(r=>{let t,o;if(!Array.isArray(r)||!r.length)return;let a=r[0];if("borderBoxSize"in a){let e=a.borderBoxSize,r=Array.isArray(e)?e[0]:e;t=r.inlineSize,o=r.blockSize}else t=e.offsetWidth,o=e.offsetHeight;n({width:t,height:o})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}n(void 0)},[e]),o}e.s(["useSize",()=>o])},608051,e=>{"use strict";var r=e.i(389959),t=e.i(546595),o=e.i(478902),n=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),a=r.forwardRef((e,r)=>(0,o.jsx)(t.Primitive.span,{...e,ref:r,style:{...n,...e.style}}));a.displayName="VisuallyHidden",e.s(["Root",()=>a,"VISUALLY_HIDDEN_STYLES",()=>n,"VisuallyHidden",()=>a])},613580,748596,e=>{"use strict";var r=e.i(478902),t=e.i(389959),o=e.i(174617),n=e.i(678001),a=e.i(274664),i=e.i(735343),l=e.i(904641),s=e.i(940051),d=e.i(839518),c=e.i(889251),u=e.i(546595),p=e.i(153545),b=e.i(826524),f=e.i(608051),[g,x]=(0,a.createContextScope)("Tooltip",[s.createPopperScope]),m=(0,s.createPopperScope)(),h="TooltipProvider",v="tooltip.open",[w,y]=g(h),_=e=>{let{__scopeTooltip:o,delayDuration:n=700,skipDelayDuration:a=300,disableHoverableContent:i=!1,children:l}=e,s=t.useRef(!0),d=t.useRef(!1),c=t.useRef(0);return t.useEffect(()=>{let e=c.current;return()=>window.clearTimeout(e)},[]),(0,r.jsx)(w,{scope:o,isOpenDelayedRef:s,delayDuration:n,onOpen:t.useCallback(()=>{window.clearTimeout(c.current),s.current=!1},[]),onClose:t.useCallback(()=>{window.clearTimeout(c.current),c.current=window.setTimeout(()=>s.current=!0,a)},[a]),isPointerInTransitRef:d,onPointerInTransitChange:t.useCallback(e=>{d.current=e},[]),disableHoverableContent:i,children:l})};_.displayName=h;var C="Tooltip",[z,T]=g(C),E=e=>{let{__scopeTooltip:o,children:n,open:a,defaultOpen:i,onOpenChange:d,disableHoverableContent:c,delayDuration:u}=e,p=y(C,e.__scopeTooltip),f=m(o),[g,x]=t.useState(null),h=(0,l.useId)(),w=t.useRef(0),_=c??p.disableHoverableContent,T=u??p.delayDuration,E=t.useRef(!1),[S,R]=(0,b.useControllableState)({prop:a,defaultProp:i??!1,onChange:e=>{e?(p.onOpen(),document.dispatchEvent(new CustomEvent(v))):p.onClose(),d?.(e)},caller:C}),k=t.useMemo(()=>S?E.current?"delayed-open":"instant-open":"closed",[S]),j=t.useCallback(()=>{window.clearTimeout(w.current),w.current=0,E.current=!1,R(!0)},[R]),P=t.useCallback(()=>{window.clearTimeout(w.current),w.current=0,R(!1)},[R]),L=t.useCallback(()=>{window.clearTimeout(w.current),w.current=window.setTimeout(()=>{E.current=!0,R(!0),w.current=0},T)},[T,R]);return t.useEffect(()=>()=>{w.current&&(window.clearTimeout(w.current),w.current=0)},[]),(0,r.jsx)(s.Root,{...f,children:(0,r.jsx)(z,{scope:o,contentId:h,open:S,stateAttribute:k,trigger:g,onTriggerChange:x,onTriggerEnter:t.useCallback(()=>{p.isOpenDelayedRef.current?L():j()},[p.isOpenDelayedRef,L,j]),onTriggerLeave:t.useCallback(()=>{_?P():(window.clearTimeout(w.current),w.current=0)},[P,_]),onOpen:j,onClose:P,disableHoverableContent:_,children:n})})};E.displayName=C;var S="TooltipTrigger",R=t.forwardRef((e,a)=>{let{__scopeTooltip:i,...l}=e,d=T(S,i),c=y(S,i),p=m(i),b=t.useRef(null),f=(0,n.useComposedRefs)(a,b,d.onTriggerChange),g=t.useRef(!1),x=t.useRef(!1),h=t.useCallback(()=>g.current=!1,[]);return t.useEffect(()=>()=>document.removeEventListener("pointerup",h),[h]),(0,r.jsx)(s.Anchor,{asChild:!0,...p,children:(0,r.jsx)(u.Primitive.button,{"aria-describedby":d.open?d.contentId:void 0,"data-state":d.stateAttribute,...l,ref:f,onPointerMove:(0,o.composeEventHandlers)(e.onPointerMove,e=>{"touch"!==e.pointerType&&(x.current||c.isPointerInTransitRef.current||(d.onTriggerEnter(),x.current=!0))}),onPointerLeave:(0,o.composeEventHandlers)(e.onPointerLeave,()=>{d.onTriggerLeave(),x.current=!1}),onPointerDown:(0,o.composeEventHandlers)(e.onPointerDown,()=>{d.open&&d.onClose(),g.current=!0,document.addEventListener("pointerup",h,{once:!0})}),onFocus:(0,o.composeEventHandlers)(e.onFocus,()=>{g.current||d.onOpen()}),onBlur:(0,o.composeEventHandlers)(e.onBlur,d.onClose),onClick:(0,o.composeEventHandlers)(e.onClick,d.onClose)})})});R.displayName=S;var k="TooltipPortal",[j,P]=g(k,{forceMount:void 0}),L=e=>{let{__scopeTooltip:t,forceMount:o,children:n,container:a}=e,i=T(k,t);return(0,r.jsx)(j,{scope:t,forceMount:o,children:(0,r.jsx)(c.Presence,{present:o||i.open,children:(0,r.jsx)(d.Portal,{asChild:!0,container:a,children:n})})})};L.displayName=k;var N="TooltipContent",D=t.forwardRef((e,t)=>{let o=P(N,e.__scopeTooltip),{forceMount:n=o.forceMount,side:a="top",...i}=e,l=T(N,e.__scopeTooltip);return(0,r.jsx)(c.Presence,{present:n||l.open,children:l.disableHoverableContent?(0,r.jsx)(I,{side:a,...i,ref:t}):(0,r.jsx)(A,{side:a,...i,ref:t})})}),A=t.forwardRef((e,o)=>{let a=T(N,e.__scopeTooltip),i=y(N,e.__scopeTooltip),l=t.useRef(null),s=(0,n.useComposedRefs)(o,l),[d,c]=t.useState(null),{trigger:u,onClose:p}=a,b=l.current,{onPointerInTransitChange:f}=i,g=t.useCallback(()=>{c(null),f(!1)},[f]),x=t.useCallback((e,r)=>{let t,o=e.currentTarget,n={x:e.clientX,y:e.clientY},a=function(e,r){let t=Math.abs(r.top-e.y),o=Math.abs(r.bottom-e.y),n=Math.abs(r.right-e.x),a=Math.abs(r.left-e.x);switch(Math.min(t,o,n,a)){case a:return"left";case n:return"right";case t:return"top";case o:return"bottom";default:throw Error("unreachable")}}(n,o.getBoundingClientRect());c(((t=[...function(e,r,t=5){let o=[];switch(r){case"top":o.push({x:e.x-t,y:e.y+t},{x:e.x+t,y:e.y+t});break;case"bottom":o.push({x:e.x-t,y:e.y-t},{x:e.x+t,y:e.y-t});break;case"left":o.push({x:e.x+t,y:e.y-t},{x:e.x+t,y:e.y+t});break;case"right":o.push({x:e.x-t,y:e.y-t},{x:e.x-t,y:e.y+t})}return o}(n,a),...function(e){let{top:r,right:t,bottom:o,left:n}=e;return[{x:n,y:r},{x:t,y:r},{x:t,y:o},{x:n,y:o}]}(r.getBoundingClientRect())].slice()).sort((e,r)=>e.x<r.x?-1:e.x>r.x?1:e.y<r.y?-1:1*!!(e.y>r.y)),function(e){if(e.length<=1)return e.slice();let r=[];for(let t=0;t<e.length;t++){let o=e[t];for(;r.length>=2;){let e=r[r.length-1],t=r[r.length-2];if((e.x-t.x)*(o.y-t.y)>=(e.y-t.y)*(o.x-t.x))r.pop();else break}r.push(o)}r.pop();let t=[];for(let r=e.length-1;r>=0;r--){let o=e[r];for(;t.length>=2;){let e=t[t.length-1],r=t[t.length-2];if((e.x-r.x)*(o.y-r.y)>=(e.y-r.y)*(o.x-r.x))t.pop();else break}t.push(o)}return(t.pop(),1===r.length&&1===t.length&&r[0].x===t[0].x&&r[0].y===t[0].y)?r:r.concat(t)}(t))),f(!0)},[f]);return t.useEffect(()=>()=>g(),[g]),t.useEffect(()=>{if(u&&b){let e=e=>x(e,b),r=e=>x(e,u);return u.addEventListener("pointerleave",e),b.addEventListener("pointerleave",r),()=>{u.removeEventListener("pointerleave",e),b.removeEventListener("pointerleave",r)}}},[u,b,x,g]),t.useEffect(()=>{if(d){let e=e=>{let r=e.target,t={x:e.clientX,y:e.clientY},o=u?.contains(r)||b?.contains(r),n=!function(e,r){let{x:t,y:o}=e,n=!1;for(let e=0,a=r.length-1;e<r.length;a=e++){let i=r[e],l=r[a],s=i.x,d=i.y,c=l.x,u=l.y;d>o!=u>o&&t<(c-s)*(o-d)/(u-d)+s&&(n=!n)}return n}(t,d);o?g():n&&(g(),p())};return document.addEventListener("pointermove",e),()=>document.removeEventListener("pointermove",e)}},[u,b,d,p,g]),(0,r.jsx)(I,{...e,ref:s})}),[H,O]=g(C,{isInside:!1}),$=(0,p.createSlottable)("TooltipContent"),I=t.forwardRef((e,o)=>{let{__scopeTooltip:n,children:a,"aria-label":l,onEscapeKeyDown:d,onPointerDownOutside:c,...u}=e,p=T(N,n),b=m(n),{onClose:g}=p;return t.useEffect(()=>(document.addEventListener(v,g),()=>document.removeEventListener(v,g)),[g]),t.useEffect(()=>{if(p.trigger){let e=e=>{let r=e.target;r?.contains(p.trigger)&&g()};return window.addEventListener("scroll",e,{capture:!0}),()=>window.removeEventListener("scroll",e,{capture:!0})}},[p.trigger,g]),(0,r.jsx)(i.DismissableLayer,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:d,onPointerDownOutside:c,onFocusOutside:e=>e.preventDefault(),onDismiss:g,children:(0,r.jsxs)(s.Content,{"data-state":p.stateAttribute,...b,...u,ref:o,style:{...u.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[(0,r.jsx)($,{children:a}),(0,r.jsx)(H,{scope:n,isInside:!0,children:(0,r.jsx)(f.Root,{id:p.contentId,role:"tooltip",children:l||a})})]})})});D.displayName=N;var M="TooltipArrow";t.forwardRef((e,t)=>{let{__scopeTooltip:o,...n}=e,a=m(o);return O(M,o).isInside?null:(0,r.jsx)(s.Arrow,{...a,...n,ref:t})}).displayName=M,e.s(["Content",()=>D,"Portal",()=>L,"Provider",()=>_,"Root",()=>E,"TooltipTrigger",()=>R,"Trigger",()=>R],748596);var W=e.i(843778);let B=e=>(0,r.jsx)(E,{...e}),Y=t.forwardRef(({className:e,...t},o)=>(0,r.jsx)(R,{ref:o,...t,className:(0,W.cn)(e)})),U=t.forwardRef(({className:e,sideOffset:t=4,...o},n)=>(0,r.jsx)(L,{children:(0,r.jsx)(D,{ref:n,sideOffset:t,...o,className:(0,W.cn)("z-50 overflow-hidden rounded-md border bg-alternative px-3 py-1.5 text-xs text-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",e)})}));U.displayName=D.displayName,e.s(["Tooltip",()=>B,"TooltipContent",()=>U,"TooltipPortal",()=>L,"TooltipProvider",()=>_,"TooltipTrigger",()=>Y],613580)},2664,e=>{"use strict";var r=e.i(389959);e.i(478902);var t=r.createContext(void 0);function o(e){let o=r.useContext(t);return e||o||"ltr"}e.s(["useDirection",()=>o])},305607,e=>{"use strict";function r(e,[r,t]){return Math.min(t,Math.max(r,e))}e.s(["clamp",()=>r])},370410,885441,e=>{"use strict";let r=(0,e.i(388019).default)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["default",()=>r],885441),e.s(["Check",()=>r],370410)},375761,e=>{"use strict";var r=e.i(964727),t=e.i(355901);let o=async(e,o=r.default)=>{if(window.document.hasFocus())if(!navigator.clipboard?.write)return Promise.resolve(e).then(e=>navigator.clipboard?.writeText(e)).then(o);else{let r=new ClipboardItem({"text/plain":Promise.resolve(e).then(e=>new Blob([e],{type:"text/plain"}))}),t=()=>{},n=()=>{},a=new Promise((e,r)=>{t=e,n=r});return setTimeout(()=>{navigator.clipboard.write([r]).then(o).then(t).catch(n)},0),a}t.toast.error("Unable to copy to clipboard")};e.s(["copyToClipboard",0,o])},816467,e=>{"use strict";let r=(0,e.i(388019).default)("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",()=>r],816467)},938933,305551,e=>{"use strict";var r=e.i(389959);let t={bg:{brand:{primary:"bg-purple-600",secondary:"bg-purple-200"}},text:{brand:"text-purple-600",body:"text-foreground-light",title:"text-foreground"},border:{brand:"border-brand-600",primary:"border-default",secondary:"border-secondary",alternative:"border-alternative"},placeholder:"placeholder-foreground-muted",focus:`
    outline-none
    focus:ring-current focus:ring-2
  `,"focus-visible":`
    outline-none
    transition-all
    outline-0
    focus-visible:outline-4
    focus-visible:outline-offset-1
  `,size:{text:{tiny:"text-xs",small:"text-sm leading-4",medium:"text-sm",large:"text-base",xlarge:"text-base"},padding:{tiny:"px-2.5 py-1",small:"px-3 py-2",medium:"px-4 py-2",large:"px-4 py-2",xlarge:"px-6 py-3"}},overlay:{base:"absolute inset-0 bg-background opacity-50",container:"fixed inset-0 transition-opacity"}},o={tiny:`${t.size.text.tiny} ${t.size.padding.tiny}`,small:`${t.size.text.small} ${t.size.padding.small}`,medium:`${t.size.text.medium} ${t.size.padding.medium}`,large:`${t.size.text.large} ${t.size.padding.large}`,xlarge:`${t.size.text.xlarge} ${t.size.padding.xlarge}`},n={tiny:"pl-7",small:"pl-8",medium:"pl-8",large:"pl-10",xlarge:"pl-11"},a={accordion:{variants:{default:{base:`
          flex flex-col
          space-y-3
        `,container:`
          group
          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
          overflow-hidden
          will-change-transform
        `,trigger:`
          flex flex-row
          gap-3
          items-center
          w-full
          text-left
          cursor-pointer

          outline-none
          focus-visible:ring-1
          focus-visible:z-10
          ring-foreground-light
        `,content:`
          data-open:animate-slide-down
          data-closed:animate-slide-up
        `,panel:`
          py-3
        `},bordered:{base:`
          flex flex-col
          -space-y-px
        `,container:`
          group
          border
          border-default

          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
        `,trigger:`
          flex flex-row
          items-center
          px-6 py-4
          w-full
          text-left
          cursor-pointer

          font-medium
          text-base
          bg-transparent

          outline-none
          focus-visible:ring-1
          focus-visible:z-10
          ring-foreground-light

          transition-colors
          hover:bg-background

          overflow-hidden

          group-first:rounded-tl-md group-first:rounded-tr-md
          group-last:rounded-bl-md group-last:rounded-br-md
        `,content:`
          data-open:animate-slide-down
          data-closed:animate-slide-up
        `,panel:`
          px-6 py-3
          border-t border-strong
          bg-background
        `}},justified:"justify-between",chevron:{base:`
        text-foreground-lighter
        rotate-0
        group-state-open:rotate-180
        group-data-[state=open]:rotate-180
        ease-&lsqb;cubic-bezier(0.87,_0,_0.13,_1)&rsqb;
        transition-transform duration-300
        duration-200
      `,align:{left:"order-first",right:"order-last"}},animate:{enter:"transition-max-height ease-in-out duration-700 overflow-hidden",enterFrom:"max-h-0",enterTo:"max-h-screen",leave:"transition-max-height ease-in-out duration-300 overflow-hidden",leaveFrom:"max-h-screen",leaveTo:"max-h-0"}},badge:{base:"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-normal bg-opacity-10",size:{large:"px-3 py-0.5 rounded-full text-sm"},dot:"-ml-0.5 mr-1.5 h-2 w-2 rounded-full",color:{brand:"bg-brand-500 text-brand-600 border border-brand-500",brandAlt:"bg-brand bg-opacity-100 text-background border border-brand",scale:"bg-background text-foreground-light border border-strong",tomato:"bg-tomato-200 text-tomato-1100 border border-tomato-700",red:"bg-red-200 text-red-1100 border border-red-700",crimson:"bg-crimson-200 text-crimson-1100 border border-crimson-700",pink:"bg-pink-200 text-pink-1100 border border-pink-700",purple:"bg-purple-200 text-purple-1100 border border-purple-700",violet:"bg-violet-200 text-violet-1100 border border-violet-700",indigo:"bg-indigo-200 text-indigo-1100 border border-indigo-700",blue:"bg-blue-200 text-blue-1100 border border-blue-700",green:"bg-opacity-10 bg-brand-500 text-brand-600 border border-brand-500",grass:"bg-grass-200 text-grass-1100 border border-grass-700",orange:"bg-orange-200 text-orange-1100 border border-orange-700",yellow:"bg-yellow-200 text-yellow-1100 border border-yellow-700",amber:"bg-amber-200 text-amber-1100 border border-amber-700",gold:"bg-gold-200 text-gold-1100 border border-gold-700",gray:"bg-200 text-gray-1100 border border-gray-700",slate:"bg-slate-200 text-slate-1100 border border-slate-700"}},alert:{base:`
      relative rounded-md border py-4 px-6
      flex space-x-4 items-start
    `,header:"block text-sm font-normal mb-1",description:"text-xs",variant:{danger:{base:"bg-red-200 text-red-1200 border-red-700",icon:"text-red-900",header:"text-red-1200",description:"text-red-1100"},warning:{base:"bg-amber-200 border-amber-700",icon:"text-amber-900",header:"text-amber-1200",description:"text-amber-1100"},info:{base:"bg-alternative border",icon:"text-foreground-lighter",header:"text-foreground",description:"text-foreground-light"},success:{base:"bg-brand-300 border-brand-400",icon:"text-brand",header:"text-brand-600",description:"text-brand-600"},neutral:{base:"bg-surface-100 border-default",icon:"text-foreground-muted",header:"text-foreground",description:"text-foreground-light"}},close:`
      absolute
      right-6 top-4
      p-0 m-0
      text-foreground-muted
      cursor-pointer transition ease-in-out
      bg-transparent border-transparent focus:outline-none
      opacity-50 hover:opacity-100`},card:{base:`
      bg-surface-100

      border
      ${t.border.primary}

      flex flex-col
      rounded-md shadow-lg overflow-hidden relative
    `,hoverable:"transition hover:-translate-y-1 hover:shadow-2xl",head:`px-8 py-6 flex justify-between
    border-b
      ${t.border.primary} `,content:"p-8"},tabs:{base:"w-full justify-between space-y-4",underlined:{list:`
        flex items-center border-b
        ${t.border.secondary}
        `,base:`
        relative
        cursor-pointer
        text-foreground-lighter
        flex
        items-center
        space-x-2
        text-center
        transition
        focus:outline-none
        focus-visible:ring
        focus-visible:ring-foreground-muted
        focus-visible:border-foreground-muted
      `,inactive:`
        hover:text-foreground
      `,active:`
        !text-foreground
        border-b-2 border-foreground
      `},pills:{list:"flex space-x-1",base:`
        relative
        cursor-pointer
        flex
        items-center
        space-x-2
        text-center
        transition
        shadow-sm
        rounded
        border
        focus:outline-none
        focus-visible:ring
        focus-visible:ring-foreground-muted
        focus-visible:border-foreground-muted
        `,inactive:`
        bg-background
        border-strong hover:border-foreground-muted
        text-foreground-muted hover:text-foreground
      `,active:`
        bg-selection
        text-foreground
        border-stronger
      `},"rounded-pills":{list:"flex flex-wrap gap-2",base:`
        relative
        cursor-pointer
        flex
        items-center
        space-x-2
        text-center
        transition
        shadow-sm
        rounded-full
        focus:outline-none
        focus-visible:ring
        focus-visible:ring-foreground-muted
        focus-visible:border-foreground-muted
        `,inactive:`
        bg-surface-200 hover:bg-surface-300
        hover:border-foreground-lighter
        text-foreground-lighter hover:text-foreground
      `,active:`
        bg-foreground
        text-background
        border-foreground
      `},block:"w-full flex items-center justify-center",size:{...o},scrollable:"overflow-auto whitespace-nowrap no-scrollbar mask-fadeout-right",wrappable:"flex-wrap",content:"focus:outline-none transition-height"},input:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${t.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${t.placeholder}
      group
    `,variants:{standard:`
        bg-foreground/[.026]
        border border-control
        `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},container:"relative",with_icon:n,size:{...o},disabled:"opacity-50",actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center",textarea_actions_container:"absolute inset-y-1.5 right-0 pl-3 pr-1 flex space-x-1 items-start",textarea_actions_container_items:"flex items-center"},select:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${t.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${t.placeholder}

      appearance-none
      bg-none
    `,variants:{standard:`
        bg-background
        border border-strong
        `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},container:"relative",with_icon:n,size:{...o},disabled:"opacity-50",actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 mr-5 flex items-center",chevron_container:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",chevron:"h-5 w-5 text-foreground-lighter"},inputNumber:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${t.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${t.placeholder}

      appearance-none
      bg-none
    `,variants:{standard:`
        bg-control
        border border-strong
      `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},disabled:"opacity-50",container:"relative",with_icon:n,size:{...o},actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center"},checkbox:{base:`
      bg-transparent
      ${t.focus}
      focus:ring-border-muted
      text-brand
      border-strong
      shadow-sm
      rounded
      cursor-pointer
    `,container:"flex cursor-pointer leading-none",size:{tiny:"h-3 w-3 mt-1 mr-3",small:"h-3.5 w-3.5 mt-0.5 mr-3.5",medium:"h-4 w-4 mt-0.5 mr-3.5",large:"h-5 w-5 mt-0.5 mr-4",xlarge:"h-5 w-5 mt-0.5 mr-4"},disabled:"opacity-50",label:{base:"text-foreground-light cursor-pointer",...t.size.text},label_before:{base:"text-border",...t.size.text},label_after:{base:"text-border",...t.size.text},description:{base:"text-foreground-lighter",...t.size.text},group:"space-y-3"},radio:{base:`
      absolute
      ${t.focus}
      focus:ring-brand-400
      border-strong

      text-brand
      shadow-sm
      cursor-pointer
      peer

      bg-surface-100
    `,hidden:"absolute opacity-0",size:{tiny:"h-3 w-3",small:"h-3.5 w-3.5",medium:"h-4 w-4",large:"h-5 w-5",xlarge:"h-5 w-5"},variants:{cards:{container:{base:"relative cursor-pointer flex",align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"-space-y-px shadow-sm",base:`
          transition
          border
          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-stronger
          border-1
        `,radio_offset:"left-4"},"stacked-cards":{container:{base:"relative cursor-pointer flex items-center justify-between",align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"space-y-3",base:`
          transition
          rounded-md
          border
          shadow-sm
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-stronger
          border-1
        `,radio_offset:"left-4"},"small-cards":{container:{base:"relative cursor-pointer flex",align:{vertical:"flex flex-col space-y-1 items-center justify-center",horizontal:"flex flex-row space-x-2"}},group:"flex flex-row gap-3",base:`
          transition
          border
          rounded-lg
          grow
          items-center
          flex-wrap
          justify-center
          shadow-sm
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-stronger border-1
        `,radio_offset:"left-4"},"large-cards":{container:{base:"relative cursor-pointer flex",align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"grid grid-cols-12 gap-3",base:`
          transition
          border border-stronger
          shadow-sm
          rounded-lg
          grow
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-strong
          border-1
        `,radio_offset:"left-4"},list:{container:{base:"relative cursor-pointer flex",size:{tiny:"pl-6",small:"pl-6",medium:"pl-7",large:"pl-7",xlarge:"pl-7"},align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"space-y-4",base:"",size:{tiny:"0",small:"0",medium:"0",large:"0",xlarge:"0"},active:"",radio_offset:"left-0"}},label:{base:"text-foreground-light cursor-pointer",...t.size.text},label_before:{base:"text-border",...t.size.text},label_after:{base:"text-border",...t.size.text},description:{base:"text-foreground-lighter",...t.size.text},optionalLabel:{base:"text-foreground-lighter",...t.size.text},disabled:"opacity-50 cursor-auto border-dashed"},sidepanel:{base:`
      z-50
      bg-dash-sidebar
      flex flex-col
      fixed
      inset-y-0
      h-full lg:h-screen
      border-l
      shadow-xl
    `,header:`
      flex items-center
      space-y-1 py-4 px-4 bg-dash-sidebar sm:px-6
      border-b h-[var(--header-height)]
    `,contents:`
      relative
      flex-1
      overflow-y-auto
    `,content:`
      px-4 sm:px-6
    `,footer:`
      flex justify-end gap-2
      p-4 bg-overlay
      border-t
    `,size:{medium:"w-screen max-w-md h-full",large:"w-screen max-w-2xl h-full",xlarge:"w-screen max-w-3xl h-full",xxlarge:"w-screen max-w-4xl h-full",xxxlarge:"w-screen max-w-5xl h-full",xxxxlarge:"w-screen max-w-6xl h-full"},align:{left:`
        left-0
        data-open:animate-panel-slide-left-out
        data-closed:animate-panel-slide-left-in
      `,right:`
        right-0
        data-open:animate-panel-slide-right-out
        data-closed:animate-panel-slide-right-in
      `},separator:`
      w-full
      h-px
      my-2
      bg-border
    `,overlay:`
      z-50
      fixed
      bg-alternative
      h-full w-full
      left-0
      top-0
      opacity-75
      data-closed:animate-fade-out-overlay-bg
      data-open:animate-fade-in-overlay-bg
    `,trigger:`
      border-none bg-transparent p-0 focus:ring-0
    `},toggle:{base:`
      p-0 relative
      inline-flex flex-shrink-0
      border-2 border-transparent
      rounded-full
      cursor-pointer
      transition-colors ease-in-out duration-200
      ${t.focus}
      focus:!ring-border
      bg-foreground-muted/40

      hover:bg-foreground-muted/60
    `,active:`
      !bg-brand
      !hover:bg-brand
    `,handle_container:{tiny:"h-4 w-7",small:"h-6 w-11",medium:"h-6 w-11",large:"h-7 w-12",xlarge:"h-7 w-12"},handle:{base:`
        inline-block h-5 w-5
        rounded-full
        bg-white
        shadow ring-0
        transition
        ease-in-out duration-200
      `,tiny:"!h-3 !w-3",small:"!h-5 !w-5",medium:"!h-5 !w-5",large:"!h-6 !w-6",xlarge:"!h-6 !w-6"},handle_active:{tiny:" translate-x-3 dark:bg-white",small:"translate-x-5 dark:bg-white",medium:"translate-x-5 dark:bg-white",large:"translate-x-5 dark:bg-white",xlarge:"translate-x-5 dark:bg-white"},disabled:"opacity-75 cursor-not-allowed"},form_layout:{container:"grid gap-2",flex:{left:{base:"flex flex-row gap-6",content:"",labels:"order-2",data_input:"order-1"},right:{base:"flex flex-row gap-6 justify-between",content:"order-last",labels:"",data_input:"text-right"}},responsive:"md:grid md:grid-cols-12",non_responsive:"grid grid-cols-12 gap-2",labels_horizontal_layout:"flex flex-row space-x-2 justify-between col-span-12",labels_vertical_layout:"flex flex-col space-y-2 col-span-4",data_input_horizontal_layout:"col-span-12",non_box_data_input_spacing_vertical:"my-3",non_box_data_input_spacing_horizontal:"my-3 md:mt-0 mb-3",data_input_vertical_layout:"col-span-8",data_input_vertical_layout__align_right:"text-right",label:{base:"block text-foreground-light",size:{...t.size.text}},label_optional:{base:"text-foreground-lighter",size:{...t.size.text}},description:{base:"mt-2 text-foreground-lighter leading-normal",size:{...t.size.text}},label_before:{base:"text-foreground-lighter ",size:{...t.size.text}},label_after:{base:"text-foreground-lighter",size:{...t.size.text}},error:{base:`
        text-red-900
        transition-all
        data-show:mt-2
        data-show:animate-slide-down-normal
        data-hide:animate-slide-up-normal
      `,size:{...t.size.text}},size:{tiny:"text-xs",small:"text-sm leading-4",medium:"text-sm",large:"text-base",xlarge:"text-base"}},popover:{trigger:`
      flex
      border-none
      rounded
      bg-transparent
      p-0
      outline-none
      outline-offset-1
      transition-all
      focus:outline-4
      focus:outline-border-control
    `,content:`
      z-40
      bg-overlay
      border border-overlay
      rounded
      shadow-lg
      data-open:animate-dropdown-content-show
      data-closed:animate-dropdown-content-hide
      min-w-fit

      origin-popover
      data-open:animate-dropdown-content-show
      data-closed:animate-dropdown-content-hide
    `,size:{tiny:"w-40",small:"w-48",medium:"w-64",large:"w-80",xlarge:"w-96",content:"w-auto"},header:`
      bg-surface-200
      space-y-1 py-1.5 px-3
      border-b border-overlay
    `,footer:`
      bg-surface-200
      py-1.5 px-3
      border-t border-overlay
    `,close:`
      transition
      text-foreground-lighter
    `,separator:`
      w-full
      h-px
      my-2
      bg-border-overlay
    `},menu:{item:{base:`
        cursor-pointer
        flex space-x-3 items-center
        outline-none
        focus-visible:ring-1 ring-foreground-muted focus-visible:z-10
        group
      `,content:{base:"transition truncate text-sm w-full",normal:"text-foreground-light group-hover:text-foreground",active:"text-foreground font-semibold"},icon:{base:"transition truncate text-sm",normal:"text-foreground-lighter group-hover:text-foreground-light",active:"text-foreground"},variants:{text:{base:`
            py-1
          `,normal:`
            font-normal
            border-default
            group-hover:border-foreground-muted`,active:`
            font-semibold
            text-foreground-muted
            z-10
          `},border:{base:`
            px-4 py-1
          `,normal:`
            border-l
            font-normal
            border-default
            group-hover:border-foreground-muted`,active:`
            font-semibold

            text-foreground-muted
            z-10

            border-l
            border-brand
            group-hover:border-brand
          `,rounded:"rounded-md"},pills:{base:"px-3 py-1",normal:`
            font-normal
            border-default
            group-hover:border-foreground-muted`,active:`
            font-semibold
            bg-sidebar-accent
            text-foreground-lighter
            z-10 rounded-md
          `}}},group:{base:`
        flex space-x-3
        mb-2
        font-normal
      `,icon:"text-foreground-lighter",content:"text-sm text-foreground-lighter w-full",variants:{text:"",pills:"px-3",border:""}}},modal:{base:`
      relative
      bg-dash-sidebar
      my-4 max-w-screen
      border border-overlay
      rounded-md
      shadow-xl
      data-open:animate-overlay-show
      data-closed:animate-overlay-hide

    `,header:`
      bg-surface-200
      space-y-1 py-3 px-4 sm:px-5
      border-b border-overlay
      flex items-center justify-between
    `,footer:`
      flex justify-end gap-2
      py-3 px-5
      border-t border-overlay
    `,size:{tiny:"sm:align-middle sm:w-full sm:max-w-xs",small:"sm:align-middle sm:w-full sm:max-w-sm",medium:"sm:align-middle sm:w-full sm:max-w-lg",large:"sm:align-middle sm:w-full md:max-w-xl",xlarge:"sm:align-middle sm:w-full md:max-w-3xl",xxlarge:"sm:align-middle sm:w-full max-w-screen md:max-w-6xl",xxxlarge:"sm:align-middle sm:w-full md:max-w-7xl"},overlay:`
      z-40
      fixed
      bg-alternative
      h-full w-full
      left-0
      top-0
      opacity-75
      data-closed:animate-fade-out-overlay-bg
      data-open:animate-fade-in-overlay-bg
    `,scroll_overlay:`
      z-40
      fixed
      inset-0
      grid
      place-items-center
      overflow-y-auto
      data-open:animate-overlay-show data-closed:animate-overlay-hide
    `,separator:`
      w-full
      h-px
      my-2
      bg-border-overlay
    `,content:"px-5"},listbox:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      text-foreground
      border
      focus-visible:shadow-md
      ${t.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${t.placeholder}
      indent-px
      transition-all
      bg-none
    `,container:"relative",label:"truncate",variants:{standard:`
        bg-control
        border border-control

        aria-expanded:border-foreground-muted
        aria-expanded:ring-border-muted
        aria-expanded:ring-2
        `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},options_container_animate:`
      transition
      data-open:animate-slide-down
      data-open:opacity-1
      data-closed:animate-slide-up
      data-closed:opacity-0
    `,options_container:`
      bg-overlay
      shadow-lg
      border border-solid
      border-overlay max-h-60
      rounded-md py-1 text-base
      sm:text-sm z-10 overflow-hidden overflow-y-scroll

      origin-dropdown
      data-open:animate-dropdown-content-show
      data-closed:animate-dropdown-content-hide
    `,with_icon:"pl-2",addOnBefore:`
      w-full flex flex-row items-center space-x-3
    `,size:{...o},disabled:"opacity-50",actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center",chevron_container:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",chevron:"h-5 w-5 text-foreground-muted",option:`
      w-listbox
      transition cursor-pointer select-none relative py-2 pl-3 pr-9
      text-foreground-light
      text-sm
      hover:bg-border-overlay
      focus:bg-border-overlay
      focus:text-foreground
      border-none
      focus:outline-none
    `,option_active:"text-foreground bg-selection",option_disabled:"cursor-not-allowed opacity-60",option_inner:"flex items-center space-x-3",option_check:"absolute inset-y-0 right-0 flex items-center pr-3 text-brand",option_check_active:"text-brand",option_check_icon:"h-5 w-5"},collapsible:{content:`
      data-open:animate-slide-down-normal
      data-closed:animate-slide-up-normal
    `},inputErrorIcon:{base:`
      flex items-center
      right-3 pr-2 pl-2
      inset-y-0
      pointer-events-none
      text-red-900
    `},inputIconContainer:{base:`
    absolute inset-y-0
    left-0 pl-2 flex
    items-center pointer-events-none
    text-foreground-light
    [&_svg]:stroke-[1.5]
    `,size:{tiny:"[&_svg]:h-[14px] [&_svg]:w-[14px]",small:"[&_svg]:h-[18px] [&_svg]:w-[18px]",medium:"[&_svg]:h-[20px] [&_svg]:w-[20px]",large:"[&_svg]:h-[20px] [&_svg]:w-[20px] pl-3",xlarge:"[&_svg]:h-[24px] [&_svg]:w-[24px] pl-3",xxlarge:"[&_svg]:h-[30px] [&_svg]:w-[30px] pl-3",xxxlarge:"[&_svg]:h-[42px] [&_svg]:w-[42px] pl-3"}},icon:{container:"flex-shrink-0 flex items-center justify-center rounded-full p-3"},loading:{base:"relative",content:{base:"transition-opacity duration-300",active:"opacity-40"},spinner:`
      absolute
      text-foreground-lighter animate-spin
      inset-0
      size-5
      m-auto
    `}};e.s(["default",0,a],305551);let i=(0,r.createContext)({theme:a});function l(e){let{theme:{[e]:t}}=(0,r.useContext)(i);return t||(t=a.accordion),t=JSON.parse(t=JSON.stringify(t).replace(/\\n/g,"").replace(/\s\s+/g," "))}e.s(["default",()=>l],938933)},396831,e=>{"use strict";var r=e.i(478902),t=e.i(389959),o=e.i(546595),n=e.i(889251),a=e.i(274664),i=e.i(678001),l=e.i(746523),s=e.i(2664),d=e.i(503867),c=e.i(305607),u=e.i(174617),p="ScrollArea",[b,f]=(0,a.createContextScope)(p),[g,x]=b(p),m=t.forwardRef((e,n)=>{let{__scopeScrollArea:a,type:l="hover",dir:d,scrollHideDelay:c=600,...u}=e,[p,b]=t.useState(null),[f,x]=t.useState(null),[m,h]=t.useState(null),[v,w]=t.useState(null),[y,_]=t.useState(null),[C,z]=t.useState(0),[T,E]=t.useState(0),[S,R]=t.useState(!1),[k,j]=t.useState(!1),P=(0,i.useComposedRefs)(n,e=>b(e)),L=(0,s.useDirection)(d);return(0,r.jsx)(g,{scope:a,type:l,dir:L,scrollHideDelay:c,scrollArea:p,viewport:f,onViewportChange:x,content:m,onContentChange:h,scrollbarX:v,onScrollbarXChange:w,scrollbarXEnabled:S,onScrollbarXEnabledChange:R,scrollbarY:y,onScrollbarYChange:_,scrollbarYEnabled:k,onScrollbarYEnabledChange:j,onCornerWidthChange:z,onCornerHeightChange:E,children:(0,r.jsx)(o.Primitive.div,{dir:L,...u,ref:P,style:{position:"relative","--radix-scroll-area-corner-width":C+"px","--radix-scroll-area-corner-height":T+"px",...e.style}})})});m.displayName=p;var h="ScrollAreaViewport",v=t.forwardRef((e,n)=>{let{__scopeScrollArea:a,children:l,nonce:s,...d}=e,c=x(h,a),u=t.useRef(null),p=(0,i.useComposedRefs)(n,u,c.onViewportChange);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("style",{dangerouslySetInnerHTML:{__html:"[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"},nonce:s}),(0,r.jsx)(o.Primitive.div,{"data-radix-scroll-area-viewport":"",...d,ref:p,style:{overflowX:c.scrollbarXEnabled?"scroll":"hidden",overflowY:c.scrollbarYEnabled?"scroll":"hidden",...e.style},children:(0,r.jsx)("div",{ref:c.onContentChange,style:{minWidth:"100%",display:"table"},children:l})})]})});v.displayName=h;var w="ScrollAreaScrollbar",y=t.forwardRef((e,o)=>{let{forceMount:n,...a}=e,i=x(w,e.__scopeScrollArea),{onScrollbarXEnabledChange:l,onScrollbarYEnabledChange:s}=i,d="horizontal"===e.orientation;return t.useEffect(()=>(d?l(!0):s(!0),()=>{d?l(!1):s(!1)}),[d,l,s]),"hover"===i.type?(0,r.jsx)(_,{...a,ref:o,forceMount:n}):"scroll"===i.type?(0,r.jsx)(C,{...a,ref:o,forceMount:n}):"auto"===i.type?(0,r.jsx)(z,{...a,ref:o,forceMount:n}):"always"===i.type?(0,r.jsx)(T,{...a,ref:o}):null});y.displayName=w;var _=t.forwardRef((e,o)=>{let{forceMount:a,...i}=e,l=x(w,e.__scopeScrollArea),[s,d]=t.useState(!1);return t.useEffect(()=>{let e=l.scrollArea,r=0;if(e){let t=()=>{window.clearTimeout(r),d(!0)},o=()=>{r=window.setTimeout(()=>d(!1),l.scrollHideDelay)};return e.addEventListener("pointerenter",t),e.addEventListener("pointerleave",o),()=>{window.clearTimeout(r),e.removeEventListener("pointerenter",t),e.removeEventListener("pointerleave",o)}}},[l.scrollArea,l.scrollHideDelay]),(0,r.jsx)(n.Presence,{present:a||s,children:(0,r.jsx)(z,{"data-state":s?"visible":"hidden",...i,ref:o})})}),C=t.forwardRef((e,o)=>{var a;let{forceMount:i,...l}=e,s=x(w,e.__scopeScrollArea),d="horizontal"===e.orientation,c=Y(()=>b("SCROLL_END"),100),[p,b]=(a={hidden:{SCROLL:"scrolling"},scrolling:{SCROLL_END:"idle",POINTER_ENTER:"interacting"},interacting:{SCROLL:"interacting",POINTER_LEAVE:"idle"},idle:{HIDE:"hidden",SCROLL:"scrolling",POINTER_ENTER:"interacting"}},t.useReducer((e,r)=>a[e][r]??e,"hidden"));return t.useEffect(()=>{if("idle"===p){let e=window.setTimeout(()=>b("HIDE"),s.scrollHideDelay);return()=>window.clearTimeout(e)}},[p,s.scrollHideDelay,b]),t.useEffect(()=>{let e=s.viewport,r=d?"scrollLeft":"scrollTop";if(e){let t=e[r],o=()=>{let o=e[r];t!==o&&(b("SCROLL"),c()),t=o};return e.addEventListener("scroll",o),()=>e.removeEventListener("scroll",o)}},[s.viewport,d,b,c]),(0,r.jsx)(n.Presence,{present:i||"hidden"!==p,children:(0,r.jsx)(T,{"data-state":"hidden"===p?"hidden":"visible",...l,ref:o,onPointerEnter:(0,u.composeEventHandlers)(e.onPointerEnter,()=>b("POINTER_ENTER")),onPointerLeave:(0,u.composeEventHandlers)(e.onPointerLeave,()=>b("POINTER_LEAVE"))})})}),z=t.forwardRef((e,o)=>{let a=x(w,e.__scopeScrollArea),{forceMount:i,...l}=e,[s,d]=t.useState(!1),c="horizontal"===e.orientation,u=Y(()=>{if(a.viewport){let e=a.viewport.offsetWidth<a.viewport.scrollWidth,r=a.viewport.offsetHeight<a.viewport.scrollHeight;d(c?e:r)}},10);return U(a.viewport,u),U(a.content,u),(0,r.jsx)(n.Presence,{present:i||s,children:(0,r.jsx)(T,{"data-state":s?"visible":"hidden",...l,ref:o})})}),T=t.forwardRef((e,o)=>{let{orientation:n="vertical",...a}=e,i=x(w,e.__scopeScrollArea),l=t.useRef(null),s=t.useRef(0),[d,c]=t.useState({content:0,viewport:0,scrollbar:{size:0,paddingStart:0,paddingEnd:0}}),u=$(d.viewport,d.content),p={...a,sizes:d,onSizesChange:c,hasThumb:!!(u>0&&u<1),onThumbChange:e=>l.current=e,onThumbPointerUp:()=>s.current=0,onThumbPointerDown:e=>s.current=e};function b(e,r){return function(e,r,t,o="ltr"){let n=I(t),a=r||n/2,i=t.scrollbar.paddingStart+a,l=t.scrollbar.size-t.scrollbar.paddingEnd-(n-a),s=t.content-t.viewport;return W([i,l],"ltr"===o?[0,s]:[-1*s,0])(e)}(e,s.current,d,r)}return"horizontal"===n?(0,r.jsx)(E,{...p,ref:o,onThumbPositionChange:()=>{if(i.viewport&&l.current){let e=M(i.viewport.scrollLeft,d,i.dir);l.current.style.transform=`translate3d(${e}px, 0, 0)`}},onWheelScroll:e=>{i.viewport&&(i.viewport.scrollLeft=e)},onDragScroll:e=>{i.viewport&&(i.viewport.scrollLeft=b(e,i.dir))}}):"vertical"===n?(0,r.jsx)(S,{...p,ref:o,onThumbPositionChange:()=>{if(i.viewport&&l.current){let e=M(i.viewport.scrollTop,d);l.current.style.transform=`translate3d(0, ${e}px, 0)`}},onWheelScroll:e=>{i.viewport&&(i.viewport.scrollTop=e)},onDragScroll:e=>{i.viewport&&(i.viewport.scrollTop=b(e))}}):null}),E=t.forwardRef((e,o)=>{let{sizes:n,onSizesChange:a,...l}=e,s=x(w,e.__scopeScrollArea),[d,c]=t.useState(),u=t.useRef(null),p=(0,i.useComposedRefs)(o,u,s.onScrollbarXChange);return t.useEffect(()=>{u.current&&c(getComputedStyle(u.current))},[u]),(0,r.jsx)(j,{"data-orientation":"horizontal",...l,ref:p,sizes:n,style:{bottom:0,left:"rtl"===s.dir?"var(--radix-scroll-area-corner-width)":0,right:"ltr"===s.dir?"var(--radix-scroll-area-corner-width)":0,"--radix-scroll-area-thumb-width":I(n)+"px",...e.style},onThumbPointerDown:r=>e.onThumbPointerDown(r.x),onDragScroll:r=>e.onDragScroll(r.x),onWheelScroll:(r,t)=>{if(s.viewport){var o,n;let a=s.viewport.scrollLeft+r.deltaX;e.onWheelScroll(a),o=a,n=t,o>0&&o<n&&r.preventDefault()}},onResize:()=>{u.current&&s.viewport&&d&&a({content:s.viewport.scrollWidth,viewport:s.viewport.offsetWidth,scrollbar:{size:u.current.clientWidth,paddingStart:O(d.paddingLeft),paddingEnd:O(d.paddingRight)}})}})}),S=t.forwardRef((e,o)=>{let{sizes:n,onSizesChange:a,...l}=e,s=x(w,e.__scopeScrollArea),[d,c]=t.useState(),u=t.useRef(null),p=(0,i.useComposedRefs)(o,u,s.onScrollbarYChange);return t.useEffect(()=>{u.current&&c(getComputedStyle(u.current))},[u]),(0,r.jsx)(j,{"data-orientation":"vertical",...l,ref:p,sizes:n,style:{top:0,right:"ltr"===s.dir?0:void 0,left:"rtl"===s.dir?0:void 0,bottom:"var(--radix-scroll-area-corner-height)","--radix-scroll-area-thumb-height":I(n)+"px",...e.style},onThumbPointerDown:r=>e.onThumbPointerDown(r.y),onDragScroll:r=>e.onDragScroll(r.y),onWheelScroll:(r,t)=>{if(s.viewport){var o,n;let a=s.viewport.scrollTop+r.deltaY;e.onWheelScroll(a),o=a,n=t,o>0&&o<n&&r.preventDefault()}},onResize:()=>{u.current&&s.viewport&&d&&a({content:s.viewport.scrollHeight,viewport:s.viewport.offsetHeight,scrollbar:{size:u.current.clientHeight,paddingStart:O(d.paddingTop),paddingEnd:O(d.paddingBottom)}})}})}),[R,k]=b(w),j=t.forwardRef((e,n)=>{let{__scopeScrollArea:a,sizes:s,hasThumb:d,onThumbChange:c,onThumbPointerUp:p,onThumbPointerDown:b,onThumbPositionChange:f,onDragScroll:g,onWheelScroll:m,onResize:h,...v}=e,y=x(w,a),[_,C]=t.useState(null),z=(0,i.useComposedRefs)(n,e=>C(e)),T=t.useRef(null),E=t.useRef(""),S=y.viewport,k=s.content-s.viewport,j=(0,l.useCallbackRef)(m),P=(0,l.useCallbackRef)(f),L=Y(h,10);function N(e){T.current&&g({x:e.clientX-T.current.left,y:e.clientY-T.current.top})}return t.useEffect(()=>{let e=e=>{let r=e.target;_?.contains(r)&&j(e,k)};return document.addEventListener("wheel",e,{passive:!1}),()=>document.removeEventListener("wheel",e,{passive:!1})},[S,_,k,j]),t.useEffect(P,[s,P]),U(_,L),U(y.content,L),(0,r.jsx)(R,{scope:a,scrollbar:_,hasThumb:d,onThumbChange:(0,l.useCallbackRef)(c),onThumbPointerUp:(0,l.useCallbackRef)(p),onThumbPositionChange:P,onThumbPointerDown:(0,l.useCallbackRef)(b),children:(0,r.jsx)(o.Primitive.div,{...v,ref:z,style:{position:"absolute",...v.style},onPointerDown:(0,u.composeEventHandlers)(e.onPointerDown,e=>{0===e.button&&(e.target.setPointerCapture(e.pointerId),T.current=_.getBoundingClientRect(),E.current=document.body.style.webkitUserSelect,document.body.style.webkitUserSelect="none",y.viewport&&(y.viewport.style.scrollBehavior="auto"),N(e))}),onPointerMove:(0,u.composeEventHandlers)(e.onPointerMove,N),onPointerUp:(0,u.composeEventHandlers)(e.onPointerUp,e=>{let r=e.target;r.hasPointerCapture(e.pointerId)&&r.releasePointerCapture(e.pointerId),document.body.style.webkitUserSelect=E.current,y.viewport&&(y.viewport.style.scrollBehavior=""),T.current=null})})})}),P="ScrollAreaThumb",L=t.forwardRef((e,t)=>{let{forceMount:o,...a}=e,i=k(P,e.__scopeScrollArea);return(0,r.jsx)(n.Presence,{present:o||i.hasThumb,children:(0,r.jsx)(N,{ref:t,...a})})}),N=t.forwardRef((e,n)=>{let{__scopeScrollArea:a,style:l,...s}=e,d=x(P,a),c=k(P,a),{onThumbPositionChange:p}=c,b=(0,i.useComposedRefs)(n,e=>c.onThumbChange(e)),f=t.useRef(void 0),g=Y(()=>{f.current&&(f.current(),f.current=void 0)},100);return t.useEffect(()=>{let e=d.viewport;if(e){let r=()=>{g(),f.current||(f.current=B(e,p),p())};return p(),e.addEventListener("scroll",r),()=>e.removeEventListener("scroll",r)}},[d.viewport,g,p]),(0,r.jsx)(o.Primitive.div,{"data-state":c.hasThumb?"visible":"hidden",...s,ref:b,style:{width:"var(--radix-scroll-area-thumb-width)",height:"var(--radix-scroll-area-thumb-height)",...l},onPointerDownCapture:(0,u.composeEventHandlers)(e.onPointerDownCapture,e=>{let r=e.target.getBoundingClientRect(),t=e.clientX-r.left,o=e.clientY-r.top;c.onThumbPointerDown({x:t,y:o})}),onPointerUp:(0,u.composeEventHandlers)(e.onPointerUp,c.onThumbPointerUp)})});L.displayName=P;var D="ScrollAreaCorner",A=t.forwardRef((e,t)=>{let o=x(D,e.__scopeScrollArea),n=!!(o.scrollbarX&&o.scrollbarY);return"scroll"!==o.type&&n?(0,r.jsx)(H,{...e,ref:t}):null});A.displayName=D;var H=t.forwardRef((e,n)=>{let{__scopeScrollArea:a,...i}=e,l=x(D,a),[s,d]=t.useState(0),[c,u]=t.useState(0),p=!!(s&&c);return U(l.scrollbarX,()=>{let e=l.scrollbarX?.offsetHeight||0;l.onCornerHeightChange(e),u(e)}),U(l.scrollbarY,()=>{let e=l.scrollbarY?.offsetWidth||0;l.onCornerWidthChange(e),d(e)}),p?(0,r.jsx)(o.Primitive.div,{...i,ref:n,style:{width:s,height:c,position:"absolute",right:"ltr"===l.dir?0:void 0,left:"rtl"===l.dir?0:void 0,bottom:0,...e.style}}):null});function O(e){return e?parseInt(e,10):0}function $(e,r){let t=e/r;return isNaN(t)?0:t}function I(e){let r=$(e.viewport,e.content),t=e.scrollbar.paddingStart+e.scrollbar.paddingEnd;return Math.max((e.scrollbar.size-t)*r,18)}function M(e,r,t="ltr"){let o=I(r),n=r.scrollbar.paddingStart+r.scrollbar.paddingEnd,a=r.scrollbar.size-n,i=r.content-r.viewport,l=(0,c.clamp)(e,"ltr"===t?[0,i]:[-1*i,0]);return W([0,i],[0,a-o])(l)}function W(e,r){return t=>{if(e[0]===e[1]||r[0]===r[1])return r[0];let o=(r[1]-r[0])/(e[1]-e[0]);return r[0]+o*(t-e[0])}}var B=(e,r=()=>{})=>{let t={left:e.scrollLeft,top:e.scrollTop},o=0;return!function n(){let a={left:e.scrollLeft,top:e.scrollTop},i=t.left!==a.left,l=t.top!==a.top;(i||l)&&r(),t=a,o=window.requestAnimationFrame(n)}(),()=>window.cancelAnimationFrame(o)};function Y(e,r){let o=(0,l.useCallbackRef)(e),n=t.useRef(0);return t.useEffect(()=>()=>window.clearTimeout(n.current),[]),t.useCallback(()=>{window.clearTimeout(n.current),n.current=window.setTimeout(o,r)},[o,r])}function U(e,r){let t=(0,l.useCallbackRef)(r);(0,d.useLayoutEffect)(()=>{let r=0;if(e){let o=new ResizeObserver(()=>{cancelAnimationFrame(r),r=window.requestAnimationFrame(t)});return o.observe(e),()=>{window.cancelAnimationFrame(r),o.unobserve(e)}}},[e,t])}var X=e.i(843778);let F=t.forwardRef(({className:e,children:t,...o},n)=>(0,r.jsxs)(m,{ref:n,className:(0,X.cn)("relative overflow-hidden",e),...o,children:[(0,r.jsx)(v,{className:"h-full w-full rounded-[inherit]",children:t}),(0,r.jsx)(q,{}),(0,r.jsx)(A,{})]}));F.displayName=m.displayName;let V=t.forwardRef(({className:e,children:t,...o},n)=>(0,r.jsx)(v,{ref:n,className:(0,X.cn)("size-full rounded-[inherit]",e),...o,children:t}));V.displayName=v.displayName;let q=t.forwardRef(({className:e,orientation:t="vertical",...o},n)=>(0,r.jsx)(y,{ref:n,orientation:t,className:(0,X.cn)("flex touch-none select-none transition-colors","vertical"===t&&"h-full w-2.5 border-l border-l-transparent p-[1px]","horizontal"===t&&"h-2.5 border-t border-t-transparent p-[1px]",e),...o,children:(0,r.jsx)(L,{className:"relative flex-1 rounded-full bg-border"})}));q.displayName=y.displayName,e.s(["ScrollArea",()=>F,"ScrollBar",()=>q,"ScrollViewport",()=>V],396831)}]);

//# debugId=82508fca-9dde-de95-b598-66111cd35d06
//# sourceMappingURL=f78a5626011460dc.js.map