!function(){"use strict";function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var e=function(){function e(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.listeners={}}var n,i,s;return n=e,(i=[{key:"addEventListener",value:function(t,e){t in this.listeners||(this.listeners[t]=[]),this.listeners[t].push(e)}},{key:"on",value:function(t,e){return this.addEventListener(t,e),this}},{key:"removeEventListener",value:function(t,e){if(t in this.listeners)for(var n=this.listeners[t],i=0,s=n.length;i<s;i++)if(n[i]===e)return n.splice(i,1),this.removeEventListener(t,e)}},{key:"off",value:function(t,e){return this.removeEventListener(t,e),this}},{key:"dispatchEvent",value:function(t){if(t.type in this.listeners){var e=this.listeners[t.type];Object.defineProperty(t,"target",{enumerable:!1,configurable:!1,writable:!1,value:this});for(var n=0,i=e.length;n<i;n++)e[n].call(this,t)}}}])&&t(n.prototype,i),s&&t(n,s),e}();class n extends e{constructor(t,e){super(),this._container=t,this._options=e||{},this._max=this._options.max||1,this._current=this._options.current||1,this._container.innerHTML=`<div class="pager">\n                <i class="icon fast-backward"></i>\n                <i class="icon backward"></i>\n                <input class="current" type="text" value="${this._current.toString()}">\n                <i class="icon forward"></i>\n                <i class="icon fast-forward"></i>\n            </div>`,this._input=this._container.querySelector(".current"),this._input.addEventListener("change",this.choose.bind(this));const n=this._container.querySelectorAll(".icon");n[0].addEventListener("click",this.start.bind(this)),n[1].addEventListener("click",this.back.bind(this)),n[2].addEventListener("click",this.forward.bind(this)),n[3].addEventListener("click",this.end.bind(this))}get current(){return this._current}set current(t){!isNaN(t)&&1<=t&&t<=this._max&&(this._current=t,this._input.value=this._current.toString(),this._change())}_change(){let t=document.createEvent("Event");t.initEvent("change",!1,!1),t.detail=this.current,this.dispatchEvent(t)}forward(){this.current+=1}back(){this.current-=1}start(){this.current=1}end(){this.current=this._max}choose(){this.current=parseInt(this._input.value,10),this._input.value=this.current.toString()}}class i{constructor(t,e,i){this._container=t,this._options=e||{},this._container.innerHTML='<table class="scanex-school grid">\n                <tr><td class="content"></td></tr>\n                <tr><td class="footer"></td></tr>\n            </table>',this._content=this._container.querySelector(".content"),this._footer=this._container.querySelector(".footer");const s=Object.keys(this._options.columns);this._visibleColumns=[],this._columns=[];for(let t=0;t<s.length;++t){let e=s[t];-1!=this._options.visibleColumns.indexOf(e)&&(this._visibleColumns.push(t),this._columns.push(this._options.columns[e]))}this._current=1,this._pageSize=this._options.pageSize||1,this._pages=this._options.pages||1,this._onChange=i,this._pager=new n(this._footer,{max:this._pages,current:this._current}),this._pager.addEventListener("change",t=>this.page=t.detail),this.page=this._current}get page(){return this._current}set page(t){if(!isNaN(t)&&1<=t&&t<=this._pages&&(this._current=t,"function"==typeof this._onChange)){const e=this._onChange(t,this._pageSize);this._render(e)}}_render(t){Array.isArray(t)&&t.length>0?this._content.innerHTML=`<table>\n                <thead>\n                    <tr>${this._columns.map(({title:t})=>`<th>${t}</th>`).join("")}</tr>\n                </thead>\n                <tbody>\n                ${t.map((t,e)=>`<tr class="${e%2==0?"odd":"even"}">${this._visibleColumns.map(e=>`<td>${t[e]}</td>`).join("")}</tr>`).join("")}\n                </tbody>\n            </table>`:this._content.innerHTML=""}start(){this._pager.start()}forward(){this._pager.forward()}back(){this._pager.back()}end(){this._pager.end()}}window.onload=function(){const t=document.querySelector("#app");let e={pageSize:25,visibleColumns:["VesselID","ObservationID","IcePassage#","RecordMSK","RecordUTC"],columns:COLUMNS};e.pages=Math.ceil(DB.length/e.pageSize);new i(t,e,(t,e)=>{const n=(t-1)*e,i=t*e;return DB.slice(n,i)})}}();
//# sourceMappingURL=main.js.map
