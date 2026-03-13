;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="1ad9298a-6398-ee66-2a10-fb41fb3436df")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,744061,418638,e=>{"use strict";var t=e.i(478902),r=e.i(938933),n=e.i(843778);function a({children:e,className:r,tag:n="div",style:a}){let s=`${n}`;return(0,t.jsx)(s,{style:a,children:e})}a.Title=function({className:e,level:r=1,children:n,style:a}){let s=`h${r}`;return(0,t.jsx)(s,{style:a,children:n})},a.Text=function({className:e,children:r,style:n,type:a,disabled:s,mark:i,code:o,keyboard:c,underline:l,strikethrough:u,strong:d,small:f}){return o?(0,t.jsx)("code",{style:n,children:r}):i?(0,t.jsx)("mark",{style:n,children:r}):c?(0,t.jsx)("kbd",{style:n,children:r}):d?(0,t.jsx)("strong",{style:n,children:r}):(0,t.jsx)("span",{style:n,children:r})},a.Link=function({children:e,target:r="_blank",href:n,className:a,onClick:s,style:i}){return(0,t.jsx)("a",{onClick:s,href:n,target:r,rel:"noopener noreferrer",style:i,children:e})},e.s(["default",0,a],418638);var s=e.i(389959);let i=(0,s.createContext)({type:"text"}),o=e=>{let{type:r}=e;return(0,t.jsx)(i.Provider,{value:{type:r},children:e.children})},c=()=>{let e=(0,s.useContext)(i);if(void 0===e)throw Error("MenuContext must be used within a MenuContextProvider.");return e};function l({children:e,className:r,ulClassName:n,style:a,type:s="text"}){return(0,t.jsx)("nav",{role:"menu","aria-label":"Sidebar","aria-orientation":"vertical","aria-labelledby":"options-menu",className:r,style:a,children:(0,t.jsx)(o,{type:s,children:(0,t.jsx)("ul",{className:n,children:e})})})}l.Item=function({children:e,icon:a,active:s,rounded:i,onClick:o,doNotCloseOverlay:l=!1,showActiveBar:u=!1,style:d}){let f=(0,r.default)("menu"),{type:p}=c(),m=[f.item.base];m.push(f.item.variants[p].base),s?m.push(f.item.variants[p].active):m.push(f.item.variants[p].normal);let h=[f.item.content.base];s?h.push(f.item.content.active):h.push(f.item.content.normal);let g=[f.item.icon.base];return s?g.push(f.item.icon.active):g.push(f.item.icon.normal),(0,t.jsxs)("li",{role:"menuitem",className:(0,n.cn)("outline-none",m),style:d,onClick:o,"aria-current":s?"page":void 0,children:[a&&(0,t.jsx)("div",{className:`${g.join(" ")} min-w-fit`,children:a}),(0,t.jsx)("span",{className:h.join(" "),children:e})]})},l.Group=function({children:e,icon:n,title:a}){let s=(0,r.default)("menu"),{type:i}=c();return(0,t.jsxs)("div",{className:[s.group.base,s.group.variants[i]].join(" "),children:[n&&(0,t.jsx)("span",{className:s.group.icon,children:n}),(0,t.jsx)("span",{className:s.group.content,children:a}),e]})},l.Misc=function({children:e}){return(0,t.jsx)("div",{children:(0,t.jsx)(a.Text,{children:(0,t.jsx)("span",{children:e})})})},e.s(["default",0,l],744061)},862326,e=>{"use strict";var t=e.i(744061);e.s(["Menu",()=>t.default])},3259,100387,e=>{"use strict";var t=e.i(478902),r=e.i(153545),n=e.i(933505);e.s(["ChevronRightIcon",()=>n.default],100387);var n=n,a=e.i(389959),s=e.i(843778);let i=a.forwardRef(({...e},r)=>(0,t.jsx)("nav",{ref:r,"aria-label":"breadcrumb",...e}));i.displayName="Breadcrumb";let o=a.forwardRef(({className:e,...r},n)=>(0,t.jsx)("ol",{ref:n,className:(0,s.cn)("flex flex-wrap items-center gap-0.5 break-words text-sm text-muted-foreground sm:gap-1.5",e),...r}));o.displayName="BreadcrumbList";let c=a.forwardRef(({className:e,...r},n)=>(0,t.jsx)("li",{ref:n,className:(0,s.cn)("inline-flex text-foreground-lighter items-center gap-1.5 leading-5",e),...r}));c.displayName="BreadcrumbItem";let l=a.forwardRef(({asChild:e,className:n,...a},i)=>{let o=e?r.Slot:"a";return(0,t.jsx)(o,{ref:i,className:(0,s.cn)("transition-colors underline lg:no-underline hover:text-foreground",n),...a})});l.displayName="BreadcrumbLink";let u=a.forwardRef(({className:e,...r},n)=>(0,t.jsx)("span",{ref:n,role:"link","aria-disabled":"true","aria-current":"page",className:(0,s.cn)("no-underline text-foreground",e),...r}));u.displayName="BreadcrumbPage";let d=({children:e,className:r,...a})=>(0,t.jsx)("li",{role:"presentation","aria-hidden":"true",className:(0,s.cn)("[&>svg]:size-3.5 text-foreground-muted",r),...a,children:e??(0,t.jsx)(n.default,{})});d.displayName="BreadcrumbSeparator";let f=({className:e,...r})=>(0,t.jsxs)("span",{className:(0,s.cn)("flex h-4 w-4 items-center justify-center",e),...r,children:[(0,t.jsx)("svg",{role:"presentation","aria-hidden":"true",width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})}),(0,t.jsx)("span",{className:"sr-only",children:"More"})]});f.displayName="BreadcrumbEllipsis",e.s(["Breadcrumb",()=>i,"BreadcrumbEllipsis",()=>f,"BreadcrumbItem",()=>c,"BreadcrumbLink",()=>l,"BreadcrumbList",()=>o,"BreadcrumbPage",()=>u,"BreadcrumbSeparator",()=>d],3259)},799793,e=>{"use strict";var t=e.i(478902),r=e.i(896088),n=e.i(587433),a=e.i(837710),s=e.i(862326);e.s(["ProductMenuItem",0,({item:e,isActive:i,target:o="_self",hoverText:c="",onClick:l})=>{let{name:u="",url:d="",icon:f,rightIcon:p,isExternal:m,label:h,disabled:g}=e,b=(0,t.jsx)(s.Menu.Item,{icon:f,active:i,onClick:l,children:(0,t.jsxs)("div",{className:"flex w-full items-center justify-between gap-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1 min-w-0 flex-1",title:c||("string"==typeof u?u:""),children:[(0,t.jsx)("span",{className:"truncate flex-1 min-w-0",children:u}),void 0!==h&&(0,t.jsx)(n.Badge,{className:"flex-shrink-0",variant:"new"===h.toLowerCase()?"success":"warning",children:h})]}),p&&(0,t.jsx)("div",{children:p})]})});return g?(0,t.jsx)("div",{className:"opacity-50 pointer-events-none",children:b}):d?m?(0,t.jsx)(a.Button,{asChild:!0,block:!0,className:"!justify-start",type:"text",size:"small",icon:f,children:(0,t.jsx)(r.default,{href:d,target:"_blank",rel:"noreferrer",children:u})}):(0,t.jsx)(r.default,{href:d,className:"block",target:o,children:b}):b}])},388147,e=>{"use strict";var t=e.i(478902),r=e.i(587433),n=e.i(862326),a=e.i(799793);e.s(["ProductMenu",0,({page:e,menu:s})=>(0,t.jsx)("div",{className:"flex flex-col space-y-8",children:(0,t.jsx)(n.Menu,{type:"pills",children:s.map((i,o)=>(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"my-6 space-y-8",children:(0,t.jsxs)("div",{className:"mx-3",children:[(0,t.jsx)(n.Menu.Group,{title:i.title?(0,t.jsxs)("div",{className:"flex flex-col space-y-2 uppercase font-mono",children:[(0,t.jsx)("span",{children:i.title}),i.isPreview&&(0,t.jsx)(r.Badge,{variant:"warning",children:"Not production ready"})]}):null}),(0,t.jsx)("div",{children:i.items.map(r=>{let n=r.pages?r.pages.includes(e??""):e===r.key;return(0,t.jsx)(a.ProductMenuItem,{item:r,isActive:n,target:r.isExternal?"_blank":"_self"},r.key)})})]})}),o!==s.length-1&&(0,t.jsx)("div",{className:"h-px w-full bg-border-overlay"})]},i.key||i.title))})})])},156054,350660,e=>{"use strict";function t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function r(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?t(Object(n),!0).forEach(function(t){var r;r=n[t],t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach(function(t){var n;n=r[t],t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function i(e){return function t(){for(var r=this,n=arguments.length,a=Array(n),s=0;s<n;s++)a[s]=arguments[s];return a.length>=e.length?e.apply(this,a):function(){for(var e=arguments.length,n=Array(e),s=0;s<e;s++)n[s]=arguments[s];return t.apply(r,[].concat(a,n))}}}function o(e){return({}).toString.call(e).includes("Object")}function c(e){return"function"==typeof e}var l,u,d=i(function(e,t){throw Error(e[t]||e.default)})({initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"}),f=function(e,t){return o(t)||d("changeType"),Object.keys(t).some(function(t){return!Object.prototype.hasOwnProperty.call(e,t)})&&d("changeField"),t},p=function(e){c(e)||d("selectorType")},m=function(e){c(e)||o(e)||d("handlerType"),o(e)&&Object.values(e).some(function(e){return!c(e)})&&d("handlersType")},h=function(e){e||d("initialIsRequired"),o(e)||d("initialType"),Object.keys(e).length||d("initialContent")};function g(e,t){return c(t)?t(e.current):t}function b(e,t){return e.current=s(s({},e.current),t),t}function y(e,t,r){return c(t)?t(e.current):Object.keys(r).forEach(function(r){var n;return null==(n=t[r])?void 0:n.call(t,e.current[r])}),r}var v={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:"Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "},j=(l=function(e,t){throw Error(e[t]||e.default)},function e(){for(var t=this,r=arguments.length,n=Array(r),a=0;a<r;a++)n[a]=arguments[a];return n.length>=l.length?l.apply(this,n):function(){for(var r=arguments.length,a=Array(r),s=0;s<r;s++)a[s]=arguments[s];return e.apply(t,[].concat(n,a))}})(v);let x=function(e){return(e||j("configIsRequired"),({}).toString.call(e).includes("Object")||j("configType"),e.urls)?(console.warn(v.deprecation),{paths:{vs:e.urls.monacoBase}}):e},S=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return t.reduceRight(function(e,t){return t(e)},e)}};var w={type:"cancelation",msg:"operation is manually canceled"};let k=function(e){var t=!1,r=new Promise(function(r,n){e.then(function(e){return t?n(w):r(e)}),e.catch(n)});return r.cancel=function(){return t=!0},r};var P=function(e){if(Array.isArray(e))return e}(u=({create:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};h(e),m(t);var r={current:e},n=i(y)(r,t),a=i(b)(r),s=i(f)(e),o=i(g)(r);return[function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e){return e};return p(e),e(r.current)},function(e){(function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return t.reduceRight(function(e,t){return t(e)},e)}})(n,a,s,o)(e)}]}}).create({config:{paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs"}},isInitialized:!1,resolve:null,reject:null,monaco:null}))||function(e,t){if("u">typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,s=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done)&&(r.push(i.value),2!==r.length);n=!0);}catch(e){a=!0,s=e}finally{try{n||null==o.return||o.return()}finally{if(a)throw s}}return r}}(u,2)||function(e,t){if(e){if("string"==typeof e)return n(e,2);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,2)}}(u,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),N=P[0],_=P[1];function E(e){return document.body.appendChild(e)}function C(e){var t,r,n=N(function(e){return{config:e.config,reject:e.reject}}),a=(t="".concat(n.config.paths.vs,"/loader.js"),r=document.createElement("script"),t&&(r.src=t),r);return a.onload=function(){return e()},a.onerror=n.reject,a}function A(){var e=N(function(e){return{config:e.config,resolve:e.resolve,reject:e.reject}}),t=window.require;t.config(e.config),t(["vs/editor/editor.main"],function(t){O(t),e.resolve(t)},function(t){e.reject(t)})}function O(e){N().monaco||_({monaco:e})}var M=new Promise(function(e,t){return _({resolve:e,reject:t})});let T={config:function(e){var t=x(e),n=t.monaco,a=function(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}(t,["monaco"]);_(function(e){return{config:function e(t,n){return Object.keys(n).forEach(function(r){n[r]instanceof Object&&t[r]&&Object.assign(n[r],e(t[r],n[r]))}),r(r({},t),n)}(e.config,a),monaco:n}})},init:function(){var e=N(function(e){return{monaco:e.monaco,isInitialized:e.isInitialized,resolve:e.resolve}});if(!e.isInitialized){if(_({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),k(M);if(window.monaco&&window.monaco.editor)return O(window.monaco),e.resolve(window.monaco),k(M);S(E,C)(A)}return k(M)},__getMonacoInstance:function(){return N(function(e){return e.monaco})}};e.s(["default",0,T],350660);var R=e.i(389959),D={display:"flex",position:"relative",textAlign:"initial"},I={width:"100%"},B={display:"none"},z={display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"},L=function({children:e}){return R.default.createElement("div",{style:z},e)},F=(0,R.memo)(function({width:e,height:t,isEditorReady:r,loading:n,_ref:a,className:s,wrapperProps:i}){return R.default.createElement("section",{style:{...D,width:e,height:t},...i},!r&&R.default.createElement(L,null,n),R.default.createElement("div",{ref:a,style:{...I,...!r&&B},className:s}))}),$=function(e){(0,R.useEffect)(e,[])},q=function(e,t,r=!0){let n=(0,R.useRef)(!0);(0,R.useEffect)(n.current||!r?()=>{n.current=!1}:e,t)};function U(){}function H(e,t,r,n){var a,s,i,o,c,l;return a=e,s=n,a.editor.getModel(V(a,s))||(i=e,o=t,c=r,l=n,i.editor.createModel(o,c,l?V(i,l):void 0))}function V(e,t){return e.Uri.parse(t)}var G=(0,R.memo)(function({original:e,modified:t,language:r,originalLanguage:n,modifiedLanguage:a,originalModelPath:s,modifiedModelPath:i,keepCurrentOriginalModel:o=!1,keepCurrentModifiedModel:c=!1,theme:l="light",loading:u="Loading...",options:d={},height:f="100%",width:p="100%",className:m,wrapperProps:h={},beforeMount:g=U,onMount:b=U}){let[y,v]=(0,R.useState)(!1),[j,x]=(0,R.useState)(!0),S=(0,R.useRef)(null),w=(0,R.useRef)(null),k=(0,R.useRef)(null),P=(0,R.useRef)(b),N=(0,R.useRef)(g),_=(0,R.useRef)(!1);$(()=>{let e=T.init();return e.then(e=>(w.current=e)&&x(!1)).catch(e=>e?.type!=="cancelation"&&console.error("Monaco initialization: error:",e)),()=>{let t;return S.current?(t=S.current?.getModel(),void(o||t?.original?.dispose(),c||t?.modified?.dispose(),S.current?.dispose())):e.cancel()}}),q(()=>{if(S.current&&w.current){let t=S.current.getOriginalEditor(),a=H(w.current,e||"",n||r||"text",s||"");a!==t.getModel()&&t.setModel(a)}},[s],y),q(()=>{if(S.current&&w.current){let e=S.current.getModifiedEditor(),n=H(w.current,t||"",a||r||"text",i||"");n!==e.getModel()&&e.setModel(n)}},[i],y),q(()=>{let e=S.current.getModifiedEditor();e.getOption(w.current.editor.EditorOption.readOnly)?e.setValue(t||""):t!==e.getValue()&&(e.executeEdits("",[{range:e.getModel().getFullModelRange(),text:t||"",forceMoveMarkers:!0}]),e.pushUndoStop())},[t],y),q(()=>{S.current?.getModel()?.original.setValue(e||"")},[e],y),q(()=>{let{original:e,modified:t}=S.current.getModel();w.current.editor.setModelLanguage(e,n||r||"text"),w.current.editor.setModelLanguage(t,a||r||"text")},[r,n,a],y),q(()=>{w.current?.editor.setTheme(l)},[l],y),q(()=>{S.current?.updateOptions(d)},[d],y);let E=(0,R.useCallback)(()=>{if(!w.current)return;N.current(w.current);let o=H(w.current,e||"",n||r||"text",s||""),c=H(w.current,t||"",a||r||"text",i||"");S.current?.setModel({original:o,modified:c})},[r,t,a,e,n,s,i]),C=(0,R.useCallback)(()=>{!_.current&&k.current&&(S.current=w.current.editor.createDiffEditor(k.current,{automaticLayout:!0,...d}),E(),w.current?.editor.setTheme(l),v(!0),_.current=!0)},[d,l,E]);return(0,R.useEffect)(()=>{y&&P.current(S.current,w.current)},[y]),(0,R.useEffect)(()=>{j||y||C()},[j,y,C]),R.default.createElement(F,{width:p,height:f,isEditorReady:y,loading:u,_ref:k,className:m,wrapperProps:h})}),K=function(){let[e,t]=(0,R.useState)(T.__getMonacoInstance());return $(()=>{let r;return e||(r=T.init()).then(e=>{t(e)}),()=>r?.cancel()}),e},Y=function(e){let t=(0,R.useRef)();return(0,R.useEffect)(()=>{t.current=e},[e]),t.current},W=new Map,J=(0,R.memo)(function({defaultValue:e,defaultLanguage:t,defaultPath:r,value:n,language:a,path:s,theme:i="light",line:o,loading:c="Loading...",options:l={},overrideServices:u={},saveViewState:d=!0,keepCurrentModel:f=!1,width:p="100%",height:m="100%",className:h,wrapperProps:g={},beforeMount:b=U,onMount:y=U,onChange:v,onValidate:j=U}){let[x,S]=(0,R.useState)(!1),[w,k]=(0,R.useState)(!0),P=(0,R.useRef)(null),N=(0,R.useRef)(null),_=(0,R.useRef)(null),E=(0,R.useRef)(y),C=(0,R.useRef)(b),A=(0,R.useRef)(),O=(0,R.useRef)(n),M=Y(s),D=(0,R.useRef)(!1),I=(0,R.useRef)(!1);$(()=>{let e=T.init();return e.then(e=>(P.current=e)&&k(!1)).catch(e=>e?.type!=="cancelation"&&console.error("Monaco initialization: error:",e)),()=>N.current?void(A.current?.dispose(),f?d&&W.set(s,N.current.saveViewState()):N.current.getModel()?.dispose(),N.current.dispose()):e.cancel()}),q(()=>{let i=H(P.current,e||n||"",t||a||"",s||r||"");i!==N.current?.getModel()&&(d&&W.set(M,N.current?.saveViewState()),N.current?.setModel(i),d&&N.current?.restoreViewState(W.get(s)))},[s],x),q(()=>{N.current?.updateOptions(l)},[l],x),q(()=>{N.current&&void 0!==n&&(N.current.getOption(P.current.editor.EditorOption.readOnly)?N.current.setValue(n):n!==N.current.getValue()&&(I.current=!0,N.current.executeEdits("",[{range:N.current.getModel().getFullModelRange(),text:n,forceMoveMarkers:!0}]),N.current.pushUndoStop(),I.current=!1))},[n],x),q(()=>{let e=N.current?.getModel();e&&a&&P.current?.editor.setModelLanguage(e,a)},[a],x),q(()=>{void 0!==o&&N.current?.revealLine(o)},[o],x),q(()=>{P.current?.editor.setTheme(i)},[i],x);let B=(0,R.useCallback)(()=>{if(!(!_.current||!P.current)&&!D.current){C.current(P.current);let c=s||r,f=H(P.current,n||e||"",t||a||"",c||"");N.current=P.current?.editor.create(_.current,{model:f,automaticLayout:!0,...l},u),d&&N.current.restoreViewState(W.get(c)),P.current.editor.setTheme(i),void 0!==o&&N.current.revealLine(o),S(!0),D.current=!0}},[e,t,r,n,a,s,l,u,d,i,o]);return(0,R.useEffect)(()=>{x&&E.current(N.current,P.current)},[x]),(0,R.useEffect)(()=>{w||x||B()},[w,x,B]),O.current=n,(0,R.useEffect)(()=>{x&&v&&(A.current?.dispose(),A.current=N.current?.onDidChangeModelContent(e=>{I.current||v(N.current.getValue(),e)}))},[x,v]),(0,R.useEffect)(()=>{if(x){let e=P.current.editor.onDidChangeMarkers(e=>{let t=N.current.getModel()?.uri;if(t&&e.find(e=>e.path===t.path)){let e=P.current.editor.getModelMarkers({resource:t});j?.(e)}});return()=>{e?.dispose()}}return()=>{}},[x,j]),R.default.createElement(F,{width:p,height:m,isEditorReady:x,loading:c,_ref:_,className:h,wrapperProps:g})});e.s(["DiffEditor",()=>G,"Editor",()=>J,"default",()=>J,"useMonaco",()=>K],156054)},822574,(e,t,r)=>{var n=e.r(955905);t.exports=function(e,t){return n(e,t)}},53071,e=>{"use strict";let t=(0,e.i(388019).default)("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["Edit",()=>t],53071)},29750,(e,t,r)=>{"use strict";var n="function"==typeof Symbol&&Symbol.for,a=n?Symbol.for("react.element"):60103,s=n?Symbol.for("react.portal"):60106,i=n?Symbol.for("react.fragment"):60107,o=n?Symbol.for("react.strict_mode"):60108,c=n?Symbol.for("react.profiler"):60114,l=n?Symbol.for("react.provider"):60109,u=n?Symbol.for("react.context"):60110,d=n?Symbol.for("react.async_mode"):60111,f=n?Symbol.for("react.concurrent_mode"):60111,p=n?Symbol.for("react.forward_ref"):60112,m=n?Symbol.for("react.suspense"):60113,h=n?Symbol.for("react.suspense_list"):60120,g=n?Symbol.for("react.memo"):60115,b=n?Symbol.for("react.lazy"):60116,y=n?Symbol.for("react.block"):60121,v=n?Symbol.for("react.fundamental"):60117,j=n?Symbol.for("react.responder"):60118,x=n?Symbol.for("react.scope"):60119;function S(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case a:switch(e=e.type){case d:case f:case i:case c:case o:case m:return e;default:switch(e=e&&e.$$typeof){case u:case p:case b:case g:case l:return e;default:return t}}case s:return t}}}function w(e){return S(e)===f}r.AsyncMode=d,r.ConcurrentMode=f,r.ContextConsumer=u,r.ContextProvider=l,r.Element=a,r.ForwardRef=p,r.Fragment=i,r.Lazy=b,r.Memo=g,r.Portal=s,r.Profiler=c,r.StrictMode=o,r.Suspense=m,r.isAsyncMode=function(e){return w(e)||S(e)===d},r.isConcurrentMode=w,r.isContextConsumer=function(e){return S(e)===u},r.isContextProvider=function(e){return S(e)===l},r.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===a},r.isForwardRef=function(e){return S(e)===p},r.isFragment=function(e){return S(e)===i},r.isLazy=function(e){return S(e)===b},r.isMemo=function(e){return S(e)===g},r.isPortal=function(e){return S(e)===s},r.isProfiler=function(e){return S(e)===c},r.isStrictMode=function(e){return S(e)===o},r.isSuspense=function(e){return S(e)===m},r.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===i||e===f||e===c||e===o||e===m||e===h||"object"==typeof e&&null!==e&&(e.$$typeof===b||e.$$typeof===g||e.$$typeof===l||e.$$typeof===u||e.$$typeof===p||e.$$typeof===v||e.$$typeof===j||e.$$typeof===x||e.$$typeof===y)},r.typeOf=S},213784,(e,t,r)=>{"use strict";t.exports=e.r(29750)},781979,(e,t,r)=>{"use strict";var n=e.r(213784),a={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},s={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},o={};function c(e){return n.isMemo(e)?i:o[e.$$typeof]||a}o[n.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},o[n.Memo]=i;var l=Object.defineProperty,u=Object.getOwnPropertyNames,d=Object.getOwnPropertySymbols,f=Object.getOwnPropertyDescriptor,p=Object.getPrototypeOf,m=Object.prototype;t.exports=function e(t,r,n){if("string"!=typeof r){if(m){var a=p(r);a&&a!==m&&e(t,a,n)}var i=u(r);d&&(i=i.concat(d(r)));for(var o=c(t),h=c(r),g=0;g<i.length;++g){var b=i[g];if(!s[b]&&!(n&&n[b])&&!(h&&h[b])&&!(o&&o[b])){var y=f(r,b);try{l(t,b,y)}catch(e){}}}}return t}},336908,e=>{"use strict";var t=e.i(478902),r=e.i(389959),n=e.i(232520);e.s(["DiscardChangesConfirmationDialog",0,({visible:e,onClose:a,onCancel:s,title:i="Unsaved changes",description:o="You have unsaved changes. Are you sure you want to discard them?",confirmLabel:c="Discard changes",cancelLabel:l="Keep editing",size:u="tiny"})=>{let d=(0,r.useRef)(!1);(0,r.useEffect)(()=>{e&&(d.current=!1)},[e]);let f=(0,r.useCallback)(()=>{d.current=!0,a()},[a]),p=(0,r.useCallback)(e=>{if(!e){if(d.current){d.current=!1;return}s()}},[s]);return(0,t.jsx)(n.AlertDialog,{open:e,onOpenChange:p,children:(0,t.jsxs)(n.AlertDialogContent,{size:u,children:[(0,t.jsxs)(n.AlertDialogHeader,{children:[(0,t.jsx)(n.AlertDialogTitle,{children:i}),null!=o&&(0,t.jsx)(n.AlertDialogDescription,{children:o})]}),(0,t.jsxs)(n.AlertDialogFooter,{children:[(0,t.jsx)(n.AlertDialogCancel,{children:l}),(0,t.jsx)(n.AlertDialogAction,{variant:"danger",onClick:f,children:c})]})]})})}])},167892,e=>{"use strict";var t=e.i(478902),r=e.i(389959),n=e.i(843778);let a="mx-auto w-full max-w-[1200px]",s="px-4 @lg:px-6 @xl:px-10",i=(0,r.forwardRef)(({className:e,bottomPadding:r,size:a="default",...i},o)=>(0,t.jsx)("div",{ref:o,...i,className:(0,n.cn)("mx-auto w-full @container",{small:"max-w-[768px]",default:"max-w-[1200px]",large:"max-w-[1600px]",full:"max-w-none"}[a],s,r&&"pb-16",e)})),o=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("header",{...r,ref:a,className:(0,n.cn)("w-full","flex-col gap-3 py-6",e)})),c=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("h1",{ref:a,...r,className:(0,n.cn)(e)})),l=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("p",{ref:a,...r,className:(0,n.cn)("text-sm text-foreground-light",e)})),u=(0,r.forwardRef)(({className:e,isFullWidth:r,topPadding:a,...s},i)=>(0,t.jsx)("div",{ref:i,...s,className:(0,n.cn)("flex flex-col first:pt-12 py-6",r?"w-full":"gap-3 @md:grid-cols-12 @lg:grid",e)})),d=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("div",{ref:a,...r,className:(0,n.cn)("w-full h-px bg-border shrink-0",e)})),f=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("h3",{ref:a,...r,className:(0,n.cn)("text-foreground text-xl",e)})),p=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("p",{ref:a,...r,className:(0,n.cn)("text-sm text-foreground-light",e)})),m=(0,r.forwardRef)(({className:e,children:r,title:a,...s},i)=>(0,t.jsxs)("div",{ref:i,...s,className:(0,n.cn)("col-span-4 xl:col-span-5 prose text-sm",e),children:[a&&(0,t.jsx)("h2",{children:a}),r]})),h=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("div",{ref:a,...r,className:(0,n.cn)("col-span-8 xl:col-span-7","flex flex-col gap-6",e)})),g=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("div",{ref:a,...r,className:(0,n.cn)("flex flex-col gap-3 items-center",e)})),b=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("div",{ref:a,...r,className:(0,n.cn)("flex w-full items-center",e)})),y=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("div",{ref:a,...r,className:(0,n.cn)("flex flex-row gap-3",e)})),v=(0,r.forwardRef)(({className:e,...r},a)=>(0,t.jsx)("div",{ref:a,...r,className:(0,n.cn)("flex flex-col gap-3","min-w-[420px]",e)})),j=(0,r.forwardRef)(({className:e,...r},i)=>(0,t.jsx)("div",{ref:i,...r,className:(0,n.cn)(a,s,"my-8 flex flex-col gap-8",e)}));o.displayName="ScaffoldHeader",c.displayName="ScaffoldTitle",l.displayName="ScaffoldDescription",i.displayName="ScaffoldContainer",d.displayName="ScaffoldDivider",u.displayName="ScaffoldSection",v.displayName="ScaffoldColumn",m.displayName="ScaffoldSectionDetail",h.displayName="ScaffoldSectionContent",g.displayName="ScaffoldFilterAndContent",b.displayName="ScaffoldActionsContainer",y.displayName="ScaffoldActionsGroup",j.displayName="ScaffoldContainerLegacy",f.displayName="ScaffoldSectionTitle",p.displayName="ScaffoldSectionDescription",e.s(["MAX_WIDTH_CLASSES",0,a,"PADDING_CLASSES",0,s,"ScaffoldActionsContainer",0,b,"ScaffoldActionsGroup",0,y,"ScaffoldColumn",0,v,"ScaffoldContainer",0,i,"ScaffoldContainerLegacy",0,j,"ScaffoldDescription",0,l,"ScaffoldDivider",0,d,"ScaffoldFilterAndContent",0,g,"ScaffoldHeader",0,o,"ScaffoldSection",0,u,"ScaffoldSectionContent",0,h,"ScaffoldSectionDescription",0,p,"ScaffoldSectionDetail",0,m,"ScaffoldSectionTitle",0,f,"ScaffoldTitle",0,c])},547723,e=>{"use strict";var t=e.i(478902),r=e.i(389959),n=e.i(843778);let a=(0,r.forwardRef)((e,r)=>(0,t.jsx)("nav",{ref:r,dir:"ltr",...e,className:(0,n.cn)("border-b",e.className),children:(0,t.jsx)("ul",{role:"menu",className:"flex gap-5",children:e.children})})),s=(0,r.forwardRef)(({children:e,className:r,active:a,...s},i)=>(0,t.jsx)("li",{ref:i,"aria-selected":a?"true":"false","data-state":a?"active":"inactive",className:(0,n.cn)("inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground text-foreground-lighter hover:text-foreground data-[state=active]:border-foreground border-b-2 border-transparent *:py-1.5",r),...s,children:e}));e.s(["NavMenu",0,a,"NavMenuItem",0,s])},79771,e=>{"use strict";var t=e.i(478902),r=e.i(896088),n=e.i(435798);e.i(128328);var a=e.i(158639),s=e.i(587433),i=e.i(837710),o=e.i(843778),c=e.i(547723),l=e.i(167892),u=e.i(954676),d=e.i(389959),f=e.i(3259);let p=({title:e,subtitle:n,icon:s,breadcrumbs:i=[],primaryActions:c,secondaryActions:p,className:m,isCompact:h=!1})=>{let{ref:g}=(0,a.useParams)(),b=h&&e?[...i,{label:e}]:i;return(0,t.jsxs)("div",{className:(0,o.cn)("space-y-4",m),children:[(b.length>0||h&&(e||c||p))&&(0,t.jsxs)("div",{className:(0,o.cn)("flex items-center gap-4",h?"justify-between":"mb-4"),children:[(0,t.jsx)("div",{className:"flex items-center gap-4 flex-1 min-w-0",children:i.length>0?(0,t.jsx)(f.Breadcrumb,{className:(0,o.cn)("text-foreground-muted",h&&"text-base","min-w-0 flex-1"),children:(0,t.jsxs)(f.BreadcrumbList,{className:(0,o.cn)(h?"text-base":"text-xs","min-w-0"),children:[i.map((e,n)=>(0,t.jsxs)(d.Fragment,{children:[(0,t.jsx)(f.BreadcrumbItem,{children:e.element?e.element:e.href?(0,t.jsx)(f.BreadcrumbLink,{asChild:!0,className:"flex items-center gap-2",children:(0,t.jsxs)(r.default,{href:g?e.href.replace("[ref]",g):e.href,children:[1===i.length&&!h&&(0,t.jsx)(u.ChevronLeft,{size:16,strokeWidth:1.5}),e.label]})}):(0,t.jsxs)(f.BreadcrumbPage,{className:"flex items-center gap-2",children:[1===i.length&&(0,t.jsx)(u.ChevronLeft,{size:16,strokeWidth:1.5}),e.label]})}),n<i.length-1&&(0,t.jsx)(f.BreadcrumbSeparator,{})]},e.label||`breadcrumb-${n}`)),h&&e&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(f.BreadcrumbSeparator,{}),(0,t.jsx)(f.BreadcrumbItem,{className:"min-w-0 flex-1",children:(0,t.jsx)(f.BreadcrumbPage,{className:"min-w-0",children:e})})]})]})}):h?(0,t.jsx)("div",{className:"min-w-0 flex-1",children:e}):null}),h&&(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-shrink-0",children:[p&&(0,t.jsx)("div",{className:"flex items-center gap-2",children:p}),c&&(0,t.jsx)("div",{className:"flex items-center gap-2",children:c})]})]}),!h&&(0,t.jsxs)("div",{className:"flex items-center justify-between gap-4",children:[(0,t.jsx)("div",{className:"space-y-4",children:(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[s&&(0,t.jsx)("div",{className:"text-foreground-light",children:s}),(0,t.jsxs)("div",{className:"space-y-1",children:[e&&("string"==typeof e?(0,t.jsx)(l.ScaffoldTitle,{children:e}):e),n&&("string"==typeof n?(0,t.jsx)(l.ScaffoldDescription,{className:"text-sm text-foreground-light",children:n}):n)]})]})}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[p&&(0,t.jsx)("div",{className:"flex items-center gap-2",children:p}),c&&(0,t.jsx)("div",{className:"flex items-center gap-2",children:c})]})]})]})};e.s(["PageLayout",0,({children:e,title:u,subtitle:d,icon:f,breadcrumbs:m=[],primaryActions:h,secondaryActions:g,navigationItems:b=[],className:y,size:v="default",isCompact:j=!1})=>{let{ref:x}=(0,a.useParams)(),S=(0,n.useRouter)();return(0,t.jsxs)("div",{className:(0,o.cn)("w-full min-h-full flex flex-col items-stretch",y),children:[(0,t.jsxs)(l.ScaffoldContainer,{size:v,className:(0,o.cn)("w-full mx-auto","full"===v&&(j?"max-w-none !px-6 border-b pt-4":"max-w-none pt-6 !px-10 border-b"),"full"!==v&&(j?"pt-4":"pt-12"),0===b.length&&"full"===v&&(j?"pb-4":"pb-8")),children:[(u||d||h||g||m.length>0)&&(0,t.jsx)(p,{title:u,subtitle:d,icon:f,breadcrumbs:m,primaryActions:h,secondaryActions:g,isCompact:j}),b.length>0&&(0,t.jsx)(c.NavMenu,{className:(0,o.cn)(j?"mt-2":"mt-4","full"===v&&"border-none"),children:b.map(e=>{let n=void 0!==e.active?e.active:S.asPath.split("?")[0]===e.href;return(0,t.jsx)(c.NavMenuItem,{active:n,children:e.href?(0,t.jsxs)(r.default,{href:e.href.includes("[ref]")&&x?e.href.replace("[ref]",x):e.href,className:(0,o.cn)("inline-flex items-center gap-2",n&&"text-foreground"),onClick:e.onClick,children:[e.icon&&(0,t.jsx)("span",{children:e.icon}),e.label,e.badge&&(0,t.jsx)(s.Badge,{variant:"default",children:e.badge})]}):(0,t.jsxs)(i.Button,{type:"link",onClick:e.onClick,className:(0,o.cn)(n&&"text-foreground font-medium"),children:[e.icon&&(0,t.jsx)("span",{className:"mr-2",children:e.icon}),e.label,e.badge&&(0,t.jsx)(s.Badge,{variant:"default",children:e.badge})]})},e.label)})})]}),e]})}],79771)},756441,917134,794965,e=>{"use strict";var t=e.i(81798);e.s(["ContextMenuContent_Shadcn_",()=>t.ContextMenuContent],756441),e.s(["ContextMenuItem_Shadcn_",()=>t.ContextMenuItem],917134),e.s(["ContextMenuTrigger_Shadcn_",()=>t.ContextMenuTrigger],794965)},62307,e=>{"use strict";var t=e.i(81798);e.s(["ContextMenu_Shadcn_",()=>t.ContextMenu])},644131,e=>{"use strict";var t=e.i(81798);e.s(["ContextMenuSeparator_Shadcn_",()=>t.ContextMenuSeparator])},839941,e=>{"use strict";var t=e.i(478902);e.i(128328);var r=e.i(158639),n=e.i(388147),a=e.i(951138),s=e.i(435798),i=e.i(825713);let o=()=>{let{ref:e="default"}=(0,r.useParams)(),a=(0,s.useRouter)().pathname.split("/")[4],i=[{title:"Manage",items:[{name:"Functions",key:"main",pages:["","[functionSlug]","new"],url:`/project/${e}/functions`,items:[]},{name:"Secrets",key:"secrets",url:`/project/${e}/functions/secrets`,items:[]}]}];return(0,t.jsx)(n.ProductMenu,{page:a,menu:i})},c=(0,a.withAuth)(({children:e,title:r,browserTitle:n})=>(0,t.jsx)(i.ProjectLayout,{title:r,product:"Edge Functions",browserTitle:n,productMenu:(0,t.jsx)(o,{}),isBlocking:!1,children:e}));e.s(["default",0,c])},809822,e=>{"use strict";var t=e.i(478902),r=e.i(435798),n=e.i(389959),a=e.i(10429),s=e.i(336908);e.s(["PreventNavigationOnUnsavedChanges",0,({hasChanges:e,...i})=>{let o=(0,r.useRouter)(),[c,l]=(0,n.useState)(),[u,d]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{let t=t=>{e&&(t.preventDefault(),t.returnValue="")},r=t=>{if(e&&!u)throw l(t),"Route change declined";l(void 0)};return window.addEventListener("beforeunload",t),o.events.on("routeChangeStart",r),()=>{window.removeEventListener("beforeunload",t),o.events.off("routeChangeStart",r)}},[u,e]),(0,t.jsx)(s.DiscardChangesConfirmationDialog,{visible:!!c,onCancel:()=>{l(void 0)},onClose:()=>{d(!0);let e=c??"/";a.BASE_PATH&&e.startsWith(a.BASE_PATH)&&(e=e.slice(a.BASE_PATH.length)||"/"),e.startsWith("/")||(e=`/${e}`),l(void 0),o.push(e)},...i})}])},974200,e=>{"use strict";let t=[{value:"hello-world",name:"Simple Hello World",description:"Basic function that returns a JSON response",content:`// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
interface reqPayload {
  name: string;
}

console.info('server started');

Deno.serve(async (req: Request) => {
  const { name }: reqPayload = await req.json();
  const data = {
    message: \`Hello \${name}!\`,
  };

  return new Response(
    JSON.stringify(data),
    { headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive' }}
  );
});`},{value:"database-access",name:"Supabase Database Access",description:"Example using Supabase client to query your database",content:`// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // TODO: Change the table_name to your table
    const { data, error } = await supabase.from('table_name').select('*')

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(JSON.stringify({ message: err?.message ?? err }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500 
    })
  }
})`},{value:"storage-upload",name:"Supabase Storage Upload",description:"Upload files to Supabase Storage",content:`// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { randomUUID } from 'node:crypto'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
)

Deno.serve(async (req) => {
  const formData = await req.formData()
  const file = formData.get('file')
  
  // TODO: update your-bucket to the bucket you want to write files
  const { data, error } = await supabase
    .storage
    .from('your-bucket')
    .upload(
      \`\${file.name}-\${randomUUID()}\`,
      file,
      { contentType: file.type }
    )
  if (error) throw error
  return new Response(
    JSON.stringify({ data }),
    { headers: { 'Content-Type': 'application/json' }}
  )
})`},{value:"node-api",name:"Node Built-in API Example",description:"Example using Node.js built-in crypto and http modules",content:`// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { randomBytes } from "node:crypto";
import { createServer } from "node:http";
import process from "node:process";

const generateRandomString = (length) => {
  const buffer = randomBytes(length);
  return buffer.toString('hex');
};

const randomString = generateRandomString(10);
console.log(randomString);

const server = createServer((req, res) => {
  const message = \`Hello\`;
  res.end(message);
});

server.listen(9999);`},{value:"express",name:"Express Server",description:"Example using Express.js for routing",content:`// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import express from "npm:express@4.18.2";

const app = express();

// TODO: replace slug with Function's slug
// https://supabase.com/docs/guides/functions/routing?queryGroups=framework&framework=expressjs
app.get(/slug/(.*)/, (req, res) => {
  res.send("Welcome to Supabase");
});

app.listen(8000);`},{value:"stream-text-with-ai-sdk",name:"Stream text with AI SDK",description:"Generate and stream text with Vercel AI SDK",content:`/*
 * Setup OPENAI_API_KEY secret to get started.
 * For usage with useChat, point transport.api to this endpoint
 * and include your publishable key as Authorization: Bearer <key> in transport.headers.
 */

import { createOpenAI } from 'npm:@ai-sdk/openai';
import { convertToModelMessages, streamText } from 'npm:ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Max-Age': '3600',
  Vary: 'Access-Control-Request-Headers',
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

class ClientError extends Error {}

const openai = createOpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

const SYSTEM_PROMPT = 'You are a helpful AI assistant.';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => {
      throw new ClientError('Invalid JSON payload');
    }) as { messages?: unknown; model?: unknown };

    const { messages, model: modelName } = body;

    if (!Array.isArray(messages)) {
      throw new ClientError('Request must include a messages array');
    }

    const normalizedMessages = await convertToModelMessages(messages);

    const model = openai(
      typeof modelName === 'string' ? modelName : 'gpt-5.1-chat-latest',
    );

    const result = streamText({
      model,
      messages: normalizedMessages,
      system: SYSTEM_PROMPT,
    });

    return result.toUIMessageStreamResponse({
      headers: corsHeaders,
      sendReasoning: true,
      sendSources: true,
    });
  } catch (err) {
    if (err instanceof ClientError) {
      return json(400, { error: err.message });
    }

    console.error('Assistant chat error:', err);
    return json(500, {
      error: 'Failed to process chat request',
      details: err instanceof Error ? err.message : String(err),
    });
  }
});`},{value:"generate-recipes-with-ai-sdk",name:"Generate recipes with AI SDK",description:"Generate structured cooking recipes with Vercel AI SDK",content:`/*
* 1) Setup OPENAI_API_KEY secret to get started.
* 2) Call this endpoint with { prompt, model? } to generate a recipe object matching the schema below.
*/

import { createOpenAI } from 'npm:@ai-sdk/openai';
import { generateText, Output } from "npm:ai";
import { z } from 'npm:zod';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Max-Age': '3600',
  Vary: 'Access-Control-Request-Headers',
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

class ClientError extends Error {}

const openai = createOpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

const RecipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string()),
  }),
});

const SYSTEM_PROMPT =
  'You are a recipe generator. Always return a structured recipe matching the given schema.';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => {
      throw new ClientError('Invalid JSON payload');
    }) as {
      model?: unknown;
      prompt?: unknown;
    };

    const { model: modelName, prompt } = body;

    if (typeof prompt !== 'string' || !prompt.trim()) {
      throw new ClientError('Request must include a non-empty prompt string');
    }

    const model = openai(
      typeof modelName === 'string' ? modelName : 'gpt-5.1-chat-latest',
    );

    const result = await generateText({
      model,
      system: SYSTEM_PROMPT,
      prompt,
      output: Output.object({
        schema: RecipeSchema,
      }),
    });

    return json(200, result.output);
  } catch (err) {
    if (err instanceof ClientError) {
      return json(400, { error: err.message });
    }

    console.error('generateText error:', err);
    return json(500, {
      error: 'Failed to process generateText request',
      details: err instanceof Error ? err.message : String(err),
    });
  }
});`},{value:"stripe-webhook",name:"Stripe Webhook Example",description:"Handle Stripe webhook events securely",content:`// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from 'npm:stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') as string, {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  apiVersion: '2024-11-20'
})

// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createSubtleCryptoProvider()

console.log('Stripe Webhook Function booted!')

Deno.serve(async (request) => {
  const signature = request.headers.get('Stripe-Signature')

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = await request.text()
  let receivedEvent
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
      undefined,
      cryptoProvider
    )
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }
  console.log(\`🔔 Event received: \${receivedEvent.id}\`)
  return new Response(JSON.stringify({ ok: true }), { status: 200 })
});`},{value:"resend-email",name:"Send Emails",description:"Send emails using the Resend API",content:`// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!

Deno.serve(async (req) => {
  const { to, subject, html } = await req.json()
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: \`Bearer \${RESEND_API_KEY}\`,
    },
    body: JSON.stringify({
      from: 'you@example.com',
      to,
      subject,
      html,
    }),
  })
  const data = await res.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})`},{value:"image-transform",name:"Image Transformation",description:"Transform images using ImageMagick WASM",content:`// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  ImageMagick,
  initializeImageMagick,
} from "npm:@imagemagick/magick-wasm@0.0.30"

await initializeImageMagick()

Deno.serve(async (req) => {
  const formData = await req.formData()
  const file = formData.get('file')
  const content = await file.arrayBuffer()
  const result = await ImageMagick.read(new Uint8Array(content), (img) => {
    img.resize(500, 300)
    img.blur(60, 5)
    return img.write(data => data)
  })
  return new Response(
    result,
    { headers: { 'Content-Type': 'image/png' }}
  )
})`},{value:"websocket-server",name:"WebSocket Server Example",description:"Create a real-time WebSocket server",content:`// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve((req) => {
  const upgrade = req.headers.get("upgrade") || ""
  if (upgrade.toLowerCase() != "websocket") {
    return new Response("request isn't trying to upgrade to websocket.")
  }
  const { socket, response } = Deno.upgradeWebSocket(req)
  socket.onopen = () => {
    console.log("client connected!")
    socket.send('Welcome to Supabase Edge Functions!')
  }
  socket.onmessage = (e) => {
    console.log("client sent message:", e.data)
    socket.send(new Date().toString())
  }
  return response
})`}];e.s(["EDGE_FUNCTION_TEMPLATES",0,t])},672296,e=>{"use strict";function t(e){return e.split("#")[0]}function r(e,t={}){let{maxDepth:n=3,redaction:a="[REDACTED]",truncationNotice:s="[REDACTED: max depth reached]",sensitiveKeys:i=[]}=t,o=new Set(["password","passwd","pwd","pass","secret","token","id_token","access_token","refresh_token","apikey","api_key","api-key","apiKey","key","privatekey","private_key","client_secret","clientSecret","auth","authorization","ssh_key","sshKey","bearer","session","cookie","csrf","xsrf","ip","ip_address","ipAddress","aws_access_key_id","aws_secret_access_key","gcp_service_account_key",...i].map(e=>e.toLowerCase())),c=[{re:/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g,reason:"ip"},{re:/\b(?:[A-Fa-f0-9]{1,4}:){2,7}[A-Fa-f0-9]{1,4}\b/g,reason:"ip6"},{re:/\b(AKI|ASI)A[0-9A-Z]{16}\b/g,reason:"aws_access_key_id"},{re:/\b[0-9A-Za-z/+]{40}\b/g,reason:"aws_secret_access_key_like"},{re:/\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/g,reason:"bearer"},{re:/\b[A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?\b/g,reason:"jwt_like"},{re:/\b[A-Za-z0-9_\-]{24,64}\b/g,reason:"long_token"}],l=new WeakMap;function u(e){let t=e;for(let{re:e}of c)t=t.replace(e,a);return t}function d(e){return o.has(String(e).toLowerCase())}return e.map(e=>(function e(t,r){if(null==t||"number"==typeof t||"boolean"==typeof t||"bigint"==typeof t)return t;if("string"==typeof t)return u(t);if("function"==typeof t)return"[Function]";if(t instanceof Date)return t.toISOString();if(t instanceof RegExp)return t.toString();if(ArrayBuffer.isView(t)&&!(t instanceof DataView))return`[TypedArray byteLength=${t.byteLength}]`;if(t instanceof ArrayBuffer)return`[ArrayBuffer byteLength=${t.byteLength}]`;if(r>=n)return s;if("object"==typeof t){if(l.has(t))return"[Circular]";if(Array.isArray(t)){let n=[];l.set(t,n);for(let a=0;a<t.length;a++)n[a]=e(t[a],r+1);return n}if(function(e){if(null===e||"object"!=typeof e)return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||null===t}(t)){let n={};for(let[s,i]of(l.set(t,n),Object.entries(t)))d(s)?n[s]=a:n[s]=e(i,r+1);return n}if(t instanceof Map){let n=[];for(let[s,i]of(l.set(t,n),t.entries())){let t=d(s)?a:e(s,r+1),o=d(s)?a:e(i,r+1);n.push([t,o])}return n}if(t instanceof Set){let n=[];for(let a of(l.set(t,n),t.values()))n.push(e(a,r+1));return n}if(t instanceof URL)return t.toString();if(t instanceof Error){let e={name:t.name,message:u(t.message),stack:s};return l.set(t,e),e}try{return u(String(t))}catch{return u(Object.prototype.toString.call(t))}}return u(String(t))})(e,0))}e.s(["sanitizeArrayOfObjects",()=>r,"sanitizeUrlHashParams",()=>t])},305080,996941,835453,544433,813667,e=>{"use strict";let t="u"<typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__;e.s(["DEBUG_BUILD",()=>t],305080);var r=e.i(469449);function n(e){let t={};try{e.forEach((e,r)=>{"string"==typeof e&&(t[r]=e)})}catch{}return t}function a(e){let t=Object.create(null);try{Object.entries(e).forEach(([e,r])=>{"string"==typeof r&&(t[e]=r)})}catch{}return t}function s(e){let t=n(e.headers);return{method:e.method,url:e.url,query_string:o(e.url),headers:t}}function i(e){let t=e.headers||{},r=("string"==typeof t["x-forwarded-host"]?t["x-forwarded-host"]:void 0)||("string"==typeof t.host?t.host:void 0),n=("string"==typeof t["x-forwarded-proto"]?t["x-forwarded-proto"]:void 0)||e.protocol||(e.socket?.encrypted?"https":"http"),s=e.url||"",i=function({url:e,protocol:t,host:r}){return e?.startsWith("http")?e:e&&r?`${t}://${r}${e}`:void 0}({url:s,host:r,protocol:n}),c=e.body||void 0,l=e.cookies;return{url:i,method:e.method,query_string:o(s),headers:a(t),cookies:l,data:c}}function o(e){if(e)try{let t=new URL(e,"http://s.io").search.slice(1);return t.length?t:void 0}catch{return}}e.s(["headersToDict",()=>a,"httpRequestToRequestData",()=>i,"winterCGHeadersToDict",()=>n,"winterCGRequestToRequestData",()=>s],996941);var c=e.i(817729),l=e.i(40108);function u(e){let t=l.GLOBAL_OBJ[Symbol.for("@vercel/request-context")],r=t?.get?.();r?.waitUntil&&r.waitUntil(e)}e.s(["vercelWaitUntil",()=>u],835453);var d=e.i(521852);async function f(){try{t&&d.debug.log("Flushing events..."),await (0,c.flush)(2e3),t&&d.debug.log("Done flushing events")}catch(e){t&&d.debug.log("Error while flushing events:\n",e)}}async function p(e){let{req:t,res:n,err:a}=e,s=n?.statusCode||e.statusCode;if(s&&s<500||!e.pathname)return Promise.resolve();(0,r.withScope)(e=>{if(t){let r=i(t);e.setSDKProcessingMetadata({normalizedRequest:r})}(0,c.captureException)(a||`_error.js called with falsy error (${a})`,{mechanism:{type:"auto.function.nextjs.underscore_error",handled:!1,data:{function:"_error.getInitialProps"}}})}),u(f())}e.s(["flushSafelyWithTimeout",()=>f],544433),e.s(["captureUnderscoreErrorException",()=>p],813667)},222053,e=>{"use strict";var t=e.i(478902),r=e.i(532728);e.i(128328);var n=e.i(158639),a=e.i(974200),s=e.i(448710),i=e.i(839941),o=e.i(79771),c=e.i(215618),l=e.i(613983),u=e.i(139415),d=e.i(162082),f=e.i(912793),p=e.i(265735),m=e.i(635494),h=e.i(10429),g=e.i(822574),b=e.i(867637),y=e.i(636900),v=e.i(370410),j=e.i(435798),x=e.i(389959),S=e.i(408891),w=e.i(355901),k=e.i(317040),P=e.i(441081),N=e.i(602089),_=e.i(837710),E=e.i(843778),C=e.i(866205),A=e.i(703526),O=e.i(917007),M=e.i(920432),T=e.i(549815),R=e.i(911509),D=e.i(428353),I=e.i(24315),B=e.i(61863),z=e.i(191209),L=e.i(378277),F=e.i(9679),$=e.i(689805),q=e.i(793912),U=e.i(135144),H=e.i(613580),V=e.i(531837),G=e.i(809822);let K=["quick","clever","bright","swift","rapid","smart","smooth","dynamic","super","hyper"],Y=["function","handler","processor","responder","worker","service","api","endpoint","action","task"],W=/^[A-Za-z0-9_-]+$/,J=V.object({functionName:V.string().min(1,"Function name is required").regex(W,"Only letters, numbers, hyphens, and underscores allowed")}),Z=[{id:1,name:"index.ts",content:a.EDGE_FUNCTION_TEMPLATES[0].content,state:"new"}],X=()=>{let e,s,i=(0,j.useRouter)(),{ref:V,template:X}=(0,n.useParams)(),{data:Q}=(0,m.useSelectedProjectQuery)(),{data:ee}=(0,p.useSelectedOrganizationQuery)(),et=(0,k.useAiAssistantStateSnapshot)(),{mutate:er}=(0,d.useSendEventMutation)(),en=(0,f.useIsFeatureEnabled)("edge_functions:show_stripe_example"),{openSidebar:ea}=(0,P.useSidebarManagerSnapshot)(),[es,ei]=(0,x.useState)(Z),[eo,ec]=(0,x.useState)(Z[0].id),[el,eu]=(0,x.useState)(!1),ed=(0,x.useId)(),[ef,ep]=(0,x.useState)(!1),[em,eh]=(0,x.useState)(""),eg=(0,x.useMemo)(()=>en?a.EDGE_FUNCTION_TEMPLATES:a.EDGE_FUNCTION_TEMPLATES.filter(e=>"stripe-webhook"!==e.value),[en]),eb=(0,S.useForm)({resolver:(0,r.zodResolver)(J),defaultValues:{functionName:(e=K[Math.floor(Math.random()*K.length)],s=Y[Math.floor(Math.random()*Y.length)],`${e}-${s}`)}}),{mutate:ey,isPending:ev}=(0,u.useEdgeFunctionDeployMutation)({onSuccess:()=>{w.toast.success("Successfully deployed edge function");let e=eb.getValues("functionName");V&&e&&i.push(`/project/${V}/functions/${e}/details`)}}),ej=e=>{!ev&&V&&(ey({projectRef:V,slug:e.functionName,metadata:{name:e.functionName,verify_jwt:!0},files:es.map(({name:e,content:t})=>({name:e,content:t}))}),er({action:"edge_function_deploy_button_clicked",properties:{origin:"functions_editor"},groups:{project:V??"Unknown",organization:ee?.slug??"Unknown"}}))},ex=e=>{let t=a.EDGE_FUNCTION_TEMPLATES.find(t=>t.value===e);t&&(ei(e=>e.map(e=>e.id===eo?{...e,content:t.content}:e)),eu(!1),er({action:"edge_function_template_clicked",properties:{templateName:t.name,origin:"editor_page"},groups:{project:V??"Unknown",organization:ee?.slug??"Unknown"}})),ep(!1)},eS=()=>{ef&&(ep(!1),ei(e=>e.map(e=>e.id===eo?{...e,content:em}:e)))};(0,x.useEffect)(()=>{if(X){let e=a.EDGE_FUNCTION_TEMPLATES.find(e=>e.value===X);e&&(eb.reset({functionName:X}),ec(1),ei([{id:1,name:"index.ts",content:e.content,state:"new"}]))}},[X]);let ew=(0,x.useMemo)(()=>!(0,g.default)(Z,es),[es]);return(0,t.jsxs)(o.PageLayout,{size:"full",isCompact:!0,title:"Create new edge function",breadcrumbs:[{label:"Edge Functions",href:`/project/${V}/functions`}],primaryActions:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)($.Popover_Shadcn_,{open:el,onOpenChange:eu,children:[(0,t.jsx)(U.PopoverTrigger_Shadcn_,{asChild:!0,children:(0,t.jsx)(_.Button,{size:"tiny",type:"default",role:"combobox","aria-expanded":el,"aria-controls":ed,icon:(0,t.jsx)(y.Book,{size:14}),children:"Templates"})}),(0,t.jsx)(q.PopoverContent_Shadcn_,{id:ed,className:"w-[300px] p-0",align:"end",children:(0,t.jsxs)(C.Command_Shadcn_,{children:[(0,t.jsx)(M.CommandInput_Shadcn_,{placeholder:"Search templates..."}),(0,t.jsxs)(R.CommandList_Shadcn_,{children:[(0,t.jsx)(A.CommandEmpty_Shadcn_,{children:"No templates found."}),(0,t.jsx)(O.CommandGroup_Shadcn_,{children:eg.map(e=>(0,t.jsx)(T.CommandItem_Shadcn_,{value:e.value,onSelect:ex,onMouseEnter:()=>{var t;return t=e.content,void(!ef&&eh((es.find(e=>e.id===eo)??es[0]).content),ep(!0),ei(e=>e.map(e=>e.id===eo?{...e,content:t}:e)))},onMouseLeave:eS,className:"cursor-pointer",children:(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsx)(v.Check,{className:(0,E.cn)("mr-2 h-4 w-4",es.some(t=>t.content===e.content)?"opacity-100":"opacity-0")}),(0,t.jsx)("span",{className:"text-foreground",children:e.name})]}),(0,t.jsx)("span",{className:"text-xs text-foreground-light pl-6",children:e.description})]})},e.value))})]})]})})]}),(0,t.jsx)(_.Button,{size:"tiny",type:"default",onClick:()=>{let e=es.find(e=>e.id===eo);ea(c.SIDEBAR_KEYS.AI_ASSISTANT),et.newChat({name:"Explain edge function",sqlSnippets:[e?.content??""],initialInput:"Help me understand and improve this edge function...",suggestions:{title:"I can help you understand and improve your edge function. Here are a few example prompts to get you started:",prompts:[{label:"Explain Function",description:"Explain what this function does..."},{label:"Optimize Function",description:"Help me optimize this function..."},{label:"Add Features",description:"Show me how to add more features..."},{label:"Error Handling",description:"Help me handle errors better..."}]}}),er({action:"edge_function_ai_assistant_button_clicked",properties:{origin:"functions_editor_chat"},groups:{project:V??"Unknown",organization:ee?.slug??"Unknown"}})},icon:(0,t.jsx)(N.AiIconAnimation,{size:16}),children:"Chat"})]}),children:[(0,t.jsx)(l.FileExplorerAndEditor,{files:es,onFilesChange:ei,aiEndpoint:`${h.BASE_PATH}/api/ai/code/complete`,aiMetadata:{projectRef:Q?.ref,connectionString:Q?.connectionString,orgSlug:ee?.slug},selectedFileId:eo,setSelectedFileId:ec}),(0,t.jsx)(D.Form_Shadcn_,{...eb,children:(0,t.jsxs)("form",{onSubmit:eb.handleSubmit(ej),className:"flex items-center bg-background-muted justify-end p-4 border-t bg-surface-100 gap-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(F.Label_Shadcn_,{htmlFor:"functionName",children:"Function name"}),(0,t.jsx)(B.FormField_Shadcn_,{control:eb.control,name:"functionName",render:({field:e})=>(0,t.jsx)(z.FormItem_Shadcn_,{className:"flex flex-col gap-0 m-0",children:(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsx)(I.FormControl_Shadcn_,{children:(0,t.jsx)(L.Input_Shadcn_,{id:"functionName",type:"text",size:"large",placeholder:"Give your function a name...",className:"w-[250px]",...e})}),eb.formState.errors.functionName&&(0,t.jsxs)(H.Tooltip,{children:[(0,t.jsx)(H.TooltipTrigger,{children:(0,t.jsx)(b.AlertCircle,{className:"w-4 h-4 text-destructive ml-2"})}),(0,t.jsx)(H.TooltipContent,{children:eb.formState.errors.functionName.message})]})]})})})]}),(0,t.jsx)(_.Button,{loading:ev,size:"medium",disabled:0===es.length||ev,onClick:()=>{let e=eb.getValues("functionName");if(!W.test(e)&&e){let t=e.replace(/[^A-Za-z0-9_-]/g,"-");eb.setValue("functionName",t,{shouldValidate:!0})}eb.handleSubmit(ej)()},children:"Deploy function"})]})}),(0,t.jsx)(G.PreventNavigationOnUnsavedChanges,{hasChanges:ew})]})};X.getLayout=e=>(0,t.jsx)(s.DefaultLayout,{children:(0,t.jsx)(i.default,{title:"New",children:e})}),e.s(["default",0,X])},699900,(e,t,r)=>{let n="/project/[ref]/functions/new";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(222053)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})},111410,e=>{e.v(t=>Promise.all(["static/chunks/a428d2b7e6671266.js","static/chunks/db6e89e400789b2b.js"].map(t=>e.l(t))).then(()=>t(677146)))},883471,e=>{e.v(t=>Promise.all(["static/chunks/f2ab36b4c62edcb1.js"].map(t=>e.l(t))).then(()=>t(518769)))},53585,e=>{e.v(t=>Promise.all(["static/chunks/9e9114d9495a8055.js"].map(t=>e.l(t))).then(()=>t(752484)))},539787,e=>{e.v(t=>Promise.all(["static/chunks/b3a62b216f3b55d2.js"].map(t=>e.l(t))).then(()=>t(672073)))},329867,e=>{e.v(t=>Promise.all(["static/chunks/c48a6d8383b6e3f3.js"].map(t=>e.l(t))).then(()=>t(562380)))},643342,e=>{e.v(t=>Promise.all(["static/chunks/76feb96258c19b2c.js","static/chunks/dd81391dd8fa5b9c.js","static/chunks/6773c20266519575.js","static/chunks/b4bfbc766b014a90.js","static/chunks/d8dbe5d60074dc0c.js","static/chunks/4aacba336df833d5.js","static/chunks/b5656144e93622c9.js","static/chunks/7d491c4c96b0e979.js"].map(t=>e.l(t))).then(()=>t(232258)))},804879,e=>{e.v(t=>Promise.all(["static/chunks/6773c20266519575.js","static/chunks/d8dbe5d60074dc0c.js","static/chunks/ccc49c07d95b40bc.js"].map(t=>e.l(t))).then(()=>t(199687)))},586515,e=>{e.v(t=>Promise.all(["static/chunks/157fd1964f2e2b3c.js"].map(t=>e.l(t))).then(()=>t(567727)))},591393,e=>{e.v(t=>Promise.all(["static/chunks/e9ad074e72197584.js"].map(t=>e.l(t))).then(()=>t(217383)))},379416,e=>{e.v(t=>Promise.all(["static/chunks/031b0d6330b6fbae.js"].map(t=>e.l(t))).then(()=>t(931066)))},15732,e=>{e.v(t=>Promise.all(["static/chunks/0d5256e667945be4.js"].map(t=>e.l(t))).then(()=>t(760545)))},957083,e=>{e.v(t=>Promise.all(["static/chunks/e7d07ff1ae210964.js"].map(t=>e.l(t))).then(()=>t(667558)))},926327,e=>{e.v(t=>Promise.all(["static/chunks/a5f6425a6c20e9a8.js"].map(t=>e.l(t))).then(()=>t(72947)))},207969,e=>{e.v(t=>Promise.all(["static/chunks/8dd7282c22f923f6.js"].map(t=>e.l(t))).then(()=>t(427328)))},992842,e=>{e.v(t=>Promise.all(["static/chunks/d064a48a1c7cf778.js"].map(t=>e.l(t))).then(()=>t(793794)))},239573,e=>{e.v(t=>Promise.all(["static/chunks/edc5d84148401903.js"].map(t=>e.l(t))).then(()=>t(210246)))},963685,e=>{e.v(t=>Promise.all(["static/chunks/92b20126e5ca0919.js"].map(t=>e.l(t))).then(()=>t(983756)))},665811,e=>{e.v(t=>Promise.all(["static/chunks/44e647523eaf7d10.js"].map(t=>e.l(t))).then(()=>t(544836)))},369256,e=>{e.v(t=>Promise.all(["static/chunks/8296dc618dae72f0.js"].map(t=>e.l(t))).then(()=>t(930239)))},16037,e=>{e.v(t=>Promise.all(["static/chunks/3251b4bc539a554b.js"].map(t=>e.l(t))).then(()=>t(397698)))},616788,e=>{e.v(t=>Promise.all(["static/chunks/c6b81ab43a1d5d23.js"].map(t=>e.l(t))).then(()=>t(7346)))},315750,e=>{e.v(t=>Promise.all(["static/chunks/32c236321136eb7c.js"].map(t=>e.l(t))).then(()=>t(531289)))},460510,e=>{e.v(t=>Promise.all(["static/chunks/d91062943e6a7c30.js"].map(t=>e.l(t))).then(()=>t(276898)))},550265,e=>{e.v(t=>Promise.all(["static/chunks/75ff0e62b8a31d26.js"].map(t=>e.l(t))).then(()=>t(259714)))},830960,e=>{e.v(t=>Promise.all(["static/chunks/b44aa26556fee7df.js"].map(t=>e.l(t))).then(()=>t(882885)))},336744,e=>{e.v(t=>Promise.all(["static/chunks/2b0767b5c008139a.js"].map(t=>e.l(t))).then(()=>t(955268)))},63631,e=>{e.v(t=>Promise.all(["static/chunks/21a4706e1f02d90b.js"].map(t=>e.l(t))).then(()=>t(853630)))},396476,e=>{e.v(t=>Promise.all(["static/chunks/265a0c1d143bd3f1.js"].map(t=>e.l(t))).then(()=>t(62943)))},912072,e=>{e.v(t=>Promise.all(["static/chunks/c17c80e5efc43419.js"].map(t=>e.l(t))).then(()=>t(311301)))},846537,e=>{e.v(t=>Promise.all(["static/chunks/acf3285986dfbd7a.js"].map(t=>e.l(t))).then(()=>t(245201)))},50229,e=>{e.v(t=>Promise.all(["static/chunks/3bcb48bb59845022.js"].map(t=>e.l(t))).then(()=>t(331248)))},263652,e=>{e.v(t=>Promise.all(["static/chunks/aa4006ae66587429.js"].map(t=>e.l(t))).then(()=>t(700224)))},822335,e=>{e.v(t=>Promise.all(["static/chunks/ee69726af0316987.js"].map(t=>e.l(t))).then(()=>t(48216)))},827389,e=>{e.v(t=>Promise.all(["static/chunks/f888750d45a24867.js"].map(t=>e.l(t))).then(()=>t(780795)))},306465,e=>{e.v(t=>Promise.all(["static/chunks/95db3728117c6ee7.js"].map(t=>e.l(t))).then(()=>t(84223)))},320810,e=>{e.v(t=>Promise.all(["static/chunks/f5da8b2852673ce6.js"].map(t=>e.l(t))).then(()=>t(190529)))},44756,e=>{e.v(t=>Promise.all(["static/chunks/fe9cc17dc6466440.js"].map(t=>e.l(t))).then(()=>t(411609)))},77572,e=>{e.v(t=>Promise.all(["static/chunks/881b451403819e35.js"].map(t=>e.l(t))).then(()=>t(550910)))},299015,e=>{e.v(t=>Promise.all(["static/chunks/e771049771127f6f.js"].map(t=>e.l(t))).then(()=>t(956403)))},853832,e=>{e.v(t=>Promise.all(["static/chunks/da4d4a78a31fafb9.js"].map(t=>e.l(t))).then(()=>t(523047)))},444444,e=>{e.v(t=>Promise.all(["static/chunks/f38e028ff72cdce1.js"].map(t=>e.l(t))).then(()=>t(306141)))},89982,e=>{e.v(t=>Promise.all(["static/chunks/7f0708c377c6315e.js"].map(t=>e.l(t))).then(()=>t(84181)))},439,e=>{e.v(t=>Promise.all(["static/chunks/92660c7112298340.js"].map(t=>e.l(t))).then(()=>t(585967)))},674055,e=>{e.v(t=>Promise.all(["static/chunks/7dba2c88da4802d7.js"].map(t=>e.l(t))).then(()=>t(659864)))},801894,e=>{e.v(t=>Promise.all(["static/chunks/aa9037f0686299b0.js"].map(t=>e.l(t))).then(()=>t(532683)))},578444,e=>{e.v(t=>Promise.all(["static/chunks/e8ca73a1fb74d864.js"].map(t=>e.l(t))).then(()=>t(221183)))},185608,e=>{e.v(t=>Promise.all(["static/chunks/3634617ddd98d861.js"].map(t=>e.l(t))).then(()=>t(79472)))},612314,e=>{e.v(t=>Promise.all(["static/chunks/92d2e23f362178b8.js"].map(t=>e.l(t))).then(()=>t(980791)))},660943,e=>{e.v(t=>Promise.all(["static/chunks/c90413a3fb4f7fb4.js"].map(t=>e.l(t))).then(()=>t(620893)))},214615,e=>{e.v(t=>Promise.all(["static/chunks/726c9c09fe01762c.js"].map(t=>e.l(t))).then(()=>t(194742)))},877303,e=>{e.v(t=>Promise.all(["static/chunks/65b0f15c58106291.js"].map(t=>e.l(t))).then(()=>t(85809)))},565731,e=>{e.v(t=>Promise.all(["static/chunks/a857737ee1ea178f.js"].map(t=>e.l(t))).then(()=>t(846526)))},439954,e=>{e.v(t=>Promise.all(["static/chunks/ea2e29758f7a6140.js"].map(t=>e.l(t))).then(()=>t(399358)))},646193,e=>{e.v(t=>Promise.all(["static/chunks/0e86c6f6f44c3d01.js"].map(t=>e.l(t))).then(()=>t(270671)))},470322,e=>{e.v(t=>Promise.all(["static/chunks/95e51d9895d75e1b.js"].map(t=>e.l(t))).then(()=>t(433215)))},310666,e=>{e.v(t=>Promise.all(["static/chunks/c29b3dc53abbda08.js"].map(t=>e.l(t))).then(()=>t(191809)))},38970,e=>{e.v(t=>Promise.all(["static/chunks/10af340af0ab27cf.js"].map(t=>e.l(t))).then(()=>t(66554)))},68365,e=>{e.v(t=>Promise.all(["static/chunks/8229f5f7f1da78d8.js"].map(t=>e.l(t))).then(()=>t(531769)))},705292,e=>{e.v(t=>Promise.all(["static/chunks/055f0ce00306f8fb.js"].map(t=>e.l(t))).then(()=>t(147575)))},736620,e=>{e.v(t=>Promise.all(["static/chunks/fb200c2b93e182d4.js"].map(t=>e.l(t))).then(()=>t(85022)))},101928,e=>{e.v(t=>Promise.all(["static/chunks/b11be5a5365b7b1d.js"].map(t=>e.l(t))).then(()=>t(846161)))},41375,e=>{e.v(t=>Promise.all(["static/chunks/6ce3b68ef69bef0c.js"].map(t=>e.l(t))).then(()=>t(834473)))},715733,e=>{e.v(t=>Promise.all(["static/chunks/1f996c98ffdc95c1.js"].map(t=>e.l(t))).then(()=>t(417897)))},268726,e=>{e.v(t=>Promise.all(["static/chunks/f82819fa16566fe0.js"].map(t=>e.l(t))).then(()=>t(898187)))},740028,e=>{e.v(t=>Promise.all(["static/chunks/104dd8c9c2b519a7.js"].map(t=>e.l(t))).then(()=>t(391060)))},753940,e=>{e.v(t=>Promise.all(["static/chunks/046f60a3ac988a54.js"].map(t=>e.l(t))).then(()=>t(478124)))},724565,e=>{e.v(t=>Promise.all(["static/chunks/3ef67abf4c659c0b.js"].map(t=>e.l(t))).then(()=>t(341546)))}]);

//# debugId=1ad9298a-6398-ee66-2a10-fb41fb3436df
//# sourceMappingURL=43f3e3a4dbf4fc54.js.map