// ==UserScript==
// @name         FMovies Subtitle Position Fix
// @version      0.1.0.202611032312
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @description  Keeps FMovies subtitles above the bottom edge of the video viewport.
// @author       Lawrence
// @match        https://fmovies.nz/*
// @match        https://www.fmovies.nz/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/fmovies.nz/dist/fmovies.nz.user.js
// @downloadURL  https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/fmovies.nz/dist/fmovies.nz.user.js
// ==/UserScript==

"use strict";(()=>{var i=new Set,c=null,s=!1;function y(){s=!1,i.forEach(e=>{e()})}function d(e){if(i.add(e),e(),!c){let t=new MutationObserver(()=>{s||(s=!0,window.requestAnimationFrame(y))});c=t,a(r=>{t.observe(r,{childList:!0,subtree:!0})})}return()=>{i.delete(e)}}function a(e){let t=document.body;if(t){e(t);return}let r=window.setInterval(()=>{let n=document.body;n&&(window.clearInterval(r),e(n))},50)}function u(e,t){let r=document.getElementById(e);if(r instanceof HTMLStyleElement)return r;let n=document.createElement("style");return n.id=e,n.textContent=t,(document.head??document.documentElement).appendChild(n),n}function f(e,t=500){let r=location.href,n=()=>{location.href!==r&&(r=location.href,e(r))},b=window.setInterval(n,t);return window.addEventListener("popstate",n),()=>{window.clearInterval(b),window.removeEventListener("popstate",n)}}var o="fmovies-subtitle-position-fix",m=`${o}-styles`,w=250,g=6.5,p=`
  .bottom-14:has(> .cineby-cue),
  .bottom-40:has(> .cineby-cue),
  div[class*="SubtitleVideoCaption_mobileSubtitleContainer"]:has(> .cineby-cue),
  .${o}-subtitle-container {
    bottom: ${String(g)}rem !important;
    top: auto !important;
    z-index: 2147483646 !important;
    max-height: calc(100% - 112px) !important;
    overflow: visible !important;
  }

  .${o}-subtitle-container .cineby-cue {
    display: inline-block !important;
  }
`;function l(){document.querySelectorAll(".cineby-cue").forEach(e=>{let t=e.parentElement;t&&(t.classList.add(`${o}-subtitle-container`),t.style.setProperty("bottom",`${String(g)}rem`,"important"),t.style.setProperty("top","auto","important"),t.style.setProperty("z-index","2147483646","important"))})}function T(){u(m,p),d(l),window.setInterval(l,w),f(()=>{u(m,p),l()})}a(T);})();
