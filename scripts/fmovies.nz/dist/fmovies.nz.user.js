/* ==UserScript==
// @name         FMovies Subtitle Position Fix
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      0.1.0
// @description  Keeps FMovies subtitles above the bottom edge of the video viewport.
// @author       Lawrence
// @match        https://fmovies.nz/*
// @match        https://www.fmovies.nz/*
// @grant        none
// @run-at       document-start
// ==/UserScript== */


"use strict";(()=>{var o="fmovies-subtitle-position-fix",r=`${o}-styles`,m=750,b=250,u=6.5,p=`
  .bottom-14:has(> .cineby-cue),
  .bottom-40:has(> .cineby-cue),
  div[class*="SubtitleVideoCaption_mobileSubtitleContainer"]:has(> .cineby-cue),
  .${o}-subtitle-container {
    bottom: ${String(u)}rem !important;
    top: auto !important;
    z-index: 2147483646 !important;
    max-height: calc(100% - 112px) !important;
    overflow: visible !important;
  }

  .${o}-subtitle-container .cineby-cue {
    display: inline-block !important;
  }
`,l=location.href,s=0,a=0,i=null;function d(){if(document.getElementById(r))return;let t=document.createElement("style");t.id=r,t.textContent=p,document.head.appendChild(t)}function n(){document.querySelectorAll(".cineby-cue").forEach(t=>{let e=t.parentElement;e&&(e.classList.add(`${o}-subtitle-container`),e.style.setProperty("bottom",`${String(u)}rem`,"important"),e.style.setProperty("top","auto","important"),e.style.setProperty("z-index","2147483646","important"))})}function v(){window.clearInterval(a),a=window.setInterval(n,b),window.clearInterval(s),s=window.setInterval(()=>{location.href!==l&&(l=location.href,d(),n())},m),i?.disconnect(),i=new MutationObserver(n),i.observe(document.documentElement,{childList:!0,subtree:!0})}function c(){d(),n(),v()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c,{once:!0}):c();})();
