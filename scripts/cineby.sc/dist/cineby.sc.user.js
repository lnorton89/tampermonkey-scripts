/* ==UserScript==
// @name         Cineby Enhancer
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      0.1.0
// @description  Adds auto-next playback helpers and ntfy remote controls to Cineby.
// @author       Lawrence
// @match        *://*.cineby.sc/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      ntfy.sh
// @connect      *
// @run-at       document-start
// ==/UserScript== */


"use strict";(()=>{var o="cineby-enhancer",y=`${o}:settings`,C=`${o}:ntfy-active-tab`,z=15e3,G=750,j=/^[A-Za-z0-9_-]{1,64}$/,p=Object.freeze({autoNext:!0,ntfyRemoteEnabled:!1,ntfyServer:"https://ntfy.sh",ntfyTopic:"",ntfyControlTopic:"",ntfyCommandSecret:""}),r={settings:H(),bootstrapped:!1,lastKnownUrl:location.href,tabId:`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,eventSource:null,reconnectTimer:0,claimTimer:0,lastMessageId:"",lastNotificationAt:0,status:"disabled",statusMessage:"",panelOpen:!1};function D(){return typeof GM_getValue=="function"?GM_getValue(y,null):localStorage.getItem(y)}function J(e){let t=JSON.stringify(e);if(typeof GM_setValue=="function"){GM_setValue(y,t);return}localStorage.setItem(y,t)}function L(e){return{autoNext:typeof e.autoNext=="boolean"?e.autoNext:p.autoNext,ntfyRemoteEnabled:typeof e.ntfyRemoteEnabled=="boolean"?e.ntfyRemoteEnabled:p.ntfyRemoteEnabled,ntfyServer:typeof e.ntfyServer=="string"&&e.ntfyServer.trim()?e.ntfyServer.trim().replace(/\/+$/,""):p.ntfyServer,ntfyTopic:typeof e.ntfyTopic=="string"&&e.ntfyTopic.trim()?e.ntfyTopic.trim():p.ntfyTopic,ntfyControlTopic:typeof e.ntfyControlTopic=="string"&&e.ntfyControlTopic.trim()?e.ntfyControlTopic.trim():p.ntfyControlTopic,ntfyCommandSecret:typeof e.ntfyCommandSecret=="string"&&e.ntfyCommandSecret.trim()?e.ntfyCommandSecret.trim():p.ntfyCommandSecret}}function H(){try{return L(JSON.parse(D()||"{}"))}catch(e){return console.warn(`[${o}] Failed to load settings.`,e),{...p}}}function _(e){r.settings=L(e),J(r.settings),m(),me()}function l(e,t=""){r.status=e,r.statusMessage=t,m()}function P(e){if(document.body){e();return}let t=window.setInterval(()=>{document.body&&(window.clearInterval(t),e())},100)}function d(){let e=Array.from(document.querySelectorAll("video")).filter(t=>{let n=t.getBoundingClientRect();return n.width>0&&n.height>0});return e.find(t=>!t.paused&&!t.ended)||e.find(t=>t.readyState>0)||e[0]||null}function K(){let e=d();return e?(e.play(),!0):!1}function X(){let e=d();return e?(e.pause(),!0):!1}function Y(){let e=d();return e?(e.paused?e.play():e.pause(),!0):x(/\b(play|pause)\b/i)}function W(e){let t=d();if(!t||!Number.isFinite(e))return!1;let n=Number.isFinite(t.duration)?t.duration:Number.MAX_SAFE_INTEGER;return t.currentTime=Math.max(0,Math.min(n,t.currentTime+e)),!0}function Z(e){let t=d();return!t||!Number.isFinite(e)?!1:(t.volume=Math.max(0,Math.min(1,e/100)),t.muted=!1,!0)}function I(e){let t=d();return t?(t.muted=!!e,!0):!1}function Q(){if(document.fullscreenElement)return document.exitFullscreen(),!0;let e=d()||document.querySelector("iframe")||document.querySelector('[class*="player" i], [id*="player" i]');return!e||typeof e.requestFullscreen!="function"?!1:(e.requestFullscreen(),!0)}function ee(e){return`${e.textContent||""} ${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ")}function te(e){if(!e||typeof e.getBoundingClientRect!="function")return!1;let t=e.getBoundingClientRect(),n=window.getComputedStyle(e);return t.width>0&&t.height>0&&n.display!=="none"&&n.visibility!=="hidden"&&n.opacity!=="0"}function x(e){let t=Array.from(document.querySelectorAll('button, a, [role="button"], [aria-label], [title]')).find(n=>te(n)&&e.test(ee(n)));return t?(t.click(),!0):!1}function E(e){try{let t=new URL(e,location.origin),n=t.pathname.split("/").filter(Boolean),i=n.findIndex(c=>c==="tv");if(i<0)return null;let a=Number(n[i+1]),u=Number(n[i+2]),s=Number(n[i+3]);return!a||!u||!s?null:{href:t.href,localePrefix:n.slice(0,i),id:a,season:u,episode:s}}catch{return null}}function ne(e,t,n){let i=[...e.localePrefix,"tv",String(e.id),String(t),String(n)],a=new URL(`/${i.join("/")}`,location.origin);return a.searchParams.set("play","true"),a.href}function re(e){return Array.from(document.querySelectorAll('a[href*="/tv/"]')).map(n=>E(n.getAttribute("href"))).filter(n=>!n||n.id!==e.id?!1:n.season>e.season?!0:n.season===e.season&&n.episode>e.episode).sort((n,i)=>n.season-i.season||n.episode-i.episode)[0]?.href||""}function N(){let e=E(location.href);return e?(x(/\b(next|next episode|episode next)\b/i)||x(/\b(skip)\b/i)||(location.href=re(e)||ne(e,e.season,e.episode+1)),!0):!1}function oe(e){!e||e._cinebyEnhancerAttached||(e._cinebyEnhancerAttached=!0,e.addEventListener("play",()=>f("play")),e.addEventListener("pause",()=>f("pause")),e.addEventListener("ended",()=>{f("ended"),r.settings.autoNext&&window.setTimeout(N,900)}))}function w(){document.querySelectorAll("video").forEach(oe)}function ie(){P(()=>{w(),new MutationObserver(w).observe(document.body,{childList:!0,subtree:!0})})}function k(e){return String(e||"").trim().replace(/^\/+|\/+$/g,"")}function $(e){return j.test(k(e))}function g(){return k(r.settings.ntfyTopic)}function v(){return k(r.settings.ntfyControlTopic)||(g()?`${g()}-controls`:"")}function O(){let e=g(),t=v();return $(e)?$(t)?"":"Add a valid control topic.":"Add a valid display topic."}function F(){return String(r.settings.ntfyServer||p.ntfyServer).replace(/\/+$/,"")}function q(e){return`${F()}/${encodeURIComponent(e)}`}function ae(){let e=v();if(!e||!$(e))return"";let t=new URL(`${q(e)}/sse`);return t.searchParams.set("since",String(Math.floor(Date.now()/1e3))),t.href}function V(){try{let e=JSON.parse(localStorage.getItem(C)||"null");return e&&typeof e=="object"?e:null}catch{return null}}function B(){let e=V();return!e||!e.tabId||e.tabId===r.tabId?!0:Date.now()-Number(e.updatedAt||0)>z}function h(e="activity"){if(!r.settings.ntfyRemoteEnabled||document.visibilityState==="hidden")return!1;try{localStorage.setItem(C,JSON.stringify({tabId:r.tabId,href:location.href,title:U(),updatedAt:Date.now()}))}catch(t){console.warn(`[${o}] Failed to claim ntfy remote tab.`,t)}return l("connected",`This tab owns remote (${e}).`),!0}function T(){V()?.tabId===r.tabId&&localStorage.removeItem(C)}function ce(e){let t=String(r.settings.ntfyCommandSecret||"").trim();return t?`${t} ${e}`:e}function b(e,t){return{action:"http",label:e,url:q(v()),method:"POST",body:ce(t),clear:!1}}function U(){let e=E(location.href),t=document.querySelector("h1")?.textContent||document.querySelector('[class*="title" i]')?.textContent||document.querySelector('meta[property="og:title"]')?.getAttribute("content")||document.title||"Cineby",n=String(t).replace(/\s+/g," ").trim()||"Cineby";return e?`${n} - S${String(e.season).padStart(2,"0")}E${String(e.episode).padStart(2,"0")}`:n}function se(){let e=d(),t=document.querySelector('meta[property="og:image"]')?.getAttribute("content"),n=document.querySelector('img[src*="image.tmdb"], img[src*="wsrv.nl"]')?.getAttribute("src");try{return new URL(e?.getAttribute("poster")||t||n||"",location.origin).href}catch{return""}}function le(e,t,n="POST"){let i=JSON.stringify(t);return fetch(e,{method:n,body:i,headers:{"Content-Type":"application/json"}}).catch(a=>{if(typeof GM_xmlhttpRequest!="function")throw a;return new Promise((u,s)=>{GM_xmlhttpRequest({method:n,url:e,data:i,headers:{"Content-Type":"application/json"},onload(c){c.status>=200&&c.status<300?u(c):s(new Error(`ntfy request failed with HTTP ${c.status}`))},onerror:s})})})}function f(e="update"){if(!r.settings.ntfyRemoteEnabled||!h(e))return!1;let t=g(),n=v();if(!t||!n||O())return!1;let i=d(),a={topic:t,title:i?.paused?"Paused on Cineby":"Playing on Cineby",message:U(),tags:["tv"],priority:3,sequence_id:`${o}-player`,click:location.href,attach:se()||void 0,actions:[b("Play/Pause","toggle"),b("Next","next"),b("-30s","seek -30"),b("+30s","seek 30"),b("Fullscreen","fullscreen")]};return r.lastNotificationAt=Date.now(),le(F(),a).then(()=>l("connected",`Updated ntfy notification (${e}).`)).catch(u=>{console.warn(`[${o}] Failed to publish ntfy notification.`,u),l("error","Could not publish ntfy notification.")}),!0}function ue(e){let t=String(r.settings.ntfyCommandSecret||"").trim();if(t&&e.secret!==t)return null;let n=String(e.command||e.action||"").trim().toLowerCase();if(!n)return null;if(n==="seek"){let i=Number(e.seconds??e.by??e.value);return Number.isFinite(i)?{command:n,seconds:i}:null}if(n==="volume"){let i=Number(e.percent??e.value);return Number.isFinite(i)?{command:n,percent:i}:null}return{command:n}}function de(e){let t=String(e||"").trim();if(!t)return null;try{let c=JSON.parse(t);if(c&&typeof c=="object")return ue(c)}catch{}let n=String(r.settings.ntfyCommandSecret||"").trim(),i=t;if(n){if(i!==n&&!i.startsWith(`${n} `))return null;i=i.slice(n.length).trim()}let[a="",u=""]=i.split(/\s+/,2),s=a.toLowerCase();if(s==="seek"){let c=Number(u);return Number.isFinite(c)?{command:s,seconds:c}:null}if(s==="volume"){let c=Number(u);return Number.isFinite(c)?{command:s,percent:c}:null}return{command:s}}function pe(e){switch(e.command){case"play":return K();case"pause":return X();case"toggle":case"playpause":case"play-pause":return Y();case"seek":return W(e.seconds);case"fullscreen":case"fs":return Q();case"next":return N();case"mute":return I(!0);case"unmute":return I(!1);case"volume":return Z(e.percent);default:return!1}}function fe(e){let t=null;try{t=JSON.parse(e.data||"{}")}catch(a){console.warn(`[${o}] Failed to parse ntfy event.`,a);return}if(!t||t.event!=="message"||!t.message||t.id&&t.id===r.lastMessageId)return;if(r.lastMessageId=t.id||"",document.visibilityState==="hidden"||!B()){l("connected","Another visible Cineby tab owns the remote.");return}let n=de(t.message);if(!n){l("connected","Ignored ntfy message.");return}let i=pe(n);i&&window.setTimeout(()=>f(n.command),150),l("connected",i?`Ran: ${n.command}`:`No player handled: ${n.command}`)}function R(){window.clearTimeout(r.reconnectTimer),r.reconnectTimer=0,r.eventSource&&(r.eventSource.close(),r.eventSource=null),r.claimTimer&&(window.clearInterval(r.claimTimer),r.claimTimer=0),T(),l("disabled","")}function A(){if(window.clearTimeout(r.reconnectTimer),r.reconnectTimer=0,!r.settings.ntfyRemoteEnabled)return R(),!1;let e=ae();return e?(r.eventSource&&r.eventSource.close(),r.claimTimer||(r.claimTimer=window.setInterval(()=>{B()&&h("refresh")},5e3)),l("connecting","Connecting to ntfy."),r.eventSource=new EventSource(e),r.eventSource.onopen=()=>l("connected","Connected to ntfy."),r.eventSource.onmessage=fe,r.eventSource.onerror=()=>{l("error","ntfy connection lost. Reconnecting soon."),r.eventSource&&(r.eventSource.close(),r.eventSource=null),r.reconnectTimer=window.setTimeout(A,5e3)},!0):(R(),l("disabled",O()||"Add an ntfy topic."),!1)}function me(){return r.eventSource&&(r.eventSource.close(),r.eventSource=null),A()}function be(){if(document.getElementById(`${o}-style`))return;let e=document.createElement("style");e.id=`${o}-style`,e.textContent=`
    #${o}-panel {
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

    #${o}-launcher {
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

    #${o}-launcher:hover,
    #${o}-launcher:focus-visible {
      background: rgba(255, 255, 255, 0.1);
      outline: none;
    }

    #${o}-launcher svg {
      width: 26px;
      height: 26px;
      display: block;
      stroke-width: 2.2;
    }

    #${o}-panel button,
    #${o}-panel input {
      font: inherit;
    }

    .${o}-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .${o}-title {
      margin: 0;
      font-weight: 750;
      font-size: 13px;
    }

    .${o}-body {
      display: grid;
      gap: 10px;
      padding: 12px;
    }

    .${o}-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .${o}-label {
      display: grid;
      gap: 3px;
      min-width: 0;
    }

    .${o}-label strong {
      font-size: 12px;
    }

    .${o}-label span,
    .${o}-status {
      color: #aeb7c8;
      font-size: 11px;
    }

    .${o}-input {
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

    .${o}-input:focus {
      border-color: rgba(96, 165, 250, 0.75);
    }

    .${o}-button {
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 6px;
      padding: 7px 9px;
      background: rgba(255, 255, 255, 0.07);
      color: #f8fafc;
      cursor: pointer;
    }

    .${o}-button:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .${o}-icon-button {
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      padding: 0;
    }

    .${o}-icon-button svg {
      width: 18px;
      height: 18px;
      display: block;
    }

    .${o}-switch {
      position: relative;
      width: 40px;
      height: 22px;
      flex: 0 0 auto;
    }

    .${o}-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .${o}-slider {
      position: absolute;
      inset: 0;
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.28);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .${o}-slider::before {
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

    .${o}-switch input:checked + .${o}-slider {
      background: #2563eb;
    }

    .${o}-switch input:checked + .${o}-slider::before {
      transform: translateX(18px);
    }
  `,document.head.appendChild(e)}function M(e,t,n){let i=document.createElement("label");return i.className=`${o}-row`,i.innerHTML=`
    <span class="${o}-label">
      <strong>${t}</strong>
      <span>${n}</span>
    </span>
    <span class="${o}-switch">
      <input type="checkbox" ${r.settings[e]?"checked":""}>
      <span class="${o}-slider"></span>
    </span>
  `,i.querySelector("input").addEventListener("change",a=>{_({...r.settings,[e]:a.currentTarget.checked})}),i}function S(e,t,n="text"){let i=document.createElement("input");return i.className=`${o}-input`,i.type=n,i.placeholder=t,i.value=r.settings[e]||"",i.addEventListener("change",()=>{_({...r.settings,[e]:i.value})}),i}function m(){if(!document.body)return;be(),document.getElementById(`${o}-launcher`)?.remove(),document.getElementById(`${o}-panel`)?.remove();let e=document.createElement("button");if(e.id=`${o}-launcher`,e.type="button",e.title=r.panelOpen?"Hide Cineby settings":"Show Cineby settings",e.setAttribute("aria-label",e.title),e.innerHTML=r.panelOpen?`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6 6 18" fill="none" stroke="currentColor" stroke-linecap="round" />
        <path d="m6 6 12 12" fill="none" stroke="currentColor" stroke-linecap="round" />
      </svg>
    `:`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 6 9 12l6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `,e.addEventListener("click",()=>{r.panelOpen=!r.panelOpen,m()}),document.body.appendChild(e),!r.panelOpen)return;let t=document.createElement("section");t.id=`${o}-panel`;let n=document.createElement("div");n.className=`${o}-head`,n.innerHTML=`
    <p class="${o}-title">Cineby</p>
    <button type="button" class="${o}-button ${o}-icon-button" title="Close" aria-label="Close Cineby settings">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6 6 18" fill="none" stroke="currentColor" stroke-linecap="round" />
        <path d="m6 6 12 12" fill="none" stroke="currentColor" stroke-linecap="round" />
      </svg>
    </button>
  `,n.querySelector("button").addEventListener("click",()=>{r.panelOpen=!1,m()});let i=document.createElement("div");i.className=`${o}-body`,i.appendChild(M("autoNext","Auto next","Go to the next episode when playback ends.")),i.appendChild(M("ntfyRemoteEnabled","ntfy remote","Publish player notifications and accept commands.")),i.appendChild(S("ntfyTopic","Display topic")),i.appendChild(S("ntfyControlTopic","Control topic (defaults to display-controls)")),i.appendChild(S("ntfyCommandSecret","Optional command secret","password"));let a=document.createElement("div");a.className=`${o}-row`,a.innerHTML=`
    <button type="button" class="${o}-button">Notify</button>
    <button type="button" class="${o}-button">Next</button>
    <span class="${o}-status">${r.status}${r.statusMessage?`: ${r.statusMessage}`:""}</span>
  `,a.children[0].addEventListener("click",()=>f("manual")),a.children[1].addEventListener("click",N),i.appendChild(a),t.appendChild(n),t.appendChild(i),document.body.appendChild(t)}function ye(){window.setInterval(()=>{location.href!==r.lastKnownUrl&&(r.lastKnownUrl=location.href,w(),m(),r.settings.ntfyRemoteEnabled&&window.setTimeout(()=>f("navigation"),500))},G)}function ge(){window.addEventListener("focus",()=>h("focus")),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"?h("visible"):T()}),window.addEventListener("pagehide",T)}function he(){r.bootstrapped||(r.bootstrapped=!0,ie(),ye(),ge(),P(()=>{m(),A(),window.setTimeout(()=>f("ready"),1500)}))}he();})();
