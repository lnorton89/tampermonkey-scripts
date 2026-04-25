/* ==UserScript==
// @name         Example Site Tweaks
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      1.0.0
// @description  Quality of life tweaks for example.com
// @author       lnorton89
// @match        https://example.com/*
// @match        https://www.example.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-idle
// ==UserScript== */


"use strict";(()=>{function a(e,n=5e3){return new Promise((i,l)=>{let d=document.querySelector(e);if(d){i(d);return}let m=setTimeout(()=>{o.disconnect(),l(new Error(`waitForElement: "${e}" not found within ${String(n)}ms`))},n),o=new MutationObserver(()=>{let r=document.querySelector(e);r&&(clearTimeout(m),o.disconnect(),i(r))});o.observe(document.body,{childList:!0,subtree:!0})})}function c(e){if(typeof GM_addStyle<"u"){GM_addStyle(e);return}let n=document.createElement("style");n.textContent=e,document.head.appendChild(n)}var t={info:(...e)=>{console.warn("[example-site]",...e)},warn:(...e)=>{console.warn("[example-site]",...e)},error:(...e)=>{console.error("[example-site]",...e)}};var u=`
  .tm-hidden-ad {
    display: none !important;
  }
  .tm-highlight {
    background: rgba(255, 200, 0, 0.2);
    border-left: 3px solid gold;
    padding-left: 8px;
  }
`;function f(){document.querySelectorAll('[class*="ad-"], [id*="ad-"]').forEach(e=>{e.classList.add("tm-hidden-ad")})}async function w(){try{(await a("main, #content, .main-content")).classList.add("tm-highlight"),t.info("Main content found and tweaked")}catch(e){t.warn("Main content not found:",e)}}function s(){t.info("Script loaded"),c(u),f(),w()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s):s();})();
