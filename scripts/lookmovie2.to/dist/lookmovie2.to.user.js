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


"use strict";(()=>{var o="lookmovie2-enhancer",G=`${o}:settings`,X=`${o}:watchlist`,H=`${o}-style`,I=`${o}-fullscreen-style`,i=`${o}-root`,ct=1800*1e3,ut=1e3,k=Object.freeze({adTimerBypass:!0,autoPlay:!0,autoFullscreen:!0}),u=pt(),E=ft(),V=!1,J=0,A=!1,Y=location.href,x=null,W=!1,_="",Q="muted",P="";function pt(){try{let t=JSON.parse(localStorage.getItem(G)||"{}");return{adTimerBypass:typeof t.adTimerBypass=="boolean"?t.adTimerBypass:k.adTimerBypass,autoPlay:typeof t.autoPlay=="boolean"?t.autoPlay:k.autoPlay,autoFullscreen:typeof t.autoFullscreen=="boolean"?t.autoFullscreen:k.autoFullscreen}}catch(t){return console.warn(`[${o}] Failed to load saved settings.`,t),{...k}}}function ht(t){u={adTimerBypass:!!t.adTimerBypass,autoPlay:!!t.autoPlay,autoFullscreen:!!t.autoFullscreen};try{localStorage.setItem(G,JSON.stringify(u))}catch(e){console.warn(`[${o}] Failed to save settings.`,e)}dt(),u.adTimerBypass&&et(),u.autoFullscreen||(at(),A=!1)}function f(t){if(!t||typeof t!="object")return null;let e=l(t.season),a=l(t.episode),s=l(t.idEpisode||t.id_episode);return!e||!a||!s?null:{season:e,episode:a,idEpisode:s,watchedAt:typeof t.watchedAt=="number"?t.watchedAt:void 0,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:void 0}}function Z(t,e){if(!e||typeof e!="object")return null;let a=typeof t=="string"&&t.trim()?t.trim():"";return a?{slug:a,idShow:l(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),lastSyncedAt:typeof e.lastSyncedAt=="number"?e.lastSyncedAt:0,lastSyncError:typeof e.lastSyncError=="string"?e.lastSyncError:"",latestEpisode:f(e.latestEpisode),lastWatched:f(e.lastWatched)}:null}function ft(){try{let t=JSON.parse(localStorage.getItem(X)||"{}"),e=t&&typeof t=="object"&&t.shows&&typeof t.shows=="object"?t.shows:{},a={};return Object.entries(e).forEach(([s,n])=>{let r=Z(s,n);r&&(a[s]=r)}),{shows:a}}catch(t){return console.warn(`[${o}] Failed to load watchlist.`,t),{shows:{}}}}function gt(){try{localStorage.setItem(X,JSON.stringify(E))}catch(t){console.warn(`[${o}] Failed to save watchlist.`,t)}}function S(){gt(),w(),R(),y(),j()}function h(t,e){_=t||"",Q=e||"muted",w()}function l(t){let e=Number.parseInt(String(t),10);return Number.isFinite(e)&&e>0?e:0}function c(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function L(t){return t?`S${String(t.season).padStart(2,"0")}E${String(t.episode).padStart(2,"0")}`:"Unknown episode"}function N(t,e){return!t&&!e?0:t?e?t.season!==e.season?t.season-e.season:t.episode!==e.episode?t.episode-e.episode:t.idEpisode-e.idEpisode:1:-1}function wt(t,e){return!t||!e?!1:t.idEpisode===e.idEpisode&&t.season===e.season&&t.episode===e.episode}function g(t){return!!t&&wt(t.latestEpisode,t.lastWatched)}function C(){return Object.values(E.shows)}function m(t){return t&&E.shows[t]||null}function mt(t){return t&&C().find(e=>e.idShow===t)||null}function bt(){return C().filter(t=>t.latestEpisode&&!g(t)).length}function yt(t){return[...t].sort((e,a)=>{let s=e.latestEpisode?g(e)?1:0:2,n=a.latestEpisode?g(a)?1:0:2;return s!==n?s-n:e.title.localeCompare(a.title)})}function $t(t){try{let a=new URL(t,location.origin).pathname.match(/\/shows\/view\/([^/?#]+)/i);return a?a[1]:""}catch{return""}}function xt(t){try{let e=new URL(t,location.origin),a=l(e.searchParams.get("season")),s=l(e.searchParams.get("episode")),n=l(e.searchParams.get("id_episode"));return!a||!s||!n?null:{season:a,episode:s,idEpisode:n}}catch{return null}}function vt(t){let e=typeof t=="string"?t.match(/-(\d{4})$/):null;return e?e[1]:""}function Et(t){if(!t)return null;let e=t.querySelector('a[href*="/shows/view/"]');if(!e)return null;let a=$t(e.getAttribute("href"));if(!a)return null;let s=t.querySelector(".mv-item-infor h6"),n=t.querySelector("img[data-src], img[src]"),r=xt(e.getAttribute("href"));return{slug:a,title:s?s.textContent.trim():a,year:vt(a),poster:n&&(n.getAttribute("data-src")||n.getAttribute("src"))||"",href:new URL(e.getAttribute("href"),location.origin).href,episode:r}}function St(t,e){return t?e?`/shows/view/${t}?season=${e.season}&episode=${e.episode}&id_episode=${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function kt(t,e){return t?!t.idShow||!t.latestEpisode?!0:!t.lastSyncedAt||e-t.lastSyncedAt>=ct:!1}async function At(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.text()}async function Wt(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.json()}function T(t){return t.replaceAll("\\'","'").replaceAll("\\\\","\\")}async function D(t,e){let a=await At(`/shows/view/${t}`),s=a.match(/id_show:\s*(\d+)/),n=a.match(/title:\s*'((?:\\'|[^'])*)'/),r=a.match(/year:\s*'((?:\\'|[^'])*)'/),d=a.match(/poster_medium:\s*'((?:\\'|[^'])*)'/);return{slug:t,idShow:s?l(s[1]):0,title:n?T(n[1]).trim():e&&e.title?e.title:t,year:r?T(r[1]).trim():e&&e.year?e.year:"",poster:d?T(d[1]).trim():e&&e.poster?e.poster:""}}async function Lt(t){let e=await Wt(`/api/v2/download/episode/list?id=${t}`),a=e&&e.latest?e.latest:null,s=f({season:a&&a.season,episode:a&&a.episode,idEpisode:a&&a.id_episode});return s?(s.updatedAt=Date.now(),s):null}async function tt(t){if(!t||!t.slug)return;let e=m(t.slug);if(e){h(`${e.title} is already in your watchlist.`,"muted"),y();return}h(`Adding ${t.title||t.slug}...`,"muted");let a={slug:t.slug,idShow:0,title:t.title||t.slug,year:t.year||"",poster:t.poster||""};try{a=await D(t.slug,t)}catch(s){console.warn(`[${o}] Failed to resolve show metadata for ${t.slug}.`,s)}E.shows[t.slug]=Z(t.slug,{slug:t.slug,idShow:a.idShow,title:a.title||t.title||t.slug,year:a.year||t.year||"",poster:a.poster||t.poster||"",addedAt:Date.now(),latestEpisode:t.episode||null,lastSyncedAt:0}),S(),h(`${a.title||t.title||t.slug} added to your watchlist.`,"success"),await v({force:!0,slugs:[t.slug]})}function z(t){let e=m(t);e&&(delete E.shows[t],S(),h(`${e.title} removed from your watchlist.`,"muted"))}function Ct(t){let e=m(t);!e||!e.latestEpisode||(g(e)?(e.lastWatched=null,h(`${e.title} marked as having an unwatched latest episode.`,"muted")):(e.lastWatched={...e.latestEpisode,watchedAt:Date.now()},h(`${e.title} marked watched through ${L(e.latestEpisode)}.`,"success")),S())}async function v(t){let e=!!(t&&t.force),a=t&&Array.isArray(t.slugs)?new Set(t.slugs):null;if(x)return x;let s=Date.now(),n=C().filter(r=>a&&!a.has(r.slug)?!1:e||kt(r,s));return n.length?(W=!0,h(`Refreshing ${n.length} watchlist ${n.length===1?"show":"shows"}...`,"muted"),x=(async()=>{for(let r of n)try{if(!r.idShow){let p=await D(r.slug,r);r.idShow=p.idShow,r.title=p.title||r.title,r.year=p.year||r.year,r.poster=p.poster||r.poster}if(!r.idShow)throw new Error("Unable to resolve show id.");let d=await Lt(r.idShow);r.latestEpisode=d,r.lastSyncError="",r.lastSyncedAt=Date.now()}catch(d){r.lastSyncError=d instanceof Error?d.message:String(d),r.lastSyncedAt=Date.now(),console.warn(`[${o}] Failed to refresh ${r.slug}.`,d)}S(),h("Watchlist refreshed.","success")})().catch(r=>{console.warn(`[${o}] Watchlist refresh failed.`,r),h("Watchlist refresh failed.","danger")}).finally(()=>{W=!1,w(),y(),x=null}),x):(w(),y(),Promise.resolve())}function Tt(){if(!location.pathname.startsWith("/shows/play/"))return null;let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);if(!t)return null;let e=l(window.id_show),a=l(t[1]),s=l(t[2]),n=l(t[3]);return!e||!a||!s||!n?null:{idShow:e,season:a,episode:s,idEpisode:n}}function Bt(){let t=Tt();if(!t)return;let e=`${t.idShow}:${t.idEpisode}`;if(e===P)return;let a=mt(t.idShow);a&&(a.lastWatched={season:t.season,episode:t.episode,idEpisode:t.idEpisode,watchedAt:Date.now()},(!a.latestEpisode||N(a.lastWatched,a.latestEpisode)>0)&&(a.latestEpisode={season:t.season,episode:t.episode,idEpisode:t.idEpisode,updatedAt:Date.now()}),P=e,S(),h(`${a.title} updated to watched through ${L(a.lastWatched)}.`,"success"))}function et(){return u.adTimerBypass?typeof window.initPrePlaybackCounter<"u"?(window.initPrePlaybackCounter=function(){return console.log("initPrePlaybackCounter function bypassed!"),new Promise(t=>{let e=document.querySelector(".player-pre-init-ads");e&&(e.classList.add("tw-hidden"),e.classList.add("finished"));let a=document.querySelector(".pre-init-ads--loading-please-wait");a&&a.classList.add("tw-hidden");let s=document.querySelector(".player-pre-init-ads_timer");s&&s.classList.add("tw-opacity-0"),document.querySelectorAll(".pre-init-ads--close").forEach(n=>{n.classList.remove("tw-hidden")}),document.querySelectorAll(".pre-init-ads--back-button").forEach(n=>{n.classList.remove("tw-hidden")}),typeof window._counterTimeout<"u"&&(clearInterval(window._counterTimeout),window._counterTimeout=void 0),typeof window.enableWindowScroll=="function"&&window.enableWindowScroll(),t()}).finally(()=>{typeof window.enableWindowScroll=="function"&&window.enableWindowScroll()})},!0):(console.warn("initPrePlaybackCounter function not found. The script might not be effective."),!1):!1}function It(){if(!u.autoPlay)return!1;let t=document.getElementById("progress-from-beginning-button");return t?(console.log(`[${o}] Dismissing playback modal.`),t.click(),!0):!1}function _t(){if(!document.head)return!1;if(!document.getElementById(I)){let t=document.createElement("style");t.id=I,t.textContent=`
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
        `,document.head.appendChild(t)}return document.body&&document.body.classList.add(`${o}-fullscreen`),!0}function at(){let t=document.getElementById(I);t&&t.remove(),document.body&&document.body.classList.remove(`${o}-fullscreen`)}function Pt(){if(!u.autoFullscreen||A)return!1;let t=document.getElementById("video_player");if(!t)return!1;let e=t.querySelector(".vjs-fullscreen-control");return e&&e.click(),console.log(`[${o}] Applying fullscreen behavior.`),_t(),A=!0,!0}function Ft(){Bt(),!(!u.autoPlay&&!u.autoFullscreen)&&window.setTimeout(()=>{let t=It();window.setTimeout(()=>{Pt()},t?500:200)},300)}function F(t){!t||t._lookmovieEnhancerAttached||(t._lookmovieEnhancerAttached=!0,t.addEventListener("play",Ft))}function ot(){document.querySelectorAll("video").forEach(F)}function Mt(){let t=window.setInterval(()=>{if(!document.body)return;window.clearInterval(t),ot(),new MutationObserver(a=>{a.forEach(s=>{s.type==="childList"&&s.addedNodes.forEach(n=>{!n||n.nodeType!==Node.ELEMENT_NODE||(n.tagName==="VIDEO"&&F(n),typeof n.querySelectorAll=="function"&&n.querySelectorAll("video").forEach(F))})})}).observe(document.body,{childList:!0,subtree:!0})},100)}function qt(){window.setInterval(()=>{location.href!==Y&&(Y=location.href,A=!1,P="",at(),ot(),st(),w(),y(),nt(),j(),rt(),v())},ut)}function Nt(){if(!document.head||document.getElementById(H))return;let t=document.createElement("style");t.id=H,t.textContent=`
        #${i}-button {
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

        #${i}-button[data-has-new="true"] {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.96), rgba(30, 64, 175, 0.96));
        }

        #${i}-button-badge {
            min-width: 20px;
            padding: 3px 7px;
            border-radius: 999px;
            background: #f97316;
            color: #fff7ed;
            font-size: 11px;
            text-align: center;
        }

        #${i}-overlay {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(5, 10, 20, 0.65);
        }

        #${i}-overlay.${o}-open {
            display: flex;
        }

        #${i}-modal {
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

        #${i}-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            padding: 18px 18px 10px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        #${i}-title {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
        }

        #${i}-subtitle {
            margin: 6px 0 0;
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.45;
        }

        #${i}-close {
            border: 0;
            background: transparent;
            color: #cbd5e1;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
        }

        #${i}-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            flex: 1;
            min-height: 0;
        }

        #${i}-settings-panel {
            min-width: 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            padding-bottom: 18px;
        }

        #${i}-watchlist-panel {
            min-width: 0;
        }

        @media (min-width: 980px) {
            #${i}-content {
                display: grid;
                grid-template-columns: 280px minmax(0, 1fr);
                gap: 24px;
            }

            #${i}-settings-panel {
                border-bottom: none;
                border-right: 1px solid rgba(148, 163, 184, 0.12);
                padding-bottom: 0;
                padding-right: 20px;
            }

            #${i}-watchlist-panel {
                padding-left: 0;
            }
        }

        #${i}-settings-title,
        #${i}-watchlist-title {
            margin: 0 0 12px;
            color: #f8fafc;
            font-size: 15px;
            font-weight: 700;
        }

        #${i}-settings {
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

        #${i}-watchlist-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        #${i}-watchlist-summary {
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.45;
        }

        #${i}-watchlist-status {
            min-height: 18px;
            margin-bottom: 10px;
            font-size: 12px;
            line-height: 1.45;
        }

        #${i}-watchlist-status[data-tone="success"] {
            color: #86efac;
        }

        #${i}-watchlist-status[data-tone="danger"] {
            color: #fda4af;
        }

        #${i}-watchlist-status[data-tone="muted"] {
            color: #94a3b8;
        }

        #${i}-watchlist-list {
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

        #${i}-footer {
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
            #${i}-watchlist-list {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (max-width: 1100px) {
            #${i}-watchlist-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 850px) {
            #${i}-content {
                display: flex;
                flex-direction: column;
            }

            #${i}-settings-panel {
                border-bottom: 1px solid rgba(148, 163, 184, 0.12);
                border-right: none;
                padding-bottom: 16px;
                padding-right: 0;
            }

            #${i}-watchlist-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 640px) {
            #${i}-watchlist-list {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }

            #${i}-modal {
                width: 100vw;
                height: 100vh;
                border-radius: 0;
            }
        }
    `,document.head.appendChild(t)}function B(t,e,a){return`
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
    `}function st(){if(Nt(),!document.body||document.getElementById(i))return;let t=document.createElement("div");t.id=i,t.innerHTML=`
        <button id="${i}-button" type="button" aria-haspopup="dialog" aria-expanded="false">
            <span id="${i}-button-label">LM Tools</span>
            <span id="${i}-button-badge" hidden>0</span>
        </button>
        <div id="${i}-overlay" aria-hidden="true">
            <div id="${i}-modal" role="dialog" aria-modal="true" aria-labelledby="${i}-title">
                <div id="${i}-header">
                    <div>
                        <h2 id="${i}-title">LookMovie2 Enhancer</h2>
                        <p id="${i}-subtitle">Playback helpers plus a personal show watchlist with latest episode tracking.</p>
                    </div>
                    <button id="${i}-close" type="button" aria-label="Close settings">&times;</button>
                </div>
                <div id="${i}-content">
                    <section id="${i}-settings-panel">
                        <h3 id="${i}-settings-title">Playback Tools</h3>
                        <div id="${i}-settings">
                            ${B("adTimerBypass","Ad timer bypass","Skips the pre-playback counter and hides the ad overlay.")}
                            ${B("autoPlay","Auto play","Clicks the resume or start button when the playback modal appears.")}
                            ${B("autoFullscreen","Auto fullscreen","Clicks fullscreen and applies the fullscreen fallback after playback starts.")}
                        </div>
                    </section>
                    <section id="${i}-watchlist-panel">
                        <div id="${i}-watchlist-toolbar">
                            <div>
                                <h3 id="${i}-watchlist-title">Watchlist</h3>
                                <div id="${i}-watchlist-summary"></div>
                            </div>
                            <button id="${i}-watchlist-refresh" class="${o}-button" type="button" data-watchlist-action="refresh">Refresh</button>
                        </div>
                        <div id="${i}-watchlist-status" data-tone="muted"></div>
                        <div id="${i}-watchlist-list"></div>
                    </section>
                </div>
                <div id="${i}-footer">Settings and watchlist data are saved locally in your browser.</div>
            </div>
        </div>
    `,document.body.appendChild(t);let e=document.getElementById(`${i}-button`),a=document.getElementById(`${i}-overlay`),s=document.getElementById(`${i}-close`);function n(){a.classList.add(`${o}-open`),a.setAttribute("aria-hidden","false"),e.setAttribute("aria-expanded","true"),v()}function r(){a.classList.remove(`${o}-open`),a.setAttribute("aria-hidden","true"),e.setAttribute("aria-expanded","false")}e.addEventListener("click",()=>{a.classList.contains(`${o}-open`)?r():n()}),s.addEventListener("click",r),a.addEventListener("click",d=>{d.target===a&&r()}),document.querySelectorAll(`#${i} input[data-setting]`).forEach(d=>{d.addEventListener("change",()=>{ht({...u,[d.dataset.setting]:d.checked})})}),t.addEventListener("click",d=>{let p=d.target.closest("[data-watchlist-action]");if(!p)return;let $=p.dataset.watchlistAction,b=p.dataset.slug||"";if($==="refresh"){v({force:!0});return}if($==="toggle-latest-watched"&&b){Ct(b);return}$==="remove"&&b&&z(b)}),window.addEventListener("keydown",d=>{d.key==="Escape"&&r()}),dt(),w(),R()}function R(){let t=document.getElementById(`${i}-button`),e=document.getElementById(`${i}-button-badge`),a=document.getElementById(`${i}-button-label`);if(!t||!e||!a)return;let s=bt();a.textContent="LM Tools",s>0?(e.hidden=!1,e.textContent=String(s),t.dataset.hasNew="true"):(e.hidden=!0,e.textContent="0",t.dataset.hasNew="false")}function zt(t){let e=t.latestEpisode?g(t)?"watched":"new":"pending",a=t.latestEpisode?`Latest ${L(t.latestEpisode)}`:"Latest episode not synced yet",s=t.lastWatched?`Watched through ${L(t.lastWatched)}`:"Nothing marked watched yet",n=t.lastSyncError?`Sync issue: ${t.lastSyncError}`:"",r=e==="new"?"New episode":e==="watched"?"Up to date":"Pending sync",d=St(t.slug,t.latestEpisode),p=g(t)?"Unwatch latest":"Mark latest watched",$=t.latestEpisode?"":"disabled",b=t.year?` (${c(t.year)})`:"",U=t.poster||"",O=[a,s];n&&O.push(n);let lt=U?`<img src="${c(U)}" alt="${c(t.title)}" loading="lazy">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:48px;">\u{1F4FA}</div>';return`
        <article class="${o}-watch-item" data-state="${e}">
            <div class="${o}-watch-item-poster">
                ${lt}
                <div class="${o}-watch-item-poster-overlay">
                    <a class="${o}-link-button" href="${c(d)}" style="font-size:11px;padding:6px 10px;">Open</a>
                    <span class="${o}-watch-badge" data-state="${e}">${c(r)}</span>
                </div>
            </div>
            <div class="${o}-watch-item-body">
                <div>
                    <a class="${o}-watch-item-title" href="${c(d)}">${c(t.title)}${b}</a>
                    <p class="${o}-watch-item-copy">${c(O.join(" \u2022 "))}</p>
                </div>
                <div class="${o}-watch-actions">
                    <button class="${o}-button" type="button" data-watchlist-action="toggle-latest-watched" data-slug="${c(t.slug)}" ${$}>${c(p)}</button>
                    <button class="${o}-button ${o}-danger-button" type="button" data-watchlist-action="remove" data-slug="${c(t.slug)}">Remove</button>
                </div>
            </div>
        </article>
    `}function w(){let t=document.getElementById(`${i}-watchlist-summary`),e=document.getElementById(`${i}-watchlist-status`),a=document.getElementById(`${i}-watchlist-list`),s=document.getElementById(`${i}-watchlist-refresh`);if(!t||!e||!a||!s)return;let n=yt(C()),r=n.filter(d=>d.latestEpisode&&!g(d)).length;if(t.textContent=n.length?`${n.length} tracked ${n.length===1?"show":"shows"}${r?` | ${r} with a newer latest episode`:""}`:"Add shows from the latest episodes page to start tracking them.",e.dataset.tone=Q,e.textContent=W?_||"Refreshing watchlist...":_||"",s.disabled=W,!n.length){a.innerHTML=`<div class="${o}-watch-empty">On the <code>/shows</code> page, use the overlay button on any episode card to add that show to your personal watchlist.</div>`;return}a.innerHTML=n.map(zt).join("")}function Rt(){return location.pathname==="/shows"}function it(){return location.pathname.startsWith("/shows/view/")}function jt(){if(!it()||!window.show_storage)return null;let t=typeof window.show_storage.slug=="string"?window.show_storage.slug:"";if(!t)return null;let e=new URLSearchParams(location.search),a=f({season:e.get("season"),episode:e.get("episode"),idEpisode:e.get("id_episode")});return{slug:t,title:typeof window.show_storage.title=="string"?window.show_storage.title:t,year:typeof window.show_storage.year=="string"||typeof window.show_storage.year=="number"?String(window.show_storage.year):"",poster:typeof window.show_storage.poster_medium=="string"?window.show_storage.poster_medium:"",idShow:l(window.show_storage.id_show),episode:a}}function M(t){let e=t.dataset.watchlistSlug||"",a=m(e),s=f({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode});if(!a){t.dataset.state="add",t.textContent="+ Watch",t.title="Add this show to your watchlist",t.disabled=!1;return}let n=s&&(!a.lastWatched||N(s,a.lastWatched)>0);t.dataset.state=n?"watching-new":"watching",t.textContent="Watching",t.title=n?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function y(){document.querySelectorAll(`.${o}-episode-watch-button`).forEach(M)}function q(t){let e=t.dataset.watchlistSlug||"",a=m(e),s=f({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode});if(!a){t.dataset.state="add",t.textContent="+ Add To Watchlist",t.title="Add this show to your watchlist",t.disabled=!1;return}let n=s&&(!a.lastWatched||N(s,a.lastWatched)>0);t.dataset.state=n?"watching-new":"watching",t.textContent=n?"Watching: New Episode":"Watching",t.title=n?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function j(){document.querySelectorAll(`.${o}-show-view-watch-button`).forEach(q)}function nt(){!document.body||!Rt()||document.querySelectorAll(".episode-item").forEach(t=>{let e=Et(t);if(!e)return;let a=t.querySelector(`.${o}-episode-watch-button`);a||(a=document.createElement("button"),a.type="button",a.className=`${o}-episode-watch-button`,t.appendChild(a),a.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation();let n=a.dataset.watchlistSlug;if(n){if(m(n)){z(n);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await tt({slug:n,title:a.dataset.title||n,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:f({season:a.dataset.season,episode:a.dataset.episode,idEpisode:a.dataset.idEpisode})}),M(a)}})),a.dataset.watchlistSlug=e.slug,a.dataset.title=e.title,a.dataset.year=e.year,a.dataset.poster=e.poster,e.episode&&(a.dataset.season=String(e.episode.season),a.dataset.episode=String(e.episode.episode),a.dataset.idEpisode=String(e.episode.idEpisode)),M(a)})}function rt(){if(!document.body||!it())return;let t=jt();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let a=document.querySelector(`.${o}-show-view-watch-wrap`);a||(a=document.createElement("div"),a.className=`${o}-show-view-watch-wrap`,e.appendChild(a));let s=a.querySelector(`.${o}-show-view-watch-button`);s||(s=document.createElement("button"),s.type="button",s.className=`${o}-show-view-watch-button`,a.appendChild(s),s.addEventListener("click",async()=>{let n=s.dataset.watchlistSlug;if(n){if(m(n)){z(n);return}s.dataset.state="adding",s.textContent="Adding...",s.disabled=!0,await tt({slug:n,title:s.dataset.title||n,year:s.dataset.year||"",poster:s.dataset.poster||"",episode:f({season:s.dataset.season,episode:s.dataset.episode,idEpisode:s.dataset.idEpisode})}),q(s)}})),s.dataset.watchlistSlug=t.slug,s.dataset.title=t.title,s.dataset.year=t.year,s.dataset.poster=t.poster,t.episode?(s.dataset.season=String(t.episode.season),s.dataset.episode=String(t.episode.episode),s.dataset.idEpisode=String(t.episode.idEpisode)):(delete s.dataset.season,delete s.dataset.episode,delete s.dataset.idEpisode),q(s)}function dt(){document.querySelectorAll(`#${i} input[data-setting]`).forEach(t=>{t.checked=!!u[t.dataset.setting]})}function K(){if(V)return;V=!0,Mt(),qt();let t=window.setInterval(()=>{J+=1,st(),nt(),rt(),(document.getElementById(i)||J>100)&&window.clearInterval(t)},100);w(),R(),y(),j(),v()}et();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",K,{once:!0}):K();})();
