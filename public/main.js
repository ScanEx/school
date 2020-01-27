!function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode.removeChild(t)}function a(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function d(){return f(" ")}function g(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function p(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t,e){e=""+e,t.data!==e&&(t.data=e)}function y(t,e,n){t.classList[n?"add":"remove"](e)}let $;function _(t){$=t}function v(){const t=function(){if(!$)throw new Error("Function called outside component initialization");return $}();return(e,n)=>{const r=t.$$.callbacks[e];if(r){const o=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);r.slice().forEach(e=>{e.call(t,o)})}}}const b=[],x=[],w=[],k=[],E=Promise.resolve();let C=!1;function I(t){w.push(t)}function j(t){k.push(t)}function N(){const t=new Set;do{for(;b.length;){const t=b.shift();_(t),O(t.$$)}for(;x.length;)x.pop()();for(let e=0;e<w.length;e+=1){const n=w[e];t.has(n)||(n(),t.add(n))}w.length=0}while(b.length);for(;k.length;)k.pop()();C=!1}function O(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(I)}}const A=new Set;function L(t,e){t&&t.i&&(A.delete(t),t.i(e))}function M(t,e,n){const r=t.$$.props[e];void 0!==r&&(t.$$.bound[r]=n,n(t.$$.ctx[r]))}function S(t,n,s){const{fragment:i,on_mount:c,on_destroy:l,after_update:a}=t.$$;i&&i.m(n,s),I(()=>{const n=c.map(e).filter(o);l?l.push(...n):r(n),t.$$.on_mount=[]}),a.forEach(I)}function q(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function D(t,e){-1===t.$$.dirty[0]&&(b.push(t),C||(C=!0,E.then(N)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function H(e,o,s,i,c,l,a=[-1]){const u=$;_(e);const f=o.props||{},d=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:n(),dirty:a};let g=!1;d.ctx=s?s(e,f,(t,n,...r)=>{const o=r.length?r[0]:n;return d.ctx&&c(d.ctx[t],d.ctx[t]=o)&&(d.bound[t]&&d.bound[t](o),g&&D(e,t)),n}):[],d.update(),g=!0,r(d.before_update),d.fragment=!!i&&i(d.ctx),o.target&&(o.hydrate?d.fragment&&d.fragment.l(function(t){return Array.from(t.childNodes)}(o.target)):d.fragment&&d.fragment.c(),o.intro&&L(e.$$.fragment),S(e,o.target,o.anchor),N()),_(u)}class P{$destroy(){q(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function z(e){let n,o,s,a,y,$,_,v,b,x,w,k,E,C,I,j;return{c(){n=u("div"),o=u("label"),o.textContent="1",s=d(),a=u("i"),y=d(),$=u("i"),_=d(),v=u("input"),b=d(),x=u("i"),w=d(),k=u("i"),E=d(),C=u("label"),I=f(e[0]),m(a,"class","icon fast-backward"),m($,"class","icon backward"),m(v,"class","current"),m(v,"type","text"),v.value=e[1],m(x,"class","icon forward"),m(k,"class","icon fast-forward"),m(n,"class","pager")},m(t,r){c(t,n,r),i(n,o),i(n,s),i(n,a),i(n,y),i(n,$),i(n,_),i(n,v),i(n,b),i(n,x),i(n,w),i(n,k),i(n,E),i(n,C),i(C,I),j=[g(a,"click",p(e[2])),g($,"click",p(e[3])),g(v,"change",p(e[6])),g(x,"click",p(e[4])),g(k,"click",p(e[5]))]},p(t,[e]){2&e&&v.value!==t[1]&&(v.value=t[1]),1&e&&h(I,t[0])},i:t,o:t,d(t){t&&l(n),r(j)}}}function B(t,e,n){const r=v();let{max:o=0}=e,{current:s=0}=e;let i=0,c=0;return t.$set=t=>{"max"in t&&n(0,o=t.max),"current"in t&&n(1,s=t.current)},t.$$.update=()=>{387&t.$$.dirty&&(Number.isInteger(o)&&1<=o?n(8,c=o):n(0,o=c),Number.isInteger(s)&&1<=s&&s<=o?(n(7,i=s),r("change",i)):n(1,s=i))},[o,s,function(){n(1,s=1)},function(){n(1,--s)},function(){n(1,++s)},function(){n(1,s=o)},function({target:t}){n(1,s=parseInt(t.value,10))}]}class F extends P{constructor(t){super(),H(this,t,B,z,s,{max:0,current:1,start:2,backward:3,forward:4,end:5})}get start(){return this.$$.ctx[2]}get backward(){return this.$$.ctx[3]}get forward(){return this.$$.ctx[4]}get end(){return this.$$.ctx[5]}}function T(t,e,n){const r=t.slice();return r[19]=e[n],r[21]=n,r}function G(t,e,n){const r=t.slice();return r[16]=e[n],r[18]=n,r}function J(t,e,n){const r=t.slice();return r[22]=e[n].title,r}function K(t){let e,n,r=t[22]+"";return{c(){e=u("th"),n=f(r)},m(t,r){c(t,e,r),i(e,n)},p(t,e){8&e&&r!==(r=t[22]+"")&&h(n,r)},d(t){t&&l(e)}}}function Q(t){let e,n,r=t[5](t[16][t[19]],t[21])+"";return{c(){e=u("td"),n=f(r)},m(t,r){c(t,e,r),i(e,n)},p(t,e){20&e&&r!==(r=t[5](t[16][t[19]],t[21])+"")&&h(n,r)},d(t){t&&l(e)}}}function R(t){let e,n,r=t[4],o=[];for(let e=0;e<r.length;e+=1)o[e]=Q(T(t,r,e));return{c(){e=u("tr");for(let t=0;t<o.length;t+=1)o[t].c();n=d(),y(e,"odd",t[18]%2==0),y(e,"even",t[18]%2!=0)},m(t,r){c(t,e,r);for(let t=0;t<o.length;t+=1)o[t].m(e,null);i(e,n)},p(t,s){if(52&s){let i;for(r=t[4],i=0;i<r.length;i+=1){const c=T(t,r,i);o[i]?o[i].p(c,s):(o[i]=Q(c),o[i].c(),o[i].m(e,n))}for(;i<o.length;i+=1)o[i].d(1);o.length=r.length}},d(t){t&&l(e),a(o,t)}}}function U(t){let e,n,r,o,s,f,g,p,h,y,$,_,v,b,w=t[3],k=[];for(let e=0;e<w.length;e+=1)k[e]=K(J(t,w,e));let E=t[2],C=[];for(let e=0;e<E.length;e+=1)C[e]=R(G(t,E,e));function I(e){t[13].call(null,e)}function N(e){t[14].call(null,e)}let O={};void 0!==t[0]&&(O.current=t[0]),void 0!==t[1]&&(O.max=t[1]);const D=new F({props:O});return x.push(()=>M(D,"current",I)),x.push(()=>M(D,"max",N)),D.$on("change",t[15]),{c(){e=u("table"),n=u("tr"),r=u("td"),o=u("table"),s=u("thead"),f=u("tr");for(let t=0;t<k.length;t+=1)k[t].c();g=d(),p=u("tbody");for(let t=0;t<C.length;t+=1)C[t].c();var t;h=d(),y=u("tr"),$=u("td"),(t=D.$$.fragment)&&t.c(),m(r,"class","content"),m($,"class","footer"),m(e,"class","grid")},m(t,l){c(t,e,l),i(e,n),i(n,r),i(r,o),i(o,s),i(s,f);for(let t=0;t<k.length;t+=1)k[t].m(f,null);i(o,g),i(o,p);for(let t=0;t<C.length;t+=1)C[t].m(p,null);i(e,h),i(e,y),i(y,$),S(D,$,null),b=!0},p(t,[e]){if(8&e){let n;for(w=t[3],n=0;n<w.length;n+=1){const r=J(t,w,n);k[n]?k[n].p(r,e):(k[n]=K(r),k[n].c(),k[n].m(f,null))}for(;n<k.length;n+=1)k[n].d(1);k.length=w.length}if(52&e){let n;for(E=t[2],n=0;n<E.length;n+=1){const r=G(t,E,n);C[n]?C[n].p(r,e):(C[n]=R(r),C[n].c(),C[n].m(p,null))}for(;n<C.length;n+=1)C[n].d(1);C.length=E.length}const n={};!_&&1&e&&(_=!0,n.current=t[0],j(()=>_=!1)),!v&&2&e&&(v=!0,n.max=t[1],j(()=>v=!1)),D.$set(n)},i(t){b||(L(D.$$.fragment,t),b=!0)},o(t){!function(t,e,n,r){if(t&&t.o){if(A.has(t))return;A.add(t),(void 0).c.push(()=>{A.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}(D.$$.fragment,t),b=!1},d(t){t&&l(e),a(k,t),a(C,t),q(D)}}}function V(t,e,n){let{page:r}=e,{pages:o}=e,{columns:s={}}=e,{visibleColumns:i=[]}=e,{rows:c=[]}=e,{formatters:l={date:t=>{const e=/(?<d>\d\d)\/(?<m>\d\d)\/(?<y>\d\d\d\d)\s(?<H>\d\d?):(?<M>\d\d?)/g.exec(t);if(e&&e.groups){const t=parseInt(e.groups.y,10),n=parseInt(e.groups.m,10)-1,r=parseInt(e.groups.d,10),o=parseInt(e.groups.H,10),s=parseInt(e.groups.M,10);return new Date(t,n,r,o,s).toLocaleDateString()}return t}}}=e,a=[],u=[];return t.$set=t=>{"page"in t&&n(0,r=t.page),"pages"in t&&n(1,o=t.pages),"columns"in t&&n(6,s=t.columns),"visibleColumns"in t&&n(7,i=t.visibleColumns),"rows"in t&&n(2,c=t.rows),"formatters"in t&&n(8,l=t.formatters)},t.$$.update=()=>{if(216&t.$$.dirty){n(3,a=[]),n(4,u=[]);const t=Object.keys(s);for(let e=0;e<t.length;++e){let n=t[e];-1!=i.indexOf(n)&&(u.push(e),a.push(s[n]))}}},[r,o,c,a,u,function(t,e){const{type:n,formatter:r}=a[e],o=l[n];return"function"==typeof r?r(t):"function"==typeof o?o(t):t},s,i,l,function(){n(0,r=1)},function(){n(0,--r)},function(){n(0,++r)},function(){n(0,r=o)},function(t){r=t,n(0,r)},function(t){o=t,n(1,o)},function(e){!function(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(t=>t(e))}(t,e)}]}class W extends P{constructor(t){super(),H(this,t,V,U,s,{page:0,pages:1,columns:6,visibleColumns:7,rows:2,formatters:8,start:9,backward:10,forward:11,end:12})}get start(){return this.$$.ctx[9]}get backward(){return this.$$.ctx[10]}get forward(){return this.$$.ctx[11]}get end(){return this.$$.ctx[12]}}var X={id:{type:"integer",title:"id"},mmsi:{type:"integer",title:"mmsi"},imo:{type:"integer",title:"imo"},vessel_name:{type:"string",title:"vessel_name"},callsign:{type:"string",title:"callsign"},vessel_type:{type:"string",title:"vessel_type"},vessel_type_code:{type:"integer",title:"vessel_type_code"},vessel_type_cargo:{type:"string",title:"vessel_type_cargo"},vessel_class:{type:"string",title:"vessel_class"},length:{type:"integer",title:"length"},width:{type:"integer",title:"width"},flag_country:{type:"string",title:"flag_country"},flag_code:{type:"integer",title:"flag_code"},destination:{type:"string",title:"destination"},eta:{type:"string",title:"eta"},draught:{type:"float",title:"draught"},longitude:{type:"float",title:"longitude"},latitude:{type:"float",title:"latitude"},sog:{type:"float",title:"sog"},cog:{type:"float",title:"cog"},rot:{type:"float",title:"rot"},heading:{type:"integer",title:"heading"},nav_status:{type:"string",title:"nav_status"},nav_status_code:{type:"integer",title:"nav_status_code"},source:{type:"string",title:"source"},ts_pos_utc:{type:"date",title:"ts_pos_utc"},ts_static_utc:{type:"date",title:"ts_static_utc"},ts_eta:{type:"date",title:"ts_eta"},ts_insert_utc:{type:"date",title:"ts_insert_utc"},registry_name:{type:"string",title:"registry_name"},registry_name_en:{type:"string",title:"registry_name_en"},vessel_type_main:{type:"string",title:"vessel_type_main"},vessel_type_sub:{type:"string",title:"vessel_type_sub"},message_type:{type:"integer",title:"message_type"}};window.onload=function(){const t=document.querySelector("#app"),e=new W({target:t,props:{visibleColumns:["vessel_name","vessel_type","flag_country","destination","eta","heading","sog","cog"],columns:X,pages:1}});e.$on("change",({detail:t})=>{fetch(`/ais/50/${50*(t-1)}`).then(t=>t.json()).then(({count:t,rows:n})=>{const r=n.map(t=>Object.keys(t).map(e=>t[e]));e.$set({rows:r,pages:Math.ceil(t/50)})}).catch(t=>{console.log(t)})}),e.start()}}();
//# sourceMappingURL=main.js.map
