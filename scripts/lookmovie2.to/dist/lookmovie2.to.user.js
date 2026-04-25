/* ==UserScript==
// @name         LookMovie2 Enhancer
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      1.2.0
// @description  Combines playback helpers with a persistent show watchlist for latest episode tracking.
// @author       Lawrence
// @match        *://*.lookmovie2.to/*
// @grant        none
// @run-at       document-start
// ==UserScript== */


"use strict";(()=>{var o="lookmovie2-enhancer",et=`${o}:settings`,at=`${o}:watchlist`,K=`${o}-style`,F=`${o}-fullscreen-style`,s=`${o}-root`,gt="__lookmovie2EnhancerAdBypassTrap",mt=1800*1e3,yt=1e3,C=Object.freeze({adTimerBypass:!0,autoPlay:!0,autoFullscreen:!0}),l=bt(),A=xt(),f=null,D=null,G=!1,X=0,P=!1,Q=location.href,E=null,T=!1,M="",ot="muted",q="",Z=!1;function bt(){try{let t=JSON.parse(localStorage.getItem(et)||"{}");return{adTimerBypass:typeof t.adTimerBypass=="boolean"?t.adTimerBypass:C.adTimerBypass,autoPlay:typeof t.autoPlay=="boolean"?t.autoPlay:C.autoPlay,autoFullscreen:typeof t.autoFullscreen=="boolean"?t.autoFullscreen:C.autoFullscreen}}catch(t){return console.warn(`[${o}] Failed to load saved settings.`,t),{...C}}}function $t(t){l={adTimerBypass:!!t.adTimerBypass,autoPlay:!!t.autoPlay,autoFullscreen:!!t.autoFullscreen};try{localStorage.setItem(et,JSON.stringify(l))}catch(e){console.warn(`[${o}] Failed to save settings.`,e)}ft(),l.adTimerBypass?(U(),_()):typeof f=="function"&&(window.initPrePlaybackCounter=f),l.autoFullscreen||(dt(),P=!1)}function w(t){if(!t||typeof t!="object")return null;let e=c(t.season),a=c(t.episode),i=c(t.idEpisode||t.id_episode);return!e||!a||!i?null:{season:e,episode:a,idEpisode:i,watchedAt:typeof t.watchedAt=="number"?t.watchedAt:void 0,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:void 0}}function it(t,e){if(!e||typeof e!="object")return null;let a=typeof t=="string"&&t.trim()?t.trim():"";return a?{slug:a,idShow:c(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),lastSyncedAt:typeof e.lastSyncedAt=="number"?e.lastSyncedAt:0,lastSyncError:typeof e.lastSyncError=="string"?e.lastSyncError:"",latestEpisode:w(e.latestEpisode),lastWatched:w(e.lastWatched)}:null}function xt(){try{let t=JSON.parse(localStorage.getItem(at)||"{}"),e=t&&typeof t=="object"&&t.shows&&typeof t.shows=="object"?t.shows:{},a={};return Object.entries(e).forEach(([i,n])=>{let r=it(i,n);r&&(a[i]=r)}),{shows:a}}catch(t){return console.warn(`[${o}] Failed to load watchlist.`,t),{shows:{}}}}function vt(){try{localStorage.setItem(at,JSON.stringify(A))}catch(t){console.warn(`[${o}] Failed to save watchlist.`,t)}}function k(){vt(),m(),H(),x(),V()}function h(t,e){M=t||"",ot=e||"muted",m()}function c(t){let e=Number.parseInt(String(t),10);return Number.isFinite(e)&&e>0?e:0}function u(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function L(t){return t?`S${String(t.season).padStart(2,"0")}E${String(t.episode).padStart(2,"0")}`:"Unknown episode"}function O(t,e){return!t&&!e?0:t?e?t.season!==e.season?t.season-e.season:t.episode!==e.episode?t.episode-e.episode:t.idEpisode-e.idEpisode:1:-1}function Et(t,e){return!t||!e?!1:t.idEpisode===e.idEpisode&&t.season===e.season&&t.episode===e.episode}function g(t){return!!t&&Et(t.latestEpisode,t.lastWatched)}function W(){return Object.values(A.shows)}function y(t){return t&&A.shows[t]||null}function St(t){return t&&W().find(e=>e.idShow===t)||null}function At(){return W().filter(t=>t.latestEpisode&&!g(t)).length}function kt(t){return[...t].sort((e,a)=>{let i=e.latestEpisode?g(e)?1:0:2,n=a.latestEpisode?g(a)?1:0:2;return i!==n?i-n:e.title.localeCompare(a.title)})}function Ct(t){try{let a=new URL(t,location.origin).pathname.match(/\/shows\/view\/([^/?#]+)/i);return a?a[1]:""}catch{return""}}function Pt(t){try{let e=new URL(t,location.origin),a=c(e.searchParams.get("season")),i=c(e.searchParams.get("episode")),n=c(e.searchParams.get("id_episode"));return!a||!i||!n?null:{season:a,episode:i,idEpisode:n}}catch{return null}}function Tt(t){let e=typeof t=="string"?t.match(/-(\d{4})$/):null;return e?e[1]:""}function Lt(t){if(!t)return null;let e=t.querySelector('a[href*="/shows/view/"]');if(!e)return null;let a=Ct(e.getAttribute("href"));if(!a)return null;let i=t.querySelector(".mv-item-infor h6"),n=t.querySelector("img[data-src], img[src]"),r=Pt(e.getAttribute("href"));return{slug:a,title:i?i.textContent.trim():a,year:Tt(a),poster:n&&(n.getAttribute("data-src")||n.getAttribute("src"))||"",href:new URL(e.getAttribute("href"),location.origin).href,episode:r}}function _t(t,e){return t?e?`/shows/view/${t}?season=${e.season}&episode=${e.episode}&id_episode=${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function Wt(t,e){return t?!t.idShow||!t.latestEpisode?!0:!t.lastSyncedAt||e-t.lastSyncedAt>=mt:!1}async function Bt(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.text()}async function It(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.json()}function B(t){return t.replaceAll("\\'","'").replaceAll("\\\\","\\")}async function st(t,e){let a=await Bt(`/shows/view/${t}`),i=a.match(/id_show:\s*(\d+)/),n=a.match(/title:\s*'((?:\\'|[^'])*)'/),r=a.match(/year:\s*'((?:\\'|[^'])*)'/),d=a.match(/poster_medium:\s*'((?:\\'|[^'])*)'/);return{slug:t,idShow:i?c(i[1]):0,title:n?B(n[1]).trim():e&&e.title?e.title:t,year:r?B(r[1]).trim():e&&e.year?e.year:"",poster:d?B(d[1]).trim():e&&e.poster?e.poster:""}}async function Ft(t){let e=await It(`/api/v2/download/episode/list?id=${t}`),a=e&&e.latest?e.latest:null,i=w({season:a&&a.season,episode:a&&a.episode,idEpisode:a&&a.id_episode});return i?(i.updatedAt=Date.now(),i):null}async function nt(t){if(!t||!t.slug)return;let e=y(t.slug);if(e){h(`${e.title} is already in your watchlist.`,"muted"),x();return}h(`Adding ${t.title||t.slug}...`,"muted");let a={slug:t.slug,idShow:0,title:t.title||t.slug,year:t.year||"",poster:t.poster||""};try{a=await st(t.slug,t)}catch(i){console.warn(`[${o}] Failed to resolve show metadata for ${t.slug}.`,i)}A.shows[t.slug]=it(t.slug,{slug:t.slug,idShow:a.idShow,title:a.title||t.title||t.slug,year:a.year||t.year||"",poster:a.poster||t.poster||"",addedAt:Date.now(),latestEpisode:t.episode||null,lastSyncedAt:0}),k(),h(`${a.title||t.title||t.slug} added to your watchlist.`,"success"),await S({force:!0,slugs:[t.slug]})}function R(t){let e=y(t);e&&(delete A.shows[t],k(),h(`${e.title} removed from your watchlist.`,"muted"))}function Mt(t){let e=y(t);!e||!e.latestEpisode||(g(e)?(e.lastWatched=null,h(`${e.title} marked as having an unwatched latest episode.`,"muted")):(e.lastWatched={...e.latestEpisode,watchedAt:Date.now()},h(`${e.title} marked watched through ${L(e.latestEpisode)}.`,"success")),k())}async function S(t){let e=!!(t&&t.force),a=t&&Array.isArray(t.slugs)?new Set(t.slugs):null;if(E)return E;let i=Date.now(),n=W().filter(r=>a&&!a.has(r.slug)?!1:e||Wt(r,i));return n.length?(T=!0,h(`Refreshing ${n.length} watchlist ${n.length===1?"show":"shows"}...`,"muted"),E=(async()=>{for(let r of n)try{if(!r.idShow){let p=await st(r.slug,r);r.idShow=p.idShow,r.title=p.title||r.title,r.year=p.year||r.year,r.poster=p.poster||r.poster}if(!r.idShow)throw new Error("Unable to resolve show id.");let d=await Ft(r.idShow);r.latestEpisode=d,r.lastSyncError="",r.lastSyncedAt=Date.now()}catch(d){r.lastSyncError=d instanceof Error?d.message:String(d),r.lastSyncedAt=Date.now(),console.warn(`[${o}] Failed to refresh ${r.slug}.`,d)}k(),h("Watchlist refreshed.","success")})().catch(r=>{console.warn(`[${o}] Watchlist refresh failed.`,r),h("Watchlist refresh failed.","danger")}).finally(()=>{T=!1,m(),x(),E=null}),E):(m(),x(),Promise.resolve())}function qt(){if(!location.pathname.startsWith("/shows/play/"))return null;let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);if(!t)return null;let e=c(window.id_show),a=c(t[1]),i=c(t[2]),n=c(t[3]);return!e||!a||!i||!n?null:{idShow:e,season:a,episode:i,idEpisode:n}}function Nt(){let t=qt();if(!t)return;let e=`${t.idShow}:${t.idEpisode}`;if(e===q)return;let a=St(t.idShow);a&&(a.lastWatched={season:t.season,episode:t.episode,idEpisode:t.idEpisode,watchedAt:Date.now()},(!a.latestEpisode||O(a.lastWatched,a.latestEpisode)>0)&&(a.latestEpisode={season:t.season,episode:t.episode,idEpisode:t.idEpisode,updatedAt:Date.now()}),q=e,k(),h(`${a.title} updated to watched through ${L(a.lastWatched)}.`,"success"))}function _(t={}){let e=!!t.hideContainer,a=document.querySelector(".player-pre-init-ads");a&&(e&&a.classList.add("tw-hidden"),a.classList.add("finished"));let i=document.querySelector(".pre-init-ads--loading-please-wait");i&&(i.classList.add("tw-hidden"),i.classList.add("!tw-hidden"));let n=document.querySelector(".player-pre-init-ads_timer");n&&(n.classList.add("tw-hidden"),n.classList.add("tw-opacity-0")),document.querySelectorAll(".player-pre-init-ads_timer__value").forEach(r=>{r.textContent="0"}),document.querySelectorAll(".pre-init-ads--close").forEach(r=>{r.classList.remove("tw-hidden")}),document.querySelectorAll(".pre-init-ads--back-button").forEach(r=>{r.classList.remove("tw-hidden")}),typeof window._counterTimeout<"u"&&(clearInterval(window._counterTimeout),window._counterTimeout=void 0),typeof window.enableWindowScroll=="function"&&window.enableWindowScroll()}function $(){console.log(`[${o}] initPrePlaybackCounter bypassed.`),window._preInitAdsTimestamp=Date.now();let t=new Promise(e=>{_({hideContainer:!0}),e()}).finally(()=>{typeof window.enableWindowScroll=="function"&&window.enableWindowScroll()});return t.cancel=()=>{typeof window._counterTimeout<"u"&&(clearInterval(window._counterTimeout),window._counterTimeout=void 0),_({hideContainer:!0})},t}function U(){return l.adTimerBypass?typeof window.initPrePlaybackCounter=="function"&&window.initPrePlaybackCounter!==$?(f||(f=window.initPrePlaybackCounter),window.initPrePlaybackCounter=$,console.log(`[${o}] Installed ad timer bypass override.`),!0):window.initPrePlaybackCounter===$:!1}function rt(){let t=Object.getOwnPropertyDescriptor(window,"initPrePlaybackCounter");if(t&&t.configurable===!1)return!1;let e=window[gt],a=!!t&&typeof t.get=="function",i=a?t.get.call(window):t?t.value:void 0,n=Z&&a?f:e&&typeof e=="object"&&"currentValue"in e?e.currentValue:i;return typeof n=="function"&&n!==$&&!f&&(f=n),Object.defineProperty(window,"initPrePlaybackCounter",{configurable:!0,enumerable:t?t.enumerable:!0,get(){return l.adTimerBypass?$:n},set(r){l.adTimerBypass&&typeof r=="function"&&r!==$&&!f&&(f=r),n=r,e&&typeof e=="object"&&(e.currentValue=r)}}),Z=!0,!0}function zt(){D||(D=window.setInterval(()=>{l.adTimerBypass&&(rt(),U(),_({hideContainer:!1}))},250))}function jt(){if(!l.autoPlay)return!1;let t=document.getElementById("progress-from-beginning-button");return t?(console.log(`[${o}] Dismissing playback modal.`),t.click(),!0):!1}function Ot(){if(!document.head)return!1;if(!document.getElementById(F)){let t=document.createElement("style");t.id=F,t.textContent=`
            #video_player {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 999999 !important;
                background: black !important;
            }

            body.${o}-fullscreen {
                overflow: hidden !important;
            }
        `,document.head.appendChild(t)}return document.body&&document.body.classList.add(`${o}-fullscreen`),!0}function dt(){let t=document.getElementById(F);t&&t.remove(),document.body&&document.body.classList.remove(`${o}-fullscreen`)}function Rt(){if(!l.autoFullscreen||P)return!1;let t=document.getElementById("video_player");if(!t)return!1;let e=t.querySelector(".vjs-fullscreen-control");return e&&e.click(),console.log(`[${o}] Applying fullscreen behavior.`),Ot(),P=!0,!0}function Ut(){Nt(),!(!l.autoPlay&&!l.autoFullscreen)&&window.setTimeout(()=>{let t=jt();window.setTimeout(()=>{Rt()},t?500:200)},300)}function N(t){!t||t._lookmovieEnhancerAttached||(t._lookmovieEnhancerAttached=!0,t.addEventListener("play",Ut))}function lt(){document.querySelectorAll("video").forEach(N)}function Ht(){let t=window.setInterval(()=>{if(!document.body)return;window.clearInterval(t),lt(),new MutationObserver(a=>{a.forEach(i=>{i.type==="childList"&&i.addedNodes.forEach(n=>{!n||n.nodeType!==Node.ELEMENT_NODE||(n.tagName==="VIDEO"&&N(n),typeof n.querySelectorAll=="function"&&n.querySelectorAll("video").forEach(N))})})}).observe(document.body,{childList:!0,subtree:!0})},100)}function Vt(){window.setInterval(()=>{location.href!==Q&&(Q=location.href,P=!1,q="",dt(),lt(),ct(),m(),x(),pt(),V(),ht(),S())},yt)}function Yt(){if(!document.head||document.getElementById(K))return;let t=document.createElement("style");t.id=K,t.textContent=`
        #${s}-button {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 2147483647;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: 0;
            border-radius: 999px;
            padding: 10px 14px;
            color: #ffffff;
            background: rgba(17, 24, 39, 0.92);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
            font: 700 14px/1 Arial, sans-serif;
            letter-spacing: 0.04em;
            cursor: pointer;
        }

        #${s}-button[data-has-new="true"] {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.96), rgba(30, 64, 175, 0.96));
        }

        #${s}-button-badge {
            min-width: 20px;
            padding: 3px 7px;
            border-radius: 999px;
            background: #f97316;
            color: #fff7ed;
            font-size: 11px;
            text-align: center;
        }

        #${s}-overlay {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(5, 10, 20, 0.65);
        }

        #${s}-overlay.${o}-open {
            display: flex;
        }

        #${s}-modal {
            width: min(95vw, 1600px);
            height: min(92vh, 1100px);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 18px;
            overflow: hidden;
            background: #0f172a;
            color: #e5e7eb;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45);
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
        }

        #${s}-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            padding: 18px 18px 10px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        #${s}-title {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
        }

        #${s}-subtitle {
            margin: 6px 0 0;
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.45;
        }

        #${s}-close {
            border: 0;
            background: transparent;
            color: #cbd5e1;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
        }

        #${s}-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            flex: 1;
            min-height: 0;
        }

        #${s}-settings-panel {
            min-width: 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            padding-bottom: 18px;
        }

        #${s}-watchlist-panel {
            min-width: 0;
        }

        @media (min-width: 980px) {
            #${s}-content {
                display: grid;
                grid-template-columns: 280px minmax(0, 1fr);
                gap: 24px;
            }

            #${s}-settings-panel {
                border-bottom: none;
                border-right: 1px solid rgba(148, 163, 184, 0.12);
                padding-bottom: 0;
                padding-right: 20px;
            }

            #${s}-watchlist-panel {
                padding-left: 0;
            }
        }

        #${s}-settings-title,
        #${s}-watchlist-title {
            margin: 0 0 12px;
            color: #f8fafc;
            font-size: 15px;
            font-weight: 700;
        }

        #${s}-settings {
            display: grid;
            gap: 12px;
        }

        .${o}-setting {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: center;
            padding: 14px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 14px;
            background: rgba(15, 23, 42, 0.7);
        }

        .${o}-setting-title {
            margin: 0;
            color: #f8fafc;
            font-size: 14px;
            font-weight: 700;
        }

        .${o}-setting-copy {
            margin: 4px 0 0;
            color: #94a3b8;
            font-size: 12px;
            line-height: 1.45;
        }

        .${o}-switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 30px;
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
            background: #334155;
            transition: background 0.18s ease;
        }

        .${o}-slider::before {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
            transition: transform 0.18s ease;
        }

        .${o}-switch input:checked + .${o}-slider {
            background: #2563eb;
        }

        .${o}-switch input:checked + .${o}-slider::before {
            transform: translateX(22px);
        }

        #${s}-watchlist-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        #${s}-watchlist-summary {
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.45;
        }

        #${s}-watchlist-status {
            min-height: 18px;
            margin-bottom: 10px;
            font-size: 12px;
            line-height: 1.45;
        }

        #${s}-watchlist-status[data-tone="success"] {
            color: #86efac;
        }

        #${s}-watchlist-status[data-tone="danger"] {
            color: #fda4af;
        }

        #${s}-watchlist-status[data-tone="muted"] {
            color: #94a3b8;
        }

        #${s}-watchlist-list {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 14px;
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 8px;
        }

        .${o}-watch-empty {
            grid-column: 1 / -1;
            padding: 32px 24px;
            border: 1px dashed rgba(148, 163, 184, 0.2);
            border-radius: 14px;
            color: #94a3b8;
            font-size: 14px;
            line-height: 1.55;
            background: rgba(15, 23, 42, 0.35);
            text-align: center;
            align-self: center;
        }

        .${o}-watch-item {
            display: flex;
            flex-direction: column;
            gap: 0;
            border: 1px solid rgba(148, 163, 184, 0.16);
            border-radius: 12px;
            background: rgba(15, 23, 42, 0.85);
            overflow: hidden;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .${o}-watch-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .${o}-watch-item[data-state="new"] {
            border-color: rgba(249, 115, 22, 0.55);
            box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.18);
        }

        .${o}-watch-item[data-state="new"]:hover {
            box-shadow: 0 8px 24px rgba(249, 115, 22, 0.15);
        }

        .${o}-watch-item-poster {
            position: relative;
            width: 100%;
            aspect-ratio: 2 / 3;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8));
        }

        .${o}-watch-item-poster img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .${o}-watch-item-poster-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 8px 10px;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        .${o}-watch-item-body {
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
        }

        .${o}-watch-item-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 8px;
        }

        .${o}-watch-item-title {
            color: #f8fafc;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .${o}-watch-item-copy {
            margin: 3px 0 0;
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.4;
        }

        .${o}-watch-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 8px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.03em;
            white-space: nowrap;
        }

        .${o}-watch-badge[data-state="new"] {
            background: rgba(249, 115, 22, 0.18);
            color: #fdba74;
        }

        .${o}-watch-badge[data-state="watched"] {
            background: rgba(34, 197, 94, 0.18);
            color: #86efac;
        }

        .${o}-watch-badge[data-state="pending"] {
            background: rgba(148, 163, 184, 0.18);
            color: #cbd5e1;
        }

        .${o}-watch-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .${o}-button,
        .${o}-link-button {
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 999px;
            padding: 5px 10px;
            background: rgba(30, 41, 59, 0.9);
            color: #e2e8f0;
            font: 600 11px/1 Arial, sans-serif;
            cursor: pointer;
            text-decoration: none;
            white-space: nowrap;
        }

        .${o}-button:hover,
        .${o}-link-button:hover {
            border-color: rgba(96, 165, 250, 0.65);
            color: #f8fafc;
        }

        .${o}-button[disabled] {
            cursor: wait;
            opacity: 0.65;
        }

        .${o}-danger-button:hover {
            border-color: rgba(251, 113, 133, 0.7);
        }

        #${s}-footer {
            padding: 0 18px 18px;
            color: #94a3b8;
            font: 12px/1.45 Arial, sans-serif;
        }

        .${o}-episode-watch-button {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 5;
            border: 0;
            border-radius: 999px;
            padding: 8px 10px;
            background: rgba(15, 23, 42, 0.92);
            color: #e2e8f0;
            font: 700 12px/1 Arial, sans-serif;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.28);
            cursor: pointer;
        }

        .${o}-episode-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${o}-episode-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${o}-episode-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        .${o}-show-view-watch-wrap {
            margin-top: 14px;
        }

        .${o}-show-view-watch-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 44px;
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 999px;
            padding: 10px 16px;
            background: rgba(15, 23, 42, 0.92);
            color: #f8fafc;
            font: 700 13px/1 Arial, sans-serif;
            cursor: pointer;
            transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease;
        }

        .${o}-show-view-watch-button:hover {
            transform: translateY(-1px);
            border-color: rgba(96, 165, 250, 0.65);
        }

        .${o}-show-view-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${o}-show-view-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${o}-show-view-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        @media (max-width: 1400px) {
            #${s}-watchlist-list {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (max-width: 1100px) {
            #${s}-watchlist-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 850px) {
            #${s}-content {
                display: flex;
                flex-direction: column;
            }

            #${s}-settings-panel {
                border-bottom: 1px solid rgba(148, 163, 184, 0.12);
                border-right: none;
                padding-bottom: 16px;
                padding-right: 0;
            }

            #${s}-watchlist-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 640px) {
            #${s}-watchlist-list {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }

            #${s}-modal {
                width: 100vw;
                height: 100vh;
                border-radius: 0;
            }
        }
    `,document.head.appendChild(t)}function I(t,e,a){return`
        <label class="${o}-setting">
            <div>
                <p class="${o}-setting-title">${e}</p>
                <p class="${o}-setting-copy">${a}</p>
            </div>
            <span class="${o}-switch">
                <input type="checkbox" data-setting="${t}">
                <span class="${o}-slider"></span>
            </span>
        </label>
    `}function ct(){if(Yt(),!document.body||document.getElementById(s))return;let t=document.createElement("div");t.id=s,t.innerHTML=`
        <button id="${s}-button" type="button" aria-haspopup="dialog" aria-expanded="false">
            <span id="${s}-button-label">LM Tools</span>
            <span id="${s}-button-badge" hidden>0</span>
        </button>
        <div id="${s}-overlay" aria-hidden="true">
            <div id="${s}-modal" role="dialog" aria-modal="true" aria-labelledby="${s}-title">
                <div id="${s}-header">
                    <div>
                        <h2 id="${s}-title">LookMovie2 Enhancer</h2>
                        <p id="${s}-subtitle">Playback helpers plus a personal show watchlist with latest episode tracking.</p>
                    </div>
                    <button id="${s}-close" type="button" aria-label="Close settings">&times;</button>
                </div>
                <div id="${s}-content">
                    <section id="${s}-settings-panel">
                        <h3 id="${s}-settings-title">Playback Tools</h3>
                        <div id="${s}-settings">
                            ${I("adTimerBypass","Ad timer bypass","Skips the pre-playback counter and hides the ad overlay.")}
                            ${I("autoPlay","Auto play","Clicks the resume or start button when the playback modal appears.")}
                            ${I("autoFullscreen","Auto fullscreen","Clicks fullscreen and applies the fullscreen fallback after playback starts.")}
                        </div>
                    </section>
                    <section id="${s}-watchlist-panel">
                        <div id="${s}-watchlist-toolbar">
                            <div>
                                <h3 id="${s}-watchlist-title">Watchlist</h3>
                                <div id="${s}-watchlist-summary"></div>
                            </div>
                            <button id="${s}-watchlist-refresh" class="${o}-button" type="button" data-watchlist-action="refresh">Refresh</button>
                        </div>
                        <div id="${s}-watchlist-status" data-tone="muted"></div>
                        <div id="${s}-watchlist-list"></div>
                    </section>
                </div>
                <div id="${s}-footer">Settings and watchlist data are saved locally in your browser.</div>
            </div>
        </div>
    `,document.body.appendChild(t);let e=document.getElementById(`${s}-button`),a=document.getElementById(`${s}-overlay`),i=document.getElementById(`${s}-close`);function n(){a.classList.add(`${o}-open`),a.setAttribute("aria-hidden","false"),e.setAttribute("aria-expanded","true"),S()}function r(){a.classList.remove(`${o}-open`),a.setAttribute("aria-hidden","true"),e.setAttribute("aria-expanded","false")}e.addEventListener("click",()=>{a.classList.contains(`${o}-open`)?r():n()}),i.addEventListener("click",r),a.addEventListener("click",d=>{d.target===a&&r()}),document.querySelectorAll(`#${s} input[data-setting]`).forEach(d=>{d.addEventListener("change",()=>{$t({...l,[d.dataset.setting]:d.checked})})}),t.addEventListener("click",d=>{let p=d.target.closest("[data-watchlist-action]");if(!p)return;let v=p.dataset.watchlistAction,b=p.dataset.slug||"";if(v==="refresh"){S({force:!0});return}if(v==="toggle-latest-watched"&&b){Mt(b);return}v==="remove"&&b&&R(b)}),window.addEventListener("keydown",d=>{d.key==="Escape"&&r()}),ft(),m(),H()}function H(){let t=document.getElementById(`${s}-button`),e=document.getElementById(`${s}-button-badge`),a=document.getElementById(`${s}-button-label`);if(!t||!e||!a)return;let i=At();a.textContent="LM Tools",i>0?(e.hidden=!1,e.textContent=String(i),t.dataset.hasNew="true"):(e.hidden=!0,e.textContent="0",t.dataset.hasNew="false")}function Jt(t){let e=t.latestEpisode?g(t)?"watched":"new":"pending",a=t.latestEpisode?`Latest ${L(t.latestEpisode)}`:"Latest episode not synced yet",i=t.lastWatched?`Watched through ${L(t.lastWatched)}`:"Nothing marked watched yet",n=t.lastSyncError?`Sync issue: ${t.lastSyncError}`:"",r=e==="new"?"New episode":e==="watched"?"Up to date":"Pending sync",d=_t(t.slug,t.latestEpisode),p=g(t)?"Unwatch latest":"Mark latest watched",v=t.latestEpisode?"":"disabled",b=t.year?` (${u(t.year)})`:"",Y=t.poster||"",J=[a,i];n&&J.push(n);let wt=Y?`<img src="${u(Y)}" alt="${u(t.title)}" loading="lazy">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:48px;">\u{1F4FA}</div>';return`
        <article class="${o}-watch-item" data-state="${e}">
            <div class="${o}-watch-item-poster">
                ${wt}
                <div class="${o}-watch-item-poster-overlay">
                    <a class="${o}-link-button" href="${u(d)}" style="font-size:11px;padding:6px 10px;">Open</a>
                    <span class="${o}-watch-badge" data-state="${e}">${u(r)}</span>
                </div>
            </div>
            <div class="${o}-watch-item-body">
                <div>
                    <a class="${o}-watch-item-title" href="${u(d)}">${u(t.title)}${b}</a>
                    <p class="${o}-watch-item-copy">${u(J.join(" \u2022 "))}</p>
                </div>
                <div class="${o}-watch-actions">
                    <button class="${o}-button" type="button" data-watchlist-action="toggle-latest-watched" data-slug="${u(t.slug)}" ${v}>${u(p)}</button>
                    <button class="${o}-button ${o}-danger-button" type="button" data-watchlist-action="remove" data-slug="${u(t.slug)}">Remove</button>
                </div>
            </div>
        </article>
    `}function m(){let t=document.getElementById(`${s}-watchlist-summary`),e=document.getElementById(`${s}-watchlist-status`),a=document.getElementById(`${s}-watchlist-list`),i=document.getElementById(`${s}-watchlist-refresh`);if(!t||!e||!a||!i)return;let n=kt(W()),r=n.filter(d=>d.latestEpisode&&!g(d)).length;if(t.textContent=n.length?`${n.length} tracked ${n.length===1?"show":"shows"}${r?` | ${r} with a newer latest episode`:""}`:"Add shows from the latest episodes page to start tracking them.",e.dataset.tone=ot,e.textContent=T?M||"Refreshing watchlist...":M||"",i.disabled=T,!n.length){a.innerHTML=`<div class="${o}-watch-empty">On the <code>/shows</code> page, use the overlay button on any episode card to add that show to your personal watchlist.</div>`;return}a.innerHTML=n.map(Jt).join("")}function Kt(){return location.pathname==="/shows"}function ut(){return location.pathname.startsWith("/shows/view/")}function Dt(){if(!ut()||!window.show_storage)return null;let t=typeof window.show_storage.slug=="string"?window.show_storage.slug:"";if(!t)return null;let e=new URLSearchParams(location.search),a=w({season:e.get("season"),episode:e.get("episode"),idEpisode:e.get("id_episode")});return{slug:t,title:typeof window.show_storage.title=="string"?window.show_storage.title:t,year:typeof window.show_storage.year=="string"||typeof window.show_storage.year=="number"?String(window.show_storage.year):"",poster:typeof window.show_storage.poster_medium=="string"?window.show_storage.poster_medium:"",idShow:c(window.show_storage.id_show),episode:a}}function z(t){let e=t.dataset.watchlistSlug||"",a=y(e),i=w({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode});if(!a){t.dataset.state="add",t.textContent="+ Watch",t.title="Add this show to your watchlist",t.disabled=!1;return}let n=i&&(!a.lastWatched||O(i,a.lastWatched)>0);t.dataset.state=n?"watching-new":"watching",t.textContent="Watching",t.title=n?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function x(){document.querySelectorAll(`.${o}-episode-watch-button`).forEach(z)}function j(t){let e=t.dataset.watchlistSlug||"",a=y(e),i=w({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode});if(!a){t.dataset.state="add",t.textContent="+ Add To Watchlist",t.title="Add this show to your watchlist",t.disabled=!1;return}let n=i&&(!a.lastWatched||O(i,a.lastWatched)>0);t.dataset.state=n?"watching-new":"watching",t.textContent=n?"Watching: New Episode":"Watching",t.title=n?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function V(){document.querySelectorAll(`.${o}-show-view-watch-button`).forEach(j)}function pt(){!document.body||!Kt()||document.querySelectorAll(".episode-item").forEach(t=>{let e=Lt(t);if(!e)return;let a=t.querySelector(`.${o}-episode-watch-button`);a||(a=document.createElement("button"),a.type="button",a.className=`${o}-episode-watch-button`,t.appendChild(a),a.addEventListener("click",async i=>{i.preventDefault(),i.stopPropagation();let n=a.dataset.watchlistSlug;if(n){if(y(n)){R(n);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await nt({slug:n,title:a.dataset.title||n,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:w({season:a.dataset.season,episode:a.dataset.episode,idEpisode:a.dataset.idEpisode})}),z(a)}})),a.dataset.watchlistSlug=e.slug,a.dataset.title=e.title,a.dataset.year=e.year,a.dataset.poster=e.poster,e.episode&&(a.dataset.season=String(e.episode.season),a.dataset.episode=String(e.episode.episode),a.dataset.idEpisode=String(e.episode.idEpisode)),z(a)})}function ht(){if(!document.body||!ut())return;let t=Dt();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let a=document.querySelector(`.${o}-show-view-watch-wrap`);a||(a=document.createElement("div"),a.className=`${o}-show-view-watch-wrap`,e.appendChild(a));let i=a.querySelector(`.${o}-show-view-watch-button`);i||(i=document.createElement("button"),i.type="button",i.className=`${o}-show-view-watch-button`,a.appendChild(i),i.addEventListener("click",async()=>{let n=i.dataset.watchlistSlug;if(n){if(y(n)){R(n);return}i.dataset.state="adding",i.textContent="Adding...",i.disabled=!0,await nt({slug:n,title:i.dataset.title||n,year:i.dataset.year||"",poster:i.dataset.poster||"",episode:w({season:i.dataset.season,episode:i.dataset.episode,idEpisode:i.dataset.idEpisode})}),j(i)}})),i.dataset.watchlistSlug=t.slug,i.dataset.title=t.title,i.dataset.year=t.year,i.dataset.poster=t.poster,t.episode?(i.dataset.season=String(t.episode.season),i.dataset.episode=String(t.episode.episode),i.dataset.idEpisode=String(t.episode.idEpisode)):(delete i.dataset.season,delete i.dataset.episode,delete i.dataset.idEpisode),j(i)}function ft(){document.querySelectorAll(`#${s} input[data-setting]`).forEach(t=>{t.checked=!!l[t.dataset.setting]})}function tt(){if(G)return;G=!0,Ht(),Vt();let t=window.setInterval(()=>{X+=1,ct(),pt(),ht(),(document.getElementById(s)||X>100)&&window.clearInterval(t)},100);m(),H(),x(),V(),S()}rt();U();zt();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",tt,{once:!0}):tt();})();
