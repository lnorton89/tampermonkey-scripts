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


"use strict";(()=>{var s="lookmovie2-enhancer",T=`${s}:settings`,H=`${s}:watchlist`,L=`${s}-style`,W=`${s}-fullscreen-style`,i=`${s}-root`,D=1800*1e3,J=1e3,A=Object.freeze({autoPlay:!0,autoFullscreen:!0});function c(t){let e=Number.parseInt(String(t),10);return Number.isFinite(e)&&e>0?e:0}function p(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function u(t){if(!t||typeof t!="object")return null;let e=c(t.season),o=c(t.episode),a=c(t.idEpisode||t.id_episode);return!e||!o||!a?null:{season:e,episode:o,idEpisode:a,watchedAt:typeof t.watchedAt=="number"?t.watchedAt:void 0,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:void 0}}function y(t){return t?`S${String(t.season).padStart(2,"0")}E${String(t.episode).padStart(2,"0")}`:"Unknown episode"}function E(t,e){return!t&&!e?0:t?e?t.season!==e.season?t.season-e.season:t.episode!==e.episode?t.episode-e.episode:t.idEpisode-e.idEpisode:1:-1}function Y(t,e){return!t||!e?!1:t.idEpisode===e.idEpisode&&t.season===e.season&&t.episode===e.episode}function K(){try{let t=JSON.parse(localStorage.getItem(T)||"{}");return{autoPlay:typeof t.autoPlay=="boolean"?t.autoPlay:A.autoPlay,autoFullscreen:typeof t.autoFullscreen=="boolean"?t.autoFullscreen:A.autoFullscreen}}catch(t){return console.warn(`[${s}] Failed to load saved settings.`,t),{...A}}}function pt(t,e){if(!e||typeof e!="object")return null;let o=typeof t=="string"&&t.trim()?t.trim():"";return o?{slug:o,idShow:c(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():o,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),lastSyncedAt:typeof e.lastSyncedAt=="number"?e.lastSyncedAt:0,lastSyncError:typeof e.lastSyncError=="string"?e.lastSyncError:"",latestEpisode:u(e.latestEpisode),lastWatched:u(e.lastWatched)}:null}function G(){try{let t=JSON.parse(localStorage.getItem(H)||"{}"),e=t&&typeof t=="object"&&t.shows&&typeof t.shows=="object"?t.shows:{},o={};return Object.entries(e).forEach(([a,r])=>{let d=pt(a,r);d&&(o[a]=d)}),{shows:o}}catch(t){return console.warn(`[${s}] Failed to load watchlist.`,t),{shows:{}}}}function X(t){try{localStorage.setItem(T,JSON.stringify(t))}catch(e){console.warn(`[${s}] Failed to save settings.`,e)}}var n={settings:K(),watchlistStore:G(),domBootstrapped:!1,uiBootAttempts:0,fullscreenTriggered:!1,lastKnownUrl:location.href,watchlistRefreshPromise:null,watchlistBusy:!1,watchlistMessage:"",watchlistMessageTone:"muted",lastTrackedEpisodeSignature:""};function ut(t){try{let o=new URL(t,location.origin).pathname.match(/\/shows\/view\/([^/?#]+)/i);return o?o[1]:""}catch{return""}}function ht(t){try{let e=new URL(t,location.origin),o=c(e.searchParams.get("season")),a=c(e.searchParams.get("episode")),r=c(e.searchParams.get("id_episode"));return!o||!a||!r?null:{season:o,episode:a,idEpisode:r}}catch{return null}}function ft(t){let e=typeof t=="string"?t.match(/-(\d{4})$/):null;return e?e[1]:""}function gt(t){if(!t)return null;let e=t.querySelector('a[href*="/shows/view/"]');if(!e)return null;let o=ut(e.getAttribute("href"));if(!o)return null;let a=t.querySelector(".mv-item-infor h6"),r=t.querySelector("img[data-src], img[src]"),d=ht(e.getAttribute("href"));return{slug:o,title:a?a.textContent.trim():o,year:ft(o),poster:r&&(r.getAttribute("data-src")||r.getAttribute("src"))||"",href:new URL(e.getAttribute("href"),location.origin).href,episode:d}}function Q(t,e){return t?e?`/shows/view/${t}?season=${e.season}&episode=${e.episode}&id_episode=${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function wt(){return location.pathname==="/shows"}function Z(){return location.pathname.startsWith("/shows/view/")}function mt(){if(!Z()||!window.show_storage)return null;let t=typeof window.show_storage.slug=="string"?window.show_storage.slug:"";if(!t)return null;let e=new URLSearchParams(location.search),o=u({season:e.get("season"),episode:e.get("episode"),idEpisode:e.get("id_episode")});return{slug:t,title:typeof window.show_storage.title=="string"?window.show_storage.title:t,year:typeof window.show_storage.year=="string"||typeof window.show_storage.year=="number"?String(window.show_storage.year):"",poster:typeof window.show_storage.poster_medium=="string"?window.show_storage.poster_medium:"",idShow:c(window.show_storage.id_show),episode:o}}function _(t){let e=t.dataset.watchlistSlug||"",o=f(e),a=u({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode});if(!o){t.dataset.state="add",t.textContent="+ Watch",t.title="Add this show to your watchlist",t.disabled=!1;return}let r=a&&(!o.lastWatched||E(a,o.lastWatched)>0);t.dataset.state=r?"watching-new":"watching",t.textContent="Watching",t.title=r?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function w(){document.querySelectorAll(`.${s}-episode-watch-button`).forEach(_)}function C(t){let e=t.dataset.watchlistSlug||"",o=f(e),a=u({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode});if(!o){t.dataset.state="add",t.textContent="+ Add To Watchlist",t.title="Add this show to your watchlist",t.disabled=!1;return}let r=a&&(!o.lastWatched||E(a,o.lastWatched)>0);t.dataset.state=r?"watching-new":"watching",t.textContent=r?"Watching: New Episode":"Watching",t.title=r?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function B(){document.querySelectorAll(`.${s}-show-view-watch-button`).forEach(C)}function P(){!document.body||!wt()||document.querySelectorAll(".episode-item").forEach(t=>{let e=gt(t);if(!e)return;let o=t.querySelector(`.${s}-episode-watch-button`);o||(o=document.createElement("button"),o.type="button",o.className=`${s}-episode-watch-button`,t.appendChild(o),o.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation();let r=o.dataset.watchlistSlug;if(r){if(f(r)){S(r);return}o.dataset.state="adding",o.textContent="Adding...",o.disabled=!0,await M({slug:r,title:o.dataset.title||r,year:o.dataset.year||"",poster:o.dataset.poster||"",episode:u({season:o.dataset.season,episode:o.dataset.episode,idEpisode:o.dataset.idEpisode})}),_(o)}})),o.dataset.watchlistSlug=e.slug,o.dataset.title=e.title,o.dataset.year=e.year,o.dataset.poster=e.poster,e.episode&&(o.dataset.season=String(e.episode.season),o.dataset.episode=String(e.episode.episode),o.dataset.idEpisode=String(e.episode.idEpisode)),_(o)})}function F(){if(!document.body||!Z())return;let t=mt();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let o=document.querySelector(`.${s}-show-view-watch-wrap`);o||(o=document.createElement("div"),o.className=`${s}-show-view-watch-wrap`,e.appendChild(o));let a=o.querySelector(`.${s}-show-view-watch-button`);a||(a=document.createElement("button"),a.type="button",a.className=`${s}-show-view-watch-button`,o.appendChild(a),a.addEventListener("click",async()=>{let r=a.dataset.watchlistSlug;if(r){if(f(r)){S(r);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await M({slug:r,title:a.dataset.title||r,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:u({season:a.dataset.season,episode:a.dataset.episode,idEpisode:a.dataset.idEpisode})}),C(a)}})),a.dataset.watchlistSlug=t.slug,a.dataset.title=t.title,a.dataset.year=t.year,a.dataset.poster=t.poster,t.episode?(a.dataset.season=String(t.episode.season),a.dataset.episode=String(t.episode.episode),a.dataset.idEpisode=String(t.episode.idEpisode)):(delete a.dataset.season,delete a.dataset.episode,delete a.dataset.idEpisode),C(a)}function tt(t){n.settings={autoPlay:!!t.autoPlay,autoFullscreen:!!t.autoFullscreen},X(n.settings),R(),n.settings.autoFullscreen||(k(),n.fullscreenTriggered=!1)}function xt(){if(!document.head||document.getElementById(L))return;let t=document.createElement("style");t.id=L,t.textContent=`
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

        #${i}-overlay.${s}-open {
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
            overflow: hidden;
        }

        #${i}-settings-panel {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            padding-bottom: 18px;
        }

        #${i}-watchlist-panel {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            overflow: hidden;
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

        .${s}-setting {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: center;
            padding: 14px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 14px;
            background: rgba(15, 23, 42, 0.7);
        }

        .${s}-setting-title {
            margin: 0;
            color: #f8fafc;
            font-size: 14px;
            font-weight: 700;
        }

        .${s}-setting-copy {
            margin: 4px 0 0;
            color: #94a3b8;
            font-size: 12px;
            line-height: 1.45;
        }

        .${s}-switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 30px;
        }

        .${s}-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .${s}-slider {
            position: absolute;
            inset: 0;
            border-radius: 999px;
            background: #334155;
            transition: background 0.18s ease;
        }

        .${s}-slider::before {
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

        .${s}-switch input:checked + .${s}-slider {
            background: #2563eb;
        }

        .${s}-switch input:checked + .${s}-slider::before {
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
            flex: 0 0 auto;
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
            flex: 0 0 auto;
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

        .${s}-watch-empty {
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

        .${s}-watch-item {
            display: flex;
            flex-direction: column;
            gap: 0;
            border: 1px solid rgba(148, 163, 184, 0.16);
            border-radius: 12px;
            background: rgba(15, 23, 42, 0.85);
            overflow: hidden;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .${s}-watch-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .${s}-watch-item[data-state="new"] {
            border-color: rgba(249, 115, 22, 0.55);
            box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.18);
        }

        .${s}-watch-item[data-state="new"]:hover {
            box-shadow: 0 8px 24px rgba(249, 115, 22, 0.15);
        }

        .${s}-watch-item-poster {
            position: relative;
            width: 100%;
            aspect-ratio: 2 / 3;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8));
        }

        .${s}-watch-item-poster img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .${s}-watch-item-poster-overlay {
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

        .${s}-watch-item-body {
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
        }

        .${s}-watch-item-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 8px;
        }

        .${s}-watch-item-title {
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

        .${s}-watch-item-copy {
            margin: 3px 0 0;
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.4;
        }

        .${s}-watch-badge {
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

        .${s}-watch-badge[data-state="new"] {
            background: rgba(249, 115, 22, 0.18);
            color: #fdba74;
        }

        .${s}-watch-badge[data-state="watched"] {
            background: rgba(34, 197, 94, 0.18);
            color: #86efac;
        }

        .${s}-watch-badge[data-state="pending"] {
            background: rgba(148, 163, 184, 0.18);
            color: #cbd5e1;
        }

        .${s}-watch-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .${s}-button,
        .${s}-link-button {
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

        .${s}-button:hover,
        .${s}-link-button:hover {
            border-color: rgba(96, 165, 250, 0.65);
            color: #f8fafc;
        }

        .${s}-button[disabled] {
            cursor: wait;
            opacity: 0.65;
        }

        .${s}-danger-button:hover {
            border-color: rgba(251, 113, 133, 0.7);
        }

        #${i}-footer {
            margin-top: auto;
            padding-top: 16px;
            color: #94a3b8;
            font: 12px/1.45 Arial, sans-serif;
            overflow-wrap: anywhere;
        }

        .${s}-episode-watch-button {
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

        .${s}-episode-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${s}-episode-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${s}-episode-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        .${s}-show-view-watch-wrap {
            margin-top: 14px;
        }

        .${s}-show-view-watch-button {
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

        .${s}-show-view-watch-button:hover {
            transform: translateY(-1px);
            border-color: rgba(96, 165, 250, 0.65);
        }

        .${s}-show-view-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${s}-show-view-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${s}-show-view-watch-button[data-state="adding"] {
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
    `,document.head.appendChild(t)}function et(t,e,o){return`
        <label class="${s}-setting">
            <div>
                <p class="${s}-setting-title">${e}</p>
                <p class="${s}-setting-copy">${o}</p>
            </div>
            <span class="${s}-switch">
                <input type="checkbox" data-setting="${t}">
                <span class="${s}-slider"></span>
            </span>
        </label>
    `}function U(){if(xt(),!document.body||document.getElementById(i))return;let t=document.createElement("div");t.id=i,t.innerHTML=`
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
                            ${et("autoPlay","Auto play","Clicks the resume or start button when the playback modal appears.")}
                            ${et("autoFullscreen","Auto fullscreen","Clicks fullscreen and applies the fullscreen fallback after playback starts.")}
                        </div>
                        <div id="${i}-footer">Settings and watchlist data are saved locally in your browser.</div>
                    </section>
                    <section id="${i}-watchlist-panel">
                        <div id="${i}-watchlist-toolbar">
                            <div>
                                <h3 id="${i}-watchlist-title">Watchlist</h3>
                                <div id="${i}-watchlist-summary"></div>
                            </div>
                            <button id="${i}-watchlist-refresh" class="${s}-button" type="button" data-watchlist-action="refresh">Refresh</button>
                        </div>
                        <div id="${i}-watchlist-status" data-tone="muted"></div>
                        <div id="${i}-watchlist-list"></div>
                    </section>
                </div>
            </div>
        </div>
    `,document.body.appendChild(t);let e=document.getElementById(`${i}-button`),o=document.getElementById(`${i}-overlay`),a=document.getElementById(`${i}-close`);function r(){o.classList.add(`${s}-open`),o.setAttribute("aria-hidden","false"),e.setAttribute("aria-expanded","true"),m()}function d(){o.classList.remove(`${s}-open`),o.setAttribute("aria-hidden","true"),e.setAttribute("aria-expanded","false")}e.addEventListener("click",()=>{o.classList.contains(`${s}-open`)?d():r()}),a.addEventListener("click",d),o.addEventListener("click",l=>{l.target===o&&d()}),document.querySelectorAll(`#${i} input[data-setting]`).forEach(l=>{l.addEventListener("change",()=>{tt({...n.settings,[l.dataset.setting]:l.checked})})}),t.addEventListener("click",l=>{let h=l.target.closest("[data-watchlist-action]");if(!h)return;let $=h.dataset.watchlistAction,b=h.dataset.slug||"";if($==="refresh"){m({force:!0});return}if($==="toggle-latest-watched"&&b){at(b);return}$==="remove"&&b&&S(b)}),window.addEventListener("keydown",l=>{l.key==="Escape"&&d()}),R(),x(),z()}function z(){let t=document.getElementById(`${i}-button`),e=document.getElementById(`${i}-button-badge`),o=document.getElementById(`${i}-button-label`);if(!t||!e||!o)return;let a=ot();o.textContent="LM Tools",a>0?(e.hidden=!1,e.textContent=String(a),t.dataset.hasNew="true"):(e.hidden=!0,e.textContent="0",t.dataset.hasNew="false")}function bt(t){let e=t.latestEpisode?g(t)?"watched":"new":"pending",o=t.latestEpisode?`Latest ${y(t.latestEpisode)}`:"Latest episode not synced yet",a=t.lastWatched?`Watched through ${y(t.lastWatched)}`:"Nothing marked watched yet",r=t.lastSyncError?`Sync issue: ${t.lastSyncError}`:"",d=e==="new"?"New episode":e==="watched"?"Up to date":"Pending sync",l=Q(t.slug,t.latestEpisode),h=g(t)?"Unwatch latest":"Mark latest watched",$=t.latestEpisode?"":"disabled",b=t.year?` (${p(t.year)})`:"",j=t.poster||"",V=[o,a];r&&V.push(r);let ct=j?`<img src="${p(j)}" alt="${p(t.title)}" loading="lazy">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:48px;">\u{1F4FA}</div>';return`
        <article class="${s}-watch-item" data-state="${e}">
            <div class="${s}-watch-item-poster">
                ${ct}
                <div class="${s}-watch-item-poster-overlay">
                    <a class="${s}-link-button" href="${p(l)}" style="font-size:11px;padding:6px 10px;">Open</a>
                    <span class="${s}-watch-badge" data-state="${e}">${p(d)}</span>
                </div>
            </div>
            <div class="${s}-watch-item-body">
                <div>
                    <a class="${s}-watch-item-title" href="${p(l)}">${p(t.title)}${b}</a>
                    <p class="${s}-watch-item-copy">${p(V.join(" \u2022 "))}</p>
                </div>
                <div class="${s}-watch-actions">
                    <button class="${s}-button" type="button" data-watchlist-action="toggle-latest-watched" data-slug="${p(t.slug)}" ${$}>${p(h)}</button>
                    <button class="${s}-button ${s}-danger-button" type="button" data-watchlist-action="remove" data-slug="${p(t.slug)}">Remove</button>
                </div>
            </div>
        </article>
    `}function x(){let t=document.getElementById(`${i}-watchlist-summary`),e=document.getElementById(`${i}-watchlist-status`),o=document.getElementById(`${i}-watchlist-list`),a=document.getElementById(`${i}-watchlist-refresh`);if(!t||!e||!o||!a)return;let r=st(v()),d=r.filter(l=>l.latestEpisode&&!g(l)).length;if(t.textContent=r.length?`${r.length} tracked ${r.length===1?"show":"shows"}${d?` | ${d} with a newer latest episode`:""}`:"Add shows from the latest episodes page to start tracking them.",e.dataset.tone=n.watchlistMessageTone,e.textContent=n.watchlistBusy?n.watchlistMessage||"Refreshing watchlist...":n.watchlistMessage||"",a.disabled=n.watchlistBusy,!r.length){o.innerHTML=`<div class="${s}-watch-empty">On the <code>/shows</code> page, use the overlay button on any episode card to add that show to your personal watchlist.</div>`;return}o.innerHTML=r.map(bt).join("")}function R(){document.querySelectorAll(`#${i} input[data-setting]`).forEach(t=>{t.checked=!!n.settings[t.dataset.setting]})}function g(t){return!!t&&Y(t.latestEpisode,t.lastWatched)}function v(){return Object.values(n.watchlistStore.shows)}function f(t){return t&&n.watchlistStore.shows[t]||null}function yt(t){return t&&v().find(e=>e.idShow===t)||null}function ot(){return v().filter(t=>t.latestEpisode&&!g(t)).length}function st(t){return[...t].sort((e,o)=>{let a=e.latestEpisode?g(e)?1:0:2,r=o.latestEpisode?g(o)?1:0:2;return a!==r?a-r:e.title.localeCompare(o.title)})}function $t(t,e){return t?!t.idShow||!t.latestEpisode?!0:!t.lastSyncedAt||e-t.lastSyncedAt>=D:!1}async function it(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.text()}async function rt(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.json()}function I(t){return t.replaceAll("\\'","'").replaceAll("\\\\","\\")}async function nt(t,e){let o=await it(`/shows/view/${t}`),a=o.match(/id_show:\s*(\d+)/),r=o.match(/title:\s*'((?:\\'|[^'])*)'/),d=o.match(/year:\s*'((?:\\'|[^'])*)'/),l=o.match(/poster_medium:\s*'((?:\\'|[^'])*)'/);return{slug:t,idShow:a?c(a[1]):0,title:r?I(r[1]).trim():e&&e.title?e.title:t,year:d?I(d[1]).trim():e&&e.year?e.year:"",poster:l?I(l[1]).trim():e&&e.poster?e.poster:""}}async function Et(t){let e=await rt(`/api/v2/download/episode/list?id=${t}`),o=e&&e.latest?e.latest:null,a=u({season:o&&o.season,episode:o&&o.episode,idEpisode:o&&o.id_episode});return a?(a.updatedAt=Date.now(),a):null}async function M(t){if(!t||!t.slug)return;let e=f(t.slug);if(e){setWatchlistMessage(`${e.title} is already in your watchlist.`,"muted"),w();return}setWatchlistMessage(`Adding ${t.title||t.slug}...`,"muted");let o={slug:t.slug,idShow:0,title:t.title||t.slug,year:t.year||"",poster:t.poster||""};try{o=await nt(t.slug,t)}catch(a){console.warn(`[${s}] Failed to resolve show metadata for ${t.slug}.`,a)}n.watchlistStore.shows[t.slug]=normalizeWatchlistEntry(t.slug,{slug:t.slug,idShow:o.idShow,title:o.title||t.title||t.slug,year:o.year||t.year||"",poster:o.poster||t.poster||"",addedAt:Date.now(),latestEpisode:t.episode||null,lastSyncedAt:0}),saveWatchlist(),setWatchlistMessage(`${o.title||t.title||t.slug} added to your watchlist.`,"success"),await m({force:!0,slugs:[t.slug]})}function S(t){let e=f(t);e&&(delete n.watchlistStore.shows[t],saveWatchlist(),setWatchlistMessage(`${e.title} removed from your watchlist.`,"muted"))}function at(t){let e=f(t);!e||!e.latestEpisode||(g(e)?(e.lastWatched=null,setWatchlistMessage(`${e.title} marked as having an unwatched latest episode.`,"muted")):(e.lastWatched={...e.latestEpisode,watchedAt:Date.now()},setWatchlistMessage(`${e.title} marked watched through ${y(e.latestEpisode)}.`,"success")),saveWatchlist())}async function m(t){let e=!!(t&&t.force),o=t&&Array.isArray(t.slugs)?new Set(t.slugs):null;if(n.watchlistRefreshPromise)return n.watchlistRefreshPromise;let a=Date.now(),r=v().filter(d=>o&&!o.has(d.slug)?!1:e||$t(d,a));return r.length?(n.watchlistBusy=!0,setWatchlistMessage(`Refreshing ${r.length} watchlist ${r.length===1?"show":"shows"}...`,"muted"),n.watchlistRefreshPromise=(async()=>{for(let d of r)try{if(!d.idShow){let h=await nt(d.slug,d);d.idShow=h.idShow,d.title=h.title||d.title,d.year=h.year||d.year,d.poster=h.poster||d.poster}if(!d.idShow)throw new Error("Unable to resolve show id.");let l=await Et(d.idShow);d.latestEpisode=l,d.lastSyncError="",d.lastSyncedAt=Date.now()}catch(l){d.lastSyncError=l instanceof Error?l.message:String(l),d.lastSyncedAt=Date.now(),console.warn(`[${s}] Failed to refresh ${d.slug}.`,l)}saveWatchlist(),setWatchlistMessage("Watchlist refreshed.","success")})().catch(d=>{console.warn(`[${s}] Watchlist refresh failed.`,d),setWatchlistMessage("Watchlist refresh failed.","danger")}).finally(()=>{n.watchlistBusy=!1,x(),w(),n.watchlistRefreshPromise=null}),n.watchlistRefreshPromise):(x(),w(),Promise.resolve())}function St(){if(!location.pathname.startsWith("/shows/play/"))return null;let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);if(!t)return null;let e=c(window.id_show),o=c(t[1]),a=c(t[2]),r=c(t[3]);return!e||!o||!a||!r?null:{idShow:e,season:o,episode:a,idEpisode:r}}function dt(){let t=St();if(!t)return;let e=`${t.idShow}:${t.idEpisode}`;if(e===n.lastTrackedEpisodeSignature)return;let o=yt(t.idShow);o&&(o.lastWatched={season:t.season,episode:t.episode,idEpisode:t.idEpisode,watchedAt:Date.now()},(!o.latestEpisode||E(o.lastWatched,o.latestEpisode)>0)&&(o.latestEpisode={season:t.season,episode:t.episode,idEpisode:t.idEpisode,updatedAt:Date.now()}),n.lastTrackedEpisodeSignature=e,saveWatchlist(),setWatchlistMessage(`${o.title} updated to watched through ${y(o.lastWatched)}.`,"success"))}function vt(){if(!n.settings.autoPlay)return!1;let t=document.getElementById("progress-from-beginning-button");return t?(console.log(`[${s}] Dismissing playback modal.`),t.click(),!0):!1}function Wt(){if(!document.head)return!1;if(!document.getElementById(W)){let t=document.createElement("style");t.id=W,t.textContent=`
            #video_player {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 999999 !important;
                background: black !important;
            }

            body.${s}-fullscreen {
                overflow: hidden !important;
            }
        `,document.head.appendChild(t)}return document.body&&document.body.classList.add(`${s}-fullscreen`),!0}function k(){let t=document.getElementById(W);t&&t.remove(),document.body&&document.body.classList.remove(`${s}-fullscreen`)}function At(){if(!n.settings.autoFullscreen||n.fullscreenTriggered)return!1;let t=document.getElementById("video_player");if(!t)return!1;let e=t.querySelector(".vjs-fullscreen-control");return e&&e.click(),console.log(`[${s}] Applying fullscreen behavior.`),Wt(),n.fullscreenTriggered=!0,!0}function kt(){dt(),!(!n.settings.autoPlay&&!n.settings.autoFullscreen)&&window.setTimeout(()=>{let t=vt();window.setTimeout(()=>{At()},t?500:200)},300)}function N(t){!t||t._lookmovieEnhancerAttached||(t._lookmovieEnhancerAttached=!0,t.addEventListener("play",kt))}function O(){document.querySelectorAll("video").forEach(N)}function lt(){let t=window.setInterval(()=>{if(!document.body)return;window.clearInterval(t),O(),new MutationObserver(o=>{o.forEach(a=>{a.type==="childList"&&a.addedNodes.forEach(r=>{!r||r.nodeType!==Node.ELEMENT_NODE||(r.tagName==="VIDEO"&&N(r),typeof r.querySelectorAll=="function"&&r.querySelectorAll("video").forEach(N))})})}).observe(document.body,{childList:!0,subtree:!0})},100)}function It(){window.setInterval(()=>{location.href!==n.lastKnownUrl&&(n.lastKnownUrl=location.href,n.fullscreenTriggered=!1,n.lastTrackedEpisodeSignature="",k(),O(),U(),x(),w(),P(),B(),F(),m())},J)}function q(){if(n.domBootstrapped)return;n.domBootstrapped=!0,lt(),It();let t=window.setInterval(()=>{n.uiBootAttempts+=1,U(),P(),F(),(document.getElementById(i)||n.uiBootAttempts>100)&&window.clearInterval(t)},100);x(),z(),w(),B(),m()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",q,{once:!0}):q();})();
