// ==UserScript==
// @name         Cineby Enhancer
// @version      0.1.0.202611032316
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @description  Adds auto-next playback helpers and ntfy remote controls to Cineby.
// @author       Lawrence
// @match        *://*.cineby.sc/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      ntfy.sh
// @connect      *
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/cineby.sc/dist/cineby.sc.user.js
// @downloadURL  https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/cineby.sc/dist/cineby.sc.user.js
// ==/UserScript==

"use strict";(()=>{function $(e){let t=document.body;if(t){e(t);return}let n=window.setInterval(()=>{let o=document.body;o&&(window.clearInterval(n),e(o))},50)}function H(e){if(!e||typeof e.getBoundingClientRect!="function")return!1;let t=e.getBoundingClientRect();return t.width>0&&t.height>0}function Re(e){if(!H(e))return!1;let t=window.getComputedStyle(e);return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Me(e){return[e.textContent??"",e.getAttribute("aria-label")??"",e.getAttribute("title")??""].join(" ").replace(/\s+/g," ").trim()}function T(e,t=document){let n=Array.from(t.querySelectorAll('button, a, [role="button"], [aria-label], [title]')).find(o=>Re(o)&&e.test(Me(o)));return n?(n.click(),!0):!1}function Z(e,t){let n=document.getElementById(e);if(n instanceof HTMLStyleElement)return n;let o=document.createElement("style");return o.id=e,o.textContent=t,(document.head??document.documentElement).appendChild(o),o}function C(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Q(e){return C(e)?e:{}}function F(e,t){return typeof e=="boolean"?e:t}function v(e,t){return typeof e=="string"&&e.trim()?e.trim():t}var Le="https://ntfy.sh",Ie=/^[A-Za-z0-9_-]{1,64}$/;function M(e){return(typeof e=="string"?e:"").trim().replace(/^\/+|\/+$/g,"")}function q(e){return Ie.test(M(e))}function ee(e,t){let n=M(e);return n?n.length>64?`${t} topic must be 64 characters or fewer.`:`${t} topic can only use letters, numbers, hyphens, and underscores.`:`${t} topic is required.`}function L(e){return(e.server.trim()||Le).replace(/\/+$/,"")}function I(e){return M(e.topic)}function E(e){let t=M(e.controlTopic);if(t)return t;let n=I(e);return n?`${n}-controls`:""}function K(e){let t=I(e);if(!q(t))return ee(t,"Display");let n=E(e);return q(n)?"":ee(n,"Control")}function Ae(e,t){return`${L(e)}/${encodeURIComponent(t)}`}function Pe(e,t=Date.now()){let n=E(e);if(!q(n))return"";let o=new URL(`${L(e)}/${encodeURIComponent(n)}/sse`);return o.searchParams.set("since",String(Math.floor(t/1e3))),o.toString()}function Oe(e,t){let n=e.secret.trim();return n?`${n} ${t}`:t}function h(e,t,n){return{action:"http",label:t,url:Ae(e,E(e)),method:"POST",body:Oe(e,n),clear:!1}}function R(e,t,n){let o=Number(n);return Number.isFinite(o)?{command:e,[t]:o}:null}function _e(e,t){if(t&&e.secret!==t)return null;let n=e.command??e.action??"",o=(typeof n=="string"?n:"").trim().toLowerCase();return o?o==="seek"?R(o,"seconds",e.seconds??e.by??e.value):o==="volume"?R(o,"percent",e.percent??e.value):{command:o}:null}function Ue(e,t){let n=(typeof e=="string"?e:"").trim();if(!n)return null;let o=t.trim();try{let u=JSON.parse(n);if(C(u))return _e(u,o)}catch{}let i=n;if(o){if(i!==o&&!i.startsWith(`${o} `))return null;i=i.slice(o.length).trim()}let[s="",l=""]=i.split(/\s+/,2),c=s.toLowerCase();return c==="seek"?R(c,"seconds",l):c==="volume"?R(c,"percent",l):{command:c}}function Be(e,t){switch(e.command){case"play":return t.play();case"pause":return t.pause();case"toggle":case"playpause":case"play-pause":return t.toggle();case"seek":return e.seconds!==void 0&&t.seekBy(e.seconds);case"fullscreen":case"fs":return t.fullscreen();case"next":return t.next();case"mute":return t.setMuted(!0);case"unmute":return t.setMuted(!1);case"volume":return e.percent!==void 0&&t.setVolume(e.percent);default:return!1}}async function te(e,t,n="POST"){let o=JSON.stringify(t),i={"Content-Type":"application/json"};try{let s=await fetch(e,{method:n,body:o,headers:i});if(!s.ok)throw new Error(`ntfy request failed with HTTP ${String(s.status)}`)}catch(s){if(typeof GM_xmlhttpRequest!="function")throw s;await new Promise((l,c)=>{GM_xmlhttpRequest({method:n,url:e,data:o,headers:i,onload(u){if(u.status>=200&&u.status<300){l();return}c(new Error(`ntfy request failed with HTTP ${String(u.status)}`))},onerror(){c(new Error("ntfy request failed"))}})})}}function Ve(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function He(e,t,n=Ve()){function o(){try{let i=JSON.parse(localStorage.getItem(e)??"null");return C(i)?i:null}catch{return null}}return{tabId:n,read:o,isCurrent(i=Date.now()){let s=o();return!s?.tabId||s.tabId===n?!0:i-Number(s.updatedAt??0)>t},write(i){let s={tabId:n,href:location.href,title:i,updatedAt:Date.now()};localStorage.setItem(e,JSON.stringify(s))},clear(){o()?.tabId===n&&localStorage.removeItem(e)}}}var Fe=5e3,qe=5e3,Ke=5e3;function ne(e){let t=He(e.tabClaimKey,e.tabClaimTtlMs??15e3),n=null,o=0,i=0,s="",l=0,c=!1,u=()=>document.visibilityState!=="hidden",Y=()=>e.canClaim?.()??!0;function W(){try{t.write(e.getTitle())}catch(d){console.warn(`[${e.scriptId}] Failed to claim ntfy remote tab.`,d)}}function U(d="activity"){return!e.getConfig().enabled||!u()||!Y()?!1:(W(),e.onStatus("connected",`This tab controls the remote (${d}).`),!0)}function N(){t.clear()}function Ne(){e.getConfig().enabled&&t.isCurrent()&&u()&&Y()&&W()}function ke(){c||(c=!0,window.addEventListener("focus",()=>U("focus")),document.addEventListener("visibilitychange",()=>{u()?U("visible"):N()}),window.addEventListener("pagehide",N))}function $e(d){let p;try{p=JSON.parse(typeof d.data=="string"?d.data:"{}")}catch(x){console.warn(`[${e.scriptId}] Failed to parse ntfy event.`,x);return}if(!C(p)||p.event!=="message"||typeof p.message!="string")return;let m=typeof p.id=="string"?p.id:"";if(m&&m===s)return;if(s=m,!u()||!t.isCurrent()){let x=Date.now();x-l>Ke&&(l=x,e.onStatus("connected",`Another visible ${e.siteName} tab owns the remote.`));return}let w=Ue(p.message,e.getConfig().secret);if(!w){e.onStatus("connected","Ignored ntfy message.");return}let X=Be(w,e.handlers);if(X&&e.onCommandHandled){let x=e.onCommandHandled;window.setTimeout(()=>{x(w)},150)}e.onStatus("connected",X?`Ran remote command: ${w.command}`:`No player handled: ${w.command}`)}function k(){n&&(n.close(),n=null)}function B(){window.clearTimeout(o),o=0,k(),i&&(window.clearInterval(i),i=0),N(),e.onStatus("disabled","")}function V(){window.clearTimeout(o),o=0;let d=e.getConfig();if(!d.enabled)return B(),!1;let p=Pe(d);if(!p)return B(),e.onStatus("disabled",K(d)||"Add an ntfy topic to enable remote control."),!1;k(),i||(i=window.setInterval(Ne,qe)),ke(),e.onStatus("connecting","Connecting to ntfy.");let m=new EventSource(p);return n=m,m.onopen=()=>{e.onStatus("connected","Connected to ntfy.")},m.onmessage=$e,m.onerror=()=>{e.onStatus("error","ntfy connection lost. Reconnecting soon."),k(),o=window.setTimeout(V,Fe)},!0}return{tabId:t.tabId,start:V,stop:B,restart(){return k(),V()},claim:U,release:N,isCurrentTab:()=>t.isCurrent()}}function A(){return typeof GM_getValue=="function"&&typeof GM_setValue=="function"}function De(e){try{return localStorage.getItem(e)}catch{return null}}function oe(e){if(A()){let n=GM_getValue(e,null);if(typeof n=="string")return n}let t=De(e);return t!==null&&A()&&GM_setValue(e,t),t}function re(e,t){A()&&GM_setValue(e,t);try{t===null?localStorage.removeItem(e):localStorage.setItem(e,t)}catch(n){if(!A())throw n}}function ze(e,t){let n={};for(let[o,i]of Object.entries(t)){let s=e[o];n[o]=typeof s==typeof i?s:i}return n}function ie(e){let{scriptId:t,storageKey:n,defaults:o}=e,i=e.normalize??ze;function s(l){return i(Q(l),o)}return{normalize:s,load(){try{return s(JSON.parse(oe(n)||"{}"))}catch(l){return console.warn(`[${t}] Failed to load saved settings.`,l),{...o}}},persist(l){try{re(n,JSON.stringify(l))}catch(c){console.warn(`[${t}] Failed to save settings.`,c)}}}}function y(e){let t=e?Array.from(e.querySelectorAll("video")):[],n=Array.from(document.querySelectorAll("video")),o=[...new Set([...t,...n])].filter(i=>H(i));return o.find(i=>!i.paused&&!i.ended)??o.find(i=>i.readyState>0)??o[0]??null}function se(e){e.play().catch(()=>{})}function ae(e){return{play(){let t=e();return t?(se(t),!0):!1},pause(){let t=e();return t?(t.pause(),!0):!1},toggle(){let t=e();return t?(t.paused?se(t):t.pause(),!0):!1},seekBy(t){let n=e();if(!n||!Number.isFinite(t))return!1;let o=Number.isFinite(n.duration)?n.duration:Number.MAX_SAFE_INTEGER;return n.currentTime=Math.max(0,Math.min(o,n.currentTime+t)),!0},setVolume(t){let n=e();return!n||!Number.isFinite(t)?!1:(n.volume=Math.max(0,Math.min(1,t/100)),n.muted=!1,!0)},setMuted(t){let n=e();return n?(n.muted=t,!0):!1}}}var r="cineby-enhancer",le=`${r}:settings`,ce=`${r}:ntfy-active-tab`,ue=15e3,de=750,pe=Object.freeze({autoNext:!0,ntfyRemoteEnabled:!1,ntfyServer:"https://ntfy.sh",ntfyTopic:"",ntfyControlTopic:"",ntfyCommandSecret:""});var D=ie({scriptId:r,storageKey:le,defaults:pe,normalize:(e,t)=>({autoNext:F(e.autoNext,t.autoNext),ntfyRemoteEnabled:F(e.ntfyRemoteEnabled,t.ntfyRemoteEnabled),ntfyServer:v(e.ntfyServer,t.ntfyServer).replace(/\/+$/,""),ntfyTopic:v(e.ntfyTopic,t.ntfyTopic),ntfyControlTopic:v(e.ntfyControlTopic,t.ntfyControlTopic),ntfyCommandSecret:v(e.ntfyCommandSecret,t.ntfyCommandSecret)})});function fe(e){return D.normalize(e)}function me(){return D.load()}function ge(e){D.persist(e)}var a={settings:me(),bootstrapped:!1,lastKnownUrl:location.href,lastNotificationAt:0,status:"disabled",statusMessage:"",panelOpen:!1};function P(e){try{let t=new URL(String(e),location.origin),n=t.pathname.split("/").filter(Boolean),o=n.findIndex(c=>c==="tv");if(o<0)return null;let i=Number(n[o+1]),s=Number(n[o+2]),l=Number(n[o+3]);return!i||!s||!l?null:{href:t.href,localePrefix:n.slice(0,o),id:i,season:s,episode:l}}catch{return null}}function Ge(e,t,n){let o=[...e.localePrefix,"tv",String(e.id),String(t),String(n)],i=new URL(`/${o.join("/")}`,location.origin);return i.searchParams.set("play","true"),i.href}function Je(e){return Array.from(document.querySelectorAll('a[href*="/tv/"]')).map(n=>P(n.getAttribute("href"))).filter(n=>n?.id!==e.id?!1:n.season>e.season?!0:n.season===e.season&&n.episode>e.episode).sort((n,o)=>n.season-o.season||n.episode-o.episode)[0]?.href||""}function S(){let e=P(location.href);return e?(T(/\b(next|next episode|episode next)\b/i)||T(/\b(skip)\b/i)||(location.href=Je(e)||Ge(e,e.season,e.episode+1)),!0):!1}function z(e){a.settings=fe(e),ge(a.settings),g(),ye()}function be(){Z(`${r}-style`,`
      #${r}-panel {
        position: fixed;
        right: 16px;
        top: 68px;
        z-index: 2147483647;
        width: min(330px, calc(100vw - 32px));
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 8px;
        background: rgba(9, 12, 18, 0.92);
        color: #f8fafc;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.42);
        font: 13px/1.35 Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        backdrop-filter: blur(18px);
      }
  
      #${r}-launcher {
        position: fixed;
        top: 18px;
        right: 22px;
        z-index: 2147483647;
        display: grid;
        place-items: center;
        width: 38px;
        height: 38px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: rgba(255, 255, 255, 0.92);
        cursor: pointer;
        padding: 0;
      }
  
      #${r}-launcher:hover,
      #${r}-launcher:focus-visible {
        background: rgba(255, 255, 255, 0.1);
        outline: none;
      }
  
      #${r}-launcher svg {
        width: 26px;
        height: 26px;
        display: block;
        stroke-width: 2.2;
      }
  
      #${r}-panel button,
      #${r}-panel input {
        font: inherit;
      }
  
      .${r}-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
  
      .${r}-title {
        margin: 0;
        font-weight: 750;
        font-size: 13px;
      }
  
      .${r}-body {
        display: grid;
        gap: 10px;
        padding: 12px;
      }
  
      .${r}-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
  
      .${r}-label {
        display: grid;
        gap: 3px;
        min-width: 0;
      }
  
      .${r}-label strong {
        font-size: 12px;
      }
  
      .${r}-label span,
      .${r}-status {
        color: #aeb7c8;
        font-size: 11px;
      }
  
      .${r}-input {
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 6px;
        padding: 7px 8px;
        background: rgba(255, 255, 255, 0.06);
        color: #f8fafc;
        outline: none;
      }
  
      .${r}-input:focus {
        border-color: rgba(96, 165, 250, 0.75);
      }
  
      .${r}-button {
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 6px;
        padding: 7px 9px;
        background: rgba(255, 255, 255, 0.07);
        color: #f8fafc;
        cursor: pointer;
      }
  
      .${r}-button:hover {
        background: rgba(255, 255, 255, 0.12);
      }
  
      .${r}-icon-button {
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        padding: 0;
      }
  
      .${r}-icon-button svg {
        width: 18px;
        height: 18px;
        display: block;
      }
  
      .${r}-switch {
        position: relative;
        width: 40px;
        height: 22px;
        flex: 0 0 auto;
      }
  
      .${r}-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
  
      .${r}-slider {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        background: rgba(148, 163, 184, 0.28);
        cursor: pointer;
        transition: background 0.15s ease;
      }
  
      .${r}-slider::before {
        content: "";
        position: absolute;
        width: 18px;
        height: 18px;
        left: 2px;
        top: 2px;
        border-radius: 999px;
        background: #fff;
        transition: transform 0.15s ease;
      }
  
      .${r}-switch input:checked + .${r}-slider {
        background: #2563eb;
      }
  
      .${r}-switch input:checked + .${r}-slider::before {
        transform: translateX(18px);
      }
    `)}function O(e,t=""){a.status=e,a.statusMessage=t,g()}function xe(e,t,n){let o=document.createElement("label");o.className=`${r}-row`,o.innerHTML=`
    <span class="${r}-label">
      <strong>${t}</strong>
      <span>${n}</span>
    </span>
    <span class="${r}-switch">
      <input type="checkbox" ${a.settings[e]?"checked":""}>
      <span class="${r}-slider"></span>
    </span>
  `;let i=o.querySelector("input");return i.addEventListener("change",()=>{z({...a.settings,[e]:i.checked})}),o}function G(e,t,n="text"){let o=document.createElement("input");return o.className=`${r}-input`,o.type=n,o.placeholder=t,o.value=a.settings[e]||"",o.addEventListener("change",()=>{z({...a.settings,[e]:o.value})}),o}function g(){let e=document.body;if(!e)return;be(),document.getElementById(`${r}-launcher`)?.remove(),document.getElementById(`${r}-panel`)?.remove();let t=document.createElement("button");if(t.id=`${r}-launcher`,t.type="button",t.title=a.panelOpen?"Hide Cineby settings":"Show Cineby settings",t.setAttribute("aria-label",t.title),t.innerHTML=a.panelOpen?`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6 6 18" fill="none" stroke="currentColor" stroke-linecap="round" />
        <path d="m6 6 12 12" fill="none" stroke="currentColor" stroke-linecap="round" />
      </svg>
    `:`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 6 9 12l6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `,t.addEventListener("click",()=>{a.panelOpen=!a.panelOpen,g()}),e.appendChild(t),!a.panelOpen)return;let n=document.createElement("section");n.id=`${r}-panel`;let o=document.createElement("div");o.className=`${r}-head`,o.innerHTML=`
    <p class="${r}-title">Cineby</p>
    <button type="button" class="${r}-button ${r}-icon-button" title="Close" aria-label="Close Cineby settings">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6 6 18" fill="none" stroke="currentColor" stroke-linecap="round" />
        <path d="m6 6 12 12" fill="none" stroke="currentColor" stroke-linecap="round" />
      </svg>
    </button>
  `,o.querySelector("button").addEventListener("click",()=>{a.panelOpen=!1,g()});let i=document.createElement("div");i.className=`${r}-body`,i.appendChild(xe("autoNext","Auto next","Go to the next episode when playback ends.")),i.appendChild(xe("ntfyRemoteEnabled","ntfy remote","Publish player notifications and accept commands.")),i.appendChild(G("ntfyTopic","Display topic")),i.appendChild(G("ntfyControlTopic","Control topic (defaults to display-controls)")),i.appendChild(G("ntfyCommandSecret","Optional command secret","password"));let s=document.createElement("div");s.className=`${r}-row`,s.innerHTML=`
    <button type="button" class="${r}-button">Notify</button>
    <button type="button" class="${r}-button">Next</button>
    <span class="${r}-status">${a.status}${a.statusMessage?`: ${a.statusMessage}`:""}</span>
  `;let[l,c]=Array.from(s.querySelectorAll("button"));l?.addEventListener("click",()=>f("manual")),c?.addEventListener("click",()=>S()),i.appendChild(s),n.appendChild(o),n.appendChild(i),e.appendChild(n)}function he(){let{settings:e}=a;return{enabled:e.ntfyRemoteEnabled,server:e.ntfyServer,topic:e.ntfyTopic,controlTopic:e.ntfyControlTopic,secret:e.ntfyCommandSecret}}var J=ne({scriptId:r,siteName:"Cineby",tabClaimKey:ce,tabClaimTtlMs:ue,getConfig:he,getTitle:()=>j(),handlers:{play:()=>b.play(),pause:()=>b.pause(),toggle:()=>we(),seekBy:e=>b.seekBy(e),fullscreen:()=>Te(),next:()=>S(),setMuted:e=>b.setMuted(e),setVolume:e=>b.setVolume(e)},onStatus:(e,t)=>{O(e,t)},onCommandHandled:e=>{f(e.command)}});function Se(){return J.start()}function ye(){return J.restart()}function f(e="update"){let t=he();if(!t.enabled||!J.claim(e))return!1;let n=I(t),o=E(t);if(!n||!o||K(t))return!1;let i=y(),s={topic:n,title:i?.paused?"Paused on Cineby":"Playing on Cineby",message:j(),tags:["tv"],priority:3,sequence_id:`${r}-player`,click:location.href,attach:Ce()||void 0,actions:[h(t,"Play/Pause","toggle"),h(t,"Next","next"),h(t,"-30s","seek -30"),h(t,"+30s","seek 30"),h(t,"Fullscreen","fullscreen")]};return a.lastNotificationAt=Date.now(),te(L(t),s).then(()=>{O("connected",`Updated ntfy notification (${e}).`)}).catch(l=>{console.warn(`[${r}] Failed to publish ntfy notification.`,l),O("error","Could not publish ntfy notification.")}),!0}var b=ae(()=>y());function we(){return y()?b.toggle():T(/\b(play|pause)\b/i)}function Te(){if(document.fullscreenElement)return document.exitFullscreen(),!0;let e=y()||document.querySelector("iframe")||document.querySelector('[class*="player" i], [id*="player" i]');return!e||typeof e.requestFullscreen!="function"?!1:(e.requestFullscreen(),!0)}function j(){let e=P(location.href),n=(document.querySelector("h1")?.textContent||document.querySelector('[class*="title" i]')?.textContent||document.querySelector('meta[property="og:title"]')?.getAttribute("content")||document.title||"Cineby").replace(/\s+/g," ").trim()||"Cineby";return e?`${n} - S${String(e.season).padStart(2,"0")}E${String(e.episode).padStart(2,"0")}`:n}function Ce(){let e=y(),t=document.querySelector('meta[property="og:image"]')?.getAttribute("content"),n=document.querySelector('img[src*="image.tmdb"], img[src*="wsrv.nl"]')?.getAttribute("src");try{return new URL(e?.getAttribute("poster")||t||n||"",location.origin).href}catch{return""}}var ve=new WeakSet;function je(e){ve.has(e)||(ve.add(e),e.addEventListener("play",()=>f("play")),e.addEventListener("pause",()=>f("pause")),e.addEventListener("ended",()=>{f("ended"),a.settings.autoNext&&window.setTimeout(S,900)}))}function _(){document.querySelectorAll("video").forEach(je)}function Ee(){$(e=>{_(),new MutationObserver(_).observe(e,{childList:!0,subtree:!0})})}function Ye(){window.setInterval(()=>{location.href!==a.lastKnownUrl&&(a.lastKnownUrl=location.href,_(),g(),a.settings.ntfyRemoteEnabled&&window.setTimeout(()=>f("navigation"),500))},de)}function We(){a.bootstrapped||(a.bootstrapped=!0,Ee(),Ye(),$(()=>{g(),Se(),window.setTimeout(()=>f("ready"),1500)}))}We();})();
